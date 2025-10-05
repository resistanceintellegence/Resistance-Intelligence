import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Activity,
  Brain,
  Target,
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Star,
  MessageSquare,
  RotateCcw,
  Heart,
  Zap,
  Search,
  Settings,
  BookOpen,
  Eye,
  User,
  Lightbulb,
  Users,
  Building,
  Gift,
  TrendingDown,
  Mail,
  Sparkles,
} from "lucide-react";
import { getAssessmentData, type AssessmentArchetype } from "../data/registry";
import {
  getResistanceLevelDetails,
  type AssessmentResult,
} from "./scoring-engine";

// Local helper function to determine resistance level
function getResistanceLevel(percentage: number): string {
  if (percentage <= 34) return "low";
  if (percentage <= 50) return "moderate";
  return "high";
}

interface ResultsTemplateProps {
  categoryId: string;
}

export default function ResultsTemplate({ categoryId }: ResultsTemplateProps) {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form schema for the micro-learning dialog
  const microLearningSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    primaryArchetype: z
      .string()
      .min(1, "Please select an archetype to improve"),
  });

  type MicroLearningFormData = z.infer<typeof microLearningSchema>;

  const form = useForm<MicroLearningFormData>({
    resolver: zodResolver(microLearningSchema),
    defaultValues: {
      fullName: "",
      email: "",
      primaryArchetype: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: MicroLearningFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Micro-learning signup data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Assessment category color mapping (matches dashboard.tsx)
  const assessmentStyles = {
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
      cardBg: "#E6F3FA", // Light cyan, cool and clean
      buttonBg: "#0288D1", // Bright blue
      buttonHover: "#01579B", // Deep blue
    },
  };

  // Content color mappings based on category
  const contentColors = {
    leadership: {
      light: "bg-purple-50",
      medium: "bg-purple-100",
      dark: "bg-purple-200",
      borderLight: "border-purple-200",
      borderMedium: "border-purple-300",
      gradientLight: "bg-gradient-to-r from-purple-50 to-purple-100",
      gradientMedium: "bg-gradient-to-r from-purple-100 to-purple-200",
    },
    "middle-management": {
      light: "bg-blue-50",
      medium: "bg-blue-100",
      dark: "bg-blue-200",
      borderLight: "border-blue-200",
      borderMedium: "border-blue-300",
      gradientLight: "bg-gradient-to-r from-blue-50 to-blue-100",
      gradientMedium: "bg-gradient-to-r from-blue-100 to-blue-200",
    },
    career: {
      light: "bg-teal-50",
      medium: "bg-teal-100",
      dark: "bg-teal-200",
      borderLight: "border-teal-200",
      borderMedium: "border-teal-300",
      gradientLight: "bg-gradient-to-r from-teal-50 to-teal-100",
      gradientMedium: "bg-gradient-to-r from-teal-100 to-teal-200",
    },
    team: {
      light: "bg-amber-50",
      medium: "bg-amber-100",
      dark: "bg-amber-200",
      borderLight: "border-amber-200",
      borderMedium: "border-amber-300",
      gradientLight: "bg-gradient-to-r from-amber-50 to-amber-100",
      gradientMedium: "bg-gradient-to-r from-amber-100 to-amber-200",
    },
    individual: {
      light: "bg-emerald-50",
      medium: "bg-emerald-100",
      dark: "bg-emerald-200",
      borderLight: "border-emerald-200",
      borderMedium: "border-emerald-300",
      gradientLight: "bg-gradient-to-r from-emerald-50 to-emerald-100",
      gradientMedium: "bg-gradient-to-r from-emerald-100 to-emerald-200",
    },
    sales: {
      light: "bg-sky-50",
      medium: "bg-sky-100",
      dark: "bg-sky-200",
      borderLight: "border-sky-200",
      borderMedium: "border-sky-300",
      gradientLight: "bg-gradient-to-r from-sky-50 to-sky-100",
      gradientMedium: "bg-gradient-to-r from-sky-100 to-sky-200",
    },
  };

  // Icon color mappings based on category (light theme)
  const iconColors = {
    leadership: { box: "bg-purple-100", icon: "text-purple-600" },
    "middle-management": { box: "bg-blue-100", icon: "text-blue-600" },
    career: { box: "bg-teal-100", icon: "text-teal-600" },
    team: { box: "bg-amber-100", icon: "text-amber-600" },
    individual: { box: "bg-emerald-100", icon: "text-emerald-600" },
    sales: { box: "bg-orange-100", icon: "text-orange-600" },
  } as const;

  // Get category background color based on categoryId mapping
  const getCategoryBackgroundColor = (categoryId: string) => {
    const categoryMappings: Record<string, string> = {
      leadership: "leadership",
      "middle-management": "middle-management",
      team: "team",
      "team-communication": "team",
      career: "career",
      "career-growth": "career",
      sales: "sales",
      individual: "individual",
      "individual-performance": "individual",
    };

    const mappedCategory = categoryMappings[categoryId] || categoryId;
    return (
      assessmentStyles[mappedCategory as keyof typeof assessmentStyles]
        ?.cardBg || "#fafafa"
    );
  };

  // Load category data dynamically
  const [category, setCategory] = useState<any>(null);
  const [archetypes, setArchetypes] = useState<AssessmentArchetype[]>([]);

  // Fetch assessment data
  useEffect(() => {
    async function loadData() {
      const dataFile = await getAssessmentData(categoryId);
      if (dataFile) {
        const categoryData = dataFile.getAssessmentCategory(categoryId);
        const archetypeData = dataFile.getArchetypes(categoryId);
        setCategory(categoryData);
        setArchetypes(archetypeData);
      }
    }
    loadData();
  }, [categoryId]);

  // Templated API endpoint mapping (matches AssessmentTemplate.tsx routing)
  const getApiEndpoint = (categoryId: string) => {
    const routingMap: Record<string, string> = {
      leadership: "leadership",
      "middle-management": "middle-management",
      team: "team-communication",
      "team-communication": "team-communication",
      career: "career-growth",
      "career-growth": "career-growth",
      sales: "sales",
      individual: "individual",
      "individual-performance": "individual",
    };
    const backendCategory = routingMap[categoryId] || categoryId;
    return `/api/${backendCategory}-assessment/latest`;
  };

  // Fetch the latest assessment result for this category
  const apiEndpoint = getApiEndpoint(categoryId);
  const {
    data: result,
    isLoading,
    error,
  } = useQuery<AssessmentResult>({
    queryKey: [apiEndpoint],
    enabled: !!user && !!category,
  });

  // Get mapped category for colors
  const categoryMappings: Record<string, string> = {
    leadership: "leadership",
    "middle-management": "middle-management",
    team: "team",
    "team-communication": "team",
    career: "career",
    "career-growth": "career",
    sales: "sales",
    individual: "individual",
    "individual-performance": "individual",
  };
  const mappedCategory = categoryMappings[categoryId] || categoryId;
  const colors =
    contentColors[mappedCategory as keyof typeof contentColors] ||
    contentColors.leadership;
  const categoryIconColors =
    iconColors[mappedCategory as keyof typeof iconColors] ||
    iconColors.leadership;
  const iconBg = categoryIconColors.icon.replace("text-", "bg-");

  // Check if it's a special category for stress behaviors
  const isSpecialCategory = ["individual", "career", "team"].includes(
    mappedCategory,
  );

  // Check if it's a category for high resistance characteristics
  const isHighResistanceCategory = [
    "leadership",
    "middle-management",
    "sales",
  ].includes(mappedCategory);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assessment data...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">No Results Found</h2>
          <p className="text-muted-foreground mb-6">
            You haven't completed the {category.name} assessment yet.
          </p>
          <Button onClick={() => setLocation(`/assessment/${categoryId}`)}>
            Take Assessment
          </Button>
        </div>
      </div>
    );
  }

  // Get the top 3 archetypes for display
  const topThreeArchetypes = result.archetypeScores.slice(0, 3);
  const dominantArchetype = topThreeArchetypes[0];

  // Find the full archetype data for the dominant archetype
  const dominantArchetypeData = archetypes.find(
    (a) => a.id === dominantArchetype.archetypeId,
  );

  // Determine if we need fallback scenarios
  const hasHighResistance = result.hasHighResistanceArchetype;
  const allLowResistance = topThreeArchetypes.every(
    (a) => a.resistanceLevel === "low",
  );
  const allModerateResistance = topThreeArchetypes.every(
    (a) => a.resistanceLevel === "moderate",
  );
  const mixedLowModerate = topThreeArchetypes.every(
    (a) => a.resistanceLevel === "low" || a.resistanceLevel === "moderate",
  );

  // Get resistance level details - Calculate from percentage if resistanceLevel is unknown
  const actualResistanceLevel =
    dominantArchetype.resistanceLevel === "unknown" ||
    !dominantArchetype.resistanceLevel
      ? getResistanceLevel(dominantArchetype.percentageScore)
      : dominantArchetype.resistanceLevel;
  const resistanceDetails = getResistanceLevelDetails(actualResistanceLevel);

  // Icon mapping for archetypes
  const getArchetypeIcon = (archetypeId: string) => {
    const iconMap: Record<string, any> = {
      perfectionist: Target,
      control: Settings,
      people_pleaser: Heart,
      avoidance: RotateCcw,
      impostor: Eye,
      comfort_zone: Building,
      comparison: Users,
      overwhelm: Brain,
    };
    return iconMap[archetypeId] || Activity;
  };

  // Helper to get progress bar indicator color class based on level
  const getProgressColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-emerald-400";
      case "moderate":
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      default:
        return "bg-primary";
    }
  };

  // Render archetype detailed analysis (only for dominant archetype)
  const renderArchetypeAnalysis = () => {
    if (!dominantArchetypeData) {
      return renderFallbackScenario();
    }

    return (
      <div className="space-y-6">
        {/* Complete MD File Narrative Structure - All 10 Required Sections */}
        {/* 2. First, Know This(Pattern) */}
        {dominantArchetypeData.detailedDescription && (
          <Card className={`${colors.light} ${colors.borderLight}`}>
            <CardHeader>
              <CardTitle className="bg-white rounded-lg px-4 py-2 mx-auto flex items-center justify-center space-x-3">
                <div
                  className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                >
                  <Lightbulb className={`h-5 w-5 ${categoryIconColors.icon}`} />
                </div>
                <span>First, Know This (Pattern)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4">
                <div className="text-black text-base text-center space-y-4">
                  {dominantArchetypeData.detailedDescription
                    .split(". ")
                    .reduce((acc, sentence, index, array) => {
                      const thirdLength = Math.ceil(array.length / 3);
                      const paragraphIndex = Math.floor(index / thirdLength);

                      if (!acc[paragraphIndex]) {
                        acc[paragraphIndex] = [];
                      }

                      acc[paragraphIndex].push(
                        sentence + (index < array.length - 1 ? "." : ""),
                      );
                      return acc;
                    }, [] as string[][])
                    .map((paragraph, index) => (
                      <p key={index} className="text-[17px] font-normal">
                        {paragraph.join(" ").trim()}
                      </p>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Your Resistance in This Resistance Pattern - For special categories */}
        {isSpecialCategory &&
          dominantArchetypeData.highResistanceDescription && (
            <Card className={`${colors.light} ${colors.borderLight}`}>
              <CardHeader>
                <CardTitle className="bg-white rounded-lg px-4 py-2 mx-auto flex items-center justify-center space-x-3">
                  <div
                    className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                  >
                    <BarChart3
                      className={`h-5 w-5 ${categoryIconColors.icon}`}
                    />
                  </div>
                  <span>Your Resistance in This Pattern</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-black text-base text-center space-y-4">
                    {dominantArchetypeData.highResistanceDescription
                      .split(". ")
                      .reduce((acc, sentence, index, array) => {
                        const thirdLength = Math.ceil(array.length / 3);
                        const paragraphIndex = Math.floor(index / thirdLength);

                        if (!acc[paragraphIndex]) {
                          acc[paragraphIndex] = [];
                        }

                        acc[paragraphIndex].push(
                          sentence + (index < array.length - 1 ? "." : ""),
                        );
                        return acc;
                      }, [] as string[][])
                      .map((paragraph, index) => (
                        <p key={index} className="text-[17px] font-normal">
                          {paragraph.join(" ").trim()}
                        </p>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        {/* 3 & 4. Core Behaviors and Root Causes - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3. Core Behaviors */}
          {dominantArchetypeData.coreBehaviorsUnderResistance &&
            dominantArchetypeData.coreBehaviorsUnderResistance.length > 0 && (
              <Card
                className={`${
                  !(
                    dominantArchetypeData.rootCauses &&
                    dominantArchetypeData.rootCauses.length > 0
                  )
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                    >
                      <Activity
                        className={`h-5 w-5 ${categoryIconColors.icon}`}
                      />
                    </div>
                    <span>Core Pattern Behaviours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`${colors.medium} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700`}
                  >
                    <ul className="space-y-3">
                      {dominantArchetypeData.coreBehaviorsUnderResistance.map(
                        (behavior, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base leading-loose">
                              {behavior}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

          {/* 4. Root Causes */}
          {dominantArchetypeData.rootCauses &&
            dominantArchetypeData.rootCauses.length > 0 && (
              <Card
                className={`${
                  !(
                    dominantArchetypeData.coreBehaviorsUnderResistance &&
                    dominantArchetypeData.coreBehaviorsUnderResistance.length >
                      0
                  )
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                    >
                      <Search
                        className={`h-5 w-5 ${categoryIconColors.icon}`}
                      />
                    </div>
                    <span>Root Causes (Origins) </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`${colors.medium} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700`}
                  >
                    <ul className="space-y-3">
                      {dominantArchetypeData.rootCauses.map((cause, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-base leading-loose">
                            {cause}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
        {/* 5. Beliefs (Internal Rules) */}
        {dominantArchetypeData.beliefsThatDriveResistance &&
          dominantArchetypeData.beliefsThatDriveResistance.length > 0 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-3">
                  <div
                    className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                  >
                    <Brain className={`h-5 w-5 ${categoryIconColors.icon}`} />
                  </div>
                  <span>Beliefs That Drive Resistance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                >
                  <ul className="space-y-3 flex flex-col items-center">
                    {dominantArchetypeData.beliefsThatDriveResistance.map(
                      (belief, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 ${iconBg} rounded-full mt-2 flex-shrink-0`}
                          ></div>
                          <span className="text-base leading-loose italic text-black">
                            "{belief}"
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        {/* What High Resistance Looks Like - For specific categories */}
        {isHighResistanceCategory &&
          dominantArchetypeData.highResistanceCharacteristics &&
          dominantArchetypeData.highResistanceCharacteristics.length > 0 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-3">
                  <div
                    className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${categoryIconColors.icon}`}
                    />
                  </div>
                  <span>What High Resistance Looks Like</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                >
                  <ul className="space-y-3 flex flex-col items-center">
                    {dominantArchetypeData.highResistanceCharacteristics.map(
                      (characteristic, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 ${iconBg} rounded-full mt-2 flex-shrink-0`}
                          ></div>
                          <span className="text-base leading-loose text-black">
                            {characteristic}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        {/* 6. Stress Behaviors (for special categories) or What others experience */}
        {isSpecialCategory &&
        dominantArchetypeData.stressBehaviors &&
        dominantArchetypeData.stressBehaviors.length > 0 ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex flex-col items-center justify-center space-y-3">
                <div
                  className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 ${categoryIconColors.icon}`}
                  />
                </div>
                <span>Stress Behaviors</span>
              </CardTitle>
              <CardDescription>When pressure rises, you often:</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div
                className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 w-full max-w-6xl text-center`}
              >
                <ul className="space-y-3">
                  {dominantArchetypeData.stressBehaviors.map(
                    (behavior, index) => (
                      <li
                        key={index}
                        className="flex items-start justify-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-base leading-loose text-black text-left">
                          {behavior}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          !isSpecialCategory &&
          dominantArchetypeData.whatOthersExperience && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-3">
                  <div
                    className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${categoryIconColors.icon}`}
                    />
                  </div>
                  <span>What Other's Experience</span>
                </CardTitle>
                <CardDescription>
                  How others experience you when resistance is high
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Leadership assessment fields */}
                {dominantArchetypeData.whatOthersExperience.directReports && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <Users
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Direct Reports Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {dominantArchetypeData.whatOthersExperience.directReports}
                    </p>
                  </div>
                )}
                {dominantArchetypeData.whatOthersExperience.peers && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <User
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Peers Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {dominantArchetypeData.whatOthersExperience.peers}
                    </p>
                  </div>
                )}
                {dominantArchetypeData.whatOthersExperience.seniorLeaders && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <TrendingUp
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Senior Leaders Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {dominantArchetypeData.whatOthersExperience.seniorLeaders}
                    </p>
                  </div>
                )}
                {dominantArchetypeData.whatOthersExperience.executivePeers && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <User
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Executive Peers Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {
                        dominantArchetypeData.whatOthersExperience
                          .executivePeers
                      }
                    </p>
                  </div>
                )}
                {dominantArchetypeData.whatOthersExperience.boardInvestors && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <Building
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Board/Investors Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {
                        dominantArchetypeData.whatOthersExperience
                          .boardInvestors
                      }
                    </p>
                  </div>
                )}
                {/* Sales assessment fields */}
                {dominantArchetypeData.whatOthersExperience.customers && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <Users
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Customers Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {dominantArchetypeData.whatOthersExperience.customers}
                    </p>
                  </div>
                )}
                {dominantArchetypeData.whatOthersExperience.managers && (
                  <div
                    className={`${colors.dark} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700 text-center`}
                  >
                    <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <Building
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Managers Experience:</span>
                    </h4>
                    <p className="text-base leading-loose text-black">
                      {dominantArchetypeData.whatOthersExperience.managers}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        )}
        {/* Sales Triggers Section */}
        {categoryId === "sales" &&
          dominantArchetypeData.organizationalTriggers && (
            <Card className={`${colors.light} ${colors.borderLight}`}>
              <CardHeader className="bg-white">
                <CardTitle className="bg-white rounded-lg px-4 py-2 mx-auto flex items-center justify-center space-x-3">
                  <div
                    className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                  >
                    <Zap className={`h-5 w-5 ${categoryIconColors.icon}`} />
                  </div>
                  <span>Sales Triggers</span>
                </CardTitle>
                <CardDescription className="text-center bg-white">
                  Your resistance can be amplified or softened by specific sales
                  situations
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white space-y-4 text-center">
                {dominantArchetypeData.organizationalTriggers.amplifiers &&
                  dominantArchetypeData.organizationalTriggers.amplifiers
                    .length > 0 && (
                    <div
                      className={`border-2 ${colors.borderLight} rounded-lg p-4`}
                    >
                      <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                        <div
                          className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                        >
                          <TrendingUp className="h-3 w-3 text-red-500" />
                        </div>
                        <span>Resistance Amplifiers:</span>
                      </h4>
                      <ul className="space-y-2 flex flex-col items-center">
                        {dominantArchetypeData.organizationalTriggers.amplifiers.map(
                          (amplifier, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-base leading-loose">
                                {amplifier}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                {dominantArchetypeData.organizationalTriggers.softeners &&
                  dominantArchetypeData.organizationalTriggers.softeners
                    .length > 0 && (
                    <div
                      className={`border-2 ${colors.borderLight} rounded-lg p-4`}
                    >
                      <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                        <div
                          className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                        >
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Resistance Softeners:</span>
                      </h4>
                      <ul className="space-y-2 flex flex-col items-center">
                        {dominantArchetypeData.organizationalTriggers.softeners.map(
                          (softener, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-base leading-loose">
                                {softener}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}
        {/* 7. Situational Adaptations / Organizational Triggers */}
        {/* 7. Situational Adaptations / Organizational Triggers */}
        {categoryId !== "sales" && (
          <>
            {(categoryId === "leadership" ||
              categoryId === "middle-management") &&
              dominantArchetypeData.organizationalTriggers && (
                <Card className={`${colors.light} ${colors.borderLight}`}>
                  <CardHeader className="bg-white">
                    <CardTitle className="bg-white rounded-lg px-4 py-2 mx-auto flex items-center justify-center space-x-3">
                      <div
                        className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                      >
                        <Settings
                          className={`h-5 w-5 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Organizational Triggers</span>
                    </CardTitle>
                    <CardDescription className="text-center bg-white">
                      Organizational contexts that affect your resistance
                      patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white space-y-4 text-center">
                    {dominantArchetypeData.organizationalTriggers.amplifiers &&
                      dominantArchetypeData.organizationalTriggers.amplifiers
                        .length > 0 && (
                        <div
                          className={`border-2 ${colors.borderLight} rounded-lg p-4`}
                        >
                          <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                            <div
                              className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                            >
                              <TrendingUp className="h-3 w-3 text-red-500" />
                            </div>
                            <span>Resistance Amplifiers:</span>
                          </h4>
                          <ul className="space-y-2 flex flex-col items-center">
                            {dominantArchetypeData.organizationalTriggers.amplifiers.map(
                              (amplifier, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-base leading-loose">
                                    {amplifier}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    {dominantArchetypeData.organizationalTriggers.softeners &&
                      dominantArchetypeData.organizationalTriggers.softeners
                        .length > 0 && (
                        <div
                          className={`border-2 ${colors.borderLight} rounded-lg p-4`}
                        >
                          <h4 className="font-semibold mb-2 flex items-center justify-center space-x-2">
                            <div
                              className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                            >
                              <TrendingDown className="h-3 w-3 text-green-500" />
                            </div>
                            <span>Resistance Softeners:</span>
                          </h4>
                          <ul className="space-y-2 flex flex-col items-center">
                            {dominantArchetypeData.organizationalTriggers.softeners.map(
                              (softener, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-base leading-loose">
                                    {softener}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </CardContent>
                </Card>
              )}
            {(categoryId === "team" ||
              categoryId === "team-communication" ||
              categoryId === "career" ||
              categoryId === "career-growth" ||
              categoryId === "individual" ||
              categoryId === "individual-performance") &&
              dominantArchetypeData.situationalAdaptations && (
                <Card className={`${colors.light} ${colors.borderLight}`}>
                  <CardHeader className="bg-white">
                    <CardTitle className="bg-white rounded-lg px-4 py-2 mx-auto flex items-center justify-center space-x-3">
                      <div
                        className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                      >
                        <Settings
                          className={`h-5 w-5 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Situational Adaptations</span>
                    </CardTitle>
                    <CardDescription className="text-center bg-white">
                      Organizational contexts that affect your resistance
                      patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white space-y-4 text-center">
                    {dominantArchetypeData.situationalAdaptations &&
                      dominantArchetypeData.situationalAdaptations.length >
                        0 && (
                        <div
                          className={`border-2 ${colors.borderLight} rounded-lg p-4`}
                        >
                          <ul className="space-y-2 flex flex-col items-center">
                            {dominantArchetypeData.situationalAdaptations.map(
                              (adaptation, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-base leading-loose">
                                    {adaptation}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </CardContent>
                </Card>
              )}
          </>
        )}
        {/* 8 & 9. Hidden Strengths and Resistance Costs - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 8. Hidden Strengths */}
          {dominantArchetypeData.strengthsHiddenInside &&
            dominantArchetypeData.strengthsHiddenInside.length > 0 && (
              <Card
                className={`${
                  !(
                    dominantArchetypeData.detailedResistanceCosts &&
                    dominantArchetypeData.detailedResistanceCosts.length > 0
                  )
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                    >
                      <Gift className={`h-5 w-5 ${categoryIconColors.icon}`} />
                    </div>
                    <span>Strengths Hidden Inside the Pattern</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`${colors.medium} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700`}
                  >
                    <ul className="space-y-3">
                      {dominantArchetypeData.strengthsHiddenInside.map(
                        (strength, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base leading-loose">
                              {strength}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

          {/* 9. Resistance Costs */}
          {dominantArchetypeData.detailedResistanceCosts &&
            dominantArchetypeData.detailedResistanceCosts.length > 0 && (
              <Card
                className={`${
                  !(
                    dominantArchetypeData.strengthsHiddenInside &&
                    dominantArchetypeData.strengthsHiddenInside.length > 0
                  )
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                    >
                      <TrendingDown
                        className={`h-5 w-5 ${categoryIconColors.icon}`}
                      />
                    </div>
                    <span>Resistance Costs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`${colors.medium} ${colors.borderMedium} rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700`}
                  >
                    <ul className="space-y-3">
                      {dominantArchetypeData.detailedResistanceCosts.map(
                        (cost, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base leading-loose">
                              {cost}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
        {/* 10. Growth Path */}
        {dominantArchetypeData.growthPath && (
          <Card className={`${colors.light} ${colors.borderLight}`}>
            <CardHeader className={`${colors.light}`}>
              <CardTitle className="flex items-center justify-center space-x-3">
                <div
                  className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                >
                  <TrendingUp
                    className={`h-5 w-5 ${categoryIconColors.icon}`}
                  />
                </div>
                <span>Growth Path</span>
              </CardTitle>
            </CardHeader>
            <CardContent className={`${colors.light} space-y-6 text-center`}>
              {dominantArchetypeData.growthPath.immediateShifts &&
                dominantArchetypeData.growthPath.immediateShifts.length > 0 && (
                  <div className="bg-white border ${colors.borderLight} rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center justify-center space-x-2 bg-white rounded px-2 py-1">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <Zap className="h-3 w-3 text-yellow-500" />
                      </div>
                      <span>Immediate Shifts</span>
                    </h4>
                    <ul className="space-y-2 flex flex-col items-center">
                      {dominantArchetypeData.growthPath.immediateShifts.map(
                        (shift, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base leading-loose">
                              {shift}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {dominantArchetypeData.growthPath.strategicPractices &&
                dominantArchetypeData.growthPath.strategicPractices.length >
                  0 && (
                  <div className="bg-white border ${colors.borderLight} rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center justify-center space-x-2 bg-white rounded px-2 py-1">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <Target
                          className={`h-3 w-3 ${categoryIconColors.icon}`}
                        />
                      </div>
                      <span>Strategic Practices</span>{" "}
                    </h4>
                    <ul className="space-y-2 flex flex-col items-center">
                      {dominantArchetypeData.growthPath.strategicPractices.map(
                        (practice, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div
                              className={`w-2 h-2 ${iconBg} rounded-full mt-2 flex-shrink-0`}
                            ></div>
                            <span className="text-base leading-loose">
                              {practice}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {dominantArchetypeData.growthPath.longTermGrowth &&
                dominantArchetypeData.growthPath.longTermGrowth.length > 0 && (
                  <div className="bg-white border ${colors.borderLight} rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center justify-center space-x-2 bg-white rounded px-2 py-1">
                      <div
                        className={`w-6 h-6 ${categoryIconColors.box} rounded flex items-center justify-center mr-1`}
                      >
                        <BookOpen className="h-3 w-3 text-green-500" />
                      </div>
                      <span>Long-Term Growth</span>
                    </h4>
                    <ul className="space-y-2 flex flex-col items-center">
                      {dominantArchetypeData.growthPath.longTermGrowth.map(
                        (growth, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base leading-loose">
                              {growth}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Fallback scenarios when no high resistance archetype exists
  const renderFallbackScenario = () => {
    let title = "";
    let description = "";
    let recommendations: string[] = [];

    if (allLowResistance) {
      title = "All Low Resistance Profile";
      description =
        "Your assessment shows consistently low resistance across all patterns. This suggests you have developed effective strategies for moving forward with less internal friction.";
      recommendations = [
        "Focus on leveraging your natural flow states",
        "Consider mentoring others who struggle with resistance patterns",
        "Explore new challenges that can utilize your momentum",
        "Maintain awareness to prevent future resistance patterns from developing",
      ];
    } else if (allModerateResistance) {
      title = "Balanced Resistance Profile";
      description =
        "You show moderate resistance across multiple patterns. This indicates you have some internal friction but also areas where you can move forward effectively.";
      recommendations = [
        "Identify your specific trigger situations",
        "Develop targeted strategies for your moderate resistance areas",
        "Build on areas where you feel less resistance",
        "Consider working with a coach to optimize your approach",
      ];
    } else if (mixedLowModerate) {
      title = "Mixed Low-Moderate Profile";
      description =
        "Your resistance patterns vary between low and moderate levels. This suggests you have good awareness and some effective strategies, with room for targeted improvement.";
      recommendations = [
        "Focus development efforts on your moderate resistance areas",
        "Replicate successful strategies from low-resistance areas",
        "Monitor for situations that trigger higher resistance",
        "Maintain consistent practices to prevent resistance escalation",
      ];
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
            >
              <BarChart3 className={`h-5 w-5 ${categoryIconColors.icon}`} />
            </div>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-loose text-black">{description}</p>

          <div>
            <h4 className="font-semibold mb-2">Recommended Focus Areas:</h4>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-base leading-loose">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: getCategoryBackgroundColor(categoryId) }}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/dashboard")}
            className="flex items-center space-x-2"
            data-testid="button-back-dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {category.name} Results
            </h1>
          </div>
          <div></div>
        </div>
        {/* Overall Resistance Summary - Centered Content */}
        <Card className="rounded-lg border text-card-foreground shadow-sm mb-8 bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-xl ${categoryIconColors.box} flex items-center justify-center mb-4 border ${colors.borderLight}`}
              >
                <Activity className={`h-5 w-5 ${categoryIconColors.icon}`} />
              </div>
              <h3 className="font-bold text-lg">Overall Resistance</h3>
            </div>
            <div
              className={`w-20 h-20 rounded-full ${
                result.resistanceLevel === "low"
                  ? "bg-emerald-100"
                  : result.resistanceLevel === "moderate"
                    ? "bg-yellow-100"
                    : "bg-orange-100"
              } flex items-center justify-center shadow-md`}
            >
              <span
                className={`text-2xl font-bold ${
                  result.resistanceLevel === "low"
                    ? "text-emerald-700"
                    : result.resistanceLevel === "moderate"
                      ? "text-yellow-700"
                      : "text-orange-700"
                }`}
              >
                {result.resistancePercentage}%
              </span>
            </div>
            <Badge
              variant={
                getResistanceLevelDetails(result.resistanceLevel).color ===
                "red"
                  ? "destructive"
                  : getResistanceLevelDetails(result.resistanceLevel).color ===
                      "yellow"
                    ? "secondary"
                    : "default"
              }
              className="text-xs px-3 py-1"
            >
              {getResistanceLevelDetails(result.resistanceLevel).label}
            </Badge>
            <p className="text-base text-gray-700 leading-relaxed max-w-4xl mx-auto">
              The greatest barrier to any company goal isn't a lack of
              effort—it's unspoken resistance. This emotional friction is born
              from a natural impulse to reduce risk, yet it quietly creates
              rigidity and avoidance in processes and projects. This
              self-defeating pattern drains the impact of high-performing
              individuals and makes cross-team decision-making unnecessarily
              hard. Over time, this systemic resistance stalls essential
              transformation and erodes the collective trust needed for
              sustained success.
            </p>
          </CardContent>
        </Card>
        {/* Top 3 Archetypes Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
              >
                <BarChart3 className={`h-5 w-5 ${categoryIconColors.icon}`} />
              </div>
              <span>Your Top 3 Resistance Patterns</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topThreeArchetypes.map((archetype, index) => {
                const Icon = getArchetypeIcon(archetype.archetypeId);
                const actualLevel =
                  archetype.resistanceLevel === "unknown" ||
                  !archetype.resistanceLevel
                    ? getResistanceLevel(archetype.percentageScore)
                    : archetype.resistanceLevel;
                const details = getResistanceLevelDetails(actualLevel);
                const badgeBg =
                  actualLevel === "low"
                    ? "bg-emerald-100"
                    : actualLevel === "moderate"
                      ? "bg-yellow-100"
                      : "bg-orange-100";
                const badgeText =
                  actualLevel === "low"
                    ? "text-emerald-700"
                    : actualLevel === "moderate"
                      ? "text-yellow-700"
                      : "text-orange-700";

                return (
                  <div
                    key={archetype.archetypeId}
                    className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${colors.light} flex items-center justify-center mb-4 border ${colors.borderLight}`}
                    >
                      <Icon className={`h-6 w-6 ${categoryIconColors.icon}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      {archetype.archetypeName}
                    </h3>
                    <span className="text-sm text-gray-500 mb-3">
                      #{archetype.rank}
                    </span>
                    <div
                      className={`w-20 h-20 rounded-full ${badgeBg} flex items-center justify-center shadow-md mb-2`}
                    >
                      <span className={`text-2xl font-bold ${badgeText}`}>
                        {archetype.percentageScore}%
                      </span>
                    </div>
                    <Badge
                      variant={
                        details.color === "red"
                          ? "destructive"
                          : details.color === "yellow"
                            ? "secondary"
                            : "default"
                      }
                      className="text-xs px-3 py-1"
                    >
                      {details.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        {/* Detailed Analysis - Only for Dominant Archetype or Fallback */}
        {renderArchetypeAnalysis()}
        {/* CTA Sections - Stacked Vertically */}
        <div className="space-y-6 mt-8">
          {/* Help us improve your experience */}
          <Card className={`${colors.light} ${colors.borderLight}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div
                  className={`w-10 h-10 ${categoryIconColors.box} rounded-lg flex items-center justify-center`}
                >
                  <MessageSquare
                    className={`h-5 w-5 ${categoryIconColors.icon}`}
                  />
                </div>
                <span>Help us improve your experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  {/* Rating Section */}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      How accurately do these results reflect your actual
                      patterns and challenges?
                    </Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-lg transition-colors ${
                            rating >= star
                              ? "text-blue-500"
                              : "text-gray-300 hover:text-blue-400"
                          }`}
                          data-testid={`star-${star}`}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <Label
                      htmlFor="feedback"
                      className="text-sm font-medium text-gray-700"
                    >
                      What was the most valuable insight from your results?
                      (Optional)
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="Share what resonated most with you..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2 text-sm bg-[#fafafa]"
                      rows={3}
                      data-testid="textarea-feedback"
                    />
                  </div>

                  {/* Submit Button (Using Original Logic) */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!feedback.trim()}
                    data-testid="button-submit-feedback"
                    className="text-white"
                    style={{
                      backgroundColor:
                        assessmentStyles[
                          mappedCategory as keyof typeof assessmentStyles
                        ]?.buttonBg || "#7C3AED",
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Step: Turn Insight Into Lasting Growth CTA */}
          <Card
            className={`bg-white border ${colors.borderLight} w-full max-w-6xl mx-auto`}
          >
            <CardHeader className="text-center">
              <CardTitle className="font-bold">
                Next Step: Turn Insight Into Lasting Growth
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-2 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                You now have a complete profile of your resistance patterns and
                how they shape your performance. Awareness is powerful — but
                real change comes from consistent practice in real-world
                situations.
              </p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground flex items-start justify-center space-x-2">
                  <span className="mt-0.5">📌</span>
                  <span>
                    Short, actionable lessons designed to fit into your week.
                  </span>
                </p>
                <p className="text-sm font-medium text-muted-foreground flex items-start justify-center space-x-2">
                  <span className="mt-0.5">🔄</span>
                  <span>
                    Monthly prompts and challenges tied to your resistance
                    pattern results.
                  </span>
                </p>
                <p className="text-sm font-medium text-muted-foreground flex items-start justify-center space-x-2">
                  <span className="mt-0.5">💡</span>
                  <span>
                    Practical tools to reframe resistance and strengthen new
                    habits.
                  </span>
                </p>
                <p className="text-sm font-medium text-muted-foreground flex items-start justify-center space-x-2">
                  <span className="mt-0.5">📈</span>
                  <span>
                    Guided growth path that turns awareness into measurable
                    progress.
                  </span>
                </p>
              </div>

              <p className="text-sm font-semibold text-foreground italic">
                👉 Your Next Step: Enroll in the micro learning journey and
                start applying your insights immediately.
              </p>

              <Button
                className="w-full text-white"
                style={{
                  backgroundColor: "#7C3AED", // consistent button color
                }}
                onClick={() => setIsDialogOpen(true)}
                size="lg"
              >
                Start My Micro Learning Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Micro-Learning Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={`sm:max-w-[500px] bg-gradient-to-br ${colors.light} ${colors.borderLight}`}
        >
          <DialogHeader className="text-center space-y-3">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Coming Soon, Join the Waitlist
            </DialogTitle>
            <DialogDescription className="sr-only">
              Join the waitlist for our micro-learning program by providing your
              information and selecting your focus archetype.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-6"
          >
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-muted-foreground"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                {...form.register("fullName")}
                placeholder="Your full name"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-purple-200 focus:border-blue-400 focus:ring-blue-400 bg-[#fafafa]"
                data-testid="input-full-name"
              />
              {form.formState.errors.fullName && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-muted-foreground"
              >
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="your.email@example.com"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-purple-200 focus:border-blue-400 focus:ring-blue-400 pl-10 bg-[#fafafa]"
                  data-testid="input-email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="primaryArchetype"
                className="text-sm font-medium text-muted-foreground"
              >
                Primary Archetype You Want to Improve
              </Label>
              <Select
                value={form.watch("primaryArchetype")}
                onValueChange={(value) =>
                  form.setValue("primaryArchetype", value)
                }
              >
                <SelectTrigger
                  className="flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-purple-200 focus:border-blue-400 focus:ring-blue-400 bg-[#fafafa]"
                  data-testid="select-archetype"
                >
                  <SelectValue placeholder="Select your focus area" />
                </SelectTrigger>
                <SelectContent>
                  {archetypes.map((archetype) => (
                    <SelectItem key={archetype.id} value={archetype.id}>
                      <div className="w-full">
                        <div className="font-medium">{archetype.name}</div>
                        <div className="text-xs text-gray-500 whitespace-normal">
                          {archetype.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.primaryArchetype && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.primaryArchetype.message}
                </p>
              )}
            </div>

            <div
              className={`bg-gradient-to-r ${colors.light} rounded-lg p-4 border ${colors.borderLight}`}
            >
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className={`${colors.light} text-gray-800 px-3 py-1 mb-2`}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Founding Member Exclusive
                </Badge>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  Claim 50% Off & Early Access
                </h3>
                <p className="text-sm text-gray-600">
                  Founding members receive 50% off launch pricing. By joining,
                  you agree to receive educational emails and updates.
                  Unsubscribe anytime.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-bold py-3 text-lg"
              style={{
                backgroundColor:
                  assessmentStyles[
                    mappedCategory as keyof typeof assessmentStyles
                  ]?.buttonBg || "#7C3AED",
              }}
              data-testid="button-join-waitlist"
            >
              {isSubmitting ? "Joining..." : "Claim 50% Off & Early Access"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
