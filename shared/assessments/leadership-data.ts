// Leadership Assessment Data Structure
// Based on 8 archetypes with comprehensive question sets

export interface LeadershipArchetype {
  id: string;
  name: string;
  description: string;
  traits: string[];
}

export interface AssessmentQuestion {
  id: string;
  type: 'direct' | 'oblique' | 'scenario' | 'forced-choice' | 'balancing';
  text: string;
  archetype?: string; // Primary archetype this question measures
  options?: QuestionOption[];
  archetypeMapping?: Record<string, number>; // For scenario questions: option -> score
  isReverseCoded?: boolean; // For balancing items
}

export interface QuestionOption {
  value: string;
  text: string;
  archetypeScore?: number; // For scenario questions
}

export interface ForcedChoiceBlock {
  id: string;
  statements: ForcedChoiceStatement[];
}

export interface ForcedChoiceStatement {
  text: string;
  archetype: string;
}

// 8 Leadership Archetypes
export const LEADERSHIP_ARCHETYPES: LeadershipArchetype[] = [
  {
    id: 'strategic-architect',
    name: 'Strategic Architect',
    description: 'Focuses on long-term planning and structured frameworks',
    traits: ['Long-term thinking', 'Structured approach', 'Strategic planning', 'Risk assessment']
  },
  {
    id: 'empowering-delegator',
    name: 'Empowering Delegator', 
    description: 'Empowers others and trusts team members to lead',
    traits: ['Trust in others', 'Delegation skills', 'Team empowerment', 'Autonomy support']
  },
  {
    id: 'vision-driven-innovator',
    name: 'Vision Driven Innovator',
    description: 'Drives innovation and pushes for bold, disruptive strategies',
    traits: ['Innovation focus', 'Vision clarity', 'Disruptive thinking', 'Creative leadership']
  },
  {
    id: 'collaborative-harmonizer',
    name: 'Collaborative Harmonizer',
    description: 'Prioritizes consensus, unity, and harmonious relationships',
    traits: ['Consensus building', 'Conflict avoidance', 'Team harmony', 'Collaborative approach']
  },
  {
    id: 'decisive-change-agent',
    name: 'Decisive Change Agent',
    description: 'Thrives on quick decisions and bold organizational changes',
    traits: ['Quick decision making', 'Change leadership', 'Bold action', 'Urgency orientation']
  },
  {
    id: 'people-centric-coach',
    name: 'People-Centric Coach',
    description: 'Focuses on developing and supporting team members',
    traits: ['People development', 'Coaching mindset', 'Individual growth', 'Supportive leadership']
  },
  {
    id: 'risk-aware-stabilizer',
    name: 'Risk-Aware Stabilizer',
    description: 'Emphasizes stability and careful risk management',
    traits: ['Risk management', 'Stability focus', 'Cautious approach', 'Protection mindset']
  },
  {
    id: 'outcome-driven-achiever',
    name: 'Outcome-Driven Achiever',
    description: 'Prioritizes measurable results and immediate outcomes',
    traits: ['Results focus', 'Performance orientation', 'Achievement drive', 'Measurable outcomes']
  }
];

// Direct Questions (Likert 1-5 scale)
export const DIRECT_QUESTIONS: AssessmentQuestion[] = [
  // Strategic Architect
  {
    id: 'direct-1',
    type: 'direct',
    text: 'I feel more confident advancing initiatives when a long-range framework is firmly in place.',
    archetype: 'strategic-architect'
  },
  {
    id: 'direct-2', 
    type: 'direct',
    text: 'I hesitate to commit organizational resources until a structured roadmap has been validated.',
    archetype: 'strategic-architect'
  },
  
  // Empowering Delegator
  {
    id: 'direct-3',
    type: 'direct',
    text: 'I am most effective when I give others the freedom to design their own approach.',
    archetype: 'empowering-delegator'
  },
  {
    id: 'direct-4',
    type: 'direct',
    text: 'I prefer to step back once expectations are set and trust the team to execute.',
    archetype: 'empowering-delegator'
  },
  
  // Vision Driven Innovator
  {
    id: 'direct-5',
    type: 'direct',
    text: 'I resist advancing initiatives until they fully reflect my original vision.',
    archetype: 'vision-driven-innovator'
  },
  {
    id: 'direct-6',
    type: 'direct',
    text: 'I advocate for disruptive strategies, even if they unsettle established practices or stakeholder confidence.',
    archetype: 'vision-driven-innovator'
  },
  
  // Collaborative Harmonizer
  {
    id: 'direct-7',
    type: 'direct',
    text: 'In executive debates, I prioritize maintaining visible unity, even when issues remain unresolved.',
    archetype: 'collaborative-harmonizer'
  },
  {
    id: 'direct-8',
    type: 'direct',
    text: 'I focus on preserving civility and alignment in executive forums, sometimes at the expense of surfacing deeper conflict.',
    archetype: 'collaborative-harmonizer'
  },
  
  // Decisive Change Agent
  {
    id: 'direct-9',
    type: 'direct',
    text: 'I am most energized when driving bold pivots, even if alignment is incomplete.',
    archetype: 'decisive-change-agent'
  },
  {
    id: 'direct-10',
    type: 'direct',
    text: 'I often push for bold moves even when stability might be disrupted.',
    archetype: 'decisive-change-agent'
  },
  
  // People-Centric Coach
  {
    id: 'direct-11',
    type: 'direct',
    text: 'I default to protecting stability, even when it means delaying bold strategic bets.',
    archetype: 'people-centric-coach'
  },
  {
    id: 'direct-12',
    type: 'direct',
    text: 'I often invest extra time in supporting individual growth.',
    archetype: 'people-centric-coach'
  },
  
  // Risk-Aware Stabilizer
  {
    id: 'direct-13',
    type: 'direct',
    text: 'I default to protecting stability, even when it means delaying bold strategic bets.',
    archetype: 'risk-aware-stabilizer'
  },
  {
    id: 'direct-14',
    type: 'direct',
    text: 'I emphasize stability over bold experimentation.',
    archetype: 'risk-aware-stabilizer'
  },
  
  // Outcome-Driven Achiever
  {
    id: 'direct-15',
    type: 'direct',
    text: 'I prioritize quarterly performance metrics as the primary measure of leadership success.',
    archetype: 'outcome-driven-achiever'
  },
  {
    id: 'direct-16',
    type: 'direct',
    text: 'I feel validated when results are immediate and visible, even if long-term positioning is less clear.',
    archetype: 'outcome-driven-achiever'
  }
];

// Oblique Questions (Likert 1-5 scale)
export const OBLIQUE_QUESTIONS: AssessmentQuestion[] = [
  // Strategic Architect
  {
    id: 'oblique-1',
    type: 'oblique',
    text: 'I believe that a well-defined long-term strategy is more important than immediate flexibility.',
    archetype: 'strategic-architect'
  },
  
  // Empowering Delegator  
  {
    id: 'oblique-2',
    type: 'oblique',
    text: 'I believe people perform best when they are given freedom and ownership.',
    archetype: 'empowering-delegator'
  },
  
  // Vision Driven Innovator
  {
    id: 'oblique-3',
    type: 'oblique',
    text: 'I believe progress happens when leaders drive bold innovation forward.',
    archetype: 'vision-driven-innovator'
  },
  
  // Collaborative Harmonizer
  {
    id: 'oblique-4',
    type: 'oblique',
    text: 'When conflict arises, I believe harmony is more important than friction.',
    archetype: 'collaborative-harmonizer'
  },
  {
    id: 'oblique-5',
    type: 'oblique',
    text: 'I feel most confident when the group reaches consensus.',
    archetype: 'collaborative-harmonizer'
  },
  
  // Decisive Change Agent
  {
    id: 'oblique-6',
    type: 'oblique',
    text: 'When organizations face uncertainty, I believe bold action restores confidence.',
    archetype: 'decisive-change-agent'
  },
  {
    id: 'oblique-7',
    type: 'oblique',
    text: 'My best results come from quick, decisive changes.',
    archetype: 'decisive-change-agent'
  },
  
  // People-Centric Coach
  {
    id: 'oblique-8',
    type: 'oblique',
    text: 'When leading, I believe coaching is central to leadership.',
    archetype: 'people-centric-coach'
  },
  {
    id: 'oblique-9',
    type: 'oblique',
    text: 'I feel most effective when my team grows professionally.',
    archetype: 'people-centric-coach'
  },
  
  // Risk-Aware Stabilizer
  {
    id: 'oblique-10',
    type: 'oblique',
    text: 'When facing uncertainty, I believe it\'s safer to protect stability.',
    archetype: 'risk-aware-stabilizer'
  },
  {
    id: 'oblique-11',
    type: 'oblique',
    text: 'My best outcomes occur when I avoid risks that could destabilize.',
    archetype: 'risk-aware-stabilizer'
  },
  
  // Outcome-Driven Achiever
  {
    id: 'oblique-12',
    type: 'oblique',
    text: 'When leading, I believe results matter more than process.',
    archetype: 'outcome-driven-achiever'
  },
  {
    id: 'oblique-13',
    type: 'oblique',
    text: 'I feel successful when immediate results are delivered.',
    archetype: 'outcome-driven-achiever'
  }
];

// Scenario Questions (Multi-choice with archetype mapping)
export const SCENARIO_QUESTIONS: AssessmentQuestion[] = [
  // Strategic Architect scenarios
  {
    id: 'scenario-1',
    type: 'scenario',
    text: 'When unexpected challenges arise, you typically:',
    archetype: 'strategic-architect',
    options: [
      { value: 'a', text: 'Adapt quickly and change course as needed.', archetypeScore: 1 },
      { value: 'b', text: 'Prefer to stick to the original strategic plan.', archetypeScore: 5 },
      { value: 'c', text: 'Seek input from the team to adjust the plan.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-2',
    type: 'scenario',
    text: 'Your organization is facing a sudden market shift that wasn\'t in your original strategy. Do you:',
    archetype: 'strategic-architect',
    options: [
      { value: 'a', text: 'Adjust the strategic plan immediately to respond.', archetypeScore: 1 },
      { value: 'b', text: 'Stick to the existing plan and monitor the impact.', archetypeScore: 5 },
      { value: 'c', text: 'Convene a team meeting to gather diverse perspectives first.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-3',
    type: 'scenario',
    text: 'A board member pushes for a market pivot before the plan is complete. Do you:',
    archetype: 'strategic-architect',
    options: [
      { value: 'a', text: 'Insist on finalizing the roadmap first.', archetypeScore: 5 },
      { value: 'b', text: 'Move ahead with partial clarity.', archetypeScore: 1 },
      { value: 'c', text: 'Test a pilot while refining strategy.', archetypeScore: 3 }
    ]
  },
  
  // Empowering Delegator scenarios
  {
    id: 'scenario-4',
    type: 'scenario',
    text: 'When delegation goes well, it\'s because:',
    archetype: 'empowering-delegator',
    options: [
      { value: 'a', text: 'I stayed closely involved throughout.', archetypeScore: 1 },
      { value: 'b', text: 'I gave the team ownership and let them lead.', archetypeScore: 5 },
      { value: 'c', text: 'I balanced oversight with autonomy.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-5',
    type: 'scenario',
    text: 'A high stakes project is assigned to your team. Do you:',
    archetype: 'empowering-delegator',
    options: [
      { value: 'a', text: 'Personally take charge to ensure success.', archetypeScore: 1 },
      { value: 'b', text: 'Assign ownership to a capable team member and support them when asked.', archetypeScore: 5 },
      { value: 'c', text: 'Share leadership responsibilities across multiple stakeholders.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-6',
    type: 'scenario',
    text: 'A team member takes a risk and fails. You:',
    archetype: 'empowering-delegator',
    options: [
      { value: 'a', text: 'Step in to take control of future decisions.', archetypeScore: 1 },
      { value: 'b', text: 'See it as part of their growth and continue empowering them.', archetypeScore: 5 },
      { value: 'c', text: 'Reassign them to safer tasks.', archetypeScore: 3 }
    ]
  },
  
  // Vision Driven Innovator scenarios
  {
    id: 'scenario-7',
    type: 'scenario',
    text: 'When introducing innovation, you tend to:',
    archetype: 'vision-driven-innovator',
    options: [
      { value: 'a', text: 'Push for bold new concepts, even if risky.', archetypeScore: 5 },
      { value: 'b', text: 'Wait until ideas are proven and safe.', archetypeScore: 1 },
      { value: 'c', text: 'Adapt old strategies to fit new challenges.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-8',
    type: 'scenario',
    text: 'Your team\'s version of a concept changes the original design. Do you:',
    archetype: 'vision-driven-innovator',
    options: [
      { value: 'a', text: 'Let their approach move forward.', archetypeScore: 1 },
      { value: 'b', text: 'Rework it to preserve your original intent.', archetypeScore: 5 },
      { value: 'c', text: 'Blend both approaches into a compromise.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-9',
    type: 'scenario',
    text: 'A competitor releases a disruptive offering. Your concept is still in refinement. Do you:',
    archetype: 'vision-driven-innovator',
    options: [
      { value: 'a', text: 'Hold for full alignment with your vision.', archetypeScore: 5 },
      { value: 'b', text: 'Release an imperfect version.', archetypeScore: 1 },
      { value: 'c', text: 'Pilot-test to keep pace.', archetypeScore: 3 }
    ]
  },
  
  // Collaborative Harmonizer scenarios
  {
    id: 'scenario-10',
    type: 'scenario',
    text: 'A peer suggests a direction you disagree with. You:',
    archetype: 'collaborative-harmonizer',
    options: [
      { value: 'a', text: 'Challenge their perspective directly.', archetypeScore: 1 },
      { value: 'b', text: 'Step back to avoid tension.', archetypeScore: 5 },
      { value: 'c', text: 'Suggest a compromise that blends both views.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-11',
    type: 'scenario',
    text: 'Your executive team is divided on whether to pursue a risky market expansion. Do you:',
    archetype: 'collaborative-harmonizer',
    options: [
      { value: 'a', text: 'Extend debate to preserve consensus.', archetypeScore: 5 },
      { value: 'b', text: 'Push for a quick decision.', archetypeScore: 1 },
      { value: 'c', text: 'Escalate to board for alignment.', archetypeScore: 3 }
    ]
  },
  
  // Decisive Change Agent scenarios
  {
    id: 'scenario-12',
    type: 'scenario',
    text: 'A major competitor announces a disruptive shift. Do you:',
    archetype: 'decisive-change-agent',
    options: [
      { value: 'a', text: 'Immediately pivot strategy.', archetypeScore: 5 },
      { value: 'b', text: 'Hold for analysis before responding.', archetypeScore: 1 },
      { value: 'c', text: 'Pilot-test a rapid adjustment.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-13',
    type: 'scenario',
    text: 'The board resists a bold idea you propose. You:',
    archetype: 'decisive-change-agent',
    options: [
      { value: 'a', text: 'Push forward with urgency anyway.', archetypeScore: 5 },
      { value: 'b', text: 'Revise the idea until it gains support.', archetypeScore: 1 },
      { value: 'c', text: 'Drop it in favor of stability.', archetypeScore: 3 }
    ]
  },
  
  // People-Centric Coach scenarios
  {
    id: 'scenario-14',
    type: 'scenario',
    text: 'A struggling team member slows performance. You:',
    archetype: 'people-centric-coach',
    options: [
      { value: 'a', text: 'Reassign them to minimize disruption.', archetypeScore: 1 },
      { value: 'b', text: 'Coach them through the challenge, even if it delays results.', archetypeScore: 5 },
      { value: 'c', text: 'Focus your attention on stronger performers.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-15',
    type: 'scenario',
    text: 'You are asked to cut training budgets for efficiency. You:',
    archetype: 'people-centric-coach',
    options: [
      { value: 'a', text: 'Push to protect development resources.', archetypeScore: 5 },
      { value: 'b', text: 'Accept the cuts and reprioritize.', archetypeScore: 1 },
      { value: 'c', text: 'Delay to negotiate later.', archetypeScore: 3 }
    ]
  },
  
  // Risk-Aware Stabilizer scenarios
  {
    id: 'scenario-16',
    type: 'scenario',
    text: 'The board pressures for bold entry into a volatile market. Do you:',
    archetype: 'risk-aware-stabilizer',
    options: [
      { value: 'a', text: 'Delay until risk controls are certain.', archetypeScore: 5 },
      { value: 'b', text: 'Approve a phased entry.', archetypeScore: 3 },
      { value: 'c', text: 'Move decisively to seize the window.', archetypeScore: 1 }
    ]
  },
  {
    id: 'scenario-17',
    type: 'scenario',
    text: 'A new strategy involves uncertainty and cultural change. You:',
    archetype: 'risk-aware-stabilizer',
    options: [
      { value: 'a', text: 'Slow-roll the change to reduce exposure.', archetypeScore: 5 },
      { value: 'b', text: 'Push forward quickly.', archetypeScore: 1 },
      { value: 'c', text: 'Pilot-test before scaling.', archetypeScore: 3 }
    ]
  },
  
  // Outcome-Driven Achiever scenarios
  {
    id: 'scenario-18',
    type: 'scenario',
    text: 'The board pressures you to show quarterly performance. You:',
    archetype: 'outcome-driven-achiever',
    options: [
      { value: 'a', text: 'Focus on visible wins to prove results.', archetypeScore: 5 },
      { value: 'b', text: 'Stay firm on long-term strategy.', archetypeScore: 1 },
      { value: 'c', text: 'Reframe the conversation to emphasize growth.', archetypeScore: 3 }
    ]
  },
  {
    id: 'scenario-19',
    type: 'scenario',
    text: 'You\'re leading a team project. Do you:',
    archetype: 'outcome-driven-achiever',
    options: [
      { value: 'a', text: 'Push hard for clear deliverables on time.', archetypeScore: 5 },
      { value: 'b', text: 'Allow flexibility to focus on creativity.', archetypeScore: 1 },
      { value: 'c', text: 'Coach the team through learning over results.', archetypeScore: 3 }
    ]
  }
];

// Forced Choice Blocks (Ipsative trade-offs)
export const FORCED_CHOICE_BLOCKS: ForcedChoiceBlock[] = [
  {
    id: 'forced-choice-1',
    statements: [
      { text: 'I rely on a structured strategic roadmap.', archetype: 'strategic-architect' },
      { text: 'I thrive on adapting quickly to new information.', archetype: 'decisive-change-agent' },
      { text: 'I focus on maintaining team harmony.', archetype: 'collaborative-harmonizer' },
      { text: 'I prioritize mentoring my team members.', archetype: 'people-centric-coach' }
    ]
  },
  {
    id: 'forced-choice-2',
    statements: [
      { text: 'I feel most comfortable when we have a solid, long-term strategy.', archetype: 'strategic-architect' },
      { text: 'I enjoy taking bold risks to achieve results.', archetype: 'decisive-change-agent' },
      { text: 'I prefer to ensure stability and minimize risks.', archetype: 'risk-aware-stabilizer' },
      { text: 'I prioritize team input in decision-making.', archetype: 'collaborative-harmonizer' }
    ]
  },
  {
    id: 'forced-choice-3',
    statements: [
      { text: 'I trust my team to own decisions.', archetype: 'empowering-delegator' },
      { text: 'I rely on long-term structured plans.', archetype: 'strategic-architect' },
      { text: 'I thrive in crises and fast pivots.', archetype: 'decisive-change-agent' },
      { text: 'I focus on minimizing risks and uncertainty.', archetype: 'risk-aware-stabilizer' }
    ]
  },
  {
    id: 'forced-choice-4',
    statements: [
      { text: 'I empower others to take full accountability.', archetype: 'empowering-delegator' },
      { text: 'I hold tightly to my vision until it\'s realized.', archetype: 'vision-driven-innovator' },
      { text: 'I ensure quick wins and measurable results.', archetype: 'outcome-driven-achiever' },
      { text: 'I prioritize harmony when conflicts arise.', archetype: 'collaborative-harmonizer' }
    ]
  },
  {
    id: 'forced-choice-5',
    statements: [
      { text: 'I prefer to refine ideas until they\'re polished.', archetype: 'vision-driven-innovator' },
      { text: 'I empower others to make their own decisions.', archetype: 'empowering-delegator' },
      { text: 'I ensure stability by reducing risks.', archetype: 'risk-aware-stabilizer' },
      { text: 'I thrive in high-pressure emergencies.', archetype: 'decisive-change-agent' }
    ]
  },
  {
    id: 'forced-choice-6',
    statements: [
      { text: 'I prioritize creativity and vision.', archetype: 'vision-driven-innovator' },
      { text: 'I prefer consensus to avoid conflict.', archetype: 'collaborative-harmonizer' },
      { text: 'I focus on near-term outcomes.', archetype: 'outcome-driven-achiever' },
      { text: 'I rely on structured long-term strategy.', archetype: 'strategic-architect' }
    ]
  },
  {
    id: 'forced-choice-7',
    statements: [
      { text: 'I smooth disagreements to keep the peace.', archetype: 'collaborative-harmonizer' },
      { text: 'I thrive when fast pivots are required.', archetype: 'decisive-change-agent' },
      { text: 'I keep control over the vision narrative.', archetype: 'vision-driven-innovator' },
      { text: 'I focus on immediate results.', archetype: 'outcome-driven-achiever' }
    ]
  },
  {
    id: 'forced-choice-8',
    statements: [
      { text: 'I prioritize consensus even when time is short.', archetype: 'collaborative-harmonizer' },
      { text: 'I prefer structured long term strategy.', archetype: 'strategic-architect' },
      { text: 'I empower others to own their decisions.', archetype: 'empowering-delegator' },
      { text: 'I ensure risks are minimized before acting.', archetype: 'risk-aware-stabilizer' }
    ]
  },
  {
    id: 'forced-choice-9',
    statements: [
      { text: 'I thrive when change is urgent.', archetype: 'decisive-change-agent' },
      { text: 'I prefer long-term structure and stability.', archetype: 'strategic-architect' },
      { text: 'I cushion feedback to maintain harmony.', archetype: 'collaborative-harmonizer' },
      { text: 'I emphasize short-term measurable wins.', archetype: 'outcome-driven-achiever' }
    ]
  },
  {
    id: 'forced-choice-10',
    statements: [
      { text: 'I act boldly under pressure.', archetype: 'decisive-change-agent' },
      { text: 'I refine ideas until they are flawless.', archetype: 'vision-driven-innovator' },
      { text: 'I delegate fully and step back.', archetype: 'empowering-delegator' },
      { text: 'I prioritize minimizing risks.', archetype: 'risk-aware-stabilizer' }
    ]
  },
  {
    id: 'forced-choice-11',
    statements: [
      { text: 'I focus on growing others\' potential.', archetype: 'people-centric-coach' },
      { text: 'I act decisively under pressure.', archetype: 'decisive-change-agent' },
      { text: 'I refine ideas until they feel perfect.', archetype: 'vision-driven-innovator' },
      { text: 'I minimize risks before committing.', archetype: 'risk-aware-stabilizer' }
    ]
  },
  {
    id: 'forced-choice-12',
    statements: [
      { text: 'I invest in coaching even when results may slow.', archetype: 'people-centric-coach' },
      { text: 'I deliver immediate outcomes.', archetype: 'outcome-driven-achiever' },
      { text: 'I emphasize consensus and harmony.', archetype: 'collaborative-harmonizer' },
      { text: 'I rely on long-term structured planning.', archetype: 'strategic-architect' }
    ]
  },
  {
    id: 'forced-choice-13',
    statements: [
      { text: 'I prioritize protecting stability.', archetype: 'risk-aware-stabilizer' },
      { text: 'I thrive most during crises.', archetype: 'decisive-change-agent' },
      { text: 'I refine plans until they are flawless.', archetype: 'vision-driven-innovator' },
      { text: 'I empower others to make their own calls.', archetype: 'empowering-delegator' }
    ]
  },
  {
    id: 'forced-choice-14',
    statements: [
      { text: 'I minimize risks before moving forward.', archetype: 'risk-aware-stabilizer' },
      { text: 'I smooth over disagreements for harmony.', archetype: 'collaborative-harmonizer' },
      { text: 'I focus more on immediate results.', archetype: 'outcome-driven-achiever' },
      { text: 'I prioritize structured strategy.', archetype: 'strategic-architect' }
    ]
  },
  {
    id: 'forced-choice-15',
    statements: [
      { text: 'I emphasize measurable outcomes.', archetype: 'outcome-driven-achiever' },
      { text: 'I thrive in urgent crises.', archetype: 'decisive-change-agent' },
      { text: 'I refine ideas until they\'re perfect.', archetype: 'vision-driven-innovator' },
      { text: 'I emphasize consensus over conflict.', archetype: 'collaborative-harmonizer' }
    ]
  },
  {
    id: 'forced-choice-16',
    statements: [
      { text: 'I focus on results above all else.', archetype: 'outcome-driven-achiever' },
      { text: 'I protect stability and minimize risk.', archetype: 'risk-aware-stabilizer' },
      { text: 'I empower others to lead autonomously.', archetype: 'empowering-delegator' },
      { text: 'I build strategy around long-term structure.', archetype: 'strategic-architect' }
    ]
  }
];

// Balancing Items (Reverse-coded questions across archetypes)
export const BALANCING_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'balance-1',
    type: 'balancing',
    text: 'I am comfortable delegating major decisions without re-checking the details myself.',
    archetype: 'empowering-delegator',
    isReverseCoded: false
  },
  {
    id: 'balance-2',
    type: 'balancing',
    text: 'I share early-stage ideas with my peers, even if they are not yet polished.',
    archetype: 'collaborative-harmonizer',
    isReverseCoded: false
  },
  {
    id: 'balance-3',
    type: 'balancing',
    text: 'I deliver direct feedback promptly, even when I know it may create discomfort.',
    archetype: 'decisive-change-agent',
    isReverseCoded: false
  },
  {
    id: 'balance-4',
    type: 'balancing',
    text: 'I am willing to ask for help or input from other executives when the stakes are high.',
    archetype: 'collaborative-harmonizer',
    isReverseCoded: false
  },
  {
    id: 'balance-5',
    type: 'balancing',
    text: 'I prioritize preventative planning over reacting to crises.',
    archetype: 'strategic-architect',
    isReverseCoded: false
  },
  {
    id: 'balance-6',
    type: 'balancing',
    text: 'I can disagree respectfully with senior peers even when it risks tension.',
    archetype: 'decisive-change-agent',
    isReverseCoded: false
  },
  {
    id: 'balance-7',
    type: 'balancing',
    text: 'I defend long-term strategy even when short-term performance pressure is intense.',
    archetype: 'strategic-architect',
    isReverseCoded: false
  },
  {
    id: 'balance-8',
    type: 'balancing',
    text: 'I address underperformance in senior leaders directly and without delay.',
    archetype: 'outcome-driven-achiever',
    isReverseCoded: false
  },
  {
    id: 'balance-9',
    type: 'balancing',
    text: 'I trust my leadership team to represent our work externally without me stepping in.',
    archetype: 'empowering-delegator',
    isReverseCoded: false
  },
  {
    id: 'balance-10',
    type: 'balancing',
    text: 'I welcome input that significantly reshapes my original vision.',
    archetype: 'vision-driven-innovator',
    isReverseCoded: true // This is reverse-coded for the innovator
  },
  {
    id: 'balance-11',
    type: 'balancing',
    text: 'I view healthy conflict as necessary for stronger decisions.',
    archetype: 'collaborative-harmonizer',
    isReverseCoded: true // This is reverse-coded for the harmonizer
  },
  {
    id: 'balance-12',
    type: 'balancing',
    text: 'I share my own leadership challenges with my team when it helps build trust.',
    archetype: 'people-centric-coach',
    isReverseCoded: false
  },
  {
    id: 'balance-13',
    type: 'balancing',
    text: 'I maintain focus and composure even without a crisis driving urgency.',
    archetype: 'decisive-change-agent',
    isReverseCoded: true // This is reverse-coded for change agent
  },
  {
    id: 'balance-14',
    type: 'balancing',
    text: 'I prioritize decisive action over waiting for full consensus.',
    archetype: 'collaborative-harmonizer',
    isReverseCoded: true // This is reverse-coded for harmonizer
  },
  {
    id: 'balance-15',
    type: 'balancing',
    text: 'I commit to bold strategic bets with uncertainty if they protect the long-term future.',
    archetype: 'risk-aware-stabilizer',
    isReverseCoded: true // This is reverse-coded for stabilizer
  },
  {
    id: 'balance-16',
    type: 'balancing',
    text: 'I raise systemic or cultural issues even if they may cause discomfort in the short term.',
    archetype: 'people-centric-coach',
    isReverseCoded: false
  }
];

// Response scale definitions
export const LIKERT_SCALE = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

// Scoring constants
export const SCORING = {
  LIKERT_MIN: 1,
  LIKERT_MAX: 5,
  SCENARIO_HIGH: 5,
  SCENARIO_NEUTRAL: 3,
  SCENARIO_LOW: 1,
  FORCED_CHOICE_MOST: 2,
  FORCED_CHOICE_LEAST: -1,
  FORCED_CHOICE_NEUTRAL: 0
};