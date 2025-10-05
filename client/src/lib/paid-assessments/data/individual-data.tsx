// Central Questions Data File for Individual Performance Assessment
// This file contains the individual performance assessment category with questions, options, archetypes, and scoring logic

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
  // Extended detailed analysis fields
  highResistanceCharacteristics?: string[];
  coreBehaviorsUnderResistance?: string[];
  rootCauses?: string[];
  beliefsThatDriveResistance?: string[];
  stressBehaviors?: string[];
  situationalAdaptations?: string[];
  strengthsHiddenInside?: string[];
  detailedResistanceCosts?: string[];
  highResistanceDescription?: string;
  // Category-specific content for different organization types
  categoryContent?: {
    corporate?: {
      resistanceCosts?: string[];
      growthPath?: string[];
    };
    midSize?: {
      resistanceCosts?: string[];
      growthPath?: string[];
    };
    smb?: {
      resistanceCosts?: string[];
      growthPath?: string[];
    };
    entrepreneur?: {
      sole?: {
        resistanceCosts?: string[];
        growthPath?: string[];
      };
      micro?: {
        resistanceCosts?: string[];
        growthPath?: string[];
      };
      growing?: {
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
    whatItMeans: string[];
    resistanceImpact?: string[];
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

// Individual Performance Assessment Data
const INDIVIDUAL_PERFORMANCE_CATEGORY: AssessmentCategory = {
  id: "individual-performance",
  name: "Individual Performance Assessment",
  description:
    "Comprehensive individual performance style and resistance pattern assessment based on 8 archetypes",

  archetypes: [
    {
      id: "perfectionist-achiever",
      name: "Perfectionist Achiever",
      description:
        "Holds high standards but often delays progress seeking flawlessness",
      traits: [
        "High standards",
        "Attention to detail",
        "Quality-focused",
        "Self-critical",
      ],
      detailedDescription:
        "Being a Perfectionist Achiever doesn’t mean you lack drive. In fact, your ambition and standards are often higher than most. But those same standards can turn into friction. Progress gets delayed because “ready” never feels ready enough. The pursuit of flawless execution protects quality, but it also creates slow starts, endless rework, and missed chances to learn by doing. What feels like caution often becomes hesitation, keeping you stuck polishing while others move forward.",
      strengthsInsights: [
        "High attention to detail that reduces errors",
        "Dedication to producing quality outcomes",
        "Ability to uphold high standards for teams and projects",
        "Consistency that ensures reliability in delivery",
      ],
      resistanceCosts: [
        "Stall projects by slowing starts and finishes",
        "Create unnecessary stress by overworking small details",
        "Delay recognition because results are hidden too long",
        "Limit opportunities in fast-moving environments where speed wins visibility",
      ],
      developmentAreas: [
        "Improve speed of execution",
        "Develop comfort with 'good enough'",
        "Build feedback-seeking habits",
      ],
      growthPath: {
        immediateShifts: [
          "Commit to finishing before perfecting — send the draft, then refine.",
          "Use a timer (e.g., 25 minutes) to prevent endless editing.",
          'When you hear "not ready yet," pause and ask: Is this about quality, or fear of judgment?',
        ],
        strategicPractices: [
          "Seek feedback at 70% complete instead of waiting until it feels flawless — this builds speed and reduces over-analysis.",
          "Track where perfectionism caused delays, so the hidden costs are visible.",
          'Practice "small imperfection reps" daily (e.g., share an unpolished idea in a meeting).',
        ],
        longTermGrowth: [
          "Redefine success as consistent delivery, not flawless output.",
          "Anchor your identity in adaptability and resilience — qualities that accelerate promotions more than polish.",
          "Build a reputation as someone who drives momentum, showing others that credibility comes from results, not endless refining.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Recheck or redo work long past the point of diminishing returns",
        "Delay starting because conditions don’t feel ideal",
        "Hesitate to share drafts or progress updates",
        "Focus more on flaws than forward momentum",
        "Turn small details into large time drains",
      ],
      rootCauses: [
        "Families, schools, or cultures where failure was punished more than effort was praised",
        "Workplaces where flawless results were rewarded more than timely ones",
        "Early experiences where recognition only came with “perfect” outcomes",
        "Situations where criticism overshadowed achievement",
      ],
      beliefsThatDriveResistance: [
        "If it isn’t perfect, it isn’t worth sharing.",
        "Mistakes say more about me than successes.",
        "Readiness must come before action.",
        "Being flawless is safer than being fast.",
      ],
      stressBehaviors: [
        "Freeze instead of starting",
        "Sink into over-analysis of small details",
        "Avoid finishing for fear of critique",
        "Push deadlines out to keep refining",
      ],
      situationalAdaptations: [
        "Deadlines or accountability partners emphasize progress over polish",
        "Leaders model “drafts and iterations” as the path to quality",
        "Mistakes are framed as data, not failure",
        "Trusted peers reinforce the value of speed and learning",
      ],
      strengthsHiddenInside: [
        "High attention to detail that reduces errors",
        "Dedication to producing quality outcomes",
        "Ability to uphold high standards for teams and projects",
        "Consistency that ensures reliability in delivery",
      ],
      detailedResistanceCosts: [
        "Stall projects by slowing starts and finishes",
        "Create unnecessary stress by overworking small details",
        "Delay recognition because results are hidden too long",
        "Limit opportunities in fast-moving environments where speed wins visibility",
      ],
      highResistanceDescription:
        "At this level, perfectionism isn’t just a minor quirk. It’s a strong force shaping how you work. Your thoroughness reduces careless mistakes, but it also slows momentum, increases stress under deadlines, and limits recognition when faster peers put out “good enough” results and move ahead. The result: your talent is real, but it risks being hidden behind delays.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Delayed product launches that miss market windows",
            "Increased costs from excessive rework and refinement cycles",
          ],
          growthPath: [
            "Practice 'good enough' milestones with stakeholder buy-in",
            "Implement time-boxed revision cycles for deliverables",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Missed opportunities due to slow decision-making",
            "Team bottlenecks when waiting for perfect solutions",
          ],
          growthPath: [
            "Set clear quality thresholds with leadership agreement",
            "Practice sharing work at 80% completion for feedback",
          ],
        },
        smb: {
          resistanceCosts: [
            "Resource drain from endless refinements",
            "Lost competitive advantage due to late-to-market positioning",
          ],
          growthPath: [
            "Align quality standards with business priorities",
            "Practice rapid prototyping and iterative improvement",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Cash flow issues from delayed client deliveries",
              "Missed business development opportunities",
            ],
            growthPath: [
              "Set client expectations early about revision cycles",
              "Practice minimum viable product approaches",
            ],
          },
          micro: {
            resistanceCosts: [
              "Limited growth due to capacity constraints",
              "Customer acquisition slowdown from delayed launches",
            ],
            growthPath: [
              "Delegate quality control to trusted team members",
              "Implement feedback loops for continuous improvement",
            ],
          },
          growing: {
            resistanceCosts: [
              "Scaling bottlenecks as business grows",
              "Investor concerns about operational efficiency",
            ],
            growthPath: [
              "Build quality systems that don't require personal oversight",
              "Train team members to maintain standards independently",
            ],
          },
        },
      },
    },
    {
      id: "helper-over-giver",
      name: "Helper / Over-Giver",
      description:
        "Prioritizes helping others at the expense of own priorities",
      traits: ["Supportive", "Generous", "Team-oriented", "Self-sacrificing"],
      detailedDescription:
        "Being a Helper doesn’t mean you lack priorities of your own. It means your progress often gets delayed because other people’s needs feel more urgent than yours. You step in quickly, support generously, and create harmony. But when taken too far, this instinct to give leaves your own goals on hold, drains energy, and creates frustration when recognition doesn’t come back.",
      strengthsInsights: [
        "Builds deep trust and goodwill",
        "Highly attuned to others’ needs",
        "Creates harmony in groups and relationships",
        "Dependable and supportive under pressure",
      ],
      resistanceCosts: [
        "Stall your personal projects and goals",
        "Create exhaustion and hidden frustration",
        "Make others see you as dependable but not assertive",
        "Limit advancement if self-advocacy is missing",
      ],
      developmentAreas: [
        "Improve boundary setting",
        "Develop self-priority skills",
        "Balance giving with receiving",
      ],
      growthPath: {
        immediateShifts: [
          'Say "yes" more carefully — try "yes, if…" to create boundaries.',
          "Pause before helping and ask: Am I doing this out of genuine choice, or out of fear of disappointing?",
          "Practice saying no once this week, framing it as prioritization, not rejection.",
        ],
        strategicPractices: [
          "Track when over-giving leads to overload, resentment, or missed opportunities.",
          'Use scripts for polite boundary-setting: "I\'d love to help, but I need to finish X first."',
          "Role-play declining requests with a mentor or peer to normalize the discomfort.",
        ],
        longTermGrowth: [
          "Reframe boundaries as an act of respect — for yourself and for others.",
          "Anchor your identity in balanced contribution, not self-sacrifice.",
          "Become known as a professional who is generous and discerning, earning respect instead of just appreciation.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Say “yes” quickly, even when already stretched thin",
        "Take on others’ priorities before their own",
        "Feel guilty setting boundaries or saying no",
        "Equate helpfulness with being valuable",
        "Delay their own deadlines to keep peace",
      ],
      rootCauses: [
        "Families or cultures that valued selflessness above self-priority",
        "Schools or workplaces where volunteering and sacrifice earned respect",
        "Early relationships where harmony felt safer than boundaries",
        "Experiences where saying no created conflict or disapproval",
      ],
      beliefsThatDriveResistance: [
        "“If I say no, I’ll let people down.”",
        "“My value comes from what I do for others.”",
        "“Boundaries are selfish.”",
        "“Harmony is safer than conflict.”",
      ],
      stressBehaviors: [
        "Take on even more for others while neglecting themselves",
        "Delay their own goals to avoid disappointing anyone",
        "Overextend until burnout sets in",
        "Feel resentment when efforts go unrecognized",
      ],
      situationalAdaptations: [
        "Boundaries are modeled and supported by peers or leaders",
        "Saying no is reframed as respect for both parties’ time",
        "Self-care is treated as necessary, not selfish",
        "Priorities are made visible and non-negotiable",
      ],
      strengthsHiddenInside: [
        "Builds deep trust and goodwill",
        "Highly attuned to others’ needs",
        "Creates harmony in groups and relationships",
        "Dependable and supportive under pressure",
      ],
      detailedResistanceCosts: [
        "Stall your personal projects and goals",
        "Create exhaustion and hidden frustration",
        "Make others see you as dependable but not assertive",
        "Limit advancement if self-advocacy is missing",
      ],
      highResistanceDescription:
        "At this level, the pull to over-give is strong. You often delay or drop your own tasks to respond to others. While this builds goodwill, it also slows your personal progress and makes it harder to claim your own space. The result: others thrive with your help, but your momentum suffers in silence.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Career advancement stalled by lack of self-advocacy",
            "Burnout from unsustainable workload and helping patterns",
          ],
          growthPath: [
            "Practice saying no to non-essential requests with clear reasoning",
            "Track personal accomplishments separately from team contributions",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Limited growth opportunities due to over-focus on helping",
            "Resentment building from unbalanced give-and-take relationships",
          ],
          growthPath: [
            "Set specific office hours for helping others",
            "Negotiate recognition for mentoring and support activities",
          ],
        },
        smb: {
          resistanceCosts: [
            "Personal skill development neglected for team maintenance",
            "Reduced visibility for individual contributions and achievements",
          ],
          growthPath: [
            "Document and communicate individual contributions clearly",
            "Balance helping with personal skill building and visible projects",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Revenue loss from undercharging or overdelivering",
              "Business growth limited by excessive client accommodation",
            ],
            growthPath: [
              "Establish clear service boundaries and stick to contracts",
              "Practice charging appropriately for additional requests",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team growth limited by over-dependence on founder support",
              "Scalability issues from personal involvement in all client relationships",
            ],
            growthPath: [
              "Train team members to handle support independently",
              "Create systems for client success that don't require personal intervention",
            ],
          },
          growing: {
            resistanceCosts: [
              "Leadership bottlenecks from inability to let team struggle and learn",
              "Investor concerns about founder dependency in team operations",
            ],
            growthPath: [
              "Develop formal leadership development programs for team",
              "Create metrics that reward team independence and initiative",
            ],
          },
        },
      },
    },
    {
      id: "avoider",
      name: "Avoider",
      description: "Delays uncomfortable tasks or decisions",
      traits: [
        "Procrastination-prone",
        "Risk-averse",
        "Distraction-seeking",
        "Hesitant",
      ],
      detailedDescription:
        "Being an Avoider does not mean you lack discipline or ambition. It means progress often stalls because tasks that feel uncomfortable, unclear, or high-stakes trigger hesitation. You may fill time with easier work, distractions, or endless planning to avoid what feels risky. These patterns protect you from stress in the short term, but they also create long-term resistance that keeps you from moving forward.",
      strengthsInsights: [
        "Skilled at finding simpler or less risky paths",
        "Good at prioritizing small details under pressure",
        "Resourceful when deadlines demand quick action",
        "Ability to analyze challenges before rushing in",
      ],
      resistanceCosts: [
        "Delay major goals until opportunities pass",
        "Reduce trust when others see unfinished work",
        "Increase stress by creating last-minute urgency",
        "Limit confidence and visibility in high-stakes situations",
      ],
      developmentAreas: [
        "Improve action initiation",
        "Develop momentum building",
        "Build discomfort tolerance",
      ],
      growthPath: {
        immediateShifts: [
          "Break avoided tasks into micro-steps — work for 5 minutes, then reassess.",
          'Replace "I\'ll do it later" with "I\'ll start now, even a little."',
          "Notice avoidance moments and label them: This is resistance, not laziness.",
        ],
        strategicPractices: [
          "Track what you avoid and what it costs (missed deadlines, stress spikes, lost credibility).",
          "Use accountability structures: peer check-ins, visible task boards, or scheduled reminders.",
          "Reflect weekly on what feelings you avoid (fear of failure, rejection, or conflict).",
        ],
        longTermGrowth: [
          "Reframe avoidance as a signal of growth — the very task you avoid is where progress lives.",
          "Anchor identity in reliability and follow-through.",
          "Build a reputation as someone who faces discomfort directly, which positions you for leadership opportunities.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Postpone uncomfortable or uncertain tasks",
        "Fill time with small, low-stakes activities",
        "Wait until external pressure forces action",
        "Start late and finish in a stressful rush",
        "Over-plan instead of starting directly",
      ],
      rootCauses: [
        "Childhood or school experiences where mistakes were criticized harshly",
        "Early jobs where high-pressure tasks created anxiety or fear of failure",
        "Workplaces that punished missteps more than they rewarded progress",
        "Situations where procrastination reduced short-term stress, reinforcing the habit",
      ],
      beliefsThatDriveResistance: [
        "“If I avoid this, I avoid failure.”",
        "“I can handle it later when I feel more ready.”",
        "“Starting now feels too overwhelming.”",
        "“Small tasks are safer than big risks.”",
      ],
      stressBehaviors: [
        "Turn to distractions or busywork",
        "Avoid difficult conversations or decisions",
        "Wait for deadlines to dictate action",
        "Experience guilt or self-criticism for procrastinating, which reinforces the cycle",
      ],
      situationalAdaptations: [
        "Clear step-by-step plans reduce the sense of overwhelm",
        "Supportive peers or mentors provide accountability",
        "Large goals are broken into smaller, manageable actions",
        "Mistakes are treated as learning instead of failure",
      ],
      strengthsHiddenInside: [
        "Skilled at finding simpler or less risky paths",
        "Good at prioritizing small details under pressure",
        "Resourceful when deadlines demand quick action",
        "Ability to analyze challenges before rushing in",
      ],
      detailedResistanceCosts: [
        "Delay major goals until opportunities pass",
        "Reduce trust when others see unfinished work",
        "Increase stress by creating last-minute urgency",
        "Limit confidence and visibility in high-stakes situations",
      ],
      highResistanceDescription:
        "At this level, avoidance is a consistent barrier. Big goals, new challenges, and difficult conversations often get pushed aside. While you are still capable of completing important work, the delays increase pressure, create last-minute rushes, and limit your ability to show steady progress. Others may see your potential, but they do not always see your follow-through.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Missed project deadlines that impact team morale and planning",
            "Reduced credibility for future high-stakes assignments",
          ],
          growthPath: [
            "Use project management tools with automated reminders and deadlines",
            "Break large projects into smaller, less overwhelming milestones",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Career opportunities limited by reputation for delays",
            "Increased stress from last-minute rushes and deadline pressure",
          ],
          growthPath: [
            "Implement time-blocking for difficult tasks",
            "Find accountability partner for regular check-ins on progress",
          ],
        },
        smb: {
          resistanceCosts: [
            "Business opportunities lost due to slow response times",
            "Team productivity affected by bottlenecks in decision-making",
          ],
          growthPath: [
            "Set artificial deadlines earlier than real ones",
            "Practice rapid prototyping and 'good enough' solutions",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Client relationships strained by delivery delays",
              "Business growth limited by reluctance to take on challenging projects",
            ],
            growthPath: [
              "Use external deadlines and accountability systems",
              "Start with smaller, lower-risk projects to build momentum",
            ],
          },
          micro: {
            resistanceCosts: [
              "Cash flow issues from delayed product launches",
              "Team morale affected by constantly shifting priorities and timelines",
            ],
            growthPath: [
              "Delegate execution while maintaining planning oversight",
              "Implement agile development with shorter sprint cycles",
            ],
          },
          growing: {
            resistanceCosts: [
              "Growth targets missed due to delayed market entry",
              "Investor confidence undermined by execution hesitation",
            ],
            growthPath: [
              "Hire execution-focused team members to complement planning",
              "Set up systems that force decision-making at regular intervals",
            ],
          },
        },
      },
    },
    {
      id: "cautious-evaluator",
      name: "Cautious Evaluator",
      description: "Over-analyzes decisions before acting",
      traits: ["Analytical", "Thorough", "Risk-aware", "Deliberate"],
      detailedDescription:
        "Being a Cautious Evaluator does not mean you lack confidence. It means progress often slows because you feel the need to collect more information, weigh every outcome, and look for certainty before moving forward. This careful approach protects against mistakes, but it also creates hesitation that delays decisions, limits bold action, and allows opportunities to pass by while you are still analyzing.",
      strengthsInsights: [
        "Thorough analysis prevents careless errors",
        "Dependable planning builds trust",
        "Careful evaluation protects long-term outcomes",
        "Stability creates confidence in high-stakes environments",
      ],
      resistanceCosts: [
        "Delay opportunities until they are no longer available",
        "Create bottlenecks in group decision-making",
        "Reduce visibility as a decisive leader",
        "Limit personal growth in fast-moving environments",
      ],
      developmentAreas: [
        "Improve decision speed",
        "Develop risk tolerance",
        "Build confidence in uncertainty",
      ],
      growthPath: {
        immediateShifts: [
          'Make one faster decision daily — test "good enough" instead of waiting for perfect certainty.',
          "When you want more data, ask: Do I need this to move forward, or am I stalling?",
          "Say yes to one small, low-stakes risk this week.",
        ],
        strategicPractices: [
          "Track how often analysis delayed action — make the hidden costs visible.",
          "Pilot small experiments to practice safe risk-taking.",
          "Pair with risk-tolerant peers to balance your caution with action.",
        ],
        longTermGrowth: [
          "Reframe risk as learning, not danger.",
          "Anchor identity in adaptability and decisiveness.",
          "Become known as a thoughtful but bold professional — someone who balances analysis with timely action.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Overanalyze choices before acting",
        "Recheck plans multiple times to avoid mistakes",
        "Delay action until they feel certain",
        "Prefer familiar or proven paths over experiments",
        "Struggle to commit quickly when options feel unclear",
      ],
      rootCauses: [
        "Families or schools that rewarded only correct answers and punished errors",
        "Workplaces that valued certainty over experimentation",
        "Early experiences where risks led to criticism or setbacks",
        "Cultures where preparation was equated with responsibility",
      ],
      beliefsThatDriveResistance: [
        "“I must be certain before I decide.”",
        "“Mistakes are harder to recover from than delays.”",
        "“It is safer to wait than to choose too quickly.”",
        "“Preparation is more important than speed.”",
      ],
      stressBehaviors: [
        "Freeze in indecision rather than move forward",
        "Obsessively gather more data",
        "Pass responsibility to others to avoid blame",
        "Delay progress until deadlines leave no choice",
      ],
      situationalAdaptations: [
        "Leaders or peers frame mistakes as learning opportunities",
        "Deadlines or accountability push decisions forward",
        "Choices are broken into smaller steps with low stakes",
        "Trusted support provides reassurance in uncertain situations",
      ],
      strengthsHiddenInside: [
        "Thorough analysis prevents careless errors",
        "Dependable planning builds trust",
        "Careful evaluation protects long-term outcomes",
        "Stability creates confidence in high-stakes environments",
      ],
      detailedResistanceCosts: [
        "Delay opportunities until they are no longer available",
        "Create bottlenecks in group decision-making",
        "Reduce visibility as a decisive leader",
        "Limit personal growth in fast-moving environments",
      ],
      highResistanceDescription:
        "At this level, caution is a strong influence on your performance. You frequently delay choices until you feel certain, which reduces risk but also slows growth. Others may see your reliability, but they may also experience frustration when progress depends on your decision-making.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Strategic opportunities missed while analyzing competitors",
            "Team morale affected by slow decision cycles and constant re-evaluation",
          ],
          growthPath: [
            "Set decision deadlines with stakeholder agreement",
            "Use decision matrices to speed up choice evaluation",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Leadership advancement limited by perception of indecisiveness",
            "Project delays that impact overall business agility",
          ],
          growthPath: [
            "Practice making smaller decisions quickly to build confidence",
            "Implement time-boxed analysis periods for major choices",
          ],
        },
        smb: {
          resistanceCosts: [
            "Market opportunities lost to more decisive competitors",
            "Business growth constrained by slow adaptation to change",
          ],
          growthPath: [
            "Develop standard decision criteria to speed evaluation",
            "Practice 'good enough' decision-making for low-risk choices",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Business opportunities lost due to delayed decision-making",
              "Competitive disadvantage from slow market response",
            ],
            growthPath: [
              "Set artificial deadlines for all major decisions",
              "Develop trusted advisor network for faster input",
            ],
          },
          micro: {
            resistanceCosts: [
              "Product development cycles extended beyond market needs",
              "Team innovation stifled by over-analysis of new ideas",
            ],
            growthPath: [
              "Implement rapid prototyping with quick feedback cycles",
              "Delegate operational decisions to trusted team members",
            ],
          },
          growing: {
            resistanceCosts: [
              "Growth targets missed due to slow strategic pivots",
              "Investor concerns about leadership agility in changing markets",
            ],
            growthPath: [
              "Create clear decision authority frameworks for team",
              "Practice scenario planning to speed up strategic choices",
            ],
          },
        },
      },
    },
    {
      id: "independent-doer",
      name: "Independent Doer",
      description: "Prefers working alone and resists collaboration",
      traits: [
        "Self-reliant",
        "Autonomous",
        "Feedback-resistant",
        "Solo-focused",
      ],
      detailedDescription:
        "Being an Independent Doer does not mean you cannot collaborate. It means you often delay or resist progress because relying on others feels slower, riskier, or less reliable than doing it yourself. Independence makes you dependable and capable under pressure, but when it hardens into resistance it creates isolation, overload, and missed opportunities to grow through teamwork.",
      strengthsInsights: [
        "Strong ability to deliver results on their own",
        "Self-sufficiency in challenging situations",
        "Dependable when autonomy is required",
        "Confidence in personal capability",
      ],
      resistanceCosts: [
        "Create isolation that limits growth and visibility",
        "Reduce efficiency by taking on too much alone",
        "Miss opportunities that require collaboration",
        "Prevent recognition from leaders who value teamwork",
      ],
      developmentAreas: [
        "Improve collaboration skills",
        "Develop delegation",
        "Build team trust",
      ],
      growthPath: {
        immediateShifts: [
          "Share a work-in-progress update before completion.",
          "Ask one colleague for input per project.",
          'Replace "I\'ll handle it myself" with "Here\'s how we can do this together."',
        ],
        strategicPractices: [
          "Track times independence caused rework, misalignment, or lost opportunities.",
          "Build collaboration rituals: weekly syncs, shared documents, or project boards.",
          "Intentionally partner with peers, even on tasks you could do alone.",
        ],
        longTermGrowth: [
          "Reframe collaboration as efficiency, not weakness.",
          "Anchor your identity in interdependence — trusted by others, not just self-reliant.",
          "Build credibility as a team player who multiplies impact through connection, not just individual effort.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Prefer to work alone rather than rely on others",
        "Resist feedback because it feels restrictive",
        "Take on more than they can reasonably handle",
        "Value self-sufficiency above collaboration",
        "Struggle to delegate even when it is necessary",
      ],
      rootCauses: [
        "Families or schools that emphasized self-reliance",
        "Workplaces that celebrated individual achievement over team success",
        "Early experiences where relying on others led to disappointment or failure",
        "Cultures where asking for help was viewed as weakness",
      ],
      beliefsThatDriveResistance: [
        "“If I want it done right, I must do it myself.”",
        "“Dependence slows me down.”",
        "“Feedback limits my freedom.”",
        "“Collaboration creates risk.”",
      ],
      stressBehaviors: [
        "Refuse to ask for help even when overloaded",
        "Reject input or feedback from others",
        "Take on tasks outside their capacity",
        "Withdraw from group problem-solving",
      ],
      situationalAdaptations: [
        "Collaboration is framed as a way to achieve more impact",
        "Feedback is positioned as support, not criticism",
        "Teams celebrate shared outcomes instead of individual wins",
        "Delegation is treated as strength rather than weakness",
      ],
      strengthsHiddenInside: [
        "Strong ability to deliver results on their own",
        "Self-sufficiency in challenging situations",
        "Dependable when autonomy is required",
        "Confidence in personal capability",
      ],
      detailedResistanceCosts: [
        "Create isolation that limits growth and visibility",
        "Reduce efficiency by taking on too much alone",
        "Miss opportunities that require collaboration",
        "Prevent recognition from leaders who value teamwork",
      ],
      highResistanceDescription:
        "At this level, independence is a strong influence on your performance. You may avoid seeking feedback, hesitate to delegate, and resist relying on others. While this keeps you in control of your outcomes, it also increases workload, reduces collaboration, and can leave your efforts invisible to decision-makers.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Career advancement limited by lack of collaborative leadership",
            "Team productivity reduced by bottlenecks and knowledge silos",
          ],
          growthPath: [
            "Practice delegating smaller tasks to build trust in others",
            "Participate in cross-functional projects to develop collaboration skills",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Knowledge transfer gaps that create organizational risk",
            "Limited influence due to isolated working style",
          ],
          growthPath: [
            "Schedule regular knowledge sharing sessions with colleagues",
            "Take on mentoring responsibilities to build collaborative skills",
          ],
        },
        smb: {
          resistanceCosts: [
            "Team growth constrained by over-dependence on individual contributor",
            "Business risk from concentrated knowledge and skills",
          ],
          growthPath: [
            "Document processes and share expertise with team members",
            "Practice collaborative problem-solving on small projects",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Business growth limited by inability to leverage partnerships",
              "Client relationships constrained by limited collaborative offerings",
            ],
            growthPath: [
              "Develop strategic partnerships for complementary services",
              "Practice client collaboration and co-creation approaches",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team scalability limited by founder bottlenecks",
              "Customer satisfaction affected by limited collaborative options",
            ],
            growthPath: [
              "Train team members to handle client relationships independently",
              "Create collaborative customer engagement processes",
            ],
          },
          growing: {
            resistanceCosts: [
              "Leadership team development constrained by concentrated decision-making",
              "Investor concerns about succession planning and knowledge transfer",
            ],
            growthPath: [
              "Develop senior team members to share leadership responsibilities",
              "Create systems for distributed decision-making and accountability",
            ],
          },
        },
      },
    },
    {
      id: "recognition-seeker",
      name: "Recognition Seeker",
      description: "Ties motivation to external visibility and praise",
      traits: [
        "Visibility-focused",
        "Achievement-driven",
        "Credit-seeking",
        "Motivation-external",
      ],
      detailedDescription:
        "Being a Recognition Seeker does not mean you lack confidence. It means your progress is often tied to whether your efforts are seen and acknowledged by others. You feel energized when your work is visible, but when recognition is missing you may delay, disengage, or lose motivation. Visibility is important for career growth, but when it becomes the driver, your momentum can rise and fall with outside approval.",
      strengthsInsights: [
        "Strong ability to showcase achievements",
        "Motivation that drives consistent effort when visible",
        "High engagement in group settings where recognition is present",
        "Skill at drawing attention to progress and results",
      ],
      resistanceCosts: [
        "Create inconsistent progress depending on visibility",
        "Limit willingness to take on low-profile but important work",
        "Increase stress when acknowledgment is delayed",
        "Reduce authenticity by shaping actions for approval rather than growth",
      ],
      developmentAreas: [
        "Build intrinsic motivation",
        "Develop private tracking",
        "Balance visibility with substance",
      ],
      growthPath: {
        immediateShifts: [
          "Give credit to someone else in every meeting.",
          "Pause before sharing an achievement and ask: Am I informing, or am I fishing for approval?",
          "Keep a private log of daily wins to build inner validation.",
        ],
        strategicPractices: [
          "Balance self-promotion with peer-promotion — spotlight others as often as yourself.",
          "Create visibility through measurable results, not reminders.",
          "Seek mentorship and feedback to grow substance behind recognition.",
        ],
        longTermGrowth: [
          "Reframe recognition as a byproduct of impact, not a goal.",
          "Anchor identity in contribution and mastery.",
          "Build a reputation as someone admired for results and influence, not just visibility.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Feel more motivated when work is acknowledged",
        "Share progress updates frequently to stay visible",
        "Struggle to stay engaged when recognition is absent",
        "Shape decisions to gain approval rather than follow priorities",
        "Hesitate to take on tasks that will not be noticed",
      ],
      rootCauses: [
        "Families or schools where praise was given only for achievement",
        "Workplaces that rewarded self-promotion more than quiet performance",
        "Early experiences where being overlooked felt discouraging or unsafe",
        "Cultures where recognition equaled belonging",
      ],
      beliefsThatDriveResistance: [
        "“If no one sees it, it does not count.”",
        "“My value depends on others noticing my effort.”",
        "“Recognition is proof I am doing well.”",
        "“It is safer to be visible than overlooked.”",
      ],
      stressBehaviors: [
        "Overemphasize visibility rather than results",
        "Push too hard for credit or acknowledgment",
        "Withdraw or slow down when recognition is missing",
        "Compare themselves to peers who receive more visibility",
      ],
      situationalAdaptations: [
        "Leaders highlight both visible and invisible contributions",
        "Progress is measured with internal goals, not just external feedback",
        "Teams reward collaboration instead of individual competition",
        "Self-reflection practices increase intrinsic motivation",
      ],
      strengthsHiddenInside: [
        "Strong ability to showcase achievements",
        "Motivation that drives consistent effort when visible",
        "High engagement in group settings where recognition is present",
        "Skill at drawing attention to progress and results",
      ],
      detailedResistanceCosts: [
        "Create inconsistent progress depending on visibility",
        "Limit willingness to take on low-profile but important work",
        "Increase stress when acknowledgment is delayed",
        "Reduce authenticity by shaping actions for approval rather than growth",
      ],
      highResistanceDescription:
        "At this level, the need for recognition is a strong influence on your performance. You may push to highlight your contributions, hesitate when visibility feels low, or feel less motivated when acknowledgment is missing. While your drive to be noticed ensures others see your value, it can also make your progress inconsistent and overly dependent on external validation.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Team relationships strained by competitive visibility-seeking",
            "Important behind-the-scenes work neglected for high-profile projects",
          ],
          growthPath: [
            "Practice sharing credit and highlighting team contributions",
            "Take on one low-visibility but critical project each quarter",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Credibility questioned when style overshadows substance",
            "Career advancement limited by perception of being self-serving",
          ],
          growthPath: [
            "Focus recognition requests on impact and results rather than effort",
            "Develop internal metrics for success independent of external validation",
          ],
        },
        smb: {
          resistanceCosts: [
            "Team morale affected by unequal recognition distribution",
            "Business goals secondary to individual recognition needs",
          ],
          growthPath: [
            "Create team recognition systems that highlight collective achievements",
            "Practice celebrating others' successes as enthusiastically as your own",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Client relationships affected by focus on self-promotion over service",
              "Partnership opportunities limited by concerns about credit-sharing",
            ],
            growthPath: [
              "Reframe client success as the ultimate recognition",
              "Practice highlighting partner contributions in all communications",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team retention issues from lack of shared recognition",
              "Customer satisfaction affected by founder-centric rather than customer-centric approach",
            ],
            growthPath: [
              "Create formal recognition programs for team contributions",
              "Measure success by customer outcomes rather than personal visibility",
            ],
          },
          growing: {
            resistanceCosts: [
              "Leadership team development limited by founder visibility needs",
              "Investor concerns about sustainable leadership and succession planning",
            ],
            growthPath: [
              "Develop and showcase emerging leaders within the organization",
              "Create company-wide recognition systems that highlight team achievements",
            ],
          },
        },
      },
    },
    {
      id: "over-controller",
      name: "Over-Controller",
      description: "Struggles to delegate and trust others with outcomes",
      traits: [
        "Control-oriented",
        "Delegation-resistant",
        "Oversight-heavy",
        "Outcome-focused",
      ],
      detailedDescription:
        "Being an Over-Controller does not mean you are not capable of trusting others. It means you often resist progress because letting go feels risky. You may feel responsible for outcomes and prefer to stay involved in every detail. This drive to control protects against mistakes, but it also slows momentum, discourages collaboration, and creates stress when others do not work your way.",
      strengthsInsights: [
        "Strong ownership of outcomes",
        "High standards that protect against mistakes",
        "Reliability in high-stakes situations",
        "Ability to step up when others hesitate",
      ],
      resistanceCosts: [
        "Create bottlenecks by slowing progress through micromanagement",
        "Discourage peers by not trusting their contributions",
        "Increase stress from carrying more responsibility than necessary",
        "Limit leadership growth by preventing team independence",
      ],
      developmentAreas: [
        "Improve delegation",
        "Build team trust",
        "Develop shared responsibility",
      ],
      growthPath: {
        immediateShifts: [
          "Delegate one task fully without checking in.",
          "Pause before stepping in and ask: Do they need help, or do I need control?",
          'Replace directions with empowering questions: "What approach would you take?"',
        ],
        strategicPractices: [
          "Track when control slowed progress or discouraged others.",
          "Use feedback loops (peers, reports) to learn how your control is perceived.",
          'Practice small "letting go" experiments to test trust in others\' capability.',
        ],
        longTermGrowth: [
          "Reframe control as influence, not oversight.",
          "Anchor identity in enabling others, not directing them.",
          "Build credibility as a leader who multiplies trust, not one who bottlenecks results.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Struggle to delegate tasks fully",
        "Recheck or redo others’ work to ensure standards",
        "Step in quickly when they sense mistakes",
        "Prefer to lead decision-making in groups",
        "Feel uneasy when they are not in charge",
      ],
      rootCauses: [
        "Families or schools where responsibility was assigned early and strictly",
        "Workplaces that punished leaders for errors made by the team",
        "Early experiences where lack of control led to negative outcomes",
        "Cultures that equated control with competence",
      ],
      beliefsThatDriveResistance: [
        "“If I do not control it, it will go wrong.”",
        "“Others will not meet the standard.”",
        "“Delegation is risky.”",
        "“My responsibility is to ensure everything is right.”",
      ],
      stressBehaviors: [
        "Micromanage tasks that could be delegated",
        "Push others aside to maintain control",
        "Increase tension in teams by questioning work",
        "Delay progress by taking on too much personally",
      ],
      situationalAdaptations: [
        "Teams are trained and trusted to handle tasks independently",
        "Delegation is reframed as building strength in others",
        "Leaders model shared accountability rather than solo control",
        "Feedback loops prove others can deliver reliably",
      ],
      strengthsHiddenInside: [
        "Strong ownership of outcomes",
        "High standards that protect against mistakes",
        "Reliability in high-stakes situations",
        "Ability to step up when others hesitate",
      ],
      detailedResistanceCosts: [
        "Create bottlenecks by slowing progress through micromanagement",
        "Discourage peers by not trusting their contributions",
        "Increase stress from carrying more responsibility than necessary",
        "Limit leadership growth by preventing team independence",
      ],
      highResistanceDescription:
        "At this level, control is a powerful influence on your performance. You often take on more responsibility than needed, struggle to delegate, and recheck others’ work. While this ensures quality and alignment with your standards, it also creates bottlenecks and limits the growth of those around you.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Team development limited by lack of autonomy and trust",
            "Scalability issues as responsibilities cannot be effectively distributed",
          ],
          growthPath: [
            "Practice delegating complete ownership of smaller projects",
            "Implement regular feedback systems that build confidence in team capabilities",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Leadership pipeline limited by lack of development opportunities",
            "Innovation constrained by centralized decision-making",
          ],
          growthPath: [
            "Create formal mentoring relationships with emerging leaders",
            "Establish clear decision authority levels for different types of choices",
          ],
        },
        smb: {
          resistanceCosts: [
            "Business growth bottlenecked by centralized control",
            "Team retention issues from lack of autonomy and development",
          ],
          growthPath: [
            "Define clear areas where team members have full authority",
            "Practice stepping back and allowing mistakes as learning opportunities",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Partnership opportunities limited by control requirements",
              "Service delivery constrained by inability to scale personal involvement",
            ],
            growthPath: [
              "Develop clear standards and then trust others to meet them",
              "Practice collaborative client engagement rather than directive approaches",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team scaling limited by founder involvement requirements",
              "Customer satisfaction affected by slow response times due to approval bottlenecks",
            ],
            growthPath: [
              "Create clear protocols that allow team autonomy within boundaries",
              "Implement customer service systems that don't require founder approval",
            ],
          },
          growing: {
            resistanceCosts: [
              "Senior talent retention limited by lack of real authority",
              "Investor concerns about founder dependency and business continuity",
            ],
            growthPath: [
              "Develop senior leadership team with real decision-making authority",
              "Create board-level governance that doesn't require founder oversight",
            ],
          },
        },
      },
    },
    {
      id: "comfort-zoner",
      name: "Comfort Zoner",
      description: "Prefers familiar routines over new challenges",
      traits: [
        "Routine-oriented",
        "Change-resistant",
        "Stability-seeking",
        "Predictable",
      ],
      detailedDescription:
        "Being a Comfort Zoner does not mean you lack ambition. It means you prefer safety and familiarity because they give you a sense of control and stability. This steadiness is valuable, but when comfort dominates it becomes resistance. Progress slows, risks feel threatening, and opportunities slip by while you choose what is familiar. What protects you from uncertainty also limits your ability to grow and adapt.",
      strengthsInsights: [
        "Dependable and consistent in their work",
        "Provide stability in uncertain times",
        "Skilled at maintaining reliable processes",
        "Help teams stay grounded when others rush ahead",
      ],
      resistanceCosts: [
        "Limit personal growth and career advancement",
        "Reduce adaptability in fast-changing environments",
        "Create missed opportunities for innovation",
        "Signal hesitation to leaders who value agility",
      ],
      developmentAreas: [
        "Improve change adaptation",
        "Develop risk comfort",
        "Build growth mindset",
      ],
      growthPath: {
        immediateShifts: [
          "Say yes to one uncomfortable opportunity this week.",
          'Replace "I\'m not ready" with "I\'ll try and learn as I go."',
          "Stretch your daily routine slightly — a new task, a new conversation, a new role.",
        ],
        strategicPractices: [
          "Track when comfort slowed your career progress.",
          "Create stretch goals: one new skill, one new responsibility, one new network.",
          "Partner with peers who push you outside your safe zone.",
        ],
        longTermGrowth: [
          "Reframe discomfort as evidence of growth.",
          "Anchor identity in adaptability and resilience.",
          "Build a reputation as someone who leans into challenge and inspires others to do the same.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Stick with routines and proven methods",
        "Resist changes in process or technology",
        "Choose stability over experimentation",
        "Avoid challenges that feel uncertain",
        "Delay pursuing opportunities outside their comfort zone",
      ],
      rootCauses: [
        "Families or schools that emphasized tradition over change",
        "Workplaces that discouraged risk-taking or punished mistakes",
        "Early experiences where change created stress or failure",
        "Cultures that valued predictability and reliability above all",
      ],
      beliefsThatDriveResistance: [
        "“It is safer to stay where I am.”",
        "“Change creates risk I cannot control.”",
        "“Familiar routines protect me.”",
        "“Uncertainty is dangerous.”",
      ],
      stressBehaviors: [
        "Retreat into old routines rather than adapt",
        "Avoid new opportunities or responsibilities",
        "Resist changes suggested by peers or leaders",
        "Focus on familiar, low-stakes tasks",
      ],
      situationalAdaptations: [
        "Change is introduced gradually and with clear support",
        "Leaders frame uncertainty as opportunity instead of threat",
        "Peers demonstrate success in trying new approaches",
        "Structures are put in place to reduce risk during transitions",
      ],
      strengthsHiddenInside: [
        "Dependable and consistent in their work",
        "Provide stability in uncertain times",
        "Skilled at maintaining reliable processes",
        "Help teams stay grounded when others rush ahead",
      ],
      detailedResistanceCosts: [
        "Limit personal growth and career advancement",
        "Reduce adaptability in fast-changing environments",
        "Create missed opportunities for innovation",
        "Signal hesitation to leaders who value agility",
      ],
      highResistanceDescription:
        "At this level, the desire for safety is a strong influence on your performance. You may hesitate to pursue new methods, delay trying unfamiliar approaches, or avoid opportunities that feel risky. While your steadiness creates reliability, it can also limit adaptability and make change feel threatening.",
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "Career advancement limited by perception of resistance to change",
            "Innovation initiatives constrained by preference for familiar approaches",
          ],
          growthPath: [
            "Volunteer for small change initiatives to build comfort with adaptation",
            "Practice framing change as evolution rather than disruption",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Professional development limited by reluctance to try new approaches",
            "Influence reduced in fast-growing organization that values agility",
          ],
          growthPath: [
            "Set personal learning goals that gradually expand comfort zone",
            "Partner with change-oriented colleagues on collaborative projects",
          ],
        },
        smb: {
          resistanceCosts: [
            "Business growth limited by reluctance to adopt new technologies or processes",
            "Competitive disadvantage from slow adaptation to market changes",
          ],
          growthPath: [
            "Practice implementing small process improvements regularly",
            "Focus on how new approaches support existing strengths",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Business growth limited by reluctance to explore new markets or methods",
              "Client relationships affected by resistance to evolving service offerings",
            ],
            growthPath: [
              "Start with small experiments in familiar areas",
              "Focus on how innovation can improve existing client outcomes",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team development constrained by resistance to new roles and responsibilities",
              "Product development limited by preference for familiar features and approaches",
            ],
            growthPath: [
              "Create gradual skill development programs for team growth",
              "Implement customer feedback systems that guide incremental innovation",
            ],
          },
          growing: {
            resistanceCosts: [
              "Scaling opportunities missed due to operational inflexibility",
              "Investor confidence limited by concerns about market responsiveness",
            ],
            growthPath: [
              "Develop change management systems that preserve core stability",
              "Create innovation frameworks that build on existing operational strengths",
            ],
          },
        },
      },
    },
    // Special profiles for no dominant archetype
    {
      id: "low-resistance",
      name: "All Archetypes Low (0–34%)",
      description:
        "Having low resistance across all resistance patterns does not mean you lack patterns. It means you are generally able to move forward without getting stuck in perfectionism, avoidance, control, or other delays. Your resistance levels are low enough that they do not significantly interfere with daily progress.",
      traits: ["Balanced", "Adaptive", "Momentum-focused"],
      detailedDescription:
        "Having low resistance across all resistance patterns does not mean you lack patterns. It means you are generally able to move forward without getting stuck in perfectionism, avoidance, control, or other delays. Your resistance levels are low enough that they do not significantly interfere with daily progress.",
      strengthsInsights: [
        "Manage tasks with balance and flow",
        "Resistance shows up occasionally, but rarely dominates",
        "Growth is less about removing resistance and more about amplifying your natural momentum",
      ],
      resistanceCosts: [
        "May underestimate subtle resistance under stress",
        "Could overlook small frictions that build up",
      ],
      developmentAreas: [
        "Sustain balance",
        "Reflect on stress patterns",
        "Prevent future blind spots",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Focus on sustaining balance through healthy routines",
          "Reflect on small areas where resistance might appear under stress",
          "Use this awareness to prevent future blind spots",
        ],
      },
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "May miss optimization opportunities during high-stress periods",
            "Could overlook subtle resistance patterns in complex environments",
          ],
          growthPath: [
            "Maintain effectiveness while monitoring for emerging patterns",
            "Use balanced approach to help others optimize their resistance patterns",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Performance variations may limit advancement opportunities",
            "Situational resistance patterns could affect team coordination",
          ],
          growthPath: [
            "Identify specific contexts that trigger resistance patterns",
            "Develop targeted strategies for high-resistance situations",
          ],
        },
        smb: {
          resistanceCosts: [
            "Business efficiency may be affected during resistance periods",
            "Growth opportunities could be limited by inconsistent patterns",
          ],
          growthPath: [
            "Create systems that support consistent performance",
            "Focus on high-impact resistance patterns that affect business outcomes",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Client satisfaction may vary during resistance periods",
              "Business development affected by inconsistent networking patterns",
            ],
            growthPath: [
              "Monitor client feedback for resistance-related service patterns",
              "Develop consistent business practices independent of resistance variations",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team development may be affected during resistance periods",
              "Customer experience could vary based on resistance patterns",
            ],
            growthPath: [
              "Create team support systems for resistance periods",
              "Develop customer service protocols that maintain quality during resistance variations",
            ],
          },
          growing: {
            resistanceCosts: [
              "Scaling may be affected by unpredictable resistance patterns",
              "Investor confidence could be impacted by performance variability",
            ],
            growthPath: [
              "Develop leadership systems that maintain effectiveness during resistance periods",
              "Create organizational processes that operate independently of individual resistance patterns",
            ],
          },
        },
      },
    },
    {
      id: "moderate-resistance",
      name: "All Archetypes Moderate (35–54%)",
      description:
        "Moderate resistance across all archetypes means no single pattern dominates, but delays still show up in subtle ways. This creates a sense of “average resistance” that may not feel like a major barrier day to day, yet it can gradually hold back bigger opportunities.",
      traits: ["Steady", "Inconsistent resistance", "Situational"],
      detailedDescription:
        "Moderate resistance across all archetypes means no single pattern dominates, but delays still show up in subtle ways. This creates a sense of “average resistance” that may not feel like a major barrier day to day, yet it can gradually hold back bigger opportunities.",
      strengthsInsights: [
        "Progress is steady, but not as fast as it could be",
        "Different archetypes may show up situationally depending on the task",
        "Resistance feels inconsistent, making it harder to pinpoint one clear cause",
      ],
      resistanceCosts: [
        "Gradual hold-back on opportunities",
        "Inconsistent patterns hard to address",
      ],
      developmentAreas: [
        "Track recurring themes",
        "Notice situational triggers",
        "Make small adjustments",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Pay attention to recurring themes when resistance appears",
          "Track when and where you hesitate, and notice which resistance pattern is most active",
          "Small adjustments across several areas will compound into bigger momentum",
        ],
      },
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "May miss optimization opportunities during high-stress periods",
            "Could overlook subtle resistance patterns in complex environments",
          ],
          growthPath: [
            "Maintain effectiveness while monitoring for emerging patterns",
            "Use balanced approach to help others optimize their resistance patterns",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Performance variations may limit advancement opportunities",
            "Situational resistance patterns could affect team coordination",
          ],
          growthPath: [
            "Identify specific contexts that trigger resistance patterns",
            "Develop targeted strategies for high-resistance situations",
          ],
        },
        smb: {
          resistanceCosts: [
            "Business efficiency may be affected during resistance periods",
            "Growth opportunities could be limited by inconsistent patterns",
          ],
          growthPath: [
            "Create systems that support consistent performance",
            "Focus on high-impact resistance patterns that affect business outcomes",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Client satisfaction may vary during resistance periods",
              "Business development affected by inconsistent networking patterns",
            ],
            growthPath: [
              "Monitor client feedback for resistance-related service patterns",
              "Develop consistent business practices independent of resistance variations",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team development may be affected during resistance periods",
              "Customer experience could vary based on resistance patterns",
            ],
            growthPath: [
              "Create team support systems for resistance periods",
              "Develop customer service protocols that maintain quality during resistance variations",
            ],
          },
          growing: {
            resistanceCosts: [
              "Scaling may be affected by unpredictable resistance patterns",
              "Investor confidence could be impacted by performance variability",
            ],
            growthPath: [
              "Develop leadership systems that maintain effectiveness during resistance periods",
              "Create organizational processes that operate independently of individual resistance patterns",
            ],
          },
        },
      },
    },
    {
      id: "mixed-resistance",
      name: "Mixed Resistance (a blend of Low, Moderate, and High)",
      description:
        "Mixed resistance means you have strengths in some areas while struggling in others. Certain archetypes hardly affect you, while others show up strongly and create bottlenecks. This creates an uneven experience where you may excel in one context but stall in another.",
      traits: ["Uneven", "Strength-focused", "Bottleneck-prone"],
      detailedDescription:
        "Mixed resistance means you have strengths in some areas while struggling in others. Certain archetypes hardly affect you, while others show up strongly and create bottlenecks. This creates an uneven experience where you may excel in one context but stall in another.",
      strengthsInsights: [
        "You may be highly effective in low-resistance areas, but inconsistently visible overall",
        "High-resistance archetypes can overshadow progress if not managed",
        "The blend provides an opportunity: by reducing resistance in your top archetype, overall momentum increases quickly",
      ],
      resistanceCosts: [
        "Uneven performance across contexts",
        "Bottlenecks from high areas",
      ],
      developmentAreas: [
        "Focus on highest archetype",
        "Leverage low areas",
        "Track bottleneck shifts",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Focus first on your highest-resistance archetype",
          "Apply targeted growth strategies to balance the areas where you get stuck",
          "Leverage your low-resistance archetypes as strengths to counterbalance",
          'Track progress by watching how your "bottleneck" archetype shifts over time.',
        ],
      },
      categoryContent: {
        corporate: {
          resistanceCosts: [
            "May miss optimization opportunities during high-stress periods",
            "Could overlook subtle resistance patterns in complex environments",
          ],
          growthPath: [
            "Maintain effectiveness while monitoring for emerging patterns",
            "Use balanced approach to help others optimize their resistance patterns",
          ],
        },
        midSize: {
          resistanceCosts: [
            "Performance variations may limit advancement opportunities",
            "Situational resistance patterns could affect team coordination",
          ],
          growthPath: [
            "Identify specific contexts that trigger resistance patterns",
            "Develop targeted strategies for high-resistance situations",
          ],
        },
        smb: {
          resistanceCosts: [
            "Business efficiency may be affected during resistance periods",
            "Growth opportunities could be limited by inconsistent patterns",
          ],
          growthPath: [
            "Create systems that support consistent performance",
            "Focus on high-impact resistance patterns that affect business outcomes",
          ],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: [
              "Client satisfaction may vary during resistance periods",
              "Business development affected by inconsistent networking patterns",
            ],
            growthPath: [
              "Monitor client feedback for resistance-related service patterns",
              "Develop consistent business practices independent of resistance variations",
            ],
          },
          micro: {
            resistanceCosts: [
              "Team development may be affected during resistance periods",
              "Customer experience could vary based on resistance patterns",
            ],
            growthPath: [
              "Create team support systems for resistance periods",
              "Develop customer service protocols that maintain quality during resistance variations",
            ],
          },
          growing: {
            resistanceCosts: [
              "Scaling may be affected by unpredictable resistance patterns",
              "Investor confidence could be impacted by performance variability",
            ],
            growthPath: [
              "Develop leadership systems that maintain effectiveness during resistance periods",
              "Create organizational processes that operate independently of individual resistance patterns",
            ],
          },
        },
      },
    },
  ],

  questions: {
    direct: [
      // Perfectionist Achiever Direct
      {
        id: "pa1",
        type: "direct",
        text: "I often recheck or redo my work to make sure it’s flawless.",
        archetype: "perfectionist-achiever",
      },
      {
        id: "pa2",
        type: "direct",
        text: "I feel uncomfortable sharing work unless I’ve refined it several times.",
        archetype: "perfectionist-achiever",
      },
      // Helper / Over-Giver Direct
      {
        id: "hog1",
        type: "direct",
        text: "I often take on extra responsibilities to support others, even when I’m busy.",
        archetype: "helper-over-giver",
      },
      {
        id: "hog2",
        type: "direct",
        text: "I struggle to say no when someone asks for help.",
        archetype: "helper-over-giver",
      },
      // Avoider Direct
      {
        id: "av1",
        type: "direct",
        text: "I delay starting tasks that feel uncomfortable or uncertain.",
        archetype: "avoider",
      },
      {
        id: "av2",
        type: "direct",
        text: "I sometimes wait until deadlines force me to act.",
        archetype: "avoider",
      },
      // Cautious Evaluator Direct
      {
        id: "ce1",
        type: "direct",
        text: "I often overthink decisions before moving forward.",
        archetype: "cautious-evaluator",
      },
      {
        id: "ce2",
        type: "direct",
        text: "I double-check my plan multiple times before starting.",
        archetype: "cautious-evaluator",
      },
      // Independent Doer Direct
      {
        id: "id1",
        type: "direct",
        text: "I prefer to work independently rather than rely on others.",
        archetype: "independent-doer",
      },
      {
        id: "id2",
        type: "direct",
        text: "I sometimes resist feedback because I like doing things my way.",
        archetype: "independent-doer",
      },
      {
        id: "id3",
        type: "direct",
        text: "I believe tasks get done better when I don’t have to rely on others.",
        archetype: "independent-doer",
      },
      // Recognition Seeker Direct
      {
        id: "rs1",
        type: "direct",
        text: "I feel more motivated when my efforts are noticed by others.",
        archetype: "recognition-seeker",
      },
      {
        id: "rs2",
        type: "direct",
        text: "I emphasize my role in projects so my contributions are visible.",
        archetype: "recognition-seeker",
      },
      {
        id: "rs3",
        type: "direct",
        text: "I feel less motivated to finish a task if no one will see the result.",
        archetype: "recognition-seeker",
      },
      // Over-Controller Direct
      {
        id: "oc1",
        type: "direct",
        text: "I often feel things go better when I’m in control.",
        archetype: "over-controller",
      },
      {
        id: "oc2",
        type: "direct",
        text: "I struggle to delegate because I want things done my way.",
        archetype: "over-controller",
      },
      {
        id: "oc3",
        type: "direct",
        text: "I find it hard to relax if someone else is handling a task I care about.",
        archetype: "over-controller",
      },
      // Comfort Zoner Direct
      {
        id: "cz1",
        type: "direct",
        text: "I prefer steady, predictable tasks over high-stakes challenges.",
        archetype: "comfort-zoner",
      },
      {
        id: "cz2",
        type: "direct",
        text: "I resist major changes in how I work.",
        archetype: "comfort-zoner",
      },
      {
        id: "cz3",
        type: "direct",
        text: "I often avoid new methods if the old way is working fine.",
        archetype: "comfort-zoner",
      },
    ],
    oblique: [
      // Perfectionist Achiever Oblique
      {
        id: "pa3",
        type: "oblique",
        text: "I hesitate to submit work because I feel it could always be improved.",
        archetype: "perfectionist-achiever",
        options: [], // Likert
      },
      {
        id: "pa4",
        type: "oblique",
        text: "When I finish a task, I tend to notice:",
        archetype: "perfectionist-achiever",
        options: [
          {
            value: "a",
            label: "What could still be improved",
            archetypeScore: 5,
          },
          { value: "b", label: "The mistakes I avoided", archetypeScore: 5 },
          { value: "c", label: "The parts that went well", archetypeScore: 1 },
        ],
      },
      {
        id: "pa5",
        type: "oblique",
        text: "After a success, my first thought is:",
        archetype: "perfectionist-achiever",
        options: [
          {
            value: "a",
            label: "Relief that I didn’t mess up",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Pride in doing everything right",
            archetypeScore: 5,
          },
          {
            value: "c",
            label: "Excitement for the next challenge",
            archetypeScore: 1,
          },
        ],
      },
      // Helper / Over-Giver Oblique
      {
        id: "hog3",
        type: "oblique",
        text: "When I see someone struggling, I usually:",
        archetype: "helper-over-giver",
        options: [
          {
            value: "a",
            label: "Step in to help immediately",
            archetypeScore: 5,
          },
          { value: "b", label: "Offer if they ask", archetypeScore: 3 },
          { value: "c", label: "Focus on my own tasks", archetypeScore: 1 },
        ],
      },
      {
        id: "hog4",
        type: "oblique",
        text: "In group projects, I tend to:",
        archetype: "helper-over-giver",
        options: [
          {
            value: "a",
            label: "Take care of the hardest tasks to ease the load",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Focus only on my assigned part",
            archetypeScore: 1,
          },
          { value: "c", label: "Delegate tasks clearly", archetypeScore: 3 },
        ],
      },
      {
        id: "hog5",
        type: "oblique",
        text: "When I’m behind on my own tasks and someone asks for help, I usually:",
        archetype: "helper-over-giver",
        options: [
          { value: "a", label: "Help them anyway", archetypeScore: 5 },
          { value: "b", label: "Say no and explain", archetypeScore: 1 },
          { value: "c", label: "Offer later when I’m free", archetypeScore: 3 },
        ],
      },
      // Avoider Oblique
      {
        id: "av3",
        type: "oblique",
        text: "I sometimes distract myself with busywork instead of tackling what really matters.",
        archetype: "avoider",
        options: [], // Likert
      },
      {
        id: "av4",
        type: "oblique",
        text: "When facing a new challenge, I usually think:",
        archetype: "avoider",
        options: [
          { value: "a", label: "What if I fail", archetypeScore: 5 },
          { value: "b", label: "How could this go wrong", archetypeScore: 5 },
          {
            value: "c",
            label: "What’s the first step forward",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "av5",
        type: "oblique",
        text: "When I have free time, I tend to:",
        archetype: "avoider",
        options: [
          {
            value: "a",
            label: "Distract myself with smaller, easier tasks",
            archetypeScore: 5,
          },
          { value: "b", label: "Tackle the big priorities", archetypeScore: 1 },
          { value: "c", label: "Plan, but never start", archetypeScore: 5 },
        ],
      },
      // Cautious Evaluator Oblique
      {
        id: "ce3",
        type: "oblique",
        text: "When I’m unsure of the best option, I tend to:",
        archetype: "cautious-evaluator",
        options: [
          {
            value: "a",
            label: "Delay until I have more information",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Act quickly and adjust later",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Ask someone else to decide",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "ce4",
        type: "oblique",
        text: "Before starting something new, I usually:",
        archetype: "cautious-evaluator",
        options: [
          { value: "a", label: "Research extensively", archetypeScore: 5 },
          {
            value: "b",
            label: "Try a small experiment first",
            archetypeScore: 3,
          },
          { value: "c", label: "Jump right in", archetypeScore: 1 },
        ],
      },
      {
        id: "ce5",
        type: "oblique",
        text: "When faced with two good options, I tend to:",
        archetype: "cautious-evaluator",
        options: [
          {
            value: "a",
            label: "Delay the choice until I’m certain",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Pick one quickly and adjust later",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Ask someone else to choose",
            archetypeScore: 3,
          },
        ],
      },
      // Independent Doer Oblique
      {
        id: "id4",
        type: "oblique",
        text: "In group settings, I usually:",
        archetype: "independent-doer",
        options: [
          { value: "a", label: "Take on tasks alone", archetypeScore: 5 },
          { value: "b", label: "Share tasks openly", archetypeScore: 1 },
          {
            value: "c",
            label: "Wait for clear instructions",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "id5",
        type: "oblique",
        text: "When receiving feedback, I often:",
        archetype: "independent-doer",
        options: [
          { value: "a", label: "Feel it slows me down", archetypeScore: 5 },
          {
            value: "b",
            label: "Consider it but still prefer my approach",
            archetypeScore: 5,
          },
          {
            value: "c",
            label: "Appreciate it and change course immediately",
            archetypeScore: 1,
          },
        ],
      },
      // Recognition Seeker Oblique
      {
        id: "rs4",
        type: "oblique",
        text: "In meetings, I tend to:",
        archetype: "recognition-seeker",
        options: [
          {
            value: "a",
            label: "Speak up to be seen as engaged",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Contribute only when necessary",
            archetypeScore: 3,
          },
          { value: "c", label: "Prefer listening quietly", archetypeScore: 1 },
        ],
      },
      {
        id: "rs5",
        type: "oblique",
        text: "After finishing a project, I usually:",
        archetype: "recognition-seeker",
        options: [
          {
            value: "a",
            label: "Make sure leadership knows my impact",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Move on without drawing attention",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Share credit with the team",
            archetypeScore: 3,
          },
        ],
      },
      // Over-Controller Oblique
      {
        id: "oc4",
        type: "oblique",
        text: "When collaborating, I tend to:",
        archetype: "over-controller",
        options: [
          {
            value: "a",
            label: "Re-check others’ work to be sure",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Trust them fully without oversight",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Step back even if it risks mistakes",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "oc5",
        type: "oblique",
        text: "In team projects, I usually:",
        archetype: "over-controller",
        options: [
          {
            value: "a",
            label: "Take charge of the outcome",
            archetypeScore: 5,
          },
          { value: "b", label: "Let others lead", archetypeScore: 1 },
          { value: "c", label: "Step aside completely", archetypeScore: 3 },
        ],
      },
      // Comfort Zoner Oblique
      {
        id: "cz4",
        type: "oblique",
        text: "When offered a stretch opportunity, I usually:",
        archetype: "comfort-zoner",
        options: [
          {
            value: "a",
            label: "Stick with familiar responsibilities",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Try it only if it feels very safe",
            archetypeScore: 5,
          },
          { value: "c", label: "Embrace it for growth", archetypeScore: 1 },
        ],
      },
      {
        id: "cz5",
        type: "oblique",
        text: "When facing uncertainty, I prefer to:",
        archetype: "comfort-zoner",
        options: [
          {
            value: "a",
            label: "Retreat to what I know best",
            archetypeScore: 5,
          },
          { value: "b", label: "Experiment to learn", archetypeScore: 1 },
          {
            value: "c",
            label: "Ask others to take the lead",
            archetypeScore: 3,
          },
        ],
      },
    ],
    scenario: [], // No separate scenarios; incorporated in oblique
    forcedChoice: [
      // Perfectionist Achiever Forced-Choice
      {
        id: "pa6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "pa6a",
            text: "“I refine my work until it’s perfect.” (Perfectionist)",
            archetype: "perfectionist-achiever",
          },
          {
            id: "pa6b",
            text: "“I wait until the last minute to begin.” (Avoider)",
            archetype: "avoider",
          },
          {
            id: "pa6c",
            text: "“I prefer to help others even if I’m behind.” (Helper)",
            archetype: "helper-over-giver",
          },
          {
            id: "pa6d",
            text: "“I like to keep my work steady and familiar.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
        ],
      },
      // Helper / Over-Giver Forced-Choice
      {
        id: "hog6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "hog6a",
            text: "“I sacrifice my priorities to support others.” (Helper)",
            archetype: "helper-over-giver",
          },
          {
            id: "hog6b",
            text: "“I push until my view is accepted.” (Over-Controller)",
            archetype: "over-controller",
          },
          {
            id: "hog6c",
            text: "“I avoid high-stakes tasks if I’m not ready.” (Avoider)",
            archetype: "avoider",
          },
          {
            id: "hog6d",
            text: "“I prefer safety and routine.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
        ],
      },
      // Avoider Forced-Choice
      {
        id: "av6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "av6a",
            text: "“I procrastinate on tasks that feel heavy.” (Avoider)",
            archetype: "avoider",
          },
          {
            id: "av6b",
            text: "“I double-check everything before moving forward.” (Cautious Evaluator)",
            archetype: "cautious-evaluator",
          },
          {
            id: "av6c",
            text: "“I prefer predictable, steady work.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
          {
            id: "av6d",
            text: "“I take charge when others hesitate.” (Over-Controller)",
            archetype: "over-controller",
          },
        ],
      },
      // Cautious Evaluator Forced-Choice
      {
        id: "ce6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "ce6a",
            text: "“I hesitate until I’m certain.” (Cautious Evaluator)",
            archetype: "cautious-evaluator",
          },
          {
            id: "ce6b",
            text: "“I refine my work until it’s flawless.” (Perfectionist)",
            archetype: "perfectionist-achiever",
          },
          {
            id: "ce6c",
            text: "“I prefer steady routines.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
          {
            id: "ce6d",
            text: "“I crave recognition for my efforts.” (Recognition Seeker)",
            archetype: "recognition-seeker",
          },
        ],
      },
      // Independent Doer Forced-Choice
      {
        id: "id6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "id6a",
            text: "“I prefer to handle things on my own.” (Independent Doer)",
            archetype: "independent-doer",
          },
          {
            id: "id6b",
            text: "“I wait until I feel fully ready before acting.” (Cautious Evaluator)",
            archetype: "cautious-evaluator",
          },
          {
            id: "id6c",
            text: "“I need others to see my contributions.” (Recognition Seeker)",
            archetype: "recognition-seeker",
          },
          {
            id: "id6d",
            text: "“I try to keep peace, even if I disagree.” (Helper)",
            archetype: "helper-over-giver",
          },
        ],
      },
      // Recognition Seeker Forced-Choice
      {
        id: "rs6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "rs6a",
            text: "“I need recognition to feel successful.” (Recognition Seeker)",
            archetype: "recognition-seeker",
          },
          {
            id: "rs6b",
            text: "“I prefer safety and routine.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
          {
            id: "rs6c",
            text: "“I procrastinate on tasks that feel heavy.” (Avoider)",
            archetype: "avoider",
          },
          {
            id: "rs6d",
            text: "“I want control over how things get done.” (Over-Controller)",
            archetype: "over-controller",
          },
        ],
      },
      // Over-Controller Forced-Choice
      {
        id: "oc6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "oc6a",
            text: "“I prefer to keep control.” (Over-Controller)",
            archetype: "over-controller",
          },
          {
            id: "oc6b",
            text: "“I procrastinate until the last moment.” (Avoider)",
            archetype: "avoider",
          },
          {
            id: "oc6c",
            text: "“I thrive in safe, familiar routines.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
          {
            id: "oc6d",
            text: "“I need others to see my achievements.” (Recognition Seeker)",
            archetype: "recognition-seeker",
          },
        ],
      },
      // Comfort Zoner Forced-Choice
      {
        id: "cz6",
        instructions: "Most like me / least like me:",
        statements: [
          {
            id: "cz6a",
            text: "“I prefer safety and routine.” (Comfort Zoner)",
            archetype: "comfort-zoner",
          },
          {
            id: "cz6b",
            text: "“I refine until perfect.” (Perfectionist)",
            archetype: "perfectionist-achiever",
          },
          {
            id: "cz6c",
            text: "“I avoid responsibility when unsure.” (Avoider)",
            archetype: "avoider",
          },
          {
            id: "cz6d",
            text: "“I need recognition to feel successful.” (Recognition Seeker)",
            archetype: "recognition-seeker",
          },
        ],
      },
    ],
    balancing: [
      {
        id: "b49",
        type: "balancing",
        text: "I start before I feel fully ready.",
        isReverseCoded: true,
      },
      {
        id: "b50",
        type: "balancing",
        text: "I welcome feedback as a chance to grow.",
        isReverseCoded: true,
      },
      {
        id: "b51",
        type: "balancing",
        text: "I apply for opportunities even if I don’t meet every requirement.",
        isReverseCoded: true,
      },
      {
        id: "b52",
        type: "balancing",
        text: "I share my accomplishments comfortably.",
        isReverseCoded: true,
      },
      {
        id: "b53",
        type: "balancing",
        text: "I say no when requests interfere with my goals.",
        isReverseCoded: true,
      },
      {
        id: "b54",
        type: "balancing",
        text: "I thrive when work feels unfamiliar or challenging.",
        isReverseCoded: true,
      },
      {
        id: "b55",
        type: "balancing",
        text: "I take action even if my work isn’t perfect.",
        isReverseCoded: true,
      },
      {
        id: "b56",
        type: "balancing",
        text: "I delegate tasks confidently and trust others’ work.",
        isReverseCoded: true,
      },
      {
        id: "b57",
        type: "balancing",
        text: "I stay focused on priorities, even when others need help.",
        isReverseCoded: true,
      },
      {
        id: "b58",
        type: "balancing",
        text: "I am comfortable making decisions that may not please everyone.",
        isReverseCoded: true,
      },
      {
        id: "b59",
        type: "balancing",
        text: "I embrace uncertainty as part of growth.",
        isReverseCoded: true,
      },
      {
        id: "b60",
        type: "balancing",
        text: "I focus on results, not just visibility.",
        isReverseCoded: true,
      },
    ],
  },

  scoring: {
    forcedChoiceMost: 2,
    forcedChoiceLeast: -1,
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
          "Having low resistance across all archetypes does not mean you lack patterns. It means you are generally able to move forward without getting stuck in perfectionism, avoidance, control, or other delays. Your resistance levels are low enough that they do not significantly interfere with daily progress.",
        whatItMeans: [
          "You manage tasks with balance and flow.",
          "Resistance shows up occasionally, but rarely dominates.",
          "Growth is less about removing resistance and more about amplifying your natural momentum.",
        ],
        growthPath: [
          "Focus on sustaining balance through healthy routines.",
          "Reflect on small areas where resistance might appear under stress.",
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
          'Moderate resistance across all archetypes means no single pattern dominates, but delays still show up in subtle ways. This creates a sense of "average resistance" that may not feel like a major barrier day to day, yet it can gradually hold back bigger opportunities.',
        whatItMeans: [
          "Progress is steady, but not as fast as it could be.",
          "Different archetypes may show up situationally depending on the task.",
          "Resistance feels inconsistent, making it harder to pinpoint one clear cause.",
        ],
        growthPath: [
          "Pay attention to recurring themes when resistance appears.",
          "Track when and where you hesitate, and notice which archetype is most active.",
          "Small adjustments across several areas will compound into bigger momentum.",
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
          "Mixed resistance means you have strengths in some areas while struggling in others. Certain archetypes hardly affect you, while others show up strongly and create bottlenecks. This creates an uneven experience where you may excel in one context but stall in another.",
        whatItMeans: [
          "You may be highly effective in low-resistance areas, but inconsistently visible overall.",
          "High-resistance archetypes can overshadow progress if not managed.",
          "The blend provides an opportunity: by reducing resistance in your top archetype, overall momentum increases quickly.",
        ],
        growthPath: [
          "Focus first on your highest-resistance archetype.",
          "Apply targeted growth strategies to balance the areas where you get stuck.",
          "Leverage your low-resistance archetypes as strengths to counterbalance.",
          'Track progress by watching how your "bottleneck" archetype shifts over time.',
        ],
      },
    },
  ],
};

// Export all assessment categories (currently only individual, but extensible)
export const ASSESSMENT_CATEGORIES: Record<string, AssessmentCategory> = {
  individual: INDIVIDUAL_PERFORMANCE_CATEGORY,
};

// Helper function to get assessment by ID
export function getAssessmentCategory(
  categoryId: string,
): AssessmentCategory | null {
  return ASSESSMENT_CATEGORIES[categoryId] || null;
}

// Helper function to get all question types for a category
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

  // Filter out special scenario archetypes (low-resistance, moderate-resistance, mixed-resistance)
  // These are used for results display but shouldn't be selectable in forms
  const actualArchetypes = category.archetypes.filter(
    (archetype) =>
      !["low-resistance", "moderate-resistance", "mixed-resistance"].includes(
        archetype.id,
      ),
  );

  return actualArchetypes;
}
