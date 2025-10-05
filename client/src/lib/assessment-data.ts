export interface AssessmentData {
  title: string;
  questions: string[];
  archetypes: Record<
    string,
    {
      name: string;
      description: string;
      details: string;
      questionIndices: number[];
    }
  >;
  reverseScoredIndices?: number[];
  customQuestionMappings?: Record<
    number,
    {
      type: "multiple-choice" | "ipsative";
      mappings: Record<number, { archetype: string; score: number } | string>;
    }
  >;
  minRawPerArchetype: number;
  maxRawPerArchetype: number;
  lowThreshold: number;
  moderateThreshold: number;
  balancingIndices?: number[];
  balancingMin?: number;
  balancingMax?: number;
  adjustmentHigh?: number;
  adjustmentLow?: number;
  overallCalculation: "average-top3" | "total-sum" | "dominant";
  overallMax?: number;
}

const assessmentData: Record<string, AssessmentData> = {
  individual: {
    title: "Individual Performance Assessment",
    questions: [
      "When you have an important task, how often do you find yourself naturally waiting until closer to the deadline to start?",
      "How often do you prefer to refine your work multiple times before you feel fully comfortable sharing it?",
      "When starting a new project, how often do you find yourself thinking about what could go wrong before you think about what could go right?",
      "How often do you find yourself avoiding tasks where you are uncertain about the outcome?",
      "When you have completed work, how often do you revisit it to make small improvements even when it may not be necessary?",
      "How often do you find yourself setting goals that feel overwhelming when you think about actually achieving them?",
      "When you are working on something important, how often do you get distracted by smaller, less important tasks?",
      "How often do you find yourself mentally rehearsing conversations or presentations, imagining what might go wrong?",
      "When receiving feedback, how often do you focus more on the criticism than the positive comments?",
      "How often do you feel that your work needs to be significantly better than others' before you feel comfortable with it?",
      "When you are pursuing a goal, how often do you find yourself giving up when progress feels slow?",
      "How often do you find yourself making decisions based on avoiding failure rather than achieving success?",
      "When you accomplish something, how often do you downplay the achievement or attribute it to luck?",
      "How often do you find yourself saying 'yes' to requests even when you're already overwhelmed?",
      "When you're in a flow state and making good progress, how often do you find yourself stopping to check if you're doing it 'right'?",
      "How often do you find yourself comparing your progress to others and feeling discouraged?",
      "When facing a challenging task, how often do you find yourself seeking more information or preparation instead of starting?",
      "How often do you find yourself working harder rather than differently when something isn't working?",
      "When you have a good idea or insight, how often do you hesitate to share it because it might not be perfect?",
      "How often do you find yourself feeling guilty when you're not being productive?",
    ],
    archetypes: {
      "The Perfectionist Achiever": {
        name: "The Perfectionist Achiever",
        description:
          "You set impossibly high standards for yourself. Tasks often expand because 'good enough' never feels complete. This creates cycles of overworking, refining, and second-guessing.",
        details:
          "While you may feel proud of your precision, progress often feels slower than it should. At the core is a belief that your worth is tied to flawless performance, which quietly traps you in endless effort and self-criticism.",
        questionIndices: [1, 4, 8, 9, 14, 18],
      },
      "The Procrastinator": {
        name: "The Procrastinator",
        description:
          "You delay starting important tasks, often waiting until pressure builds or deadlines approach. While you may frame it as working better under pressure, it creates unnecessary stress and limits your potential.",
        details:
          "This pattern often stems from fear of failure, perfectionism, or feeling overwhelmed by the scope of a task. The cycle reinforces itself as last-minute rushing confirms the belief that you need pressure to perform.",
        questionIndices: [0, 6, 10, 16],
      },
      "The Anxious Overthinker": {
        name: "The Anxious Overthinker",
        description:
          "You get stuck in analysis loops, imagining problems that may never occur. Mental energy is spent rehearsing scenarios rather than taking action, creating paralysis and missed opportunities.",
        details:
          "This pattern feels protective but actually increases anxiety and reduces confidence. The constant mental preparation rarely translates to better actual performance but drains energy that could be used productively.",
        questionIndices: [2, 3, 7, 11],
      },
      "The Self-Saboteur": {
        name: "The Self-Saboteur",
        description:
          "You unconsciously undermine your own success through downplaying achievements, comparing yourself to others, or stopping progress when things are going well. Success feels uncomfortable or undeserved.",
        details:
          "This archetype often develops from deep beliefs about worthiness or fear of visibility. Success is sabotaged just before breakthrough moments, maintaining familiar patterns of struggle rather than allowing expansion.",
        questionIndices: [12, 15, 19],
      },
      "The People Pleaser": {
        name: "The People Pleaser",
        description:
          "You consistently prioritize others' needs and requests over your own goals and boundaries. While it feels generous, it leads to overcommitment, burnout, and resentment.",
        details:
          "This pattern stems from beliefs about acceptance and worth being tied to helping others. Your own goals become secondary, creating a cycle where you're always busy but rarely fulfilled or progressing on what matters most to you.",
        questionIndices: [5, 13, 17],
      },
    },
    reverseScoredIndices: [],
    customQuestionMappings: {},
    minRawPerArchetype: 3, // Min score for 3-6 Likert questions
    maxRawPerArchetype: 30, // Max score for 6 questions × 5
    lowThreshold: 34,
    moderateThreshold: 54,
    balancingIndices: [],
    overallCalculation: "dominant",
  },
  career: {
    title: "Career Growth Assessment",
    questions: [
      "I often let others speak for my contributions rather than highlighting them myself.",
      "In a meeting, I am more likely to: A) Share progress updates confidently; B) Wait for others to notice my work",
      "I look for chances to make sure my work is seen by leadership.",
      "Which matters more to you? A) Being recognized; B) Delivering results quietly",
      "I hesitate to take opportunities unless I feel fully ready.",
      "Imagine you are asked to lead a project outside your comfort zone. Your first thought is: A) What could go wrong; B) How much I could grow",
      "I hesitate to step into leadership roles even when I am qualified.",
      "Which feels truer? A) I prefer being accountable; B) I prefer supporting someone else who is accountable",
      "I struggle to say no to requests, even when it affects my workload.",
      "When faced with conflict, I usually: A) Speak up even if it creates tension; B) Smooth things over to keep peace",
      "I avoid applying for roles unless I meet every requirement.",
      "Which best describes you? A) I move forward when I feel ready enough; B) I wait until I feel overqualified",
      "I prefer to rely on skills I’ve already mastered.",
      "Imagine you’re asked to take on a new tool or process. You would most likely: A) Stick with what you know; B) Try the new approach even if it feels unfamiliar",
      "I feel most comfortable in familiar, predictable roles.",
      "Which feels more natural? A) Staying in a role I know well; B) Moving into something uncertain",
      "I am comfortable sharing my accomplishments openly.",
      "I apply for opportunities even when I don’t meet every requirement.",
      "I welcome leadership opportunities, even when I feel uncertain.",
      "I thrive in situations where the outcome is uncertain.",
    ],
    archetypes: {
      "Invisible Contributor": {
        name: "Invisible Contributor",
        description:
          "You consistently deliver results but hesitate to make them visible. When resistance is high, this turns into staying quiet, letting others take credit, or avoiding recognition opportunities.",
        details: "Over time, this limits sponsorship and advancement.",
        questionIndices: [0, 16],
      },
      "Recognition Seeker": {
        name: "Recognition Seeker",
        description:
          "You step forward to make sure your work is noticed. When resistance is high, this turns into overemphasizing visibility, focusing on attention more than outcomes, and risking credibility with peers and leaders.",
        details:
          "This can lead to perceptions of self-promotion over substance.",
        questionIndices: [2],
      },
      "Risk Avoider": {
        name: "Risk Avoider",
        description:
          "You value certainty and preparation before making moves. When resistance is high, this turns into delaying action, waiting until you feel over-ready, and watching opportunities pass to others who act sooner.",
        details:
          "This creates a career ceiling by avoiding stretch opportunities.",
        questionIndices: [4],
      },
      "Reluctant Leader": {
        name: "Reluctant Leader",
        description:
          "You support from the background and hesitate to take charge. When resistance is high, this turns into declining leadership chances, avoiding decisions, and letting your potential remain unseen.",
        details: "This limits your influence and career progression.",
        questionIndices: [6],
      },
      "People Pleaser": {
        name: "People Pleaser",
        description:
          "You build harmony and goodwill with others. When resistance is high, this turns into saying yes too often, avoiding difficult conversations, and carrying more workload than is healthy, which slows your growth.",
        details: "This leads to burnout and reduced focus on your own goals.",
        questionIndices: [8],
      },
      "Over-Qualifier": {
        name: "Over-Qualifier",
        description:
          "You prepare thoroughly to prove your readiness. When resistance is high, this turns into overtraining, over-researching, and holding back until you feel more than qualified, which leads to missed opportunities.",
        details:
          "This delays career advancement by waiting for perfect readiness.",
        questionIndices: [10],
      },
      "Strength Reliant": {
        name: "Strength Reliant",
        description:
          "You rely on your proven expertise to deliver results. When resistance is high, this turns into resisting new skills, clinging to what feels safe, and stalling career growth when change is required.",
        details: "This limits adaptability and long-term growth potential.",
        questionIndices: [12],
      },
      "Comfort Zoner": {
        name: "Comfort Zoner",
        description:
          "You prefer stability and predictability in your work. When resistance is high, this turns into staying in familiar roles, declining stretch opportunities, and missing the kind of change that builds career momentum.",
        details: "This creates stagnation and limits career progression.",
        questionIndices: [14],
      },
    },
    reverseScoredIndices: [16, 17, 18, 19], // Q17-20
    customQuestionMappings: {
      1: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 1 }, // A) Share confidently
          2: { archetype: "Invisible Contributor", score: 5 }, // B) Wait
        },
      },
      3: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Recognition Seeker", score: 5 }, // A) Being recognized
          2: { archetype: "none", score: 1 }, // B) Delivering quietly
        },
      },
      5: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Risk Avoider", score: 5 }, // A) What could go wrong
          2: { archetype: "none", score: 1 }, // B) How much I could grow
        },
      },
      7: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 1 }, // A) Being accountable
          2: { archetype: "Reluctant Leader", score: 5 }, // B) Supporting
        },
      },
      9: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 1 }, // A) Speak up
          2: { archetype: "People Pleaser", score: 5 }, // B) Smooth over
        },
      },
      11: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 1 }, // A) Move forward
          2: { archetype: "Over-Qualifier", score: 5 }, // B) Wait
        },
      },
      13: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Strength Reliant", score: 5 }, // A) Stick with known
          2: { archetype: "none", score: 1 }, // B) Try new
        },
      },
      15: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Comfort Zoner", score: 5 }, // A) Stay in role
          2: { archetype: "none", score: 1 }, // B) Move to uncertain
        },
      },
    },
    minRawPerArchetype: 4,
    maxRawPerArchetype: 24,
    lowThreshold: 34,
    moderateThreshold: 54,
    balancingIndices: [16, 17, 18, 19],
    balancingMin: 4,
    balancingMax: 20,
    adjustmentHigh: -3,
    adjustmentLow: 2,
    overallCalculation: "dominant",
  },
  "team-communication": {
    title: "Team Communication Assessment",
    questions: [
      "In meetings, I sometimes choose to keep my thoughts to myself, even when I have an opinion.",
      "I often guide discussions to make sure decisions don’t stall.",
      "I step in quickly to calm tension when disagreements arise.",
      "I prefer to focus on my own tasks rather than coordinating too much with others.",
      "I usually wait until others share before I contribute my perspective.",
      "I lighten serious conversations with humor or side remarks.",
      "In teams, it feels safer to hold back than to risk creating disagreement.",
      "Influence often comes more from confidence than from accuracy.",
      "Maintaining harmony is usually more important than debating differences.",
      "Too much alignment across groups slows real progress.",
      "Most of the time, my contributions add less value than those of others.",
      "It is usually better to adapt to the group’s tone than to stand out too much.",
      "When I notice a problem in a project, my first instinct is to: A) raise it directly with the team; B) mention it privately to a trusted colleague; C) wait and see if it corrects itself",
      "When conflict arises in my team, I usually: A) smooth it over so momentum isn’t lost; B) push my point until it’s heard; C) stay quiet and let others handle it",
      "In a high-stakes meeting, I am most likely to: A) speak forcefully so my view is clear; B) soften my input to keep things positive; C) hold back until I’m sure it’s safe to speak",
      "When deadlines are tight, I usually: A) keep my updates short and limited to my own part; B) rely on humor to ease the pressure; C) adapt to the group’s tone so things run smoothly",
      "Pick most like me and least like me: 'I focus on keeping meetings calm.'; 'I hold back some of my real thoughts.'; 'I push until my view is accepted.'; 'I lighten tension with humor.'",
      "Pick most like me and least like me: 'I keep my work contained in my own area.'; 'I share only a safe version of my input.'; 'I adjust to match the group’s tone.'; 'I rarely speak up unless asked.'",
      "Pick most like me and least like me: 'I make sure meetings end with clear decisions.'; 'I avoid saying things that might create conflict.'; 'I rely on being the strongest voice in the room.'; 'I soften my stance to maintain harmony.'",
      "Pick most like me and least like me: 'I hold back concerns until I feel safe.'; 'I speak with force so my ideas land.'; 'I step in quickly to smooth over tension.'; 'I keep updates limited to my part of the work.'",
    ],
    archetypes: {
      Withholder: {
        name: "Withholder",
        description:
          "Keeps concerns, questions, or feedback inside. On the surface, this looks like alignment — in reality, it leaves risks unspoken, creativity muted, and decisions shaky because the real issues never reach the table.",
        details:
          "Fear of conflict or judgment creates an environment where important information doesn't flow freely.",
        questionIndices: [0, 6],
      },
      "Guarded Collaborator": {
        name: "Guarded Collaborator",
        description:
          "Shares only what feels safe, holding back full thoughts until trust is proven. This protects against judgment but creates distance, leaving teammates without the clarity or transparency needed to build real trust.",
        details: "This pattern reduces collaboration and trust over time.",
        questionIndices: [7, 11],
      },
      Dominator: {
        name: "Dominator",
        description:
          "Pushes their view until it prevails. Meetings move quickly, but at the cost of inclusiveness. Others step back, collaboration narrows, and over time the group’s best ideas are lost to one loud perspective.",
        details: "This reduces team engagement and diversity of thought.",
        questionIndices: [1, 9],
      },
      Peacemaker: {
        name: "Peacemaker",
        description:
          "Values harmony above candor. Conflict is softened or avoided, which maintains comfort but prevents honest problem-solving. Frustrations build beneath the surface while decisions lack the strength of open debate.",
        details: "This leads to unresolved issues and weaker decisions.",
        questionIndices: [2, 8],
      },
      Fragmenter: {
        name: "Fragmenter",
        description:
          "Keeps work and information siloed. Everyone looks busy, but priorities clash and misalignment grows. The team spends more time repairing breakdowns than moving forward together.",
        details: "This creates inefficiency and misalignment in teams.",
        questionIndices: [3, 9],
      },
      "Closed-Off Colleague": {
        name: "Closed-Off Colleague",
        description:
          "Rarely volunteers input unless asked. This keeps them safe from criticism but makes engagement one-sided. Valuable insights stay hidden, which reduces innovation and weakens the sense of collaboration.",
        details: "This limits team innovation and engagement.",
        questionIndices: [4, 10],
      },
      Distractor: {
        name: "Distractor",
        description:
          "Uses humor, tangents, or side chatter to lighten the mood. While it keeps energy high, it dilutes focus and prevents tough issues from being resolved, leaving decisions unclear and momentum lost.",
        details: "This reduces clarity and decision-making effectiveness.",
        questionIndices: [5],
      },
      "Over-Adapter": {
        name: "Over-Adapter",
        description:
          "Shifts tone, stance, or style to fit others. On the surface, this looks flexible. In truth, it erodes authenticity and makes contributions less consistent, leaving the team uncertain about where they really stand.",
        details: "This undermines authenticity and team clarity.",
        questionIndices: [6, 11],
      },
    },
    reverseScoredIndices: [],
    customQuestionMappings: {
      12: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 3 }, // A) Raise directly
          2: { archetype: "Guarded Collaborator", score: 5 }, // B) Mention privately
          3: { archetype: "Withholder", score: 5 }, // C) Wait
        },
      },
      13: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Peacemaker", score: 5 }, // A) Smooth over
          2: { archetype: "Dominator", score: 5 }, // B) Push point
          3: { archetype: "Closed-Off Colleague", score: 5 }, // C) Stay quiet
        },
      },
      14: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Dominator", score: 5 }, // A) Speak forcefully
          2: { archetype: "Peacemaker", score: 5 }, // B) Soften input
          3: { archetype: "Withholder", score: 5 }, // C) Hold back
        },
      },
      15: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Fragmenter", score: 5 }, // A) Keep updates short
          2: { archetype: "Distractor", score: 5 }, // B) Use humor
          3: { archetype: "Over-Adapter", score: 5 }, // C) Adapt to group
        },
      },
      16: {
        type: "ipsative",
        mappings: {
          0: "Peacemaker",
          1: "Withholder",
          2: "Dominator",
          3: "Distractor",
        },
      },
      17: {
        type: "ipsative",
        mappings: {
          0: "Fragmenter",
          1: "Guarded Collaborator",
          2: "Over-Adapter",
          3: "Closed-Off Colleague",
        },
      },
      18: {
        type: "ipsative",
        mappings: {
          0: "Dominator",
          1: "Over-Adapter",
          2: "Dominator",
          3: "Peacemaker",
        },
      },
      19: {
        type: "ipsative",
        mappings: {
          0: "Withholder",
          1: "Dominator",
          2: "Peacemaker",
          3: "Fragmenter",
        },
      },
    },
    minRawPerArchetype: 3,
    maxRawPerArchetype: 18,
    lowThreshold: 34,
    moderateThreshold: 54,
    balancingIndices: [],
    overallCalculation: "average-top3",
  },
  leadership: {
    title: "Leadership Performance Assessment",
    questions: [
      "When faced with strategic uncertainty, I prefer to pause until risks are fully mapped rather than act with incomplete data.",
      "I tend to refine ideas until they feel polished, even if this slows momentum.",
      "I often introduce bold changes quickly, trusting urgency to align people later.",
      "In moments of disruption, I lean more toward: A) Taking immediate action, even without full clarity; B) Waiting for structured alignment before moving forward",
      "In tense executive discussions, I choose unity over voicing concerns that may spark conflict.",
      "I hesitate to contradict peers in public forums, even when I see significant risks.",
      "I sometimes let my vision take priority over incorporating others’ perspectives.",
      "I make a point to acknowledge when peer input strengthens my original approach.",
      "I hand off major initiatives with minimal oversight, assuming trust will drive results.",
      "I avoid stepping in when projects drift, for fear of undermining ownership.",
      "I sometimes delay addressing performance concerns in the hope that coaching will be enough.",
      "When projects veer off track, I am most likely to: A) Step back, trusting the team to self-correct; B) Intervene quickly to course‑correct",
      "I challenge new proposals until risks are addressed thoroughly, even if it delays action.",
      "I prefer tested approaches over unproven methods when the stakes are high.",
      "I hesitate to greenlight bold initiatives without strong certainty of outcomes.",
      "Balancing: I am willing to approve small pilot projects even when risks are not fully resolved.",
      "I focus on short‑term outcomes to demonstrate progress, even if long‑term priorities wait.",
      "I push teams hard for visible results, even when capacity is already stretched.",
      "I reward activity that signals progress, sometimes more than underlying impact.",
      "When reviewing results, I emphasize more: A) Immediate metrics that prove progress; B) Strategic indicators that build long‑term value",
      "I spend more time supporting individuals than advancing enterprise‑wide priorities.",
      "I hesitate to enforce hard accountability when relationships might be strained.",
      "I often measure my success by harmony across stakeholders, not by the speed of execution.",
      "I make it a practice to pair supportive coaching with clear performance expectations.",
    ],
    archetypes: {
      "Strategic Architect": {
        name: "Strategic Architect",
        description: "Structure, planning, control",
        details:
          "You bring clarity and order to complex problems. When resistance is high, this becomes rigidity. You may slow bold moves, delay pivots, or hold too much control yourself. Teams can feel dependent on your sign-off rather than empowered.",
        questionIndices: [0, 14],
      },
      "Vision‑Driven Innovator": {
        name: "Vision‑Driven Innovator",
        description: "Originality, perfectionism, vision over collaboration",
        details:
          "You inspire bold ideas and see opportunities others miss. When resistance is high, vision turns into overprotection. You may hold concepts too tightly, delay launches, or resist input. This can stall execution and frustrate peers.",
        questionIndices: [1, 6],
      },
      "Decisive Change Agent": {
        name: "Decisive Change Agent",
        description: "Speed, disruption, urgency",
        details:
          "You create urgency and momentum in times of disruption. When resistance is high, this becomes overdrive. You may push shifts too quickly, bypass input, and exhaust teams. Stakeholders may begin to question sustainability.",
        questionIndices: [2, 17],
      },
      "Collaborative Harmonizer": {
        name: "Collaborative Harmonizer",
        description: "Conflict avoidance, consensus, harmony",
        details:
          "You unite people and foster alignment. When resistance is high, harmony becomes avoidance. You may hold back dissent, endorse consensus too quickly, or soften conflict. This leaves risks unspoken and reduces decisiveness.",
        questionIndices: [4, 5, 22],
      },
      "Empowering Delegator": {
        name: "Empowering Delegator",
        description: "Hands‑off, over‑trust, accountability gaps",
        details:
          "You grow people by giving ownership. When resistance is high, empowerment becomes disengagement. You may step back too far, avoid oversight, or fail to clarify expectations. Teams may feel abandoned and results can slip.",
        questionIndices: [8, 9],
      },
      "People‑Centric Coach": {
        name: "People‑Centric Coach",
        description: "Over‑coaching, delayed accountability",
        details:
          "You invest deeply in developing talent. When resistance is high, coaching becomes overextension. You may hold onto underperformers, delay tough calls, or over-prioritize individuals at the expense of enterprise needs.",
        questionIndices: [10, 20],
      },
      "Risk‑Aware Stabilizer": {
        name: "Risk‑Aware Stabilizer",
        description: "Caution, status‑quo protection, over‑analysis",
        details:
          "You safeguard the organization with vigilance. When resistance is high, caution becomes over-caution. You may slow decisions, challenge bold ideas, or default to the status quo. Opportunities are often missed in the name of safety.",
        questionIndices: [12, 13],
      },
      "Outcome‑Driven Achiever": {
        name: "Outcome‑Driven Achiever",
        description: "Results obsession, short‑term wins",
        details:
          "You drive accountability and results relentlessly. When resistance is high, focus narrows to short-term wins. You may create fatigue, overlook innovation, or sacrifice sustainability. Success can come at the cost of long-term value.",
        questionIndices: [16, 18],
      },
    },
    reverseScoredIndices: [7, 15, 23], // Q8, Q16, Q24
    customQuestionMappings: {
      3: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Decisive Change Agent", score: 5 }, // A) Immediate action
          2: { archetype: "none", score: 1 }, // B) Wait for alignment
        },
      },
      11: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Empowering Delegator", score: 5 }, // A) Step back
          2: { archetype: "none", score: 1 }, // B) Intervene
        },
      },
      19: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Outcome-Driven Achiever", score: 5 }, // A) Immediate metrics
          2: { archetype: "Strategic Architect", score: 1 }, // B) Long-term value
        },
      },
    },
    minRawPerArchetype: 3,
    maxRawPerArchetype: 15,
    lowThreshold: 34,
    moderateThreshold: 54,
    balancingIndices: [],
    overallCalculation: "dominant",
  },
  management: {
    title: "Middle Management Assessment",
    questions: [
      "Even after assigning tasks, I often review or adjust details before I feel comfortable.",
      "A team member submits solid work that isn't exactly my style. My instinct is to: A) Approve it as-is to recognize their ownership B) Rework sections so it aligns with my preferred approach",
      "I make a conscious effort to give team members full ownership, even if the results differ from my style.",
      "I prefer to keep key approvals centralized with me rather than distributed across the team.",
      "Senior leadership asks for a quick turnaround. I am most likely to: A) Ask my team to proceed while I catch up on details later B) Delay action until I can personally review and sign off",
      "I actively create systems so projects can progress without waiting for me.",
      "I often find myself jumping into urgent issues even when long-term projects need attention.",
      "When I'm praised for my work, it's usually for: A) Solving immediate problems under pressure B) Driving steady, long-term improvements",
      "I make space in my schedule for preventative improvements, even when urgent needs compete.",
      "I often take on tasks myself because it feels faster than explaining them.",
      "When deadlines are tight, I am most likely to: A) Step in and do the work myself B) Rely on my team, even if it risks delays or mistakes",
      "I regularly review my workload and reassign tasks so I don't carry more than my share.",
      "In tense discussions, I tend to smooth things over rather than push my own perspective strongly.",
      "A team member consistently misses deadlines. I am most likely to: A) Delay confrontation, hoping they self-correct B) Address the issue directly, even if it creates tension",
      "I believe constructive conflict, when handled well, strengthens trust and performance.",
      "I make sure senior leaders are aware of my role in team successes.",
      "A project succeeds because of teamwork. When sharing results upward, I am most likely to: A) Highlight my leadership role B) Spotlight the team's efforts more than my own",
      "I actively redirect recognition toward my team when they drive success.",
      "I tend to stay focused on tasks and results more than the emotional dynamics of my team.",
      "A team member seems disengaged. My instinct is to: A) Assume they'll speak up if important B) Ask questions to explore what's affecting their work",
      "I make an effort to connect personally with team members so they feel supported beyond tasks.",
      "I prefer to follow established procedures rather than adapt them on the spot.",
      "Senior leadership asks for a quick solution that bends procedure. I am most likely to: A) Stick to the rules to ensure consistency B) Adapt quickly, even if it means breaking the rules",
      "I view rules as guidelines that can be adapted when circumstances require flexibility.",
    ],
    archetypes: {
      Micromanager: {
        name: "Micromanager",
        description:
          "You set high standards and ensure work meets your expectations.",
        details:
          "You set high standards and ensure work meets your expectations. When resistance is high, this turns into double-checking or reworking others' efforts, which slows execution. Teams may deliver less independently if they sense you don't fully let go.",
        questionIndices: [0],
      },
      "Bottleneck Manager": {
        name: "Bottleneck Manager",
        description:
          "You want quality and control before decisions move forward.",
        details:
          "You want quality and control before decisions move forward. When resistance is high, approvals stall and projects back up, leaving others waiting. Over time, this can create frustration and reduce momentum across your team.",
        questionIndices: [3],
      },
      Firefighter: {
        name: "Firefighter",
        description: "You thrive in urgency and handle crises quickly.",
        details:
          "You thrive in urgency and handle crises quickly. When resistance is high, reacting to problems overshadows preventing them, leaving your team stuck in 'fix-it mode.' Long-term priorities often get delayed while short-term fires dominate.",
        questionIndices: [6],
      },
      "Overloaded Doer": {
        name: "Overloaded Doer",
        description:
          "You lead by example and show strong commitment through hard work.",
        details:
          "You lead by example and show strong commitment through hard work. When resistance is high, you take on too much yourself, which creates burnout and limits your team's growth. This makes results depend too heavily on your effort.",
        questionIndices: [9],
      },
      "Conflict Avoider": {
        name: "Conflict Avoider",
        description:
          "You keep relationships smooth and create a calm environment.",
        details:
          "You keep relationships smooth and create a calm environment. When resistance is high, you hold back feedback or avoid tension, which weakens accountability. Issues linger longer than they should, eroding trust and performance.",
        questionIndices: [12],
      },
      "Credit Seeker": {
        name: "Credit Seeker",
        description:
          "You ensure achievements don't go unnoticed and highlight your role in success.",
        details:
          "You ensure achievements don't go unnoticed and highlight your role in success. When resistance is high, recognition leans too much toward self-promotion, which can frustrate peers and demotivate your team. Leaders may question your maturity in collaboration.",
        questionIndices: [15],
      },
      "Detached Manager": {
        name: "Detached Manager",
        description:
          "You stay focused on tasks and results, keeping boundaries clear.",
        details:
          "You stay focused on tasks and results, keeping boundaries clear. When resistance is high, this becomes emotional distance, leaving team members feeling unseen or undervalued. Engagement and loyalty may slip as a result.",
        questionIndices: [18],
      },
      "Rule-Bound Operator": {
        name: "Rule-Bound Operator",
        description:
          "You respect structure and processes, ensuring fairness and consistency.",
        details:
          "You respect structure and processes, ensuring fairness and consistency. When resistance is high, strict rules slow progress and limit adaptability. Teams may feel stifled when flexibility is needed for speed or innovation.",
        questionIndices: [21],
      },
    },
    reverseScoredIndices: [2, 5, 8, 11, 14, 17, 20, 23], // Balancing Q3, Q6, Q9, Q12, Q15, Q18, Q21, Q24
    customQuestionMappings: {
      1: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 1 }, // A) Approve as-is
          2: { archetype: "Micromanager", score: 5 }, // B) Rework
        },
      },
      4: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "none", score: 1 }, // A) Team proceed
          2: { archetype: "Bottleneck Manager", score: 5 }, // B) Delay
        },
      },
      7: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Firefighter", score: 5 }, // A) Solve immediate
          2: { archetype: "none", score: 1 }, // B) Long-term
        },
      },
      10: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Overloaded Doer", score: 5 }, // A) Do work myself
          2: { archetype: "none", score: 1 }, // B) Rely on team
        },
      },
      13: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Conflict Avoider", score: 5 }, // A) Delay confrontation
          2: { archetype: "none", score: 1 }, // B) Address directly
        },
      },
      16: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Credit Seeker", score: 5 }, // A) Highlight my role
          2: { archetype: "none", score: 1 }, // B) Spotlight team
        },
      },
      19: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Detached Manager", score: 5 }, // A) Assume speak up
          2: { archetype: "none", score: 1 }, // B) Ask questions
        },
      },
      22: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Rule-Bound Operator", score: 5 }, // A) Stick to rules
          2: { archetype: "none", score: 1 }, // B) Adapt
        },
      },
    },
    minRawPerArchetype: 3,
    maxRawPerArchetype: 15,
    lowThreshold: 30,
    moderateThreshold: 50,
    balancingIndices: [],
    overallCalculation: "total-sum",
    overallMax: 120,
  },
  sales: {
    title: "Sales Free Assessment",
    questions: [
      "I sometimes agree to customer requests before checking if they are realistic.",
      "If a customer asks for more, my first instinct is to say yes.",
      "A client requests something outside of scope. Do you: A) Agree quickly to keep them happy; B) Ask for time to confirm before answering; C) Decline politely",
      "I often lower price or add extras to win a deal.",
      "I believe offering a discount is the fastest way to move a hesitant customer forward.",
      "A prospect pushes back on price. Do you: A) Offer a discount immediately; B) Reframe the value before discussing price; C) Hold firm on price and explain trade-offs",
      "I sometimes avoid pushing back on customers to keep things positive.",
      "I believe being liked is more important than risking conflict in a deal.",
      "A customer challenges your proposal. Do you: A) Back down to preserve rapport; B) Find a compromise to keep harmony; C) Defend your position respectfully",
      "I often push hard for decisions to keep deals from stalling.",
      "I believe hesitation means I should press more firmly for the close.",
      "A customer hesitates to commit. Do you: A) Push harder to close quickly; B) Ask clarifying questions first; C) Give them space and follow up later",
      "I sometimes overwhelm customers by explaining too many features.",
      "I believe the more details I share, the more likely customers will buy.",
      "In a demo, do you: A) Cover as many features as possible; B) Highlight a mix of features and benefits; C) Focus only on the customer’s top needs",
      "I sometimes put off prospecting until my pipeline is thin.",
      "I believe urgent deals matter more than building new opportunities.",
      "My prospecting habit looks most like: A) Sporadic, usually when deals run low; B) Occasional, depending on workload; C) Consistent outreach, even with a full pipeline",
      "I focus more on urgent deals than on long-term sales activities.",
      "I believe handling what is most urgent is always the right choice.",
      "If two tasks conflict, I choose: A) The urgent deal that must be handled now; B) Try to balance both as best I can; C) The long-term activity that builds future pipeline",
      "I sometimes avoid asking directly for the deal.",
      "I believe customers should make the decision without me asking.",
      "At the end of a conversation, do you: A) Wait for the customer to bring up next steps; B) Suggest possible options but leave the choice open; C) Clearly recommend the next step yourself",
    ],
    archetypes: {
      "Over Promiser": {
        name: "Over Promiser",
        description:
          "You build excitement quickly by saying yes to customer requests.",
        details:
          "This makes customers feel supported, but over time it can create strain when promises are difficult to deliver. Growth improves when you balance reassurance with realistic commitments.",
        questionIndices: [0, 1],
      },
      "Discount Giver": {
        name: "Discount Giver",
        description:
          "You reduce friction in deals by lowering price or adding extras.",
        details:
          "While this may win quick agreements, it erodes margins and positions your offer as less valuable. Long-term growth comes from defending value instead of defaulting to discounts.",
        questionIndices: [3, 4],
      },
      "Relationship Pleaser": {
        name: "Relationship Pleaser",
        description: "You excel at building rapport and creating trust.",
        details:
          "Customers like working with you, but resistance shows up when you avoid tough conversations or conflict. Growth comes from pairing empathy with the courage to raise difficult truths.",
        questionIndices: [6, 7],
      },
      "Closer Controller": {
        name: "Closer Controller",
        description: "You bring energy and urgency to your deals.",
        details:
          "Customers feel your determination, but when resistance rises it can feel like pressure. Sustainable growth comes from balancing influence with listening and collaboration.",
        questionIndices: [9, 10],
      },
      "Product Drowner": {
        name: "Product Drowner",
        description:
          "You know your product well and want customers to see everything it can do.",
        details:
          "This creates confidence in your expertise, but it can overwhelm customers with too many details. Growth comes from focusing only on the features that matter most.",
        questionIndices: [12, 13],
      },
      "Pipeline Avoider": {
        name: "Pipeline Avoider",
        description:
          "You thrive once deals are active, putting your energy into closing.",
        details:
          "Resistance appears when prospecting is delayed or avoided, creating feast-and-famine cycles. Growth improves when you build a consistent pipeline alongside closing.",
        questionIndices: [15, 16],
      },
      "Reactive Firefighter": {
        name: "Reactive Firefighter",
        description:
          "You shine in urgent situations, stepping in with speed and energy.",
        details:
          "But constant reactivity creates inconsistency and neglects long-term growth. Sustainable results come from balancing urgency with steady sales discipline.",
        questionIndices: [18, 19],
      },
      "Silent Resistor": {
        name: "Silent Resistor",
        description:
          "You build trust by giving customers space and avoiding pushy tactics.",
        details:
          "This earns goodwill, but deals often stall without clear next steps. Growth comes from guiding decisions directly instead of waiting in silence.",
        questionIndices: [21, 22],
      },
    },
    reverseScoredIndices: [],
    customQuestionMappings: {
      2: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Over Promiser", score: 5 }, // A) Agree quickly
          2: { archetype: "none", score: 3 }, // B) Ask for time
          3: { archetype: "none", score: 1 }, // C) Decline
        },
      },
      5: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Discount Giver", score: 5 }, // A) Offer discount
          2: { archetype: "none", score: 3 }, // B) Reframe value
          3: { archetype: "none", score: 1 }, // C) Hold firm
        },
      },
      8: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Relationship Pleaser", score: 5 }, // A) Back down
          2: { archetype: "none", score: 3 }, // B) Compromise
          3: { archetype: "none", score: 1 }, // C) Defend
        },
      },
      11: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Closer Controller", score: 5 }, // A) Push harder
          2: { archetype: "none", score: 3 }, // B) Ask questions
          3: { archetype: "none", score: 1 }, // C) Give space
        },
      },
      14: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Product Drowner", score: 5 }, // A) Cover all features
          2: { archetype: "none", score: 3 }, // B) Mix features/benefits
          3: { archetype: "none", score: 1 }, // C) Focus on needs
        },
      },
      17: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Pipeline Avoider", score: 5 }, // A) Sporadic
          2: { archetype: "none", score: 3 }, // B) Occasional
          3: { archetype: "none", score: 1 }, // C) Consistent
        },
      },
      20: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Reactive Firefighter", score: 5 }, // A) Urgent deal
          2: { archetype: "none", score: 3 }, // B) Balance both
          3: { archetype: "none", score: 1 }, // C) Long-term
        },
      },
      23: {
        type: "multiple-choice",
        mappings: {
          1: { archetype: "Silent Resistor", score: 5 }, // A) Wait
          2: { archetype: "none", score: 3 }, // B) Suggest options
          3: { archetype: "none", score: 1 }, // C) Recommend
        },
      },
    },
    minRawPerArchetype: 3,
    maxRawPerArchetype: 15,
    lowThreshold: 34,
    moderateThreshold: 50,
    balancingIndices: [],
    overallCalculation: "dominant",
  },
};

export function getAssessmentData(
  assessmentType: string,
): AssessmentData | null {
  return assessmentData[assessmentType] || null;
}

export function getArchetypeData(
  assessmentType: string,
  archetypeName: string,
) {
  const data = assessmentData[assessmentType];
  if (!data) return null;

  return data.archetypes[archetypeName] || null;
}
