// Central Questions Data File for All Paid Assessment Categories
// This file contains the Team Communication Assessment category with questions, archetypes, scoring, and reporting logic

// Interfaces for TypeScript type safety
export interface AssessmentArchetype {
  id: string;
  name: string;
  description: string;
  traits: string[];
  detailedDescription?: string;
  highResistanceDescription?: string;
  coreBehaviorsUnderResistance?: string[];
  rootCauses?: string[];
  beliefsThatDriveResistance?: string[];
  stressBehaviors?: string[];
  situationalAdaptations?: string[];
  strengthsHiddenInside?: string[];
  resistanceCosts?: string[];
  detailedResistanceCosts?: string[];
  growthPath?: {
    immediateShifts: string[];
    strategicPractices: string[];
    longTermGrowth: string[];
    microLearningNote?: string;
  };
}

export interface AssessmentQuestion {
  id: string;
  type:
    | "direct"
    | "oblique"
    | "scenario"
    | "forced-choice"
    | "balancing"
    | "demographic";
  text: string;
  archetype?: string;
  options?: QuestionOption[];
  archetypeMapping?: Record<string, number>;
  isReverseCoded?: boolean;
}

export interface QuestionOption {
  value: string;
  text: string;
  archetypeScore?: number;
}

export interface ForcedChoiceBlock {
  id: string;
  instruction?: string;
  statements: ForcedChoiceStatement[];
}

export interface ForcedChoiceStatement {
  id?: string;
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
    demographic: AssessmentQuestion[];
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
    normalize: (raw: number) => number;
    balancingNormalize: (raw: number) => number;
    adjustForBalancingIndex: (
      archetypeScores: number[],
      balancingScore: number,
    ) => number[];
  };
  scenarioReports: {
    allMedium: string;
    mixedMediumLow: string;
    allLow: string;
  };
  specialScenarios?: SpecialScenario[];
}

export interface AssessmentResult {
  archetypeScores: {
    archetypeId: string;
    score: number;
    resistanceLevel: string;
  }[];
  topArchetypes: {
    archetypeId: string;
    score: number;
    resistanceLevel: string;
  }[];
  balancingIndex: number;
  scenarioReport?: string;
  detailedReport: string;
}

// Likert scale for direct, oblique, and balancing questions
export const LIKERT_SCALE = {
  "strongly-disagree": 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  "strongly-agree": 5,
};

const TEAM_COMMUNICATION_CATEGORY: AssessmentCategory = {
  id: "team-communication",
  name: "Team Communication Assessment",
  description:
    "Comprehensive team communication style and resistance pattern assessment based on 8 archetypes",
  archetypes: [
    {
      id: "withholder",
      name: "Withholder",
      description: "Holds back concerns to avoid conflict",
      traits: [
        "Stays silent in disagreements",
        "Holds back until safe",
        "Prioritizes calm over candor",
        "Relies on others to speak up",
      ],
      detailedDescription:
        "Being a Withholder doesn’t mean you don’t care about the team. It means you’ve learned to keep concerns, questions, or feedback inside rather than risk rocking the boat. This instinct can feel protective — you avoid immediate conflict, maintain calm, and prevent tension. But when it shows up strongly, the team misses your input, problems linger unspoken, and collaboration suffers.",
      highResistanceDescription:
        "At this level, your hesitation to share openly isn’t just occasional — it’s a defining influence in your team communication. While silence may prevent short-term friction, it often creates long-term misalignment, missed opportunities, and unspoken frustrations that limit team trust.",
      coreBehaviorsUnderResistance: [
        "Stay quiet in meetings, even when disagreeing.",
        "Hold back concerns until issues become unavoidable.",
        "Rely on others to raise difficult topics.",
        "Agree outwardly while privately feeling otherwise.",
        "Share only when they feel completely safe.",
      ],
      rootCauses: [
        "Workplaces where dissent was punished or ignored.",
        "Teams where conflict escalated instead of being resolved.",
        "Cultures or families that valued politeness over candor.",
        "Early career experiences where sharing ideas led to criticism.",
      ],
      beliefsThatDriveResistance: [
        "“Speaking up makes things worse.”",
        "“It’s safer to stay quiet than risk conflict.”",
        "“Silence maintains harmony.”",
        "“My input won’t change the outcome.”",
      ],
      stressBehaviors: [
        "Stay silent even when strongly opposed.",
        "Withdraw from heated group discussions.",
        "Numb out or disengage emotionally.",
        "Allow decisions to move forward without input.",
      ],
      situationalAdaptations: [
        "Leaders actively invite their perspective.",
        "Trust and psychological safety are strong.",
        "Meetings are structured to ensure everyone contributes.",
        "Past experiences of speaking up were received positively.",
      ],
      strengthsHiddenInside: [
        "Calm presence prevents unnecessary conflict.",
        "Patience gives space for others to speak.",
        "Careful listening helps you see group dynamics others miss.",
        "Measured contributions are often thoughtful and precise.",
      ],
      detailedResistanceCosts: [
        "Critical issues go unspoken until they escalate.",
        "Innovation suffers when diverse perspectives stay hidden.",
        "Teammates may see you as disengaged or withholding trust.",
        "Leaders may overlook you for roles requiring candor or influence.",
      ],
      growthPath: {
        immediateShifts: [
          "Commit to sharing one perspective in each meeting.",
          "When silence feels safer, ask yourself: Am I protecting myself, or withholding value?",
          "Replace “I’ll wait until asked” with “Here’s one thought I’d like to add.”",
        ],
        strategicPractices: [
          "Track situations where withholding created missed clarity or direction.",
          "Use structured turn-taking or “round robin” methods to practice safe participation.",
          "Ask a trusted peer to nudge you when your input would help.",
        ],
        longTermGrowth: [
          "Reframe contribution as responsibility, not risk.",
          "Anchor your identity in candor and visible value.",
          "Build a reputation as someone whose voice consistently shapes outcomes.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "guarded-collaborator",
      name: "Guarded Collaborator",
      description: "Shares only selectively until trust is established",
      traits: [
        "Selective contribution",
        "Holds back full perspective",
        "Vague when trust is low",
        "Appears measured",
      ],
      detailedDescription:
        "Being a Guarded Collaborator doesn’t mean you are disengaged or uncooperative. It means you choose to participate carefully, sharing only what feels safe while keeping other thoughts or emotions private. This instinct protects you from judgment, rejection, or misuse of your input. At high levels, though, it creates a wall: your team never gets your full perspective, which limits trust, transparency, and innovation.",
      highResistanceDescription:
        "At this level, guardedness shapes almost every group interaction. You may contribute selectively, hold back your real opinions, or give only partial input. While this feels safer, it leads others to sense distance or caution — which can weaken collaboration and leave important insights unheard.",
      coreBehaviorsUnderResistance: [
        "Share only a partial version of their perspective in meetings.",
        "Keep personal thoughts and emotions to themselves.",
        "Offer safe, general answers instead of specifics.",
        "Hold back ideas until they feel completely trusted.",
        "Appear measured, cautious, or emotionally distant in groups.",
      ],
      rootCauses: [
        "Teams or leaders who dismissed or criticized vulnerability.",
        "Workplaces where revealing too much created conflict or politics.",
        "Family or school systems where privacy was valued more than openness.",
        "Past experiences where speaking candidly damaged trust or reputation.",
      ],
      beliefsThatDriveResistance: [
        "“It is safer not to reveal too much.”",
        "“Holding back protects me from judgment.”",
        "“Others don’t need to know everything I think or feel.”",
        "“If I stay guarded, I stay in control.”",
      ],
      stressBehaviors: [
        "Withdraw further and share even less.",
        "Provide only minimal or vague input.",
        "Avoid showing emotion in group settings.",
        "Retreat into task focus instead of team communication.",
      ],
      situationalAdaptations: [
        "Leaders or peers create psychological safety.",
        "They see vulnerability rewarded, not punished.",
        "Structures like round-robin discussions invite equal input.",
        "Relationships deepen and trust builds over time.",
      ],
      strengthsHiddenInside: [
        "Caution prevents oversharing sensitive information.",
        "Measured communication ensures contributions are thoughtful.",
        "Emotional restraint creates stability in heated moments.",
        "Privacy boundaries protect professionalism.",
      ],
      detailedResistanceCosts: [
        "Team members may feel shut out or unsure of your trust.",
        "Important insights remain hidden, weakening decisions.",
        "Others may interpret guardedness as disengagement.",
        "Innovation slows when ideas are filtered too heavily.",
      ],
      growthPath: {
        immediateShifts: [
          "Share one fuller version of your idea instead of a filtered version.",
          "When tempted to hold back, ask: Am I protecting myself, or limiting trust?",
          "Practice opening up in low-stakes conversations first.",
        ],
        strategicPractices: [
          "Track how guardedness affects group trust and collaboration.",
          "Use regular check-ins to test sharing more than you normally would.",
          "Create a “safe disclosure habit” — something small and consistent each week.",
        ],
        longTermGrowth: [
          "Reframe openness as credibility, not vulnerability.",
          "Anchor your identity in transparency and trust-building.",
          "Build a reputation as someone peers rely on for full, honest input.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "dominator",
      name: "Dominator",
      description: "Pushes perspective forcefully to influence",
      traits: [
        "Asserts strongly",
        "Takes control of discussions",
        "Sees disagreement as debate",
        "Values visibility over sharing",
      ],
      detailedDescription:
        "Being a Dominator doesn’t mean you lack respect for others. It means you’ve learned to secure influence by speaking forcefully, pushing your perspective, and driving conversations forward. This energy can be valuable when decisions need urgency. But when it shows up strongly, it overshadows collaboration — others may feel unheard, tensions escalate, and trust erodes.",
      highResistanceDescription:
        "At this level, your need to assert and win in conversations shapes most of your team interactions. You may dominate meetings, cut others off, or insist on your way. While this creates control and visibility, it also silences other voices and can turn healthy debate into conflict.",
      coreBehaviorsUnderResistance: [
        "Speak with force until their view is accepted.",
        "Interrupt or take control of discussions.",
        "See disagreement as a debate to be won.",
        "Push harder when others resist.",
        "Value presence and visibility over shared ownership.",
      ],
      rootCauses: [
        "Early teams where only the loudest were heard.",
        "Workplaces that rewarded forceful leadership.",
        "Family or cultural contexts where authority was asserted, not negotiated.",
        "Experiences where being quiet meant being overlooked.",
      ],
      beliefsThatDriveResistance: [
        "“The strongest voice wins.”",
        "“If I don’t take charge, I’ll be ignored.”",
        "“Conflict is about proving who’s right.”",
        "“Control equals respect.”",
      ],
      stressBehaviors: [
        "Become louder or more insistent.",
        "Escalate disagreements quickly.",
        "Talk over others to keep control.",
        "Push for decisions before the group is ready.",
      ],
      situationalAdaptations: [
        "Leaders emphasize shared decision-making.",
        "They receive feedback that listening builds more influence.",
        "Structures (like facilitation) ensure equal voices.",
        "They practice framing arguments as invitations instead of demands.",
      ],
      strengthsHiddenInside: [
        "Passion and urgency move teams out of paralysis.",
        "Willingness to speak up ensures issues don’t get buried.",
        "Confidence provides stability in uncertain times.",
        "Drive keeps momentum when others hesitate.",
      ],
      detailedResistanceCosts: [
        "Others disengage because they don’t feel heard.",
        "Conflict cycles escalate instead of resolving.",
        "Leaders may view you as difficult to manage.",
        "Trust weakens when persuasion feels like pressure.",
      ],
      growthPath: {
        immediateShifts: [
          "Pause twice before speaking in meetings.",
          "Ask yourself: Am I leading the conversation, or taking it over?",
          "Replace statements with one clarifying question to open space for others.",
        ],
        strategicPractices: [
          "Track when dominating conversations led to resistance or disengagement.",
          "Practice “last to speak” in group discussions.",
          "Seek feedback from peers on balance between leading and listening.",
        ],
        longTermGrowth: [
          "Reframe leadership as influence, not airtime.",
          "Anchor your identity in facilitation and empowerment.",
          "Build a reputation as a leader who creates space for others to shine.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "peacemaker",
      name: "Peacemaker",
      description: "Agrees quickly to maintain harmony",
      traits: [
        "Agrees to avoid disagreement",
        "Smooths over tensions",
        "Takes on extra to keep peace",
        "Apologizes quickly",
      ],
      detailedDescription:
        "Being a Peacemaker doesn’t mean you lack opinions or strength. It means you’ve learned to value harmony so highly that you often sacrifice candor, honesty, or your own needs to keep the group calm. This instinct creates goodwill and avoids conflict, but when it shows up strongly, it silences your perspective, builds hidden frustrations, and prevents teams from addressing real issues.",
      highResistanceDescription:
        "At this level, your drive to smooth things over strongly shapes your communication. You may agree too quickly, downplay disagreements, or take on extra responsibilities to avoid letting others down. While this makes you likeable, it also reduces your influence and prevents the group from fully solving problems.",
      coreBehaviorsUnderResistance: [
        "Say yes quickly to avoid disappointing others.",
        "Downplay concerns to keep conversations calm.",
        "Apologize quickly to ease tension, even if not at fault.",
        "Agree outwardly while disagreeing inside.",
        "Step in as the “buffer” when conflict arises.",
      ],
      rootCauses: [
        "Families or workplaces that avoided difficult conversations.",
        "Cultures that valued politeness and compliance over candor.",
        "Early experiences where standing up for yourself caused rejection or punishment.",
        "Teams where disagreement was discouraged or seen as disloyalty.",
      ],
      beliefsThatDriveResistance: [
        "“Conflict is harmful, not helpful.”",
        "“Keeping harmony matters more than being right.”",
        "“Disagreement will damage relationships.”",
        "“It’s my job to smooth over tension.”",
      ],
      stressBehaviors: [
        "Give in faster to end tension.",
        "Take on more work to avoid saying no.",
        "Over-apologize to reduce conflict.",
        "Numb or hide their own frustration.",
      ],
      situationalAdaptations: [
        "Leaders frame disagreement as problem-solving, not conflict.",
        "Structures invite multiple viewpoints and normalize respectful dissent.",
        "They build confidence that “no” can be said without rejection.",
        "They experience situations where honesty strengthens trust.",
      ],
      strengthsHiddenInside: [
        "Builds trust and warmth across the team.",
        "Creates psychological safety through kindness and empathy.",
        "Good at spotting tension early and diffusing it.",
        "Helps maintain morale during stressful times.",
      ],
      detailedResistanceCosts: [
        "Concerns remain unspoken, leading to repeated problems.",
        "Workload imbalance occurs when you take on too much.",
        "Leaders may undervalue your influence if you never challenge ideas.",
        "Teams lose out on your unique perspective because you self-silence.",
      ],
      growthPath: {
        immediateShifts: [
          "Voice one honest disagreement this week, even if it feels uncomfortable.",
          "Replace “I’ll stay quiet” with “Here’s one concern I want to surface.”",
          "Remind yourself: Conflict avoided now becomes a bigger issue later.",
        ],
        strategicPractices: [
          "Track how often harmony was chosen over clarity.",
          "Use respectful framing (“I see it differently because…”) to practice disagreement.",
          "Role-play difficult conversations to build confidence.",
        ],
        longTermGrowth: [
          "Reframe candor as commitment to the team, not conflict.",
          "Anchor your identity in balanced honesty.",
          "Build a reputation as someone who unites people through truth, not avoidance.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "fragmenter",
      name: "Fragmenter",
      description: "Keeps work siloed and communication contained",
      traits: [
        "Focuses on own tasks",
        "Shares selectively",
        "Resists cross-team alignment",
        "Values independence",
      ],
      detailedDescription:
        "Being a Fragmenter doesn’t mean you’re uncooperative. It means you’ve learned to protect your work by keeping communication siloed — sharing only what feels necessary and focusing on your own responsibilities. This instinct can create efficiency and ownership, but at high levels it isolates your work, weakens collaboration, and prevents the team from functioning as one unit.",
      highResistanceDescription:
        "At this level, your tendency to work in silos shapes most of your group interactions. You may withhold updates, share selectively, or resist alignment with others. While this protects your independence, it often creates duplication, misalignment, and breakdowns in trust across teams.",
      coreBehaviorsUnderResistance: [
        "Share updates only with their immediate circle.",
        "Keep projects or information compartmentalized.",
        "Resist cross-team alignment to maintain control.",
        "Retreat into their own tasks during high-pressure times.",
        "Value independence over interdependence.",
      ],
      rootCauses: [
        "Teams where sharing too much led to criticism or blame.",
        "Workplaces where silos were rewarded for control and speed.",
        "Cultures that emphasized independence over interdependence.",
        "Early experiences where relying on others led to disappointment.",
      ],
      beliefsThatDriveResistance: [
        "“Sharing too much slows things down.”",
        "“It’s safer to control my work than rely on others.”",
        "“Full alignment is inefficient.”",
        "“Others don’t need to know everything I’m doing.”",
      ],
      stressBehaviors: [
        "Retreat further into their own tasks.",
        "Minimize updates or communication.",
        "Resist cross-functional check-ins.",
        "Focus only on delivery in their area, ignoring team context.",
      ],
      situationalAdaptations: [
        "Leaders emphasize shared goals and outcomes.",
        "Structures require regular cross-team updates.",
        "Trust builds that collaboration won’t slow progress.",
        "They see examples of shared ownership leading to success.",
      ],
      strengthsHiddenInside: [
        "Strong ownership of responsibilities.",
        "Independence and self-reliance.",
        "Efficiency in delivering within their scope.",
        "Reduced risk of micromanagement.",
      ],
      detailedResistanceCosts: [
        "Duplication of work due to withheld information.",
        "Misalignment between teams or departments.",
        "Reduced innovation from limited knowledge-sharing.",
        "Colleagues may feel excluded or mistrusted.",
      ],
      growthPath: {
        immediateShifts: [
          "Share one cross-team update each week.",
          "Replace “That’s not my area” with “Here’s how this connects to X.”",
          "Make one effort to link your work to enterprise goals.",
        ],
        strategicPractices: [
          "Track how siloed communication caused rework or misalignment.",
          "Use collaboration tools or shared dashboards to increase visibility.",
          "Intentionally invite other teams into conversations earlier.",
        ],
        longTermGrowth: [
          "Reframe collaboration as efficiency, not extra effort.",
          "Anchor your identity in enterprise-mindedness.",
          "Build a reputation as someone who strengthens alignment across boundaries.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "closed-off-colleague",
      name: "Closed-Off Colleague",
      description: "Keeps input minimal and emotions private",
      traits: [
        "Rarely volunteers ideas",
        "Brief contributions",
        "Appears detached",
        "Avoids personal insights",
      ],
      detailedDescription:
        "Being a Closed-Off Colleague doesn’t mean you lack ideas or value. It means you’ve learned to keep your input minimal and your emotions private in group settings. This instinct can feel safe — protecting you from judgment or overexposure — but when it shows up strongly, the team misses your contributions, engagement suffers, and collaboration feels one-sided.",
      highResistanceDescription:
        "At this level, your reluctance to share openly shapes most of your workplace communication. You may contribute only when asked, give short responses, or appear disengaged. While this helps you avoid risk, it can reduce your visibility, make others question your commitment, and leave valuable ideas unspoken.",
      coreBehaviorsUnderResistance: [
        "Stay quiet in group meetings unless directly called on.",
        "Provide brief or minimal answers.",
        "Avoid offering personal insights or creative suggestions.",
        "Hold back emotions or reactions during discussions.",
        "Appear detached or uninvolved in group dynamics.",
      ],
      rootCauses: [
        "Teams or leaders who dismissed or criticized contributions.",
        "Workplaces that rewarded compliance over creativity.",
        "Cultures where privacy was valued more than vulnerability.",
        "Past experiences where speaking up created embarrassment or conflict.",
      ],
      beliefsThatDriveResistance: [
        "“It’s safer to keep my thoughts to myself.”",
        "“My input isn’t necessary unless asked.”",
        "“Speaking up creates more risk than reward.”",
        "“Emotions don’t belong in professional settings.”",
      ],
      stressBehaviors: [
        "Withdraw further and disengage from group discussions.",
        "Avoid speaking entirely, even when needed.",
        "Offer only surface-level participation.",
        "Shut down emotionally to stay safe.",
      ],
      situationalAdaptations: [
        "Leaders or facilitators actively invite their perspective.",
        "Group structures create equal speaking opportunities.",
        "Trust builds that input won’t be judged harshly.",
        "They see that vulnerability is rewarded, not punished.",
      ],
      strengthsHiddenInside: [
        "Rarely derail discussions with unnecessary commentary.",
        "Focused on tasks and delivery.",
        "Stable and composed, even in heated conversations.",
        "Strong observer of team dynamics.",
      ],
      detailedResistanceCosts: [
        "Others may perceive disengagement or lack of commitment.",
        "Valuable insights go unspoken, reducing innovation.",
        "Team trust is limited without reciprocal openness.",
        "Leaders may overlook you for roles requiring influence or visibility.",
      ],
      growthPath: {
        immediateShifts: [
          "Share one idea in every group session, even if small.",
          "When tempted to stay quiet, ask: Am I protecting myself, or missing impact?",
          "Use safe entry phrases: “One idea I’d like to test is…”",
        ],
        strategicPractices: [
          "Track when withholding slowed team progress.",
          "Create rituals of sharing (weekly updates, stand-ups).",
          "Pair with a peer to co-present ideas and build safety.",
        ],
        longTermGrowth: [
          "Reframe visibility as accountability, not exposure.",
          "Anchor your identity in engagement and reliability.",
          "Build a reputation as a trusted contributor who strengthens team momentum.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "distractor",
      name: "Distractor",
      description: "Uses humor or tangents to shift focus",
      traits: [
        "Lightens tension with humor",
        "Changes subjects to avoid conflict",
        "Adapts stance to group",
        "Goes off-topic in heavy discussions",
      ],
      detailedDescription:
        "Being a Distractor doesn’t mean you lack focus or care about results. It means you’ve learned to defuse tension, fit in, or avoid conflict by shifting attention — through humor, tangents, or adapting your stance to the group. This instinct can bring lightness and flexibility, but when it shows up strongly, it derails focus, creates confusion, and prevents meaningful resolution.",
      highResistanceDescription:
        "At this level, your tendency to redirect group energy is a consistent pattern. You may crack jokes in tense moments, go off on tangents, or change positions to blend in. While this helps reduce pressure, it often frustrates teammates who want clarity and focus — and it can make your contributions feel less reliable.",
      coreBehaviorsUnderResistance: [
        "Use humor to ease tension, even if it disrupts focus.",
        "Shift conversations away from conflict or discomfort.",
        "Adapt their stance to match the group.",
        "Go off-topic when discussions feel heavy.",
        "Avoid holding firm opinions to prevent friction.",
      ],
      rootCauses: [
        "Teams or families where humor was the safest way to cope with conflict.",
        "Workplaces where fitting in mattered more than standing firm.",
        "Early experiences where blending in reduced the risk of criticism.",
        "Situations where tension was avoided instead of addressed.",
      ],
      beliefsThatDriveResistance: [
        "“Lightening the mood keeps the group together.”",
        "“Blending in is safer than standing out.”",
        "“If I distract from conflict, things won’t get worse.”",
        "“Focus on the issue creates too much tension.”",
      ],
      stressBehaviors: [
        "Increase humor or sarcasm to defuse discomfort.",
        "Change topics abruptly.",
        "Mirror others’ opinions to avoid conflict.",
        "Reduce seriousness just when focus is most needed.",
      ],
      situationalAdaptations: [
        "Leaders acknowledge tension directly and keep discussions on track.",
        "Structures provide clear agendas and time limits.",
        "They feel safe to hold their own stance without fear of rejection.",
        "Humor is welcomed at appropriate times, not as avoidance.",
      ],
      strengthsHiddenInside: [
        "Brings levity that can ease group stress.",
        "Flexible and able to adapt to different personalities.",
        "Bridges between conflicting parties by softening tone.",
        "Helps prevent group morale from sinking too low.",
      ],
      detailedResistanceCosts: [
        "Focus drifts away from core issues.",
        "Conflict remains unresolved because it’s avoided.",
        "Teammates may see contributions as unserious or unfocused.",
        "Leadership may perceive lack of reliability or clarity.",
      ],
      growthPath: {
        immediateShifts: [
          "Limit humor or side comments to once per meeting.",
          "Ask: Am I easing tension, or derailing focus?",
          "Replace distraction with one clarifying question to refocus the group.",
        ],
        strategicPractices: [
          "Track how distraction affected meeting outcomes.",
          "Practice grounding techniques (note-taking, facilitation roles) to stay focused.",
          "Seek feedback on moments when levity helped vs. when it harmed.",
        ],
        longTermGrowth: [
          "Reframe focus as respect, not rigidity.",
          "Anchor your identity in presence and reliability.",
          "Build a reputation as someone who balances levity with discipline.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
    {
      id: "over-adapter",
      name: "Over-Adapter",
      description: "Adjusts tone or stance to match the group",
      traits: [
        "Shifts perspective to fit in",
        "Adapts to avoid standing out",
        "Changes to match room",
        "Prioritizes blending over firmness",
      ],
      detailedDescription:
        "Being an Over-Adapter doesn’t mean you lack conviction. It means you’ve learned to shift your tone, stance, or opinion to fit the room. This instinct can reduce tension and help things move smoothly. But when it shows up strongly, your authentic perspective stays hidden, decisions lose needed clarity, and your influence decreases.",
      highResistanceDescription:
        "At this level, adapting to others isn’t occasional — it’s a defining pattern in your team communication. While aligning quickly can prevent short-term friction, it often creates long-term misalignment, unclear accountability, and a perception that you agree more than you lead — limiting trust and advancement.",
      coreBehaviorsUnderResistance: [
        "Mirroring the views of stronger voices.",
        "Saying “I agree” even when you see things differently.",
        "Holding back your authentic perspective to avoid friction.",
        "Preferring harmony over clarity.",
      ],
      rootCauses: [
        "Early environments where disagreement was punished or unsafe.",
        "Workplaces that rewarded compliance over candor.",
        "Past experiences where conflict led to negative outcomes.",
      ],
      beliefsThatDriveResistance: [
        "“It’s safer to agree than to stand out.”",
        "“Harmony matters more than clarity.”",
        "“If I speak my truth, I’ll cause conflict or lose credibility.”",
      ],
      stressBehaviors: [
        "Going along with decisions you don’t fully support.",
        "Avoiding accountability by deferring to group consensus.",
        "Feeling overlooked in promotions due to lack of distinct voice.",
      ],
      situationalAdaptations: [
        "With trusted peers, you express your perspective more openly.",
        "In low-stakes settings, you test ideas without fear.",
        "When supported by strong allies, you share more candidly.",
      ],
      strengthsHiddenInside: [
        "High sensitivity to group dynamics.",
        "Strong ability to build bridges and maintain relationships.",
        "Flexibility to understand multiple perspectives.",
      ],
      detailedResistanceCosts: [
        "At high resistance, others may see you as agreeable but not strategic.",
        "Your adaptability can be misread as indecision.",
        "Long-term, this limits credibility, visibility, and sponsorship opportunities.",
      ],
      growthPath: {
        immediateShifts: [
          "Share one authentic view in every meeting.",
          "Pause before adapting — ask: Am I aligning for clarity or avoiding conflict?",
          "Replace “I agree” with “I see it differently…” at least once this week.",
        ],
        strategicPractices: [
          "Track when adaptation diluted your real stance.",
          "Use grounding tools (values, non-negotiables) to stay anchored.",
          "Practice respectful dissent in low-stakes situations.",
        ],
        longTermGrowth: [
          "Reframe authenticity as influence, not risk.",
          "Anchor identity in confidence and integrity.",
          "Build a reputation as someone whose voice adds clarity and balance — qualities leaders look for when advancing talent.",
        ],
        microLearningNote:
          "🌐 In your micro-learning journey, you'll receive tailored prompts and challenges to help you practice these shifts, strengthen your communication presence, and transform resistance into trusted influence.",
      },
    },
  ],
  questions: {
    demographic: [
      {
        id: "dem1",
        type: "demographic",
        text: "Which best describes the size of the team you primarily work with?",
        options: [
          { value: "1-5", text: "1–5 people" },
          { value: "6-10", text: "6–10 people" },
          { value: "11-20", text: "11–20 people" },
          { value: "21-50", text: "21–50 people" },
          { value: "51+", text: "51+ people" },
        ],
      },
      {
        id: "dem2",
        type: "demographic",
        text: "What is the primary type of work your team focuses on?",
        options: [
          {
            value: "project-based",
            text: "Project-based (engineering, IT, construction, consulting)",
          },
          {
            value: "service-oriented",
            text: "Service-oriented (customer support, sales, healthcare)",
          },
          {
            value: "operations",
            text: "Operations (process, logistics, manufacturing)",
          },
          {
            value: "creative-innovation",
            text: "Creative/Innovation (marketing, design, R&D)",
          },
          { value: "administrative-support", text: "Administrative/Support" },
          { value: "other", text: "Other (please specify)" },
        ],
      },
    ],
    direct: [
      // Withholder
      {
        id: "wh1",
        type: "direct",
        text: "In meetings, I hold back concerns to avoid conflict.",
        archetype: "withholder",
      },
      {
        id: "wh2",
        type: "direct",
        text: "I often stay silent in group discussions even when I disagree.",
        archetype: "withholder",
      },
      // Guarded Collaborator
      {
        id: "gc1",
        type: "direct",
        text: "In team conversations, I share only part of what I am thinking.",
        archetype: "guarded-collaborator",
      },
      {
        id: "gc2",
        type: "direct",
        text: "I often keep my full perspective to myself until trust is established.",
        archetype: "guarded-collaborator",
      },
      // Dominator
      {
        id: "dm1",
        type: "direct",
        text: "In discussions, I push hard to make sure my voice is heard.",
        archetype: "dominator",
      },
      {
        id: "dm2",
        type: "direct",
        text: "I often take control of team conversations.",
        archetype: "dominator",
      },
      // Peacemaker
      {
        id: "pm1",
        type: "direct",
        text: "In groups, I often agree quickly to avoid disagreement.",
        archetype: "peacemaker",
      },
      {
        id: "pm2",
        type: "direct",
        text: "I say yes to requests even when I am already stretched.",
        archetype: "peacemaker",
      },
      // Fragmenter
      {
        id: "fr1",
        type: "direct",
        text: "I prefer to keep control over my part of the team’s work.",
        archetype: "fragmenter",
      },
      {
        id: "fr2",
        type: "direct",
        text: "I often share updates only within my immediate group.",
        archetype: "fragmenter",
      },
      // Closed-Off Colleague
      {
        id: "co1",
        type: "direct",
        text: "In group meetings, I rarely volunteer ideas.",
        archetype: "closed-off-colleague",
      },
      {
        id: "co2",
        type: "direct",
        text: "I tend to keep my input brief or minimal.",
        archetype: "closed-off-colleague",
      },
      // Distractor
      {
        id: "ds1",
        type: "direct",
        text: "In meetings, I use humor even if it takes focus away.",
        archetype: "distractor",
      },
      {
        id: "ds2",
        type: "direct",
        text: "I sometimes derail discussions with tangents.",
        archetype: "distractor",
      },
      // Over-Adapter
      {
        id: "oa1",
        type: "direct",
        text: "I adjust my tone or stance to match others, even if it hides my real view.",
        archetype: "over-adapter",
      },
      {
        id: "oa2",
        type: "direct",
        text: "I often shift my perspective depending on who is in the room.",
        archetype: "over-adapter",
      },
    ],
    oblique: [
      // Withholder
      {
        id: "wh3",
        type: "oblique",
        text: "In team settings, I believe staying quiet prevents misunderstandings.",
        archetype: "withholder",
        options: [], // Likert
      },
      {
        id: "wh4",
        type: "oblique",
        text: "When a project drifts off course, I tend to:",
        archetype: "withholder",
        options: [
          {
            value: "a",
            text: "Raise concerns openly with the team",
            archetypeScore: 1,
          },
          {
            value: "b",
            text: "Wait and see if it corrects itself (Withholder)",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Focus quietly on my own part",
            archetypeScore: 3,
          },
        ],
      },
      // Guarded Collaborator
      {
        id: "gc3",
        type: "oblique",
        text: "In a new group, I usually:",
        archetype: "guarded-collaborator",
        options: [
          {
            value: "a",
            text: "Contribute selectively until I understand the dynamics (Guarded)",
            archetypeScore: 5,
          },
          { value: "b", text: "Share everything upfront", archetypeScore: 1 },
          {
            value: "c",
            text: "Stay quiet unless called on",
            archetypeScore: 3,
          },
        ],
      },
      {
        id: "gc4",
        type: "oblique",
        text: "When trust in the group feels low, I:",
        archetype: "guarded-collaborator",
        options: [
          {
            value: "a",
            text: "Step back and contribute less (Guarded)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Keep my answers vague (Guarded)",
            archetypeScore: 5,
          },
          { value: "c", text: "Still share openly", archetypeScore: 1 },
        ],
      },
      // Dominator
      {
        id: "dm3",
        type: "oblique",
        text: "In groups, I believe the strongest voice carries the most influence.",
        archetype: "dominator",
        options: [], // Likert
      },
      {
        id: "dm4",
        type: "oblique",
        text: "When I feel strongly about an issue, I usually:",
        archetype: "dominator",
        options: [
          {
            value: "a",
            text: "Speak more forcefully (Dominator)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Push others to agree (Dominator)",
            archetypeScore: 5,
          },
          { value: "c", text: "Hold back until later", archetypeScore: 1 },
        ],
      },
      // Peacemaker
      {
        id: "pm3",
        type: "oblique",
        text: "I believe harmony in the group is more important than being right.",
        archetype: "peacemaker",
        options: [], // Likert
      },
      {
        id: "pm4",
        type: "oblique",
        text: "When conflict arises in my team, I:",
        archetype: "peacemaker",
        options: [
          {
            value: "a",
            text: "Step in to smooth things over (Peacemaker)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Agree quickly to end tension (Peacemaker)",
            archetypeScore: 5,
          },
          { value: "c", text: "Hold my ground", archetypeScore: 1 },
        ],
      },
      // Fragmenter
      {
        id: "fr3",
        type: "oblique",
        text: "I believe full alignment across teams slows progress.",
        archetype: "fragmenter",
        options: [], // Likert
      },
      {
        id: "fr4",
        type: "oblique",
        text: "When deadlines are tight, I tend to:",
        archetype: "fragmenter",
        options: [
          {
            value: "a",
            text: "Retreat into my tasks (Fragmenter)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Focus only on my responsibilities (Fragmenter)",
            archetypeScore: 5,
          },
          { value: "c", text: "Coordinate across groups", archetypeScore: 1 },
        ],
      },
      // Closed-Off Colleague
      {
        id: "co3",
        type: "oblique",
        text: "In teams, I believe it is safer to stay quiet than risk judgment.",
        archetype: "closed-off-colleague",
        options: [], // Likert
      },
      {
        id: "co4",
        type: "oblique",
        text: "When new initiatives are introduced, I:",
        archetype: "closed-off-colleague",
        options: [
          {
            value: "a",
            text: "Watch others respond first (Closed-Off)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Give minimal feedback (Closed-Off)",
            archetypeScore: 5,
          },
          { value: "c", text: "Engage fully", archetypeScore: 1 },
        ],
      },
      // Distractor
      {
        id: "ds3",
        type: "oblique",
        text: "I believe shifting attention keeps groups from becoming too tense.",
        archetype: "distractor",
        options: [], // Likert
      },
      {
        id: "ds4",
        type: "oblique",
        text: "When disagreements arise, I tend to:",
        archetype: "distractor",
        options: [
          {
            value: "a",
            text: "Add lighter comments to ease pressure (Distractor)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Change subject (Distractor)",
            archetypeScore: 5,
          },
          { value: "c", text: "Hold firm", archetypeScore: 1 },
        ],
      },
      // Over-Adapter
      {
        id: "oa3",
        type: "oblique",
        text: "I assume blending in is safer than standing out.",
        archetype: "over-adapter",
        options: [], // Likert
      },
      {
        id: "oa4",
        type: "oblique",
        text: "When meetings become tense, I usually:",
        archetype: "over-adapter",
        options: [
          {
            value: "a",
            text: "Adapt my stance to match the group (Over-Adapter)",
            archetypeScore: 5,
          },
          {
            value: "b",
            text: "Stay silent until it passes (Over-Adapter)",
            archetypeScore: 5,
          },
          {
            value: "c",
            text: "Speak openly even if it risks conflict",
            archetypeScore: 1,
          },
        ],
      },
    ],
    scenario: [], // Oblique questions serve as scenario-like; no separate needed
    forcedChoice: [
      // Block 1: Withholder vs Dominator (5,6)
      {
        id: "fc1",
        statements: [
          {
            text: "I hold back until I feel safe to share.",
            archetype: "withholder",
          },
          {
            text: "I push until my perspective dominates.",
            archetype: "dominator",
          },
        ],
      },
      // Block 2: Guarded vs Over-Adapter (11,12)
      {
        id: "fc2",
        statements: [
          {
            text: "I only share a safe version of my thoughts.",
            archetype: "guarded-collaborator",
          },
          {
            text: "I adapt to match the group tone.",
            archetype: "over-adapter",
          },
        ],
      },
      // Block 3: Dominator vs Peacemaker (17,18)
      {
        id: "fc3",
        statements: [
          {
            text: "I push my perspective until it is heard.",
            archetype: "dominator",
          },
          {
            text: "I agree quickly to keep peace.",
            archetype: "peacemaker",
          },
        ],
      },
      // Block 4: Peacemaker vs Distractor (23,24)
      {
        id: "fc4",
        statements: [
          {
            text: "I say yes quickly to keep peace.",
            archetype: "peacemaker",
          },
          {
            text: "I lighten tension with humor.",
            archetype: "distractor",
          },
        ],
      },
      // Block 5: Fragmenter vs Peacemaker (29,30)
      {
        id: "fc5",
        statements: [
          {
            text: "I prefer to keep my work contained.",
            archetype: "fragmenter",
          },
          {
            text: "I step in to calm tensions.",
            archetype: "peacemaker",
          },
        ],
      },
      // Block 6: Closed-Off vs Over-Adapter (35,36)
      {
        id: "fc6",
        statements: [
          {
            text: "I stay on the sidelines of group discussions.",
            archetype: "closed-off-colleague",
          },
          {
            text: "I shift my view to match others.",
            archetype: "over-adapter",
          },
        ],
      },
      // Block 7: Distractor vs Fragmenter (41,42)
      {
        id: "fc7",
        statements: [
          {
            text: "I lighten tension by shifting focus.",
            archetype: "distractor",
          },
          {
            text: "I prefer to keep my work separate.",
            archetype: "fragmenter",
          },
        ],
      },
      // Block 8: Over-Adapter vs Dominator (47,48)
      {
        id: "fc8",
        statements: [
          {
            text: "I change tone to fit the group.",
            archetype: "over-adapter",
          },
          {
            text: "I push until my perspective is heard.",
            archetype: "dominator",
          },
        ],
      },
    ],
    balancing: [
      {
        id: "b49",
        type: "balancing",
        text: "In team discussions, I raise concerns even if it risks disagreement.",
      },
      {
        id: "b50",
        type: "balancing",
        text: "In groups, I focus on results and clarity even when conversations get tense.",
      },
      {
        id: "b51",
        type: "balancing",
        text: "I share credit and listen carefully even when I feel strongly.",
      },
      {
        id: "b52",
        type: "balancing",
        text: "I can disagree respectfully without damaging relationships.",
      },
      {
        id: "b53",
        type: "balancing",
        text: "I voice my full opinion even when trust feels low.",
      },
      {
        id: "b54",
        type: "balancing",
        text: "I stay focused on the issue even when the discussion gets uncomfortable.",
      },
      {
        id: "b55",
        type: "balancing",
        text: "I speak up even if my view goes against the majority.",
      },
      {
        id: "b56",
        type: "balancing",
        text: "I maintain engagement even when meetings feel unproductive.",
      },
      {
        id: "b57",
        type: "balancing",
        text: "I share updates openly even when they are incomplete.",
      },
      {
        id: "b58",
        type: "balancing",
        text: "I stay consistent in my perspective even when pressured to adapt.",
      },
      {
        id: "b59",
        type: "balancing",
        text: "I prioritize candor over harmony when the stakes are high.",
      },
      {
        id: "b60",
        type: "balancing",
        text: "I contribute ideas even if they are not fully polished.",
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
    normalize: (raw: number) => {
      return Math.max(0, Math.min(100, ((raw - 4) / 20) * 100));
    },
    balancingNormalize: (raw: number) => {
      return Math.max(0, Math.min(100, ((raw - 12) / 48) * 100));
    },
    adjustForBalancingIndex: (
      archetypeScores: number[],
      balancingScore: number,
    ) => {
      let adjustedScores = [...archetypeScores];
      if (balancingScore >= 55) {
        adjustedScores = archetypeScores.map((score) =>
          Math.max(0, Math.min(100, score - 3)),
        );
      } else if (balancingScore <= 34) {
        adjustedScores = archetypeScores.map((score) =>
          Math.max(0, Math.min(100, score + 2)),
        );
      }
      return adjustedScores;
    },
  },
  scenarioReports: {
    allMedium: `
      🧠 What This Means
      Your results show moderate resistance across all communication archetypes. This means no single pattern dominates your style, but you may experience friction in multiple ways depending on context. Sometimes you hold back, other times you accommodate too much, or you shift tone to reduce tension. None of these tendencies are extreme, but together they create inconsistency.
      📊 Resistance Profile: Medium Across All
      At this level, your communication style is adaptable but not always reliable. You have the ability to flex, but resistance can still slow trust and reduce clarity if left unchecked.
      🔄 What This Looks Like in Teams
      · Speaking up sometimes, staying silent at other times.
      · Balancing between cooperation and control, without full consistency.
      · Occasional avoidance of conflict or tough conversations.
      · Flexibility that can feel unpredictable to others.
      ⚠️ Risk of Staying Here
      Moderate resistance can be harder to spot than extremes — but it still impacts results. Teams may find it difficult to know which “version” of you will show up in a meeting. This unpredictability can erode trust over time.
      🚀 Growth Path
      To move forward:
      · Identify which archetype patterns appear most often under stress.
      · Build consistency by practicing one clear communication habit (e.g., always voicing one perspective in meetings).
      · Use reflection questions to spot when flexibility becomes avoidance.
      · Work with micro-learning prompts to target your most frequent resistance pattern.
    `,
    mixedMediumLow: `
      🧠 What This Means
      Your results show a blend of low resistance in some archetypes and moderate resistance in others. This means you have clear communication strengths, but a few patterns still create friction in certain situations.
      📊 Resistance Profile: Mixed Medium + Low
      At this level, most of your communication supports collaboration, but there are specific blind spots. Instead of being a general communication challenge, your growth focus is about sharpening and balancing.
      🔄 What This Looks Like in Teams
      · Strong communication strengths in some areas (e.g., openness, humor, or harmony).
      · A few recurring friction points (e.g., hesitation to share concerns, tendency to over-accommodate).
      · Generally seen as reliable, but occasional struggles under pressure.
      ⚠️ Risk of Staying Here
      Colleagues may see you as effective most of the time, but notice inconsistencies in certain contexts (e.g., conflict-heavy meetings, high-stakes projects). These “blind spots” may limit advancement into leadership roles where consistent communication is critical.
      🚀 Growth Path
      To move forward:
      · Celebrate your low-resistance strengths — they are real assets.
      · Focus on the 1–2 archetypes where resistance shows up moderately.
      · Use micro-learning prompts to practice those specific growth edges.
      · Reinforce balance by asking trusted colleagues for feedback on those blind spots.
    `,
    allLow: `
      🧠 What This Means
      Your results show low resistance across all archetypes. This means you communicate with openness, consistency, and adaptability. You are able to share your perspective, balance conflict with harmony, and remain engaged without slipping into unhelpful patterns.
      📊 Resistance Profile: Low Across All
      At this level, resistance rarely interferes with your team communication. Your style is collaborative, reliable, and constructive.
      🔄 What This Looks Like in Teams
      · You contribute consistently without dominating or withdrawing.
      · You balance honesty with empathy.
      · You help teams stay on track without silencing voices.
      · You adapt in ways that build trust rather than avoid conflict.
      ⚠️ Risk of Staying Here
      Low resistance does not mean no growth needed. Your strength is consistency, but if you rely on it too much, you may overlook subtle improvements — like learning when to be more forceful, or when to let others lead.
      🚀 Growth Path
      To maximize your strengths:
      · Use your clear communication as a model for others.
      · Mentor peers who struggle with high-resistance patterns.
      · Refine influence skills — move from effective communicator to trusted leader.
      · Expand by linking communication strengths with career development and leadership readiness.
    `,
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

export const ASSESSMENT_CATEGORIES: Record<string, AssessmentCategory> = {
  team: TEAM_COMMUNICATION_CATEGORY,
  "team-communication": TEAM_COMMUNICATION_CATEGORY,
};

/**
 * Retrieves an assessment category by ID.
 * @param categoryId The ID of the category.
 * @returns The assessment category or null if not found.
 */
export function getAssessmentCategory(
  categoryId: string,
): AssessmentCategory | null {
  return ASSESSMENT_CATEGORIES[categoryId] || null;
}

/**
 * Retrieves all questions for a given category (excluding demographic - handled in pre-assessment).
 * @param categoryId The ID of the category.
 * @returns An array of all questions (direct, oblique, balancing) and forced-choice blocks.
 */
export function getCategoryQuestions(
  categoryId: string,
): (AssessmentQuestion | ForcedChoiceBlock)[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];
  return [
    ...category.questions.direct,
    ...category.questions.oblique,
    ...category.questions.balancing,
    ...category.questions.forcedChoice,
  ];
}

/**
 * Retrieves all archetypes for a given category.
 * @param categoryId The ID of the category.
 * @returns An array of archetypes.
 */
export function getCategoryArchetypes(
  categoryId: string,
): AssessmentArchetype[] {
  const category = getAssessmentCategory(categoryId);
  return category ? category.archetypes : [];
}

// Registry-compatible function names (excluding demographic - handled in pre-assessment)
export function getAllQuestions(categoryId: string): AssessmentQuestion[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];
  return [
    ...category.questions.direct,
    ...category.questions.oblique,
    ...category.questions.balancing,
  ];
}

export function getForcedChoiceBlocks(categoryId: string): ForcedChoiceBlock[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];
  return category.questions.forcedChoice;
}

export function getArchetypes(categoryId: string): AssessmentArchetype[] {
  const category = getAssessmentCategory(categoryId);
  return category ? category.archetypes : [];
}

/**
 * Calculates archetype scores and generates a report based on user responses.
 * @param categoryId The ID of the category.
 * @param responses User responses as a record of question ID to response value.
 * @returns AssessmentResult with scores, top archetypes, balancing index, scenario report, and detailed report.
 */
export function generateAssessmentReport(
  categoryId: string,
  responses: Record<string, string | { most: string; least: string }>,
): AssessmentResult | null {
  const category = getAssessmentCategory(categoryId);
  if (!category) return null;

  const archetypeScores: Record<string, number> = {};
  category.archetypes.forEach((archetype) => {
    archetypeScores[archetype.id] = 0;
  });
  let balancingScore = 0;

  // Process direct and oblique Likert questions
  [...category.questions.direct, ...category.questions.oblique].forEach(
    (question) => {
      const response = responses[question.id];
      if (response && typeof response === "string" && question.archetype) {
        const score = category.scoring.likertScale[response] || 0;
        archetypeScores[question.archetype] += score;
      }
    },
  );

  // Process oblique questions with options (scenario-like)
  category.questions.oblique.forEach((question) => {
    if (question.options && question.options.length > 0) {
      const response = responses[question.id];
      if (response && typeof response === "string" && question.archetype) {
        const option = question.options.find((opt) => opt.value === response);
        if (option && option.archetypeScore !== undefined) {
          archetypeScores[question.archetype] += option.archetypeScore;
        }
      }
    }
  });

  // Process forced-choice questions
  category.questions.forcedChoice.forEach((block) => {
    const response = responses[block.id];
    if (response && typeof response === "object") {
      block.statements.forEach((statement) => {
        if (statement.text === response.most) {
          archetypeScores[statement.archetype] +=
            category.scoring.forcedChoiceMost;
        } else if (statement.text === response.least) {
          archetypeScores[statement.archetype] +=
            category.scoring.forcedChoiceLeast;
        }
      });
    }
  });

  // Process balancing questions (no reverse-coding, no add to archetype)
  category.questions.balancing.forEach((question) => {
    const response = responses[question.id];
    if (response && typeof response === "string") {
      let score = category.scoring.likertScale[response] || 0;
      balancingScore += score;
    }
  });

  // Normalize archetype scores to 0-100%
  const normalizedScores = Object.keys(archetypeScores).map((archetypeId) => {
    const rawScore = archetypeScores[archetypeId];
    const normalized = category.scoring.normalize(rawScore);
    const resistanceLevel =
      normalized >= category.scoring.resistanceLevels.high.min
        ? "High"
        : normalized >= category.scoring.resistanceLevels.moderate.min
          ? "Moderate"
          : "Low";
    return { archetypeId, score: normalized, resistanceLevel };
  });

  // Normalize balancing score
  const normalizedBalancingScore = category.scoring.balancingNormalize
    ? category.scoring.balancingNormalize(balancingScore)
    : category.scoring.normalize(balancingScore);

  // Adjust archetype scores based on balancing index
  const adjustedScores = category.scoring.adjustForBalancingIndex(
    normalizedScores.map((s) => s.score),
    normalizedBalancingScore,
  );
  const finalScores = normalizedScores.map((score, index) => ({
    ...score,
    score: adjustedScores[index],
    resistanceLevel:
      adjustedScores[index] >= category.scoring.resistanceLevels.high.min
        ? "High"
        : adjustedScores[index] >=
            category.scoring.resistanceLevels.moderate.min
          ? "Moderate"
          : "Low",
  }));

  // Determine top 3 archetypes
  const topArchetypes = finalScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Generate detailed report for the top archetype (High Resistance only)
  const primaryArchetype = topArchetypes[0];
  const archetypeData = category.archetypes.find(
    (a) => a.id === primaryArchetype.archetypeId,
  );
  let detailedReport = "";
  if (archetypeData && primaryArchetype.resistanceLevel === "High") {
    detailedReport = `
      🧠 First Know This
      ${archetypeData.detailedDescription}

      📊 Your Resistance in This Resistance Pattern: ${primaryArchetype.resistanceLevel} (${primaryArchetype.score.toFixed(2)}%)
      ${archetypeData.highResistanceDescription}

      💡 Core Behaviors
      ${archetypeData.coreBehaviorsUnderResistance?.map((b) => `· ${b}`).join("\n") || ""}

      🔍 Root Causes
      ${archetypeData.rootCauses?.map((c) => `· ${c}`).join("\n") || ""}

      🧠 Beliefs
      ${archetypeData.beliefsThatDriveResistance?.map((b) => `· ${b}`).join("\n") || ""}

      😬 Stress Behaviors
      Under pressure, you may:
      ${archetypeData.stressBehaviors?.map((s) => `· ${s}`).join("\n") || ""}

      🎭 Situational Adaptations
      You can flex when:
      ${archetypeData.situationalAdaptations?.map((s) => `· ${s}`).join("\n") || ""}

      ✅ Strengths
      ${archetypeData.strengthsHiddenInside?.map((s) => `· ${s}`).join("\n") || ""}

      ⚠️ Resistance Impact
      ${archetypeData.resistanceCosts?.map((c) => `· ${c}`).join("\n") || ""}

      🚀 Growth Path
      ${
        archetypeData.growthPath
          ? `
      Immediate Shifts:
      ${archetypeData.growthPath.immediateShifts.map((s) => `· ${s}`).join("\n")}

      Strategic Practices:
      ${archetypeData.growthPath.strategicPractices.map((p) => `· ${p}`).join("\n")}

      Long-Term Growth:
      ${archetypeData.growthPath.longTermGrowth.map((g) => `· ${g}`).join("\n")}
      `
          : ""
      }
    `;
  } else {
    detailedReport = `No High Resistance archetype detected. See scenario report for insights.`;
  }

  // Determine scenario report
  const allModerate = finalScores.every(
    (s) =>
      s.score >= category.scoring.resistanceLevels.moderate.min &&
      s.score <= category.scoring.resistanceLevels.moderate.max,
  );
  const allLow = finalScores.every(
    (s) => s.score <= category.scoring.resistanceLevels.low.max,
  );
  const hasModerate = finalScores.some(
    (s) =>
      s.score >= category.scoring.resistanceLevels.moderate.min &&
      s.score <= category.scoring.resistanceLevels.moderate.max,
  );
  const hasLow = finalScores.some(
    (s) => s.score <= category.scoring.resistanceLevels.low.max,
  );

  let scenarioReport = "";
  if (allModerate) {
    scenarioReport = category.scenarioReports.allMedium;
  } else if (allLow) {
    scenarioReport = category.scenarioReports.allLow;
  } else if (
    hasModerate &&
    hasLow &&
    !finalScores.some(
      (s) => s.score >= category.scoring.resistanceLevels.high.min,
    )
  ) {
    scenarioReport = category.scenarioReports.mixedMediumLow;
  } else {
    scenarioReport = `Focus on your primary archetype: ${primaryArchetype.archetypeId} (${primaryArchetype.resistanceLevel}).`;
  }

  return {
    archetypeScores: finalScores,
    topArchetypes,
    balancingIndex: normalizedBalancingScore,
    scenarioReport,
    detailedReport,
  };
}
