// Generic Scoring Engine for All Paid Assessment Categories
// This template follows the standardized scoring rules and works with any assessment category

import { getAssessmentData, type AssessmentCategory, type AssessmentArchetype, type AssessmentQuestion, type ForcedChoiceBlock } from '../data/registry';

export interface AssessmentResponse {
  questionId: string;
  response: number | string | ForcedChoiceResponse;
  questionType: 'direct' | 'oblique' | 'scenario' | 'forced-choice' | 'balancing';
}

export interface ForcedChoiceResponse {
  mostLikeMe: string; // archetype ID
  leastLikeMe: string; // archetype ID
}

export interface ArchetypeScore {
  archetypeId: string;
  archetypeName: string;
  rawScore: number;
  percentageScore: number;
  rank: number;
  resistanceLevel: string; // 'low', 'moderate', 'high'
}

export interface AssessmentResult {
  categoryId: string;
  categoryName: string;
  archetypeScores: ArchetypeScore[];
  dominantArchetype: string; // Changed to string to match database schema
  secondaryArchetype: string; // Changed to string to match database schema
  totalQuestions: number;
  completionDate: string;
  insights: string[];
  developmentAreas: string[];
  resistanceLevel: string; // 'low', 'moderate', 'high'
  resistancePercentage: number;
  balancingIndex?: number; // For categories that use balancing adjustments
  organizationCategory?: string; // corporate, mid-size, smb, entrepreneur
  entrepreneurSubcategory?: 'sole' | 'micro' | 'growing'; // only used when organizationCategory is entrepreneur
  hasHighResistanceArchetype: boolean; // For fallback scenario logic
}

/**
 * Calculate assessment results from user responses for any category
 * Follows standardized scoring rules from the specification
 */
export async function calculateAssessmentResults(categoryId: string, responses: AssessmentResponse[]): Promise<AssessmentResult> {
  // Load category data dynamically
  const dataFile = await getAssessmentData(categoryId);
  if (!dataFile) {
    throw new Error(`Assessment data not found for category: ${categoryId}`);
  }

  const category = dataFile.getAssessmentCategory(categoryId);
  if (!category) {
    throw new Error(`Assessment category '${categoryId}' not found in data file`);
  }

  // STEP 1: Initialize archetype scores (Start from 0)
  const archetypeScores: Record<string, number> = {};
  category.archetypes.forEach(archetype => {
    archetypeScores[archetype.id] = 0;
  });

  // STEP 2: Process responses according to standardized scoring rules
  let balancingItems: number[] = [];
  
  responses.forEach(response => {
    switch (response.questionType) {
      case 'direct':
      case 'oblique':
      case 'scenario':
        processLikertResponse(response, archetypeScores, category);
        break;
      case 'forced-choice':
        processForcedChoiceResponse(response, archetypeScores, category);
        break;
      case 'balancing':
        const score = processBalancingResponse(response, archetypeScores, category);
        if (score !== null) balancingItems.push(score);
        break;
    }
  });

  // STEP 3: Calculate balancing index from 12 reverse-coded items
  const balancingIndex = calculateBalancingIndex(balancingItems);

  // STEP 4: Calculate normalization constants dynamically for true genericity
  // Paid assessments follow MD spec: 8 archetypes × 6 items each = 48 core items + 12 balancing
  // Each archetype gets: 6 core items (2 direct + 2 oblique + 2 forced-choice) + proportional balancing
  // Score range per archetype: 6 (min all 1s) to 30 (max all 5s) from Likert + forced-choice adjustments
  // Forced-choice can add +2 (most like me) or -1 (least like me) per block
  // For consistent normalization across categories, use MD specification constants
  const MIN_RAW_SCORE = 4;  // Conservative minimum accounting for forced-choice negative scores
  const SCORE_RANGE = 20;   // Span from 4 to 24 per MD spec
  
  const archetypePercentages: Record<string, number> = {};
  Object.entries(archetypeScores).forEach(([archetypeId, rawScore]) => {
    const percentage = Math.max(0, Math.min(100, ((rawScore - MIN_RAW_SCORE) / SCORE_RANGE) * 100));
    archetypePercentages[archetypeId] = percentage;
  });

  // STEP 5: Apply balancing adjustments
  if (balancingIndex !== undefined) {
    Object.keys(archetypePercentages).forEach(archetypeId => {
      if (balancingIndex >= 55) {
        // Subtract 3 points from all archetype percentages
        archetypePercentages[archetypeId] = Math.max(0, archetypePercentages[archetypeId] - 3);
      } else if (balancingIndex <= 34) {
        // Add 2 points to all archetype percentages  
        archetypePercentages[archetypeId] = Math.min(100, archetypePercentages[archetypeId] + 2);
      }
      // 35-54% range: no adjustment
    });
  }

  // STEP 6: Create sorted archetype scores with resistance levels
  const sortedScores: ArchetypeScore[] = category.archetypes
    .map(archetype => {
      const percentageScore = Math.round(archetypePercentages[archetype.id]);
      return {
        archetypeId: archetype.id,
        archetypeName: archetype.name,
        rawScore: archetypeScores[archetype.id],
        percentageScore,
        rank: 0, // Will be set after sorting
        resistanceLevel: getResistanceLevel(percentageScore)
      };
    })
    .sort((a, b) => b.percentageScore - a.percentageScore)
    .map((score, index) => ({ ...score, rank: index + 1 }));

  const dominantArchetype = sortedScores[0];
  const secondaryArchetype = sortedScores[1];

  // STEP 7: Determine overall resistance level and check for high resistance
  const hasHighResistanceArchetype = sortedScores.some(score => score.resistanceLevel === 'high');
  const overallResistanceLevel = dominantArchetype.resistanceLevel;
  const overallResistancePercentage = dominantArchetype.percentageScore;

  // Validate results
  if (!dominantArchetype || !secondaryArchetype) {
    throw new Error('Failed to calculate assessment results: insufficient archetype data');
  }

  // STEP 8: Get insights and development areas from archetype data
  const dominantArchetypeData = category.archetypes.find(a => a.id === dominantArchetype.archetypeId);
  const insights = dominantArchetypeData?.strengthsInsights || [`Your dominant archetype is ${dominantArchetype.archetypeName}`];
  const developmentAreas = dominantArchetypeData?.developmentAreas || [`Focus on developing areas beyond ${dominantArchetype.archetypeName}`];

  return {
    categoryId,
    categoryName: category.name,
    archetypeScores: sortedScores,
    dominantArchetype: dominantArchetype.archetypeName, // Return string, not object
    secondaryArchetype: secondaryArchetype.archetypeName, // Return string, not object
    totalQuestions: responses.length,
    completionDate: new Date().toISOString(),
    insights,
    developmentAreas,
    resistanceLevel: overallResistanceLevel,
    resistancePercentage: overallResistancePercentage,
    balancingIndex,
    hasHighResistanceArchetype
  };
}

/**
 * Process Likert-scale responses (Direct, Oblique, Scenario)
 * Scale: Strongly Disagree = 1 → Strongly Agree = 5
 * Reverse-coded items are flipped
 */
function processLikertResponse(
  response: AssessmentResponse, 
  archetypeScores: Record<string, number>, 
  category: AssessmentCategory
) {
  // Find question from all question arrays (with null guards)
  const allQuestions = [
    ...(category.questions.direct || []),
    ...(category.questions.oblique || []),
    ...(category.questions.scenario || []),
    ...(category.questions.balancing || []),

  ];
  const question = allQuestions.find((q: any) => q.id === response.questionId);
  if (!question || typeof response.response !== 'number') return;

  let score = response.response;
  
  // Apply reverse coding if specified
  if (question.isReverseCoded) {
    score = 6 - score; // Flip 1→5, 2→4, 3→3, 4→2, 5→1
  }

  // Add score to primary archetype
  if (question.archetype && archetypeScores.hasOwnProperty(question.archetype)) {
    archetypeScores[question.archetype] += score;
  }

  // Add weighted scores to multiple archetypes if specified
  if (question.archetypeWeights) {
    Object.entries(question.archetypeWeights).forEach(([archetypeId, weight]) => {
      if (archetypeScores.hasOwnProperty(archetypeId)) {
        archetypeScores[archetypeId] += score * weight;
      }
    });
  }
}

/**
 * Process Forced Choice (Ipsative) responses
 * "Most like me" = +2, "Least like me" = -1, Others = 0
 */
function processForcedChoiceResponse(
  response: AssessmentResponse, 
  archetypeScores: Record<string, number>, 
  category: AssessmentCategory
) {
  if (typeof response.response === 'object' && 'mostLikeMe' in response.response) {
    const forcedChoice = response.response as ForcedChoiceResponse;
    
    // Most like me: +2 points
    if (archetypeScores.hasOwnProperty(forcedChoice.mostLikeMe)) {
      archetypeScores[forcedChoice.mostLikeMe] += 2;
    }
    
    // Least like me: -1 point
    if (archetypeScores.hasOwnProperty(forcedChoice.leastLikeMe)) {
      archetypeScores[forcedChoice.leastLikeMe] -= 1;
    }
  }
}

/**
 * Process Balancing (reverse-coded) responses
 * These are used for balancing index calculation
 */
function processBalancingResponse(
  response: AssessmentResponse, 
  archetypeScores: Record<string, number>, 
  category: AssessmentCategory
): number | null {
  // Find question from all question arrays (with null guards)
  const allQuestions = [
    ...(category.questions.direct || []),
    ...(category.questions.oblique || []),
    ...(category.questions.scenario || []),
    ...(category.questions.balancing || []),

  ];
  const question = allQuestions.find((q: any) => q.id === response.questionId);
  if (!question || typeof response.response !== 'number') return null;

  let score = response.response;
  
  // Balancing items are always reverse-coded
  score = 6 - score;

  // Add score to primary archetype if specified
  if (question.archetype && archetypeScores.hasOwnProperty(question.archetype)) {
    archetypeScores[question.archetype] += score;
  }

  return score;
}

/**
 * Calculate balancing index from 12 reverse-coded items
 * Returns percentage (0-100)
 */
function calculateBalancingIndex(balancingScores: number[]): number | undefined {
  if (balancingScores.length === 0) return undefined;
  
  const totalScore = balancingScores.reduce((sum, score) => sum + score, 0);
  const maxPossible = balancingScores.length * 5; // 5 is max score per item
  const minPossible = balancingScores.length * 1; // 1 is min score per item
  
  return ((totalScore - minPossible) / (maxPossible - minPossible)) * 100;
}

/**
 * Determine resistance level based on percentage
 * Standardized bands: Low = 0-34%, Moderate = 35-50%, High = 50-100%
 */
function getResistanceLevel(percentage: number): string {
  if (percentage <= 34) return 'low';
  if (percentage <= 50) return 'moderate';
  return 'high';
}

/**
 * Get detailed resistance level information for results display
 */
export function getResistanceLevelDetails(level: string) {
  switch (level) {
    case 'low':
      return {
        label: 'Low Resistance',
        color: 'green',
        description: 'You have relatively low resistance patterns. Action comes more naturally, with less internal friction.',
        percentage: '0-34%'
      };
    case 'moderate':
      return {
        label: 'Moderate Resistance', 
        color: 'yellow',
        description: 'You experience some internal friction that can slow progress, but also have areas where action flows more easily.',
        percentage: '35-50%'
      };
    case 'high':
      return {
        label: 'High Resistance',
        color: 'red', 
        description: 'Higher resistance patterns may create significant internal friction. Understanding these patterns is key to reducing effort.',
        percentage: '50-100%'
      };
    default:
      return {
        label: 'Unknown',
        color: 'gray',
        description: 'Unable to determine resistance level.',
        percentage: 'N/A'
      };
  }
}