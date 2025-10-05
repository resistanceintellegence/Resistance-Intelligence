// Canonical archetype configuration for all 6 assessment categories
// Each category has exactly 8 archetypes with proper abbreviations

export interface ArchetypeConfig {
  code: string; // Unique slug identifier
  abbreviation: string; // 2-4 letter abbreviation for display
  name: string;
  description: string;
  context: string; // Assessment category
}

export const CANONICAL_ARCHETYPES: ArchetypeConfig[] = [
  // ============ LEADERSHIP (8 archetypes) ============
  {
    code: "strategic-architect",
    abbreviation: "SA",
    name: "Strategic Architect",
    description: "Relies on long-range frameworks and resists committing without validated roadmaps",
    context: "leadership"
  },
  {
    code: "empowering-delegator",
    abbreviation: "ED",
    name: "Empowering Delegator",
    description: "Steps back and trusts teams to execute with minimal oversight",
    context: "leadership"
  },
  {
    code: "vision-driven-innovator",
    abbreviation: "VDI",
    name: "Vision Driven Innovator",
    description: "Resists advancing initiatives until they fully reflect original vision",
    context: "leadership"
  },
  {
    code: "collaborative-harmonizer",
    abbreviation: "CH",
    name: "Collaborative Harmonizer",
    description: "Prioritizes maintaining unity and civility, sometimes at the expense of deeper conflict",
    context: "leadership"
  },
  {
    code: "decisive-change-agent",
    abbreviation: "DCA",
    name: "Decisive Change Agent",
    description: "Energized by bold pivots and quick action, even with incomplete alignment",
    context: "leadership"
  },
  {
    code: "people-centric-coach",
    abbreviation: "PCC",
    name: "People-Centric Coach",
    description: "Invests extra time in individual growth and development",
    context: "leadership"
  },
  {
    code: "risk-aware-stabilizer",
    abbreviation: "RAS",
    name: "Risk-Aware Stabilizer",
    description: "Defaults to protecting stability, even when it means delaying bold bets",
    context: "leadership"
  },
  {
    code: "outcome-driven-achiever",
    abbreviation: "ODA",
    name: "Outcome-Driven Achiever",
    description: "Prioritizes immediate, visible results as the primary measure of success",
    context: "leadership"
  },

  // ============ MIDDLE MANAGEMENT (8 archetypes) ============
  {
    code: "micromanager",
    abbreviation: "MM",
    name: "Micromanager",
    description: "Steps in to re-do or double-check team's work, staying closely involved in details",
    context: "middle_management"
  },
  {
    code: "bottleneck-manager",
    abbreviation: "BM",
    name: "Bottleneck Manager",
    description: "Decisions wait on them before progress can continue",
    context: "middle_management"
  },
  {
    code: "firefighter",
    abbreviation: "FF",
    name: "Firefighter",
    description: "Spends more time reacting to urgent issues than planning ahead",
    context: "middle_management"
  },
  {
    code: "overloaded-doer",
    abbreviation: "OD",
    name: "Overloaded Doer",
    description: "Takes on more work than realistically manageable, saying yes too often",
    context: "middle_management"
  },
  {
    code: "conflict-avoider",
    abbreviation: "CA",
    name: "Conflict Avoider",
    description: "Softens or delays feedback to maintain peace and avoid disagreement",
    context: "middle_management"
  },
  {
    code: "credit-seeker",
    abbreviation: "CS",
    name: "Credit Seeker",
    description: "Highlights their role in successes to ensure visibility with leadership",
    context: "middle_management"
  },
  {
    code: "detached-manager",
    abbreviation: "DM",
    name: "Detached Manager",
    description: "Disengages from team when work feels overwhelming",
    context: "middle_management"
  },
  {
    code: "rule-bound-operator",
    abbreviation: "RBO",
    name: "Rule-Bound Operator",
    description: "Prefers strict processes and procedures, even if they slow progress",
    context: "middle_management"
  },

  // ============ TEAM COMMUNICATION (8 archetypes) ============
  {
    code: "withholder",
    abbreviation: "WH",
    name: "Withholder",
    description: "Holds back concerns and stays silent in meetings to avoid conflict",
    context: "team_communication"
  },
  {
    code: "guarded-collaborator",
    abbreviation: "GC",
    name: "Guarded Collaborator",
    description: "Shares only part of thinking until trust is established",
    context: "team_communication"
  },
  {
    code: "dominator",
    abbreviation: "DOM",
    name: "Dominator",
    description: "Pushes hard to make sure their voice is heard and takes control of conversations",
    context: "team_communication"
  },
  {
    code: "peacemaker",
    abbreviation: "PM",
    name: "Peacemaker",
    description: "Agrees quickly to avoid disagreement and maintain group harmony",
    context: "team_communication"
  },
  {
    code: "fragmenter",
    abbreviation: "FRAG",
    name: "Fragmenter",
    description: "Prefers to keep control over their part, sharing updates only within immediate group",
    context: "team_communication"
  },
  {
    code: "closed-off-colleague",
    abbreviation: "COC",
    name: "Closed-Off Colleague",
    description: "Rarely volunteers ideas and keeps input brief or minimal",
    context: "team_communication"
  },
  {
    code: "distractor",
    abbreviation: "DIST",
    name: "Distractor",
    description: "Uses humor and tangents even if it takes focus away from core issues",
    context: "team_communication"
  },
  {
    code: "over-adapter",
    abbreviation: "OA",
    name: "Over-Adapter",
    description: "Adjusts tone or stance to match others, hiding their real view",
    context: "team_communication"
  },

  // ============ CAREER GROWTH (8 archetypes) ============
  {
    code: "invisible-contributor",
    abbreviation: "IC",
    name: "Invisible Contributor",
    description: "Lets others take credit and rarely shares progress updates",
    context: "career_growth"
  },
  {
    code: "recognition-seeker",
    abbreviation: "RS",
    name: "Recognition Seeker",
    description: "Looks for opportunities that make them visible to leadership",
    context: "career_growth"
  },
  {
    code: "risk-avoider",
    abbreviation: "RA",
    name: "Risk Avoider",
    description: "Hesitates to pursue opportunities unless feeling completely ready",
    context: "career_growth"
  },
  {
    code: "reluctant-leader",
    abbreviation: "RL",
    name: "Reluctant Leader",
    description: "Hesitates to take leadership roles even when qualified",
    context: "career_growth"
  },
  {
    code: "people-pleaser",
    abbreviation: "PP",
    name: "People-Pleaser",
    description: "Struggles to say no, prioritizing harmony over career goals",
    context: "career_growth"
  },
  {
    code: "over-qualifier",
    abbreviation: "OQ",
    name: "Over-Qualifier",
    description: "Avoids applying for roles unless exceeding every requirement",
    context: "career_growth"
  },
  {
    code: "strength-reliant",
    abbreviation: "SR",
    name: "Strength Reliant",
    description: "Prefers to rely on mastered skills, resisting unfamiliar abilities",
    context: "career_growth"
  },
  {
    code: "comfort-zoner",
    abbreviation: "CZ",
    name: "Comfort Zoner",
    description: "Prefers predictable assignments over high-stakes projects",
    context: "career_growth"
  },

  // ============ SALES (8 archetypes) ============
  {
    code: "over-promiser",
    abbreviation: "OP",
    name: "Over Promiser",
    description: "Agrees to customer requests even when unsure of delivery capability",
    context: "sales"
  },
  {
    code: "closer-controller",
    abbreviation: "CC",
    name: "Closer Controller",
    description: "Pushes hard to control conversation and steer toward quick close",
    context: "sales"
  },
  {
    code: "relationship-pleaser",
    abbreviation: "RP",
    name: "Relationship Pleaser",
    description: "Avoids difficult questions to keep interactions friendly and avoid tension",
    context: "sales"
  },
  {
    code: "discount-giver",
    abbreviation: "DG",
    name: "Discount Giver",
    description: "Quickly offers discounts when sensing hesitation instead of exploring value",
    context: "sales"
  },
  {
    code: "product-drowner",
    abbreviation: "PD",
    name: "Product Drowner",
    description: "Goes into great detail about features, losing focus on customer needs",
    context: "sales"
  },
  {
    code: "pipeline-avoider",
    abbreviation: "PA",
    name: "Pipeline Avoider",
    description: "Procrastinates on prospecting, relying on inbound or referrals",
    context: "sales"
  },
  {
    code: "reactive-firefighter",
    abbreviation: "RF",
    name: "Reactive Firefighter",
    description: "Chases urgent deals while ignoring steady pipeline work",
    context: "sales"
  },
  {
    code: "silent-resistor",
    abbreviation: "SIR",
    name: "Silent Resistor",
    description: "Waits for customer to decide instead of asking for the close",
    context: "sales"
  },

  // ============ INDIVIDUAL (8 archetypes) ============
  {
    code: "perfectionist-achiever",
    abbreviation: "PA",
    name: "Perfectionist Achiever",
    description: "Rechecks and refines work multiple times, hesitating to share until flawless",
    context: "individual"
  },
  {
    code: "helper-over-giver",
    abbreviation: "HOG",
    name: "Helper / Over-Giver",
    description: "Takes on extra responsibilities to support others, struggles to say no",
    context: "individual"
  },
  {
    code: "avoider",
    abbreviation: "AV",
    name: "Avoider",
    description: "Delays starting tasks that feel uncomfortable or uncertain",
    context: "individual"
  },
  {
    code: "cautious-evaluator",
    abbreviation: "CE",
    name: "Cautious Evaluator",
    description: "Overthinks decisions and double-checks plans multiple times before starting",
    context: "individual"
  },
  {
    code: "independent-doer",
    abbreviation: "ID",
    name: "Independent Doer",
    description: "Prefers to work independently and resists relying on others",
    context: "individual"
  },
  {
    code: "recognition-seeker-ind",
    abbreviation: "RSI",
    name: "Recognition Seeker",
    description: "More motivated when efforts are noticed and contributions are visible",
    context: "individual"
  },
  {
    code: "over-controller",
    abbreviation: "OC",
    name: "Over-Controller",
    description: "Feels things go better when in control, struggles to delegate",
    context: "individual"
  },
  {
    code: "comfort-zoner-ind",
    abbreviation: "CZI",
    name: "Comfort Zoner",
    description: "Prefers steady, predictable tasks over high-stakes challenges",
    context: "individual"
  }
];

// Helper function to get archetypes by context
export function getArchetypesByContext(context: string): ArchetypeConfig[] {
  return CANONICAL_ARCHETYPES.filter(a => a.context === context);
}

// Helper function to validate all contexts have 8 archetypes
export function validateArchetypeCounts() {
  const contexts = ["leadership", "middle_management", "team_communication", "career_growth", "sales", "individual"];
  const counts: Record<string, number> = {};
  
  contexts.forEach(ctx => {
    counts[ctx] = getArchetypesByContext(ctx).length;
  });
  
  return counts;
}
