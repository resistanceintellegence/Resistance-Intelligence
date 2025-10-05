// Generic Data Registry for Paid Assessments
// This registry allows dynamic loading of any assessment data without hardcoded imports

export interface AssessmentArchetype {
  id: string;
  name: string;
  description: string;
  traits: string[];
  detailedDescription?: string;
  strengthsInsights?: string[];
  resistanceCosts?: string[];
  developmentAreas?: string[];
  growthPath?: {
    immediateShifts: string[];
    strategicPractices: string[];
    longTermGrowth: string[];
    microLearningNote?: string;
  };
  // Extended detailed analysis fields - Maps to MD file narrative structure
  highResistanceCharacteristics?: string[];
  coreBehaviorsUnderResistance?: string[]; // 3. Core Behaviors
  rootCauses?: string[]; // 4. Root Causes
  beliefsThatDriveResistance?: string[]; // 5. Beliefs (Internal Rules)
  whatOthersExperience?: { // 6. Stress Behaviors (how others experience you under stress)
    // Leadership assessment fields
    directReports?: string;
    executivePeers?: string;
    boardInvestors?: string;
    // Sales assessment fields  
    customers?: string;
    peers?: string;
    managers?: string;
    // Other assessment type fields can be added here
    seniorLeaders?: string;
    team?: string;
    clients?: string;
    advisors?: string;
    partners?: string;
    earlyCustomers?: string;
    youSelfPerception?: string;
    leadershipTeam?: string;
    departmentTeams?: string;
    peerManagers?: string;
    businessPartners?: string;
    investors?: string;
    managementTeam?: string;
  };
  organizationalTriggers?: { // 7. Situational Adaptations
    amplifiers?: string[];
    softeners?: string[];
  };
  strengthsHiddenInside?: string[]; // 8. Hidden Strengths
  detailedResistanceCosts?: string[]; // 9. Resistance Costs
  // Note: detailedDescription = 2. First, Know This
  // Note: growthPath = 10. Growth Path
  // Category-specific content for different organization types
  categoryContent?: {
    corporate?: {
      whatOthersExperience?: string;
      resistanceCosts?: string[];
      growthPath?: string[];
    };
    midSize?: {
      whatOthersExperience?: string;
      resistanceCosts?: string[];
      growthPath?: string[];
    };
    smb?: {
      whatOthersExperience?: string;
      resistanceCosts?: string[];
      growthPath?: string[];
    };
    entrepreneur?: {
      sole?: {
        whatOthersExperience?: string;
        resistanceCosts?: string[];
        growthPath?: string[];
      };
      micro?: {
        whatOthersExperience?: string;
        resistanceCosts?: string[];
        growthPath?: string[];
      };
      growing?: {
        whatOthersExperience?: string;
        resistanceCosts?: string[];
        growthPath?: string[];
      };
    };
  };
}

export interface AssessmentQuestion {
  id: string;
  type: "direct" | "oblique" | "scenario" | "forced-choice" | "balancing" | "demographic";
  text: string;
  archetype?: string; // Primary archetype this question measures
  archetypeWeights?: { [archetypeId: string]: number }; // Multi-archetype questions
  options?: QuestionOption[];
  isReverseCoded?: boolean;
  description?: string;
  responseMapping?: { [key: string]: { archetype: string; weight: number } };
}

export interface QuestionOption {
  value: string;
  text?: string;  // For assessments using 'text' property
  label?: string; // For assessments using 'label' property  
  archetypeScore?: number;
}

export interface ForcedChoiceBlock {
  id: string;
  instruction?: string;
  statements: {
    id?: string;
    text: string;
    archetype: string;
  }[];
}

export interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  archetypes: AssessmentArchetype[];
  questions: {
    demographic?: AssessmentQuestion[];
    direct: AssessmentQuestion[];
    oblique: AssessmentQuestion[];
    scenario: AssessmentQuestion[];
    forcedChoice: ForcedChoiceBlock[];
    balancing: AssessmentQuestion[];
  };
  scoring: {
    likertScale: Record<string, number>;
    forcedChoiceMost: number;
    forcedChoiceLeast: number;
    scenarioArchetypeLinked: number;
    scenarioNeutral: number;
    scenarioOpposite: number;
    resistanceLevels: {
      low: { min: number; max: number };
      moderate: { min: number; max: number };
      high: { min: number; max: number };
    };
  };
}

export interface AssessmentDataFile {
  getAssessmentCategory: (categoryId: string) => AssessmentCategory | null;
  getAllQuestions: (categoryId: string) => AssessmentQuestion[];
  getForcedChoiceBlocks: (categoryId: string) => ForcedChoiceBlock[];
  getArchetypes: (categoryId: string) => AssessmentArchetype[];
}

// Registry of available assessment data files
const assessmentDataRegistry: Map<string, () => Promise<AssessmentDataFile>> = new Map();

// Register assessment data loaders
export function registerAssessmentData(categoryId: string, loader: () => Promise<AssessmentDataFile>) {
  assessmentDataRegistry.set(categoryId, loader);
}

// Initialize registry with existing data files
registerAssessmentData('leadership', async () => {
  const data = await import('./leadership-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

registerAssessmentData('middle-management', async () => {
  const data = await import('./middle_management-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

registerAssessmentData('team-communication', async () => {
  const data = await import('./team_communication-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

// Also register 'team' for dashboard compatibility
registerAssessmentData('team', async () => {
  const data = await import('./team_communication-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

registerAssessmentData('career-growth', async () => {
  const data = await import('./career_growth-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

// Also register 'career' for dashboard compatibility
registerAssessmentData('career', async () => {
  const data = await import('./career_growth-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

registerAssessmentData('sales', async () => {
  const data = await import('./sales-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

registerAssessmentData('individual', async () => {
  const data = await import('./individual-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

// Also register 'individual-performance' for compatibility
registerAssessmentData('individual-performance', async () => {
  const data = await import('./individual-data');
  return {
    getAssessmentCategory: data.getAssessmentCategory,
    getAllQuestions: data.getAllQuestions,
    getForcedChoiceBlocks: data.getForcedChoiceBlocks,
    getArchetypes: data.getArchetypes,
  };
});

// Generic data loader function
export async function getAssessmentData(categoryId: string): Promise<AssessmentDataFile | null> {
  const loader = assessmentDataRegistry.get(categoryId);
  if (!loader) {
    console.error(`Assessment data not found for category: ${categoryId}`);
    return null;
  }
  
  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load assessment data for category: ${categoryId}`, error);
    return null;
  }
}

// Get all registered category IDs
export function getRegisteredCategories(): string[] {
  return Array.from(assessmentDataRegistry.keys());
}

