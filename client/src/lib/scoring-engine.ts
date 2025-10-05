import { getAssessmentData, AssessmentData } from "./assessment-data";

export interface AssessmentResults {
  totalScore: number; // Raw score for the dominant archetype
  resistancePercentage: number; // Normalized % for the dominant archetype or overall
  resistanceScoreLabel: string; // e.g., "83%"
  dominantArchetype: string;
  resistanceLevel: string; // "low", "moderate", "high"
  archetypeScores: Record<string, number>;
  topArchetypes: Array<{
    name: string;
    score: number;
    percentage: number;
    level: string;
  }>;
  balancingScore?: number; // For assessments with balancing
  overallPercentage?: number;
}

export interface ExtendedAssessmentData extends AssessmentData {
  reverseScoredIndices?: number[];
  customQuestionMappings?: Record<
    number,
    {
      type: "multiple-choice" | "ipsative";
      mappings: Record<number, { archetype: string; score: number } | string>;
    }
  >;
  minRawPerArchetype: number;
  maxRawPerArchetype: number;
  lowThreshold: number;
  moderateThreshold: number;
  balancingIndices?: number[];
  balancingMin?: number;
  balancingMax?: number;
  adjustmentHigh?: number;
  adjustmentLow?: number;
  overallCalculation: "average-top3" | "total-sum" | "dominant";
  overallMax?: number; // for 'total-sum'
}

export function calculateResults(
  assessmentType: string,
  responses: (number | { most: number; least: number })[],
): AssessmentResults {
  const data = getAssessmentData(assessmentType) as ExtendedAssessmentData;
  if (!data) {
    throw new Error(`Assessment data not found for type: ${assessmentType}`);
  }

  // Step 1: Process responses to compute raw scores
  const archetypeScores: Record<string, number> = {};
  let totalProcessedSum = 0;
  Object.keys(data.archetypes).forEach((name) => {
    archetypeScores[name] = 0;
  });

  const processedResponses = responses.map((response, index) => {
    let processedValue = typeof response === "number" ? response : 0; // for ipsative, handled separately
    const custom = data.customQuestionMappings?.[index];

    if (custom) {
      if (custom.type === "ipsative") {
        if (
          typeof response === "object" &&
          "most" in response &&
          "least" in response
        ) {
          const mappings = custom.mappings as Record<number, string>;
          const mostArchetype = mappings[response.most];
          const leastArchetype = mappings[response.least];
          if (mostArchetype) archetypeScores[mostArchetype] += 2;
          if (leastArchetype) archetypeScores[leastArchetype] -= 1;
        }
      } else if (custom.type === "multiple-choice") {
        if (typeof response === "number") {
          const mapping = (
            custom.mappings as Record<
              number,
              { archetype: string; score: number }
            >
          )[response];
          if (mapping && mapping.archetype !== "none") {
            archetypeScores[mapping.archetype] += mapping.score;
            processedValue = mapping.score; // for overall sum if needed
          } else {
            processedValue = mapping?.score || 0;
          }
        }
      }
    } else {
      // Likert or reverse
      if (data.reverseScoredIndices?.includes(index)) {
        processedValue = 6 - processedValue;
      }
      Object.entries(data.archetypes).forEach(([name, arch]) => {
        if (arch.questionIndices.includes(index)) {
          archetypeScores[name] += processedValue;
        }
      });
    }
    totalProcessedSum += processedValue;
    return processedValue;
  });

  // Step 2: Compute balancing score if present
  let balancingScore: number | undefined = undefined;
  if (data.balancingIndices && data.balancingIndices.length > 0) {
    const balancingSum = data.balancingIndices.reduce(
      (sum, idx) => sum + processedResponses[idx],
      0,
    );
    const balancingLength = data.balancingIndices.length;
    const balancingMin = data.balancingMin || 1;
    const balancingMax = data.balancingMax || 5;
    balancingScore =
      ((balancingSum - balancingLength * balancingMin) /
        (balancingLength * (balancingMax - balancingMin))) *
      100;
  }

  // Step 3: Normalize archetype scores to percentages
  const archetypePercentages: Record<string, number> = {};
  Object.entries(archetypeScores).forEach(([name, raw]) => {
    const normalized = Math.max(
      0,
      Math.min(
        100,
        ((raw - data.minRawPerArchetype) /
          (data.maxRawPerArchetype - data.minRawPerArchetype)) *
          100,
      ),
    );
    archetypePercentages[name] = normalized;
  });

  // Step 4: Apply balancing adjustment if present
  let adjustedPercentages = { ...archetypePercentages };
  if (balancingScore !== undefined) {
    if (balancingScore > data.moderateThreshold) {
      Object.keys(adjustedPercentages).forEach((key) => {
        adjustedPercentages[key] = Math.max(
          0,
          Math.min(100, adjustedPercentages[key] + (data.adjustmentHigh || -3)),
        );
      });
    } else if (balancingScore < data.lowThreshold) {
      Object.keys(adjustedPercentages).forEach((key) => {
        adjustedPercentages[key] = Math.max(
          0,
          Math.min(100, adjustedPercentages[key] + (data.adjustmentLow || 2)),
        );
      });
    }
  }

  // Step 5: Create top archetypes
  const topArchetypes = Object.entries(adjustedPercentages)
    .map(([name, percentage]) => ({
      name,
      score: archetypeScores[name],
      percentage: Math.round(percentage),
      level: getResistanceLevel(
        percentage,
        data.lowThreshold,
        data.moderateThreshold,
      ),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  // Step 6: Determine dominant and overall
  const dominantArchetype = topArchetypes[0]?.name || "";
  let overallPercentage = 0;
  switch (data.overallCalculation) {
    case "average-top3":
      overallPercentage =
        topArchetypes.reduce((sum, arch) => sum + arch.percentage, 0) /
        topArchetypes.length;
      overallPercentage = Math.min(100, overallPercentage); // Cap at 100%
      break;
    case "total-sum":
      overallPercentage =
        (totalProcessedSum / (data.overallMax || responses.length * 5)) * 100;
      overallPercentage = Math.min(100, overallPercentage); // Cap at 100%
      break;
    case "dominant":
      overallPercentage = topArchetypes[0]?.percentage || 0;
      break;
  }
  const resistanceLevel = getResistanceLevel(
    overallPercentage,
    data.lowThreshold,
    data.moderateThreshold,
  );

  return {
    totalScore: topArchetypes[0]?.score || 0,
    resistancePercentage: overallPercentage,
    resistanceScoreLabel: `${Math.round(overallPercentage)}%`,
    dominantArchetype,
    resistanceLevel,
    archetypeScores,
    topArchetypes,
    balancingScore,
    overallPercentage,
  };
}

export function calculateFreeAssessmentResults(
  assessmentData: AssessmentData,
  responses: number[],
): AssessmentResults {
  // Step 1: Calculate raw scores for each archetype
  const archetypeScores: Record<string, number> = {};
  const archetypePercentages: Record<string, number> = {};

  Object.entries(assessmentData.archetypes).forEach(
    ([archetypeName, archetype]) => {
      const rawScore = archetype.questionIndices.reduce(
        (sum, questionIndex) => {
          return sum + (responses[questionIndex] || 0);
        },
        0,
      );

      archetypeScores[archetypeName] = rawScore;

      // Free Assessment Template: Normalize to % using (Raw - 3) / 12 × 100
      // Each archetype has 3 questions (2 Likert + 1 Scenario), raw range 3-15
      const normalizedPercentage = Math.max(
        0,
        Math.min(100, ((rawScore - 3) / 12) * 100),
      );
      archetypePercentages[archetypeName] = normalizedPercentage;
    },
  );

  // Step 2: Calculate balancing index (for future use with reverse-coded items)
  // For now, assume no adjustment needed - can be enhanced per assessment
  const balancingScore = 45; // Neutral balancing score (35-54% range)

  // Step 3: Apply balancing adjustment if needed
  let adjustedPercentages = { ...archetypePercentages };
  if (balancingScore >= 55) {
    // Subtract 3 points from all archetype percentages
    Object.keys(adjustedPercentages).forEach((key) => {
      adjustedPercentages[key] = Math.max(0, adjustedPercentages[key] - 3);
    });
  } else if (balancingScore <= 34) {
    // Add 2 points to all archetype percentages
    Object.keys(adjustedPercentages).forEach((key) => {
      adjustedPercentages[key] = Math.min(100, adjustedPercentages[key] + 2);
    });
  }

  // Step 4: Create top 3 archetypes with resistance levels
  const topArchetypes = Object.entries(adjustedPercentages)
    .map(([name, percentage]) => ({
      name,
      score: archetypeScores[name],
      percentage: Math.round(percentage),
      level: getFreeAssessmentResistanceLevel(percentage),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  // Step 5: Determine dominant archetype and overall resistance
  const dominantArchetype = topArchetypes[0];
  const overallResistancePercentage =
    topArchetypes.reduce((sum, arch) => sum + arch.percentage, 0) / 3;
  const overallResistanceLevel = getFreeAssessmentResistanceLevel(
    overallResistancePercentage,
  );

  return {
    totalScore: dominantArchetype.score,
    resistancePercentage: dominantArchetype.percentage,
    resistanceScoreLabel: `${dominantArchetype.percentage}%`,
    dominantArchetype: dominantArchetype.name,
    resistanceLevel: overallResistanceLevel,
    archetypeScores,
    topArchetypes,
    balancingScore,
  };
}

function getFreeAssessmentResistanceLevel(percentage: number): string {
  if (percentage <= 34) return "low";
  if (percentage <= 50) return "moderate";
  return "high";
}

function getResistanceLevel(
  percentage: number,
  low: number,
  moderate: number,
): string {
  if (percentage <= low) return "low";
  if (percentage <= moderate) return "moderate";
  return "high";
}
