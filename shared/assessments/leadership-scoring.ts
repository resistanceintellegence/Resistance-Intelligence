// Leadership Assessment Scoring Logic
import { 
  LEADERSHIP_ARCHETYPES, 
  DIRECT_QUESTIONS, 
  OBLIQUE_QUESTIONS, 
  SCENARIO_QUESTIONS,
  FORCED_CHOICE_BLOCKS,
  BALANCING_QUESTIONS,
  SCORING
} from './leadership-data';

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
}

export interface AssessmentResult {
  archetypeScores: ArchetypeScore[];
  dominantArchetype: ArchetypeScore;
  secondaryArchetype: ArchetypeScore;
  totalQuestions: number;
  completionDate: string;
  insights: string[];
  developmentAreas: string[];
  resistanceLevel: string; // 'low', 'moderate', 'high'
  resistancePercentage: number;
}

/**
 * Calculate leadership assessment results from user responses
 */
export function calculateLeadershipResults(responses: AssessmentResponse[]): AssessmentResult {
  // Initialize archetype scores
  const archetypeScores: Record<string, number> = {};
  LEADERSHIP_ARCHETYPES.forEach(archetype => {
    archetypeScores[archetype.id] = 0;
  });

  // Process each response type
  responses.forEach(response => {
    switch (response.questionType) {
      case 'direct':
      case 'oblique':
        processLikertResponse(response, archetypeScores);
        break;
      case 'scenario':
        processScenarioResponse(response, archetypeScores);
        break;
      case 'forced-choice':
        processForcedChoiceResponse(response, archetypeScores);
        break;
      case 'balancing':
        processBalancingResponse(response, archetypeScores);
        break;
    }
  });

  // Convert raw scores to percentage and rank
  const maxPossibleScore = calculateMaxPossibleScore();
  const sortedScores: ArchetypeScore[] = LEADERSHIP_ARCHETYPES
    .map(archetype => ({
      archetypeId: archetype.id,
      archetypeName: archetype.name,
      rawScore: archetypeScores[archetype.id],
      percentageScore: Math.round((archetypeScores[archetype.id] / maxPossibleScore) * 100),
      rank: 0 // Will be set after sorting
    }))
    .sort((a, b) => b.rawScore - a.rawScore)
    .map((score, index) => ({ ...score, rank: index + 1 }));

  const dominantArchetype = sortedScores[0];
  const secondaryArchetype = sortedScores[1];

  // Calculate resistance percentage and level based on dominant archetype
  const resistancePercentage = calculateResistancePercentage(dominantArchetype.rawScore);
  const resistanceLevel = getResistanceLevel(resistancePercentage);

  return {
    archetypeScores: sortedScores,
    dominantArchetype,
    secondaryArchetype,
    totalQuestions: responses.length,
    completionDate: new Date().toISOString(),
    insights: generateInsights(dominantArchetype, secondaryArchetype, sortedScores),
    developmentAreas: generateDevelopmentAreas(dominantArchetype, secondaryArchetype),
    resistanceLevel,
    resistancePercentage
  };
}

/**
 * Process Likert scale responses (Direct and Oblique questions)
 */
function processLikertResponse(response: AssessmentResponse, scores: Record<string, number>): void {
  const question = [...DIRECT_QUESTIONS, ...OBLIQUE_QUESTIONS].find(q => q.id === response.questionId);
  if (!question || !question.archetype || typeof response.response !== 'number') return;

  const score = response.response as number;
  scores[question.archetype] += score;
}

/**
 * Process scenario-based multiple choice responses
 */
function processScenarioResponse(response: AssessmentResponse, scores: Record<string, number>): void {
  const question = SCENARIO_QUESTIONS.find(q => q.id === response.questionId);
  if (!question || !question.archetype || !question.options) return;

  const selectedOption = question.options.find(opt => opt.value === response.response);
  if (!selectedOption || selectedOption.archetypeScore === undefined) return;

  // Add the archetype score for the selected option
  scores[question.archetype] += selectedOption.archetypeScore;
}

/**
 * Process forced-choice ipsative responses
 */
function processForcedChoiceResponse(response: AssessmentResponse, scores: Record<string, number>): void {
  if (typeof response.response !== 'object' || !response.response) return;
  
  const forcedChoice = response.response as ForcedChoiceResponse;
  
  // Find the forced choice block
  const blockId = response.questionId;
  const block = FORCED_CHOICE_BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  // Apply scoring: Most like me = +2, Least like me = -1, Others = 0
  block.statements.forEach(statement => {
    if (statement.archetype === forcedChoice.mostLikeMe) {
      scores[statement.archetype] += SCORING.FORCED_CHOICE_MOST;
    } else if (statement.archetype === forcedChoice.leastLikeMe) {
      scores[statement.archetype] += SCORING.FORCED_CHOICE_LEAST;
    }
    // Others get 0 (no change)
  });
}

/**
 * Process balancing items (some are reverse-coded)
 */
function processBalancingResponse(response: AssessmentResponse, scores: Record<string, number>): void {
  const question = BALANCING_QUESTIONS.find(q => q.id === response.questionId);
  if (!question || !question.archetype || typeof response.response !== 'number') return;

  let score = response.response as number;
  
  // Apply reverse coding if needed (flip the scale)
  if (question.isReverseCoded) {
    score = 6 - score; // 1→5, 2→4, 3→3, 4→2, 5→1
  }

  scores[question.archetype] += score;
}

/**
 * Calculate the maximum possible score across all question types
 */
function calculateMaxPossibleScore(): number {
  // Each archetype has:
  // - 2 direct questions (max 5 each) = 10
  // - 2 oblique questions (max 5 each) = 10  
  // - 2-3 scenario questions (max 5 each) = ~12.5 average
  // - 16 forced choice blocks (max +2 per block) = 32
  // - 2 balancing questions (max 5 each) = 10
  
  // Simplified calculation: Use the theoretical maximum
  return 80; // Approximate maximum based on question distribution
}

/**
 * Generate personalized insights based on archetype results
 */
function generateInsights(
  dominant: ArchetypeScore, 
  secondary: ArchetypeScore, 
  allScores: ArchetypeScore[]
): string[] {
  const insights: string[] = [];

  // Dominant archetype insight
  insights.push(`Your dominant leadership style is ${dominant.archetypeName}. This indicates you ${getArchetypeInsight(dominant.archetypeId)}`);

  // Secondary archetype insight
  if (secondary.percentageScore > 60) {
    insights.push(`Your secondary style, ${secondary.archetypeName}, suggests you also ${getArchetypeInsight(secondary.archetypeId)}`);
  }

  // Score distribution insight
  const topThree = allScores.slice(0, 3);
  const scoreRange = topThree[0].percentageScore - topThree[2].percentageScore;
  
  if (scoreRange < 20) {
    insights.push("You demonstrate a balanced leadership approach across multiple archetypes, showing adaptability in different situations.");
  } else {
    insights.push("You have a clearly defined leadership style with strong preferences in specific areas.");
  }

  // Complementary archetype insight
  const complementaryPairs: Record<string, string[]> = {
    'strategic-architect': ['decisive-change-agent', 'empowering-delegator'],
    'empowering-delegator': ['outcome-driven-achiever', 'strategic-architect'],
    'vision-driven-innovator': ['collaborative-harmonizer', 'risk-aware-stabilizer'],
    'collaborative-harmonizer': ['decisive-change-agent', 'vision-driven-innovator'],
    'decisive-change-agent': ['strategic-architect', 'collaborative-harmonizer'],
    'people-centric-coach': ['outcome-driven-achiever', 'risk-aware-stabilizer'],
    'risk-aware-stabilizer': ['decisive-change-agent', 'vision-driven-innovator'],
    'outcome-driven-achiever': ['people-centric-coach', 'strategic-architect']
  };

  const complements = complementaryPairs[dominant.archetypeId] || [];
  const hasComplement = allScores.some(score => 
    complements.includes(score.archetypeId) && score.percentageScore > 50
  );

  if (hasComplement) {
    insights.push("Your leadership profile shows good balance between different leadership approaches, which enhances your versatility.");
  }

  return insights;
}

/**
 * Generate development areas based on archetype gaps
 */
function generateDevelopmentAreas(
  dominant: ArchetypeScore, 
  secondary: ArchetypeScore
): string[] {
  const areas: string[] = [];

  // Development suggestions based on dominant archetype
  const developmentMap: Record<string, string[]> = {
    'strategic-architect': [
      "Consider developing more agility in fast-changing situations",
      "Practice making decisions with incomplete information",
      "Work on building stronger emotional connections with team members"
    ],
    'empowering-delegator': [
      "Develop stronger accountability systems while maintaining trust",
      "Practice stepping in when delegation isn't working effectively",
      "Build skills in providing more directive leadership when needed"
    ],
    'vision-driven-innovator': [
      "Practice incorporating team input into your vision",
      "Develop patience for implementation and execution phases", 
      "Work on building consensus around innovative ideas"
    ],
    'collaborative-harmonizer': [
      "Practice addressing conflict directly when necessary",
      "Develop comfort with making unpopular but necessary decisions",
      "Build skills in driving urgency while maintaining relationships"
    ],
    'decisive-change-agent': [
      "Practice slowing down to build more stakeholder buy-in",
      "Develop skills in long-term strategic thinking",
      "Work on maintaining team morale during constant change"
    ],
    'people-centric-coach': [
      "Practice making tough performance-based decisions",
      "Develop skills in driving results while developing people",
      "Build comfort with prioritizing organizational needs over individual preferences"
    ],
    'risk-aware-stabilizer': [
      "Practice taking calculated risks for growth opportunities",
      "Develop comfort with ambiguity and uncertainty",
      "Work on communicating the need for change to others"
    ],
    'outcome-driven-achiever': [
      "Practice investing in long-term capability building",
      "Develop skills in maintaining team engagement and development",
      "Work on building sustainable processes beyond immediate results"
    ]
  };

  const suggestions = developmentMap[dominant.archetypeId] || [];
  areas.push(...suggestions.slice(0, 2)); // Take top 2 suggestions

  return areas;
}

/**
 * Get specific insight text for each archetype
 */
function getArchetypeInsight(archetypeId: string): string {
  const insights: Record<string, string> = {
    'strategic-architect': 'prefer structured, long-term planning and feel most confident when operating within established frameworks.',
    'empowering-delegator': 'excel at trusting others and giving them autonomy to succeed, creating high levels of team ownership.',
    'vision-driven-innovator': 'are driven by big ideas and innovation, often pushing for disruptive changes that advance your vision.',
    'collaborative-harmonizer': 'prioritize team consensus and maintaining positive relationships, even during challenging discussions.',
    'decisive-change-agent': 'thrive in dynamic environments and are energized by making quick, bold decisions to drive change.',
    'people-centric-coach': 'invest heavily in developing others and prioritize individual growth and team capability building.',
    'risk-aware-stabilizer': 'focus on protecting organizational stability and carefully managing risks before moving forward.',
    'outcome-driven-achiever': 'are results-focused and driven by measurable performance and immediate, visible outcomes.'
  };

  return insights[archetypeId] || 'demonstrate unique leadership characteristics.';
}

/**
 * Calculate resistance percentage based on raw score
 * Formula from document: ((rawScore - 3) / 12) * 100
 */
function calculateResistancePercentage(rawScore: number): number {
  const resistancePercentage = ((rawScore - 3) / 12) * 100;
  // Ensure percentage is within 0-100 range
  return Math.max(0, Math.min(100, Math.round(resistancePercentage)));
}

/**
 * Determine resistance level based on percentage
 * Low: <35%, Moderate: 35-55%, High: >=55%
 */
function getResistanceLevel(percentage: number): string {
  if (percentage < 35) return "low";
  if (percentage < 55) return "moderate";
  return "high";
}

/**
 * Validate that all required questions have responses
 */
export function validateAssessmentCompleteness(responses: AssessmentResponse[]): {
  isComplete: boolean;
  missingQuestions: string[];
} {
  const allQuestionIds = [
    ...DIRECT_QUESTIONS.map(q => q.id),
    ...OBLIQUE_QUESTIONS.map(q => q.id),
    ...SCENARIO_QUESTIONS.map(q => q.id),
    ...FORCED_CHOICE_BLOCKS.map(b => b.id),
    ...BALANCING_QUESTIONS.map(q => q.id)
  ];

  const responseIds = responses.map(r => r.questionId);
  const missingQuestions = allQuestionIds.filter(id => !responseIds.includes(id));

  return {
    isComplete: missingQuestions.length === 0,
    missingQuestions
  };
}