// Central Questions Data File for Middle Management Assessment
// This file contains the middle management assessment category with questions, options, archetypes, and scoring logic

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
    peers?: string;
    seniorLeaders?: string;
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

// Middle Management Assessment Data
const MIDDLE_MANAGEMENT_CATEGORY: AssessmentCategory = {
  id: "middle-management",
  name: "Middle Management Assessment",
  description:
    "Comprehensive middle management style and resistance pattern assessment based on 8 archetypes",

  archetypes: [
    {
      id: "micromanager",
      name: "Micromanager",
      description:
        "Holds high standards but often over-invests in control and detail-checking",
      traits: [
        "High standards for quality",
        "Attention to detail",
        "Control-oriented",
        "Risk-averse in delegation",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach delegation, trust, and team ownership.\nAt your best, you are a manager who holds high standards. You care deeply about quality, know what “good work” looks like, and your attention to detail helps teams avoid costly mistakes. Senior leaders often trust you because your output is consistent and dependable.\nBut when resistance is high, these strengths narrow into control. Instead of empowering others, you may step in too often, recheck every detail, or redo work before it goes upward. To you, this feels like protecting quality — but to to your team, it can feel like lack of trust. To senior leaders, it can create concerns about whether you can scale beyond individual contribution.\nThis pattern is called the Micromanager. It does not mean you lack leadership ability. It means your resistance shows up as over-investment in control. When balanced, your standards become an asset. But left unchecked, this pattern can block team growth, limit your promotability, and make it harder for you to step into broader leadership roles.",
      strengthsInsights: [
        "Strong standards ensure quality and protect reputation.",
        "Hands-on knowledge builds credibility with both team and leaders.",
        "Detail orientation prevents errors from slipping upward.",
        "Reliability makes you a go-to for critical tasks.",
      ],
      resistanceCosts: [
        "Burn out managers by keeping too much work on their desk.",
        "Reduce team initiative, as employees wait for approval instead of acting.",
        "Create delivery bottlenecks when everything requires your sign-off.",
        "Signal to senior leaders that you are not ready for larger scope or promotion.",
        "Limit your career path by keeping you in “detail manager” mode instead of preparing you for strategic leadership.",
      ],
      developmentAreas: [
        "Improve delegation and trust in team capabilities",
        "Focus on outcomes rather than processes",
        "Develop coaching skills over direct intervention",
      ],
      growthPath: {
        immediateShifts: [
          "Choose one task this month to delegate fully — no rechecking, no redoing.",
          "Acknowledge publicly when a team member’s work succeeds without your intervention.",
        ],
        strategicPractices: [
          "Build “trust + verify” systems: delegate ownership but review outcomes at milestones, not every step.",
          "Clarify upfront expectations so quality is met without your constant input.",
          "Ask your manager to hold you accountable for reducing rework habits.",
        ],
        longTermGrowth: [
          "Reframe your leadership identity: success is not about controlling every detail, but about developing others to deliver at scale.",
          "Track your promotion readiness: senior leaders look for managers who empower, not those who redo.",
          "Model how to balance standards with trust, showing others that true leadership means multiplying output through people, not doing more yourself.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Personally recheck or redo team deliverables before releasing them.",
        "Hesitate to fully delegate important tasks.",
        "Struggle to accept approaches that differ from their own style.",
        "Step in quickly when mistakes happen, instead of coaching through them.",
        "Focus on details at the expense of developing independence in the team.",
      ],
      rootCauses: [
        "Early roles where credibility was tied to accuracy and precision.",
        "Work cultures where leaders were held directly responsible for every error.",
        "Past experiences where delegating led to visible failure.",
        "Belief systems that equated “doing it myself” with reliability and value.",
      ],
      beliefsThatDriveResistance: [
        "“If I don’t check, something will slip.”",
        "“My credibility depends on perfect output.”",
        "“Quality is safer in my hands.”",
        "“Delegation creates risk I can’t control.”",
        "“Trust must be earned, not given.”",
      ],
      whatOthersExperience: {
        directReports:
          "Appreciate your clarity but may feel second-guessed. Over time, they become dependent on your approval, which limits their growth.",
        peers:
          "Value your high standards but may see you as slowing projects down. Collaboration suffers if every detail routes back through you.",
        seniorLeaders:
          "Trust your reliability but may question whether you can lead at scale. Micromanagement signals you are stuck in “doing” rather than “leading,” which limits promotion readiness.",
      },
      organizationalTriggers: {
        amplifiers: [
          "High-stakes projects where mistakes feel career-limiting.",
          "Executive scrutiny that prioritizes speed and precision over learning.",
          "Inexperienced or rotating teams that require close oversight.",
        ],
        softeners: [
          "Clear delegation frameworks that define accountability across levels.",
          "Leaders who reward trust and outcomes rather than constant oversight.",
          "Systems that provide visibility without requiring manual checking.",
        ],
      },
      strengthsHiddenInside: [
        "Strong standards ensure quality and protect reputation.",
        "Hands-on knowledge builds credibility with both team and leaders.",
        "Detail orientation prevents errors from slipping upward.",
        "Reliability makes you a go-to for critical tasks.",
      ],
      detailedResistanceCosts: [
        "Burn out managers by keeping too much work on their desk.",
        "Reduce team initiative, as employees wait for approval instead of acting.",
        "Create delivery bottlenecks when everything requires your sign-off.",
        "Signal to senior leaders that you are not ready for larger scope or promotion.",
        "Limit your career path by keeping you in “detail manager” mode instead of preparing you for strategic leadership.",
      ],
      categoryContent: {
        corporate: {
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
            "• Employees: appreciate the clear frameworks you provide but may feel constrained if decision-making remains too centralized.\n• Leadership Team/Department Heads: value your structure but may view you as resistant when fast cross-functional decisions are needed.\n• Customers/Stakeholders: trust your dependability but may lose patience if responsiveness is slowed by layers of control.",
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
        entrepreneur: {
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
        },
      },
      highResistanceCharacteristics: [
        "Under pressure, guidance turns into control.",
        "You re-do work, override decisions, and require frequent check-ins.",
        "Speed from above and variability below push you to become the single source of truth.",
        "This creates delays and drains initiative.",
      ],
    },
    {
      id: "bottleneck-manager",
      name: "Bottleneck Manager",
      description:
        "Struggles to delegate effectively, creating decision bottlenecks",
      traits: [
        "Decision concentration",
        "High involvement",
        "Control retention",
        "Process ownership",
      ],
      detailedDescription:
        "Your results show High Resistance in how you manage decisions, approvals, and workflow.\nAt your best, you are a manager who ensures quality and alignment. You want decisions to be well thought-out, and you protect your team from rushing into mistakes. Senior leaders often appreciate your diligence and desire for consistency.\nBut when resistance is high, this instinct for thoroughness turns into delay. You may hold onto approvals too long, slow down progress while seeking clarity, or require sign-off at every step. To you, this feels responsible — but to to your team, it feels like stalled momentum. To senior leaders, it can look like indecision or lack of scalability.\nThis pattern is called the Bottleneck Manager. It does not mean you lack capability. It means your resistance shows up as holding too much control over flow, which creates drag on execution and can limit your career growth if not managed.",
      strengthsInsights: [
        "Protects quality and reduces avoidable errors.",
        "Ensures consistency across processes.",
        "Builds reputation for thoroughness.",
        "Demonstrates accountability and caution in high-stakes matters.",
      ],
      resistanceCosts: [
        "Slow team productivity and frustrate talent.",
        "Create project delays that damage credibility with stakeholders.",
        "Signal to leaders that you lack agility or scalability.",
        "Limit promotion opportunities if you are seen as stuck in “approval mode.”",
        "Drain your energy by keeping too many small decisions on your desk.",
      ],
      developmentAreas: [
        "Improve delegation of decision-making authority",
        "Develop clearer decision-making frameworks for team members",
        "Focus on coaching others through decisions rather than making them directly",
      ],
      growthPath: {
        immediateShifts: [
          "Choose one routine decision you will no longer approve — push it down.",
          "Set clear deadlines for your own reviews so projects don’t stall.",
        ],
        strategicPractices: [
          "Create decision-rights frameworks: who approves what, with clarity.",
          "Train your team on criteria so they can approve confidently without you.",
          "Use milestones instead of full checkpoints, so progress keeps moving.",
        ],
        longTermGrowth: [
          "Reframe leadership identity: success is enabling throughput, not holding control.",
          "Track instances where faster delegation led to equal or better outcomes.",
          "Model for others how disciplined managers can be thorough without slowing the organization.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Keep decisions at their level longer than necessary.",
        "Require projects to pause until they can review personally.",
        "Hesitate to delegate authority for approvals.",
        "Delay progress in the name of “getting it right.”",
        "Create dependency by positioning themselves as the sole gatekeeper.",
      ],
      rootCauses: [
        "Early roles where being cautious felt safer.",
        "Organizational cultures where control equaled credibility.",
        "Situations where delegating decisions led to visible problems.",
        "Personal identity tied to being the “reliable checker” who prevents errors.",
      ],
      beliefsThatDriveResistance: [
        "“It’s better to be slow than wrong.”",
        "“If I don’t sign off, quality can’t be trusted.”",
        "“Delegating approval is too risky.”",
        "“Responsibility means everything passes through me.”",
        "“Careful leaders are respected leaders.”",
      ],
      whatOthersExperience: {
        directReports:
          "Feel frustrated when work stalls, and may disengage if they lack authority to move projects forward.",
        peers:
          "See you as dependable but may avoid routing work through you if they expect delays.",
        seniorLeaders:
          "Respect your diligence but may question whether you can handle larger scope if decision flow always bottlenecks with you.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Approval-heavy cultures where sign-offs accumulate at your desk.",
          "Senior leaders demanding visibility on every detail of progress.",
          "Cross-functional dependencies that create coordination pressure.",
        ],
        softeners: [
          "Empowered decision rights distributed across managers.",
          "Escalation pathways that move issues forward without waiting for you.",
          "Governance models that value speed of progress over layers of review.",
        ],
      },
      strengthsHiddenInside: [
        "Protects quality and reduces avoidable errors.",
        "Ensures consistency across processes.",
        "Builds reputation for thoroughness.",
        "Demonstrates accountability and caution in high-stakes matters.",
      ],
      detailedResistanceCosts: [
        "Slow team productivity and frustrate talent.",
        "Create project delays that damage credibility with stakeholders.",
        "Signal to leaders that you lack agility or scalability.",
        "Limit promotion opportunities if you are seen as stuck in “approval mode.”",
        "Drain your energy by keeping too many small decisions on your desk.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Direct Reports: Value your expertise but become frustrated with delays and approval bottlenecks.\n• Cross-functional Teams: Appreciate thoroughness but see you as slowing collaborative work.\n• Senior Management: Trust your judgment but question your scalability for larger scope.",
          resistanceCosts: [
            "Slow decision-making across departments, affecting overall organizational agility.",
            "Reduce innovation when team members avoid proposing new ideas due to lengthy approval processes.",
            "Limit your promotability by demonstrating bottlenecking rather than empowering leadership.",
            "Decrease employee engagement when autonomy is restricted by over-involvement.",
          ],
          growthPath: [
            "Delegate routine decisions with clear guidelines and success criteria.",
            "Create decision-making frameworks that enable team autonomy within boundaries.",
            "Focus coaching energy on developing judgment in others rather than making decisions for them.",
            "Track where delegation leads to successful outcomes and use as examples for broader empowerment.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Department Teams: Respect your oversight but feel slowed down by centralized decision-making.\n• Peer Managers: Value your attention to detail but see bottlenecking as limiting cross-departmental speed.\n• Leadership: Appreciate quality control but worry about scalability for growing organization.",
          resistanceCosts: [
            "Create delays that affect customer responsiveness and competitive positioning.",
            "Limit departmental growth and development when decision-making cannot scale beyond your capacity.",
            "Reduce manager development by not allowing others to practice autonomous decision-making.",
            "Signal to leadership that you may not be ready for broader organizational responsibilities.",
          ],
          growthPath: [
            "Establish clear decision-making authority for department leads and trust them to execute.",
            "Replace approval requirements with outcome-based check-ins and coaching.",
            "Create lightweight systems that maintain quality without requiring centralized review.",
            "Model how to balance oversight with empowerment for other managers in the organization.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Team Members: Appreciate your involvement but feel constrained by need for constant approvals.\n• Business Partners: Value thoroughness but become impatient with slow decision cycles.\n• Customers: Trust reliability but may choose competitors when responsiveness is delayed.",
          resistanceCosts: [
            "Slow business responsiveness when market opportunities require quick decisions.",
            "Limit team development and growth by not allowing employees to own outcomes and learn from results.",
            "Create customer satisfaction issues when approvals delay delivery or response times.",
            "Restrict business growth by keeping decision-making capacity tied to your availability.",
          ],
          growthPath: [
            "Delegate customer-facing decisions to front-line team members with clear boundaries.",
            "Trust team judgment for routine operations while focusing your attention on strategic priorities.",
            "Create simple approval processes that maintain quality without creating delays.",
            "Track business results when team members make autonomous decisions within guidelines.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Contractors/Freelancers: Value your standards but feel micromanaged when every detail requires approval.\n• Early Customers: Appreciate thoroughness but may lose patience if responsiveness is slowed by over-checking.\n• You (Self-Perception): Feel safer when everything routes through you, even when it limits speed and growth.",
            resistanceCosts: [
              "Limit business growth by creating bottlenecks that prevent scaling beyond your personal capacity.",
              "Reduce customer satisfaction when approval delays affect delivery or responsiveness.",
              "Prevent development of systems and processes that could operate independently.",
              "Keep you trapped in operational details instead of focusing on business development and growth.",
            ],
            growthPath: [
              "Create simple decision-making criteria that allow contractors and early hires to act autonomously.",
              "Focus your time on customer development and business growth rather than operational approvals.",
              "Build systems that maintain quality without requiring your personal review of every decision.",
              "Track positive outcomes when others make decisions independently to build confidence in delegation.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Small Team: Appreciate your guidance but feel slowed down by centralized decision-making.\n• Key Clients: Value attention to detail but may become frustrated if approvals delay project delivery.\n• Business Partners: Trust your thoroughness but see bottlenecking as limiting partnership responsiveness.",
            resistanceCosts: [
              "Create delivery delays that affect client satisfaction and retention.",
              "Limit team growth and development when employees cannot practice decision-making.",
              "Prevent business scaling by keeping all key decisions dependent on your availability.",
              "Reduce competitive responsiveness when market opportunities require quick action.",
            ],
            growthPath: [
              "Delegate client-facing decisions to team members with clear success criteria.",
              "Create approval processes that maintain quality without creating delays.",
              "Focus coaching on developing team judgment rather than controlling every decision.",
              "Model how to balance oversight with empowerment for sustainable business growth.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Management Team: Value your experience but feel constrained by centralized decision-making.\n• Investors/Advisors: Appreciate thoroughness but may question scalability when growth requires faster decisions.\n• Customers: Trust reliability but may choose competitors who respond more quickly to their needs.",
            resistanceCosts: [
              "Slow market responsiveness when growth opportunities require rapid decision-making.",
              "Limit management development and ownership by not allowing leaders to own outcomes and learn from results.",
              "Reduce investor confidence if bottlenecking suggests inability to scale leadership effectively.",
              "Create customer satisfaction issues when approval delays affect competitive positioning.",
            ],
            growthPath: [
              "Establish clear decision-making authority for department leads and hold them accountable for outcomes.",
              "Replace approval requirements with coaching and outcome-based performance management.",
              "Replace approval requirements with coaching and outcome-based performance management.",
              "Demonstrate to investors and stakeholders how empowering others drives sustainable growth.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "Decision rights collapse to you.",
        "Approvals pile up, priorities stay ambiguous, and risks sit unresolved because everything routes through your desk.",
        "The system slows even when the team is capable.",
        "Nothing moves without you.",
      ],
    },
    {
      id: "firefighter",
      name: "Firefighter",
      description: "Reactive management style focused on crisis resolution",
      traits: [
        "Crisis response",
        "Urgent prioritization",
        "Reactive focus",
        "Problem-solving focus",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach urgency and problem-solving.\nAt your best, you are a manager who thrives under pressure. You jump into crises, solve problems quickly, and keep things moving when others freeze. Teams often admire your energy, and senior leaders value your ability to deliver in the moment.\nBut when resistance is high, urgency becomes your default. You may spend more time reacting than preventing, step into every crisis yourself, or neglect long-term priorities while solving today’s emergencies. To you, this feels like being dependable — but to your team, it can feel chaotic. To senior leaders, it can suggest you’re stuck in “firefighting mode” instead of building scalable systems.\nThis pattern is called the Firefighter. It does not mean you lack strategy. It means your resistance shows up as living in urgency, which can erode stability, burn out your team, and limit career advancement.",
      strengthsInsights: [
        "Brings energy and confidence during disruption.",
        "Keeps teams moving when others feel stuck.",
        "Builds loyalty because people know you’ll “be there” in tough moments.",
        "Prevents paralysis when fast action is needed.",
      ],
      resistanceCosts: [
        "Keep teams stuck in reactive cycles instead of building capacity.",
        "Delay or derail strategic priorities because urgent tasks always take precedence.",
        "Create burnout by pushing constant “all hands on deck” mode.",
        "Limit your promotability if leaders see you as tactical but not strategic.",
        "Damage credibility when prevention opportunities are repeatedly missed.",
      ],
      developmentAreas: [
        "Develop proactive planning and prevention systems",
        "Build capacity for strategic thinking beyond immediate problems",
        "Learn to distinguish between real emergencies and routine challenges",
      ],
      growthPath: {
        immediateShifts: [
          "Identify one recurring issue and commit to solving its root cause, not just the symptoms.",
          "Step back in the next small crisis — coach a team member to handle it instead.",
        ],
        strategicPractices: [
          "Block dedicated time each week for long-term priorities, protected from interruptions.",
          "Track crisis frequency to spot patterns you can prevent.",
          "Celebrate preventative wins as much as urgent saves.",
        ],
        longTermGrowth: [
          "Redefine leadership identity: success is not just solving fires, but preventing them.",
          "Build systems and team capabilities that make you less essential in day-to-day crises.",
          "Demonstrate to senior leaders that you can manage both urgency and strategy — a key marker of promotion readiness.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Focus on urgent problems at the expense of strategic work.",
        "Personally step in when issues arise instead of coaching others to resolve them.",
        "Reward quick fixes over sustainable solutions.",
        "Allow teams to operate in constant reactive mode.",
        "Gain visibility through crisis handling rather than steady performance.",
      ],
      rootCauses: [
        "Past roles where recognition came from “saving the day.”",
        "Teams where preventative work was overlooked but urgency was rewarded.",
        "Managers who modeled firefighting as leadership.",
        "Early career wins tied to high-stakes, last-minute interventions.",
      ],
      beliefsThatDriveResistance: [
        "“If I don’t step in, things will fall apart.”",
        "“My value is in solving problems quickly.”",
        "“Prevention is invisible; action under pressure is what gets noticed.”",
        "“Leadership means being the one people call in a crisis.”",
      ],
      whatOthersExperience: {
        directReports:
          "Appreciate your energy but may burn out if everything feels urgent. They can also become dependent on you to solve issues instead of building independence.",
        peers:
          "Respect your responsiveness but may see you as scattered or reactive, which reduces collaboration.",
        seniorLeaders:
          "Value your reliability in crises but may doubt your readiness for bigger roles if firefighting replaces long-term focus.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Executive escalations that reward urgency over planning.",
          "Weak systems that allow recurring problems to surface.",
          "Cultures that praise heroics and last-minute saves.",
        ],
        softeners: [
          "Structures that emphasize prevention and root-cause problem solving.",
          "Leaders who celebrate predictable delivery as much as crisis response.",
          "Workflows that balance urgency with stability.",
        ],
      },
      strengthsHiddenInside: [
        "Brings energy and confidence during disruption.",
        "Keeps teams moving when others feel stuck.",
        "Builds loyalty because people know you’ll “be there” in tough moments.",
        "Prevents paralysis when fast action is needed.",
      ],
      detailedResistanceCosts: [
        "Keep teams stuck in reactive cycles instead of building capacity.",
        "Delay or derail strategic priorities because urgent tasks always take precedence.",
        "Create burnout by pushing constant “all hands on deck” mode.",
        "Limit your promotability if leaders see you as tactical but not strategic.",
        "Damage credibility when prevention opportunities are repeatedly missed.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Direct Reports: Appreciate your quick response but feel stressed by constant urgency and unpredictability.\n• Cross-functional Partners: Value crisis support but see you as reactive rather than strategic.\n• Senior Management: Trust your problem-solving but question your proactive planning capabilities.",
          resistanceCosts: [
            "Create organizational instability when departments operate in permanent emergency mode.",
            "Reduce strategic initiative success when attention is constantly diverted to urgent matters.",
            "Limit your promotability by demonstrating reactive rather than strategic leadership.",
            "Decrease team effectiveness when members burn out from constant crisis management.",
          ],
          growthPath: [
            "Implement weekly planning sessions to identify and prevent potential problems before they escalate.",
            "Create systems and processes that reduce the frequency of genuine emergencies.",
            "Develop team members' problem-solving skills to handle routine issues independently.",
            "Track the reduction in crisis frequency as evidence of improved proactive management.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Department Teams: Appreciate crisis support but feel exhausted by constant urgency and unpredictability.\n• Peer Managers: Value your responsiveness but see reactive management as limiting departmental stability.\n• Leadership: Trust your problem-solving but worry about sustainable management practices.",
          resistanceCosts: [
            "Create departmental instability that affects overall organizational performance and morale.",
            "Limit growth initiatives when management attention is constantly focused on urgent issues.",
            "Reduce manager effectiveness when team members become dependent on crisis intervention.",
            "Signal inability to manage at scale when problems aren't prevented proactively.",
          ],
          growthPath: [
            "Build preventive systems that address root causes of recurring problems.",
            "Delegate routine problem-solving to team leads and focus on strategic prevention.",
            "Create stable processes that reduce the number of genuine emergencies.",
            "Model proactive management practices for other managers in the organization.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Team Members: Appreciate your crisis support but feel stressed by constant urgency and lack of predictability.\n• Business Partners: Value problem-solving ability but see reactive management as unreliable for planning.\n• Customers: Trust your responsiveness but may lose confidence if problems recur frequently.",
          resistanceCosts: [
            "Create business instability when operations are driven by crisis management rather than planning.",
            "Reduce customer confidence when recurring problems suggest lack of proactive management.",
            "Limit business growth when strategic initiatives are constantly interrupted by urgent issues.",
            "Burn out key team members who become exhausted by working in permanent emergency mode.",
          ],
          growthPath: [
            "Implement simple systems that prevent common problems from becoming customer-facing crises.",
            "Schedule regular planning time to anticipate and prepare for potential challenges.",
            "Train team members to handle routine problems without escalating to crisis level.",
            "Focus strategic attention on building sustainable operations rather than just solving problems.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Early Team/Contractors: Appreciate your problem-solving but feel exhausted by constant urgency and instability.\n• Customers: Value responsiveness but may lose confidence if the same problems recur repeatedly.\n• You (Self-Perception): Feel productive when solving problems but may recognize that constant firefighting prevents growth.",
            resistanceCosts: [
              "Prevent business growth by keeping you trapped in operational problem-solving instead of strategic development.",
              "Reduce customer confidence when recurring problems suggest poor systems and processes.",
              "Limit your ability to build scalable operations that can function without constant intervention.",
              "Create burnout as you become the bottleneck for every problem that needs solving.",
            ],
            growthPath: [
              "Build simple systems and processes that prevent common problems from recurring.",
              "Schedule dedicated time for business development instead of only reacting to immediate issues.",
              "Create problem-solving protocols that don't require your personal intervention for routine challenges.",
              "Track business metrics that improve when fewer genuine emergencies occur.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Small Team: Appreciate crisis support but feel stressed by unpredictable work environment.\n• Key Clients: Value problem-solving responsiveness but may question business stability if issues recur.\n• Business Partners: Trust your commitment but see reactive management as limiting partnership reliability.",
            resistanceCosts: [
              "Create business instability that affects client relationships and partnership opportunities.",
              "Limit growth when strategic initiatives are constantly interrupted by urgent operational issues.",
              "Reduce team effectiveness when employees burn out from working in permanent crisis mode.",
              "Prevent development of scalable systems that could operate without constant owner intervention.",
            ],
            growthPath: [
              "Implement preventive systems that address root causes of recurring client or operational problems.",
              "Delegate routine problem-solving to team members and focus on strategic business development.",
              "Create stable operational processes that reduce the frequency of genuine emergencies.",
              "Build business systems that maintain quality and customer service without requiring constant crisis management.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Management Team: Appreciate crisis leadership but feel exhausted by constant urgency and reactive management.\n• Investors/Advisors: Value problem-solving ability but question scalability when leadership is always in crisis mode.\n• Customers: Trust responsiveness but may prefer more stable competitors for important business partnerships.",
            resistanceCosts: [
              "Limit business scaling when leadership attention is consumed by reactive problem-solving.",
              "Reduce investor confidence if constant crises suggest poor management systems and planning.",
              "Create organizational instability that affects employee retention and customer relationships.",
              "Prevent development of management systems that could operate effectively without constant founder intervention.",
            ],
            growthPath: [
              "Build management systems and processes that prevent common problems from becoming organizational crises.",
              "Develop management team capabilities to handle routine problems without escalating to leadership level.",
              "Create strategic planning processes that anticipate and prepare for potential business challenges.",
              "Demonstrate to investors and stakeholders how proactive management drives sustainable business growth.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "Urgency eclipses strategy.",
        "You chase the loudest flames, reward heroics, and normalize after-hours saves instead of fixing root causes.",
        "The team runs hot.",
        "The same fires keep returning.",
      ],
    },
    {
      id: "overloaded-doer",
      name: "Overloaded Doer",
      description:
        "Takes on on too many individual tasks instead of focusing on management",
      traits: ["Task overload", "Individual contribution", "Time scarcity"],
      detailedDescription:
        "Your results show High Resistance in how you approach workload, delegation, and personal responsibility.\nAt your best, you are a manager who leads by example. You work hard, step in when the team is stretched, and show a strong sense of responsibility. Teams admire your commitment, and senior leaders often view you as reliable and willing to “do what it takes.”\nBut when resistance is high, responsibility becomes overextension. You may take on too many tasks yourself, absorb work meant for others, or struggle to prioritize. To you, it feels like protecting the team or ensuring results — but to your direct reports, it signals you don’t trust them to deliver. To senior leaders, it raises questions about your scalability and ability to lead beyond your own effort.\nThis pattern is called the Overloaded Doer. It does not mean you lack leadership potential. It means your resistance shows up as doing instead of leading, which can stall your career growth and drain team initiative.",
      strengthsInsights: [
        "Demonstrates loyalty and visible commitment.",
        "Builds credibility as someone who “gets things done.”",
        "Inspires teams through personal example.",
        "Creates trust that you won’t abandon responsibilities.",
      ],
      resistanceCosts: [
        "Burn you out while reducing your ability to think strategically.",
        "Limit team growth, since employees aren’t stretched or trusted with big responsibilities.",
        "Slow execution because too much funnels through you.",
        "Signal to leaders that you are a strong contributor but not yet promotable.",
        "Reduce organizational resilience when everything depends on your effort.",
      ],
      developmentAreas: [
        "Improve delegation of tasks and responsibilities",
        "Develop better prioritization and boundary-setting skills",
        "Focus on building team capacity over personal execution",
      ],
      growthPath: {
        immediateShifts: [
          "Identify one task you are currently carrying that your team can take on — delegate it fully.",
          "Set limits on your personal workload and communicate them transparently.",
        ],
        strategicPractices: [
          "Use prioritization frameworks (urgent vs. important) to focus on leadership, not just execution.",
          "Develop your team’s capacity so you don’t need to absorb overflow.",
          "Measure success by what your team delivers, not just what you personally contribute.",
        ],
        longTermGrowth: [
          "Redefine leadership identity: from “hardest worker” to “capacity builder.”",
          "Track delegation wins to reinforce your team’s independence.",
          "Demonstrate to senior leaders that you can scale impact beyond your own output — a key factor for promotion readiness.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Personally take on tasks that could be delegated.",
        "Carry heavier workloads than their teams.",
        "Measure commitment by how much they personally contribute.",
        "Struggle to say “no,” even when overloaded.",
        "Prioritize short-term delivery over building long-term team capacity.",
      ],
      rootCauses: [
        "Organizations where being a “hard worker” was the main path to advancement.",
        "Teams where doing more than others earned recognition.",
        "Cultures that celebrated sacrifice and long hours over balance.",
        "Experiences where delegating led to mistakes that reflected poorly on you.",
      ],
      beliefsThatDriveResistance: [
        "“If I don’t do it, it won’t get done right.”",
        "“The best way to lead is to carry more than others.”",
        "“My value is measured in effort, not just outcomes.”",
        "“Delegating slows things down.”",
        "“Hard work is the only way to prove myself.”",
      ],
      whatOthersExperience: {
        directReports:
          "Respect your commitment but may feel underutilized or distrusted if you keep the hardest work for yourself.",
        peers:
          "Admire your work ethic but may see you as overwhelmed or scattered.",
        seniorLeaders:
          "Value your reliability but may doubt your readiness for bigger roles if your success depends on personal effort rather than scalable leadership.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Chronic understaffing or hiring delays.",
          "Senior leaders who reward “can-do” managers that absorb work.",
          "Multiple competing projects that make saying no difficult.",
        ],
        softeners: [
          "Clear capacity planning that legitimizes limits.",
          "Leaders who value delegation and team development over individual output.",
          "Role clarity that ensures ownership rests with the right level.",
        ],
      },
      strengthsHiddenInside: [
        "Demonstrates loyalty and visible commitment.",
        "Builds credibility as someone who “gets things done.”",
        "Inspires teams through personal example.",
        "Creates trust that you won’t abandon responsibilities.",
      ],
      detailedResistanceCosts: [
        "Burn you out while reducing your ability to think strategically.",
        "Limit team growth, since employees aren’t stretched or trusted with big responsibilities.",
        "Slow execution because too much funnels through you.",
        "Signal to leaders that you are a strong contributor but not yet promotable.",
        "Reduce organizational resilience when everything depends on your effort.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Employees: Respect your commitment but may feel underutilized or distrusted if you keep the hardest work for yourself.\n• Peers/Partners: Admire your work ethic but may see you as overwhelmed or scattered.\n• Clients: Value your reliability but may doubt timely delivery if your success depends on personal effort rather than team scalability.",
          resistanceCosts: [
            "Burn out key employees while reducing strategic thinking capacity.",
            "Limit team growth since employees aren’t trusted with responsibilities.",
            "Slow execution as too much funnels through one person.",
            "Signal to management that you are a contributor but not scalable.",
            "Reduce resilience when everything depends on individual effort.",
          ],
          growthPath: [
            "Delegate routine tasks so projects keep moving through the team.",
            "Balance personal effort with team development for better scalability.",
            "Use systems that ensure quality through delegation, not individual involvement.",
            "Track positive results when team takes ownership and delivers independently.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Respect your commitment but may feel underutilized or distrusted if you keep the hardest work for yourself.\n• Leadership Team/Department Heads: Admire your work ethic but may see you as overwhelmed or scattered.\n• Customers/Stakeholders: Value your reliability but may doubt readiness for growth if success depends on personal effort rather than scalable leadership.",
          resistanceCosts: [
            "Burn out managers while reducing ability to think strategically.",
            "Limit departmental growth and development since employees aren’t trusted with big responsibilities.",
            "Slow execution because too much funnels through you.",
            "Undermine confidence in leadership if seen as non-scalable.",
            "Reduce organizational resilience when everything depends on your effort.",
          ],
          growthPath: [
            "Push task ownership down to department leads.",
            "Use frameworks that balance quality with team empowerment.",
            "Encourage leads to handle outcomes rather than absorbing them yourself.",
            "Reframe personal effort as a way to build capacity, not control it.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Employees: Respect your commitment but may feel underutilized or distrusted if you keep the hardest work for yourself.\n• Peers/Partners: Admire your work ethic but may see you as overwhelmed or scattered.\n• Clients: Value your reliability but may doubt readiness for bigger projects if success depends on personal effort rather than scalable leadership.",
          resistanceCosts: [
            "Burn you out while reducing strategic thinking.",
            "Limit team growth and development since employees aren’t trusted with responsibilities.",
            "Slow execution because too much funnels through you.",
            "Signal that you are a contributor but not promotable.",
            "Reduce resilience when everything depends on your effort.",
          ],
          growthPath: [
            "Delegate routine tasks so business keeps moving.",
            "Balance personal effort with speed when addressing customer needs.",
            "Use simple systems that build team capacity without your direct involvement.",
            "Track positive results when employees take ownership.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Admire your commitment but may see you as overwhelmed if you handle everything personally.\n• Early Customers/Supporters: Value your effort but may lose interest if delivery is delayed by overload.\n• You (Self-Perception): Feel productive when doing everything, even if it limits growth.",
            resistanceCosts: [
              "Keep you in “doer mode” instead of building or scaling.",
              "Delay validation by handling too much personally.",
              "Reduce credibility if promises are slowed by overload.",
              "Limit learning as progress depends on your effort alone.",
            ],
            growthPath: [
              "Outsource or automate one task even if not perfect.",
              "Replace personal effort with small experiments.",
              "Use advisors to share load quickly.",
              "Reframe effort as a guide for growth, not perfection.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Respect your commitment but may feel underutilized if you keep work for yourself.\n• Clients: Value reliability but may get frustrated if overload delays projects.\n• Vendors/Contractors: Admire ethic but see overload as limiting responsiveness.",
            resistanceCosts: [
              "Create bottlenecks dependent on you for everything.",
              "Overwhelm team by discouraging ownership.",
              "Delay delivery when prioritizing personal effort.",
              "Limit scalability without delegation.",
            ],
            growthPath: [
              "Delegate tasks and empower employees to own work.",
              "Use systems to maintain quality without overload.",
              "Trust experiments over personal control.",
              "Reframe effort to free time for growth.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Team: Admire commitment but feel constrained by your overload.\n• Partners/Advisors: Value ethic but see hesitation from personal effort.\n• Customers: Trust effort but may choose competitors if growth is slowed.",
            resistanceCosts: [
              "Delay launches and miss market windows.",
              "Reduce flexibility if resisting delegation.",
              "Lower confidence if momentum stalls.",
              "Limit quick growth when effort overrides building capacity.",
            ],
            growthPath: [
              "Pilot ideas with team, even if not perfect.",
              "Invite members to own processes.",
              "Reframe effort for scaling venture.",
              "Model balance to attract partners and backers.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "You take it all on.",
        "Saying yes keeps work safe but crowds out leadership.",
        "Delegation slips, coaching time vanishes, and your calendar becomes the constraint.",
        "Output is high until it breaks.",
      ],
    },
    {
      id: "conflict-avoider",
      name: "Conflict Avoider",
      description:
        "Avoids difficult conversations and confrontational decisions",
      traits: [
        "Conflict avoidance",
        "Indirect communication",
        "Harmony preference",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach conflict, candor, and accountability.\nAt your best, you are a manager who values relationships and creates a respectful environment. You keep the peace, reduce unnecessary friction, and ensure collaboration feels safe. Teams often appreciate your empathy, and senior leaders may view you as someone who keeps operations steady.\nBut when resistance is high, harmony comes at the cost of progress. You may avoid tough feedback, hesitate to address performance issues, or let risks go unspoken. To you, this feels like preserving relationships — but to your team, it signals lowered standards. To senior leaders, it can appear as a reluctance to step into leadership authority when it matters most.\nThis pattern is called the Conflict Avoider. It does not mean you lack courage. It means your resistance shows up as valuing peace over candor, which can quietly undermine accountability and credibility.",
      strengthsInsights: [
        "Builds trust and psychological safety within teams.",
        "Reduces unnecessary tension in day-to-day interactions.",
        "Encourages cooperation and inclusion.",
        "Provides a steady presence in politically sensitive environments.",
      ],
      resistanceCosts: [
        "Allow underperformance to weaken team results.",
        "Delay necessary changes because issues remain unspoken.",
        "Create hidden frustration within the team if fairness is questioned.",
        "Limit promotability if leaders see you as agreeable but not authoritative.",
        "Reduce credibility when tough calls are expected but not made.",
      ],
      developmentAreas: [
        "Improve delivery of constructive feedback",
        "Develop skills for addressing performance issues directly",
        "Build comfort with productive disagreement",
      ],
      growthPath: {
        immediateShifts: [
          "Deliver one piece of constructive feedback directly this week.",
          "State your perspective clearly in your next team or peer meeting, even if it risks disagreement.",
        ],
        strategicPractices: [
          "Use structured feedback frameworks (e.g., “situation–behavior–impact”) to make conversations clear but respectful.",
          "Pair empathy with accountability by explaining why candor benefits growth.",
          "Create team norms that treat disagreement as contribution, not conflict.",
        ],
        longTermGrowth: [
          "Reframe leadership: conflict is not damage — it is a tool for clarity and progress.",
          "Track times when direct feedback improved performance or trust.",
          "Demonstrate to senior leaders that you can manage tension productively, proving readiness for larger scope.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Delay or soften difficult feedback.",
        "Default to consensus even when issues need direct challenge.",
        "Redirect conversations away from tension instead of addressing it.",
        "Resolve surface-level harmony while deeper issues remain unresolved.",
        "Allow underperformance to continue longer than it should.",
      ],
      rootCauses: [
        "Past workplaces where challenging authority led to negative consequences.",
        "Cultures that equated politeness with professionalism.",
        "Managers or mentors who modeled avoidance rather than candor.",
        "Personal experiences where speaking up damaged relationships or reputation.",
      ],
      beliefsThatDriveResistance: [
        "“Conflict damages relationships.”",
        "“It’s better to be liked than confrontational.”",
        "“It will demotivate people.”",
        "“Disagreement will make me look disloyal.”",
        "“Harmony is the safest path forward.”",
      ],
      whatOthersExperience: {
        directReports:
          "Feel supported but may lose respect if you don’t enforce accountability. Some may take advantage of your reluctance to confront issues.",
        peers:
          "Value your diplomacy but may see you as passive in tough discussions, reducing your influence.",
        seniorLeaders:
          "Appreciate your steady presence but may doubt your ability to handle conflict at scale, which limits promotion readiness.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Executive pressure to deliver quickly without debate.",
          "Interpersonal friction among your team members.",
          "Performance problems that feel risky to address.",
        ],
        softeners: [
          "Leaders who model direct but respectful conflict resolution.",
          "Cultures where dissent is treated as contribution, not disruption.",
          "Frameworks for structured feedback that normalize hard conversations.",
        ],
      },
      strengthsHiddenInside: [
        "Builds trust and psychological safety within teams.",
        "Reduces unnecessary tension in day-to-day interactions.",
        "Encourages cooperation and inclusion.",
        "Provides a steady presence in politically sensitive environments.",
      ],
      detailedResistanceCosts: [
        "Allow underperformance to weaken team results.",
        "Delay necessary changes because issues remain unspoken.",
        "Create hidden frustration within the team if fairness is questioned.",
        "Limit promotability if leaders see you as agreeable but not authoritative.",
        "Reduce credibility when tough calls are expected but not made.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Employees: Feel supported but may lose respect if accountability isn't enforced.\n• Peers/Partners: Value diplomacy but see you as passive in discussions.\n• Clients: Appreciate steady presence but may doubt handling of issues at scale.",
          resistanceCosts: [
            "Allow underperformance to weaken results.",
            "Delay changes as issues remain unspoken.",
            "Create frustration if fairness is questioned.",
            "Limit promotability if seen as agreeable but not authoritative.",
            "Reduce credibility when tough calls aren't made.",
          ],
          growthPath: [
            "Deliver constructive feedback with clear guidelines.",
            "Create frameworks for respectful conversations.",
            "Focus on developing candor in others.",
            "Track successful outcomes from direct feedback.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Feel supported but may lose respect if accountability isn't enforced.\n• Leadership Team/Department Heads: Value diplomacy but see you as passive in discussions.\n• Customers/Stakeholders: Appreciate steady presence but may doubt leading of conflict at scale.",
          resistanceCosts: [
            "Allow underperformance to weaken departmental results.",
            "Delay changes because issues remain unspoken.",
            "Create frustration if fairness is questioned.",
            "Signal not ready for broader responsibilities.",
          ],
          growthPath: [
            "Establish norms for direct concerns in departments.",
            "Replace avoidance with outcome-based discussions.",
            "Create systems for respectful accountability.",
            "Model balance of empathy and candor.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Employees: Feel supported but may lose respect if accountability isn't enforced.\n• Peers/Partners: Value diplomacy but see you as passive in tough discussions.\n• Clients: Appreciate steady presence but may question ability to handle issues.",
          resistanceCosts: [
            "Allow underperformance to weaken results.",
            "Delay changes as issues remain unspoken.",
            "Create frustration if fairness is questioned.",
            "Reduce credibility when tough calls aren't made.",
            "Limit growth if issues persist.",
          ],
          growthPath: [
            "Deliver feedback to maintain customer focus.",
            "Trust team norms for disagreement.",
            "Create simple processes for accountability.",
            "Focus on business results from candor.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Value your empathy but may see avoidance when candor is needed.\n• Early Customers/Supporters: Appreciate harmony but may lose confidence if issues aren't addressed.\n• You (Self-Perception): Feel safer avoiding conflict, even if it limits progress.",
            resistanceCosts: [
              "Allow issues to persist instead of resolving.",
              "Delay validation by not addressing problems.",
              "Reduce credibility if promises aren't confronted.",
              "Limit learning from unspoken risks.",
            ],
            growthPath: [
              "Practice one direct conversation weekly.",
              "Use frameworks for clear feedback.",
              "Reframe conflict as growth tool.",
              "Track improved outcomes from candor.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel supported but may lose respect if issues aren't addressed.\n• Clients: Appreciate harmony but frustrated if performance lags.\n• Vendors/Contractors: Value diplomacy but see passivity in discussions.",
            resistanceCosts: [
              "Allow underperformance to affect clients.",
              "Delay changes from unspoken issues.",
              "Create frustration in small team.",
              "Limit scalability without accountability.",
            ],
            growthPath: [
              "Deliver feedback for client satisfaction.",
              "Create norms for respectful disagreement.",
              "Focus coaching on candor.",
              "Model balance for business growth.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Team: Appreciate empathy but feel frustrated if issues persist.\n• Partners/Advisors: Value diplomacy but see reluctance in tough calls.\n• Customers: Trust harmony but may choose competitors if standards slip.",
            resistanceCosts: [
              "Delay growth from unaddressed issues.",
              "Reduce flexibility without candor.",
              "Lower confidence if fairness questioned.",
              "Limit scaling when accountability lacks.",
            ],
            growthPath: [
              "Establish authority for leads to address issues.",
              "Replace avoidance with coaching.",
              "Create systems for productive tension.",
              "Demonstrate candor drives growth.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "Tough calls soften.",
        "Performance issues linger, trade-offs blur, and feedback arrives late or not at all.",
        "Harmony today creates larger friction tomorrow.",
        "Standards erode, misalignment grows, and resentment builds quietly.",
      ],
    },
    {
      id: "credit-seeker",
      name: "Credit Seeker",
      description: "Focuses heavily on recognition and personal achievement",
      traits: [
        "Recognition seeking",
        "Achievement focus",
        "Visibility priority",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach recognition, visibility, and career advancement.\nAt your best, you are a manager who ensures accomplishments don’t go unnoticed. You advocate for yourself, highlight your role in wins, and make sure senior leaders are aware of your contributions. This visibility often helps your career progression and signals ambition.\nBut when resistance is high, recognition becomes overemphasis. You may over-claim credit, spotlight your own role above the team’s, or focus more on how outcomes reflect on you than on collective progress. To you, this feels like protecting your visibility — but to your team, it can feel demotivating. To senior leaders, it may raise doubts about whether you can lead with maturity and collaboration.\nThis pattern is called the Credit Seeker. It does not mean you lack leadership value. It means your resistance shows up as leaning too heavily on visibility for personal advancement, which can undermine trust and slow your career growth.",
      strengthsInsights: [
        "Ensures important accomplishments get visibility.",
        "Builds momentum for career advancement.",
        "Demonstrates ambition and personal drive.",
        "Signals confidence in one’s contributions.",
      ],
      resistanceCosts: [
        "Lower team morale when recognition doesn’t feel fairly shared.",
        "Damage peer trust and reduce collaboration.",
        "Create reputational risk if senior leaders perceive you as self-promoting.",
        "Limit advancement if ambition overshadows teamwork.",
        "Make it harder to retain strong talent, since employees may feel their work is invisible.",
      ],
      developmentAreas: [
        "Improve team recognition practices",
        "Develop balance between self-advocacy and team advocacy",
        "Focus on collective success metrics",
      ],
      growthPath: {
        immediateShifts: [
          "In your next update, highlight at least two team members’ contributions by name.",
          "When recognized personally, redirect part of the credit back to the group.",
        ],
        strategicPractices: [
          "Track both your achievements and your team’s impact — present them together.",
          "Build alliances with peers by spotlighting shared wins.",
          "Ask senior leaders for feedback on how you balance self-advocacy with team advocacy.",
        ],
        longTermGrowth: [
          "Reframe recognition: career growth comes from building credibility for lifting others as well as yourself.",
          "Model visible team advocacy, proving that success expands when credit is shared.",
          "Demonstrate to senior leaders that you can balance ambition with collaboration — a hallmark of promotable leadership.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Emphasize their own role when sharing results upward.",
        "Position wins as proof of their personal leadership rather than team collaboration.",
        "Focus on visibility in front of senior leaders more than alignment with peers.",
        "Redirect recognition toward themselves when outcomes are positive.",
        "Undervalue the contributions of others when under pressure.",
      ],
      rootCauses: [
        "Organizations where visibility mattered more than performance quality.",
        "Early roles where advancement required constant self-advocacy.",
        "Leaders who modeled “self-promotion first” as the way to get ahead.",
        "Past experiences where contributions were overlooked unless you claimed them.",
      ],
      beliefsThatDriveResistance: [
        "“If I don’t highlight my role, no one else will.”",
        "“Visibility is more important than collaboration.”",
        "“Careers are built on recognition, not just results.”",
        "“Sharing credit dilutes my impact.”",
        "“To advance, I must stand out above the team.”",
      ],
      whatOthersExperience: {
        directReports:
          "May feel overlooked or undervalued if their contributions are minimized. Over time, this reduces motivation and engagement.",
        peers:
          "Can view you as competitive or self-serving, which makes collaboration harder.",
        seniorLeaders:
          "Notice your drive, but may question whether you can lead with balance and maturity, which can affect promotability.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Highly competitive peer groups vying for recognition.",
          "Executives who reward visibility more than team health.",
          "Limited channels to highlight contributions fairly.",
        ],
        softeners: [
          "Leaders who celebrate collective wins alongside individual impact.",
          "Recognition systems that attribute results clearly across teams.",
          "Cultures that value enterprise contribution, not just personal spotlight.",
        ],
      },
      strengthsHiddenInside: [
        "Ensures important accomplishments get visibility.",
        "Builds momentum for career advancement.",
        "Demonstrates ambition and personal drive.",
        "Signals confidence in one’s contributions.",
      ],
      detailedResistanceCosts: [
        "Lower team morale when recognition doesn’t feel fairly shared.",
        "Damage peer trust and reduce collaboration.",
        "Create reputational risk if senior leaders perceive you as self-promoting.",
        "Limit advancement if ambition overshadows teamwork.",
        "Make it harder to retain strong talent, since employees may feel their work is invisible.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Employees: May feel overlooked if contributions are minimized.\n• Peers/Partners: View you as competitive, making collaboration harder.\n• Clients: Notice drive but may question maturity in leadership.",
          resistanceCosts: [
            "Lower morale when recognition isn't shared.",
            "Damage trust and reduce collaboration.",
            "Create risk if seen as self-promoting.",
            "Limit advancement if teamwork is overshadowed.",
            "Harder to retain talent if work feels invisible.",
          ],
          growthPath: [
            "Highlight team contributions in updates.",
            "Balance self-advocacy with team spotlight.",
            "Focus on shared wins for alliances.",
            "Track balanced recognition outcomes.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: May feel overlooked if contributions are minimized.\n• Leadership Team/Department Heads: View you as competitive, making collaboration harder.\n• Customers/Stakeholders: Notice drive but question balance in leadership.",
          resistanceCosts: [
            "Lower departmental morale from unfair recognition.",
            "Damage trust among managers.",
            "Create reputational risk.",
            "Limit broader responsibilities if seen as self-focused.",
          ],
          growthPath: [
            "Establish shared credit norms in departments.",
            "Replace self-focus with team outcomes.",
            "Create systems for balanced advocacy.",
            "Model collaboration for other managers in the organization.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Employees: May feel overlooked if contributions are minimized.\n• Peers/Partners: View you as competitive, making collaboration harder.\n• Clients: Notice drive but may question maturity.",
          resistanceCosts: [
            "Lower morale when recognition isn't shared.",
            "Damage trust and collaboration.",
            "Create risk if self-promoting.",
            "Limit advancement if teamwork overshadowed.",
            "Harder to retain talent.",
          ],
          growthPath: [
            "Highlight team in client updates.",
            "Trust shared wins for partnerships.",
            "Create simple recognition processes.",
            "Focus on business from balanced credit.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Notice ambition but may see self-focus when credit isn't shared.\n• Early Customers/Supporters: Appreciate drive but lose confidence if team feels invisible.\n• You (Self-Perception): Feel visible but recognize it limits alliances.",
            resistanceCosts: [
              "Prevent alliances by not sharing credit.",
              "Reduce supporter confidence.",
              "Limit learning from overlooked contributions.",
              "Create risk if seen as self-serving.",
            ],
            growthPath: [
              "Redirect credit to supporters.",
              "Use shared wins for momentum.",
              "Reframe recognition for credibility.",
              "Track growth from shared success.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Feel overlooked if contributions minimized.\n• Clients: Notice drive but question collaboration.\n• Vendors/Contractors: View as competitive.",
            resistanceCosts: [
              "Lower morale in small team.",
              "Damage trust with partners.",
              "Create client satisfaction issues.",
              "Limit scaling without shared credit.",
            ],
            growthPath: [
              "Highlight team to clients.",
              "Create norms for shared recognition.",
              "Focus on alliances through wins.",
              "Model balance for growth.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Team: Appreciate ambition but feel demotivated if credit not shared.\n• Partners/Advisors: Notice drive but question maturity.\n• Customers: Trust but prefer collaborative competitors.",
            resistanceCosts: [
              "Lower morale affecting retention.",
              "Reduce investor confidence.",
              "Create instability in relationships.",
              "Limit scaling if self-focused.",
            ],
            growthPath: [
              "Establish shared credit for leads.",
              "Replace self-focus with coaching.",
              "Create systems for recognition.",
              "Demonstrate collaboration drives growth.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "Visibility outruns value.",
        "You narrate your impact, center yourself in wins, and over-optimize for recognition.",
        "The team’s contributions fade.",
        "Trust with peers thins.",
        "Leaders question the signal compared to the substance.",
      ],
    },
    {
      id: "detached-manager",
      name: "Detached Manager",
      description: "Maintains distance from team and operational details",
      traits: [
        "Emotional distance",
        "Limited engagement",
        "Hands-off approach",
      ],
      detailedDescription:
        "Your results show High Resistance in how you approach relationships, team engagement, and emotional connection.\nAt your best, you are a manager who brings objectivity and focus. You prioritize results, keep professional boundaries, and avoid getting lost in emotions. Teams can rely on you for fairness and consistency, while senior leaders may value your task focus.\nBut when resistance is high, distance becomes disengagement. You may focus only on tasks, avoid personal connection, or miss signals of low morale. To you, this feels like professionalism — but to your team, it can feel like disinterest. To senior leaders, it raises concerns about your ability to inspire and retain talent, both critical for promotability.\nThis pattern is called the Detached Manager. It does not mean you lack care for your team. It means your resistance shows up as emotional distance, which can reduce trust, weaken loyalty, and limit your leadership brand.",
      strengthsInsights: [
        "Brings fairness and objectivity to decision-making.",
        "Keeps professional boundaries clear.",
        "Focuses on output and delivery without distraction.",
        "Demonstrates consistency under pressure.",
      ],
      resistanceCosts: [
        "Increase disengagement and turnover on your team.",
        "Reduce trust and loyalty from direct reports.",
        "Limit your ability to influence culture or morale.",
        "Create a reputation as task-focused but not people-focused.",
        "Signal to leaders that you’re not ready for larger people-leadership roles.",
      ],
      developmentAreas: [
        "Improve team engagement and relationship building",
        "Develop emotional awareness and connection skills",
        "Balance task focus with people leadership",
      ],
      growthPath: {
        immediateShifts: [
          "Ask one personal, open-ended question in each 1:1 this week.",
          "Provide specific praise when you see effort, not just results.",
        ],
        strategicPractices: [
          "Build regular team rituals that strengthen connection (check-ins, recognition moments).",
          "Practice active listening in conversations — reflect back what you hear.",
          "Set goals that include both performance and engagement outcomes.",
        ],
        longTermGrowth: [
          "Reframe leadership: influence grows through connection, not just direction.",
          "Track retention and morale metrics alongside results to strengthen credibility.",
          "Demonstrate to senior leaders that you can inspire, not just manage — proving readiness for higher-level leadership.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Keep conversations focused on tasks and deadlines.",
        "Provide limited personal feedback or encouragement.",
        "Miss emotional cues that signal disengagement.",
        "Maintain relationships at a surface level.",
        "Treat morale issues as “HR’s responsibility” rather than part of their role.",
      ],
      rootCauses: [
        "Organizations that valued output over engagement.",
        "Leaders who modeled detachment as strength.",
        "Early roles where showing vulnerability was criticized.",
        "Experiences where connecting too personally backfired.",
      ],
      beliefsThatDriveResistance: [
        "“Work and personal lives should be separate.”",
        "“My job is to manage tasks, not emotions.”",
        "“Engagement is HR’s role, not mine.”",
        "“If I get too close, I lose authority.”",
        "“Professional distance protects me.”",
      ],
      whatOthersExperience: {
        directReports:
          "See you as fair but may feel unseen or undervalued. Disengagement and turnover risks increase when they don’t feel connected.",
        peers:
          "Respect your focus but may view you as uninvolved or unavailable for collaboration.",
        seniorLeaders:
          "Appreciate your results but may question your ability to retain and inspire talent at scale, a key marker for promotion.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Heavy meeting loads that crowd out one-to-one time.",
          "Pressure from above to focus only on results.",
          "Remote or hybrid structures that reduce natural connection.",
        ],
        softeners: [
          "Leaders who expect engagement and presence, not just delivery.",
          "Systems that carve out time for coaching and development.",
          "Cultures that view connection as part of performance.",
        ],
      },
      strengthsHiddenInside: [
        "Brings fairness and objectivity to decision-making.",
        "Keeps professional boundaries clear.",
        "Focuses on output and delivery without distraction.",
        "Demonstrates consistency under pressure.",
      ],
      detailedResistanceCosts: [
        "Increase disengagement and turnover on your team.",
        "Reduce trust and loyalty from direct reports.",
        "Limit your ability to influence culture or morale.",
        "Create a reputation as task-focused but not people-focused.",
        "Signal to leaders that you’re not ready for larger people-leadership roles.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Employees: See you as fair but may feel unseen or undervalued.\n• Peers/Partners: Respect focus but view you as uninvolved.\n• Clients: Appreciate results but may question inspiration at scale.",
          resistanceCosts: [
            "Increase disengagement and turnover.",
            "Reduce trust and loyalty.",
            "Limit influence on culture or morale.",
            "Create task-focused reputation.",
            "Signal not ready for people-leadership.",
          ],
          growthPath: [
            "Build rituals for team connection.",
            "Practice active listening.",
            "Set goals for performance and engagement.",
            "Track morale metrics with results.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: See you as fair but may feel unseen.\n• Leadership Team/Department Heads: Respect focus but view as uninvolved.\n• Customers/Stakeholders: Appreciate results but question retention ability.",
          resistanceCosts: [
            "Increase departmental turnover.",
            "Reduce loyalty among managers.",
            "Limit cultural influence.",
            "Signal not scalable for growth.",
          ],
          growthPath: [
            "Establish check-ins for connection.",
            "Replace distance with outcome engagement.",
            "Create systems for morale.",
            "Model inspiration for managers.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Employees: See you as fair but may feel unseen.\n• Peers/Partners: Respect focus but view as unavailable.\n• Clients: Appreciate results but question loyalty building.",
          resistanceCosts: [
            "Increase turnover in small team.",
            "Reduce trust with partners.",
            "Limit morale influence.",
            "Create task-only reputation.",
            "Signal not ready for growth roles.",
          ],
          growthPath: [
            "Ask personal questions in meetings.",
            "Provide praise for effort.",
            "Build rituals for connection.",
            "Focus on retention with results.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Respect objectivity but may see detachment when connection needed.\n• Early Customers/Supporters: Appreciate focus but lose loyalty if not engaged.\n• You (Self-Perception): Feel professional but recognize it limits relationships.",
            resistanceCosts: [
              "Prevent alliances from lack of connection.",
              "Reduce supporter loyalty.",
              "Limit learning from missed cues.",
              "Create isolated reputation.",
            ],
            growthPath: [
              "Practice open questions weekly.",
              "Use listening for feedback.",
              "Reframe connection as strength.",
              "Track improved relationships.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: See fair but feel undervalued.\n• Clients: Appreciate results but question engagement.\n• Vendors/Contractors: Respect but see unavailability.",
            resistanceCosts: [
              "Increase turnover in small team.",
              "Reduce client loyalty.",
              "Limit collaboration.",
              "Prevent scalable relationships.",
            ],
            growthPath: [
              "Build check-ins for connection.",
              "Provide praise to build loyalty.",
              "Set engagement goals.",
              "Model balance for growth.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Team: Appreciate objectivity but feel disengaged.\n• Partners/Advisors: Respect focus but question inspiration.\n• Customers: Trust results but prefer engaged competitors.",
            resistanceCosts: [
              "Increase turnover affecting growth.",
              "Reduce investor confidence in people skills.",
              "Create instability in relationships.",
              "Limit scaling without inspiration.",
            ],
            growthPath: [
              "Establish rituals for management connection.",
              "Develop listening skills.",
              "Create goals for engagement.",
              "Demonstrate inspiration drives growth.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "Presence drops.",
        "One-to-ones slip, coaching becomes transactional, and you operate from the edges.",
        "Issues surface late and momentum fades.",
        "The team delivers but connection and direction feel thin.",
      ],
    },
    {
      id: "rule-bound-operator",
      name: "Rule-Bound Operator",
      description: "Rigid adherence to processes and procedures",
      traits: ["Process adherence", "Rule following", "Procedure focus"],
      detailedDescription:
        "Your results show High Resistance in how you approach processes, rules, and consistency.\nAt your best, you are a manager who ensures standards are followed and errors are minimized. You bring structure, fairness, and predictability. Teams can rely on you to set clear expectations, and senior leaders trust that you will safeguard compliance and stability.\nBut when resistance is high, structure becomes rigidity. You may rely too heavily on rules, resist flexibility, or slow down innovation. To you, this feels like protecting consistency — but to your team, it can feel restrictive. To senior leaders, it can signal you are reliable in operations but not adaptive enough for higher-level roles.\nThis pattern is called the Rule-Bound Operator. It does not mean you lack adaptability. It means your resistance shows up as over-attachment to rules and processes, which can stall agility and limit promotability.",
      strengthsInsights: [
        "Ensures stability and compliance.",
        "Brings order and predictability to complex work.",
        "Builds trust through fairness and consistency.",
        "Protects the organization from reckless shortcuts.",
      ],
      resistanceCosts: [
        "Slow down execution when strict process takes priority over agility.",
        "Reduce innovation by discouraging experimentation.",
        "Frustrate teams who want autonomy and creative problem solving.",
        "Signal to leaders that you are strong in operations but not ready for dynamic roles.",
        "Limit your upward mobility if you are seen as inflexible.",
      ],
      developmentAreas: [
        "Improve flexibility in process application",
        "Develop skills for balancing rules with innovation",
        "Build comfort with adaptive decision-making",
      ],
      growthPath: {
        immediateShifts: [
          "In your next project, allow one process exception to test flexibility.",
          "Ask your team for input on where rules help and where they hinder.",
        ],
        strategicPractices: [
          "Pilot new approaches on a small scale before requiring full compliance.",
          "Balance process reviews with innovation discussions.",
          "Acknowledge when adapting a rule creates better outcomes.",
        ],
        longTermGrowth: [
          "Reframe leadership: true consistency includes adaptability.",
          "Track results from flexible approaches to prove their value.",
          "Show senior leaders that you can protect standards and enable agility — a marker of promotable leadership.",
        ],
      },
      coreBehaviorsUnderResistance: [
        "Default to established rules, even when situations require creativity.",
        "Slow down projects to ensure procedures are followed.",
        "Resist adapting processes to fit new challenges.",
        "Discourage experimentation in favor of compliance.",
        "Treat deviation from standards as risk rather than opportunity.",
      ],
      rootCauses: [
        "Organizations where mistakes were punished more than delays.",
        "Industries with strong regulatory or procedural focus.",
        "Leaders who modeled “by the book” as the only safe path.",
        "Experiences where breaking rules created setbacks or criticism.",
      ],
      beliefsThatDriveResistance: [
        "“Rules exist for a reason — bending them is dangerous.”",
        "“Consistency matters more than creativity.”",
        "“If everyone followed the rules, we’d have fewer problems.”",
        "“My credibility depends on doing things the right way.”",
        "“Flexibility creates risk.”",
      ],
      whatOthersExperience: {
        directReports:
          "Appreciate clarity but may feel constrained when new ideas are dismissed. Innovation can suffer if processes dominate.",
        peers:
          "Respect your reliability but may bypass you when quick adaptation is required.",
        seniorLeaders:
          "Value your operational strength but may question whether you can lead transformation, which limits promotion potential.",
      },
      organizationalTriggers: {
        amplifiers: [
          "Strict compliance environments that emphasize zero deviation.",
          "Senior leaders pushing change without clarity or support.",
          "Ambiguous new initiatives that feel unsafe without precedent.",
        ],
        softeners: [
          "Governance models that balance compliance with innovation.",
          "Leaders who encourage exceptions when justified by outcomes.",
          "Cultures that frame adaptability as strength, not recklessness.",
        ],
      },
      strengthsHiddenInside: [
        "Ensures stability and compliance.",
        "Brings order and predictability to complex work.",
        "Builds trust through fairness and consistency.",
        "Protects the organization from reckless shortcuts.",
      ],
      detailedResistanceCosts: [
        "Slow down execution when strict process takes priority over agility.",
        "Reduce innovation by discouraging experimentation.",
        "Frustrate teams who want autonomy and creative problem solving.",
        "Signal to leaders that you are strong in operations but not ready for dynamic roles.",
        "Limit your upward mobility if you are seen as inflexible.",
      ],
      categoryContent: {
        corporate: {
          whatOthersExperience:
            "• Employees: Appreciate clarity but feel constrained if ideas dismissed.\n• Peers/Partners: Respect reliability but bypass for quick adaptation.\n• Clients: Value strength but question transformation leadership.",
          resistanceCosts: [
            "Slow execution with strict processes.",
            "Reduce innovation by discouraging experiments.",
            "Frustrate teams seeking autonomy.",
            "Signal operational strength but not dynamic.",
            "Limit mobility if seen inflexible.",
          ],
          growthPath: [
            "Allow process exceptions in projects.",
            "Balance reviews with innovation.",
            "Pilot new approaches small-scale.",
            "Track flexible results.",
          ],
        },
        midSize: {
          whatOthersExperience:
            "• Employees: Appreciate clarity but feel constrained.\n• Leadership Team/Department Heads: Respect reliability but bypass for adaptation.\n• Customers/Stakeholders: Value strength but question leading change.",
          resistanceCosts: [
            "Slow response to market changes.",
            "Limit growth if innovation delayed.",
            "Frustrate managers seeking flexibility.",
            "Signal not ready for dynamic roles.",
          ],
          growthPath: [
            "Pilot exceptions for department leads.",
            "Use systems balancing quality and flexibility.",
            "Encourage ownership of adaptations.",
            "Reframe rules to enable agility.",
          ],
        },
        smb: {
          whatOthersExperience:
            "• Employees: Appreciate clarity but feel constrained.\n• Peers/Partners: Respect reliability but bypass when quick needed.\n• Clients: Value strength but may question adaptability.",
          resistanceCosts: [
            "Slow execution over agility.",
            "Reduce innovation.",
            "Frustrate teams wanting creativity.",
            "Signal strong operations but not dynamic.",
            "Limit mobility if inflexible.",
          ],
          growthPath: [
            "Allow exceptions for customer needs.",
            "Balance processes with speed.",
            "Pilot small changes.",
            "Track better outcomes from flexibility.",
          ],
        },
        entrepreneur: {
          sole: {
            whatOthersExperience:
              "• Advisors/Peers: Appreciate structure but see rigidity when flexibility needed.\n• Early Customers/Supporters: Value predictability but lose interest if innovation slow.\n• You (Self-Perception): Feel safe with rules, even if limiting growth.",
            resistanceCosts: [
              "Keep in rigid mode instead of adapting.",
              "Delay validation by strict adherence.",
              "Reduce credibility if promises slow.",
              "Limit learning from risk aversion.",
            ],
            growthPath: [
              "Test one exception for quick action.",
              "Replace rules with small pilots.",
              "Use advisors for flexible input.",
              "Reframe rules as guide, not absolute.",
            ],
          },
          micro: {
            whatOthersExperience:
              "• Employees: Appreciate clarity but feel constrained.\n• Clients: Value predictability but frustrated if rigid.\n• Vendors/Contractors: Respect but see lack of flexibility.",
            resistanceCosts: [
              "Create bottlenecks from strict rules.",
              "Limit innovation in small team.",
              "Delay client delivery.",
              "Limit scalability without adaptation.",
            ],
            growthPath: [
              "Allow exceptions for client needs.",
              "Pilot changes without full compliance.",
              "Trust team for creative solutions.",
              "Reframe processes for growth.",
            ],
          },
          growing: {
            whatOthersExperience:
              "• Team: Appreciate structure but feel restricted.\n• Partners/Advisors: Value consistency but question agility.\n• Customers: Trust but choose flexible competitors.",
            resistanceCosts: [
              "Delay launches from rigidity.",
              "Reduce adaptation confidence.",
              "Limit growth when experimentation discouraged.",
            ],
            growthPath: [
              "Pilot ideas without strict rules.",
              "Invite team to adapt processes.",
              "Reframe rules for scaling.",
              "Model balance to attract backers.",
            ],
          },
        },
      },
      highResistanceCharacteristics: [
        "Process hardens into rigidity.",
        "You default to policy, resist exceptions, and stall adaptation when conditions shift.",
        "Compliance is high but agility is low.",
      ],
    },
    // Special profiles for no dominant archetype
    {
      id: "low-resistance",
      name: "Low Resistance Profile",
      description: "All Archetypes Scoring Low",
      traits: ["Balanced", "Adaptable", "Flexible"],
      detailedDescription:
        "Your results show low resistance across all eight archetypes. Instead of being pulled strongly into one pattern, you show balance and adaptability.\nAt your best, this means you flex your leadership style depending on the situation. You can delegate when needed, step in during pressure, and follow processes without being rigid. Teams often experience you as steady and consistent.\nHowever, low resistance doesn’t mean “no risk.” At times, you may underestimate how subtle resistance shows up — like small delays, unspoken frustrations, or habits that only emerge under stress.",
      strengthsInsights: [
        "Flexibility in leadership style.",
        "Steady and consistent presence.",
        "Adaptability to situations.",
      ],
      resistanceCosts: [
        "Make your leadership brand less visible — adaptability without distinctiveness.",
        "Cause you to overlook subtle frictions that build into bigger issues.",
        "Limit your promotability if leaders don’t see a clearly defined style of influence.",
      ],
      developmentAreas: [
        "Develop a signature leadership identity",
        "Identify subtle resistance patterns",
        "Build intentional brand",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Identify your signature leadership identity (what do you want to be known for?).",
          "Ask peers or mentors where they see subtle resistance still showing up.",
          "Use your flexibility as a platform for intentional brand-building.",
        ],
      },
      whatOthersExperience: {
        directReports:
          "See you as supportive and balanced, but may sometimes find you less distinctive in your leadership style.",
        peers:
          "Value your adaptability, but may wonder about your “signature strength” as a leader.",
        seniorLeaders:
          "Trust your steadiness, but may want to see a sharper leadership identity before considering you for bigger roles.",
      },
    },
    {
      id: "moderate-resistance",
      name: "Moderate Resistance Profile",
      description: "Most Archetypes Scoring Moderate",
      traits: [
        "Inconsistent",
        "Adaptable but unpredictable",
        "Flexible but wavering",
      ],
      detailedDescription:
        "Your results show moderate resistance across several archetypes. You’re not dominated by one pattern, but resistance is noticeable and shows up inconsistently.\nAt your best, this means you can adjust. In some moments, you’re empowering and collaborative; in others, more structured and detail-focused. This adaptability helps in many settings.\nBut moderate resistance can also create inconsistency. Teams and peers may not always know which “version” of you will show up. Senior leaders may see you as reliable, but less predictable when pressure rises.",
      strengthsInsights: [
        "Ability to adjust to situations.",
        "Adaptability in various settings.",
        "Flexibility in approach.",
      ],
      resistanceCosts: [
        "Create mixed signals that reduce clarity and follow-through.",
        "Undermine your leadership brand if others can’t define your core style.",
        "Cause overlooked issues to grow because they are never strongly addressed.",
      ],
      developmentAreas: [
        "Reduce inconsistency in patterns",
        "Build predictable high-stakes behavior",
        "Define core leadership style",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Focus on one archetype at a time — practice reducing resistance there for 90 days.",
          "Ask peers for feedback on where they see your patterns as inconsistent.",
          "Build routines that help you show up more predictably in high-stakes settings.",
        ],
      },
      whatOthersExperience: {
        directReports:
          "Value your support but may feel confused if expectations shift depending on the day.",
        peers: "See you as flexible but may feel you waver between approaches.",
        seniorLeaders:
          "Appreciate your adaptability, but may hesitate to give you bigger scope if they perceive inconsistency.",
      },
    },
    {
      id: "mixed-resistance",
      name: "Mixed Resistance Profile",
      description: "Some Archetypes High, Others Low",
      traits: ["Dynamic", "Multifaceted", "Contrasting styles"],
      detailedDescription:
        "Your results show a mixed profile — strong resistance in some areas, very low in others. This means your leadership isn’t defined by one pattern, but by contrasts.\nAt your best, this makes you dynamic. You may be highly visionary but also deeply detail-oriented, or very people-focused in some settings and highly process-driven in others. Teams experience you as multifaceted.\nBut the swings between high and low can create volatility. Direct reports may feel whiplash if you shift styles too suddenly. Senior leaders may find it harder to trust your consistency in broader roles.",
      strengthsInsights: [
        "Dynamic and multifaceted approach.",
        "Ability to handle contrasts.",
        "Versatility in leadership.",
      ],
      resistanceCosts: [
        "Create unpredictability in your leadership style.",
        "Lead to credibility challenges if stakeholders can’t anticipate your stance.",
        "Limit promotability if leaders worry about stability at higher scope.",
      ],
      developmentAreas: [
        "Anchor in primary leadership identity",
        "Balance high resistance areas",
        "Leverage low resistance flexibility",
      ],
      growthPath: {
        immediateShifts: [],
        strategicPractices: [],
        longTermGrowth: [
          "Anchor yourself in a primary leadership identity — decide what you want to be known for.",
          "Map your “high” archetypes to see where they create the biggest drag, and practice balancing them.",
          "Use your “low” archetypes as leverage — they represent flexibility you can model consistently.",
        ],
      },
      whatOthersExperience: {
        directReports:
          "Can feel energized by your strengths, but uncertain about what to expect.",
        peers:
          "May find you unpredictable — collaborative one day, resistant the next.",
        seniorLeaders:
          "Respect your abilities, but may question whether you can scale consistently across larger teams.",
      },
    },
  ],

  questions: {
    direct: [
      // Micromanager Direct
      {
        id: "mm1",
        type: "direct",
        text: "I often step in to re-do or double-check my team’s work.",
        archetype: "micromanager",
      },
      {
        id: "mm2",
        type: "direct",
        text: "I prefer to stay closely involved in day-to-day tasks.",
        archetype: "micromanager",
      },
      // Bottleneck Manager Direct
      {
        id: "bm1",
        type: "direct",
        text: "Decisions often wait on me before progress can continue.",
        archetype: "bottleneck-manager",
      },
      {
        id: "bm2",
        type: "direct",
        text: "My team hesitates to act until I give explicit direction.",
        archetype: "bottleneck-manager",
      },
      // Firefighter Direct
      {
        id: "ff1",
        type: "direct",
        text: "I spend more time reacting to urgent issues than planning ahead.",
        archetype: "firefighter",
      },
      {
        id: "ff2",
        type: "direct",
        text: "My days are dominated by back-to-back problems.",
        archetype: "firefighter",
      },
      // Overloaded Doer Direct
      {
        id: "od1",
        type: "direct",
        text: "I often take on more work than I can realistically handle.",
        archetype: "overloaded-doer",
      },
      {
        id: "od2",
        type: "direct",
        text: "I say yes to requests, even when my plate is already full.",
        archetype: "overloaded-doer",
      },
      // Conflict Avoider Direct
      {
        id: "ca1",
        type: "direct",
        text: "I often soften or delay feedback to my team.",
        archetype: "conflict-avoider",
      },
      {
        id: "ca2",
        type: "direct",
        text: "I avoid pushing back on unrealistic requests from leadership.",
        archetype: "conflict-avoider",
      },
      // Credit Seeker Direct
      {
        id: "cs1",
        type: "direct",
        text: "I often highlight my role in successes to make sure I’m noticed.",
        archetype: "credit-seeker",
      },
      {
        id: "cs2",
        type: "direct",
        text: "Visibility with leadership is as important to me as results.",
        archetype: "credit-seeker",
      },
      // Detached Manager Direct
      {
        id: "dm1",
        type: "direct",
        text: "I sometimes disengage from my team when work feels overwhelming.",
        archetype: "detached-manager",
      },
      {
        id: "dm2",
        type: "direct",
        text: "My peers sometimes see me as “checked out” in meetings.",
        archetype: "detached-manager",
      },
      // Rule-Bound Operator Direct
      {
        id: "rbo1",
        type: "direct",
        text: "I prefer strict processes and procedures, even if they slow us down.",
        archetype: "rule-bound-operator",
      },
      {
        id: "rbo2",
        type: "direct",
        text: "I resist changes that disrupt established routines.",
        archetype: "rule-bound-operator",
      },
    ],
    oblique: [
      // Micromanager Oblique
      {
        id: "mm3",
        type: "oblique",
        text: "When delegating, I believe it’s best to…",
        archetype: "micromanager",
        options: [
          {
            value: "a",
            label: "Check in often to ensure quality",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Trust the team to manage independently",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Step back until final results",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "mm4",
        type: "oblique",
        text: "In group projects, I usually:",
        archetype: "micromanager",
        options: [
          { value: "a", label: "Track every detail myself", archetypeScore: 5 },
          {
            value: "b",
            label: "Allow the team to self-organize",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Provide broad direction and step back",
            archetypeScore: 3,
          },
        ],
      },
      // Bottleneck Manager Oblique
      {
        id: "bm3",
        type: "oblique",
        text: "When problems escalate, I usually…",
        archetype: "bottleneck-manager",
        options: [
          { value: "a", label: "Try to solve them myself", archetypeScore: 5 },
          {
            value: "b",
            label: "Ask my team to handle them first",
            archetypeScore: 1,
          },
          { value: "c", label: "Escalate upward quickly", archetypeScore: 3 },
        ],
      },
      {
        id: "bm4",
        type: "oblique",
        text: "In balancing senior leadership vs. my team’s needs, I often:",
        archetype: "bottleneck-manager",
        options: [
          {
            value: "a",
            label: "Pause decisions until both sides are clear",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Push forward with one side regardless",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Let the team decide independently",
            archetypeScore: 3,
          },
        ],
      },
      // Firefighter Oblique
      {
        id: "ff3",
        type: "oblique",
        text: "When a deadline is near, I tend to…",
        archetype: "firefighter",
        options: [
          { value: "a", label: "Focus on long-term tasks", archetypeScore: 1 },
          {
            value: "b",
            label: "Handle whatever urgent issue is in front of me",
            archetypeScore: 5,
          },
          {
            value: "c",
            label: "Step back and let others take over",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "ff4",
        type: "oblique",
        text: "In meetings, I often:",
        archetype: "firefighter",
        options: [
          {
            value: "a",
            label: "Push to solve immediate problems",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Raise long-term priorities",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Focus on recognition opportunities",
            archetypeScore: 3,
          },
        ],
      },
      // Overloaded Doer Oblique
      {
        id: "od3",
        type: "oblique",
        text: "When my team is struggling, I usually:",
        archetype: "overloaded-doer",
        options: [
          {
            value: "a",
            label: "Step in and take over tasks myself",
            archetypeScore: 5,
          },
          { value: "b", label: "Coach them through it", archetypeScore: 3 },
          {
            value: "c",
            label: "Let them find their own solution",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "od4",
        type: "oblique",
        text: "To prove my value, I tend to…",
        archetype: "overloaded-doer",
        options: [
          {
            value: "a",
            label: "Stay heavily involved in daily execution",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Focus mainly on long-term strategy",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Build visibility through recognition",
            archetypeScore: 3,
          },
        ],
      },
      // Conflict Avoider Oblique
      {
        id: "ca3",
        type: "oblique",
        text: "When disagreements arise, I usually:",
        archetype: "conflict-avoider",
        options: [
          {
            value: "a",
            label: "Avoid the issue to keep harmony",
            archetypeScore: 5,
          },
          { value: "b", label: "Address them head-on", archetypeScore: 1 },
          { value: "c", label: "Escalate immediately", archetypeScore: 3 },
        ],
      },
      {
        id: "ca4",
        type: "oblique",
        text: "When peers frustrate me, I tend to:",
        archetype: "conflict-avoider",
        options: [
          {
            value: "a",
            label: "Stay quiet to avoid conflict",
            archetypeScore: 5,
          },
          { value: "b", label: "Raise the issue directly", archetypeScore: 1 },
          {
            value: "c",
            label: "Use humor to lighten the mood",
            archetypeScore: 3,
          },
        ],
      },
      // Credit Seeker Oblique
      {
        id: "cs3",
        type: "oblique",
        text: "In meetings, I usually:",
        archetype: "credit-seeker",
        options: [
          {
            value: "a",
            label: "Speak up to ensure my contributions are seen",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Stay quiet unless directly asked",
            archetypeScore: 1,
          },
          { value: "c", label: "Focus on group harmony", archetypeScore: 3 },
        ],
      },
      {
        id: "cs4",
        type: "oblique",
        text: "When projects succeed, I tend to:",
        archetype: "credit-seeker",
        options: [
          {
            value: "a",
            label: "Make sure leadership knows my contribution",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Credit the team and step back",
            archetypeScore: 1,
          },
          { value: "c", label: "Avoid taking any credit", archetypeScore: 3 },
        ],
      },
      // Detached Manager Oblique
      {
        id: "dm3",
        type: "oblique",
        text: "When projects pile up, I usually:",
        archetype: "detached-manager",
        options: [
          {
            value: "a",
            label: "Withdraw and focus only on minimal essentials",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Stay engaged and push through with energy",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Take on extra tasks to prove my value",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "dm4",
        type: "oblique",
        text: "In cross-functional work, I tend to:",
        archetype: "detached-manager",
        options: [
          {
            value: "a",
            label: "Step back and let others lead",
            archetypeScore: 5,
          },
          { value: "b", label: "Stay actively involved", archetypeScore: 1 },
          { value: "c", label: "Push to be recognized", archetypeScore: 3 },
        ],
      },
      // Rule-Bound Operator Oblique
      {
        id: "rbo3",
        type: "oblique",
        text: "When priorities shift suddenly, I usually:",
        archetype: "rule-bound-operator",
        options: [
          {
            value: "a",
            label: "Stick to the original plan",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Adapt quickly and flex with new direction",
            archetypeScore: 1,
          },
          {
            value: "c",
            label: "Step back until clarity is restored",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "rbo4",
        type: "oblique",
        text: "In decision-making, I believe it’s best to:",
        archetype: "rule-bound-operator",
        options: [
          {
            value: "a",
            label: "Follow established procedures above all else",
            archetypeScore: 5,
          },
          {
            value: "b",
            label: "Balance procedures with flexibility",
            archetypeScore: 3,
          },
          {
            value: "c",
            label: "Trust people to figure it out creatively",
            archetypeScore: 1,
          },
        ],
      },
    ],
    // No separate scenario questions; incorporated in oblique if needed
    scenario: [],
    forcedChoice: [
      {
        id: "mm5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "mm5A",
            text: "“I recheck tasks to make sure they’re right.” (Micromanager)",
            archetype: "micromanager",
          },
          {
            id: "mm5B",
            text: "“I delay decisions until I’m certain.” (Bottleneck)",
            archetype: "bottleneck-manager",
          },
          {
            id: "mm5C",
            text: "“I jump in to fix urgent issues.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "mm5D",
            text: "“I step back and let the team handle things.” (Detached)",
            archetype: "detached-manager",
          },
        ],
      },
      {
        id: "mm6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "mm6A",
            text: "“I feel uneasy unless I see the details myself.” (Micromanager)",
            archetype: "micromanager",
          },
          {
            id: "mm6B",
            text: "“I prefer predictable rules to guide my work.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "mm6C",
            text: "“I take on extra work to prove my value.” (Overloaded Doer)",
            archetype: "overloaded-doer",
          },
          {
            id: "mm6D",
            text: "“I smooth over disagreements quickly.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
        ],
      },
      {
        id: "bm5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "bm5A",
            text: "“I wait for approval before moving forward.” (Bottleneck)",
            archetype: "bottleneck-manager",
          },
          {
            id: "bm5B",
            text: "“I dive into daily tasks myself.” (Overloaded Doer)",
            archetype: "overloaded-doer",
          },
          {
            id: "bm5C",
            text: "“I avoid giving tough feedback.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "bm5D",
            text: "“I focus on visibility to leadership.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
        ],
      },
      {
        id: "bm6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "bm6A",
            text: "“I feel safer keeping decisions with me.” (Bottleneck)",
            archetype: "bottleneck-manager",
          },
          {
            id: "bm6B",
            text: "“I prefer structured long term strategy.",
            archetype: "strategic-architect",
          },
          {
            id: "bm6B",
            text: "“I follow procedures closely.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "bm6C",
            text: "“I withdraw when work feels overwhelming.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "bm6D",
            text: "“I jump into crises as they arise.” (Firefighter)",
            archetype: "firefighter",
          },
        ],
      },
      {
        id: "ff5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "ff5A",
            text: "“I thrive in high-pressure, urgent situations.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "ff5B",
            text: "“I recheck everything for accuracy.” (Micromanager)",
            archetype: "micromanager",
          },
          {
            id: "ff5C",
            text: "“I avoid tough conversations.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "ff5D",
            text: "“I keep work predictable with rules.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
        ],
      },
      {
        id: "ff6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "ff6A",
            text: "“I drop everything to handle urgent issues.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "ff6B",
            text: "“I wait until I feel ready before acting.” (Bottleneck)",
            archetype: "bottleneck-manager",
          },
          {
            id: "ff6C",
            text: "“I withdraw when leadership pressures rise.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "ff6D",
            text: "“I look for visibility with senior leaders.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
        ],
      },
      {
        id: "od5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "od5A",
            text: "“I say yes even if it overextends me.” (Overloaded Doer)",
            archetype: "overloaded-doer",
          },
          {
            id: "od5B",
            text: "“I enforce procedures and rules.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "od5C",
            text: "“I retreat when work feels overwhelming.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "od5D",
            text: "“I lighten tension with humor.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
        ],
      },
      {
        id: "od6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "od6A",
            text: "“I step in and do the work myself.” (Overloaded Doer)",
            archetype: "overloaded-doer",
          },
          {
            id: "od6B",
            text: "“I thrive when solving urgent problems.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "od6C",
            text: "“I avoid giving hard feedback.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "od6D",
            text: "“I look for visibility with leaders.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
        ],
      },
      {
        id: "ca5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "ca5A",
            text: "“I avoid hard conversations to maintain peace.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "ca5B",
            text: "“I double-check details myself.” (Micromanager)",
            archetype: "micromanager",
          },
          {
            id: "ca5C",
            text: "“I focus on recognition from leaders.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
          {
            id: "ca5D",
            text: "“I retreat into my own space when stressed.” (Detached)",
            archetype: "detached-manager",
          },
        ],
      },
      {
        id: "ca6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "ca6A",
            text: "“I soften disagreements to keep harmony.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "ca6B",
            text: "“I wait until I feel ready before acting.” (Bottleneck)",
            archetype: "bottleneck-manager",
          },
          {
            id: "ca6C",
            text: "“I throw myself into urgent issues.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "ca6D",
            text: "“I follow set procedures closely.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
        ],
      },
      {
        id: "cs5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "cs5A",
            text: "“I emphasize my role so leadership sees my impact.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
          {
            id: "cs5B",
            text: "“I avoid conflict whenever possible.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "cs5C",
            text: "“I rely on rules and procedures to guide me.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "cs5D",
            text: "“I take on more work than I should.” (Overloaded Doer)",
            archetype: "overloaded-doer",
          },
        ],
      },
      {
        id: "cs6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "cs6A",
            text: "“I pursue visibility to create future opportunities.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
          {
            id: "cs6B",
            text: "“I dive into urgent problems quickly.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "cs6C",
            text: "“I withdraw when leadership pressures rise.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "cs6D",
            text: "“I double-check all the details myself.” (Micromanager)",
            archetype: "micromanager",
          },
        ],
      },
      {
        id: "dm5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "dm5A",
            text: "“I withdraw when overwhelmed.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "dm5B",
            text: "“I recheck everything for quality.” (Micromanager)",
            archetype: "micromanager",
          },
          {
            id: "dm5C",
            text: "“I avoid difficult conversations.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
          {
            id: "dm5D",
            text: "“I push for my role to be recognized.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
        ],
      },
      {
        id: "dm6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "dm6A",
            text: "“I step back when things get too chaotic.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "dm6B",
            text: "“I thrive when solving urgent problems.” (Firefighter)",
            archetype: "firefighter",
          },
          {
            id: "dm6C",
            text: "“I follow rules more than adapt.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "dm6D",
            text: "“I say yes to too many requests.” (Overloaded Doer)",
            archetype: "overloaded-doer",
          },
        ],
      },
      {
        id: "rbo5",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "rbo5A",
            text: "“I prefer rules and structure to guide my work.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "rbo5B",
            text: "“I delay decisions until I’m confident.” (Bottleneck)",
            archetype: "bottleneck-manager",
          },
          {
            id: "rbo5C",
            text: "“I step in and re-do tasks myself.” (Micromanager)",
            archetype: "micromanager",
          },
          {
            id: "rbo5D",
            text: "“I lighten tension with humor.” (Conflict Avoider)",
            archetype: "conflict-avoider",
          },
        ],
      },
      {
        id: "rbo6",
        instructions: "Pick most/least like me:",
        statements: [
          {
            id: "rbo6A",
            text: "“I rely on procedures even in new situations.” (Rule-Bound)",
            archetype: "rule-bound-operator",
          },
          {
            id: "rbo6B",
            text: "“I disengage when overwhelmed.” (Detached)",
            archetype: "detached-manager",
          },
          {
            id: "rbo6C",
            text: "“I seek visibility with leaders.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
          {
            id: "rbo6D",
            text: "“I look for visibility with senior leaders.” (Credit Seeker)",
            archetype: "credit-seeker",
          },
        ],
      },
    ],
    balancing: [
      {
        id: "b1",
        type: "balancing",
        text: "I trust my team to complete tasks without my direct oversight.",
        archetype: "micromanager",
        isReverseCoded: true,
      },
      {
        id: "b2",
        type: "balancing",
        text: "I move forward with decisions even without full approval.",
        archetype: "bottleneck-manager",
        isReverseCoded: true,
      },
      {
        id: "b3",
        type: "balancing",
        text: "I prioritize long-term planning over reacting to daily issues.",
        archetype: "firefighter",
        isReverseCoded: true,
      },
      {
        id: "b4",
        type: "balancing",
        text: "I say no when my workload is already full.",
        archetype: "overloaded-doer",
        isReverseCoded: true,
      },
      {
        id: "b5",
        type: "balancing",
        text: "I raise concerns directly with leadership when needed.",
        archetype: "conflict-avoider",
        isReverseCoded: true,
      },
      {
        id: "b6",
        type: "balancing",
        text: "I give credit to the team before myself.",
        archetype: "credit-seeker",
        isReverseCoded: true,
      },
      {
        id: "b7",
        type: "balancing",
        text: "I stay engaged even when work feels heavy.",
        archetype: "detached-manager",
        isReverseCoded: true,
      },
      {
        id: "b8",
        type: "balancing",
        text: "I flex processes when the situation requires it.",
        archetype: "rule-bound-operator",
        isReverseCoded: true,
      },
      {
        id: "b9",
        type: "balancing",
        text: "I welcome tough conversations as part of leadership.",
        archetype: "conflict-avoider",
        isReverseCoded: true,
      },
      {
        id: "b10",
        type: "balancing",
        text: "I focus on results more than visibility.",
        archetype: "credit-seeker",
        isReverseCoded: true,
      },
      {
        id: "b11",
        type: "balancing",
        text: "I step into planning rather than waiting for problems.",
        archetype: "firefighter",
        isReverseCoded: true,
      },
      {
        id: "b12",
        type: "balancing",
        text: "I delegate and let go of control once tasks are assigned.",
        archetype: "micromanager",
        isReverseCoded: true,
      },
    ],
  },

  scoring: {
    forcedChoiceMost: 2,
    forcedChoiceLeast: -1,
    resistanceBands: {
      low: { min: 0, max: 39 },
      moderate: { min: 40, max: 69 },
      high: { min: 70, max: 100 },
    },
  },
  specialScenarios: [
    {
      id: "low_resistance",
      title:
        "Low Resistance Profile (Scores mostly below 34 across archetypes)",
      condition: {
        type: "all_low",
        thresholds: { low: 34 },
      },
      content: {
        firstKnowThis:
          "Your profile indicates low resistance across all eight archetypes. Rather than being pulled strongly into one pattern, you demonstrate adaptability and balanced leadership behaviors. This doesn't mean you never face resistance — it means your resistance rarely solidifies into a dominant style that drags enterprise outcomes.",
        whatThisLooksLike: [
          "You flex easily across contexts without becoming locked into one approach.",
          "Peers and stakeholders see you as balanced and steady under pressure.",
          "Resistance still shows up situationally, but it tends to pass quickly rather than define your leadership.",
        ],
        strengthsHiddenInside: [
          "Ability to adapt leadership stance to fit the moment without being constrained by one dominant style.",
          "Perceived as steady and reliable, which strengthens trust with peers, boards, and investors.",
          "Naturally positioned to act as an integrator, bridging gaps between leaders with stronger resistance patterns.",
        ],
        potentialRisks: [
          "Boards or investors may misinterpret adaptability as lack of conviction, creating doubt about your leadership brand.",
          "Subtle resistances can remain hidden and reappear in high-stakes moments, catching others off guard.",
          "Without conscious reflection, you may underestimate how small frictions compound, leading to unnoticed drag on enterprise performance.",
        ],
        growthPath: [
          "Leverage your balanced stance to lead cross-functional transformation, where adaptability is critical.",
          "Build routines of reflection to spot early warning signs of resistance before they escalate.",
          "Strengthen your profile by articulating a signature leadership identity so stakeholders see consistency, not just flexibility.",
        ],
      },
    },
    {
      id: "moderate_resistance",
      title:
        "Moderate Resistance Profile (Scores mostly between 35–54 across archetypes)",
      condition: {
        type: "all_moderate",
        thresholds: { moderate: 35 },
      },
      content: {
        firstKnowThis:
          "Your profile shows moderate resistance across multiple archetypes. You have identifiable tendencies — but none dominate so strongly that they define your leadership. This middle ground provides both flexibility and challenge: you can shift styles, but resistance may still create drag in moments of stress.",
        whatThisLooksLike: [
          "You flex across contexts, but recurring frictions are noticeable to peers and stakeholders.",
          "Resistance shows up as inconsistencies — decisive in some moments, hesitant in others; collaborative in one forum, rigid in another.",
          "Peers may admire your balance but occasionally feel uncertainty about your default style.",
        ],
        strengthsHiddenInside: [
          "You can draw on multiple leadership archetypes, giving you versatility across situations.",
          "Moderate resistance signals that you are not locked into one rigid pattern, preserving your ability to adapt.",
          "Boards and investors may value this as a balanced risk profile, particularly in volatile markets.",
        ],
        potentialRisks: [
          "Inconsistent signals can dilute influence with boards or peers, as stakeholders may not know which version of you will show up.",
          "Moderate resistance across several areas can combine into hidden organizational drag, even if no single archetype is dominant.",
          "Missed opportunities can occur when frictions accumulate, creating hesitation in decisive moments.",
        ],
        growthPath: [
          "Identify your top two or three moderate archetypes and study how they interact — when they reinforce each other and when they conflict.",
          "Focus on pattern consistency: clarify your leadership stance so stakeholders feel steady confidence.",
          "Select one archetype at a time to actively manage for 90 days, measure impact at the enterprise level, then shift focus.",
        ],
      },
    },
    {
      id: "mixed_balanced_highs",
      title:
        "Mixed / Balanced Highs Profile (No single archetype dominates; several score high)",
      condition: {
        type: "mixed_balanced_highs",
      },
      content: {
        firstKnowThis:
          "Your profile shows multiple archetypes at high resistance levels, with no single dominant pattern. This indicates that resistance shows up in several different ways depending on context — you may be highly structured in some situations, overly people-focused in others, or push change urgently when momentum feels stuck.",
        whatThisLooksLike: [
          "Resistance is context-sensitive: your style shifts based on situation, but not always predictably.",
          'Stakeholders may find you harder to "pin down," since your leadership pattern isn\'t singular but multifaceted.',
          "In high-stakes environments, this can create both flexibility and volatility.",
        ],
        strengthsHiddenInside: [
          "Ability to draw from multiple leadership strengths (visionary, stabilizer, coach, change agent) depending on the context.",
          "Seen as multidimensional, which can be a powerful asset when integrated intentionally.",
          "Potential to act as a connector across diverse leadership archetypes, translating between different executive mindsets.",
        ],
        potentialRisks: [
          "Strategic confusion: teams, peers, and boards may find it unclear which version of you will show up under pressure.",
          "Inconsistent enterprise execution: high resistance in multiple archetypes can fragment alignment and momentum.",
          "Reputational drag: boards or investors may perceive you as lacking a clear leadership brand, reducing succession credibility.",
          "Volatility: when multiple resistances activate simultaneously, it can create decision whiplash, slowing execution.",
        ],
        growthPath: [
          "Rather than trying to reduce all resistances at once, identify where the enterprise cost is highest (e.g., investor confidence, strategic agility, talent accountability).",
          "Anchor yourself in a primary leadership identity while actively managing secondary resistances.",
          "Develop clarity in how you present yourself to boards and stakeholders, ensuring they see consistency even as you flex behind the scenes.",
          "Treat your mixed profile as a platform for integration: deliberately connect strengths across archetypes into a coherent leadership brand.",
        ],
      },
    },
  ],
};

// Export all assessment categories (currently only middle-management, but extensible)
export const ASSESSMENT_CATEGORIES: Record<string, AssessmentCategory> = {
  "middle-management": MIDDLE_MANAGEMENT_CATEGORY,
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
  const actualArchetypes = category.archetypes.filter(
    (archetype) =>
      !["low-resistance", "moderate-resistance", "mixed-resistance"].includes(
        archetype.id,
      ),
  );

  return actualArchetypes;
}
