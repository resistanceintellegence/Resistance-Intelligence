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
  highResistanceCharacteristics?: string[];
  coreBehaviorsUnderResistance?: string[];
  rootCauses?: string[];
  beliefsThatDriveResistance?: string[];
  stressBehaviors?: string[];
  situationalAdaptations?: string[];
  strengthsHiddenInside?: string[];
  detailedResistanceCosts?: string[];
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
  highResistanceDescription?: string;
}

export interface AssessmentQuestion {
  id: string;
  type: "direct" | "oblique" | "scenario" | "forced-choice" | "balancing";
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
    resistanceImpact: string[];
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

export const LIKERT_SCALE = {
  "strongly-disagree": 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  "strongly-agree": 5,
};

const CAREER_GROWTH_CATEGORY: AssessmentCategory = {
  id: "career-growth",
  name: "Career Growth Assessment",
  description:
    "Comprehensive career growth style and resistance pattern assessment based on 8 archetypes",
  archetypes: [
    {
      id: "invisible-contributor",
      name: "Invisible Contributor",
      description:
        "Focuses on doing great work quietly without seeking visibility",
      traits: [
        "Quiet execution",
        "Team-oriented humility",
        "Avoids self-promotion",
        "Relies on results to speak",
      ],
      detailedDescription:
        "Being an Invisible Contributor does not mean you lack ambition or talent. It means you consistently do the work but struggle to make your contributions visible. At a high level, this resistance pattern creates friction because while your effort drives results, your role in those results is often overlooked. Others advance not because they do more, but because they are seen more.",
      strengthsInsights: [
        "Reliability: others trust you to deliver consistently",
        "Humility: you put team success above personal credit",
        "Focus: you invest energy into the work itself rather than appearances",
        "Collaboration: you avoid competing for the spotlight, which fosters teamwork",
      ],
      resistanceCosts: [
        "Be consistently overlooked for promotions",
        "Miss opportunities for executive sponsorship",
        "Gain a reputation for being dependable but not leadership-ready",
        "Feel undervalued, even while doing significant work",
      ],
      developmentAreas: [
        "Practice healthy visibility without exaggeration",
        "Build comfort in sharing contributions factually",
        "Volunteer for visible projects gradually",
      ],
      growthPath: {
        immediateShifts: [
          "Share one update or idea in every meeting.",
          "Replace silence with a brief acknowledgment of your progress.",
          'Practice saying: "Here\'s what I contributed."',
        ],
        strategicPractices: [
          "Create visibility rituals (weekly updates, dashboards, or check-ins).",
          "Track where invisibility slowed recognition or advancement.",
          "Ask allies or mentors to amplify your contributions in group settings.",
        ],
        longTermGrowth: [
          "Reframe visibility as influence, not bragging.",
          "Anchor identity in being a visible, strategic contributor.",
          "Build a reputation as a recognized driver of results and sponsorship.",
        ],
      },
      highResistanceCharacteristics: [
        "Focus on completing work quietly and thoroughly",
        "Downplay their achievements when discussing results",
        "Avoid recognition opportunities such as presenting to leadership",
        "Let others take credit or receive more visibility",
        "Share progress updates only when asked directly",
      ],
      coreBehaviorsUnderResistance: [
        "Focus on completing work quietly and thoroughly",
        "Downplay their achievements when discussing results",
        "Avoid recognition opportunities such as presenting to leadership",
        "Let others take credit or receive more visibility",
        "Share progress updates only when asked directly",
      ],
      rootCauses: [
        "Family or cultural values that taught 'do not brag'",
        "Early workplaces where outspoken colleagues were criticized",
        "Negative experiences where speaking up backfired or attracted unwanted attention",
      ],
      beliefsThatDriveResistance: [
        "'My work should speak for itself.'",
        "'Recognition feels arrogant.'",
        "'If I put myself forward, others will see it as bragging.'",
        "'It is safer to stay in the background than to risk criticism.'",
      ],
      stressBehaviors: [
        "Retreat further into quiet execution",
        "Decline opportunities that require visibility",
        "Avoid speaking up in high-stakes meetings",
        "Let others take the spotlight to avoid risk",
      ],
      situationalAdaptations: [
        "Recognition is framed as benefiting the team, not the individual",
        "A supportive leader encourages them to step forward",
        "Progress is measured publicly, creating natural visibility",
        "They see peers model healthy, non-arrogant visibility",
      ],
      strengthsHiddenInside: [
        "Reliability: others trust you to deliver consistently",
        "Humility: you put team success above personal credit",
        "Focus: you invest energy into the work itself rather than appearances",
        "Collaboration: you avoid competing for the spotlight, which fosters teamwork",
      ],
      detailedResistanceCosts: [
        "Be consistently overlooked for promotions",
        "Miss opportunities for executive sponsorship",
        "Gain a reputation for being dependable but not leadership-ready",
        "Feel undervalued, even while doing significant work",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Miss promotions due to low visibility"],
          growthPath: ["Share updates in team meetings"],
        },
        midSize: {
          resistanceCosts: ["Miss promotions due to low visibility"],
          growthPath: ["Share updates in team meetings"],
        },
        smb: {
          resistanceCosts: ["Miss promotions due to low visibility"],
          growthPath: ["Share updates in team meetings"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Miss promotions due to low visibility"],
            growthPath: ["Share updates in team meetings"],
          },
          micro: {
            resistanceCosts: ["Miss promotions due to low visibility"],
            growthPath: ["Share updates in team meetings"],
          },
          growing: {
            resistanceCosts: ["Miss promotions due to low visibility"],
            growthPath: ["Share updates in team meetings"],
          },
        },
      },
      highResistanceDescription:
        "At this level, your tendency to stay in the background is strong. You rely on your work to speak for itself, but in fast-moving organizations that is rarely enough. This limits recognition, sponsorship, and career advancement.",
    },
    {
      id: "recognition-seeker",
      name: "Recognition Seeker",
      description:
        "Actively pursues visibility and acknowledgment for contributions",
      traits: [
        "Visibility focus",
        "Self-promotion",
        "Opportunity chasing",
        "Network building",
      ],
      detailedDescription:
        "Being a Recognition Seeker does not mean you lack capability or substance. It means you place strong emphasis on being noticed for your contributions. At a high level, this pattern creates friction because the drive for visibility can sometimes overshadow results. Leaders may question whether recognition is more important to you than delivery.",
      strengthsInsights: [
        "Proactivity: consistently steps forward for opportunities",
        "Presence: ensures leadership is aware of contributions",
        "Energy: brings enthusiasm and visibility to projects",
        "Influence: skilled at managing impressions and relationships",
      ],
      resistanceCosts: [
        "Appear more focused on visibility than value",
        "Be seen as political rather than credible",
        "Damage trust if recognition is not backed by results",
        "Miss long term growth because effort is spread too thin across visibility plays",
      ],
      developmentAreas: [
        "Anchor visibility in measurable outcomes",
        "Balance promotion with delivery",
      ],
      growthPath: {
        immediateShifts: [
          "Focus updates on measurable results, not just presence.",
          "Ask: Am I sharing this to add value, or to be noticed?",
          "Highlight team wins alongside your own contributions.",
        ],
        strategicPractices: [
          "Track when visibility efforts overshadowed results.",
          "Choose fewer, higher-impact opportunities and deliver them exceptionally.",
          "Pair recognition with outcomes — ensure credibility grows with presence.",
        ],
        longTermGrowth: [
          "Reframe recognition as the byproduct of value.",
          "Anchor identity in contribution and influence, not attention.",
          "Build a reputation as someone admired for impact, not just visibility.",
        ],
      },
      highResistanceCharacteristics: [
        "Volunteer for visible projects even when not fully prepared",
        "Speak up in meetings mainly to ensure presence is noticed",
        "Share frequent progress updates with leadership",
        "Position themselves near decision-makers",
        "Prefer assignments that bring attention rather than those behind the scenes",
      ],
      coreBehaviorsUnderResistance: [
        "Volunteer for visible projects even when not fully prepared",
        "Speak up in meetings mainly to ensure presence is noticed",
        "Share frequent progress updates with leadership",
        "Position themselves near decision-makers",
        "Prefer assignments that bring attention rather than those behind the scenes",
      ],
      rootCauses: [
        "Early careers in competitive environments where self-promotion was necessary",
        "Family systems that gave approval only when achievement was recognized publicly",
        "Past experiences of being overlooked, leading to the belief that visibility is survival",
      ],
      beliefsThatDriveResistance: [
        "'If I am not seen, I will be forgotten.'",
        "'Visibility is as important as results.'",
        "'Recognition must be pursued or it will not come.'",
        "'Reputation depends on being noticed by leadership.'",
      ],
      stressBehaviors: [
        "Push harder to be visible during promotion cycles",
        "Emphasize involvement in high-stakes projects",
        "Prioritize self-promotion over results",
        "Seek more opportunities to present or showcase work",
      ],
      situationalAdaptations: [
        "Leadership clearly signals that results matter more than visibility",
        "They work under detail-oriented managers who value substance",
        "Visibility efforts are balanced with measurable outcomes",
        "Recognition is tied to team impact, reducing the need for personal spotlight",
      ],
      strengthsHiddenInside: [
        "Proactivity: consistently steps forward for opportunities",
        "Presence: ensures leadership is aware of contributions",
        "Energy: brings enthusiasm and visibility to projects",
        "Influence: skilled at managing impressions and relationships",
      ],
      detailedResistanceCosts: [
        "Appear more focused on visibility than value",
        "Be seen as political rather than credible",
        "Damage trust if recognition is not backed by results",
        "Miss long term growth because effort is spread too thin across visibility plays",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Erode trust if visibility exceeds results"],
          growthPath: ["Tie visibility to team outcomes"],
        },
        midSize: {
          resistanceCosts: ["Erode trust if visibility exceeds results"],
          growthPath: ["Tie visibility to team outcomes"],
        },
        smb: {
          resistanceCosts: ["Erode trust if visibility exceeds results"],
          growthPath: ["Tie visibility to team outcomes"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Erode trust if visibility exceeds results"],
            growthPath: ["Tie visibility to team outcomes"],
          },
          micro: {
            resistanceCosts: ["Erode trust if visibility exceeds results"],
            growthPath: ["Tie visibility to team outcomes"],
          },
          growing: {
            resistanceCosts: ["Erode trust if visibility exceeds results"],
            growthPath: ["Tie visibility to team outcomes"],
          },
        },
      },
      highResistanceDescription:
        "At this level, recognition is not just a motivator but a driver of your decisions. You are intentional about being seen, but when overused, this focus can erode trust and credibility.",
    },
    {
      id: "risk-avoider",
      name: "Risk Avoider",
      description: "Hesitates to pursue opportunities without full preparation",
      traits: [
        "Caution and preparation",
        "Predictability preference",
        "Hesitation on stretch roles",
        "Certainty seeking",
      ],
      detailedDescription:
        "Being a Risk Avoider doesn’t mean you lack ambition. It means you value certainty and preparation — traits that make you reliable, thorough, and trusted. But when taken too far, these same instincts create friction: you may wait too long, hold back on opportunities, or let others move ahead while you prepare in the background.",
      strengthsInsights: [
        "Thoroughness reduces careless mistakes",
        "Reliability builds trust with leadership and peers",
        "Stability helps teams stay calm during change",
        "Quality focus ensures work meets high standards",
      ],
      resistanceCosts: [
        "Delay promotions or new roles until they’ve gone to others",
        "Make leaders see you as dependable but not 'ready' for leadership",
        "Reduce visibility with executives who sponsor career growth",
        "Limit advancement in fast-moving, competitive organizations",
      ],
      developmentAreas: [
        "Reframe opportunities as learning experiments",
        "Take smaller risks first",
      ],
      growthPath: {
        immediateShifts: [
          "Take one small risk this week, even if uncertain.",
          "When hesitation arises, ask: What's the smallest safe step forward?",
          "Reframe mistakes as experiments, not failures.",
        ],
        strategicPractices: [
          "Pilot small experiments to build tolerance for uncertainty.",
          "Track how over-caution delayed opportunities.",
          "Partner with risk-tolerant peers to balance analysis with action.",
        ],
        longTermGrowth: [
          "Reframe risk as growth fuel, not danger.",
          "Anchor identity in adaptability and decisive learning.",
          "Build a reputation as someone who moves forward while others wait.",
        ],
      },
      highResistanceCharacteristics: [
        "Wait until fully prepared before acting",
        "Prefer predictable roles with clear outcomes",
        "Avoid high-visibility projects where failure might be noticed",
        "Pass on stretch assignments if timing feels uncertain",
        "Hesitate before applying for promotions",
      ],
      coreBehaviorsUnderResistance: [
        "Wait until fully prepared before acting",
        "Prefer predictable roles with clear outcomes",
        "Avoid high-visibility projects where failure might be noticed",
        "Pass on stretch assignments if timing feels uncertain",
        "Hesitate before applying for promotions",
      ],
      rootCauses: [
        "Work cultures that punished failure more than they rewarded learning",
        "Family or school systems that equated achievement with perfection",
        "Early career experiences where missteps led to public criticism or setbacks",
      ],
      beliefsThatDriveResistance: [
        "'I must be fully prepared before I step up.'",
        "'Mistakes are too costly to recover from.'",
        "'Certainty is safer than ambition.'",
        "'Timing is as important as capability.'",
      ],
      stressBehaviors: [
        "Decline opportunities faster than usual",
        "Retreat to familiar, low-risk tasks",
        "Stick rigidly to proven methods rather than experimenting",
        "Avoid visibility when stakes are high",
      ],
      situationalAdaptations: [
        "Mentor or leadership support makes it easier to take risks",
        "Clear onboarding or guidance reduces uncertainty and speeds action",
        "Stable life circumstances create more confidence to stretch",
        "Watching peers succeed provides reassurance to try",
      ],
      strengthsHiddenInside: [
        "Thoroughness reduces careless mistakes",
        "Reliability builds trust with leadership and peers",
        "Stability helps teams stay calm during change",
        "Quality focus ensures work meets high standards",
      ],
      detailedResistanceCosts: [
        "Delay promotions or new roles until they’ve gone to others",
        "Make leaders see you as dependable but not 'ready' for leadership",
        "Reduce visibility with executives who sponsor career growth",
        "Limit advancement in fast-moving, competitive organizations",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Miss opportunities in competitive environments"],
          growthPath: ["Start with small risks"],
        },
        midSize: {
          resistanceCosts: ["Miss opportunities in competitive environments"],
          growthPath: ["Start with small risks"],
        },
        smb: {
          resistanceCosts: ["Miss opportunities in competitive environments"],
          growthPath: ["Start with small risks"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Miss opportunities in competitive environments"],
            growthPath: ["Start with small risks"],
          },
          micro: {
            resistanceCosts: ["Miss opportunities in competitive environments"],
            growthPath: ["Start with small risks"],
          },
          growing: {
            resistanceCosts: ["Miss opportunities in competitive environments"],
            growthPath: ["Start with small risks"],
          },
        },
      },
      highResistanceDescription:
        "At this level, hesitation isn’t just occasional — it’s a strong and consistent influence in your career decisions. While caution protects you from costly mistakes, it also creates missed opportunities, slows recognition, and can keep you from being seen as leadership-ready.",
    },
    {
      id: "reluctant-leader",
      name: "Reluctant Leader",
      description:
        "Hesitates to take on leadership roles despite qualifications",
      traits: [
        "Support over leading",
        "Hesitation on authority",
        "Preference for expertise",
        "Avoidance of accountability",
      ],
      detailedDescription:
        "Being a Reluctant Leader does not mean you lack leadership ability. In fact, you may have the skills and potential, but resistance shows up as hesitation to step into visible authority. At a high level, this resistace pattern creates friction because you often hold back from leadership opportunities, waiting until you feel absolutely ready. This delay can make others assume you are not interested or capable, even when you are.",
      strengthsInsights: [
        "Humility: avoids arrogance and stays grounded",
        "Expertise-driven: builds credibility through competence",
        "Supportive: often values team success above personal power",
        "Measured decision making: avoids rash or impulsive choices",
      ],
      resistanceCosts: [
        "Others may overlook you for promotion because you appear uninterested",
        "Leadership potential is underutilized, limiting influence and recognition",
        "Peers or less-prepared colleagues may advance into leadership roles ahead of you",
        "Your career growth plateaus because authority roles are avoided",
      ],
      developmentAreas: [
        "Volunteer for small leadership opportunities",
        "Reframe leadership as service",
      ],
      growthPath: {
        immediateShifts: [
          "Volunteer for one small leadership task this month.",
          "When asked to lead, pause and ask: Am I resisting out of fear, or true limits?",
          'Replace "I\'m not ready" with "This is how I\'ll grow."',
        ],
        strategicPractices: [
          "Track missed opportunities where leadership reluctance slowed growth.",
          "Practice decision-making in low-stakes settings.",
          "Seek mentorship from leaders who model collaborative styles.",
        ],
        longTermGrowth: [
          "Reframe leadership as service, not perfection.",
          "Anchor identity in guidance and influence, not just authority.",
          "Build a reputation as a leader who steps up when it matters most.",
        ],
      },
      highResistanceCharacteristics: [
        "Decline leadership roles or stretch assignments",
        "Avoid positions requiring authority over others",
        "Prefer contributing expertise rather than managing people",
        "Hold back ideas if they require taking responsibility",
        "Wait for others to nominate them rather than self-selecting",
      ],
      coreBehaviorsUnderResistance: [
        "Decline leadership roles or stretch assignments",
        "Avoid positions requiring authority over others",
        "Prefer contributing expertise rather than managing people",
        "Hold back ideas if they require taking responsibility",
        "Wait for others to nominate them rather than self-selecting",
      ],
      rootCauses: [
        "Past experiences where leadership attempts were criticized",
        "Family or cultural systems that emphasized modesty over authority",
        "Early careers where leaders were viewed negatively or as overly pressured",
        "Internalized belief that leadership requires perfection",
      ],
      beliefsThatDriveResistance: [
        "'Leadership should only be taken when I am completely ready.'",
        "'If I step up and fail, everyone will see.'",
        "'It is safer to follow than to lead.'",
        "'Authority attracts criticism and pressure.'",
      ],
      stressBehaviors: [
        "Retreat into individual contributor work",
        "Avoid speaking up or making final decisions",
        "Allow others to take the lead even if they could guide better",
        "Focus on technical expertise instead of people leadership",
      ],
      situationalAdaptations: [
        "Leadership is framed as collaboration rather than command",
        "Supportive mentors encourage small steps into leadership",
        "Authority is shared in team structures",
        "They succeed in incremental leadership moments and gain confidence",
      ],
      strengthsHiddenInside: [
        "Humility: avoids arrogance and stays grounded",
        "Expertise-driven: builds credibility through competence",
        "Supportive: often values team success above personal power",
        "Measured decision making: avoids rash or impulsive choices",
      ],
      detailedResistanceCosts: [
        "Others may overlook you for promotion because you appear uninterested",
        "Leadership potential is underutilized, limiting influence and recognition",
        "Peers or less-prepared colleagues may advance into leadership roles ahead of you",
        "Your career growth plateaus because authority roles are avoided",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Plateau in career progression"],
          growthPath: ["Take small leadership roles"],
        },
        midSize: {
          resistanceCosts: ["Plateau in career progression"],
          growthPath: ["Take small leadership roles"],
        },
        smb: {
          resistanceCosts: ["Plateau in career progression"],
          growthPath: ["Take small leadership roles"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Plateau in career progression"],
            growthPath: ["Take small leadership roles"],
          },
          micro: {
            resistanceCosts: ["Plateau in career progression"],
            growthPath: ["Take small leadership roles"],
          },
          growing: {
            resistanceCosts: ["Plateau in career progression"],
            growthPath: ["Take small leadership roles"],
          },
        },
      },
      highResistanceDescription:
        "At this level, your reluctance to take on leadership roles is strong and consistent. You may avoid stepping forward even when others see your potential, which slows career advancement and recognition.",
    },
    {
      id: "people-pleaser",
      name: "People-Pleaser",
      description:
        "Prioritizes harmony and pleasing others over personal goals",
      traits: [
        "Harmony seeking",
        "Difficulty saying no",
        "Over-accommodation",
        "Conflict avoidance",
      ],
      detailedDescription:
        "Being a People-Pleaser does not mean you lack boundaries or strength. It means you place high value on maintaining harmony and being liked. At a high level, this pattern creates friction because your desire to please others often overrides your own priorities. This can make it difficult to pursue career growth, since advancement sometimes requires saying no, setting boundaries, or making decisions that are unpopular.",
      strengthsInsights: [
        "Collaboration: builds strong relationships and goodwill",
        "Empathy: attuned to the needs of others",
        "Flexibility: willing to adapt to help the team succeed",
        "Supportive presence: creates harmony in group dynamics",
      ],
      resistanceCosts: [
        "Be overlooked for leadership roles because they avoid conflict",
        "Burn out from carrying too much extra work",
        "Miss opportunities to assert their own career path",
        "Gain respect as 'helpful' but not as 'strategic' or 'decisive'",
      ],
      developmentAreas: [
        "Practice saying no in low-stakes situations",
        "Reframe boundaries as protecting priorities",
      ],
      growthPath: {
        immediateShifts: [
          "Say no politely once this week.",
          'Replace "yes" with "yes, if…" to set conditions.',
          "Ask: Does this align with my priorities, or only others' approval?",
        ],
        strategicPractices: [
          "Track when over-accommodation led to burnout or missed opportunities.",
          "Practice scripts for boundary-setting.",
          "Role-play saying no respectfully in safe contexts.",
        ],
        longTermGrowth: [
          "Reframe boundaries as professionalism, not rejection.",
          "Anchor identity in balanced contribution.",
          "Build a reputation as someone collaborative yet decisive.",
        ],
      },
      highResistanceCharacteristics: [
        "Say yes to requests even when overloaded",
        "Avoid conflict by over-accommodating others",
        "Prioritize harmony over their own advancement",
        "Take on extra work to be seen as helpful",
        "Hesitate to assert needs or boundaries",
      ],
      coreBehaviorsUnderResistance: [
        "Say yes to requests even when overloaded",
        "Avoid conflict by over-accommodating others",
        "Prioritize harmony over their own advancement",
        "Take on extra work to be seen as helpful",
        "Hesitate to assert needs or boundaries",
      ],
      rootCauses: [
        "Families that rewarded being agreeable and punished resistance",
        "Early careers where saying yes gained acceptance",
        "Cultures or workplaces that equated being 'easy to work with' with value",
        "Past experiences where saying no led to rejection or criticism",
      ],
      beliefsThatDriveResistance: [
        "'If I say no, people will think less of me.'",
        "'My value comes from being helpful and agreeable.'",
        "'Harmony is more important than personal goals.'",
        "'Disappointing others is riskier than overextending myself.'",
      ],
      stressBehaviors: [
        "Take on even more tasks to keep the peace",
        "Avoid conflict at all costs",
        "Prioritize smoothing tensions rather than solving root problems",
        "Burn out by overcommitting to maintain approval",
      ],
      situationalAdaptations: [
        "Leadership explicitly values assertiveness and boundary-setting",
        "They work in teams where roles and responsibilities are clearly defined",
        "They practice scripts or strategies for saying no respectfully",
        "They receive positive reinforcement for speaking up",
      ],
      strengthsHiddenInside: [
        "Collaboration: builds strong relationships and goodwill",
        "Empathy: attuned to the needs of others",
        "Flexibility: willing to adapt to help the team succeed",
        "Supportive presence: creates harmony in group dynamics",
      ],
      detailedResistanceCosts: [
        "Be overlooked for leadership roles because they avoid conflict",
        "Burn out from carrying too much extra work",
        "Miss opportunities to assert their own career path",
        "Gain respect as 'helpful' but not as 'strategic' or 'decisive'",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Burnout from overcommitment"],
          growthPath: ["Practice boundary-setting"],
        },
        midSize: {
          resistanceCosts: ["Burnout from overcommitment"],
          growthPath: ["Practice boundary-setting"],
        },
        smb: {
          resistanceCosts: ["Burnout from overcommitment"],
          growthPath: ["Practice boundary-setting"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Burnout from overcommitment"],
            growthPath: ["Practice boundary-setting"],
          },
          micro: {
            resistanceCosts: ["Burnout from overcommitment"],
            growthPath: ["Practice boundary-setting"],
          },
          growing: {
            resistanceCosts: ["Burnout from overcommitment"],
            growthPath: ["Practice boundary-setting"],
          },
        },
      },
      highResistanceDescription:
        "At this level, your pattern of pleasing others is strong and consistent. You may often sacrifice your own goals or workload balance to avoid disappointing colleagues, managers, or clients.",
    },
    {
      id: "over-qualifier",
      name: "Over-Qualifier",
      description: "Waits to exceed requirements before advancing",
      traits: [
        "Perfection in preparation",
        "Credential accumulation",
        "Hesitation on application",
        "Over-preparation",
      ],
      detailedDescription:
        "Being an Over Qualifier doesn’t mean you lack capability. In fact, it usually means you’re highly competent and deeply prepared. But when this resistance pattern shows up at a high level, your need to be more than ready becomes a barrier. Instead of moving forward when you’re qualified, you delay until you feel overqualified and by then, opportunities often pass to others who acted sooner.",
      strengthsInsights: [
        "Depth of preparation: strong technical or subject expertise",
        "Credibility: others trust your thoroughness",
        "Quality standards: work is polished and complete",
        "Dependability: you rarely underdeliver",
      ],
      resistanceCosts: [
        "Promotions or stretch roles go to peers who acted sooner",
        "Leaders may see you as cautious, overly academic, or hesitant",
        "Over-preparation delays career momentum",
        "Opportunities requiring boldness (entrepreneurship, leadership) are missed",
      ],
      developmentAreas: [
        "Move at 70% readiness",
        "Apply even without all requirements",
      ],
      growthPath: {
        immediateShifts: [
          "Apply for one opportunity before you feel 120% ready.",
          'Pause before saying "not yet" and ask: Am I qualified enough to learn on the job?',
          "Share your readiness instead of your doubts when discussing opportunities.",
        ],
        strategicPractices: [
          "Track when over-preparation delayed advancement.",
          "Seek feedback from leaders on readiness rather than relying only on self-assessment.",
          "Role-play interviews or pitches at 70% preparedness.",
        ],
        longTermGrowth: [
          "Reframe growth as learning in the role, not waiting for over-preparation.",
          "Anchor identity in potential and adaptability.",
          "Build a reputation as someone bold enough to step up early — and grow fast.",
        ],
      },
      highResistanceCharacteristics: [
        "Delay applying for promotions until they exceed every requirement",
        "Accumulate certifications, training, or proof before taking action",
        "Spend more time preparing than executing",
        "Hesitate to raise their hand for stretch assignments",
        "Downplay readiness, assuming others are more qualified",
      ],
      coreBehaviorsUnderResistance: [
        "Delay applying for promotions until they exceed every requirement",
        "Accumulate certifications, training, or proof before taking action",
        "Spend more time preparing than executing",
        "Hesitate to raise their hand for stretch assignments",
        "Downplay readiness, assuming others are more qualified",
      ],
      rootCauses: [
        "Early education systems that rewarded 'the A+ student' mindset",
        "Workplaces or families where only flawless readiness earned approval",
        "Past experiences where acting 'too soon' led to criticism or failure",
      ],
      beliefsThatDriveResistance: [
        "'I must exceed expectations before I can advance.'",
        "'Qualifications matter more than potential.'",
        "'If I don’t prove I’m the most prepared, I’ll be rejected.'",
        "'Opportunities only come when you’re more than ready.'",
      ],
      stressBehaviors: [
        "Add even more preparation instead of acting",
        "Delay decisions until deadlines force action",
        "Over-research, double-check, or triple-confirm before moving",
        "Miss chances because they’re still gathering proof",
      ],
      situationalAdaptations: [
        "A trusted leader validates their readiness",
        "Opportunities come with structured training or support",
        "Time pressure forces action before over-preparing",
        "Past successes remind them capability grows inside the role",
      ],
      strengthsHiddenInside: [
        "Depth of preparation: strong technical or subject expertise",
        "Credibility: others trust your thoroughness",
        "Quality standards: work is polished and complete",
        "Dependability: you rarely underdeliver",
      ],
      detailedResistanceCosts: [
        "Promotions or stretch roles go to peers who acted sooner",
        "Leaders may see you as cautious, overly academic, or hesitant",
        "Over-preparation delays career momentum",
        "Opportunities requiring boldness (entrepreneurship, leadership) are missed",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Delayed advancement"],
          growthPath: ["Apply at 70% readiness"],
        },
        midSize: {
          resistanceCosts: ["Delayed advancement"],
          growthPath: ["Apply at 70% readiness"],
        },
        smb: {
          resistanceCosts: ["Delayed advancement"],
          growthPath: ["Apply at 70% readiness"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Delayed advancement"],
            growthPath: ["Apply at 70% readiness"],
          },
          micro: {
            resistanceCosts: ["Delayed advancement"],
            growthPath: ["Apply at 70% readiness"],
          },
          growing: {
            resistanceCosts: ["Delayed advancement"],
            growthPath: ["Apply at 70% readiness"],
          },
        },
      },
      highResistanceDescription:
        "At this level, your pattern of over preparation consistently slows momentum. Leaders may see you as talented and dependable, but also hesitant or cautious about advancement.",
    },
    {
      id: "strength-reliant",
      name: "Strength Reliant",
      description: "Relies on mastered skills, resists new learning",
      traits: [
        "Expertise focus",
        "Comfort in known areas",
        "Avoidance of new skills",
        "Deepening mastery",
      ],
      detailedDescription:
        "Being Strength Reliant does not mean you are unskilled or unwilling to grow. It means you lean heavily on your proven strengths and prefer to operate in areas where you already feel confident. At a high level, this pattern creates friction because it limits your willingness to stretch into new skills, roles, or responsibilities. Over time, relying only on what you already do well can stall your career progression.",
      strengthsInsights: [
        "Consistency: trusted to deliver in known areas",
        "Expertise: depth of knowledge builds credibility",
        "Confidence: strong in domains of mastery",
        "Dependability: others rely on established strengths",
      ],
      resistanceCosts: [
        "Limited adaptability in changing industries",
        "Fewer leadership opportunities due to narrow expertise",
        "Career plateauing when new skills are required",
        "Risk of being overlooked when innovation or agility is valued",
      ],
      developmentAreas: [
        "Take on one new skill at a time",
        "Reframe growth as experimentation",
      ],
      growthPath: {
        immediateShifts: [
          "Take on one new skill or responsibility outside your comfort zone.",
          'Replace "I don\'t know this" with "I\'ll figure it out."',
          "Volunteer for one task that requires learning something unfamiliar.",
        ],
        strategicPractices: [
          "Track when leaning only on strengths limited your growth.",
          "Layer new skills onto existing expertise to make learning safer.",
          "Partner with colleagues to learn collaboratively.",
        ],
        longTermGrowth: [
          "Reframe growth as expansion, not exposure.",
          "Anchor identity in agility and continuous learning.",
          "Build a reputation as someone who evolves, not just relies on what they already know.",
        ],
      },
      highResistanceCharacteristics: [
        "Choose projects that align with proven skills",
        "Avoid tasks that highlight gaps or require new abilities",
        "Downplay opportunities for cross-training or reskilling",
        "Decline stretch roles where expertise is uncertain",
        "Stick to routines where confidence is already established",
      ],
      coreBehaviorsUnderResistance: [
        "Choose projects that align with proven skills",
        "Avoid tasks that highlight gaps or require new abilities",
        "Downplay opportunities for cross-training or reskilling",
        "Decline stretch roles where expertise is uncertain",
        "Stick to routines where confidence is already established",
      ],
      rootCauses: [
        "Workplaces that valued technical mastery above learning agility",
        "Early successes that created identity around 'being the expert'",
        "Families or schools where failure was treated as unacceptable",
        "Negative experiences with trying something new and being judged harshly",
      ],
      beliefsThatDriveResistance: [
        "'My strengths are where my value lies.'",
        "'It is safer to excel at what I know than risk failing at something new.'",
        "'If I try something outside my expertise, others will see me as weak.'",
        "'Confidence comes only from mastery.'",
      ],
      stressBehaviors: [
        "Retreat to familiar skills and avoid new challenges",
        "Decline tasks that highlight knowledge gaps",
        "Rely on expertise rather than exploring new approaches",
        "Resist changes that disrupt their established routines",
      ],
      situationalAdaptations: [
        "Learning is structured and supported with mentorship",
        "New skills can be layered onto existing strengths",
        "Success is rewarded even when imperfect",
        "Growth opportunities are framed as experiments rather than exposures",
      ],
      strengthsHiddenInside: [
        "Consistency: trusted to deliver in known areas",
        "Expertise: depth of knowledge builds credibility",
        "Confidence: strong in domains of mastery",
        "Dependability: others rely on established strengths",
      ],
      detailedResistanceCosts: [
        "Limited adaptability in changing industries",
        "Fewer leadership opportunities due to narrow expertise",
        "Career plateauing when new skills are required",
        "Risk of being overlooked when innovation or agility is valued",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Plateau in dynamic roles"],
          growthPath: ["Experiment with one new skill"],
        },
        midSize: {
          resistanceCosts: ["Plateau in dynamic roles"],
          growthPath: ["Experiment with one new skill"],
        },
        smb: {
          resistanceCosts: ["Plateau in dynamic roles"],
          growthPath: ["Experiment with one new skill"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Plateau in dynamic roles"],
            growthPath: ["Experiment with one new skill"],
          },
          micro: {
            resistanceCosts: ["Plateau in dynamic roles"],
            growthPath: ["Experiment with one new skill"],
          },
          growing: {
            resistanceCosts: ["Plateau in dynamic roles"],
            growthPath: ["Experiment with one new skill"],
          },
        },
      },
      highResistanceDescription:
        "At this level, your preference for staying in areas of strength is consistent and pronounced. You may avoid tasks that expose weaknesses, and you may shy away from learning experiences that involve visible risk of failure.",
    },
    {
      id: "comfort-zoner",
      name: "Comfort Zoner",
      description: "Prefers predictable and familiar over disruptive growth",
      traits: [
        "Stability preference",
        "Avoidance of change",
        "Predictable assignments",
        "Familiar processes",
      ],
      detailedDescription:
        "Being a Comfort Zoner does not mean you lack ambition. It means you prefer stability and predictability, often choosing the familiar over the uncertain. At a high level, this pattern creates friction because staying within your comfort zone limits growth opportunities. You may excel in your current role but resist the very changes that could accelerate your career.",
      strengthsInsights: [
        "Consistency: delivers stable, reliable results",
        "Dependability: leadership trusts your steady performance",
        "Risk-awareness: avoids reckless decisions",
        "Calm under pressure: less likely to overreact in crises",
      ],
      resistanceCosts: [
        "Stalled career growth due to reluctance to stretch",
        "Missed opportunities for promotion or recognition",
        "Perception as dependable but not ambitious",
        "Vulnerability to being passed over in fast-changing industries",
      ],
      developmentAreas: [
        "Volunteer for safe stretch projects",
        "Reframe change as growth",
      ],
      growthPath: {
        immediateShifts: [
          "Say yes to one stretch assignment this quarter.",
          "Ask: Am I choosing this because it's safe, or because it grows me?",
          "Break a large challenge into smaller, familiar steps to reduce fear.",
        ],
        strategicPractices: [
          "Track when choosing safety slowed your career growth.",
          "Build tolerance with gradual changes instead of waiting for disruption.",
          "Pair with peers who model adaptability.",
        ],
        longTermGrowth: [
          "Reframe discomfort as evidence of growth.",
          "Anchor identity in resilience and adaptability.",
          "Build a reputation as someone who balances stability with boldness.",
        ],
      },
      highResistanceCharacteristics: [
        "Choose predictable tasks over ambitious challenges",
        "Decline assignments that involve major change",
        "Prefer steady performance rather than pushing into growth",
        "Let others volunteer first for high-stakes opportunities",
        "Stay in roles that feel safe even when advancement is possible",
      ],
      coreBehaviorsUnderResistance: [
        "Choose predictable tasks over ambitious challenges",
        "Decline assignments that involve major change",
        "Prefer steady performance rather than pushing into growth",
        "Let others volunteer first for high-stakes opportunities",
        "Stay in roles that feel safe even when advancement is possible",
      ],
      rootCauses: [
        "Families or workplaces that discouraged stepping out of line",
        "Early experiences where trying something new led to negative outcomes",
        "Cultures that equated consistency with loyalty or stability",
        "Leaders who rewarded reliability more than initiative",
      ],
      beliefsThatDriveResistance: [
        "'Predictability is safer than change.'",
        "'If I stay where I am, I cannot fail.'",
        "'Consistency matters more than ambition.'",
        "'Stretch opportunities bring stress that outweighs benefits.'",
      ],
      stressBehaviors: [
        "Retreat into familiar routines",
        "Decline involvement in new or uncertain projects",
        "Stick rigidly to established processes",
        "Avoid initiating ideas that require change",
      ],
      situationalAdaptations: [
        "Change is gradual and well-supported",
        "Leadership provides strong safety nets for risk-taking",
        "Peers succeed visibly in similar stretch opportunities",
        "Opportunities come with clear expectations and minimal uncertainty",
      ],
      strengthsHiddenInside: [
        "Consistency: delivers stable, reliable results",
        "Dependability: leadership trusts your steady performance",
        "Risk-awareness: avoids reckless decisions",
        "Calm under pressure: less likely to overreact in crises",
      ],
      detailedResistanceCosts: [
        "Stalled career growth due to reluctance to stretch",
        "Missed opportunities for promotion or recognition",
        "Perception as dependable but not ambitious",
        "Vulnerability to being passed over in fast-changing industries",
      ],
      categoryContent: {
        corporate: {
          resistanceCosts: ["Stalled growth"],
          growthPath: ["Take gradual stretches"],
        },
        midSize: {
          resistanceCosts: ["Stalled growth"],
          growthPath: ["Take gradual stretches"],
        },
        smb: {
          resistanceCosts: ["Stalled growth"],
          growthPath: ["Take gradual stretches"],
        },
        entrepreneur: {
          sole: {
            resistanceCosts: ["Stalled growth"],
            growthPath: ["Take gradual stretches"],
          },
          micro: {
            resistanceCosts: ["Stalled growth"],
            growthPath: ["Take gradual stretches"],
          },
          growing: {
            resistanceCosts: ["Stalled growth"],
            growthPath: ["Take gradual stretches"],
          },
        },
      },
      highResistanceDescription:
        "At this level, your tendency to avoid risk or change is consistent and visible. You may avoid new responsibilities, high-visibility projects, or stretch roles, preferring to remain in environments where you already feel safe and in control.",
    },
  ],
  questions: {
    direct: [
      // Invisible Contributor
      {
        id: "ic1",
        type: "direct",
        text: "I often let others take credit rather than highlighting my contributions.",
        archetype: "invisible-contributor",
      },
      {
        id: "ic2",
        type: "direct",
        text: "I rarely share progress updates unless directly asked.",
        archetype: "invisible-contributor",
      },
      // Recognition Seeker
      {
        id: "rs1",
        type: "direct",
        text: "I look for opportunities that will make me visible to leadership.",
        archetype: "recognition-seeker",
      },
      {
        id: "rs2",
        type: "direct",
        text: "I emphasize my role in projects to ensure I’m noticed.",
        archetype: "recognition-seeker",
      },
      // Risk Avoider
      {
        id: "ra1",
        type: "direct",
        text: "I hesitate to pursue opportunities unless I feel completely ready.",
        archetype: "risk-avoider",
      },
      {
        id: "ra2",
        type: "direct",
        text: "I avoid assignments that carry high visibility if failure is possible.",
        archetype: "risk-avoider",
      },
      // Reluctant Leader
      {
        id: "rl1",
        type: "direct",
        text: "I hesitate to take leadership roles even when I’m qualified.",
        archetype: "reluctant-leader",
      },
      {
        id: "rl2",
        type: "direct",
        text: "I prefer supporting leaders over being in charge.",
        archetype: "reluctant-leader",
      },
      // People-Pleaser
      {
        id: "pp1",
        type: "direct",
        text: "I struggle to say no to requests, even when it impacts my workload.",
        archetype: "people-pleaser",
      },
      {
        id: "pp2",
        type: "direct",
        text: "I prioritize harmony over advancing my own career goals.",
        archetype: "people-pleaser",
      },
      // Over-Qualifier
      {
        id: "oq1",
        type: "direct",
        text: "I avoid applying for roles unless I exceed every requirement.",
        archetype: "over-qualifier",
      },
      {
        id: "oq2",
        type: "direct",
        text: "I often pursue extra training before I feel 'ready' for advancement.",
        archetype: "over-qualifier",
      },
      // Strength Reliant
      {
        id: "sr1",
        type: "direct",
        text: "I prefer to rely on skills I’ve already mastered.",
        archetype: "strength-reliant",
      },
      {
        id: "sr2",
        type: "direct",
        text: "I resist roles that require learning unfamiliar abilities quickly.",
        archetype: "strength-reliant",
      },
      // Comfort Zoner
      {
        id: "cz1",
        type: "direct",
        text: "I prefer predictable assignments over high-stakes projects.",
        archetype: "comfort-zoner",
      },
      {
        id: "cz2",
        type: "direct",
        text: "I feel most comfortable working within familiar processes.",
        archetype: "comfort-zoner",
      },
    ],
    oblique: [
      // Invisible Contributor
      {
        id: "ic3",
        type: "oblique",
        text: "When discussing my work with leadership, I tend to:",
        archetype: "invisible-contributor",
        options: [
          {
            value: "A",
            text: "Focus on the details of the task",
            archetypeScore: 3,
          },
          {
            value: "B",
            text: "Downplay my role to avoid sounding boastful",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "Emphasize the team’s efforts over mine",
            archetypeScore: 5,
          },
          {
            value: "D",
            text: "Highlight how I drove results",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "ic4",
        type: "oblique",
        text: "Imagine you completed a successful project. Your first instinct is to:",
        archetype: "invisible-contributor",
        options: [
          { value: "A", text: "Let others talk about it", archetypeScore: 5 },
          {
            value: "B",
            text: "Quietly move on to the next task",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "Present your work confidently",
            archetypeScore: 1,
          },
          {
            value: "D",
            text: "Post about it on social media",
            archetypeScore: 1,
          },
        ],
      },
      // Recognition Seeker
      {
        id: "rs3",
        type: "oblique",
        text: "When given a choice, I prefer:",
        archetype: "recognition-seeker",
        options: [
          { value: "A", text: "Work that gets recognized", archetypeScore: 5 },
          {
            value: "B",
            text: "Work that builds expertise quietly",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "rs4",
        type: "oblique",
        text: "In meetings, I am most likely to:",
        archetype: "recognition-seeker",
        options: [
          {
            value: "A",
            text: "Contribute only when I have strong input",
            archetypeScore: 1,
          },
          {
            value: "B",
            text: "Speak up to make sure I’m seen as engaged",
            archetypeScore: 5,
          },
        ],
      },
      // Risk Avoider
      {
        id: "ra3",
        type: "oblique",
        text: "When offered a stretch role, my first thought is:",
        archetype: "risk-avoider",
        options: [
          { value: "A", text: "What could go wrong", archetypeScore: 5 },
          { value: "B", text: "How I could grow", archetypeScore: 1 },
        ],
      },
      {
        id: "ra4",
        type: "oblique",
        text: "Imagine you’re encouraged to apply for a bigger role. Your first reaction is:",
        archetype: "risk-avoider",
        options: [
          {
            value: "A",
            text: "Worry about whether you’re fully prepared",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Excitement for the challenge",
            archetypeScore: 1,
          },
        ],
      },
      // Reluctant Leader
      {
        id: "rl3",
        type: "oblique",
        text: "When asked to lead a project, my instinct is:",
        archetype: "reluctant-leader",
        options: [
          {
            value: "A",
            text: "To step back and let someone else take it",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "To accept if I feel fully ready",
            archetypeScore: 5,
          },
          {
            value: "C",
            text: "To embrace it as a growth opportunity",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "rl4",
        type: "oblique",
        text: "Imagine your manager suggests you lead a high-visibility initiative. Your gut response is:",
        archetype: "reluctant-leader",
        options: [
          {
            value: "A",
            text: "I’m not sure I’m leadership material.",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "This will stretch me in new ways.",
            archetypeScore: 1,
          },
        ],
      },
      // People-Pleaser
      {
        id: "pp3",
        type: "oblique",
        text: "When faced with competing demands, I tend to:",
        archetype: "people-pleaser",
        options: [
          { value: "A", text: "Say yes to keep the peace", archetypeScore: 5 },
          {
            value: "B",
            text: "Evaluate based on my own priorities",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "pp4",
        type: "oblique",
        text: "Imagine your colleague asks for help, but it will derail your priorities. You’re most likely to:",
        archetype: "people-pleaser",
        options: [
          {
            value: "A",
            text: "Agree anyway to avoid disappointing them",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Decline politely to protect your own timeline",
            archetypeScore: 1,
          },
        ],
      },
      // Over-Qualifier
      {
        id: "oq3",
        type: "oblique",
        text: "When considering a new role, I focus on:",
        archetype: "over-qualifier",
        options: [
          {
            value: "A",
            text: "What qualifications I’m missing",
            archetypeScore: 5,
          },
          { value: "B", text: "How I can grow into it", archetypeScore: 1 },
        ],
      },
      {
        id: "oq4",
        type: "oblique",
        text: "Imagine there’s a promotion opportunity. You’re most likely to:",
        archetype: "over-qualifier",
        options: [
          {
            value: "A",
            text: "Wait until you have more credentials",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Apply now and learn as you go",
            archetypeScore: 1,
          },
        ],
      },
      // Strength Reliant
      {
        id: "sr3",
        type: "oblique",
        text: "When faced with a new system or tool, I typically:",
        archetype: "strength-reliant",
        options: [
          {
            value: "A",
            text: "Stick with what I already know",
            archetypeScore: 5,
          },
          { value: "B", text: "Explore it eagerly", archetypeScore: 1 },
        ],
      },
      {
        id: "sr4",
        type: "oblique",
        text: "Imagine you’re asked to take on a project requiring skills you don’t yet have. Your instinct is to:",
        archetype: "strength-reliant",
        options: [
          {
            value: "A",
            text: "Pass it to someone more experienced",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Accept it and figure it out",
            archetypeScore: 1,
          },
        ],
      },
      // Comfort Zoner
      {
        id: "cz3",
        type: "oblique",
        text: "When considering a new role, I focus more on:",
        archetype: "comfort-zoner",
        options: [
          {
            value: "A",
            text: "How safe and steady it feels",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "How much it might stretch me",
            archetypeScore: 1,
          },
        ],
      },
      {
        id: "cz4",
        type: "oblique",
        text: "Imagine you’re offered a role that involves major change. You’re most likely to:",
        archetype: "comfort-zoner",
        options: [
          {
            value: "A",
            text: "Decline because it feels disruptive",
            archetypeScore: 5,
          },
          {
            value: "B",
            text: "Accept for the growth opportunity",
            archetypeScore: 1,
          },
        ],
      },
    ],
    scenario: [], // Note: Document's oblique questions serve as scenario-like questions; no separate scenario questions needed.
    forcedChoice: [
      // Invisible Contributor
      {
        id: "ic5",
        statements: [
          {
            text: "Promoting my achievements",
            archetype: "recognition-seeker",
          },
          {
            text: "Letting results speak for themselves",
            archetype: "invisible-contributor",
          },
        ],
      },
      {
        id: "ic6",
        statements: [
          {
            text: "I should make sure leadership knows my impact.",
            archetype: "recognition-seeker",
          },
          {
            text: "If I do good work, recognition will come naturally.",
            archetype: "invisible-contributor",
          },
        ],
      },
      // Recognition Seeker
      {
        id: "rs5",
        statements: [
          {
            text: "Being recognized for contributions",
            archetype: "recognition-seeker",
          },
          {
            text: "Doing the work, whether or not anyone notices",
            archetype: "invisible-contributor",
          },
        ],
      },
      {
        id: "rs6",
        statements: [
          {
            text: "I pursue visibility to create future opportunities",
            archetype: "recognition-seeker",
          },
          {
            text: "I trust results to bring opportunities naturally",
            archetype: "invisible-contributor",
          },
        ],
      },
      // Risk Avoider
      {
        id: "ra5",
        statements: [
          {
            text: "I prefer to act quickly and figure it out as I go",
            archetype: "risk-avoider-reverse",
          },
          {
            text: "I wait until I feel fully ready before acting",
            archetype: "risk-avoider",
          },
        ],
      },
      {
        id: "ra6",
        statements: [
          {
            text: "Progress through action",
            archetype: "risk-avoider-reverse",
          },
          {
            text: "Certainty before moving forward",
            archetype: "risk-avoider",
          },
        ],
      },
      // Reluctant Leader
      {
        id: "rl5",
        statements: [
          {
            text: "I seek leadership opportunities",
            archetype: "reluctant-leader-reverse",
          },
          {
            text: "I avoid leadership unless absolutely necessary",
            archetype: "reluctant-leader",
          },
        ],
      },
      {
        id: "rl6",
        statements: [
          {
            text: "Being the one accountable for results",
            archetype: "reluctant-leader-reverse",
          },
          {
            text: "Supporting someone else who is accountable",
            archetype: "reluctant-leader",
          },
        ],
      },
      // People-Pleaser
      {
        id: "pp5",
        statements: [
          {
            text: "I’d rather stretch myself than disappoint someone",
            archetype: "people-pleaser",
          },
          {
            text: "I’d rather protect my priorities even if others are unhappy",
            archetype: "people-pleaser-reverse",
          },
        ],
      },
      {
        id: "pp6",
        statements: [
          { text: "Being liked", archetype: "people-pleaser" },
          {
            text: "Staying focused on personal goals",
            archetype: "people-pleaser-reverse",
          },
        ],
      },
      // Over-Qualifier
      {
        id: "oq5",
        statements: [
          {
            text: "I move forward when I’m qualified enough",
            archetype: "over-qualifier-reverse",
          },
          {
            text: "I move forward when I’m overqualified",
            archetype: "over-qualifier",
          },
        ],
      },
      {
        id: "oq6",
        statements: [
          {
            text: "Perfection first, then action",
            archetype: "over-qualifier",
          },
          {
            text: "Action first, then adjust",
            archetype: "over-qualifier-reverse",
          },
        ],
      },
      // Strength Reliant
      {
        id: "sr5",
        statements: [
          {
            text: "I enjoy stretching into new skill areas",
            archetype: "strength-reliant-reverse",
          },
          {
            text: "I prefer to deepen what I already know",
            archetype: "strength-reliant",
          },
        ],
      },
      {
        id: "sr6",
        statements: [
          {
            text: "Build mastery before moving to something new",
            archetype: "strength-reliant",
          },
          {
            text: "Jump into new areas even without mastery",
            archetype: "strength-reliant-reverse",
          },
        ],
      },
      // Comfort Zoner
      {
        id: "cz5",
        statements: [
          { text: "I seek steady, reliable work", archetype: "comfort-zoner" },
          {
            text: "I chase ambitious growth even if it’s disruptive",
            archetype: "comfort-zoner-reverse",
          },
        ],
      },
      {
        id: "cz6",
        statements: [
          { text: "Staying in a role I know well", archetype: "comfort-zoner" },
          {
            text: "Moving into something new and uncertain",
            archetype: "comfort-zoner-reverse",
          },
        ],
      },
    ],
    balancing: [
      {
        id: "b1",
        type: "balancing",
        text: "I seek opportunities even when I don’t feel fully prepared.",
        archetype: "risk-avoider",
        isReverseCoded: true,
      },
      {
        id: "b2",
        type: "balancing",
        text: "I am comfortable sharing my accomplishments openly.",
        archetype: "invisible-contributor",
        isReverseCoded: true,
      },
      {
        id: "b3",
        type: "balancing",
        text: "I focus more on results than on being seen for them.",
        archetype: "recognition-seeker",
        isReverseCoded: true,
      },
      {
        id: "b4",
        type: "balancing",
        text: "I welcome leadership opportunities, even if I feel uncertain.",
        archetype: "reluctant-leader",
        isReverseCoded: true,
      },
      {
        id: "b5",
        type: "balancing",
        text: "I prioritize my goals, even if it creates some conflict.",
        archetype: "people-pleaser",
        isReverseCoded: true,
      },
      {
        id: "b6",
        type: "balancing",
        text: "I apply for roles even if I don’t meet every requirement.",
        archetype: "over-qualifier",
        isReverseCoded: true,
      },
      {
        id: "b7",
        type: "balancing",
        text: "I push myself to learn new skills, even when it’s uncomfortable.",
        archetype: "strength-reliant",
        isReverseCoded: true,
      },
      {
        id: "b8",
        type: "balancing",
        text: "I thrive in situations where the outcome is uncertain.",
        archetype: "comfort-zoner",
        isReverseCoded: true,
      },
      {
        id: "b9",
        type: "balancing",
        text: "I look forward to experimenting with new methods of working.",
        archetype: "comfort-zoner",
        isReverseCoded: true,
      },
      {
        id: "b10",
        type: "balancing",
        text: "I am energized by ambitious goals, even if they disrupt stability.",
        archetype: "comfort-zoner",
        isReverseCoded: true,
      },
      {
        id: "b11",
        type: "balancing",
        text: "I prefer growth opportunities, even when they add pressure.",
        archetype: "risk-avoider",
        isReverseCoded: true,
      },
      {
        id: "b12",
        type: "balancing",
        text: "I am comfortable making decisions that may not please everyone.",
        archetype: "people-pleaser",
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
      id: "all_moderate",
      title: "All Medium Resistance",
      condition: {
        type: "all_moderate",
        thresholds: { moderate: 35 },
      },
      content: {
        firstKnowThis:
          "Your results show moderate resistance across multiple archetypes. This means you don't have one dominant barrier holding you back, but you experience consistent friction in several areas. While none of these patterns are extreme, together they can slow your career momentum.",
        whatItMeans: [
          "Your resistance is spread across several archetypes instead of concentrated in one.",
          "Each archetype adds some hesitation, self-doubt, or avoidance.",
          "The combined effect is like carrying several small weights that, together, slow your pace.",
        ],
        resistanceImpact: [
          "Opportunities may pass because hesitation adds up across situations.",
          "Leaders may see you as reliable but not always proactive.",
          "Growth can feel slower compared to peers who act more decisively.",
        ],
        growthPath: [
          "Track small moments where hesitation added up.",
          "Practice choosing earlier action when 70% ready.",
          "Build confidence by celebrating follow-through on moderate challenges.",
          "Strengthen adaptability across different work situations.",
          "In your micro-learning journey, you'll explore how each of your moderate archetypes shows up, and practice small adjustments to keep them from stacking together into a bigger barrier.",
        ],
      },
    },
    {
      id: "all_low",
      title: "All Low Resistance",
      condition: {
        type: "all_low",
        thresholds: { low: 34 },
      },
      content: {
        firstKnowThis:
          "Your results show low resistance across all archetypes. This means resistance is not a dominant barrier in your career growth. You are naturally adaptive, confident, and willing to act when opportunities arise.",
        whatItMeans: [
          "Resistance may show up in small, situational ways, but it does not define your career path.",
          "Your ability to adapt and move forward is a key strength.",
          "Growth for you is less about removing barriers and more about maintaining balance.",
        ],
        resistanceImpact: [
          "At low levels, resistance rarely limits you. The main risk is becoming complacent, or overlooking subtle patterns that could grow stronger as responsibilities increase.",
        ],
        growthPath: [
          "Keep noticing when hesitation creeps in unnecessarily.",
          "Take stretch opportunities before comfort makes you hesitate.",
          "Build resilience so resistance stays low even under pressure.",
          "In your micro-learning journey, you'll focus on using your low resistance as a platform for growth — sharpening leadership, adaptability, and influence so you continue advancing with confidence.",
        ],
      },
    },
    {
      id: "mixed_low_moderate",
      title: "Mix of Medium and Low Resistance",
      condition: {
        type: "mixed_low_moderate",
      },
      content: {
        firstKnowThis:
          "Your results show a mix of low and moderate resistance across archetypes. This means you don't have one dominant barrier, but some patterns create more noticeable friction than others.",
        whatItMeans: [
          "Your moderate archetypes are consistent enough to cause friction in certain situations.",
          "Your low archetypes add subtle hesitation occasionally but generally do not limit you.",
          "Together, the blend creates pockets of resistance that can slow growth if left unchecked.",
        ],
        resistanceImpact: [
          "Career progress may feel uneven, smooth in some areas but slowed in others.",
          "Leaders may see you as capable, but not always consistent in confidence.",
          "Small hesitations in moderate archetypes can compound during high-pressure situations.",
        ],
        growthPath: [
          "Notice where moderate patterns show up most often.",
          "Apply targeted growth practices to those archetypes first.",
          "Protect the strengths of your low-resistance archetypes so they stay balanced.",
          "Use wins in low-resistance areas to build confidence in moderate ones.",
          "In your micro-learning journey, you'll explore how to smooth out these differences — lifting the moderate archetypes so they no longer slow your path, while using the stability of your low archetypes as leverage.",
        ],
      },
    },
  ],
};

export const ASSESSMENT_CATEGORIES: Record<string, AssessmentCategory> = {
  "career-growth": CAREER_GROWTH_CATEGORY,
  career: CAREER_GROWTH_CATEGORY, // Support both career and career-growth IDs
};

export function getAssessmentCategory(
  categoryId: string,
): AssessmentCategory | null {
  return ASSESSMENT_CATEGORIES[categoryId] || null;
}

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

export function getForcedChoiceBlocks(categoryId: string): ForcedChoiceBlock[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];
  return category.questions.forcedChoice;
}

export function getArchetypes(categoryId: string): AssessmentArchetype[] {
  const category = getAssessmentCategory(categoryId);
  if (!category) return [];
  return category.archetypes;
}
