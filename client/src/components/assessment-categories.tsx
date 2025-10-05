import { useLocation } from "wouter";
import {
  LeadershipIcon,
  ManagementIcon,
  CareerIcon,
  TeamIcon,
  IndividualIcon,
  SalesIcon,
} from "./Icons"; // adjust path as needed

interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  iconComponent: React.ComponentType;
  features: string[];
  iconBgColor: string;
  iconTextColor: string;
  isRecommended?: boolean;
}

interface AssessmentCategoriesProps {
  isAuthenticated?: boolean;
}

const categories: AssessmentCategory[] = [
  {
    id: "leadership",
    title: "Leadership Performance",
    description: "Assess executive-level decision making and strategic vision",
    iconComponent: LeadershipIcon,
    iconBgColor: "bg-accent/10",
    iconTextColor: "text-accent",
    features: ["Strategic resistance", "Vision control", "Executive presence"],
  },
  {
    id: "management",
    title: "Management Performance",
    description: "Evaluate middle management effectiveness and delegation",
    iconComponent: ManagementIcon,
    iconBgColor: "bg-primary/10",
    iconTextColor: "text-primary",
    features: [
      "Delegation challenges",
      "Micromanagement tendencies",
      "Team development",
    ],
  },
  {
    id: "career",
    title: "Career Growth",
    description: "Identify barriers to professional advancement and visibility",
    iconComponent: CareerIcon,
    iconBgColor: "bg-accent/10",
    iconTextColor: "text-accent",
    features: [
      "Risk avoidance patterns",
      "Self-advocacy blocks",
      "Leadership readiness",
    ],
  },
  {
    id: "team-communication",
    title: "Team Communication",
    description: "Analyze communication flows and collaboration effectiveness",
    iconComponent: TeamIcon,
    iconBgColor: "bg-secondary/50",
    iconTextColor: "text-muted-foreground",
    features: ["Communication blocks", "Conflict resolution", "Team alignment"],
  },
  {
    id: "individual",
    title: "Individual Performance",
    description:
      "Discover patterns affecting personal productivity and goal achievement",
    iconComponent: IndividualIcon,
    iconBgColor: "bg-primary/10",
    iconTextColor: "text-primary",
    features: [
      "Procrastination patterns",
      "Perfectionism analysis",
      "Self-sabotage identification",
    ],
  },
  {
    id: "sales",
    title: "Sales Performance",
    description:
      "Uncover patterns impacting sales effectiveness and deal-closing",
    iconComponent: SalesIcon,
    iconBgColor: "bg-accent/10",
    iconTextColor: "text-accent",
    features: [
      "Over-promising tendencies",
      "Discounting habits",
      "Pipeline management",
    ],
  },
];

const assessmentStyles: {
  [key: string]: { cardBg: string; buttonBg: string; buttonHover: string };
} = {
  leadership: {
    cardBg: "#EDE7F6",
    buttonBg: "#7E57C2",
    buttonHover: "#6A4DA8",
  },
  "middle-management": {
    cardBg: "#B3D9FF",
    buttonBg: "#5BB8F5",
    buttonHover: "#4A9FE8",
  },
  career: {
    cardBg: "#B3F0E6",
    buttonBg: "#4DD0C7",
    buttonHover: "#40BDB3",
  },
  team: {
    cardBg: "#F5DEB3",
    buttonBg: "#D2B48C",
    buttonHover: "#BFA176",
  },
  individual: {
    cardBg: "#F7F7F0",
    buttonBg: "#2E8B57",
    buttonHover: "#276C45",
  },
  sales: {
    cardBg: "#E6F3FA",
    buttonBg: "#0288D1",
    buttonHover: "#01579B",
  },
};

export function AssessmentCategories({
  isAuthenticated = false,
}: AssessmentCategoriesProps) {
  const [, setLocation] = useLocation();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "corporate-profile") return;
    const freeAssessments = [
      "individual",
      "career",
      "management",
      "leadership",
      "team-communication",
      "sales",
    ];
    if (freeAssessments.includes(categoryId)) {
      setLocation(`/free-assessment/${categoryId}`);
    } else {
      setLocation(`/assessment/${categoryId}`);
    }
  };

  const getStyleKey = (categoryId: string) => {
    if (categoryId === "management") return "middle-management";
    if (categoryId === "team-communication") return "team";
    return categoryId;
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
      {categories.map((category) => {
        const styleKey = getStyleKey(category.id);
        const styles = assessmentStyles[styleKey] || {
          cardBg: "#FFFFFF",
          buttonBg: "#4B5563",
          buttonHover: "#374151",
        };

        const Icon = category.iconComponent;

        return (
          <div
            key={category.id}
            className={`rounded-xl border shadow-sm p-6 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border-border hover:border-primary/30`}
            style={{ backgroundColor: styles.cardBg }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="flex items-start space-x-4 mb-5">
              <div className="flex items-center justify-center flex-shrink-0">
                <Icon />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#0a0a0a]">
                  {category.description}
                </p>
              </div>
            </div>

            <button
              className="w-full text-white py-3.5 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-sm border-2"
              style={{
                backgroundColor: styles.buttonBg,
                borderColor: styles.buttonBg,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = styles.buttonHover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = styles.buttonBg)
              }
            >
              Start Free Assessment
            </button>
          </div>
        );
      })}
    </div>
  );
}
