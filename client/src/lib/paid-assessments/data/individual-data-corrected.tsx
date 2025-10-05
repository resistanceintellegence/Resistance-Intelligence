// CORRECTED Individual Assessment Questions Structure
// Based on provided documentation: 60 total questions (48 archetype + 12 balancing)
// Each archetype: 2 Direct + 2 Oblique + 2 Forced-Choice = 6 questions per archetype

export const CORRECTED_QUESTIONS = {
  direct: [
    // Perfectionist Achiever Direct (Q1, Q2)
    {
      id: "q1",
      type: "direct",
      text: "I often recheck or redo my work to make sure it's flawless.",
      archetype: "perfectionist-achiever",
    },
    {
      id: "q2",
      type: "direct",
      text: "I feel uncomfortable sharing work unless I've refined it several times.",
      archetype: "perfectionist-achiever",
    },
    // Helper / Over-Giver Direct (Q7, Q8)
    {
      id: "q7",
      type: "direct",
      text: "I often take on extra responsibilities to support others, even when I'm busy.",
      archetype: "helper-over-giver",
    },
    {
      id: "q8",
      type: "direct",
      text: "I struggle to say no when someone asks for help.",
      archetype: "helper-over-giver",
    },
    // Avoider Direct (Q13, Q14)
    {
      id: "q13",
      type: "direct",
      text: "I delay starting tasks that feel uncomfortable or uncertain.",
      archetype: "avoider",
    },
    {
      id: "q14",
      type: "direct",
      text: "I sometimes wait until deadlines force me to act.",
      archetype: "avoider",
    },
    // Cautious Evaluator Direct (Q19, Q20)
    {
      id: "q19",
      type: "direct",
      text: "I often overthink decisions before moving forward.",
      archetype: "cautious-evaluator",
    },
    {
      id: "q20",
      type: "direct",
      text: "I double-check my plan multiple times before starting.",
      archetype: "cautious-evaluator",
    },
    // Independent Doer Direct (Q25, Q26)
    {
      id: "q25",
      type: "direct",
      text: "I prefer to work independently rather than rely on others.",
      archetype: "independent-doer",
    },
    {
      id: "q26",
      type: "direct",
      text: "I sometimes resist feedback because I like doing things my way.",
      archetype: "independent-doer",
    },
    // Recognition Seeker Direct (Q31, Q32)
    {
      id: "q31",
      type: "direct",
      text: "I feel more motivated when my efforts are noticed by others.",
      archetype: "recognition-seeker",
    },
    {
      id: "q32",
      type: "direct",
      text: "I emphasize my role in projects so my contributions are visible.",
      archetype: "recognition-seeker",
    },
    // Over-Controller Direct (Q37, Q38)
    {
      id: "q37",
      type: "direct",
      text: "I often feel things go better when I'm in control.",
      archetype: "over-controller",
    },
    {
      id: "q38",
      type: "direct",
      text: "I struggle to delegate because I want things done my way.",
      archetype: "over-controller",
    },
    // Comfort Zoner Direct (Q43, Q44)
    {
      id: "q43",
      type: "direct",
      text: "I prefer steady, predictable tasks over high-stakes challenges.",
      archetype: "comfort-zoner",
    },
    {
      id: "q44",
      type: "direct",
      text: "I resist major changes in how I work.",
      archetype: "comfort-zoner",
    },
  ],
  oblique: [
    // Perfectionist Achiever Oblique (Q3, Q4)
    {
      id: "q3",
      type: "oblique",
      text: "I hesitate to submit work because I feel it could always be improved.",
      archetype: "perfectionist-achiever",
      options: [], // Likert 1-5
    },
    {
      id: "q4",
      type: "oblique",
      text: "When I finish a task, I tend to notice:",
      archetype: "perfectionist-achiever",
      options: [
        { value: "a", label: "What could still be improved", archetypeScore: 5 },
        { value: "b", label: "The mistakes I avoided", archetypeScore: 5 },
        { value: "c", label: "The parts that went well", archetypeScore: 1 },
      ],
    },
    // Helper / Over-Giver Oblique (Q9, Q10) 
    {
      id: "q9",
      type: "oblique",
      text: "When I see someone struggling, I usually:",
      archetype: "helper-over-giver",
      options: [
        { value: "a", label: "Step in to help immediately", archetypeScore: 5 },
        { value: "b", label: "Offer if they ask", archetypeScore: 2 },
        { value: "c", label: "Focus on my own tasks", archetypeScore: 1 },
      ],
    },
    {
      id: "q10",
      type: "oblique",
      text: "In group projects, I tend to:",
      archetype: "helper-over-giver",
      options: [
        { value: "a", label: "Take care of the hardest tasks to ease the load", archetypeScore: 5 },
        { value: "b", label: "Focus only on my assigned part", archetypeScore: 1 },
        { value: "c", label: "Delegate tasks clearly", archetypeScore: 1 },
      ],
    },
    // Avoider Oblique (Q15, Q16)
    {
      id: "q15",
      type: "oblique",
      text: "I sometimes distract myself with busywork instead of tackling what really matters.",
      archetype: "avoider",
      options: [], // Likert 1-5
    },
    {
      id: "q16",
      type: "oblique",
      text: "When facing a new challenge, I usually think:",
      archetype: "avoider",
      options: [
        { value: "a", label: "What if I fail", archetypeScore: 5 },
        { value: "b", label: "How could this go wrong", archetypeScore: 5 },
        { value: "c", label: "What's the first step forward", archetypeScore: 1 },
      ],
    },
    // Cautious Evaluator Oblique (Q21, Q22)
    {
      id: "q21",
      type: "oblique",
      text: "When I'm unsure of the best option, I tend to:",
      archetype: "cautious-evaluator",
      options: [
        { value: "a", label: "Delay until I have more information", archetypeScore: 5 },
        { value: "b", label: "Act quickly and adjust later", archetypeScore: 1 },
        { value: "c", label: "Ask someone else to decide", archetypeScore: 3 },
      ],
    },
    {
      id: "q22",
      type: "oblique",
      text: "Before starting something new, I usually:",
      archetype: "cautious-evaluator",
      options: [
        { value: "a", label: "Research extensively", archetypeScore: 5 },
        { value: "b", label: "Try a small experiment first", archetypeScore: 2 },
        { value: "c", label: "Jump right in", archetypeScore: 1 },
      ],
    },
    // Independent Doer Oblique (Q27, Q28)
    {
      id: "q27",
      type: "oblique",
      text: "I believe tasks get done better when I don't have to rely on others.",
      archetype: "independent-doer",
      options: [], // Likert 1-5
    },
    {
      id: "q28",
      type: "oblique",
      text: "In group settings, I usually:",
      archetype: "independent-doer",
      options: [
        { value: "a", label: "Take on tasks alone", archetypeScore: 5 },
        { value: "b", label: "Share tasks openly", archetypeScore: 1 },
        { value: "c", label: "Wait for clear instructions", archetypeScore: 2 },
      ],
    },
    // Recognition Seeker Oblique (Q33, Q34)
    {
      id: "q33",
      type: "oblique",
      text: "In meetings, I tend to:",
      archetype: "recognition-seeker",
      options: [
        { value: "a", label: "Speak up to be seen as engaged", archetypeScore: 5 },
        { value: "b", label: "Contribute only when necessary", archetypeScore: 2 },
        { value: "c", label: "Prefer listening quietly", archetypeScore: 1 },
      ],
    },
    {
      id: "q34",
      type: "oblique",
      text: "After finishing a project, I usually:",
      archetype: "recognition-seeker",
      options: [
        { value: "a", label: "Make sure leadership knows my impact", archetypeScore: 5 },
        { value: "b", label: "Move on without drawing attention", archetypeScore: 1 },
        { value: "c", label: "Share credit with the team", archetypeScore: 1 },
      ],
    },
    // Over-Controller Oblique (Q39, Q40)
    {
      id: "q39",
      type: "oblique",
      text: "I find it hard to relax if someone else is handling a task I care about.",
      archetype: "over-controller",
      options: [], // Likert 1-5
    },
    {
      id: "q40",
      type: "oblique",
      text: "When collaborating, I tend to:",
      archetype: "over-controller",
      options: [
        { value: "a", label: "Re-check others' work to be sure", archetypeScore: 5 },
        { value: "b", label: "Trust them fully without oversight", archetypeScore: 1 },
        { value: "c", label: "Step back even if it risks mistakes", archetypeScore: 1 },
      ],
    },
    // Comfort Zoner Oblique (Q45, Q46)
    {
      id: "q45",
      type: "oblique",
      text: "I often avoid new methods if the old way is working fine.",
      archetype: "comfort-zoner",
      options: [], // Likert 1-5
    },
    {
      id: "q46",
      type: "oblique",
      text: "When offered a stretch opportunity, I usually:",
      archetype: "comfort-zoner",
      options: [
        { value: "a", label: "Stick with familiar responsibilities", archetypeScore: 5 },
        { value: "b", label: "Try it only if it feels very safe", archetypeScore: 5 },
        { value: "c", label: "Embrace it for growth", archetypeScore: 1 },
      ],
    },
  ],
  scenario: [], // No separate scenarios
  forcedChoice: [
    // Perfectionist Achiever Forced-Choice (Q5, Q6)
    {
      id: "q5",
      instructions: "After a success, my first thought is:",
      statements: [
        {
          id: "q5a",
          text: "Relief that I didn't mess up",
          archetype: "perfectionist-achiever",
        },
        {
          id: "q5b", 
          text: "Pride in doing everything right",
          archetype: "perfectionist-achiever",
        },
        {
          id: "q5c",
          text: "Excitement for the next challenge",
          archetype: "non-perfectionist",
        },
      ],
    },
    {
      id: "q6",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q6a",
          text: "I refine my work until it's perfect.",
          archetype: "perfectionist-achiever",
        },
        {
          id: "q6b",
          text: "I wait until the last minute to begin.",
          archetype: "avoider",
        },
        {
          id: "q6c",
          text: "I prefer to help others even if I'm behind.",
          archetype: "helper-over-giver",
        },
        {
          id: "q6d",
          text: "I like to keep my work steady and familiar.",
          archetype: "comfort-zoner",
        },
      ],
    },
    // Helper / Over-Giver Forced-Choice (Q11, Q12)
    {
      id: "q11",
      instructions: "When I'm behind on my own tasks and someone asks for help, I usually:",
      statements: [
        {
          id: "q11a",
          text: "Help them anyway",
          archetype: "helper-over-giver",
        },
        {
          id: "q11b",
          text: "Say no and explain",
          archetype: "non-helper",
        },
        {
          id: "q11c",
          text: "Offer later when I'm free",
          archetype: "balanced",
        },
      ],
    },
    {
      id: "q12",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q12a",
          text: "I sacrifice my priorities to support others.",
          archetype: "helper-over-giver",
        },
        {
          id: "q12b",
          text: "I push until my view is accepted.",
          archetype: "over-controller",
        },
        {
          id: "q12c",
          text: "I avoid high-stakes tasks if I'm not ready.",
          archetype: "avoider",
        },
        {
          id: "q12d",
          text: "I prefer safety and routine.",
          archetype: "comfort-zoner",
        },
      ],
    },
    // Avoider Forced-Choice (Q17, Q18)
    {
      id: "q17",
      instructions: "When I have free time, I tend to:",
      statements: [
        {
          id: "q17a",
          text: "Distract myself with smaller, easier tasks",
          archetype: "avoider",
        },
        {
          id: "q17b",
          text: "Tackle the big priorities",
          archetype: "non-avoider",
        },
        {
          id: "q17c",
          text: "Plan, but never start",
          archetype: "avoider",
        },
      ],
    },
    {
      id: "q18",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q18a",
          text: "I procrastinate on tasks that feel heavy.",
          archetype: "avoider",
        },
        {
          id: "q18b",
          text: "I double-check everything before moving forward.",
          archetype: "cautious-evaluator",
        },
        {
          id: "q18c",
          text: "I prefer predictable, steady work.",
          archetype: "comfort-zoner",
        },
        {
          id: "q18d",
          text: "I take charge when others hesitate.",
          archetype: "over-controller",
        },
      ],
    },
    // Cautious Evaluator Forced-Choice (Q23, Q24)
    {
      id: "q23",
      instructions: "When faced with two good options, I tend to:",
      statements: [
        {
          id: "q23a",
          text: "Delay the choice until I'm certain",
          archetype: "cautious-evaluator",
        },
        {
          id: "q23b",
          text: "Pick one quickly and adjust later",
          archetype: "non-cautious",
        },
        {
          id: "q23c",
          text: "Ask someone else to choose",
          archetype: "dependent",
        },
      ],
    },
    {
      id: "q24",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q24a",
          text: "I hesitate until I'm certain.",
          archetype: "cautious-evaluator",
        },
        {
          id: "q24b",
          text: "I refine my work until it's flawless.",
          archetype: "perfectionist-achiever",
        },
        {
          id: "q24c",
          text: "I prefer steady routines.",
          archetype: "comfort-zoner",
        },
        {
          id: "q24d",
          text: "I crave recognition for my efforts.",
          archetype: "recognition-seeker",
        },
      ],
    },
    // Independent Doer Forced-Choice (Q29, Q30)
    {
      id: "q29",
      instructions: "When receiving feedback, I often:",
      statements: [
        {
          id: "q29a",
          text: "Feel it slows me down",
          archetype: "independent-doer",
        },
        {
          id: "q29b",
          text: "Consider it but still prefer my approach",
          archetype: "independent-doer",
        },
        {
          id: "q29c",
          text: "Appreciate it and change course immediately",
          archetype: "collaborative",
        },
      ],
    },
    {
      id: "q30",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q30a",
          text: "I prefer to handle things on my own.",
          archetype: "independent-doer",
        },
        {
          id: "q30b",
          text: "I wait until I feel fully ready before acting.",
          archetype: "cautious-evaluator",
        },
        {
          id: "q30c",
          text: "I need others to see my contributions.",
          archetype: "recognition-seeker",
        },
        {
          id: "q30d",
          text: "I try to keep peace, even if I disagree.",
          archetype: "helper-over-giver",
        },
      ],
    },
    // Recognition Seeker Forced-Choice (Q35, Q36)
    {
      id: "q35",
      instructions: "I feel less motivated to finish a task if no one will see the result.",
      statements: [
        {
          id: "q35a",
          text: "Strongly agree",
          archetype: "recognition-seeker",
        },
        {
          id: "q35b",
          text: "Somewhat agree",
          archetype: "recognition-seeker",
        },
        {
          id: "q35c",
          text: "Disagree",
          archetype: "intrinsically-motivated",
        },
      ],
    },
    {
      id: "q36",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q36a",
          text: "I need recognition to feel successful.",
          archetype: "recognition-seeker",
        },
        {
          id: "q36b",
          text: "I prefer safety and routine.",
          archetype: "comfort-zoner",
        },
        {
          id: "q36c",
          text: "I procrastinate on tasks that feel heavy.",
          archetype: "avoider",
        },
        {
          id: "q36d",
          text: "I want control over how things get done.",
          archetype: "over-controller",
        },
      ],
    },
    // Over-Controller Forced-Choice (Q41, Q42)
    {
      id: "q41",
      instructions: "In team projects, I usually:",
      statements: [
        {
          id: "q41a",
          text: "Take charge of the outcome",
          archetype: "over-controller",
        },
        {
          id: "q41b",
          text: "Let others lead",
          archetype: "collaborative",
        },
        {
          id: "q41c",
          text: "Step aside completely",
          archetype: "passive",
        },
      ],
    },
    {
      id: "q42",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q42a",
          text: "I prefer to keep control.",
          archetype: "over-controller",
        },
        {
          id: "q42b",
          text: "I procrastinate until the last moment.",
          archetype: "avoider",
        },
        {
          id: "q42c",
          text: "I thrive in safe, familiar routines.",
          archetype: "comfort-zoner",
        },
        {
          id: "q42d",
          text: "I need others to see my achievements.",
          archetype: "recognition-seeker",
        },
      ],
    },
    // Comfort Zoner Forced-Choice (Q47, Q48)
    {
      id: "q47",
      instructions: "When facing uncertainty, I prefer to:",
      statements: [
        {
          id: "q47a",
          text: "Retreat to what I know best",
          archetype: "comfort-zoner",
        },
        {
          id: "q47b",
          text: "Experiment to learn",
          archetype: "growth-oriented",
        },
        {
          id: "q47c",
          text: "Ask others to take the lead",
          archetype: "dependent",
        },
      ],
    },
    {
      id: "q48",
      instructions: "Most like me / least like me:",
      statements: [
        {
          id: "q48a",
          text: "I prefer safety and routine.",
          archetype: "comfort-zoner",
        },
        {
          id: "q48b",
          text: "I refine until perfect.",
          archetype: "perfectionist-achiever",
        },
        {
          id: "q48c",
          text: "I avoid responsibility when unsure.",
          archetype: "avoider",
        },
        {
          id: "q48d",
          text: "I need recognition to feel successful.",
          archetype: "recognition-seeker",
        },
      ],
    },
  ],
  balancing: [
    // Balancing Items Q49-Q60 (12 total)
    {
      id: "q49",
      type: "balancing",
      text: "I start before I feel fully ready.",
      isReverseCoded: true,
    },
    {
      id: "q50",
      type: "balancing",
      text: "I welcome feedback as a chance to grow.",
      isReverseCoded: true,
    },
    {
      id: "q51",
      type: "balancing",
      text: "I apply for opportunities even if I don't meet every requirement.",
      isReverseCoded: true,
    },
    {
      id: "q52",
      type: "balancing",
      text: "I share my accomplishments comfortably.",
      isReverseCoded: true,
    },
    {
      id: "q53",
      type: "balancing",
      text: "I say no when requests interfere with my goals.",
      isReverseCoded: true,
    },
    {
      id: "q54",
      type: "balancing",
      text: "I thrive when work feels unfamiliar or challenging.",
      isReverseCoded: true,
    },
    {
      id: "q55",
      type: "balancing",
      text: "I take action even if my work isn't perfect.",
      isReverseCoded: true,
    },
    {
      id: "q56",
      type: "balancing",
      text: "I delegate tasks confidently and trust others' work.",
      isReverseCoded: true,
    },
    {
      id: "q57",
      type: "balancing",
      text: "I stay focused on priorities, even when others need help.",
      isReverseCoded: true,
    },
    {
      id: "q58",
      type: "balancing",
      text: "I am comfortable making decisions that may not please everyone.",
      isReverseCoded: true,
    },
    {
      id: "q59",
      type: "balancing",
      text: "I embrace uncertainty as part of growth.",
      isReverseCoded: true,
    },
    {
      id: "q60",
      type: "balancing",
      text: "I focus on results, not just visibility.",
      isReverseCoded: true,
    },
  ],
};

// VALIDATION SUMMARY:
// Total Questions: 60
// Direct: 16 (8 archetypes × 2)
// Oblique: 16 (8 archetypes × 2) 
// Forced-Choice: 16 (8 archetypes × 2)
// Balancing: 12
// Each archetype has exactly 6 questions (2 + 2 + 2)