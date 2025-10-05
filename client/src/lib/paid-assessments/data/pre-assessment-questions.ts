// Pre-assessment questions configuration for different assessment types

export interface PreAssessmentQuestion {
  id: string;
  type: "select" | "radio";
  text: string;
  options: Array<{
    value: string;
    text: string;
    additionalQuestions?: PreAssessmentQuestion[]; // For conditional follow-up questions
  }>;
  required: boolean;
}

export interface PreAssessmentConfig {
  assessmentType: string;
  questions: PreAssessmentQuestion[];
}

// Leadership and Career Growth Pre-Assessment Questions
const leadershipCareerGrowthQuestions: PreAssessmentQuestion[] = [
  {
    id: "organizationCategory",
    type: "radio",
    text: "Which best describes your organization?",
    options: [
      {
        value: "corporate",
        text: "Corporate - Enterprise governance (500+ employees)"
      },
      {
        value: "mid-size",
        text: "Mid-Size - Leadership team agility (50-500 employees)"
      },
      {
        value: "smb",
        text: "SMB - Owner-led operations (20-50 employees)"
      },
      {
        value: "entrepreneur",
        text: "Entrepreneur - Founder led companies",
        additionalQuestions: [
          {
            id: "entrepreneurSubcategory",
            type: "radio",
            text: "Which category best describes your company?",
            options: [
              {
                value: "sole",
                text: "Sole (0-1 employee)"
              },
              {
                value: "micro",
                text: "Micro startup (2-10 employees)"
              },
              {
                value: "growing",
                text: "Growing Venture (11-25 employees)"
              }
            ],
            required: true
          }
        ]
      }
    ],
    required: true
  }
];

// Sales Assessment Pre-Assessment Questions
const salesQuestions: PreAssessmentQuestion[] = [
  {
    id: "salesType",
    type: "radio",
    text: "Type of Sales You Primarily Do",
    options: [
      {
        value: "retail-pos",
        text: "Retail / Point-of-Sale"
      },
      {
        value: "inside-sales-smb",
        text: "Inside Sales / SMB"
      },
      {
        value: "enterprise-b2b",
        text: "Enterprise / B2B"
      },
      {
        value: "consulting-independent",
        text: "Consulting / Independent"
      },
      {
        value: "other",
        text: "Other"
      }
    ],
    required: true
  },
  {
    id: "companySize",
    type: "radio",
    text: "Company Size",
    options: [
      {
        value: "1-10",
        text: "1–10"
      },
      {
        value: "11-50",
        text: "11–50"
      },
      {
        value: "51-250",
        text: "51–250"
      },
      {
        value: "251-1000",
        text: "251–1000"
      },
      {
        value: "1000-plus",
        text: "1000+"
      }
    ],
    required: true
  }
];

// Team Communication Assessment Pre-Assessment Questions
const teamCommunicationQuestions: PreAssessmentQuestion[] = [
  {
    id: "teamSize",
    type: "radio",
    text: "Which best describes the size of the team you primarily work with?",
    options: [
      {
        value: "1-5",
        text: "1–5 people"
      },
      {
        value: "6-10",
        text: "6–10 people"
      },
      {
        value: "11-20",
        text: "11–20 people"
      },
      {
        value: "21-50",
        text: "21–50 people"
      },
      {
        value: "51-plus",
        text: "51+ people"
      }
    ],
    required: true
  },
  {
    id: "workType",
    type: "radio",
    text: "What is the primary type of work your team focuses on?",
    options: [
      {
        value: "project-based",
        text: "Project-based (engineering, IT, construction, consulting)"
      },
      {
        value: "service-oriented",
        text: "Service-oriented (customer support, sales, healthcare)"
      },
      {
        value: "operations",
        text: "Operations (process, logistics, manufacturing)"
      },
      {
        value: "creative-innovation",
        text: "Creative/Innovation (marketing, design, R&D)"
      },
      {
        value: "administrative-support",
        text: "Administrative/Support"
      },
      {
        value: "other",
        text: "Other (please specify)"
      }
    ],
    required: true
  }
];

// Middle Management Assessment Pre-Assessment Questions
const middleManagementQuestions: PreAssessmentQuestion[] = [
  {
    id: "companySize",
    type: "radio",
    text: "Which best describes the size of your company?",
    options: [
      {
        value: "1-25",
        text: "1–25 employees"
      },
      {
        value: "26-50",
        text: "26–50 employees"
      },
      {
        value: "51-100",
        text: "51–100 employees"
      },
      {
        value: "101-250",
        text: "101–250 employees"
      },
      {
        value: "251-500",
        text: "251–500 employees"
      },
      {
        value: "500-plus",
        text: "500+ employees"
      }
    ],
    required: true
  },
  {
    id: "industry",
    type: "radio",
    text: "Which industry do you primarily work in?",
    options: [
      {
        value: "construction-contracting",
        text: "Construction / Contracting"
      },
      {
        value: "manufacturing",
        text: "Manufacturing"
      },
      {
        value: "professional-services",
        text: "Professional Services"
      },
      {
        value: "healthcare",
        text: "Healthcare"
      },
      {
        value: "technology",
        text: "Technology"
      },
      {
        value: "education-nonprofit",
        text: "Education / Nonprofit"
      },
      {
        value: "other",
        text: "Other (please specify)"
      }
    ],
    required: true
  },
  {
    id: "yearsInManagement",
    type: "radio",
    text: "How many years have you been in a management role?",
    options: [
      {
        value: "less-than-1",
        text: "Less than 1 year"
      },
      {
        value: "1-3",
        text: "1–3 years"
      },
      {
        value: "4-7",
        text: "4–7 years"
      },
      {
        value: "8-15",
        text: "8–15 years"
      },
      {
        value: "15-plus",
        text: "15+ years"
      }
    ],
    required: true
  },
  {
    id: "currentTeamSize",
    type: "radio",
    text: "How many people do you directly manage?",
    options: [
      {
        value: "1-5",
        text: "1–5"
      },
      {
        value: "6-10",
        text: "6–10"
      },
      {
        value: "11-20",
        text: "11–20"
      },
      {
        value: "21-50",
        text: "21–50"
      },
      {
        value: "51-plus",
        text: "51+"
      }
    ],
    required: true
  }
];

// Configuration mapping for each assessment type
export const preAssessmentConfigs: Record<string, PreAssessmentConfig> = {
  leadership: {
    assessmentType: "leadership",
    questions: leadershipCareerGrowthQuestions
  },
  "career-growth": {
    assessmentType: "career-growth",
    questions: leadershipCareerGrowthQuestions
  },
  "career": {
    assessmentType: "career",
    questions: leadershipCareerGrowthQuestions
  },
  sales: {
    assessmentType: "sales",
    questions: salesQuestions
  },
  "team-communication": {
    assessmentType: "team-communication",
    questions: teamCommunicationQuestions
  },
  "team": {
    assessmentType: "team",
    questions: teamCommunicationQuestions
  },
  "middle-management": {
    assessmentType: "middle-management",
    questions: middleManagementQuestions
  },
  "individual": {
    assessmentType: "individual",
    questions: leadershipCareerGrowthQuestions
  },
  "individual-performance": {
    assessmentType: "individual-performance",
    questions: leadershipCareerGrowthQuestions
  }
};

// Helper function to get pre-assessment questions for a specific assessment type
export function getPreAssessmentQuestions(assessmentType: string): PreAssessmentQuestion[] {
  const config = preAssessmentConfigs[assessmentType];
  return config ? config.questions : [];
}

// Helper function to check if an assessment type has pre-assessment questions
export function hasPreAssessmentQuestions(assessmentType: string): boolean {
  return assessmentType in preAssessmentConfigs;
}