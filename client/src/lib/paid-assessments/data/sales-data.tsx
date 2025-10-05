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
  };
  highResistanceCharacteristics?: string[];
  coreBehaviorsUnderResistance?: string[];
  rootCauses?: string[];
  beliefsThatDriveResistance?: string[];
  whatOthersExperience?: {
    directReports?: string;
    peers?: string;
    seniorLeaders?: string;
    customers?: string;
    managers?: string;
    partners?: string;
    clients?: string;
    advisors?: string;
    earlyCustomers?: string;
    youSelfPerception?: string;
    leadershipTeam?: string;
    departmentTeams?: string;
    peerManagers?: string;
    businessPartners?: string;
    investors?: string;
    managementTeam?: string;
    team?: string;
  };
  organizationalTriggers?: {
    amplifiers?: string[];
    softeners?: string[];
  };
  strengthsHiddenInside?: string[];
  detailedResistanceCosts?: string[];
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
  type: "direct" | "oblique" | "scenario" | "forced-choice" | "balancing";
  text: string;
  archetype?: string; // Primary archetype this question measures
  isReverseCoded?: boolean; // For balancing questions
  options?: QuestionOption[];
}

export interface QuestionOption {
  value: string;
  label: string;
  archetypeScore?: number; // For scenario questions
}

export interface ForcedChoiceBlock {
  id: string;
  instructions: string;
  statements: ForcedChoiceStatement[];
}

export interface ForcedChoiceStatement {
  id: string;
  text: string;
  archetype: string;
}

export interface SpecialScenario {
  id: string;
  title: string;
  condition: {
    type:
      | "all_low"
      | "all_moderate"
      | "all_high"
      | "mixed_low_moderate"
      | "mixed_moderate_high"
      | "mixed_balanced_highs";
    thresholds?: {
      low?: number;
      moderate?: number;
      high?: number;
    };
  };
  content: {
    firstKnowThis: string;
    whatItMeans?: string[];
    whatThisLooksLike?: string[];
    strengthsHiddenInside?: string[];
    potentialRisks?: string[];
    growthPath: string[];
    introText?: string;
  };
}

export interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  archetypes: AssessmentArchetype[];
  questions: {
    direct: AssessmentQuestion[];
    oblique: AssessmentQuestion[];
    scenario: AssessmentQuestion[];
    balancing: AssessmentQuestion[];
    forcedChoice: ForcedChoiceBlock[];
  };
  scoring: {
    forcedChoiceMost: number; // Points for "most like me"
    forcedChoiceLeast: number; // Points for "least like me"
    resistanceBands: {
      low: { min: number; max: number };
      moderate: { min: number; max: number };
      high: { min: number; max: number };
    };
  };
  specialScenarios?: SpecialScenario[];
}

// LIKERT Scale (shared from original)
export const LIKERT_SCALE = {
  "strongly-disagree": 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  "strongly-agree": 5,
};

// Sales Assessment Data
const SALES_ASSESSMENT_CATEGORY: AssessmentCategory = {
  id: "sales-assessment",
  name: "Sales Assessment",
  description:
    "Comprehensive sales style and resistance pattern assessment based on 8 archetypes",

  archetypes: [
    {
      id: "over-promiser",
      name: "Over Promiser",
      description:
        "Says yes to everything, risks credibility by over-committing",
      traits: [
        "High desire to please",
        "Optimistic about outcomes",
        "Avoids saying no",
        "Focuses on immediate agreement",
      ],
      detailedDescription:
        "Your results show Resistance in how you handle commitments and promises during the sales process.\nAt your best, you are a seller who inspires confidence. Customers feel supported, reassured, and excited to work with you. Your instinct to say yes quickly builds momentum and reduces friction. This energy can help close deals that might otherwise stall.\nBut when resistance is high, the very strength of reassurance narrows into over-commitment. Instead of creating trust, the habit of agreeing too quickly creates misalignment between what is promised and what can realistically be delivered. Customers may initially feel excited but later disappointed if deadlines slip, scope expands, or value feels diluted.\nThis pattern is called the Over Promiser. It does not mean you lack honesty or skill. It means your resistance shows up as a strong pull to remove barriers by committing quickly. This feels safe in the moment but creates downstream challenges that stall growth.\nYour resistance does not erase your strength as a builder of momentum. Instead, it narrows it. When you learn to balance reassurance with boundaries, your ability to promise transforms into credibility and trust that sustain long-term sales growth.",
      strengthsInsights: [
        "Optimism that energizes customers.",
        "Quick adaptability that keeps conversations moving.",
        "Confidence that reassures during tense moments.",
        "Willingness to go the extra mile for the customer.",
      ],
      highResistanceCharacteristics: [
        "Create delivery strain as teams scramble to meet promises.",
        "Cause credibility gaps when commitments do not match reality.",
        "Encourage customers to expect more concessions over time.",
        "Win quick deals but reduce referrals and repeat business.",
      ],
      resistanceCosts: [
        "Reduce repeat business when promises are not met.",
        "Damage credibility with customers and peers.",
        "Lower profitability due to discounts or added concessions.",
        "Create delivery bottlenecks that strain operations.",
        "Limit growth by trading short-term wins for long-term trust.",
      ],
      developmentAreas: [
        "Set realistic expectations and boundaries",
        "Improve internal communication for feasibility checks",
        "Focus on long-term customer satisfaction over quick wins",
      ],
      growthPath: {
        immediateShifts: [
          "Replace automatic yes with “let me confirm and get back to you.”",
          "Practice saying no respectfully by framing boundaries as trust-building.",
        ],
        strategicPractices: [
          "Anchor conversations in value before making commitments.",
          "Track where over-promising created rework to build awareness.",
          "Use negotiation scripts that highlight limits as strengths.",
        ],
        longTermGrowth: [
          "Reframe reassurance as credibility, not concession.",
          "Build habits of pausing before committing in high-stakes moments.",
          "Model to customers and peers that honesty strengthens relationships.",
          "Shift from closing quickly to closing sustainably, creating growth that scales.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Agree to requests before checking feasibility.",
        "Promise faster delivery than resources allow.",
        "Add extras or discounts to secure agreement.",
        "Avoid saying no to maintain customer excitement.",
        "Reassure customers with commitments instead of exploring needs fully.",
      ],
      rootCauses: [
        "Early managers who rewarded closing speed more than delivery accuracy.",
        "Cultures where “the customer is always right” taught that no was unacceptable.",
        "Personal experiences where pushing back felt like losing the deal.",
        "Career stages where success was measured by immediate revenue, not retention.",
      ],
      beliefsThatDriveResistance: [
        "If I say no, I will lose the customer.",
        "Customers only trust me if I agree to what they want.",
        "The deal is more important than the fine print.",
        "It is better to over-commit now and fix it later.",
      ],
      whatOthersExperience: {
        customers:
          "Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.",
        peers:
          "Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.",
        managers:
          "Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Environments that reward short-term wins over long-term trust.",
          "High-pressure sales quotas where every deal feels urgent.",
          "Customer objections that trigger the instinct to reassure at all costs.",
        ],
        softeners: [
          "Structured approval processes that slow commitments just enough to confirm accuracy.",
          "Leadership that rewards integrity and sustainable deals.",
          "Customer cultures that respect clarity and value boundaries.",
        ],
      },
      strengthsHiddenInside: [
        "Optimism that energizes customers.",
        "Quick adaptability that keeps conversations moving.",
        "Confidence that reassures during tense moments.",
        "Willingness to go the extra mile for the customer.",
      ],
      detailedResistanceCosts: [
        "Reduce repeat business when promises are not met.",
        "Damage credibility with customers and peers.",
        "Lower profitability due to discounts or added concessions.",
        "Create delivery bottlenecks that strain operations.",
        "Limit growth by trading short-term wins for long-term trust.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.\n• Peers: Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.\n• Managers: Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
          resistanceCosts: [
            "Create delivery strain as teams scramble to meet promises.",
            "Cause credibility gaps when commitments do not match reality.",
            "Encourage customers to expect more concessions over time.",
            "Win quick deals but reduce referrals and repeat business.",
          ],
          growthPath: [
            "Replace automatic yes with “let me confirm and get back to you.”",
            "Practice saying no respectfully by framing boundaries as trust-building.",
            "Anchor conversations in value before making commitments.",
            "Track where over-promising created rework to build awareness.",
            "Use negotiation scripts that highlight limits as strengths.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.\n• Peers: Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.\n• Managers: Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
          resistanceCosts: [
            "Create delivery strain as teams scramble to meet promises.",
            "Cause credibility gaps when commitments do not match reality.",
            "Encourage customers to expect more concessions over time.",
            "Win quick deals but reduce referrals and repeat business.",
          ],
          growthPath: [
            "Replace automatic yes with “let me confirm and get back to you.”",
            "Practice saying no respectfully by framing boundaries as trust-building.",
            "Anchor conversations in value before making commitments.",
            "Track where over-promising created rework to build awareness.",
            "Use negotiation scripts that highlight limits as strengths.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.\n• Peers: Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.\n• Managers: Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
          resistanceCosts: [
            "Create delivery strain as teams scramble to meet promises.",
            "Cause credibility gaps when commitments do not match reality.",
            "Encourage customers to expect more concessions over time.",
            "Win quick deals but reduce referrals and repeat business.",
          ],
          growthPath: [
            "Replace automatic yes with “let me confirm and get back to you.”",
            "Practice saying no respectfully by framing boundaries as trust-building.",
            "Anchor conversations in value before making commitments.",
            "Track where over-promising created rework to build awareness.",
            "Use negotiation scripts that highlight limits as strengths.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.\n• Peers: Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.\n• Managers: Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
            resistanceCosts: [
              "Create delivery strain as teams scramble to meet promises.",
              "Cause credibility gaps when commitments do not match reality.",
              "Encourage customers to expect more concessions over time.",
              "Win quick deals but reduce referrals and repeat business.",
            ],
            growthPath: [
              "Replace automatic yes with “let me confirm and get back to you.”",
              "Practice saying no respectfully by framing boundaries as trust-building.",
              "Anchor conversations in value before making commitments.",
              "Track where over-promising created rework to build awareness.",
              "Use negotiation scripts that highlight limits as strengths.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.\n• Peers: Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.\n• Managers: Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
            resistanceCosts: [
              "Create delivery strain as teams scramble to meet promises.",
              "Cause credibility gaps when commitments do not match reality.",
              "Encourage customers to expect more concessions over time.",
              "Win quick deals but reduce referrals and repeat business.",
            ],
            growthPath: [
              "Replace automatic yes with “let me confirm and get back to you.”",
              "Practice saying no respectfully by framing boundaries as trust-building.",
              "Anchor conversations in value before making commitments.",
              "Track where over-promising created rework to build awareness.",
              "Use negotiation scripts that highlight limits as strengths.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Initially feel reassured and supported, but may later perceive you as unreliable if commitments slip.\n• Peers: Appreciate your energy but may feel frustrated when they inherit delivery challenges from your promises.\n• Managers: Value your ability to keep deals moving but may worry about profitability, customer satisfaction, and long-term growth.",
            resistanceCosts: [
              "Create delivery strain as teams scramble to meet promises.",
              "Cause credibility gaps when commitments do not match reality.",
              "Encourage customers to expect more concessions over time.",
              "Win quick deals but reduce referrals and repeat business.",
            ],
            growthPath: [
              "Replace automatic yes with “let me confirm and get back to you.”",
              "Practice saying no respectfully by framing boundaries as trust-building.",
              "Anchor conversations in value before making commitments.",
              "Track where over-promising created rework to build awareness.",
              "Use negotiation scripts that highlight limits as strengths.",
            ],
          },
        },
      },
    },
    {
      id: "closer-controller",
      name: "Closer Controller",
      description:
        "Pushes too hard for the close, erodes trust by being overly forceful",
      traits: [
        "High drive to close",
        "Assertive in negotiations",
        "Dislikes hesitation",
        "Focuses on persuasion",
      ],
      detailedDescription:
        "Your results show Resistance in how you handle influence and control during the sales process.\nAt your best, you are a seller who drives momentum. You take charge, keep conversations moving, and ensure the customer understands your conviction. Customers can feel your passion and urgency, which is valuable in moments where deals risk stalling.\nBut when resistance is high, the very strength of influence narrows into force. Instead of inspiring confidence, the push for control creates pressure. Customers may feel rushed, unheard, or even resistant. Meetings become less about understanding needs and more about winning arguments. What looks like confidence in your mind may feel like domination in theirs.\nThis pattern is called the Closer Controller. It does not mean you lack respect for customers or peers. It means your resistance shows up as a strong need to drive the outcome. This instinct feels safe because it reduces uncertainty, but it undermines trust and weakens long-term growth.\nYour resistance does not erase your strength as a momentum-builder. Instead, it narrows it. When you learn to channel urgency into collaboration, your ability to influence transforms into credibility, partnership, and sustainable results.",
      strengthsInsights: [
        "Passion that creates urgency and energy.",
        "Confidence that ensures your perspective is heard.",
        "Determination that keeps deals from stalling.",
        "Ability to move conversations forward when others hesitate.",
      ],
      highResistanceCharacteristics: [
        "Cause customers to feel pressured rather than persuaded.",
        "Reduce openness in discovery conversations.",
        "Escalate objections into debates instead of problem-solving.",
        "Win short-term closes while weakening long-term trust.",
      ],
      resistanceCosts: [
        "Turn objections into conflict instead of resolution.",
        "Reduce trust by silencing the customer’s voice.",
        "Win deals at the cost of long-term relationships.",
        "Damage reputation if perceived as aggressive or domineering.",
        "Limit repeat business when customers prefer advisors over pushers.",
      ],
      developmentAreas: [
        "Develop active listening and questioning skills",
        "Focus on understanding customer needs over immediate closing",
        "Build rapport and trust through consultative selling",
      ],
      growthPath: {
        immediateShifts: [
          "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
          "Pause after making a point to invite customer input.",
          "Practice one extra discovery question before pushing toward the close.",
        ],
        strategicPractices: [
          "Track conversations where listening created breakthroughs.",
          "Role-play objection handling that emphasizes curiosity over combat.",
          "Build scripts that reframe control as partnership.",
        ],
        longTermGrowth: [
          "Reframe influence as guiding, not dominating.",
          "Model balanced conversations where urgency coexists with empathy.",
          "Build a reputation as a trusted advisor who empowers decisions rather than forcing them.",
          "Demonstrate to peers and customers that confidence grows stronger when paired with listening.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Speak more than they listen.",
        "Interrupt or redirect customers to their own points.",
        "Push for immediate decisions.",
        "Frame objections as battles to be won.",
        "Treat hesitation as resistance to overcome, not as a signal to explore.",
      ],
      rootCauses: [
        "Early success was tied to assertiveness rather than listening.",
        "Sales training emphasized hard closes and control.",
        "Competition rewarded being the loudest or most forceful.",
        "Personal experiences linked authority with credibility.",
      ],
      beliefsThatDriveResistance: [
        "The strongest voice wins.",
        "If I don’t take control, the customer will not buy.",
        "Pressure creates commitment.",
        "The deal is a contest and I cannot lose.",
      ],
      whatOthersExperience: {
        customers:
          "Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.",
        peers:
          "See your drive as valuable but may find collaboration difficult if you dominate conversations.",
        managers:
          "Value your urgency and results but worry about long-term account health and customer retention.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Competitive situations where multiple sellers are involved.",
          "Customers who hesitate or ask many questions.",
          "Quota pressure that makes urgency feel critical.",
        ],
        softeners: [
          "Structures that require active listening and discovery before pitching.",
          "Leadership that rewards collaborative closes, not just fast ones.",
          "Customers who value problem-solving over persuasion.",
        ],
      },
      strengthsHiddenInside: [
        "Passion that creates urgency and energy.",
        "Confidence that ensures your perspective is heard.",
        "Determination that keeps deals from stalling.",
        "Ability to move conversations forward when others hesitate.",
      ],
      detailedResistanceCosts: [
        "Turn objections into conflict instead of resolution.",
        "Reduce trust by silencing the customer’s voice.",
        "Win deals at the cost of long-term relationships.",
        "Damage reputation if perceived as aggressive or domineering.",
        "Limit repeat business when customers prefer advisors over pushers.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.\n• Peers: See your drive as valuable but may find collaboration difficult if you dominate conversations.\n• Managers: Value your urgency and results but worry about long-term account health and customer retention.",
          resistanceCosts: [
            "Cause customers to feel pressured rather than persuaded.",
            "Reduce openness in discovery conversations.",
            "Escalate objections into debates instead of problem-solving.",
            "Win short-term closes while weakening long-term trust.",
          ],
          growthPath: [
            "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
            "Pause after making a point to invite customer input.",
            "Practice one extra discovery question before pushing toward the close.",
            "Track conversations where listening created breakthroughs.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.\n• Peers: See your drive as valuable but may find collaboration difficult if you dominate conversations.\n• Managers: Value your urgency and results but worry about long-term account health and customer retention.",
          resistanceCosts: [
            "Cause customers to feel pressured rather than persuaded.",
            "Reduce openness in discovery conversations.",
            "Escalate objections into debates instead of problem-solving.",
            "Win short-term closes while weakening long-term trust.",
          ],
          growthPath: [
            "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
            "Pause after making a point to invite customer input.",
            "Practice one extra discovery question before pushing toward the close.",
            "Track conversations where listening created breakthroughs.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.\n• Peers: See your drive as valuable but may find collaboration difficult if you dominate conversations.\n• Managers: Value your urgency and results but worry about long-term account health and customer retention.",
          resistanceCosts: [
            "Cause customers to feel pressured rather than persuaded.",
            "Reduce openness in discovery conversations.",
            "Escalate objections into debates instead of problem-solving.",
            "Win short-term closes while weakening long-term trust.",
          ],
          growthPath: [
            "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
            "Pause after making a point to invite customer input.",
            "Practice one extra discovery question before pushing toward the close.",
            "Track conversations where listening created breakthroughs.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.\n• Peers: See your drive as valuable but may find collaboration difficult if you dominate conversations.\n• Managers: Value your urgency and results but worry about long-term account health and customer retention.",
            resistanceCosts: [
              "Cause customers to feel pressured rather than persuaded.",
              "Reduce openness in discovery conversations.",
              "Escalate objections into debates instead of problem-solving.",
              "Win short-term closes while weakening long-term trust.",
            ],
            growthPath: [
              "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
              "Pause after making a point to invite customer input.",
              "Practice one extra discovery question before pushing toward the close.",
              "Track conversations where listening created breakthroughs.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.\n• Peers: See your drive as valuable but may find collaboration difficult if you dominate conversations.\n• Managers: Value your urgency and results but worry about long-term account health and customer retention.",
            resistanceCosts: [
              "Cause customers to feel pressured rather than persuaded.",
              "Reduce openness in discovery conversations.",
              "Escalate objections into debates instead of problem-solving.",
              "Win short-term closes while weakening long-term trust.",
            ],
            growthPath: [
              "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
              "Pause after making a point to invite customer input.",
              "Practice one extra discovery question before pushing toward the close.",
              "Track conversations where listening created breakthroughs.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Recognize your passion but may feel unheard or pushed. Instead of trust, they may sense pressure.\n• Peers: See your drive as valuable but may find collaboration difficult if you dominate conversations.\n• Managers: Value your urgency and results but worry about long-term account health and customer retention.",
            resistanceCosts: [
              "Cause customers to feel pressured rather than persuaded.",
              "Reduce openness in discovery conversations.",
              "Escalate objections into debates instead of problem-solving.",
              "Win short-term closes while weakening long-term trust.",
            ],
            growthPath: [
              "Replace forceful asks with collaborative ones (“What would make this feel right for you?”).",
              "Pause after making a point to invite customer input.",
              "Practice one extra discovery question before pushing toward the close.",
              "Track conversations where listening created breakthroughs.",
            ],
          },
        },
      },
    },
    {
      id: "relationship-pleaser",
      name: "Relationship Pleaser",
      description:
        "Avoids tension, prioritizes being liked over challenging the customer",
      traits: [
        "Desire for harmony",
        "Avoids conflict",
        "Prioritizes being liked",
        "Hesitant to challenge",
      ],
      detailedDescription:
        "Your results show Resistance in how you balance harmony with candor in sales.\nAt your best, you are a seller who prioritizes trust, empathy, and long-term relationships. Customers feel respected and valued in your presence. You excel at building rapport and creating a sense of safety, which makes it easier for prospects to open up.\nBut when resistance is high, the very strength of harmony narrows into avoidance. Instead of raising necessary challenges, you soften concerns or say yes to keep the customer comfortable. You may agree too quickly, understate objections, or avoid tension that could actually strengthen the deal. Customers may like you, but they may not see you as the decisive partner they need when stakes are high.\nThis pattern is called the Relationship Pleaser. It does not mean you lack strength or ambition. It means your resistance shows up as a strong pull to preserve comfort at the cost of clarity. This feels safe in the moment but slows growth and reduces influence.\nYour resistance does not erase your strength as a relationship-builder. Instead, it narrows it. When you learn to balance empathy with candor, your ability to build trust transforms into true influence and sustainable sales growth.",
      strengthsInsights: [
        "Empathy that makes customers feel deeply understood.",
        "Patience that builds long-term trust.",
        "Rapport skills that open doors and ease resistance.",
        "Generosity that strengthens relationships when balanced with boundaries.",
      ],
      highResistanceCharacteristics: [
        "Lead to saying yes when no would have been more credible.",
        "Prevent you from raising hard truths customers need to hear.",
        "Create one-sided relationships where the customer holds all the leverage.",
        "Limit your influence in competitive deals where decisiveness matters.",
      ],
      resistanceCosts: [
        "Reduce close rates in competitive deals.",
        "Lead to over-commitments that strain profitability.",
        "Undermine credibility if customers see you as agreeable but not influential.",
        "Limit referrals and repeat business by positioning you as pleasant but not strategic.",
        "Create burnout from over-accommodation without equal return.",
      ],
      developmentAreas: [
        "Develop skills for constructive confrontation",
        "Learn to set clear boundaries and expectations",
        "Prioritize value delivery over being liked",
      ],
      growthPath: {
        immediateShifts: [
          "Replace automatic yes with balanced responses that show care and boundaries.",
          "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
          "Commit to raising one candid truth in every sales conversation.",
        ],
        strategicPractices: [
          "Practice objection handling that blends warmth with clarity.",
          "Track times when honesty improved outcomes to reinforce the value of candor.",
          "Role-play high-stakes scenarios to build confidence in saying no.",
        ],
        longTermGrowth: [
          "Reframe tension as a form of respect rather than rejection.",
          "Position yourself as both empathetic and decisive.",
          "Build habits of balancing rapport with influence.",
          "Demonstrate to customers and peers that trust is deepest when it includes honesty.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Agree to customer requests without voicing concerns.",
        "Downplay risks or challenges to avoid tension.",
        "Over-accommodate by adding tasks or extras.",
        "Avoid conflict even when it weakens outcomes.",
        "Prioritize being liked over securing fair and balanced terms.",
      ],
      rootCauses: [
        "Sales training overemphasized “the customer is always right.”",
        "Early wins came from friendliness rather than negotiation.",
        "Personal experiences linked disagreement with rejection.",
        "Cultural or organizational norms valued harmony above candor.",
      ],
      beliefsThatDriveResistance: [
        "If I push back, I will damage the relationship.",
        "Customers only stay loyal if they always feel comfortable.",
        "It is better to be liked than risk being seen as difficult.",
        "Harmony is more important than honesty.",
      ],
      whatOthersExperience: {
        customers:
          "Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.",
        peers:
          "Value your cooperative style but may see you as over-accommodating, especially in negotiations.",
        managers:
          "Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
      },
      organizationalTriggers: {
        amplifiers: [
          "High-pressure situations where customers seem frustrated or critical.",
          "Competitive markets where customers push hard for concessions.",
          "Cultures that reward likeability and discourage confrontation.",
        ],
        softeners: [
          "Structures that normalize healthy tension in sales conversations.",
          "Leadership that rewards candor as much as empathy.",
          "Customers who respect clarity even when it creates short-term discomfort.",
        ],
      },
      strengthsHiddenInside: [
        "Empathy that makes customers feel deeply understood.",
        "Patience that builds long-term trust.",
        "Rapport skills that open doors and ease resistance.",
        "Generosity that strengthens relationships when balanced with boundaries.",
      ],
      detailedResistanceCosts: [
        "Reduce close rates in competitive deals.",
        "Lead to over-commitments that strain profitability.",
        "Undermine credibility if customers see you as agreeable but not influential.",
        "Limit referrals and repeat business by positioning you as pleasant but not strategic.",
        "Create burnout from over-accommodation without equal return.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.\n• Peers: Value your cooperative style but may see you as over-accommodating, especially in negotiations.\n• Managers: Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
          resistanceCosts: [
            "Lead to saying yes when no would have been more credible.",
            "Prevent you from raising hard truths customers need to hear.",
            "Create one-sided relationships where the customer holds all the leverage.",
            "Limit your influence in competitive deals where decisiveness matters.",
          ],
          growthPath: [
            "Replace automatic yes with balanced responses that show care and boundaries.",
            "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
            "Commit to raising one candid truth in every sales conversation.",
            "Practice objection handling that blends warmth with clarity.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.\n• Peers: Value your cooperative style but may see you as over-accommodating, especially in negotiations.\n• Managers: Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
          resistanceCosts: [
            "Lead to saying yes when no would have been more credible.",
            "Prevent you from raising hard truths customers need to hear.",
            "Create one-sided relationships where the customer holds all the leverage.",
            "Limit your influence in competitive deals where decisiveness matters.",
          ],
          growthPath: [
            "Replace automatic yes with balanced responses that show care and boundaries.",
            "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
            "Commit to raising one candid truth in every sales conversation.",
            "Practice objection handling that blends warmth with clarity.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.\n• Peers: Value your cooperative style but may see you as over-accommodating, especially in negotiations.\n• Managers: Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
          resistanceCosts: [
            "Lead to saying yes when no would have been more credible.",
            "Prevent you from raising hard truths customers need to hear.",
            "Create one-sided relationships where the customer holds all the leverage.",
            "Limit your influence in competitive deals where decisiveness matters.",
          ],
          growthPath: [
            "Replace automatic yes with balanced responses that show care and boundaries.",
            "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
            "Commit to raising one candid truth in every sales conversation.",
            "Practice objection handling that blends warmth with clarity.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.\n• Peers: Value your cooperative style but may see you as over-accommodating, especially in negotiations.\n• Managers: Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
            resistanceCosts: [
              "Lead to saying yes when no would have been more credible.",
              "Prevent you from raising hard truths customers need to hear.",
              "Create one-sided relationships where the customer holds all the leverage.",
              "Limit your influence in competitive deals where decisiveness matters.",
            ],
            growthPath: [
              "Replace automatic yes with balanced responses that show care and boundaries.",
              "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
              "Commit to raising one candid truth in every sales conversation.",
              "Practice objection handling that blends warmth with clarity.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.\n• Peers: Value your cooperative style but may see you as over-accommodating, especially in negotiations.\n• Managers: Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
            resistanceCosts: [
              "Lead to saying yes when no would have been more credible.",
              "Prevent you from raising hard truths customers need to hear.",
              "Create one-sided relationships where the customer holds all the leverage.",
              "Limit your influence in competitive deals where decisiveness matters.",
            ],
            growthPath: [
              "Replace automatic yes with balanced responses that show care and boundaries.",
              "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
              "Commit to raising one candid truth in every sales conversation.",
              "Practice objection handling that blends warmth with clarity.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Appreciate your warmth and empathy but may sense hesitation in tough conversations, reducing confidence in your ability to lead.\n• Peers: Value your cooperative style but may see you as over-accommodating, especially in negotiations.\n• Managers: Recognize your strong rapport-building but may worry that you avoid the hard edges of selling that drive growth.",
            resistanceCosts: [
              "Lead to saying yes when no would have been more credible.",
              "Prevent you from raising hard truths customers need to hear.",
              "Create one-sided relationships where the customer holds all the leverage.",
              "Limit your influence in competitive deals where decisiveness matters.",
            ],
            growthPath: [
              "Replace automatic yes with balanced responses that show care and boundaries.",
              "Use language that pairs empathy with firmness (“I understand your concern, here’s what we can realistically do”).",
              "Commit to raising one candid truth in every sales conversation.",
              "Practice objection handling that blends warmth with clarity.",
            ],
          },
        },
      },
    },
    {
      id: "discount-giver",
      name: "Discount Giver",
      description:
        "Relies on price cuts instead of value, undermining profitability",
      traits: [
        "Price-sensitive",
        "Desire to remove obstacles",
        "Focuses on immediate agreement",
        "Avoids price objections",
      ],
      detailedDescription:
        "Your results show Resistance in how you respond to pricing pressure and customer hesitation.\nAt your best, you are a seller who wants to make buying easy. You aim to remove obstacles, reduce tension, and give customers a reason to say yes. Customers may see you as flexible and generous, and your willingness to adjust can close deals that might otherwise slip away.\nBut when resistance is high, the very strength of flexibility narrows into over-discounting. Instead of reinforcing value, you rely on lowering price to win. This creates a dangerous cycle. Customers learn to expect concessions, your margins erode, and your offers feel less valuable over time. What looks like generosity in the moment quietly undermines both profitability and trust.\nThis pattern is called the Discount Giver. It does not mean you lack confidence or sales skill. It means your resistance shows up as an instinct to resolve tension by giving something away. This feels safe in the moment but trains customers to focus on price rather than value.\nYour resistance does not erase your strength as a deal-closer. Instead, it narrows it. When you learn to defend value without defaulting to discounts, you unlock the ability to sell with confidence, protect margin, and grow accounts sustainably.",
      strengthsInsights: [
        "Flexibility to adapt to customer needs.",
        "Generosity that builds goodwill when used wisely.",
        "Quick responsiveness that reduces friction.",
        "Ability to create momentum when deals stall.",
      ],
      highResistanceCharacteristics: [
        "Train customers to delay commitment until a discount appears.",
        "Reduce profitability and weaken long-term growth.",
        "Create churn when customers who bought for price alone switch to cheaper options.",
        "Make it harder to position premium offerings with credibility.",
      ],
      resistanceCosts: [
        "Erase margin and profitability.",
        "Reduce credibility by positioning offers as negotiable.",
        "Undermine customer loyalty by attracting price-driven buyers.",
        "Limit growth by focusing on short-term wins over long-term account health.",
        "Create tension with peers and managers who must defend pricing integrity.",
      ],
      developmentAreas: [
        "Develop value-based selling skills",
        "Learn to defend pricing and articulate ROI",
        "Improve objection handling for price concerns",
      ],
      growthPath: {
        immediateShifts: [
          "Replace automatic discounts with value-based language.",
          "When objections arise, ask one more question before offering a concession.",
          "Use silence as a tool instead of filling the gap with a lower price.",
        ],
        strategicPractices: [
          "Develop objection-handling scripts that focus on outcomes, not cost.",
          "Anchor conversations in ROI or customer impact before price is discussed.",
          "Track where discounts were unnecessary to reinforce confidence.",
        ],
        longTermGrowth: [
          "Reframe generosity as delivering value, not lowering cost.",
          "Build habits of standing firm in negotiations while remaining empathetic.",
          "Position yourself as a trusted advisor who solves problems, not just a vendor offering deals.",
          "Demonstrate that protecting margin is not just discipline, it is leadership in sales.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Offer discounts early in the sales process.",
        "Assume objections are always about price.",
        "Add extras or concessions instead of asking deeper questions.",
        "Reduce price without exploring trade-offs.",
        "Frame value in terms of cost savings rather than outcomes.",
      ],
      rootCauses: [
        "Early sales success was measured in volume rather than margin.",
        "Managers rewarded quick closes without tracking profitability.",
        "Market conditions taught that customers always buy the cheapest option.",
        "Personal beliefs formed that generosity and flexibility are what win loyalty.",
      ],
      beliefsThatDriveResistance: [
        "Customers only buy if I lower the price.",
        "Value is less important than affordability.",
        "If I say no to a discount, I will lose the deal.",
        "A smaller margin is better than no sale.",
      ],
      whatOthersExperience: {
        customers:
          "Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.",
        peers:
          "May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.",
        managers:
          "Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Aggressive quotas that push for speed over profitability.",
          "Competitive markets where price wars dominate.",
          "Customer hesitation that triggers the instinct to “sweeten the deal.”",
        ],
        softeners: [
          "Sales cultures that reward value-based closes.",
          "Tools and frameworks that build confidence in defending price.",
          "Training that equips you with non-discount objection handling.",
        ],
      },
      strengthsHiddenInside: [
        "Flexibility to adapt to customer needs.",
        "Generosity that builds goodwill when used wisely.",
        "Quick responsiveness that reduces friction.",
        "Ability to create momentum when deals stall.",
      ],
      detailedResistanceCosts: [
        "Erase margin and profitability.",
        "Reduce credibility by positioning offers as negotiable.",
        "Undermine customer loyalty by attracting price-driven buyers.",
        "Limit growth by focusing on short-term wins over long-term account health.",
        "Create tension with peers and managers who must defend pricing integrity.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.\n• Peers: May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.\n• Managers: Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
          resistanceCosts: [
            "Train customers to delay commitment until a discount appears.",
            "Reduce profitability and weaken long-term growth.",
            "Create churn when customers who bought for price alone switch to cheaper options.",
            "Make it harder to position premium offerings with credibility.",
          ],
          growthPath: [
            "Replace automatic discounts with value-based language.",
            "When objections arise, ask one more question before offering a concession.",
            "Use silence as a tool instead of filling the gap with a lower price.",
            "Develop objection-handling scripts that focus on outcomes, not cost.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.\n• Peers: May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.\n• Managers: Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
          resistanceCosts: [
            "Train customers to delay commitment until a discount appears.",
            "Reduce profitability and weaken long-term growth.",
            "Create churn when customers who bought for price alone switch to cheaper options.",
            "Make it harder to position premium offerings with credibility.",
          ],
          growthPath: [
            "Replace automatic discounts with value-based language.",
            "When objections arise, ask one more question before offering a concession.",
            "Use silence as a tool instead of filling the gap with a lower price.",
            "Develop objection-handling scripts that focus on outcomes, not cost.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.\n• Peers: May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.\n• Managers: Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
          resistanceCosts: [
            "Train customers to delay commitment until a discount appears.",
            "Reduce profitability and weaken long-term growth.",
            "Create churn when customers who bought for price alone switch to cheaper options.",
            "Make it harder to position premium offerings with credibility.",
          ],
          growthPath: [
            "Replace automatic discounts with value-based language.",
            "When objections arise, ask one more question before offering a concession.",
            "Use silence as a tool instead of filling the gap with a lower price.",
            "Develop objection-handling scripts that focus on outcomes, not cost.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.\n• Peers: May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.\n• Managers: Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
            resistanceCosts: [
              "Train customers to delay commitment until a discount appears.",
              "Reduce profitability and weaken long-term growth.",
              "Create churn when customers who bought for price alone switch to cheaper options.",
              "Make it harder to position premium offerings with credibility.",
            ],
            growthPath: [
              "Replace automatic discounts with value-based language.",
              "When objections arise, ask one more question before offering a concession.",
              "Use silence as a tool instead of filling the gap with a lower price.",
              "Develop objection-handling scripts that focus on outcomes, not cost.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.\n• Peers: May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.\n• Managers: Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
            resistanceCosts: [
              "Train customers to delay commitment until a discount appears.",
              "Reduce profitability and weaken long-term growth.",
              "Create churn when customers who bought for price alone switch to cheaper options.",
              "Make it harder to position premium offerings with credibility.",
            ],
            growthPath: [
              "Replace automatic discounts with value-based language.",
              "When objections arise, ask one more question before offering a concession.",
              "Use silence as a tool instead of filling the gap with a lower price.",
              "Develop objection-handling scripts that focus on outcomes, not cost.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Appreciate the short-term savings but may undervalue the product or service, seeing it as negotiable or less premium.\n• Peers: May feel frustrated if your discounts set a precedent that makes it harder for them to hold pricing.\n• Managers: Value your ability to close deals but may worry about margin erosion, profitability, and brand positioning.",
            resistanceCosts: [
              "Train customers to delay commitment until a discount appears.",
              "Reduce profitability and weaken long-term growth.",
              "Create churn when customers who bought for price alone switch to cheaper options.",
              "Make it harder to position premium offerings with credibility.",
            ],
            growthPath: [
              "Replace automatic discounts with value-based language.",
              "When objections arise, ask one more question before offering a concession.",
              "Use silence as a tool instead of filling the gap with a lower price.",
              "Develop objection-handling scripts that focus on outcomes, not cost.",
            ],
          },
        },
      },
    },
    {
      id: "product-drowner",
      name: "Product Drowner",
      description:
        "Overshares features, loses focus on customer needs and benefits",
      traits: [
        "Product expertise",
        "Desire to inform",
        "Detail-oriented",
        "Assumes more info is better",
      ],
      detailedDescription:
        "Your results show Resistance in how you communicate solutions and present value.\nAt your best, you are a seller who is knowledgeable and thorough. Customers appreciate your depth of product understanding, and your enthusiasm demonstrates belief in what you are selling. You make sure customers know you are prepared and well-informed.\nBut when resistance is high, the very strength of knowledge narrows into oversharing. Instead of focusing on what matters most to the customer, you overwhelm them with details. The more features you explain, the less clear the value becomes. What looks like expertise in your eyes can feel like noise in theirs.\nThis pattern is called the Product Drowner. It does not mean you lack skill or clarity. It means your resistance shows up as a strong pull to prove your knowledge by covering everything. This instinct feels safe because it ensures nothing is left out, but it erodes focus and weakens persuasion.\nYour resistance does not erase your strength as a trusted expert. Instead, it narrows it. When you learn to connect your knowledge directly to the customer’s priorities, your ability to explain transforms into influence, clarity, and stronger sales growth.",
      strengthsInsights: [
        "Deep product knowledge that builds credibility.",
        "Enthusiasm that shows belief in the solution.",
        "Thoroughness that prevents key points from being missed.",
        "Ability to educate customers when information is aligned to their needs.",
      ],
      highResistanceCharacteristics: [
        "Cause customers to disengage or feel overwhelmed.",
        "Dilute key value points in a sea of features.",
        "Extend conversations without increasing commitment.",
        "Reduce trust if customers feel you are not listening to their actual needs.",
      ],
      resistanceCosts: [
        "Confuse customers and slow decision-making.",
        "Reduce deal velocity by extending presentations unnecessarily.",
        "Dilute competitive advantage by treating all features as equally important.",
        "Create frustration when customers feel unheard.",
        "Lower win rates even when opportunities are strong.",
      ],
      developmentAreas: [
        "Improve active listening and needs discovery",
        "Develop skills in translating features to benefits",
        "Practice concise and tailored communication",
      ],
      growthPath: {
        immediateShifts: [
          "Commit to sharing three key points per meeting, not ten.",
          "Ask one more question before giving information.",
          "Replace feature lists with customer-specific benefits.",
        ],
        strategicPractices: [
          "Build demo or presentation frameworks around outcomes, not features.",
          "Track when shorter conversations led to faster closes.",
          "Use customer stories to illustrate value instead of technical depth.",
        ],
        longTermGrowth: [
          "Reframe expertise as the ability to simplify, not to overwhelm.",
          "Build a reputation as a trusted guide who makes complex solutions simple.",
          "Position yourself as a partner who connects solutions to results, not just a catalog of features.",
          "Model to peers how knowledge can be a lever for clarity, not confusion.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Share long lists of features regardless of relevance.",
        "Talk more about product than customer problems.",
        "Use technical depth to prove credibility rather than to clarify.",
        "Cover too many details in presentations or demos.",
        "Leave customers confused about the most important value drivers.",
      ],
      rootCauses: [
        "Early sales success came from memorizing and sharing product details.",
        "Training emphasized features over discovery.",
        "Managers rewarded thoroughness over clarity.",
        "Personal confidence grew from knowing the product more than guiding the customer.",
      ],
      beliefsThatDriveResistance: [
        "The more I explain, the more credible I sound.",
        "Customers cannot value what they do not hear about.",
        "If I leave something out, I may lose the deal.",
        "More information means more persuasion.",
      ],
      whatOthersExperience: {
        customers:
          "Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.",
        peers:
          "Appreciate your thoroughness but may notice you lose focus in critical moments.",
        managers:
          "Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Complex products with many features.",
          "Nervousness in high-stakes deals that triggers the instinct to over-prepare.",
          "Competitive pressure that makes you want to prove superiority with details.",
        ],
        softeners: [
          "Structured discovery frameworks that identify customer priorities first.",
          "Training that emphasizes outcomes before features.",
          "Leadership that rewards clarity and customer alignment over technical depth.",
        ],
      },
      strengthsHiddenInside: [
        "Deep product knowledge that builds credibility.",
        "Enthusiasm that shows belief in the solution.",
        "Thoroughness that prevents key points from being missed.",
        "Ability to educate customers when information is aligned to their needs.",
      ],
      detailedResistanceCosts: [
        "Confuse customers and slow decision-making.",
        "Reduce deal velocity by extending presentations unnecessarily.",
        "Dilute competitive advantage by treating all features as equally important.",
        "Create frustration when customers feel unheard.",
        "Lower win rates even when opportunities are strong.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.\n• Peers: Appreciate your thoroughness but may notice you lose focus in critical moments.\n• Managers: Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
          resistanceCosts: [
            "Cause customers to disengage or feel overwhelmed.",
            "Dilute key value points in a sea of features.",
            "Extend conversations without increasing commitment.",
            "Reduce trust if customers feel you are not listening to their actual needs.",
          ],
          growthPath: [
            "Commit to sharing three key points per meeting, not ten.",
            "Ask one more question before giving information.",
            "Replace feature lists with customer-specific benefits.",
            "Build demo or presentation frameworks around outcomes, not features.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.\n• Peers: Appreciate your thoroughness but may notice you lose focus in critical moments.\n• Managers: Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
          resistanceCosts: [
            "Cause customers to disengage or feel overwhelmed.",
            "Dilute key value points in a sea of features.",
            "Extend conversations without increasing commitment.",
            "Reduce trust if customers feel you are not listening to their actual needs.",
          ],
          growthPath: [
            "Commit to sharing three key points per meeting, not ten.",
            "Ask one more question before giving information.",
            "Replace feature lists with customer-specific benefits.",
            "Build demo or presentation frameworks around outcomes, not features.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.\n• Peers: Appreciate your thoroughness but may notice you lose focus in critical moments.\n• Managers: Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
          resistanceCosts: [
            "Cause customers to disengage or feel overwhelmed.",
            "Dilute key value points in a sea of features.",
            "Extend conversations without increasing commitment.",
            "Reduce trust if customers feel you are not listening to their actual needs.",
          ],
          growthPath: [
            "Commit to sharing three key points per meeting, not ten.",
            "Ask one more question before giving information.",
            "Replace feature lists with customer-specific benefits.",
            "Build demo or presentation frameworks around outcomes, not features.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.\n• Peers: Appreciate your thoroughness but may notice you lose focus in critical moments.\n• Managers: Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
            resistanceCosts: [
              "Cause customers to disengage or feel overwhelmed.",
              "Dilute key value points in a sea of features.",
              "Extend conversations without increasing commitment.",
              "Reduce trust if customers feel you are not listening to their actual needs.",
            ],
            growthPath: [
              "Commit to sharing three key points per meeting, not ten.",
              "Ask one more question before giving information.",
              "Replace feature lists with customer-specific benefits.",
              "Build demo or presentation frameworks around outcomes, not features.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.\n• Peers: Appreciate your thoroughness but may notice you lose focus in critical moments.\n• Managers: Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
            resistanceCosts: [
              "Cause customers to disengage or feel overwhelmed.",
              "Dilute key value points in a sea of features.",
              "Extend conversations without increasing commitment.",
              "Reduce trust if customers feel you are not listening to their actual needs.",
            ],
            growthPath: [
              "Commit to sharing three key points per meeting, not ten.",
              "Ask one more question before giving information.",
              "Replace feature lists with customer-specific benefits.",
              "Build demo or presentation frameworks around outcomes, not features.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Respect your knowledge but may feel overwhelmed, disengaged, or uncertain about the real benefits.\n• Peers: Appreciate your thoroughness but may notice you lose focus in critical moments.\n• Managers: Value your expertise but may worry that over-explaining reduces efficiency and close rates.",
            resistanceCosts: [
              "Cause customers to disengage or feel overwhelmed.",
              "Dilute key value points in a sea of features.",
              "Extend conversations without increasing commitment.",
              "Reduce trust if customers feel you are not listening to their actual needs.",
            ],
            growthPath: [
              "Commit to sharing three key points per meeting, not ten.",
              "Ask one more question before giving information.",
              "Replace feature lists with customer-specific benefits.",
              "Build demo or presentation frameworks around outcomes, not features.",
            ],
          },
        },
      },
    },
    {
      id: "pipeline-avoider",
      name: "Pipeline Avoider",
      description:
        "Neglects prospecting, relies on last-minute saves and inbound leads",
      traits: [
        "Dislikes cold outreach",
        "Prefers inbound leads",
        "Procrastinates on prospecting",
        "Focuses on urgent deals",
      ],
      detailedDescription:
        "Your results show Resistance in how you approach prospecting, lead generation, and early sales activity.\nAt your best, you are a seller who thrives in the action of active deals. You bring energy to live opportunities, focus intensely on closing, and perform well when urgency is high. Customers and managers see your commitment when the pressure is on.\nBut when resistance is high, the very strength of focus narrows into avoidance. Instead of building a healthy pipeline, you rely on urgent deals, inbound leads, or last-minute pushes. Prospecting feels uncomfortable or less valuable, so you delay it. The result is an inconsistent flow of opportunities that limits growth.\nThis pattern is called the Pipeline Avoider. It does not mean you lack work ethic or selling skill. It means your resistance shows up as procrastination in filling the funnel. This feels safe because it avoids discomfort, but it quietly creates feast-and-famine cycles in your results.\nYour resistance does not erase your strength as a strong closer. Instead, it narrows it. When you learn to balance closing energy with steady pipeline building, your ability to sell transforms from unpredictable bursts into consistent, scalable growth.",
      strengthsInsights: [
        "Energy and urgency that shine in live deals.",
        "Focus that ensures no opportunity is wasted once it is active.",
        "Confidence in negotiation and closing conversations.",
        "Ability to deliver results under pressure.",
      ],
      highResistanceCharacteristics: [
        "Leave you scrambling when deals fall through unexpectedly.",
        "Cause inconsistent quotas and unpredictable commissions.",
        "Reduce confidence from managers who expect steady pipeline activity.",
        "Limit growth because new opportunities are not being created consistently.",
      ],
      resistanceCosts: [
        "Create inconsistent quotas and commissions.",
        "Limit long-term growth by starving the funnel.",
        "Increase stress by relying on last-minute deals.",
        "Reduce credibility with managers who expect predictability.",
        "Leave peers carrying more of the prospecting load.",
      ],
      developmentAreas: [
        "Develop consistent prospecting habits",
        "Learn and implement new outreach strategies",
        "Prioritize pipeline building as a continuous activity",
      ],
      growthPath: {
        immediateShifts: [
          "Block time daily for prospecting and protect it as firmly as customer meetings.",
          "Commit to a specific outreach number each week.",
          "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
        ],
        strategicPractices: [
          "Build routines that balance closing and prospecting evenly.",
          "Track pipeline size against quota to visualize the cost of avoidance.",
          "Use accountability partners or team check-ins to normalize outreach.",
        ],
        longTermGrowth: [
          "Reframe prospecting as opportunity creation, not rejection.",
          "Build identity as both a closer and a builder of long-term growth.",
          "Position yourself as someone who generates business consistently, not just reacts to it.",
          "Model for peers how pipeline discipline creates freedom and reduces stress.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Delay prospecting tasks in favor of more comfortable activities.",
        "Focus on urgent deals while ignoring long-term pipeline.",
        "Rely heavily on inbound leads or referrals.",
        "Push prospecting to the end of the week or month, then feel rushed.",
        "Treat prospecting as optional rather than central to growth.",
      ],
      rootCauses: [
        "Early success came from inherited accounts or inbound opportunities.",
        "Managers emphasized closing over pipeline building.",
        "Prospecting was framed as rejection-heavy and discouraging.",
        "Personal confidence grew more from late-stage selling than from outreach.",
      ],
      beliefsThatDriveResistance: [
        "Prospecting is uncomfortable and rarely works.",
        "My time is better spent on deals that are already moving.",
        "If I wait, leads will come to me.",
        "Closing is where the real value is, not pipeline building.",
      ],
      whatOthersExperience: {
        customers:
          "May only see you when deals are urgent, not as a consistent advisor in their buying journey.",
        peers: "May feel you carry less weight in generating new business.",
        managers:
          "Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Quotas that focus on immediate revenue without pipeline metrics.",
          "Cultures that glamorize closers more than prospectors.",
          "High rejection rates in outreach that discourage persistence.",
        ],
        softeners: [
          "Structures that reward consistent pipeline activity.",
          "Leadership that emphasizes balance between prospecting and closing.",
          "Tools that make outreach easier, targeted, and measurable.",
        ],
      },
      strengthsHiddenInside: [
        "Energy and urgency that shine in live deals.",
        "Focus that ensures no opportunity is wasted once it is active.",
        "Confidence in negotiation and closing conversations.",
        "Ability to deliver results under pressure.",
      ],
      detailedResistanceCosts: [
        "Create inconsistent quotas and commissions.",
        "Limit long-term growth by starving the funnel.",
        "Increase stress by relying on last-minute deals.",
        "Reduce credibility with managers who expect predictability.",
        "Leave peers carrying more of the prospecting load.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: May only see you when deals are urgent, not as a consistent advisor in their buying journey.\n• Peers: May feel you carry less weight in generating new business.\n• Managers: Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
          resistanceCosts: [
            "Leave you scrambling when deals fall through unexpectedly.",
            "Cause inconsistent quotas and unpredictable commissions.",
            "Reduce confidence from managers who expect steady pipeline activity.",
            "Limit growth because new opportunities are not being created consistently.",
          ],
          growthPath: [
            "Block time daily for prospecting and protect it as firmly as customer meetings.",
            "Commit to a specific outreach number each week.",
            "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
            "Build routines that balance closing and prospecting evenly.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: May only see you when deals are urgent, not as a consistent advisor in their buying journey.\n• Peers: May feel you carry less weight in generating new business.\n• Managers: Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
          resistanceCosts: [
            "Leave you scrambling when deals fall through unexpectedly.",
            "Cause inconsistent quotas and unpredictable commissions.",
            "Reduce confidence from managers who expect steady pipeline activity.",
            "Limit growth because new opportunities are not being created consistently.",
          ],
          growthPath: [
            "Block time daily for prospecting and protect it as firmly as customer meetings.",
            "Commit to a specific outreach number each week.",
            "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
            "Build routines that balance closing and prospecting evenly.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: May only see you when deals are urgent, not as a consistent advisor in their buying journey.\n• Peers: May feel you carry less weight in generating new business.\n• Managers: Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
          resistanceCosts: [
            "Leave you scrambling when deals fall through unexpectedly.",
            "Cause inconsistent quotas and unpredictable commissions.",
            "Reduce confidence from managers who expect steady pipeline activity.",
            "Limit growth because new opportunities are not being created consistently.",
          ],
          growthPath: [
            "Block time daily for prospecting and protect it as firmly as customer meetings.",
            "Commit to a specific outreach number each week.",
            "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
            "Build routines that balance closing and prospecting evenly.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: May only see you when deals are urgent, not as a consistent advisor in their buying journey.\n• Peers: May feel you carry less weight in generating new business.\n• Managers: Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
            resistanceCosts: [
              "Leave you scrambling when deals fall through unexpectedly.",
              "Cause inconsistent quotas and unpredictable commissions.",
              "Reduce confidence from managers who expect steady pipeline activity.",
              "Limit growth because new opportunities are not being created consistently.",
            ],
            growthPath: [
              "Block time daily for prospecting and protect it as firmly as customer meetings.",
              "Commit to a specific outreach number each week.",
              "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
              "Build routines that balance closing and prospecting evenly.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: May only see you when deals are urgent, not as a consistent advisor in their buying journey.\n• Peers: May feel you carry less weight in generating new business.\n• Managers: Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
            resistanceCosts: [
              "Leave you scrambling when deals fall through unexpectedly.",
              "Cause inconsistent quotas and unpredictable commissions.",
              "Reduce confidence from managers who expect steady pipeline activity.",
              "Limit growth because new opportunities are not being created consistently.",
            ],
            growthPath: [
              "Block time daily for prospecting and protect it as firmly as customer meetings.",
              "Commit to a specific outreach number each week.",
              "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
              "Build routines that balance closing and prospecting evenly.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: May only see you when deals are urgent, not as a consistent advisor in their buying journey.\n• Peers: May feel you carry less weight in generating new business.\n• Managers: Appreciate your late-stage energy but may be frustrated by inconsistent pipeline metrics and forecasting.",
            resistanceCosts: [
              "Leave you scrambling when deals fall through unexpectedly.",
              "Cause inconsistent quotas and unpredictable commissions.",
              "Reduce confidence from managers who expect steady pipeline activity.",
              "Limit growth because new opportunities are not being created consistently.",
            ],
            growthPath: [
              "Block time daily for prospecting and protect it as firmly as customer meetings.",
              "Commit to a specific outreach number each week.",
              "Start with the smallest possible step to reduce avoidance (e.g., one new call or email).",
              "Build routines that balance closing and prospecting evenly.",
            ],
          },
        },
      },
    },
    {
      id: "reactive-firefighter",
      name: "Reactive Firefighter",
      description:
        "Chases urgent deals, ignores long-term growth and strategic planning",
      traits: [
        "Thrives under pressure",
        "Focuses on urgent tasks",
        "Dislikes long-term planning",
        "Problem-solver",
      ],
      detailedDescription:
        "Your results show Resistance in how you balance urgency with long-term sales discipline.\nAt your best, you are a seller who thrives in fast-moving situations. You bring intensity, energy, and quick action when deals are on the line. Customers and managers see you as someone who will drop everything to chase opportunities and close business.\nBut when resistance is high, the very strength of urgency narrows into reactivity. Instead of balancing short-term wins with long-term growth, you constantly prioritize today’s fires. You rush to handle urgent deals while neglecting the pipeline, account development, or strategic selling. Growth feels like a sprint from crisis to crisis rather than a steady climb.\nThis pattern is called the Reactive Firefighter. It does not mean you lack strategy or discipline. It means your resistance shows up as an instinct to prioritize immediate deals because they feel urgent and rewarding. This feels safe in the moment but erodes consistency, predictability, and scalability.\nYour resistance does not erase your strength as a high-energy closer. Instead, it narrows it. When you learn to pair urgency with discipline, your ability to respond quickly transforms into sustainable growth.",
      strengthsInsights: [
        "Energy and urgency that move deals forward quickly.",
        "Responsiveness that customers appreciate in critical moments.",
        "Confidence under pressure.",
        "Ability to perform strongly in fast-moving, high-stakes deals.",
      ],
      highResistanceCharacteristics: [
        "Create roller-coaster results tied to unpredictable deals.",
        "Leave long-term opportunities underdeveloped.",
        "Cause you to neglect follow-ups once immediate pressure passes.",
        "Build stress by always working in reactive mode.",
      ],
      resistanceCosts: [
        "Create unpredictable sales cycles.",
        "Reduce pipeline growth and account development.",
        "Lead to burnout from constant crisis mode.",
        "Damage credibility with managers who want consistency.",
        "Limit career growth by positioning you as tactical rather than strategic.",
      ],
      developmentAreas: [
        "Prioritize strategic, long-term sales activities",
        "Develop proactive planning and time management skills",
        "Learn to differentiate between urgent and important tasks",
      ],
      growthPath: {
        immediateShifts: [
          "Schedule daily prospecting even when urgent deals demand attention.",
          "Pause before dropping long-term tasks for short-term fires.",
          "Commit to one pipeline-building activity each day, regardless of urgency.",
        ],
        strategicPractices: [
          "Track how often urgent deals displace strategic work.",
          "Build weekly plans that balance hot deals with long-term development.",
          "Role-play resisting the instinct to drop everything at the first sign of urgency.",
        ],
        longTermGrowth: [
          "Reframe urgency as one tool, not the only one.",
          "Build a reputation for consistency as well as responsiveness.",
          "Position yourself as a seller who can manage both sprints and marathons.",
          "Demonstrate that sustainable growth requires balance, not just bursts of activity.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Drop prospecting or account growth to chase urgent opportunities.",
        "Respond instantly to hot leads while ignoring long-term priorities.",
        "Feel uncomfortable when there is no immediate pressure.",
        "Build last-minute bursts of activity near quota deadlines.",
        "Struggle to sustain consistent sales habits outside of emergencies.",
      ],
      rootCauses: [
        "Managers celebrated “saves” and last-minute deals more than consistency.",
        "Early success came from handling urgent opportunities.",
        "Cultures valued activity and hustle over planning.",
        "Personal motivation grew more from adrenaline than from steady habits.",
      ],
      beliefsThatDriveResistance: [
        "Urgent deals matter more than long-term ones.",
        "If I do not handle this now, it will disappear.",
        "Planning slows me down; action creates results.",
        "Pressure is what makes me perform at my best.",
      ],
      whatOthersExperience: {
        customers:
          "Appreciate your responsiveness but may feel neglected if they are not an urgent deal.",
        peers:
          "Value your hustle but may see you as unpredictable or inconsistent.",
        managers:
          "Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Quota deadlines that create artificial urgency.",
          "Cultures that reward activity bursts more than steady results.",
          "Markets with many inbound leads that feel too immediate to ignore.",
        ],
        softeners: [
          "Leadership that emphasizes pipeline consistency alongside responsiveness.",
          "Structures that balance urgent tasks with long-term planning.",
          "Metrics that track steady pipeline growth, not just last-minute wins.",
        ],
      },
      strengthsHiddenInside: [
        "Energy and urgency that move deals forward quickly.",
        "Responsiveness that customers appreciate in critical moments.",
        "Confidence under pressure.",
        "Ability to perform strongly in fast-moving, high-stakes deals.",
      ],
      detailedResistanceCosts: [
        "Create unpredictable sales cycles.",
        "Reduce pipeline growth and account development.",
        "Lead to burnout from constant crisis mode.",
        "Damage credibility with managers who want consistency.",
        "Limit career growth by positioning you as tactical rather than strategic.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Appreciate your responsiveness but may feel neglected if they are not an urgent deal.\n• Peers: Value your hustle but may see you as unpredictable or inconsistent.\n• Managers: Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
          resistanceCosts: [
            "Create roller-coaster results tied to unpredictable deals.",
            "Leave long-term opportunities underdeveloped.",
            "Cause you to neglect follow-ups once immediate pressure passes.",
            "Build stress by always working in reactive mode.",
          ],
          growthPath: [
            "Schedule daily prospecting even when urgent deals demand attention.",
            "Pause before dropping long-term tasks for short-term fires.",
            "Commit to one pipeline-building activity each day, regardless of urgency.",
            "Track how often urgent deals displace strategic work.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Appreciate your responsiveness but may feel neglected if they are not an urgent deal.\n• Peers: Value your hustle but may see you as unpredictable or inconsistent.\n• Managers: Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
          resistanceCosts: [
            "Create roller-coaster results tied to unpredictable deals.",
            "Leave long-term opportunities underdeveloped.",
            "Cause you to neglect follow-ups once immediate pressure passes.",
            "Build stress by always working in reactive mode.",
          ],
          growthPath: [
            "Schedule daily prospecting even when urgent deals demand attention.",
            "Pause before dropping long-term tasks for short-term fires.",
            "Commit to one pipeline-building activity each day, regardless of urgency.",
            "Track how often urgent deals displace strategic work.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Appreciate your responsiveness but may feel neglected if they are not an urgent deal.\n• Peers: Value your hustle but may see you as unpredictable or inconsistent.\n• Managers: Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
          resistanceCosts: [
            "Create roller-coaster results tied to unpredictable deals.",
            "Leave long-term opportunities underdeveloped.",
            "Cause you to neglect follow-ups once immediate pressure passes.",
            "Build stress by always working in reactive mode.",
          ],
          growthPath: [
            "Schedule daily prospecting even when urgent deals demand attention.",
            "Pause before dropping long-term tasks for short-term fires.",
            "Commit to one pipeline-building activity each day, regardless of urgency.",
            "Track how often urgent deals displace strategic work.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Appreciate your responsiveness but may feel neglected if they are not an urgent deal.\n• Peers: Value your hustle but may see you as unpredictable or inconsistent.\n• Managers: Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
            resistanceCosts: [
              "Create roller-coaster results tied to unpredictable deals.",
              "Leave long-term opportunities underdeveloped.",
              "Cause you to neglect follow-ups once immediate pressure passes.",
              "Build stress by always working in reactive mode.",
            ],
            growthPath: [
              "Schedule daily prospecting even when urgent deals demand attention.",
              "Pause before dropping long-term tasks for short-term fires.",
              "Commit to one pipeline-building activity each day, regardless of urgency.",
              "Track how often urgent deals displace strategic work.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Appreciate your responsiveness but may feel neglected if they are not an urgent deal.\n• Peers: Value your hustle but may see you as unpredictable or inconsistent.\n• Managers: Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
            resistanceCosts: [
              "Create roller-coaster results tied to unpredictable deals.",
              "Leave long-term opportunities underdeveloped.",
              "Cause you to neglect follow-ups once immediate pressure passes.",
              "Build stress by always working in reactive mode.",
            ],
            growthPath: [
              "Schedule daily prospecting even when urgent deals demand attention.",
              "Pause before dropping long-term tasks for short-term fires.",
              "Commit to one pipeline-building activity each day, regardless of urgency.",
              "Track how often urgent deals displace strategic work.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Appreciate your responsiveness but may feel neglected if they are not an urgent deal.\n• Peers: Value your hustle but may see you as unpredictable or inconsistent.\n• Managers: Admire your bursts of energy but may worry about forecasting, pipeline health, and burnout.",
            resistanceCosts: [
              "Create roller-coaster results tied to unpredictable deals.",
              "Leave long-term opportunities underdeveloped.",
              "Cause you to neglect follow-ups once immediate pressure passes.",
              "Build stress by always working in reactive mode.",
            ],
            growthPath: [
              "Schedule daily prospecting even when urgent deals demand attention.",
              "Pause before dropping long-term tasks for short-term fires.",
              "Commit to one pipeline-building activity each day, regardless of urgency.",
              "Track how often urgent deals displace strategic work.",
            ],
          },
        },
      },
    },
    {
      id: "silent-resistor",
      name: "Silent Resistor",
      description:
        "Avoids asking for the deal directly, waiting for the customer to initiate",
      traits: [
        "Hesitant to close",
        "Avoids being pushy",
        "Prefers customer-led decisions",
        "Values harmony over directness",
      ],
      detailedDescription:
        "Your results show Resistance in how you handle closing conversations and direct asks.\nAt your best, you are a seller who builds trust by creating space for the customer. You avoid pressure, respect their process, and make them feel in control of the decision. Many customers value this approach because it feels safe and genuine.\nBut when resistance is high, the very strength of patience narrows into avoidance. Instead of guiding the customer toward commitment, you wait for them to make the first move. Deals that could have been won slip away quietly. Conversations end without clear next steps. Customers may like you but often buy from someone else who was more direct.\nThis pattern is called the Silent Resistor. It does not mean you lack confidence or selling ability. It means your resistance shows up as an instinct to avoid potential rejection by holding back from asking. This feels safe in the moment but stalls growth and reduces close rates.\nYour resistance does not erase your strength as a relationship-builder. Instead, it narrows it. When you learn to balance respect with assertiveness, your ability to guide decisions transforms into stronger closes and lasting credibility.",
      strengthsInsights: [
        "Deep respect for customer autonomy.",
        "Patience that makes customers feel comfortable.",
        "Low-pressure approach that reduces resistance.",
        "Ability to build strong trust before asking.",
      ],
      highResistanceCharacteristics: [
        "Leave conversations without clear commitments or next steps.",
        "Cause strong opportunities to stall indefinitely.",
        "Reduce close rates even when customer interest is high.",
        "Position you as likeable but not decisive in the buying process.",
      ],
      resistanceCosts: [
        "Reduce overall close rates.",
        "Allow deals to stall or go to competitors.",
        "Limit growth despite strong pipelines.",
        "Position you as friendly but less decisive.",
        "Weaken credibility if customers see you as hesitant.",
      ],
      developmentAreas: [
        "Develop confident closing techniques",
        "Practice clear calls to action and next steps",
        "Learn to read buying signals and act on them",
      ],
      growthPath: {
        immediateShifts: [
          "End every customer conversation with a clear next step.",
          "Reframe closing as guiding, not pushing.",
          "Practice one direct ask per meeting, even in low-stakes contexts.",
        ],
        strategicPractices: [
          "Use structured closing frameworks to make asking routine.",
          "Track how often direct asks convert compared to waiting.",
          "Role-play objections to build confidence in handling no.",
        ],
        longTermGrowth: [
          "Reframe rejection as progress, not failure.",
          "Build habits of consistent closing language without losing empathy.",
          "Position yourself as a trusted advisor who leads decisions rather than waiting for them.",
          "Model to peers and customers that assertiveness and respect can coexist.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Wait for customers to bring up next steps.",
        "Avoid closing language because it feels pushy.",
        "End calls on good terms but without commitments.",
        "Rely on follow-ups instead of asking directly in the moment.",
        "See lost deals as bad timing rather than lack of action.",
      ],
      rootCauses: [
        "Early selling advice emphasized “don’t be pushy.”",
        "Rejection felt personal, so asking became risky.",
        "Customers were framed as decision-makers who should not be influenced.",
        "Success was measured by activity or relationships rather than close rate.",
      ],
      beliefsThatDriveResistance: [
        "If I ask, I will push the customer away.",
        "Customers should decide on their own timing.",
        "Closing creates pressure and pressure damages trust.",
        "If the relationship is strong, the deal will close itself.",
      ],
      whatOthersExperience: {
        customers:
          "Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.",
        peers:
          "May see you as supportive but not competitive enough, especially in high-stakes deals.",
        managers:
          "Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Competitive situations where multiple sellers are involved.",
          "Customers who hesitate or delay decisions.",
          "Environments where rejection is penalized rather than normalized.",
        ],
        softeners: [
          "Structures that require clear next steps in every meeting.",
          "Leadership that rewards conversion, not just activity.",
          "Training that frames closing as service, not pressure.",
        ],
      },
      strengthsHiddenInside: [
        "Deep respect for customer autonomy.",
        "Patience that makes customers feel comfortable.",
        "Low-pressure approach that reduces resistance.",
        "Ability to build strong trust before asking.",
      ],
      detailedResistanceCosts: [
        "Reduce overall close rates.",
        "Allow deals to stall or go to competitors.",
        "Limit growth despite strong pipelines.",
        "Position you as friendly but less decisive.",
        "Weaken credibility if customers see you as hesitant.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Customers: Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.\n• Peers: May see you as supportive but not competitive enough, especially in high-stakes deals.\n• Managers: Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
          resistanceCosts: [
            "Leave conversations without clear commitments or next steps.",
            "Cause strong opportunities to stall indefinitely.",
            "Reduce close rates even when customer interest is high.",
            "Position you as likeable but not decisive in the buying process.",
          ],
          growthPath: [
            "End every customer conversation with a clear next step.",
            "Reframe closing as guiding, not pushing.",
            "Practice one direct ask per meeting, even in low-stakes contexts.",
            "Use structured closing frameworks to make asking routine.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Customers: Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.\n• Peers: May see you as supportive but not competitive enough, especially in high-stakes deals.\n• Managers: Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
          resistanceCosts: [
            "Leave conversations without clear commitments or next steps.",
            "Cause strong opportunities to stall indefinitely.",
            "Reduce close rates even when customer interest is high.",
            "Position you as likeable but not decisive in the buying process.",
          ],
          growthPath: [
            "End every customer conversation with a clear next step.",
            "Reframe closing as guiding, not pushing.",
            "Practice one direct ask per meeting, even in low-stakes contexts.",
            "Use structured closing frameworks to make asking routine.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Customers: Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.\n• Peers: May see you as supportive but not competitive enough, especially in high-stakes deals.\n• Managers: Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
          resistanceCosts: [
            "Leave conversations without clear commitments or next steps.",
            "Cause strong opportunities to stall indefinitely.",
            "Reduce close rates even when customer interest is high.",
            "Position you as likeable but not decisive in the buying process.",
          ],
          growthPath: [
            "End every customer conversation with a clear next step.",
            "Reframe closing as guiding, not pushing.",
            "Practice one direct ask per meeting, even in low-stakes contexts.",
            "Use structured closing frameworks to make asking routine.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Customers: Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.\n• Peers: May see you as supportive but not competitive enough, especially in high-stakes deals.\n• Managers: Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
            resistanceCosts: [
              "Leave conversations without clear commitments or next steps.",
              "Cause strong opportunities to stall indefinitely.",
              "Reduce close rates even when customer interest is high.",
              "Position you as likeable but not decisive in the buying process.",
            ],
            growthPath: [
              "End every customer conversation with a clear next step.",
              "Reframe closing as guiding, not pushing.",
              "Practice one direct ask per meeting, even in low-stakes contexts.",
              "Use structured closing frameworks to make asking routine.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Customers: Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.\n• Peers: May see you as supportive but not competitive enough, especially in high-stakes deals.\n• Managers: Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
            resistanceCosts: [
              "Leave conversations without clear commitments or next steps.",
              "Cause strong opportunities to stall indefinitely.",
              "Reduce close rates even when customer interest is high.",
              "Position you as likeable but not decisive in the buying process.",
            ],
            growthPath: [
              "End every customer conversation with a clear next step.",
              "Reframe closing as guiding, not pushing.",
              "Practice one direct ask per meeting, even in low-stakes contexts.",
              "Use structured closing frameworks to make asking routine.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Customers: Enjoy your low-pressure approach but may feel uncertain about next steps, leading them to buy from someone else.\n• Peers: May see you as supportive but not competitive enough, especially in high-stakes deals.\n• Managers: Value your rapport-building skills but grow concerned about conversion rates and pipeline velocity.",
            resistanceCosts: [
              "Leave conversations without clear commitments or next steps.",
              "Cause strong opportunities to stall indefinitely.",
              "Reduce close rates even when customer interest is high.",
              "Position you as likeable but not decisive in the buying process.",
            ],
            growthPath: [
              "End every customer conversation with a clear next step.",
              "Reframe closing as guiding, not pushing.",
              "Practice one direct ask per meeting, even in low-stakes contexts.",
              "Use structured closing frameworks to make asking routine.",
            ],
          },
        },
      },
    },
    // Special profiles for fallback scenarios
    {
      id: "all-moderate-resistance",
      name: "All Moderate Resistance",
      description: "Moderate resistance across all archetypes",
      traits: [
        "Functional but inconsistent",
        "Adaptable but variable",
        "Capable but context-dependent",
      ],
      detailedDescription:
        "Your results show moderate resistance across all archetypes. This means no single pattern dominates, but friction shows up in many different ways depending on context.\nAt this level, your sales approach is functional but not consistent. Some deals close well, others stall. Customers experience you as capable, but results vary depending on the situation.",
      strengthsInsights: [
        "Sometimes confident and clear, sometimes hesitant or avoidant.",
        "Good rapport with customers but inconsistent follow-through.",
        "Deals that progress but often take longer than they should.",
        "A tendency to adapt, but not always in the most effective way.",
      ],
      resistanceCosts: [
        "Moderate resistance is harder to spot than high resistance, but it quietly slows growth.",
        "Customers and managers may see you as unpredictable.",
        "Over time, opportunities slip away because your approach changes from deal to deal.",
      ],
      developmentAreas: [
        "Identify which resistance pattern shows up most often under stress.",
        "Focus on building consistency by improving one clear sales habit.",
        "Reinforce momentum with micro-learning practices that target your most common resistance triggers.",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Identify which resistance pattern shows up most often under stress.",
          "Focus on building consistency by improving one clear sales habit.",
          "Reinforce momentum with micro-learning practices that target your most common resistance triggers.",
        ],
      },
      whatOthersExperience: {
        customers:
          "Experience you as capable, but results vary depending on the situation.",
        peers: "See you as adaptable but may notice inconsistency in approach.",
        managers:
          "View you as reliable in parts but less predictable when pressure rises.",
      },
    },
    {
      id: "all-low-resistance",
      name: "All Low Resistance",
      description: "Low resistance across all archetypes",
      traits: ["Balanced", "Adaptable", "Steady and effective"],
      detailedDescription:
        "Your results show low resistance across all archetypes. This means resistance has minimal impact on how you sell. You are able to balance persuasion with patience, urgency with consistency, and clarity with empathy.\nAt this level, your sales style is adaptable, steady, and effective. Resistance is present — it always is — but it rarely prevents you from taking action or moving deals forward.",
      strengthsInsights: [
        "Comfortable asking for the deal directly.",
        "Consistent prospecting habits that keep the pipeline healthy.",
        "Value defended without defaulting to discounts.",
        "Clear communication that avoids both over-explaining and under-sharing.",
        "Customers who trust your balance of empathy and influence.",
      ],
      resistanceCosts: [
        "Low resistance does not mean no growth needed.",
        "Your strength is consistency, but without continued development you may overlook areas where you could sharpen your edge, such as negotiation skill or account expansion.",
      ],
      developmentAreas: [
        "Use your consistent style as a model for peers.",
        "Focus on advanced skills such as strategic negotiation or enterprise selling.",
        "Build thought-leadership credibility with customers and managers.",
        "Expand into leadership opportunities by coaching others through their resistance.",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Use your consistent style as a model for peers.",
          "Focus on advanced skills such as strategic negotiation or enterprise selling.",
          "Build thought-leadership credibility with customers and managers.",
          "Expand into leadership opportunities by coaching others through their resistance.",
        ],
      },
      whatOthersExperience: {
        customers: "Trust your balance of empathy and influence.",
        peers: "See you as a model of steady effectiveness.",
        managers: "View you as reliable and ready for advanced roles.",
      },
    },
    {
      id: "mixed-low-moderate",
      name: "Mixed Low + Moderate Resistance",
      description: "Mix of low and moderate resistance across archetypes",
      traits: [
        "Strong in some areas, friction in others",
        "Clear strengths with blind spots",
        "Effective most of the time but inconsistent in key moments",
      ],
      detailedDescription:
        "Your results show a mix of low resistance in some archetypes and moderate resistance in others. This means you have clear strengths in certain areas of selling, but also blind spots that create friction.\nAt this level, you are strong in many aspects of selling, but resistance still shows up in predictable ways that can slow growth.",
      strengthsInsights: [
        "Strong closing skills but inconsistent prospecting.",
        "Excellent rapport but discomfort in handling price objections.",
        "Clear communication most of the time, but over-explaining under stress.",
        "Customers who trust you in some areas but hesitate in others.",
      ],
      resistanceCosts: [
        "Customers and managers may see you as effective most of the time, but the inconsistencies stand out.",
        "In high-stakes deals, these blind spots can cost opportunities or reduce influence.",
      ],
      developmentAreas: [
        "Celebrate your low-resistance strengths — they are real assets.",
        "Target the 1–2 archetypes where resistance shows up most.",
        "Use micro-learning prompts to sharpen those specific skills.",
        "Ask for feedback from managers or peers to confirm blind spots and progress.",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Celebrate your low-resistance strengths — they are real assets.",
          "Target the 1–2 archetypes where resistance shows up most.",
          "Use micro-learning prompts to sharpen those specific skills.",
          "Ask for feedback from managers or peers to confirm blind spots and progress.",
        ],
      },
      whatOthersExperience: {
        customers: "Trust you in some areas but hesitate in others.",
        peers:
          "Appreciate your strengths but notice blind spots in key moments.",
        managers:
          "See you as effective but question consistency in high-stakes situations.",
      },
    },
  ],

  questions: {
    direct: [
      {
        id: "1",
        type: "direct",
        text: "I sometimes agree to customer requests even when I’m unsure we can deliver.",
        archetype: "over-promiser",
      },
      {
        id: "2",
        type: "direct",
        text: "I commit to deadlines or features before checking if they’re realistic.",
        archetype: "over-promiser",
      },
      {
        id: "7",
        type: "direct",
        text: "I often try to take control of the conversation to steer toward a close.",
        archetype: "closer-controller",
      },
      {
        id: "8",
        type: "direct",
        text: "I push customers to commit quickly before they reconsider.",
        archetype: "closer-controller",
      },
      {
        id: "13",
        type: "direct",
        text: "I sometimes avoid difficult questions to keep the interaction friendly.",
        archetype: "relationship-pleaser",
      },
      {
        id: "14",
        type: "direct",
        text: "I say yes to extra requests to avoid disappointing the customer.",
        archetype: "relationship-pleaser",
      },
      {
        id: "19",
        type: "direct",
        text: "I quickly offer discounts or extras when I sense hesitation.",
        archetype: "discount-giver",
      },
      {
        id: "20",
        type: "direct",
        text: "I sometimes cut price before exploring value or alternatives.",
        archetype: "discount-giver",
      },
      {
        id: "25",
        type: "direct",
        text: "I often go into great detail about features even if the customer hasn’t asked.",
        archetype: "product-drowner",
      },
      {
        id: "26",
        type: "direct",
        text: "I sometimes talk more about the product than the customer’s problem.",
        archetype: "product-drowner",
      },
      {
        id: "31",
        type: "direct",
        text: "I sometimes procrastinate on prospecting or lead generation.",
        archetype: "pipeline-avoider",
      },
      {
        id: "32",
        type: "direct",
        text: "I rely heavily on inbound or referrals rather than building my own pipeline.",
        archetype: "pipeline-avoider",
      },
      {
        id: "37",
        type: "direct",
        text: "I focus more on urgent deals than steady pipeline work.",
        archetype: "reactive-firefighter",
      },
      {
        id: "38",
        type: "direct",
        text: "I often drop long-term activities when something urgent comes up.",
        archetype: "reactive-firefighter",
      },
      {
        id: "43",
        type: "direct",
        text: "I sometimes wait for the customer to decide instead of asking for the close.",
        archetype: "silent-resistor",
      },
      {
        id: "44",
        type: "direct",
        text: "I avoid using closing language because it feels pushy.",
        archetype: "silent-resistor",
      },
    ],
    oblique: [
      {
        id: "3",
        type: "oblique",
        text: "I believe it’s better to promise more and figure it out later.",
        archetype: "over-promiser",
      },
      {
        id: "4",
        type: "oblique",
        text: "I assume customers will lose trust if I say “no” or set limits.",
        archetype: "over-promiser",
      },
      {
        id: "9",
        type: "oblique",
        text: "I believe hesitation means I need to press harder.",
        archetype: "closer-controller",
      },
      {
        id: "10",
        type: "oblique",
        text: "I assume strong persuasion is better than giving people more time.",
        archetype: "closer-controller",
      },
      {
        id: "15",
        type: "oblique",
        text: "I believe being liked is more important than challenging the customer.",
        archetype: "relationship-pleaser",
      },
      {
        id: "16",
        type: "oblique",
        text: "I assume conflict risks losing the relationship.",
        archetype: "relationship-pleaser",
      },
      {
        id: "21",
        type: "oblique",
        text: "I believe customers won’t buy unless they get a deal.",
        archetype: "discount-giver",
      },
      {
        id: "22",
        type: "oblique",
        text: "I assume lowering price is the fastest way to close.",
        archetype: "discount-giver",
      },
      {
        id: "27",
        type: "oblique",
        text: "I believe giving more information builds trust.",
        archetype: "product-drowner",
      },
      {
        id: "28",
        type: "oblique",
        text: "I assume customers buy only when they hear everything the product can do.",
        archetype: "product-drowner",
      },
      {
        id: "33",
        type: "oblique",
        text: "I believe new outreach is uncomfortable and often unproductive.",
        archetype: "pipeline-avoider",
      },
      {
        id: "34",
        type: "oblique",
        text: "I assume urgent deals matter more than steady pipeline building.",
        archetype: "pipeline-avoider",
      },
      {
        id: "39",
        type: "oblique",
        text: "I believe urgent deals should always take priority.",
        archetype: "reactive-firefighter",
      },
      {
        id: "40",
        type: "oblique",
        text: "I assume pipeline building can wait until later.",
        archetype: "reactive-firefighter",
      },
      {
        id: "45",
        type: "oblique",
        text: "I believe customers should come to the decision on their own.",
        archetype: "silent-resistor",
      },
      {
        id: "46",
        type: "oblique",
        text: "I assume asking for the sale risks damaging the relationship.",
        archetype: "silent-resistor",
      },
    ],
    scenario: [
      {
        id: "5",
        type: "scenario",
        text: "A client asks for something outside standard scope. I usually:",
        archetype: "over-promiser",
        options: [
          { value: "a", label: "Say yes immediately", archetypeScore: 5 },
          {
            value: "b",
            label: "Buy time and check internally",
            archetypeScore: 3,
          },
          { value: "c", label: "Decline politely", archetypeScore: 1 },
        ],
      },
      {
        id: "6",
        type: "scenario",
        text: "Which feels more natural?",
        archetype: "over-promiser",
        options: [
          {
            value: "a",
            label: "Agreeing first, solving details later",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Holding back commitments until I’m sure",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "11",
        type: "scenario",
        text: "When a customer hesitates, my instinct is to:",
        archetype: "closer-controller",
        options: [
          { value: "a", label: "Push harder to close", archetypeScore: 5 },
          { value: "b", label: "Ask clarifying questions", archetypeScore: 3 },
          { value: "c", label: "Give them space to think", archetypeScore: 1 },
        ],
      },
      {
        id: "12",
        type: "scenario",
        text: "Which best describes me?",
        archetype: "closer-controller",
        options: [
          {
            value: "a",
            label: "I’d rather risk being too forceful than losing the sale",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "I’d rather give too much space than push too hard",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "17",
        type: "scenario",
        text: "A customer challenges my proposal. I usually:",
        archetype: "relationship-pleaser",
        options: [
          { value: "a", label: "Back down to keep rapport", archetypeScore: 5 },
          {
            value: "b",
            label: "Defend my position respectfully",
            archetypeScore: 3,
          },
          { value: "c", label: "Stay quiet and move on", archetypeScore: 1 },
        ],
      },
      {
        id: "18",
        type: "scenario",
        text: "Which feels closer to me?",
        archetype: "relationship-pleaser",
        options: [
          {
            value: "a",
            label: "I’d rather please the customer than risk disagreement",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "I’d rather risk tension if it helps uncover the truth",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "23",
        type: "scenario",
        text: "When a customer objects to price, I tend to:",
        archetype: "discount-giver",
        options: [
          { value: "a", label: "Offer a discount", archetypeScore: 5 },
          { value: "b", label: "Reframe the value", archetypeScore: 3 },
          { value: "c", label: "Ask more questions", archetypeScore: 1 },
        ],
      },
      {
        id: "24",
        type: "scenario",
        text: "Which fits me better?",
        archetype: "discount-giver",
        options: [
          {
            value: "a",
            label: "It feels safer to reduce price than risk losing the deal",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "It feels safer to defend value than cut margin",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "29",
        type: "scenario",
        text: "During a demo, I usually:",
        archetype: "product-drowner",
        options: [
          {
            value: "a",
            label: "Cover as many features as possible",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Focus mainly on customer needs",
            archetypeScore: 3,
          },
          {
            value: "c",
            label: "Keep it short and ask questions",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "30",
        type: "scenario",
        text: "Which best describes me?",
        archetype: "product-drowner",
        options: [
          {
            value: "a",
            label:
              "I’d rather overshare details than risk leaving something out",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "I’d rather leave details out than overwhelm the customer",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "35",
        type: "scenario",
        text: "My prospecting habit looks most like:",
        archetype: "pipeline-avoider",
        options: [
          {
            value: "a",
            label: "Sporadic, only when deals run dry",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Consistent, scheduled outreach",
            archetypeScore: 1,
          },
          { value: "c", label: "I rarely do it myself", archetypeScore: 5 },
        ],
      },
      {
        id: "36",
        type: "scenario",
        text: "Which feels more true?",
        archetype: "pipeline-avoider",
        options: [
          {
            value: "a",
            label: "I tend to wait until pipeline is thin before prospecting",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "I maintain prospecting even when pipeline is healthy",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "41",
        type: "scenario",
        text: "If two tasks conflict, I choose:",
        archetype: "reactive-firefighter",
        options: [
          {
            value: "a",
            label: "The urgent deal with today’s deadline",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "The prospecting activity for next month",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "42",
        type: "scenario",
        text: "Which sounds more like me?",
        archetype: "reactive-firefighter",
        options: [
          {
            value: "a",
            label: "I thrive in the adrenaline of urgent deals",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "I thrive in steady, consistent sales habits",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "47",
        type: "scenario",
        text: "At the end of a conversation, I usually:",
        archetype: "silent-resistor",
        options: [
          {
            value: "a",
            label: "Wait for the customer to bring up next steps",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Suggest clear next steps myself",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "48",
        type: "scenario",
        text: "Which is closer to me?",
        archetype: "silent-resistor",
        options: [
          {
            value: "a",
            label: "I’d rather wait for the customer than risk pressuring them",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "I’d rather ask directly than leave it open",
            archetypeScore: 1,
          },
        ],
      },
    ],
    balancing: [
      {
        id: "49",
        type: "balancing",
        text: "I ask directly for commitments when the time is right. (reverse Silent Resistor)",
        archetype: "silent-resistor",
        isReverseCoded: true,
      },
      {
        id: "50",
        type: "balancing",
        text: "I prefer to maintain consistent prospecting regardless of urgency. (reverse Pipeline Avoider)",
        archetype: "pipeline-avoider",
        isReverseCoded: true,
      },
      {
        id: "51",
        type: "balancing",
        text: "I defend value before offering discounts. (reverse Discount Giver)",
        archetype: "discount-giver",
        isReverseCoded: true,
      },
      {
        id: "52",
        type: "balancing",
        text: "I only promise what I know I can deliver. (reverse Over Promiser)",
        archetype: "over-promiser",
        isReverseCoded: true,
      },
      {
        id: "53",
        type: "balancing",
        text: "I focus on listening more than pushing to close. (reverse Closer Controller)",
        archetype: "closer-controller",
        isReverseCoded: true,
      },
      {
        id: "54",
        type: "balancing",
        text: "I balance friendliness with honesty, even if it risks tension. (reverse Relationship Pleaser)",
        archetype: "relationship-pleaser",
        isReverseCoded: true,
      },
      {
        id: "55",
        type: "balancing",
        text: "I keep explanations short and focused on customer needs. (reverse Product Drowner)",
        archetype: "product-drowner",
        isReverseCoded: true,
      },
      {
        id: "56",
        type: "balancing",
        text: "I prioritize long-term pipeline even when urgent deals pop up. (reverse Reactive Firefighter)",
        archetype: "reactive-firefighter",
        isReverseCoded: true,
      },
      {
        id: "57",
        type: "balancing",
        text: "When under pressure, I can say no respectfully. (reverse Relationship Pleaser)",
        archetype: "relationship-pleaser",
        isReverseCoded: true,
      },
      {
        id: "58",
        type: "balancing",
        text: "I am comfortable sharing fewer details if they’re more relevant. (reverse Product Drowner)",
        archetype: "product-drowner",
        isReverseCoded: true,
      },
      {
        id: "59",
        type: "balancing",
        text: "I maintain prospecting habits even when sales are strong. (reverse Pipeline Avoider)",
        archetype: "pipeline-avoider",
        isReverseCoded: true,
      },
      {
        id: "60",
        type: "balancing",
        text: "I can close confidently without over-pressuring. (reverse Silent Resistor / Closer Controller blend)",
        archetype: "silent-resistor",
        isReverseCoded: true,
      },
    ],
    forcedChoice: [], // No separate forced-choice blocks; scenarios serve this purpose
  },

  scoring: {
    forcedChoiceMost: 2, // +2 for "most like me"
    forcedChoiceLeast: -1, // -1 for "least like me"
    resistanceBands: {
      low: { min: 0, max: 34 },
      moderate: { min: 35, max: 54 },
      high: { min: 55, max: 100 },
    },
  },
  specialScenarios: [
    {
      id: "all_low",
      title: "All Archetypes Low (0–34%)",
      condition: {
        type: "all_low",
        thresholds: { low: 34 },
      },
      content: {
        firstKnowThis:
          "Having low resistance across all sales archetypes does not mean you lack patterns. It means you are generally able to move forward without getting stuck in over-promising, product drowning, or other delays. Your resistance levels are low enough that they do not significantly interfere with consistent sales progress.",
        whatItMeans: [
          "You manage prospects with balance and flow.",
          "Resistance shows up occasionally, but rarely dominates.",
          "Growth is less about removing resistance and more about amplifying your natural momentum.",
        ],
        growthPath: [
          "Focus on sustaining balance through healthy routines.",
          "Reflect on small areas where resistance might appear under pressure (e.g., end of quarter, difficult prospects).",
          "Use this awareness to prevent future blind spots.",
        ],
      },
    },
    {
      id: "all_moderate",
      title: "All Archetypes Moderate (35–54%)",
      condition: {
        type: "all_moderate",
        thresholds: { moderate: 35 },
      },
      content: {
        firstKnowThis:
          'Moderate resistance across all sales archetypes means no single pattern dominates, but delays still show up in subtle ways. This creates a sense of "average resistance" that may not feel like a major barrier day to day, yet it can gradually hold back bigger opportunities and pipeline growth.',
        whatItMeans: [
          "Progress is steady, but not as fast as it could be.",
          "Different archetypes may show up situationally depending on the prospect or deal stage.",
          "Resistance feels inconsistent, making it harder to pinpoint one clear cause of stalled deals.",
        ],
        growthPath: [
          "Pay attention to recurring themes when deals stall or prospects go quiet.",
          "Track when and where you hesitate, and notice which sales archetype is most active.",
          "Small adjustments across several areas will compound into bigger momentum and better conversion rates.",
        ],
      },
    },
    {
      id: "mixed_resistance",
      title: "Mixed Resistance (a blend of Low, Moderate, and High)",
      condition: {
        type: "mixed_low_moderate",
      },
      content: {
        firstKnowThis:
          "Mixed resistance means you have sales strengths in some areas while struggling in others. Certain archetypes hardly affect you, while others show up strongly and create bottlenecks. This creates an uneven sales experience where you may excel with certain types of prospects but stall with others.",
        whatItMeans: [
          "You may be highly effective in low-resistance stages, but inconsistently successful overall.",
          "High-resistance archetypes can overshadow progress if not managed.",
          "The blend provides an opportunity: by reducing resistance in your top sales archetype, overall conversion increases quickly.",
        ],
        growthPath: [
          "Focus first on your highest-resistance sales archetype.",
          "Apply targeted growth strategies to balance the areas where you get stuck with prospects.",
          "Leverage your low-resistance sales strengths to counterbalance problem areas.",
          'Track progress by watching how your "bottleneck" archetype shifts over time and impacts deal flow.',
        ],
      },
    },
  ],
};

// Export all assessment categories
export const ASSESSMENT_CATEGORIES: Record<string, AssessmentCategory> = {
  "sales-assessment": SALES_ASSESSMENT_CATEGORY,
  sales: SALES_ASSESSMENT_CATEGORY,
};

// Helper function to get assessment by ID
export function getAssessmentCategory(
  categoryId: string,
): AssessmentCategory | null {
  return ASSESSMENT_CATEGORIES[categoryId] || null;
}

// Helper function to get all questions for a category
export function getAllQuestions(categoryId: string): AssessmentQuestion[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];

  return [
    ...category.questions.direct,
    ...category.questions.oblique,
    ...category.questions.scenario,
    ...category.questions.balancing,
  ];
}

// Helper function to get all forced choice blocks for a category
export function getForcedChoiceBlocks(categoryId: string): ForcedChoiceBlock[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];

  return category.questions.forcedChoice;
}

// Helper function to get archetypes for a category
export function getArchetypes(categoryId: string): AssessmentArchetype[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];

  // Filter out special scenario archetypes that are used for results display but shouldn't be selectable
  const actualArchetypes = category.archetypes.filter(
    (archetype) =>
      ![
        "all-moderate-resistance",
        "all-low-resistance",
        "mixed-low-moderate",
      ].includes(archetype.id),
  );

  return actualArchetypes;
}
