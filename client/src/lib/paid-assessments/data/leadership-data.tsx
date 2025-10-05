// Central Questions Data File for All Paid Assessment Categories
// This file contains all assessment categories with their questions, options, archetypes, and scoring logic

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
  whatOthersExperience?: {
    directReports?: string;
    executivePeers?: string;
    boardInvestors?: string;
  };
  organizationalTriggers?: {
    amplifiers?: string[];
    softeners?: string[];
  };
  strengthsHiddenInside?: string[];
  detailedResistanceCosts?: string[];
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
  type: "direct" | "oblique" | "scenario" | "forced-choice" | "balancing";
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

export interface SpecialScenario {
  id: string;
  title: string;
  condition: {
    type: 'all_low' | 'all_moderate' | 'all_high' | 'mixed_low_moderate' | 'mixed_moderate_high' | 'mixed_balanced_highs';
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
  specialScenarios?: SpecialScenario[];
}

// LIKERT Scale for all assessments
export const LIKERT_SCALE = {
  "strongly-disagree": 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  "strongly-agree": 5,
};

// Leadership Assessment Data
const LEADERSHIP_CATEGORY: AssessmentCategory = {
  id: "leadership",
  name: "Leadership Assessment",
  description:
    "Comprehensive leadership style and resistance pattern assessment based on 8 archetypes",

  archetypes: [
    {
      id: "strategic-architect",
      name: "Strategic Architect",
      description: "Focuses on long-term planning and structured frameworks",
      traits: [
        "Long-term thinking",
        "Structured approach",
        "Strategic planning",
        "Risk assessment",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach structure, planning, and delegation. At your best, you are a leader who brings order out of complexity. You design systems, frameworks, and strategies that provide clarity in uncertain environments. Teams look to you for direction, boards value your rigor, and stakeholders trust the discipline you bring to execution. \nBut when resistance is high, the very strength of structure narrows into rigidity. Instead of enabling agility, your need for certainty and control can create bottlenecks. You may double-check every detail, centralize too many decisions, or resist pivots until the plan feels watertight. In executive settings, this often looks like slowing bold initiatives until every risk is addressed, limiting empowerment by keeping ownership too close, or spending more time refining frameworks than enabling action. This pattern is called the Strategic Architect. It does not mean you lack adaptability or trust. It means your resistance shows up as an over-investment in control and precision, which feels safe in the moment but can undercut agility and strategic speed. Your resistance does not erase your strength as a builder of clarity. Instead, it narrows it. When you learn to balance structure with trust, your ability to architect strategy becomes transformative — frameworks that not only protect quality but also unlock scale, innovation, and momentum.",
      strengthsInsights: [
        "Brings order and clarity to complex initiatives",
        "Creates dependable frameworks that scale execution",
        "Sets standards that ensure quality and reduce risk",
        "Provides stakeholders with confidence in disciplined leadership",
      ],
      resistanceCosts: [
        "Create bottlenecks by requiring your review or decision on too many matters",
        "Delay strategic pivots, weakening competitiveness when markets shift",
        "Discourage innovation, as teams feel constrained to follow rigid frameworks",
        "Reduce organizational capacity by concentrating control at the top",
      ],
      developmentAreas: [
        "Consider developing more agility in fast-changing situations",
        "Practice making decisions with incomplete information",
        "Work on building stronger emotional connections with team members",
      ],
      growthPath: {
        immediateShifts: [
          "Delegate one decision fully this quarter without verification",
          "Approve a project with a “good enough” plan to test agility",
        ],
        strategicPractices: [
          "Build decision rights frameworks that push authority downward",
          "Introduce milestone-based governance where only exceptions require escalation",
          "Use “fast-track lanes” for initiatives that demand speed over rigor",
        ],
        longTermGrowth: [
          "Reframe structure as a liberator of scale, not a limiter of speed",
          "Track outcomes where decentralized ownership improved results",
          "Model how rigor and agility can coexist — protecting credibility while accelerating progress",
        ],
      },
      highResistanceCharacteristics: [
        "Delay execution while plans are refined",
        "Concentrate decision-making in your hands, slowing others",
        "Reduce innovation by over-controlling experimentation",
        "Create perceptions of micromanagement among peers and teams",
      ],
      coreBehaviorsUnderResistance: [
        "Personally verify or redo work before sign-off",
        "Hold back initiatives until risks are fully mapped",
        "Retain ownership of key decisions even when others are capable",
        "Focus leadership energy on systems and controls more than agility",
        "Treat deviations from plan as threats rather than opportunities",
      ],
      rootCauses: [
        "Leadership cultures where dissent was quietly penalized, reinforcing visible unity as the safer path",
        "Board-facing experiences where projecting alignment was rewarded, even when material risks were unresolved",
        "Career-defining promotions linked to consensus-building, teaching you that diplomacy is what gets rewarded",
        "Investor narratives that framed executive cohesion as credibility, unintentionally discouraging open challenge in leadership forums",
      ],
      beliefsThatDriveResistance: [
        "“If I don’t check, something will go wrong.”",
        "“Quality depends on my oversight.”",
        "“Rigorous plans earn trust; improvisation undermines it.”",
        "“Delegation without verification is risky.”",
        "“Control ensures credibility.”",
      ],
      whatOthersExperience: {
        directReports:
          "Appreciate your inclusive style and feel safe contributing, but may learn to play it safe themselves if they see you avoid pushing difficult issues. Over time, this can create cautious teams that hesitate to take bold risks or challenge assumptions.",
        executivePeers:
          "Value your empathy and diplomacy, but may bypass you in high-stakes debates if they perceive reluctance to take a firm stand. This can reduce your influence in enterprise-critical decisions.",
        boardInvestors:
          "Respect your ability to maintain visible unity but may grow concerned that critical risks are being under-addressed. In governance terms, an emphasis on consensus over candor can be interpreted as strategic blind spots or a lack of executive edge to drive transformation in volatile markets.",
      },
      organizationalTriggers: {
        amplifiers: [
          "High-stakes governance settings where accuracy is prioritized over speed",
          "Cultures of perfectionism where mistakes carry reputational damage",
          "Investor environments that prize predictability over agility",
        ],
        softeners: [
          "Structures that decentralize accountability, making verification unnecessary",
          "Governance models that encourage iterative progress over full certainty",
          "Cultures of trust where boldness is rewarded as much as rigor",
        ],
      },
      strengthsHiddenInside: [
        "Brings order and clarity to complex initiatives",
        "Creates dependable frameworks that scale execution",
        "Sets standards that ensure quality and reduce risk",
        "Provides stakeholders with confidence in disciplined leadership",
      ],
      detailedResistanceCosts: [
        "Create bottlenecks by requiring your review or decision on too many matters",
        "Delay strategic pivots, weakening competitiveness when markets shift",
        "Discourage innovation, as teams feel constrained to follow rigid frameworks",
        "Reduce organizational capacity by concentrating control at the top",
        "Erode peer confidence if colleagues see you as a blocker to agility",
        "Undermine succession readiness, as your team grows dependent on your oversight",
        "Damage credibility with investors or boards if over-caution causes missed opportunities",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Rely on your frameworks but may feel constrained if you hold too much control.\n• Partners/Advisors: Value your discipline but may see hesitation when quick moves are required.\n• Customers: Trust your thoroughness but may choose competitors if launches or improvements take too long.",
            resistanceCosts: [
              "Delay product launches and cause you to miss key market windows.",
              "Reduce flexibility if you resist adapting ideas or inputLower confidence from customers, partners, or backers if momentum stalls.",
              "Limit your ability to grow quickly when perfection overrides learning and testing.",
            ],
            growthPath: [
              "Pilot early versions of your ideas with customers, even if they are not polished.",
              "Invite trusted team members or advisors to own parts of the process.",
              "Reframe structure as a tool for scaling your venture, not just controlling it.",
              "Model how rigor and agility together can attract customers, partners, and backers while keeping your business moving forward.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate your structured thinking but may notice that planning sometimes takes the place of action.\n• Early Customers/Supporters: Value your thoroughness but may lose interest if delivery takes too long.\n• You (Self-Perception): Feel safer when everything is mapped out in detail, even if it delays momentum.",
            resistanceCosts: [
              "Keep you in “plan mode” instead of building or testing.",
              "Delay customer validation by holding onto ideas until they feel complete.",
              "Reduce credibility with early supporters if promises are slow to materialize.",
              "Limit learning opportunities because progress depends on perfect certainty.",
            ],
            growthPath: [
              "Launch a small test even if the plan is only partially complete.",
              "Replace one detailed review with a real-world customer interaction.",
              "Use advisors or mentors to pressure-test assumptions quickly, not just review plans.",
              "Reframe structure as a guide for starting, not a requirement for perfection.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Respect your clarity and structure but may feel slowed down if you insist on reviewing every detail yourself.\n• Clients: Value your reliability but may get frustrated if projects are delayed by too much checking.\n• Vendors/Contractors: Appreciate your thoroughness but may see rigidity when flexibility would keep things moving.",
            resistanceCosts: [
              "Create bottlenecks that keep the business dependent on you for every approval.",
              "Overwhelm your limited team by discouraging initiative.",
              "Delay client delivery when you prioritize perfect plans over fast action.",
              "Limit scalability if the business cannot operate without your direct control.",
            ],
            growthPath: [
              "Delegate routine approvals and empower employees to move work forward.",
              "Use lightweight systems to keep quality high without adding delay.",
              "Trust small experiments instead of waiting for certainty before acting.",
              "Reframe structure as a way to free your time for growth, not as a tool for control.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Respect your clarity and high standards but may feel slowed down if every step requires your approval.\n• Peers/Partners: Value your structure but may see you as rigid when flexibility is needed to respond to customer demands.\n• Clients: Appreciate your reliability but may become frustrated if extra checking causes delays in delivery.",
          resistanceCosts: [
            "Create bottlenecks that frustrate employees and reduce efficiency.",
            "Limit customer satisfaction if responsiveness suffers.",
            "Reduce trust from vendors or partners if you are seen as inflexible.",
            "Hold back business growth by keeping too much control at the top.",
          ],
          growthPath: [
            "Delegate routine approvals so projects keep moving.",
            "Balance structure with speed when addressing customer needs.",
            "Use simple systems that ensure quality without requiring your direct involvement.",
            "Track positive results when employees take ownership and deliver independently.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: appreciate the clear frameworks you provide but may feel constrained if decision-making remains too centralized.\n• Leadership Team/Department Heads: value your structure but may view you as resistant when fast cross-functional decisions are needed.\nr�� Customers/Stakeholders: trust your dependability but may lose patience if responsiveness is slowed by layers of control.",
          resistanceCosts: [
            "Create bottlenecks that frustrate managers who need more autonomy.",
            "Slow the company’s ability to respond to competitive pressures or market changes.",
            "Limit growth if innovation is delayed until plans feel fully risk-proof.",
            "Undermine confidence in leadership if you are seen as too focused on process over speed.",
          ],
          growthPath: [
            "Push decision-making down to department or location leads.",
            "Use lightweight systems that balance quality with responsiveness.",
            "Encourage department heads to own outcomes rather than routing everything through you.",
            "Reframe structure as a way to empower mid-level leaders, not control them.",
          ],
        },
      },
    },
    {
      id: "empowering-delegator",
      name: "Empowering Delegator",
      description: "Empowers others and trusts team members to lead",
      traits: [
        "Trust in others",
        "Delegation skills",
        "Team empowerment",
        "Autonomy support",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach delegation, ownership, and accountability. At your best, you are the kind of leader who builds trust by giving people room to lead. You empower others to step up, create opportunities for development, and often unlock hidden capacity in the organization. Stakeholders value your ability to show confidence in your team and grow leaders under you. But when resistance is high, empowerment can turn into disengagement. Instead of balancing autonomy with accountability, you may step back too far, avoid intervening when course correction is needed, or leave expectations under-clarified to avoid seeming controlling. In executive contexts, this often looks like giving broad ownership without clear success criteria, under-communicating performance expectations, or hesitating to act when projects veer off track. This pattern is called the Empowering Delegator. It does not mean you lack authority or control. It means your resistance shows up as reluctance to enforce accountability, which can undermine outcomes and create uneven execution. What feels like trust in the moment can become costly if oversight is absent when stakes are high. Your resistance does not erase your strength as a trust-builder. Instead, it narrows it. When you balance empowerment with disciplined accountability, your leadership multiplies: you grow leaders while also delivering enterprise results consistently.",
      strengthsInsights: [
        "Builds loyalty and trust across the organization",
        "Creates psychological safety by demonstrating confidence in others",
        "Develops future leaders by giving them meaningful ownership",
        "Encourages innovation by reducing fear of over-control",
      ],
      resistanceCosts: [
        "Create execution risk when accountability structures are unclear, causing missed market commitments",
        "Erode stakeholder confidence if the enterprise appears leaderless during critical initiatives",
        "Normalize uneven standards across units, producing variability that complicates enterprise performance",
        'Reduce strategic influence if peers and boards see you as a "philosopher of trust" rather than an enforcer of enterprise outcomes',
      ],
      developmentAreas: [
        "Develop stronger accountability systems while maintaining trust",
        "Practice stepping in when delegation isn't working effectively",
        "Build skills in providing more directive leadership when needed",
      ],
      growthPath: {
        immediateShifts: [
          "Step into one ongoing project with clearer checkpoints and success metrics",
          "Frame oversight as support and partnership, not control",
        ],
        strategicPractices: [
          'Create "trust + verify" systems: autonomy paired with non-intrusive accountability',
          "Regularly clarify expectations in high-stakes initiatives without diminishing ownership",
          "Partner with peers who balance empowerment with stronger performance enforcement",
        ],
        longTermGrowth: [
          "Reframe empowerment as trust plus accountability, not one without the other",
          "Track where earlier intervention strengthened outcomes and improved trust",
          "Model for the organization how empowerment and performance discipline coexist at the highest levels",
        ],
      },
      highResistanceCharacteristics: [
        "Leave accountability gaps when clarity is missing",
        "Allow projects to drift without correction",
        "Reduce your visibility as an engaged leader in high-stakes settings",
        "Create uneven performance across teams and functions",
      ],
      coreBehaviorsUnderResistance: [
        "Hand off ownership but provide little follow-up",
        "Avoid direct intervention even when outcomes are at risk",
        "Delay addressing performance concerns to avoid discouraging initiative",
        "Position non-involvement as “trust” when oversight is needed",
      ],
      rootCauses: [
        "Cultural narratives that stigmatized micromanagement without equally emphasizing accountability",
        "Early wins in hands-off leadership contexts that reinforced stepping back as success",
        "CEO/board rhetoric positioning autonomy as a hallmark of modern leadership, without reinforcing disciplined oversight",
        "Governance gaps where decision rights and escalation thresholds were unclear, normalizing hands-off behavior",
      ],
      beliefsThatDriveResistance: [
        "If I step in, I’ll undermine trust",
        "People grow best when I let them figure it out",
        "True empowerment means minimal oversight",
        "Intervening will make me look like a micromanager",
        "Ownership is more important than my active involvement",
      ],
      whatOthersExperience: {
        directReports:
          "Value the freedom you provide but may confuse autonomy with lack of standards, leading to uneven results",
        executivePeers:
          "Appreciate your trust-based style but may bypass your input in urgent programs, perceiving you as too detached to enforce outcomes",
        boardInvestors:
          "Respect your philosophy of empowerment but can see accountability gaps as execution and governance risk. When critical initiatives slip, “trust” may be interpreted as abdication of oversight",
      },
      organizationalTriggers: {
        amplifiers: [
          "Cultures that overvalue autonomy without accountability systems",
          "Teams with uneven maturity where capability varies widely",
          "Board environments where over-control is stigmatized, creating pressure to over-empower",
        ],
        softeners: [
          "Delegation frameworks that pair autonomy with structured milestones",
          "Governance systems where results are reviewed transparently without stigma",
          "Peer norms that value candor in surfacing performance issues",
        ],
      },
      strengthsHiddenInside: [
        "Builds loyalty and trust across the organization",
        "Creates psychological safety by demonstrating confidence in others",
        "Develops future leaders by giving them meaningful ownership",
        "Encourages innovation by reducing fear of over-control",
      ],
      detailedResistanceCosts: [
        "Create execution risk when accountability structures are unclear, causing missed market commitments",
        "Erode stakeholder confidence if the enterprise appears leaderless during critical initiatives",
        "Normalize uneven standards across units, producing variability that complicates enterprise performance",
        "Reduce strategic influence if peers and boards see you as a “philosopher of trust” rather than an enforcer of enterprise outcomes",
        "Increase organizational debt (rework, reputational repair, talent churn) when under-managed initiatives collapse late in the cycle",
        "Compromise succession credibility, as future leaders grow in autonomy but not in accountability, weakening readiness for enterprise leadership",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Feel trusted and given room to lead, but may also feel uncertain if expectations are not clearly defined.\n• Partners/Advisors: Value your willingness to hand over responsibility but may worry if oversight disappears entirely.\n• Customers/Backers: Appreciate your confidence in the team but may question consistency if accountability is uneven.",
            resistanceCosts: [
              "Create gaps in execution when ownership is handed off without enough clarity.",
              "Allow projects to drift if problems are not addressed directly.",
              "Reduce your visible leadership presence, especially in high-stakes moments.",
              "Limit customer or backer confidence if empowerment feels like disengagement.",
            ],
            growthPath: [
              "Set clear checkpoints and success measures when handing off ownership.",
              "Frame oversight as support rather than control.",
              "Step in earlier when projects show signs of going off track.",
              "Reframe empowerment as trust plus accountability, showing others that delegation strengthens both people and results.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate your willingness to listen and trust others but may notice you struggle to take decisive action when guidance doesn’t lead to clarity.\n• Early Customers/Supporters: Value your collaborative approach but may lose confidence if you seem hesitant to lead when leadership is needed.\n• You (Self-Perception): Feel most comfortable when others can own their work, but may struggle when you need to be more directive or accountable.",
            resistanceCosts: [
              "Avoid making tough decisions by hoping others will step up.",
              "Create confusion when expectations and accountability are unclear.",
              "Lose momentum when collaboration becomes indecision.",
              "Risk losing credibility if supporters see too much hesitation to lead.",
            ],
            growthPath: [
              "Set clear deadlines and expectations when asking for input or help.",
              "Practice making firm decisions after gathering input, rather than endless consultation.",
              "Balance trust in others with taking responsibility for final outcomes.",
              "Reframe leadership as sometimes needing to be directive to support others' success.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel trusted with responsibility but may also feel uncertain if expectations are not clearly defined.\n• Clients: Appreciate that you give your team authority, but may lose confidence if service delivery feels inconsistent.\n• Vendors/Partners: Value your willingness to let others lead but may worry about accountability if details slip through the cracks.",
            resistanceCosts: [
              "Create uneven performance across employees if accountability is unclear.",
              "Allow projects to drift off course without timely correction.",
              "Reduce your visibility with clients if they sense you are too hands-off.",
              "Limit growth if empowerment is perceived as disengagement.",
            ],
            growthPath: [
              "Pair delegation with specific milestones and success measures.",
              "Step in earlier when issues surface instead of hoping they self-correct.",
              "Frame follow-up as partnership, not control, so employees see oversight as support.",
              "Reframe empowerment as trust with accountability, showing clients and vendors that your team delivers reliably without losing independence.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel trusted with responsibility but may also feel uncertain if expectations are not clearly defined.\n• Clients: Appreciate that you give your team authority, but may lose confidence if service delivery feels inconsistent.\n• Vendors/Partners: Value your willingness to let others lead but may worry about accountability if details slip through the cracks.",
          resistanceCosts: [
            "Create uneven performance across employees if accountability is unclear.",
            "Allow projects to drift off course without timely correction.",
            "Reduce your visibility with clients if they sense you are too hands-off.",
            "Limit growth if empowerment is perceived as disengagement.",
          ],
          growthPath: [
            "Pair delegation with specific milestones and success measures.",
            "Step in earlier when issues surface instead of hoping they self-correct.",
            "Frame follow-up as partnership, not control, so employees see oversight as support.",
            "Reframe empowerment as trust with accountability, showing clients and vendors that your team delivers reliably without losing independence.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel trusted with ownership but may also feel unclear on expectations if oversight is too light.\n• Leadership Team/Managers: Value your willingness to empower but may grow frustrated if accountability is inconsistent.\n• Customers/Stakeholders: Appreciate your confidence in the team but may lose trust if delivery feels uneven across departments.",
          resistanceCosts: [
            "Create execution gaps when responsibilities are handed off without clear follow-up.",
            "Reduce consistency across departments if standards are not reinforced.",
            "Undermine your visibility as a leader if you appear disengaged in critical matters.",
            "Limit growth if empowerment drifts into lack of accountability.",
          ],
          growthPath: [
            "Pair delegation with clear milestones and measurable outcomes.",
            "Step in earlier when performance or quality issues surface.",
            "Frame oversight as partnership, showing teams that accountability strengthens their success.",
            "Reframe empowerment as trust with follow-through, ensuring clients and stakeholders see dependable results.",
          ],
        },
      },
    },
    {
      id: "vision-driven-innovator",
      name: "Vision Driven Innovator",
      description: "Drives innovation and pushes for bold, disruptive strategies",
      traits: [
        "Innovation focus",
        "Vision clarity", 
        "Disruptive thinking",
        "Creative leadership"
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach innovation, change, and strategic risk-taking. At your best, you are a leader who sees beyond the current state and inspires others to pursue bold possibilities. You challenge conventional thinking, drive breakthrough initiatives, and help organizations stay ahead of market shifts. Teams and stakeholders value your ability to envision transformative futures and mobilize resources toward ambitious goals. But when resistance is high, the drive for innovation can become reckless or overwhelming. Instead of balancing vision with execution, you may push for change without sufficient consideration of operational realities, dismiss practical concerns as limiting beliefs, or exhaust teams with constant pivots and new directions. In executive settings, this often looks like advocating for disruptive strategies without adequate risk assessment, overwhelming stakeholders with too many new initiatives, or frustrating operational leaders who need stability to deliver results. This pattern is called the Vision Driven Innovator. It does not mean you lack practical sense or restraint. It means your resistance shows up as an impatience with incremental progress and a tendency to prioritize breakthrough thinking over sustainable execution. Your resistance does not erase your strength as a visionary. Instead, it narrows it. When you learn to balance innovation with implementation discipline, your leadership becomes transformative — creating bold strategies that not only inspire but also deliver measurable results.",
      strengthsInsights: [
        "Anticipates market shifts and positions organization ahead of competitors", 
        "Inspires teams with compelling visions of future possibilities",
        "Challenges conventional thinking and drives breakthrough solutions",
        "Creates culture of innovation and continuous improvement"
      ],
      resistanceCosts: [
        "Overwhelm teams with too many new initiatives, reducing focus and execution quality",
        "Exhaust stakeholders who need operational stability to deliver current commitments", 
        "Create perception of being impractical or disconnected from operational realities",
        "Dilute impact by spreading innovation efforts across too many directions simultaneously"
      ],
      developmentAreas: [
        "Balance vision with practical implementation planning",
        "Develop stronger operational discipline and execution focus", 
        "Practice prioritizing innovations based on strategic impact and feasibility"
      ],
      growthPath: {
        immediateShifts: [
          "Choose one major innovation initiative to focus on deeply rather than pursuing multiple directions",
          "Partner with operational leaders to ensure innovations have clear implementation pathways"
        ],
        strategicPractices: [
          "Create structured innovation portfolios that balance breakthrough bets with incremental improvements",
          "Establish clear criteria for evaluating and prioritizing new initiatives before launch",
          "Build bridges between visionary thinking and operational execution through cross-functional partnerships"
        ],
        longTermGrowth: [
          "Reframe innovation as disciplined experimentation rather than constant change",
          "Track how focused innovation efforts deliver better results than scattered initiatives", 
          "Model how visionary leadership and execution discipline can coexist and reinforce each other"
        ]
      },
      highResistanceCharacteristics: [
        "Initiate too many innovation projects simultaneously without adequate resources",
        "Dismiss operational concerns as limiting beliefs rather than valid constraints",
        "Exhaust teams with frequent strategic pivots and direction changes",
        "Prioritize breakthrough thinking over practical implementation planning"
      ],
      coreBehaviorsUnderResistance: [
        "Push for disruptive changes without sufficient consideration of implementation challenges",
        "Advocate for multiple new initiatives simultaneously, overwhelming organizational capacity",
        "Dismiss incremental progress as insufficient, demanding transformational outcomes",
        "Focus leadership energy on idea generation rather than execution discipline",
        "Treat operational constraints as obstacles to overcome rather than factors to integrate"
      ],
      rootCauses: [
        "Early career experiences where bold thinking was rewarded over execution discipline",
        "Organizational cultures that celebrated ideas more than implementation results",
        "Leadership environments where being seen as innovative was more valued than delivering practical outcomes",
        "Market contexts where disruption was necessary for survival, conditioning bias toward constant change"
      ],
      beliefsThatDriveResistance: [
        "'Innovation requires constant change to stay ahead.'",
        "'Incremental progress is not enough to compete.'", 
        "'Operational concerns limit breakthrough thinking.'",
        "'Bold vision is more important than practical planning.'",
        "'The best ideas will find their own path to implementation.'"
      ],
      whatOthersExperience: {
        directReports:
          "Appreciate your inspiring vision and feel energized by ambitious goals, but may feel overwhelmed by frequent changes in direction and struggle to maintain focus on current deliverables while constantly adapting to new initiatives.",
        executivePeers:
          "Value your forward-thinking perspective and strategic insights, but may become frustrated with implementation challenges and perceive you as impractical when operational realities conflict with innovative ambitions.",
        boardInvestors:
          "Respect your ability to identify market opportunities and position the organization competitively, but may grow concerned about execution risk and resource allocation when innovation initiatives multiply without clear prioritization or measurable progress on core business objectives."
      },
      organizationalTriggers: {
        amplifiers: [
          "High-growth environments where speed of innovation determines competitive advantage",
          "Cultures that reward breakthrough thinking over incremental improvement",
          "Market contexts where disruption is essential for survival and growth"
        ],
        softeners: [
          "Structured innovation processes that balance creativity with execution discipline",
          "Performance systems that reward both visionary thinking and practical results",
          "Organizational cultures that value sustainable growth over constant transformation"
        ]
      },
      strengthsHiddenInside: [
        "Anticipates market shifts and positions organization ahead of competitors",
        "Inspires teams with compelling visions of future possibilities", 
        "Challenges conventional thinking and drives breakthrough solutions",
        "Creates culture of innovation and continuous improvement"
      ],
      detailedResistanceCosts: [
        "Overwhelm teams with too many new initiatives, reducing focus and execution quality",
        "Exhaust stakeholders who need operational stability to deliver current commitments",
        "Create perception of being impractical or disconnected from operational realities", 
        "Dilute impact by spreading innovation efforts across too many directions simultaneously",
        "Reduce credibility with operational leaders who see vision without implementation support",
        "Undermine execution capacity as teams struggle to balance innovation with current deliverables",
        "Damage stakeholder confidence if breakthrough promises consistently exceed delivery capabilities"
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Feel inspired by your vision but may struggle to keep up with constant new directions and changes.\n• Partners/Advisors: Value your innovative thinking but may worry about execution capacity and focus.\n• Customers: Appreciate your forward-thinking approach but may prefer more stable, reliable solutions.",
            resistanceCosts: [
              "Overwhelm your team with too many new initiatives, reducing their ability to execute well.",
              "Confuse customers or partners if your offerings change too frequently.",
              "Dilute your impact by spreading resources across too many innovation projects.",
              "Risk losing credibility if breakthrough promises consistently exceed actual delivery."
            ],
            growthPath: [
              "Choose one major innovation to focus on deeply rather than pursuing multiple directions.",
              "Partner with team members who excel at execution to balance vision with implementation.",
              "Create clear timelines and milestones for innovations before launching new ones.",
              "Use customer feedback to prioritize which innovations deserve the most attention and resources."
            ]
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate your innovative thinking but may see you as scattered if you jump between too many ideas.\n• Early Customers/Supporters: Value your forward-thinking approach but may prefer more focus and consistency in delivery.\n• You (Self-Perception): Feel energized by new possibilities but may struggle to maintain focus on execution.",
            resistanceCosts: [
              "Keep you in 'idea mode' instead of building and delivering consistently.",
              "Confuse early customers if your offering or direction changes too frequently.",
              "Dilute your impact by spreading limited time and resources across too many projects.",
              "Reduce credibility with supporters if bold promises don't translate into tangible results."
            ],
            growthPath: [
              "Choose one core innovation to develop fully before starting new projects.",
              "Set clear execution milestones for each innovation and stick to them.",
              "Use advisor input to prioritize which ideas have the best chance of success.",
              "Balance vision with practical steps that deliver value to early customers consistently."
            ]
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel inspired by your vision and innovative thinking but may struggle to keep up with frequent changes in priorities and direction.\n• Clients: Appreciate your forward-thinking solutions but may prefer more stability and predictability in service delivery.\n• Vendors/Contractors: Value your creative approach but may find it challenging to align with constantly evolving requirements and specifications.",
            resistanceCosts: [
              "Overwhelm your small team with too many new initiatives, reducing their ability to deliver quality work.",
              "Confuse clients if your services or approach change too frequently without clear communication.",
              "Dilute business focus by spreading limited resources across too many innovation projects simultaneously.",
              "Risk losing client trust if breakthrough promises consistently exceed your team's delivery capacity."
            ],
            growthPath: [
              "Choose one major innovation per quarter and see it through to completion before starting new ones.",
              "Create clear communication with clients about how innovations will improve their outcomes.",
              "Partner with team members who excel at execution to balance your vision with practical implementation.",
              "Use client feedback to prioritize which innovations deserve the most attention and development resources."
            ]
          }
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel inspired by your innovative vision but may struggle to balance innovation initiatives with daily operational responsibilities.\n• Customers: Appreciate your forward-thinking approach but may prefer more stability and predictability in your products or services.\n• Partners/Vendors: Value your creative thinking but may find it challenging to align with frequently changing priorities and strategic directions.",
          resistanceCosts: [
            "Overwhelm employees with too many innovation initiatives, reducing focus on current customer deliverables.",
            "Confuse customers if your offerings or strategic direction change too frequently.",
            "Strain partnerships when constant innovation requires vendors to adapt to new requirements repeatedly.",
            "Dilute business impact by spreading resources across too many breakthrough projects simultaneously."
          ],
          growthPath: [
            "Establish an innovation pipeline that balances breakthrough projects with incremental improvements.",
            "Create clear communication about how innovations will benefit existing customers before launching new ones.",
            "Partner with operations-focused leaders to ensure innovations have practical implementation pathways.",
            "Use customer and employee feedback to prioritize which innovations deserve the most attention and resources."
          ]
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel energized by your innovative vision but may struggle to balance innovation initiatives with operational responsibilities across departments.\n• Leadership Team/Department Heads: Value your strategic thinking but may become frustrated when innovation demands conflict with departmental execution needs.\n• Customers/Stakeholders: Appreciate your forward-thinking approach but may prefer more predictable, stable solutions that integrate well with their existing systems.",
          resistanceCosts: [
            "Overwhelm departments with competing innovation priorities, reducing their ability to deliver core business results.",
            "Create tension between innovation goals and operational stability that departments need to serve customers effectively.",
            "Dilute organizational focus by spreading resources across too many breakthrough initiatives without clear prioritization.",
            "Risk stakeholder confidence if innovation promises consistently exceed the organization's execution capacity."
          ],
          growthPath: [
            "Establish structured innovation portfolios that balance breakthrough bets with incremental improvements across departments.",
            "Create clear criteria for prioritizing innovations based on strategic impact and organizational readiness.",
            "Partner with department heads to ensure innovations have realistic implementation timelines and resource allocation.",
            "Track how focused innovation efforts deliver better results than scattered initiatives, using this data to guide future innovation strategy."
          ]
        }
      }
    },
    {
      id: "collaborative-harmonizer",
      name: "Collaborative Harmonizer",
      description: "Prioritizes consensus, unity, and harmonious relationships",
      traits: [
        "Consensus building",
        "Conflict avoidance",
        "Team harmony",
        "Collaborative approach",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach collaboration and conflict. At your best, you are the kind of leader who unites people. You build trust across silos, reduce unnecessary friction, and create an environment where stakeholders feel respected and heard. In moments of organizational stress, your ability to maintain cohesion is an invaluable stabilizer. But when resistance is high, this strength narrows into avoidance. Instead of pairing empathy with candor, you may lean too heavily toward visible alignment, suppressing the very debates that sharpen strategy. In executive settings, this can look like endorsing consensus quickly to keep peace, holding objections for private conversations, or avoiding hard truths in the boardroom to project unity. This pattern is called the Collaborative Harmonizer. It does not mean you lack courage or clarity. It means your resistance shows up as a tendency to prize harmony and optics of agreement over decisive progress. What feels safe in the moment — alignment, unity, calm — can create long-term costs if critical risks remain unspoken. Your resistance does not erase your ability to build coalitions. Instead, it narrows it. When you balance inclusivity with candor, your influence grows: you become the leader who can surface truth, hold tension, and still move the enterprise forward.",
      strengthsInsights: [
        "Creates psychological safety that encourages participation across all levels",
        "Acts as a stabilizing force during politically charged or turbulent periods",
        "Builds coalitions across silos, ensuring stakeholders feel part of the solution",
        "Helps leadership teams recover trust and cohesion after contentious debates",
      ],
      resistanceCosts: [
        "Delay or dilute critical strategic pivots by extending dialogue to preserve agreement",
        "Leave major risks unaddressed in executive and board settings, creating blind spots",
        "Undermine perceptions of your decisiveness, making peers and boards question your ability to lead through disruption",
        "Encourage a culture of surface-level agreement, where unspoken concerns fester and later explode into crises",
      ],
      developmentAreas: [
        "Practice addressing conflict directly when necessary",
        "Develop comfort with making unpopular but necessary decisions",
        "Build skills in driving urgency while maintaining relationships",
      ],
      growthPath: {
        immediateShifts: [
          "Voice at least one unspoken risk or dissenting perspective directly in your next executive meeting",
          "Practice delivering a clear “no” respectfully but firmly when consensus pressure is strong",
        ],
        strategicPractices: [
          "Introduce structured debate into leadership forums, ensuring risks are surfaced before alignment",
          "Pair empathy with clarity by always following discussion with a firm decision or recommendation",
          "Cultivate peers who reinforce your candor and back you when you surface difficult truths",
        ],
        longTermGrowth: [
          "Reframe leadership as aligning people through honest candor and courage, not just agreement",
          "Track and celebrate instances where raising difficult issues strengthened trust rather than eroded it",
          "Model for the organization how unity and disagreement can coexist — showing that strong leadership teams are defined by their ability to confront conflict productively",
        ],
      },
      highResistanceCharacteristics: [
        "Avoid surfacing risks to maintain visible unity",
        "Extend discussions indefinitely to achieve consensus",
        "Minimize dissent in board or executive forums to protect cohesion",
        "Compromise on critical decisions to keep stakeholders comfortable",
      ],
      coreBehaviorsUnderResistance: [
        "Redirect conflict rather than address it directly",
        "Seek consensus even when quick decisions are needed",
        "Minimize dissenting views to maintain group cohesion",
        "Focus on process and relationship management over outcomes",
        "Avoid taking strong positions that might alienate stakeholders",
      ],
      rootCauses: [
        "Corporate environments where questioning the CEO or peers was politically dangerous",
        "Cultures where visible alignment was rewarded more than transparent dissent",
        "Early board-facing roles where unity felt safer than surfacing uncomfortable risks",
        "Leadership systems where candor carried reputational cost or jeopardized advancement",
      ],
      beliefsThatDriveResistance: [
        "“Maintaining visible unity protects organizational credibility”",
        "“Stakeholder confidence depends on harmony, not conflict”",
        "“Raising dissent in the boardroom risks being seen as disloyal”",
        " “It is safer to resolve disagreements privately than to expose divisions publicly”",
        "“Consensus among senior leaders matters more than candid debate in front of stakeholders”",
      ],
      whatOthersExperience: {
        directReports:
          "feel supported and included, but may become hesitant to take bold risks if they sense you avoid backing tough decisions. Over time, teams may mirror your tendency to default to consensus, weakening accountability and innovation",
        executivePeers:
          "appreciate your empathy and diplomacy, but may learn to bypass your input if they perceive reluctance to take a strong stance in contentious debates. This can reduce your influence in the executive team",
        boardInvestors:
          "value your collaborative presence but may privately question whether you can champion controversial strategies under pressure. In moments when visible decisiveness is expected, hesitation can raise concerns about your ability to drive transformation",
      },
      organizationalTriggers: {
        amplifiers: [
          "Investor or regulatory environments where projecting unity seems safer than surfacing unresolved risks",
          "Executive cultures where dissent is equated with disloyalty, making alignment the currency of trust",
          "High-stakes governance moments (earnings calls, board reviews) where leaders fear that disagreement will erode stakeholder confidence",
        ],
        softeners: [
          "Governance models that formalize dissent, such as red-team reviewsor devil’s advocate roles",
          "Board and CEO sponsors who explicitly frame candor as contribution, not conflict",
          "Decision frameworks that separate exploration (debate) from commitment (execution), reducing fear that dissent undermines unity",
        ],
      },
      strengthsHiddenInside: [
        "Creates psychological safety that encourages participation across all levels",
        "Acts as a stabilizing force during politically charged or turbulent periods",
        "Builds coalitions across silos, ensuring stakeholders feel part of the solution",
        "Helps leadership teams recover trust and cohesion after contentious debates",
      ],
      detailedResistanceCosts: [
        "Delay or dilute critical strategic pivots by extending dialogue to preserve agreement",
        "Leave major risks unaddressed in executive and board settings, creating blind spots that compromise enterprise resilience",
        "Undermine perceptions of your decisiveness, making peers and boards question your ability to lead through disruption",
        "Encourage a culture of surface-level agreement, where unspoken concerns fester and later explode into crises",
        "Erode stakeholder confidence when strategies appear unified but lack true candor, creating fragility under scrutiny",
        "Reduce your long-term influence in the C-suite if peers begin to see you as agreeable but not authoritative in driving tough decisions",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Feel supported and valued but may hesitate to take bold risks if they sense you avoid hard conversations.\n• Partners/Advisors: Appreciate your diplomacy but may see you as hesitant when tough decisions need to be made.\n• Customers/Backers: Value your steady presence but may quietly question your ability to make difficult calls under pressure.",
            resistanceCosts: [
              "Delay critical decisions by extending discussions to maintain harmony.",
              "Leave major risks unspoken, creating blind spots that surface later.",
              "Reduce credibility with partners or customers if you appear agreeable but not decisive.",
              "Limit growth if avoiding conflict means hard trade-offs never get made.",
            ],
            growthPath: [
              "Voice at least one unspoken concern directly in your next team or partner meeting.",
              "Pair empathy with clarity by following discussions with a clear decision.",
              "Introduce structured debate so disagreements feel safe and productive.",
              "Reframe leadership as balancing candor with unity, showing that strong teams can handle tension and still stay aligned.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate your respectful, relationship-driven approach but may notice you avoid pushing back on their feedback.\n• Early Customers/Supporters: Value your friendly style but may feel uncertain if you avoid setting clear boundaries or firm expectations.\n• You (Self-Perception): Feel safest when relationships stay positive, even if it means holding back honest concerns.",
            resistanceCosts: [
              "Prevent you from voicing disagreements that could sharpen your idea.",
              "Lead to unclear commitments with customers or partners.",
              "Limit progress if you prioritize harmony over decisive action.",
              "Create self-doubt when you agree outwardly but feel conflicted inside.",
            ],
            growthPath: [
              "Practice voicing one unspoken concern directly in your next advisor or customer conversation.",
              "Pair empathy with clarity by setting expectations and boundaries early.",
              "Use structured feedback (e.g., surveys, written input) to make discussions feel less personal and more productive.",
              "Reframe collaboration as including candor, reminding yourself that honest disagreement often builds stronger relationships.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel supported and included, but may notice hesitation when difficult performance or business decisions need to be made.\n• Clients: Appreciate your friendly style but may become uncertain if you avoid setting firm boundaries or saying no.\n• Vendors/Contractors: Respect your diplomacy but may push limits if you rarely challenge their terms or performance.",
            resistanceCosts: [
              "Delay tough personnel or financial decisions, slowing business growth.",
              "Create blind spots if risks or disagreements are not voiced openly.",
              "Undermine client or partner confidence if you appear agreeable but not decisive.",
              "Limit your ability to scale if conflict avoidance prevents necessary trade-offs.",
            ],
            growthPath: [
              "Raise at least one unspoken concern in your next employee or client meeting.",
              "Balance empathy with firmness by pairing supportive feedback with clear decisions.",
              "Use structured discussions to surface disagreements and resolve them constructively.",
              "Reframe collaboration as including candor, showing employees and clients that honesty builds stronger long-term trust.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel supported and included, but may notice hesitation when difficult performance or business decisions need to be made.\n• Clients: Appreciate your steady and personable approach but may question dependability if tough calls are avoided.\n• Vendors/Partners: Value your fairness but may see you as reluctant to push back when terms or expectations need adjustment.",
          resistanceCosts: [
            "Delay tough personnel or financial decisions, slowing business growth.",
            "Create blind spots if risks or disagreements are not voiced openly.",
            "Undermine client or partner confidence if you appear agreeable but not decisive.",
            "Limit your ability to scale if conflict avoidance prevents necessary trade-offs.",
          ],
          growthPath: [
            "Raise at least one unspoken concern in your next employee or client meeting.",
            "Balance empathy with firmness by pairing supportive feedback with clear decisions.",
            "Use structured discussions to surface disagreements and resolve them constructively.",
            "Reframe collaboration as including candor, showing employees and clients that honesty builds stronger long-term trust.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel supported and respected, but may notice hesitation when difficult staffing or performance decisions are required.\n• Leadership Team/Managers: Appreciate your diplomacy but may see you as reluctant to push back in executive discussions.\n• Customers/Stakeholders: Value your steady approach but may question your decisiveness when conflicts or trade-offs surface.",
          resistanceCosts: [
            "Delay important business decisions to preserve harmony.",
            "Create blind spots if risks or disagreements are not surfaced openly.",
            "Undermine credibility with the leadership team if you appear agreeable but not decisive.",
            "Limit organizational agility if conflict avoidance prevents necessary trade-offs.",
          ],
          growthPath: [
            "Voice at least one difficult concern in your next leadership team meeting.",
            "Pair empathy with clarity by supporting others while also stating firm decisions.",
            "Use structured debate formats to encourage open dialogue without losing unity.",
            "Reframe collaboration as including candor, showing your team that disagreement can strengthen, not weaken, trust.",
          ],
        },
      },
    },
    {
      id: "decisive-change-agent",
      name: "Decisive Change Agent",
      description: "Thrives on quick decisions and bold organizational changes",
      traits: [
        "Quick decision making",
        "Change leadership",
        "Bold action",
        "Urgency orientation",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach speed, disruption, and change. At your best, you are the kind of leader who brings energy, urgency, and bold decision-making. You rally organizations in moments of disruption, push through inertia, and seize opportunities before others even recognize them. But when resistance is high, that same instinct to act boldly can become overextended. Instead of balancing urgency with stability, you may push for rapid shifts that leave others disoriented, bypass important input, or sacrifice long-term positioning for the sake of immediate momentum. In executive contexts, this often looks like announcing pivots before alignment is built, forcing pace at the expense of depth, or burning organizational energy with constant redirection. This pattern is called the Decisive Change Agent. It does not mean you lack discipline or foresight. It means your resistance shows up as a compulsion to act now — to force progress quickly, sometimes faster than the enterprise can absorb. What feels decisive in the moment can create downstream fragility if stability and buy-in are left behind. Your resistance does not erase your strength as a catalyst for transformation. Instead, it narrows it. When you balance urgency with sustainability, your decisiveness becomes not just bold, but enduring — the kind of leadership that drives rapid progress while protecting long-term trust and resilience.",
      strengthsInsights: [
        "Creates urgency and momentum in stagnant or disrupted environments",
        "Unlocks opportunities others miss by moving quickly",
        "Rallies teams to act decisively under pressure",
        "Prevents paralysis in moments of uncertainty",
      ],
      resistanceCosts: [
        "Burn organizational capacity, leaving teams fatigued and less effective",
        "Undermine stakeholder trust if bold moves outpace alignment and buy-in",
        "Sacrifice long-term stability by prioritizing speed over sustainable systems",
        "Fragment execution, as initiatives shift before fully embedding",
      ],
      developmentAreas: [
        "Practice slowing down to build more stakeholder buy-in",
        "Develop skills in long-term strategic thinking",
        "Work on maintaining team morale during constant change",
      ],
      growthPath: {
        immediateShifts: [
          "Before launching a pivot, test alignment with at least one peer or stakeholder you trust to push back",
          "Commit to pausing after each major initiative to let teams stabilize before launching the next",
        ],
        strategicPractices: [
          "Build dual-track decision models: one for speed when disruption demands it, one for deliberation when sustainability matters",
          "Pair urgency with explicit communication that explains not just what is changing, but why and how stability will be protected",
        ],
        longTermGrowth: [
          "Redefine decisiveness as sustainable momentum, not just speed",
          "Track the outcomes of fast vs. measured decisions to reinforce when balance outperforms urgency alone",
          "Model for your peers how bold change and organizational resilience can be advanced together",
        ],
      },
      highResistanceCharacteristics: [
        "Trigger organizational fatigue by driving constant shifts",
        "Reduce alignment when stakeholders feel rushed or excluded",
        "Overshadow long-term priorities in favor of immediate action",
        "Create volatility that erodes trust if initiatives fail to stabilize",
      ],
      coreBehaviorsUnderResistance: [
        "Push bold moves forward without securing full executive or board alignment",
        "Announce shifts before governance processes are complete",
        "Accelerate implementation timelines, even when capacity is strained",
        "Prioritize visible momentum over measured readiness",
        "Frame resistance from others as obstruction rather than due diligence",
      ],
      rootCauses: [
        "Roles in turnaround, crisis, or hyper-growth organizations where delay meant failure",
        "Cultures that rewarded fast movers while punishing cautious deliberation",
        "Early wins tied to decisive, high-risk actions that reinforced urgency as a strength",
        "Board or investor environments where visible progress was equated with leadership impact",
      ],
      beliefsThatDriveResistance: [
        "“Momentum solves more problems than caution ever will.”",
        "“Speed builds confidence; hesitation erodes it.”",
        "“If we don’t move now, the window will close.”",
        "“Stakeholders respect bold action more than careful deliberation.”",
        "“Slowing down risks looking weak or indecisive.”",
      ],
      whatOthersExperience: {
        directReports:
          "feel energized by your urgency but may become exhausted or overwhelmed if priorities change too quickly or resources aren’t aligned",
        executivePeers:
          "admire your decisiveness but may grow frustrated if they feel sidelined or forced into reactive alignment",
        boardInvestors:
          "value your ability to act boldly in disruption but may worry you are trading stability and stakeholder confidence for speed",
      },
      organizationalTriggers: {
        amplifiers: [
          "Crisis environments where fast action feels like the only safe option",
          "Investor or market pressures demanding immediate results",
          "Cultures of urgency that prize visible action over thoughtful execution",
        ],
        softeners: [
          "Decision frameworks that balance speed with risk assessment",
          "Trusted deputies who slow-check operational impact while you drive vision",
          "Governance rhythms that build alignment quickly without stalling progress",
        ],
      },
      strengthsHiddenInside: [
        "Creates urgency and momentum in stagnant or disrupted environments",
        "Unlocks opportunities others miss by moving quickly",
        "Rallies teams to act decisively under pressure",
        "Prevents paralysis in moments of uncertainty",
      ],
      detailedResistanceCosts: [
        "Burn organizational capacity, leaving teams fatigued and less effective",
        "Undermine stakeholder trust if bold moves outpace alignment and buy-in",
        "Sacrifice long-term stability by prioritizing speed over sustainable systems",
        "Fragment execution, as initiatives shift before fully embedding",
        "Erode peer confidence if colleagues feel pressured into decisions without sufficient input",
        "Create reputational risk with boards or investors if fast action produces volatile results",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Feel energized by your urgency but may also feel burned out if priorities shift too often or too quickly.\n• Partners/Advisors: Admire your boldness but may feel sidelined if decisions move forward without their input.\n• Customers/Backers: Appreciate your drive but may question stability if rapid changes disrupt consistency.",
            resistanceCosts: [
              "Burn out your team by driving constant pivots without recovery time.",
              "Strain partnerships if people feel forced to react instead of aligning.",
              "Reduce customer trust if products or services shift too fast.",
              "Undermine confidence from backers or supporters if resources are consumed without steady progress.",
            ],
            growthPath: [
              "Test bold moves in small experiments before fully pivoting.",
              "Set a clear “minimum period” to let an idea stabilize before changing again.",
              "Use advisors as a sounding board before committing energy and resources.",
              "Reframe decisiveness as building steady traction, not just constant motion.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Admire your boldness but may feel you move on ideas too quickly without enough testing.\n• Early Customers/Supporters: Appreciate your energy but may get confused if the product or service shifts direction often.\n• You (Self-Perception): Feel energized by fast action but may struggle to pause long enough to stabilize what you’ve already built.",
            resistanceCosts: [
              "Lead to frequent pivots that prevent traction from building.",
              "Create confusion for early customers if the offer keeps changing.",
              "Overwhelm you personally, since there is no team to absorb the pace.",
              "Burn through limited resources without a clear path to stability.",
            ],
            growthPath: [
              "Test bold moves in small experiments before fully pivoting.",
              "Set a clear “minimum period” to let an idea stabilize before changing again.",
              "Use advisors as a sounding board before committing energy and resources.",
              "Reframe decisiveness as building steady traction, not just constant motion.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel motivated by your urgency and quick decisions but may also feel stretched thin when priorities shift suddenly.\n• Clients: Appreciate your responsiveness but may become uneasy if promises shift or feel rushed.\n• Vendors/Contractors: Like your decisiveness but may struggle when sudden pivots disrupt established agreements.",
            resistanceCosts: [
              "Exhaust your small team with constant changes that stretch limited bandwidth.",
              "Undermine trust with clients if speed comes at the expense of quality or stability.",
              "Disrupt vendor relationships when abrupt pivots reset expectations.",
              "Create chaos by prioritizing visible motion over steady, sustainable growth.",
            ],
            growthPath: [
              "Use a “pause and check” habit: confirm capacity with your team before announcing a new shift.",
              "Frame bold moves as experiments with clear timelines, not permanent pivots.",
              "Celebrate stability and follow-through as much as quick wins.",
              "Reframe decisiveness as momentum that includes sustainability, not just speed.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel energized by your drive and quick decisions but may also feel stretched thin when priorities shift suddenly.\n• Clients: Appreciate your responsiveness but may lose confidence if frequent changes affect consistency.\n• Vendors/Partners: Respect your urgency but may struggle if they are constantly asked to adjust to new directions.",
          resistanceCosts: [
            "Exhaust employees by pushing for constant pivots without recovery time.",
            "Confuse clients if offerings or service models keep changing.",
            "Strain vendor and partner relationships when frequent redirection disrupts commitments.",
            "Limit long-term stability if quick wins take priority over sustainable growth.",
          ],
          growthPath: [
            "Test major changes with a small pilot before rolling out widely.",
            "Balance urgency with communication so employees and partners feel prepared, not blindsided.",
            "Create checkpoints after big shifts to let the team stabilize before introducing more changes.",
            "Reframe decisiveness as building steady momentum, not just speed, so growth feels sustainable to your business and your clients.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel motivated by your urgency but may also feel overwhelmed if direction changes too quickly.\n• Leadership Team/Managers: Admire your decisiveness but may grow frustrated if they are not given time to prepare their teams.\n• Customers/Stakeholders: Appreciate responsiveness but may question consistency if frequent pivots disrupt delivery.",
          resistanceCosts: [
            "Create fatigue among employees as priorities shift faster than they can execute.",
            "Undermine leadership team alignment if decisions move ahead without discussion.",
            "Reduce customer trust if changes lead to uneven service or product delivery.",
            "Sacrifice long-term positioning if short-term speed becomes the priority.",
          ],
          growthPath: [
            "Test major changes with one department or customer group before rolling out widely.",
            "Pair urgency with clear communication so teams understand both the “what” and the “why.”",
            "Create pause points between big initiatives to let systems and people stabilize.",
            "Reframe decisiveness as building momentum that is fast and sustainable, not just immediate.",
          ],
        },
      },
    },
    {
      id: "people-centric-coach",
      name: "People-Centric Coach",
      description: "Focuses on developing and supporting team members",
      traits: [
        "People development",
        "Coaching mindset",
        "Individual growth",
        "Supportive leadership",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach people development and coaching. At your best, you are a leader who invests deeply in others. You take pride in mentoring, empowering talent, and ensuring your teams grow in capability and confidence. This creates loyalty and strengthens the leadership pipeline. But when resistance is high, that same instinct can narrow into overextension. You may spend too much time supporting individuals at the expense of enterprise priorities, hesitate to set firm boundaries when performance is lacking, or delay difficult personnel decisions in the hope that development alone will solve the issue. In executive settings, this often looks like holding onto underperformers too long, overinvesting in coaching at the cost of strategic focus, or being perceived as too lenient in critical moments. This pattern is called the People Centric Coach. It does not mean you lack accountability or strategic discipline. It means your resistance shows up as reluctance to balance care with candor. What feels like support in the moment can create organizational drag if accountability is delayed. Your resistance does not erase your strength as a developer of talent. Instead, it narrows it. When you align people growth with enterprise performance, your coaching becomes not only compassionate but catalytic — the kind of leadership that scales people and results together.",
      strengthsInsights: [
        "Builds exceptional loyalty and retention across teams",
        "Creates a strong leadership pipeline through deliberate development",
        "Establishes psychological safety that encourages risk-taking and innovation",
        "Generates sustainable performance through capability building",
      ],
      resistanceCosts: [
        "Slow talent decisions by over-focusing on development",
        "Leave performance issues unresolved for too long",
        "Consume executive bandwidth with coaching at the cost of enterprise focus",
        "Signal leniency that erodes standards",
      ],
      developmentAreas: [
        "Practice making tough performance-based decisions",
        "Develop skills in driving results while developing people",
        "Build comfort with prioritizing organizational needs over individual preferences",
      ],
      growthPath: {
        immediateShifts: [
          "Pair each coaching conversation with a clear performance boundary",
          "In one current case, accelerate a talent decision you’ve been delaying",
        ],
        strategicPractices: [
          "Adopt “growth + accountability” frameworks that set time-bound improvement milestones",
          "Partner with peers in talent reviews to balance your development lens with their performance lens",
        ],
        longTermGrowth: [
          "Redefine people-first leadership as developing talent while upholding enterprise standards",
          "Track outcomes where earlier accountability led to stronger growth for the individual or team",
          "Model for your organization how compassion and candor, together, create a high-performance culture",
        ],
      },
      highResistanceCharacteristics: [
        "Slow talent decisions by over-focusing on development",
        "Leave performance issues unresolved for too long",
        "Consume executive bandwidth with coaching at the cost of enterprise focus",
        "Signal leniency that erodes standards",
      ],
      coreBehaviorsUnderResistance: [
        "Provide extensive support but hesitate to enforce hard consequences",
        "Hold onto struggling performers longer than peers would",
        "Frame accountability conversations in overly soft terms, diluting impact",
        "Invest in individual growth even when enterprise outcomes suffer",
        "Default to “coaching mode” in moments that require firm, decisive action",
      ],
      rootCauses: [
        "Leadership paradigms that equated “people retention” with success, undervaluing disciplined accountability",
        "CEO and board signals where low attrition was celebrated even if standards slipped",
        "Early promotions that came from being a talent nurturer rather than a performance enforcer",
        "Succession systems that over-rewarded “mentor leaders” while under-recognizing leaders who made hard but necessary talent calls",
      ],
      beliefsThatDriveResistance: [
        "“Everyone deserves more time to grow.”",
        "“My role is to protect and support, even when performance lags.”",
        "“Firm accountability risks damaging trust.”",
        "“If I just coach enough, improvement will follow.”",
        "“People will see me as harsh if I enforce consequences too directly.”",
      ],
      whatOthersExperience: {
        directReports:
          "Feel deeply supported but may test limits or stay longer in roles than performance warrants. Over time, this reduces accountability within the team",
        executivePeers:
          "Respect your mentoring orientation but may feel dragged down if unresolved talent issues in your division spill over into enterprise execution",
        boardInvestors:
          "Appreciate your reputation for people development but may perceive prolonged tolerance of underperformance as succession and culture risk, eroding confidence in your ability to balance loyalty with enterprise results",
      },
      organizationalTriggers: {
        amplifiers: [
          "Cultures that equate retention with leadership quality",
          "Situations where removing talent creates short-term disruption",
          "Peer environments where being seen as “harsh” carries reputational risk",
        ],
        softeners: [
          "Talent frameworks that balance coaching with measurable accountability",
          "Board or CEO signals that decisive talent calls build, not break, trust",
          "Clear succession planning that eases the cost of moving on from underperformers",
        ],
      },
      strengthsHiddenInside: [
        "Creates loyalty and trust that strengthens culture",
        "Builds long-term leadership capacity",
        "Encourages psychological safety by valuing growth",
        "Enhances reputation as a mentor and people-developer",
      ],
      detailedResistanceCosts: [
        "Weaken performance discipline if underperformance is not addressed quickly",
        "Delay critical talent decisions, creating drag on enterprise execution",
        "Erode peer confidence if colleagues see you as overly soft on accountability",
        "Consume disproportionate executive bandwidth, distracting from strategic priorities",
        "Signal tolerance for mediocrity, which can cascade through the culture",
        "Damage credibility with boards or investors if people issues persist under your leadership",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Feel valued and supported but may also notice hesitation when accountability is required.\n• Partners/Advisors: Appreciate your investment in people but may see you as slow to act when performance issues need addressing.\n• Customers/Backers: Respect your loyalty to your team but may question decisiveness if problems linger too long.",
            resistanceCosts: [
              "Keep underperformers in place too long, creating drag on execution.",
              "Consume your time with coaching at the expense of strategy and growth.",
              "Signal leniency to partners or customers, weakening confidence in delivery.",
              "Limit scale if standards are not upheld consistently.",
            ],
            growthPath: [
              "Pair mentorship with clear expectations and consequences.",
              "Act more quickly when it becomes clear that development alone is not enough.",
              "Use advisors or peers to provide balance during talent decisions.",
              "Reframe people-first leadership as supporting growth while also protecting the business.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate your generosity and encouragement but may notice you avoid setting boundaries when support is not effective.\n• Early Customers/Supporters: Value your personal care but may question reliability if service depends too much on your emotional bandwidth.\n• You (Self-Perception): Take pride in helping and mentoring others, but may overextend yourself at the cost of your own priorities.",
            resistanceCosts: [
              "Keep you overinvested in others instead of protecting focus on your venture.",
              "Slow down decisions if you hesitate to disappoint or set firm limits.",
              "Drain your energy when support for others comes before building momentum for your business.",
              "Create frustration if encouragement is not paired with accountability.",
            ],
            growthPath: [
              "Pair encouragement with clear expectations and timelines.",
              "Protect your focus by limiting how much unpaid coaching or support you provide.",
              "Ask for accountability from those you help, ensuring support leads to action.",
              "Reframe people-first leadership as growing others while also protecting your own execution energy.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel supported and motivated by your care and mentorship but may notice you hesitate to set firm boundaries when performance lags.\n• Clients: Appreciate your attentiveness but may grow frustrated if people issues delay delivery.\n• Vendors/Contractors: Value your respectful style but may take advantage if accountability isn’t enforced.",
            resistanceCosts: [
              "Keep underperforming employees or contractors in place too long.",
              "Slow execution when coaching takes priority over business outcomes.",
              "Drain your energy by focusing more on developing others than growing the business.",
              "Create a culture of leniency that undermines standards in a small team.",
            ],
            growthPath: [
              "Pair mentorship with clear expectations and consequences.",
              "Act faster when coaching alone is not enough to resolve issues.",
              "Lean on peers or advisors to balance people-first instincts with business demands.",
              "Reframe people-first leadership as growing individuals while keeping enterprise goals at the center.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel valued and supported, but may also notice hesitancy to address poor performance directly.\n• Clients: Value your loyalty to your team but may lose confidence if issues linger without visible correction.\n• Vendors/Partners: Respect your care for people but may question dependability if business needs take second place to employee concerns.",
          resistanceCosts: [
            "Keep underperformers in place too long, slowing down the whole team.",
            "Reduce productivity if coaching takes priority over execution.",
            "Signal leniency that makes it harder to uphold high standards.",
            "Limit business growth if difficult staffing or client-facing decisions are delayed.",
          ],
          growthPath: [
            "Combine encouragement with clear accountability in conversations.",
            "Act faster when coaching alone is not enough to resolve issues.",
            "Lean on peers or advisors to balance people-first instincts with business demands.",
            "Reframe people development as growing talent while also protecting performance standards that keep clients satisfied.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel valued and supported, but may also notice when underperformance is tolerated too long.\n• Leadership Team/Managers: Appreciate your investment in people but may question your ability to make tough calls when required.\n• Customers/Stakeholders: Respect your loyalty to staff but may worry about delivery if performance issues persist.",
          resistanceCosts: [
            "Slow down necessary personnel changes, holding back execution.",
            "Consume too much of your time in coaching at the expense of strategic priorities.",
            "Signal leniency that makes it harder to enforce consistent standards.",
            "Weaken customer or stakeholder confidence if performance problems are visible but not resolved.",
          ],
          growthPath: [
            "Pair supportive coaching with firm timelines for performance improvement.",
            "Act sooner when it is clear that development alone is not enough.",
            "Lean on peers or advisors to balance people-first instincts with business demands.",
            "Reframe people-first leadership as developing talent while protecting the company’s ability to deliver consistently.",
          ],
        },
      },
    },
    {
      id: "risk-aware-stabilizer",
      name: "Risk-Aware Stabilizer",
      description: "Emphasizes stability and careful risk management",
      traits: [
        "Risk management",
        "Stability focus",
        "Cautious approach",
        "Protection mindset",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach risk, stability, and decision-making. At your best, you are a leader who safeguards the enterprise. You anticipate threats others overlook, protect long-term resilience, and act as a steadying force when the organization is under pressure. Your ability to foresee risks and prevent disruption is a critical leadership strength. But when resistance is high, that same instinct can narrow into over-caution. Instead of balancing risk management with opportunity capture, you may default to protecting the status quo, hesitate to back bold initiatives, or slow decision-making to avoid exposure. In executive contexts, this can look like challenging every new proposal for risk, delaying strategic bets until certainty is high, or framing progress primarily in terms of what might go wrong. This pattern is called the Risk-Aware Stabilizer. It does not mean you lack vision or courage. It means your resistance shows up as a heightened need for certainty and safety, which can erode agility and innovation. What feels responsible in the moment can undermine long-term competitiveness if opportunity windows are missed. Your resistance does not erase your strength as a guardian of stability. Instead, it narrows it. When you balance vigilance with boldness, your risk awareness becomes a platform for resilient growth — the kind of leadership that protects the enterprise without paralyzing it.",
      strengthsInsights: [
        "Protects organizational assets and prevents costly mistakes",
        "Creates stable environments that enable consistent performance",
        "Builds stakeholder confidence through prudent risk management",
        "Ensures sustainable growth by avoiding dangerous shortcuts",
      ],
      resistanceCosts: [
        "Miss growth opportunities by over-analyzing risks",
        "Slow organizational adaptation to market changes",
        "Create frustration with stakeholders who need faster responses",
        "Limit innovation by avoiding necessary uncertainties",
      ],
      developmentAreas: [
        "Practice taking calculated risks for growth opportunities",
        "Develop comfort with ambiguity and uncertainty",
        "Work on communicating the need for change to others",
      ],
      growthPath: {
        immediateShifts: [
          "Approve one initiative where not all risks are fully mitigated but learning potential is high",
          "Replace one “why not” question in meetings with “what if.”",
        ],
        strategicPractices: [
          "Use risk-adjusted experimentation: small-scale pilots that test bold ideas without endangering the enterprise",
          "Partner with a peer known for boldness to balance perspectives in key decisions",
        ],
        longTermGrowth: [
          "Redefine risk as both threat and opportunity — expanding your leadership brand from protector to enabler of resilience",
          "Track and share wins where calculated risks created outsized returns",
          "Model for your teams how vigilance and courage can coexist, setting a standard for sustainable innovation",
        ],
      },
      highResistanceCharacteristics: [
        "Delay or block bold strategic moves in uncertain conditions",
        "Reduce entrepreneurial thinking across the organization",
        "Slow execution by over-analyzing risks",
        "Create reputational drag if you are seen as resistant to change",
      ],
      coreBehaviorsUnderResistance: [
        "Question or slow-roll initiatives until risks are fully mitigated",
        "Default to proven models instead of exploring new approaches",
        "Hesitate to greenlight innovation unless certainty is high",
        "Focus meetings on risks and safeguards over opportunities",
        "Frame caution as responsibility, even when speed is required",
      ],
      rootCauses: [
        "Organizations where missteps were punished more severely than inaction",
        "Roles where you were accountable for compliance, risk, or governance outcomes",
        "Cultures that rewarded conservatism and penalized experimentation",
        "Early executive experiences where stability was the only metric of success",
      ],
      beliefsThatDriveResistance: [
        "“Protecting the organization matters more than chasing uncertain opportunities.”",
        "“A cautious decision is safer than a bold misstep.”",
        "“If I slow down, we’ll prevent risks others can’t see.”",
        "“My credibility depends on avoiding failure.”",
        "“Stability earns trust; risk-taking jeopardizes it.”",
      ],
      whatOthersExperience: {
        directReports:
          "value your steadiness but may feel constrained when they want to innovate or move quickly",
        executivePeers:
          "see you as reliable but may perceive you as resistant to change or overly critical of new ideas",
        boardInvestors:
          "respect your prudence but may worry you limit the enterprise’s ability to seize transformative opportunities",
      },
      organizationalTriggers: {
        amplifiers: [
          "Highly regulated or compliance-driven industries where mistakes carry severe penalties",
          "Economic downturns or crises where stability becomes the top priority",
          "Cultures of perfectionism where risk-taking is stigmatized",
        ],
        softeners: [
          "Pilot programs that allow bold ideas to be tested safely",
          "Board mandates that explicitly reward calculated risk-taking",
          "Balanced scorecards that measure both protection and growth outcomes",
        ],
      },
      strengthsHiddenInside: [
        "Protects the organization from reckless errors",
        "Maintains continuity and trust during turbulence",
        "Provides a rational counterbalance to over-optimism",
        "Enhances credibility with risk-sensitive stakeholders",
      ],
      detailedResistanceCosts: [
        "Cause the enterprise to miss growth opportunities by waiting for certainty",
        "Create innovation bottlenecks, discouraging experimentation",
        "Undermine organizational agility by slowing decisions in fast-changing markets",
        "Weaken competitive position if peers move faster to seize opportunities",
        "Erode stakeholder confidence if caution is seen as timidity in critical moments",
        "Reduce long-term influence if you’re perceived as a blocker rather than an enabler of transformation",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Appreciate your steady hand but may feel slowed down when bold moves are delayed for more certainty.\n• Partners/Advisors: Value your caution but may see you as resistant when new ideas require quick action.\n• Customers/Backers: Trust your reliability but may doubt competitiveness if opportunities are missed.",
            resistanceCosts: [
              "Delay product launches or pivots until it feels “safe,” reducing agility.",
              "Limit innovation when every new idea is met with caution first.",
              "Frustrate partners or customers who want faster progress.",
              "Reduce backer or market confidence if you are seen as protecting the status quo over pursuing growth.",
            ],
            growthPath: [
              "Start with small, low-risk tests instead of waiting for perfect certainty.",
              "Use pilot programs to balance risk with speed.",
              "Partner with bold voices who push for action while you safeguard quality.",
              "Reframe caution as resilience-building, not resistance, showing that you can protect the venture while still moving fast.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate your caution but may notice that you hold back from opportunities until you feel completely safe.\n• Early Customers/Supporters: Value your consistency but may lose patience if you hesitate to commit or launch.\n• You (Self-Perception): Feel responsible for protecting yourself and your idea, but may struggle to take risks without guarantees.",
            resistanceCosts: [
              "Delay launching your product or service, keeping you in preparation mode.",
              "Cause missed opportunities if you wait for certainty that never comes.",
              "Limit momentum when fear of mistakes overrides experimentation.",
              "Erode credibility with early supporters who expect progress, not just preparation.",
            ],
            growthPath: [
              "Start with small, low-risk tests instead of waiting for perfect certainty.",
              "Reframe mistakes as learning, not failure.",
              "Seek out advisors who encourage action and help you balance caution with movement.",
              "Remind yourself that progress builds safety, waiting does not.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Respect your steadiness but may feel held back if you hesitate to pursue new opportunities.\n• Clients: Value your reliability but may grow impatient if progress feels too cautious.\n• Vendors/Contractors: Appreciate your carefulness but may see reluctance when flexibility is needed.",
            resistanceCosts: [
              "Slow growth by delaying launches until risks feel fully resolved.",
              "Limit innovation when the team avoids experimentation for fear of mistakes.",
              "Miss opportunities if competitors move faster while you wait for certainty.",
              "Create frustration among employees eager to take bold steps.",
            ],
            growthPath: [
              "Test bold ideas in small pilot projects to balance safety with speed.",
              "Shift one decision this month from “wait and see” to “try and learn.”",
              "Invite a trusted team member or advisor to challenge over-caution.",
              "Reframe risk as something to be managed, not avoided, reminding yourself that calculated risk drives growth.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Appreciate your steadiness but may feel slowed down if opportunities are delayed until certainty is high.\n• Leadership Team/Managers: Value your caution but may become frustrated if innovation is held back by too much risk analysis.\n• Customers/Stakeholders: Trust your reliability but may look elsewhere if your company is slower to adapt than competitors.",
          resistanceCosts: [
            "Delay key decisions, weakening competitiveness in fast-changing markets.",
            "Discourage innovation if new ideas are consistently slowed or blocked.",
            "Create tension with leaders who want quicker execution.",
            "Reduce customer confidence if your business is perceived as overly cautious.",
          ],
          growthPath: [
            "Approve small-scale pilots to test new ideas without requiring full certainty.",
            "Balance risk reviews with clear timelines so progress does not stall.",
            "Partner with leaders who bring boldness, allowing your steadiness to complement rather than constrain.",
            "Reframe risk awareness as enabling resilience, showing that calculated risks protect the business while driving growth.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Appreciate your steadiness but may feel slowed down if opportunities are delayed until certainty is high.\n• Leadership Team/Managers: Value your caution but may become frustrated if innovation is held back by too much risk analysis.\n• Customers/Stakeholders: Trust your reliability but may look elsewhere if your company is slower to adapt than competitors.",
          resistanceCosts: [
            "Delay key decisions, weakening competitiveness in fast-changing markets.",
            "Discourage innovation if new ideas are consistently slowed or blocked.",
            "Create tension with leaders who want quicker execution.",
            "Reduce customer confidence if your business is perceived as overly cautious.",
          ],
          growthPath: [
            "Approve small-scale pilots to test new ideas without requiring full certainty.",
            "Balance risk reviews with clear timelines so progress does not stall.",
            "Partner with leaders who bring boldness, allowing your steadiness to complement rather than constrain.",
            "Reframe risk awareness as enabling resilience, showing that calculated risks protect the business while driving growth.",
          ],
        },
      },
    },
    {
      id: "outcome-driven-achiever",
      name: "Outcome-Driven Achiever",
      description: "Prioritizes measurable results and immediate outcomes",
      traits: [
        "Results focus",
        "Performance orientation",
        "Achievement drive",
        "Measurable outcomes",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach performance, results, and success. At your best, you are a leader who drives execution relentlessly. You focus on measurable outcomes, create accountability, and push your organization to deliver tangible results. This focus often ensures efficiency, discipline, and competitive edge. But when resistance is high, that same results orientation can narrow into overdrive. Instead of balancing outcomes with long-term sustainability, you may push teams too hard for near-term wins, neglecting strategy, innovation, or resilience. In executive settings, this can look like emphasizing quarterly numbers at the expense of multi-year bets, rewarding activity over impact, or creating cultures where results are achieved but at a cost to people and sustainability. This pattern is called the Outcome Driven Achiever. It does not mean you lack vision or empathy. It means your resistance shows up as an over-focus on results as the ultimate measure of leadership success. What feels like accountability in the moment can create fatigue, missed opportunities, or reputational risk if outcomes come at too high a price. Your resistance does not erase your strength as a performance driver. Instead, it narrows it. When you balance execution with sustainability, your results become not only impressive but enduring — the kind of leadership that delivers outcomes while building long-term enterprise value.",
      strengthsInsights: [
        "Creates a culture of accountability and discipline",
        "Ensures execution follows vision",
        "Prevents complacency by keeping performance at the forefront",
        "Builds a reputation for reliability and delivery",
      ],
      resistanceCosts: [
        "Sacrifice long-term strategy for immediate wins",
        "Cause organizational fatigue and burnout, reducing retention and innovation",
        "Undermine innovation if risk-taking is suppressed in favor of safe results",
        "Damage culture by creating a “results at all costs” environment",
      ],
      developmentAreas: [
        "Practice investing in long-term capability building",
        "Develop skills in maintaining team engagement and development",
        "Work on building sustainable processes beyond immediate results",
      ],
      growthPath: {
        immediateShifts: [
          "Pair every results review with at least one forward-looking, long-term question",
          "Publicly recognize process improvements, not just outcomes",
        ],
        strategicPractices: [
          "Balance scorecards by weighting long-term initiatives equally with quarterly metrics",
          "Build rituals where strategic bets are celebrated even before results arrive",
          "Encourage peers and teams to challenge when short-term pressure overshadows sustainability",
        ],
        longTermGrowth: [
          "Reframe leadership success as building enduring value, not just producing results",
          "Track cases where long-term investments yielded bigger returns than immediate wins",
          "Model how accountability and sustainability together create lasting enterprise advantage",
        ],
      },
      highResistanceCharacteristics: [
        "Prioritize visible results over long-term resilience",
        "Create organizational fatigue by pushing too hard for output",
        "Reward activity that “looks successful” rather than true impact",
        "Drive performance metrics that overshadow innovation and growth",
      ],
      coreBehaviorsUnderResistance: [
        "Overemphasize short-term KPIs at the cost of strategic bets",
        "Push teams to deliver results quickly, even when capacity is strained",
        "Spotlight wins without addressing systemic issues beneath them",
        "Focus on outcomes while underinvesting in process or people development",
        "Treat performance as proof of leadership, even when sustainability suffers",
      ],
      rootCauses: [
        "Early leadership roles where advancement depended on hitting aggressive targets",
        "Cultures where performance was the only currency of success",
        "Investor or board environments where quarterly delivery overshadowed long-term value creation",
        "Personal identity shaped around achievement as the measure of worth",
      ],
      beliefsThatDriveResistance: [
        "“My results define my credibility.”",
        "“Winning now matters more than planning later.”",
        "“Sustained effort is less visible than immediate wins.”",
        "“Boards and investors judge leaders by outcomes above all else.”",
        "“If results slip, my leadership is in question.”",
      ],
      whatOthersExperience: {
        directReports:
          "feel driven to perform but may experience burnout if results consistently outweigh wellbeing or development",
        executivePeers:
          "respect your discipline and accountability but may view you as inflexible when trade-offs are needed",
        boardInvestors:
          "value your ability to deliver but may question whether your focus on outcomes risks long-term positioning or culture",
      },
      organizationalTriggers: {
        amplifiers: [
          "Investor pressure for quarterly performance",
          "Competitive industries where speed and wins are constantly benchmarked",
          "Cultures of “deliver at all costs” where results are prized over resilience",
        ],
        softeners: [
          "Balanced scorecards that measure long-term value creation alongside outcomes",
          "Board sponsorship that reinforces strategic bets even when results lag short-term",
          "Cultural norms that reward innovation, resilience, and sustainability equally with performance",
        ],
      },
      strengthsHiddenInside: [
        "Creates a culture of accountability and discipline",
        "Ensures execution follows vision",
        "Prevents complacency by keeping performance at the forefront",
        "Builds a reputation for reliability and delivery",
      ],
      detailedResistanceCosts: [
        "Sacrifice long-term strategy for immediate wins",
        "Cause organizational fatigue and burnout, reducing retention and innovation",
        "Undermine innovation if risk-taking is suppressed in favor of safe results",
        "Damage culture by creating a “results at all costs” environment",
        "Erode board or investor trust if outcomes look strong short-term but weaken enterprise resilience",
        "Limit your leadership influence if you are seen as a driver of numbers but not a shaper of sustainable strategy",
      ],
      categoryContent: {
        entrepreneur: {
          growing: {
            whatOthersExperience:
              "• Team: Feel motivated by your high standards but may struggle with burnout if short-term results always come first.\n• Partners/Advisors: Respect your discipline but may see inflexibility when trade-offs are required for long-term growth.\n• Customers/Backers: Value your ability to deliver but may question long-term strength if growth feels unsustainable.",
            resistanceCosts: [
              "Push the venture toward quick wins at the expense of strategy or resilience.",
              "Create fatigue that weakens retention and creativity.",
              "Limit innovation if risk-taking is suppressed in favor of safe outcomes.",
              "Reduce confidence from backers or customers if results look strong now but lack durability.",
            ],
            growthPath: [
              "Pair outcome goals with one longer-term milestone that strengthens your venture.",
              "Recognize and reward process improvements, not just visible outcomes.",
              "Allow space for trial projects that may not yield instant returns but build future growth.",
              "Reframe achievement as delivering results and building resilience so the business can scale without losing independence.",
            ],
          },
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Admire your determination but may see you pushing too hard for immediate proof of success.\n• Early Customers/Supporters: Appreciate your reliability but may feel pressured if you focus more on results than on building relationships.\n• You (Self-Perception): Feel proud of your discipline and drive, but may struggle to balance short-term wins with building long-term stability.",
            resistanceCosts: [
              "Push you to chase quick wins instead of building sustainable foundations.",
              "Create exhaustion if you demand constant results from yourself with little recovery.",
              "Limit creativity by avoiding experiments that don’t show immediate payoff.",
              "Reduce trust from early customers or partners if they sense urgency overshadows consistency.",
            ],
            growthPath: [
              "Pair each results goal with one longer-term milestone that strengthens your venture.",
              "Recognize and reward process improvements, not just visible outcomes.",
              "Allow space for experimentation, even if it doesn’t yield instant success.",
              "Reframe success as building durable value, not just proving yourself quickly.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel driven by your high standards but may experience pressure if the focus is only on results.\n• Clients: Appreciate your reliability but may worry that speed to deliver outweighs quality or relationships.\n• Vendors/Contractors: Respect your accountability but may feel squeezed if deadlines are set without flexibility.",
            resistanceCosts: [
              "Burn out your small team by pushing for results without enough recovery or support.",
              "Sacrifice long-term growth by prioritizing short-term wins over sustainable systems.",
              "Reduce innovation if experiments are dismissed for not producing immediate returns.",
              "Weaken relationships if clients and partners feel transactional rather than valued.",
            ],
            growthPath: [
              "Pair outcome goals with process improvements to strengthen long-term capacity.",
              "Celebrate learning and progress, not just final results.",
              "Allow space for trial projects that may not yield instant returns but build future growth.",
              "Reframe achievement as delivering results and building resilience so the business can scale sustainably.",
            ],
          },
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel motivated by your drive for results but may experience burnout if the pressure never eases.\n• Clients: Value your reliability and focus on outcomes but may sense strain if short-term delivery overshadows long-term service quality.\n• Vendors/Partners: Respect your discipline but may feel squeezed if deadlines or targets are prioritized over relationships.",
          resistanceCosts: [
            "Push the business toward quick wins while long-term strategy suffers.",
            "Create employee fatigue and turnover if results consistently outweigh well-being.",
            "Limit innovation if the focus stays only on proven outcomes.",
            "Reduce client trust if chasing results impacts consistency or service quality.",
          ],
          growthPath: [
            "Pair every results push with one action that supports long-term growth.",
            "Celebrate progress and process improvements, not just final outcomes.",
            "Balance performance demands with attention to employee sustainability.",
            "Reframe success as building a durable, trusted business, not just hitting the next target.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel driven to meet goals but may experience fatigue if pressure for short-term results overshadows balance.\n• Leadership Team/Managers: Respect your focus on outcomes but may see rigidity when trade-offs are required for long-term growth.\n• Customers/Stakeholders: Value your reliability but may lose trust if near-term delivery compromises consistency or innovation.",
          resistanceCosts: [
            "Push the business toward short-term wins while long-term positioning suffers.",
            "Create burnout across teams if expectations remain constantly high.",
            "Limit innovation if all focus goes to proven, measurable results.",
            "Weaken customer or stakeholder confidence if sustainability is sacrificed for speed.",
          ],
          growthPath: [
            "Pair every push for results with one action that strengthens future resilience.",
            "Recognize and reward process improvements, not just final outcomes.",
            "Balance quarterly or annual targets with investments in innovation.",
            "Reframe success as building a durable company that performs now and thrives long term.",
          ],
        },
      },
    },
  ],

  questions: {
    direct: [
      {
        id: "q1",
        type: "direct",
        text: "I feel more confident advancing initiatives when a long-range framework is firmly in place.",
        archetype: "strategic-architect",
      },
      {
        id: "q2",
        type: "direct",
        text: "I hesitate to commit organizational resources until a structured roadmap has been validated.",
        archetype: "strategic-architect",
      },
      {
        id: "q9",
        type: "direct",
        text: "I am most effective when I give others the freedom to design their own approach.",
        archetype: "empowering-delegator",
      },
      {
        id: "q10",
        type: "direct",
        text: "I prefer to step back once expectations are set and trust the team to execute.",
        archetype: "empowering-delegator",
      },
      {
        id: "q17",
        type: "direct",
        text: "I resist advancing initiatives until they fully reflect my original vision.",
        archetype: "vision-driven-innovator",
      },
      {
        id: "q18",
        type: "direct",
        text: "I advocate for disruptive strategies, even if they unsettle established practices or stakeholder confidence.",
        archetype: "vision-driven-innovator",
      },
      {
        id: "q25",
        type: "direct",
        text: "In executive debates, I prioritize maintaining visible unity, even when issues remain unresolved.",
        archetype: "collaborative-harmonizer",
      },
      {
        id: "q26",
        type: "direct",
        text: "I focus on preserving civility and alignment in executive forums, sometimes at the expense of surfacing deeper conflict.",
        archetype: "collaborative-harmonizer",
      },
      {
        id: "q33",
        type: "direct",
        text: "I am most energized when driving bold pivots, even if alignment is incomplete.",
        archetype: "decisive-change-agent",
      },
      {
        id: "q34",
        type: "direct",
        text: "I often push for bold moves even when stability might be disrupted.",
        archetype: "decisive-change-agent",
      },
      {
        id: "q41",
        type: "direct",
        text: "I default to protecting stability, even when it means delaying bold strategic bets.",
        archetype: "people-centric-coach",
      },
      {
        id: "q42",
        type: "direct",
        text: "I often invest extra time in supporting individual growth.",
        archetype: "people-centric-coach",
      },
      {
        id: "q49",
        type: "direct",
        text: "I default to protecting stability, even when it means delaying bold strategic bets.",
        archetype: "risk-aware-stabilizer",
      },
      {
        id: "q50",
        type: "direct",
        text: "I emphasize stability over bold experimentation.",
        archetype: "risk-aware-stabilizer",
      },
      {
        id: "q57",
        type: "direct",
        text: "I prioritize quarterly performance metrics as the primary measure of leadership success.",
        archetype: "outcome-driven-achiever",
      },
      {
        id: "q58",
        type: "direct",
        text: "I feel validated when results are immediate and visible, even if long-term positioning is less clear.",
        archetype: "outcome-driven-achiever",
      },
    ],
    oblique: [
      {
        id: "q3",
        type: "oblique",
        text: "When unexpected challenges arise, I typically:",
        archetype: "strategic-architect",
        options: [
          {
            value: "A",
            text: "Adapt quickly and change course as needed.",
            archetypeScore: 1,
          },
          {
            value: "B",
            text: "Prefer to stick to the original strategic plan.",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "Seek input from the team to adjust the plan.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q4",
        type: "oblique",
        text: "I believe that a well-defined long-term strategy is more important than immediate flexibility.",
        archetype: "strategic-architect",
      },
      {
        id: "q11",
        type: "oblique",
        text: "When delegation goes well, it’s because:",
        archetype: "empowering-delegator",
        options: [
          {
            value: "A",
            text: "I stayed closely involved throughout.",
            archetypeScore: 1,
          },
          {
            value: "B",
            text: "I gave the team ownership and let them lead.",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "I balanced oversight with autonomy.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q12",
        type: "oblique",
        text: "I believe people perform best when:",
        archetype: "empowering-delegator",
        options: [
          {
            value: "A",
            text: "They are given freedom and ownership.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "They have clear supervision and accountability.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "They have frequent input from leaders.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q19",
        type: "oblique",
        text: "When introducing innovation, I tend to:",
        archetype: "vision-driven-innovator",
        options: [
          {
            value: "A",
            text: "Push for bold new concepts, even if risky.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Wait until ideas are proven and safe.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Adapt old strategies to fit new challenges.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q20",
        type: "oblique",
        text: "I believe progress happens when:",
        archetype: "vision-driven-innovator",
        options: [
          {
            value: "A",
            text: "Teams improve existing processes.",
            archetypeScore: 1,
          },
          {
            value: "B",
            text: "Leaders drive bold innovation forward.",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "Risks are minimized until certainty exists.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q27",
        type: "oblique",
        text: "When conflict arises, I believe:",
        archetype: "collaborative-harmonizer",
        options: [
          {
            value: "A",
            text: "Direct debate strengthens solutions.",
            archetypeScore: 1,
          },
          {
            value: "B",
            text: "Harmony is more important than friction.",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "It’s best to delay decisions until emotions cool down.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q28",
        type: "oblique",
        text: "I feel most confident when:",
        archetype: "collaborative-harmonizer",
        options: [
          {
            value: "A",
            text: "The group reaches consensus.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Decisions are made quickly and firmly.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "The leader takes sole accountability.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q35",
        type: "oblique",
        text: "When organizations face uncertainty, I believe:",
        archetype: "decisive-change-agent",
        options: [
          {
            value: "A",
            text: "Bold action restores confidence.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Careful analysis is more valuable.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Consensus reduces disruption.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q36",
        type: "oblique",
        text: "My best results come from:",
        archetype: "decisive-change-agent",
        options: [
          { value: "A", text: "Quick, decisive changes.", archetypeScore: 5 },
          { value: "B", text: "Slow, steady improvements.", archetypeScore: 1 },
          {
            value: "C",
            text: "Maintaining what’s already working.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q43",
        type: "oblique",
        text: "When leading, I believe:",
        archetype: "people-centric-coach",
        options: [
          {
            value: "A",
            text: "Coaching is central to leadership.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Results matter more than development.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Autonomy teaches more than feedback.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q44",
        type: "oblique",
        text: "I feel most effective when:",
        archetype: "people-centric-coach",
        options: [
          {
            value: "A",
            text: "My team grows professionally.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "We deliver strong results quickly.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Conflict is avoided in the process.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q51",
        type: "oblique",
        text: "When facing uncertainty, I believe:",
        archetype: "risk-aware-stabilizer",
        options: [
          {
            value: "A",
            text: "It’s safer to protect stability.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Boldness ensures long-term gains.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Collaboration reduces exposure.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q52",
        type: "oblique",
        text: "My best outcomes occur when:",
        archetype: "risk-aware-stabilizer",
        options: [
          {
            value: "A",
            text: "I avoid risks that could destabilize.",
            archetypeScore: 5,
          },
          { value: "B", text: "I take ambitious bets.", archetypeScore: 1 },
          {
            value: "C",
            text: "I coach others into stretch opportunities.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q59",
        type: "oblique",
        text: "When leading, I believe:",
        archetype: "outcome-driven-achiever",
        options: [
          {
            value: "A",
            text: "Results matter more than process.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Growth and learning matter most.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Balance between both is key.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q60",
        type: "oblique",
        text: "I feel successful when:",
        archetype: "outcome-driven-achiever",
        options: [
          {
            value: "A",
            text: "Immediate results are delivered.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "The team’s long-term skills improve.",
            archetypeScore: 1,
          },
          {
            value: "C",
            text: "Consensus is reached without conflict.",
            archetypeScore: 3,
          },
        ],
      },
    ],
    scenario: [
      {
        id: "q5",
        type: "scenario",
        text: "Your organization is facing a sudden market shift that wasn’t in your original strategy. Do you:",
        archetype: "strategic-architect",
        options: [
          {
            value: "a",
            text: "Adjust the strategic plan immediately to respond.",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "Stick to the existing plan and monitor the impact.",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Convene a team meeting to gather diverse perspectives first.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q6",
        type: "scenario",
        text: "A board member pushes for a market pivot before the plan is complete. Do you:",
        archetype: "strategic-architect",
        options: [
          {
            value: "a",
            text: "Insist on finalizing the roadmap first,",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Move ahead with partial clarity,",
            archetypeScore: 1,
          },
          {
            value: "c",
            text: "Test a pilot while refining strategy.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q13",
        type: "scenario",
        text: "A high stakes project is assigned to your team. Do you:",
        archetype: "empowering-delegator",
        options: [
          {
            value: "a",
            text: "Personally take charge to ensure success.",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "Assign ownership to a capable team member and support them when asked.",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Share leadership responsibilities across multiple stakeholders.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q14",
        type: "scenario",
        text: "A team member takes a risk and fails. You:",
        archetype: "empowering-delegator",
        options: [
          {
            value: "a",
            text: "Step in to take control of future decisions.",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "See it as part of their growth and continue empowering them.",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Reassign them to safer tasks.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q21",
        type: "scenario",
        text: "Your team’s version of a concept changes the original design. Do you:",
        archetype: "vision-driven-innovator",
        options: [
          {
            value: "a",
            text: "Let their approach move forward.",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "Rework it to preserve your original intent.",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Blend both approaches into a compromise.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q22",
        type: "scenario",
        text: "A competitor releases a disruptive offering. Your concept is still in refinement. Do you:",
        archetype: "vision-driven-innovator",
        options: [
          {
            value: "a",
            text: "Hold for full alignment with your vision.",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Release an imperfect version.",
            archetypeScore: 1,
          },
          { value: "c", text: "Pilot-test to keep pace.", archetypeScore: 3 },
        ],
      },
      {
        id: "q29",
        type: "scenario",
        text: "A peer suggests a direction you disagree with. You:",
        archetype: "collaborative-harmonizer",
        options: [
          {
            value: "a",
            text: "Challenge their perspective directly.",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "Step back to avoid tension.",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Suggest a compromise that blends both views.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q30",
        type: "scenario",
        text: "our executive team is divided on whether to pursue a risky market expansion.  Do You:",
        archetype: "collaborative-harmonizer",
        options: [
          {
            value: "a",
            text: "Extend debate to preserve consensus.",
            archetypeScore: 5,
          },
          { value: "b", text: "Push for a quick decision.", archetypeScore: 1 },
          {
            value: "c",
            text: "Escalate to board for alignment..",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q37",
        type: "scenario",
        text: "A major competitor announces a disruptive shift. Do you:",
        archetype: "decisive-change-agent",
        options: [
          {
            value: "a",
            text: "Immediately pivot strategy.",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Hold for analysis before responding.",
            archetypeScore: 1,
          },
          {
            value: "c",
            text: "Pilot-test a rapid adjustment.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q38",
        type: "scenario",
        text: "The board resists a bold idea you propose. You:",
        archetype: "decisive-change-agent",
        options: [
          {
            value: "a",
            text: "Push forward with urgency anyway.",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Revise the idea until it gains support.",
            archetypeScore: 1,
          },
          {
            value: "c",
            text: "Drop it in favor of stability.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q45",
        type: "scenario",
        text: "A struggling team member slows performance. You:",
        archetype: "people-centric-coach",
        options: [
          {
            value: "a",
            text: "Reassign them to minimize disruption.",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "Coach them through the challenge, even if it delays results.",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Focus your attention on stronger performers.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q46",
        type: "scenario",
        text: "You are asked to cut training budgets for efficiency. You:",
        archetype: "people-centric-coach",
        options: [
          {
            value: "a",
            text: "Push to protect development resources.",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Accept the cuts and reprioritize.",
            archetypeScore: 1,
          },
          { value: "c", text: "Delay to negotiate later.", archetypeScore: 3 },
        ],
      },
      {
        id: "q53",
        type: "scenario",
        text: "The board pressures for bold entry into a volatile market. Do you: a):",
        archetype: "risk-aware-stabilizer",
        options: [
          {
            value: "a",
            text: "Delay until risk controls are certain.",
            archetypeScore: 5,
          },
          { value: "b", text: "Approve a phased entry,", archetypeScore: 3 },
          {
            value: "c",
            text: "Move decisively to seize the window",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "q54",
        type: "scenario",
        text: "A new strategy involves uncertainty and cultural change. You:",
        archetype: "risk-aware-stabilizer",
        options: [
          {
            value: "a",
            text: "Slow-roll the change to reduce exposure.",
            archetypeScore: 5,
          },
          { value: "b", text: "Push forward quickly.", archetypeScore: 1 },
          { value: "c", text: "Pilot-test before scaling.", archetypeScore: 3 },
        ],
      },
      {
        id: "q61",
        type: "scenario",
        text: "The board pressures you to show quarterly performance. You:",
        archetype: "outcome-driven-achiever",
        options: [
          {
            value: "a",
            text: "Focus on visible wins to prove results.",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Stay firm on long-term strategy.",
            archetypeScore: 1,
          },
          {
            value: "c",
            text: "Reframe the conversation to emphasize growth.",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "q62",
        type: "scenario",
        text: "You’re leading a team project. Do you:",
        archetype: "outcome-driven-achiever",
        options: [
          {
            value: "a",
            text: "Push hard for clear deliverables on time.",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Allow flexibility to focus on creativity.",
            archetypeScore: 1,
          },
          {
            value: "c",
            text: "Coach the team through learning over results.",
            archetypeScore: 3,
          },
        ],
      },
    ],
    forcedChoice: [
      {
        id: "q7",
        statements: [
          { text: "I rely on a structured strategic roadmap.", archetype: "strategic-architect" },
          {
            text: "I thrive on adapting quickly to new information.",
            archetype: "decisive-change-agent",
          },
          { text: "I focus on maintaining team harmony.", archetype: "collaborative-harmonizer" },
          { text: "I prioritize mentoring my team members.", archetype: "people-centric-coach" },
        ],
      },
      {
        id: "q8",
        statements: [
          {
            text: "I feel most comfortable when we have a solid, long-term strategy.",
            archetype: "strategic-architect",
          },
          {
            text: "I enjoy taking bold risks to achieve results.",
            archetype: "decisive-change-agent",
          },
          {
            text: "I prefer to ensure stability and minimize risks.",
            archetype: "risk-aware-stabilizer",
          },
          {
            text: "I prioritize team input in decision-making.",
            archetype: "collaborative-harmonizer",
          },
        ],
      },
      {
        id: "q15",
        statements: [
          { text: "I trust my team to own decisions.", archetype: "empowering-delegator" },
          { text: "I rely on long-term structured plans.", archetype: "strategic-architect" },
          { text: "I thrive in crises and fast pivots.", archetype: "decisive-change-agent" },
          {
            text: "I focus on minimizing risks and uncertainty.",
            archetype: "risk-aware-stabilizer",
          },
        ],
      },
      {
        id: "q16",
        statements: [
          {
            text: "I empower others to take full accountability.",
            archetype: "empowering-delegator",
          },
          {
            text: "I hold tightly to my vision until it’s realized.",
            archetype: "strategic-architect",
          },
          {
            text: "I ensure quick wins and measurable results.",
            archetype: "outcome-driven-achiever",
          },
          { text: "I prioritize harmony when conflicts arise.", archetype: "collaborative-harmonizer" },
        ],
      },
      {
        id: "q23",
        statements: [
          {
            text: "I prefer to refine ideas until they’re polished.",
            archetype: "strategic-architect",
          },
          {
            text: "I empower others to make their own decisions.",
            archetype: "empowering-delegator",
          },
          { text: "I ensure stability by reducing risks.", archetype: "risk-aware-stabilizer" },
          { text: "I thrive in high-pressure emergencies.", archetype: "decisive-change-agent" },
        ],
      },
      {
        id: "q24",
        statements: [
          { text: "I prioritize creativity and vision.", archetype: "vision-driven-innovator" },
          { text: "I prefer consensus to avoid conflict.", archetype: "collaborative-harmonizer" },
          { text: "I focus on near-term outcomes.", archetype: "outcome-driven-achiever" },
          { text: "I rely on structured long-term strategy.", archetype: "strategic-architect" },
        ],
      },
      {
        id: "q31",
        statements: [
          { text: "I smooth disagreements to keep the peace.",
            archetype: "collaborative-harmonizer" },
          { text: "I thrive when fast pivots are required.",
            archetype: "decisive-change-agent" },
          { text: "I keep control over the vision narrative.",
            archetype: "vision-driven-innovator" },
          { text: "I focus on immediate results.",
            archetype: "outcome-driven-achiever" },
        ],
      },
      {
        id: "q32",
        statements: [
          {
            text: "I prioritize consensus even when time is short.",
            archetype: "collaborative-harmonizer",
          },
          { text: "I prefer structured long term strategy.",
            archetype: "strategic-architect" },
          { text: "I empower others to own their decisions.",
            archetype: "empowering-delegator" },
          {
            text: "I ensure risks are minimized before acting.",
            archetype: "risk-aware-stabilizer",
          },
        ],
      },
      {
        id: "q39",
        statements: [
          { text: "I thrive when change is urgent.",
            archetype: "decisive-change-agent" },
          {
            text: "I prefer long-term structure and stability.",
            archetype: "strategic-architect",
          },
          { text: "I cushion feedback to maintain harmony.",
            archetype: "collaborative-harmonizer" },
          { text: "I emphasize short-term measurable wins.",
            archetype: "outcome-driven-achiever" },
        ],
      },
      {
        id: "q40",
        statements: [
          { text: "I act boldly under pressure.",
            archetype: "decisive-change-agent" },
          { text: "I refine ideas until they are flawless.",
            archetype: "vision-driven-innovator" },
          { text: "I delegate fully and step back.",
            archetype: "empowering-delegator" },
          { text: "I prioritize minimizing risks.",
            archetype: "risk-aware-stabilizer" },
        ],
      },
      {
        id: "q47",
        statements: [
          {
            text: "I focus on growing others’ potential.",
            archetype: "people-centric-coach",
          },
          {
            text: "I act decisively under pressure.",
            archetype: "decisive-change-agent",
          },
          { text: "I refine ideas until they feel perfect.",
            archetype: "vision-driven-innovator" },
          {
            text: "I minimize risks before committing.",
            archetype: "risk-aware-stabilizer",
          },
        ],
      },
      {
        id: "q48",
        statements: [
          {
            text: "I invest in coaching even when results may slow.",
            archetype: "people-centric-coach",
          },
          { text: "I deliver immediate outcomes.",
            archetype: "outcome-driven-achiever" },
          {
            text: "I emphasize consensus and harmony.",
            archetype: "collaborative-harmonizer",
          },
          {
            text: "I rely on long-term structured planning.",
            archetype: "strategic-architect",
          },
        ],
      },
      {
        id: "q55",
        statements: [
          { text: "I prioritize protecting stability.",
            archetype: "risk-aware-stabilizer" },
          { text: "I thrive most during crises.",
            archetype: "decisive-change-agent" },
          { text: "I refine plans until they are flawless.",
            archetype: "vision-driven-innovator" },
          {
            text: "I empower others to make their own calls. I minimize risks before moving forward.",
            archetype: "strategic-architect",
          },
          { text: "I smooth over disagreements for harmony.",
            archetype: "collaborative-harmonizer" },
          { text: "I focus more on immediate results.",
            archetype: "outcome-driven-achiever" },
          { text: "I prioritize structured strategy.",
            archetype: "strategic-architect" },
        ],
      },
      {
        id: "q63",
        statements: [
          {
            text: "I emphasize measurable outcomes.",
            archetype: "outcome-driven-achiever",
          },
          {
            text: "I thrive in urgent crises.",
            archetype: "decisive-change-agent",
          },
          { text: "I refine ideas until they’re perfect.", archetype: "strategic-architect" },
          { text: "I emphasize consensus over conflict.",
            archetype: "collaborative-harmonizer" },
        ],
      },
      {
        id: "q64",
        statements: [
          { text: "I focus on results above all else.",
            archetype: "outcome-driven-achiever" },
          { text: "I protect stability and minimize risk.",
            archetype: "risk-aware-stabilizer" },
          { text: "I empower others to lead autonomously.",
            archetype: "empowering-delegator" },
          {
            text: "I build strategy around long-term structure.",
            archetype: "strategic-architect",
          },
        ],
      },
    ],
    balancing: [
      {
        id: "q65",
        type: "balancing",
        text: "I am comfortable delegating major decisions without re-checking the details myself.",
        archetype: "empowering-delegator",
        isReverseCoded: true,
      },
      {
        id: "q66",
        type: "balancing",
        text: "I share early-stage ideas with my peers, even if they are not yet polished.",
        archetype: "vision-driven-innovator",
        isReverseCoded: true,
      },
      {
        id: "q67",
        type: "balancing",
        text: "I deliver direct feedback promptly, even when I know it may create discomfort.",
        archetype: "decisive-change-agent",
        isReverseCoded: true,
      },
      {
        id: "q68",
        type: "balancing",
        text: "I am willing to ask for help or input from other executives when the stakes are high.",
        archetype: "collaborative-harmonizer",
        isReverseCoded: true,
      },
      {
        id: "q69",
        type: "balancing",
        text: "I prioritize preventative planning over reacting to crises.",
        archetype: "strategic-architect",
        isReverseCoded: true,
      },
      {
        id: "q70",
        type: "balancing",
        text: "I can disagree respectfully with senior peers even when it risks tension.",
        archetype: "collaborative-harmonizer",
        isReverseCoded: true,
      },
      {
        id: "q71",
        type: "balancing",
        text: "I defend long-term strategy even when short-term performance pressure is intense.",
        archetype: "strategic-architect",
        isReverseCoded: true,
      },
      {
        id: "q72",
        type: "balancing",
        text: "I address underperformance in senior leaders directly and without delay.",
        archetype: "people-centric-coach",
        isReverseCoded: true,
      },
      {
        id: "q73",
        type: "balancing",
        text: "I trust my leadership team to represent our work externally without me stepping in.",
        archetype: "empowering-delegator",
        isReverseCoded: true,
      },
      {
        id: "q74",
        type: "balancing",
        text: "I welcome input that significantly reshapes my original vision.",
        archetype: "vision-driven-innovator",
        isReverseCoded: true,
      },
      {
        id: "q75",
        type: "balancing",
        text: "I view healthy conflict as necessary for stronger decisions.",
        archetype: "collaborative-harmonizer",
        isReverseCoded: true,
      },
      {
        id: "q76",
        type: "balancing",
        text: "I share my own leadership challenges with my team when it helps build trust.",
        archetype: "people-centric-coach",
        isReverseCoded: true,
      },
      {
        id: "q77",
        type: "balancing",
        text: "I maintain focus and composure even without a crisis driving urgency.",
        archetype: "decisive-change-agent",
        isReverseCoded: true,
      },
      {
        id: "q78",
        type: "balancing",
        text: "I prioritize decisive action over waiting for full consensus.",
        archetype: "decisive-change-agent",
        isReverseCoded: true,
      },
      {
        id: "q79",
        type: "balancing",
        text: "I commit to bold strategic bets with uncertainty if they protect the long-term future.",
        archetype: "risk-aware-stabilizer",
        isReverseCoded: true,
      },
      {
        id: "q80",
        type: "balancing",
        text: "I raise systemic or cultural issues even if they may cause discomfort in the short term.",
        archetype: "outcome-driven-achiever",
        isReverseCoded: true,
      },
    ],
  },

  scoring: {
    likertScale: LIKERT_SCALE,
    forcedChoiceMost: 2,
    forcedChoiceLeast: -1,
    scenarioArchetypeLinked: 5,
    scenarioNeutral: 3,
    scenarioOpposite: 1,
    resistanceLevels: {
      low: { min: 0, max: 34 },
      moderate: { min: 35, max: 54 },
      high: { min: 55, max: 100 },
    },
  },
  specialScenarios: [
    {
      id: "low_resistance",
      title: "Low Resistance Profile (Scores mostly below 34 across archetypes)",
      condition: {
        type: 'all_low',
        thresholds: { low: 34 }
      },
      content: {
        firstKnowThis: "Your profile indicates low resistance across all eight archetypes. Rather than being pulled strongly into one pattern, you demonstrate adaptability and balanced leadership behaviors. This doesn't mean you never face resistance — it means your resistance rarely solidifies into a dominant style that drags enterprise outcomes.",
        whatThisLooksLike: [
          "You flex easily across contexts without becoming locked into one approach.",
          "Peers and stakeholders see you as balanced and steady under pressure.",
          "Resistance still shows up situationally, but it tends to pass quickly rather than define your leadership."
        ],
        strengthsHiddenInside: [
          "Ability to adapt leadership stance to fit the moment without being constrained by one dominant style.",
          "Perceived as steady and reliable, which strengthens trust with peers, boards, and investors.",
          "Naturally positioned to act as an integrator, bridging gaps between leaders with stronger resistance patterns."
        ],
        potentialRisks: [
          "Boards or investors may misinterpret adaptability as lack of conviction, creating doubt about your leadership brand.",
          "Subtle resistances can remain hidden and reappear in high-stakes moments, catching others off guard.",
          "Without conscious reflection, you may underestimate how small frictions compound, leading to unnoticed drag on enterprise performance."
        ],
        growthPath: [
          "Leverage your balanced stance to lead cross-functional transformation, where adaptability is critical.",
          "Build routines of reflection to spot early warning signs of resistance before they escalate.",
          "Strengthen your profile by articulating a signature leadership identity so stakeholders see consistency, not just flexibility."
        ]
      }
    },
    {
      id: "moderate_resistance",
      title: "Moderate Resistance Profile (Scores mostly between 35–54 across archetypes)",
      condition: {
        type: 'all_moderate',
        thresholds: { moderate: 35 }
      },
      content: {
        firstKnowThis: "Your profile shows moderate resistance across multiple archetypes. You have identifiable tendencies — but none dominate so strongly that they define your leadership. This middle ground provides both flexibility and challenge: you can shift styles, but resistance may still create drag in moments of stress.",
        whatThisLooksLike: [
          "You flex across contexts, but recurring frictions are noticeable to peers and stakeholders.",
          "Resistance shows up as inconsistencies — decisive in some moments, hesitant in others; collaborative in one forum, rigid in another.",
          "Peers may admire your balance but occasionally feel uncertainty about your default style."
        ],
        strengthsHiddenInside: [
          "You can draw on multiple leadership archetypes, giving you versatility across situations.",
          "Moderate resistance signals that you are not locked into one rigid pattern, preserving your ability to adapt.",
          "Boards and investors may value this as a balanced risk profile, particularly in volatile markets."
        ],
        potentialRisks: [
          "Inconsistent signals can dilute influence with boards or peers, as stakeholders may not know which version of you will show up.",
          "Moderate resistance across several areas can combine into hidden organizational drag, even if no single archetype is dominant.",
          "Missed opportunities can occur when frictions accumulate, creating hesitation in decisive moments."
        ],
        growthPath: [
          "Identify your top two or three moderate archetypes and study how they interact — when they reinforce each other and when they conflict.",
          "Focus on pattern consistency: clarify your leadership stance so stakeholders feel steady confidence.",
          "Select one archetype at a time to actively manage for 90 days, measure impact at the enterprise level, then shift focus."
        ]
      }
    },
    {
      id: "mixed_balanced_highs",
      title: "Mixed / Balanced Highs Profile (No single archetype dominates; several score high)",
      condition: {
        type: 'mixed_balanced_highs'
      },
      content: {
        firstKnowThis: "Your profile shows multiple archetypes at high resistance levels, with no single dominant pattern. This indicates that resistance shows up in several different ways depending on context — you may be highly structured in some situations, overly people-focused in others, or push change urgently when momentum feels stuck.",
        whatThisLooksLike: [
          "Resistance is context-sensitive: your style shifts based on situation, but not always predictably.",
          "Stakeholders may find you harder to \"pin down,\" since your leadership pattern isn't singular but multifaceted.",
          "In high-stakes environments, this can create both flexibility and volatility."
        ],
        strengthsHiddenInside: [
          "Ability to draw from multiple leadership strengths (visionary, stabilizer, coach, change agent) depending on the context.",
          "Seen as multidimensional, which can be a powerful asset when integrated intentionally.",
          "Potential to act as a connector across diverse leadership archetypes, translating between different executive mindsets."
        ],
        potentialRisks: [
          "Strategic confusion: teams, peers, and boards may find it unclear which version of you will show up under pressure.",
          "Inconsistent enterprise execution: high resistance in multiple archetypes can fragment alignment and momentum.",
          "Reputational drag: boards or investors may perceive you as lacking a clear leadership brand, reducing succession credibility.",
          "Volatility: when multiple resistances activate simultaneously, it can create decision whiplash, slowing execution."
        ],
        growthPath: [
          "Rather than trying to reduce all resistances at once, identify where the enterprise cost is highest (e.g., investor confidence, strategic agility, talent accountability).",
          "Anchor yourself in a primary leadership identity while actively managing secondary resistances.",
          "Develop clarity in how you present yourself to boards and stakeholders, ensuring they see consistency even as you flex behind the scenes.",
          "Treat your mixed profile as a platform for integration: deliberately connect strengths across archetypes into a coherent leadership brand."
        ]
      }
    }
  ]
};

// Export all assessment categories (currently only leadership, but extensible)
export const ASSESSMENT_CATEGORIES: Record<string, AssessmentCategory> = {
  leadership: LEADERSHIP_CATEGORY,
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

  // Filter out special scenario archetypes that are used for results display but shouldn't be selectable
  const actualArchetypes = category.archetypes.filter(archetype => 
    !['low_resistance', 'moderate_resistance'].includes(archetype.id)
  );

  return actualArchetypes;
}
