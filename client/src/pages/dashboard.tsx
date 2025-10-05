import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  LogOut,
  User,
  Crown,
  Users,
  TrendingUp,
  MessageSquare,
  Target,
  BarChart3,
  BookOpen,
  Lock,
  CheckCircle,
  RotateCcw,
  Eye,
  Clock,
  DollarSign,
  Settings,
} from "lucide-react";
// Import assessment data directly
import { ASSESSMENT_CATEGORIES as LEADERSHIP_DATA } from "@/lib/paid-assessments/data/leadership-data";
import { ASSESSMENT_CATEGORIES as MIDDLE_MANAGEMENT_DATA } from "@/lib/paid-assessments/data/middle_management-data";
import { ASSESSMENT_CATEGORIES as TEAM_COMMUNICATION_DATA } from "@/lib/paid-assessments/data/team_communication-data";
import { ASSESSMENT_CATEGORIES as CAREER_GROWTH_DATA } from "@/lib/paid-assessments/data/career_growth-data";
import { ASSESSMENT_CATEGORIES as SALES_DATA } from "@/lib/paid-assessments/data/sales-data";
import { ASSESSMENT_CATEGORIES as INDIVIDUAL_DATA } from "@/lib/paid-assessments/data/individual-data";

export default function DashboardPage() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  const implementedAssessments = [
    "leadership",
    "middle-management",
    "team",
    "career",
    "sales",
    "individual",
  ];
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
      cardBg: "#E6F3FA",
      buttonBg: "#0288D1",
      buttonHover: "#01579B",
    },
  };

  const getIcon = (id: string) => {
    const color =
      assessmentStyles[id as keyof typeof assessmentStyles]?.buttonBg ||
      "#22c55e";
    const backgroundColor =
      assessmentStyles[id as keyof typeof assessmentStyles]?.cardBg ||
      "#f8f9fa";

    const IconWrapper = ({ children }: { children: React.ReactNode }) => (
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
        style={{ backgroundColor }}
      >
        {children}
      </div>
    );

    switch (id) {
      case "leadership":
        return (
          <IconWrapper>
            <Crown className="h-5 w-5 flex-shrink-0" style={{ color }} />
          </IconWrapper>
        );
      case "middle-management":
        return (
          <IconWrapper>
            <Users className="h-5 w-5 flex-shrink-0" style={{ color }} />
          </IconWrapper>
        );
      case "career":
        return (
          <IconWrapper>
            <TrendingUp className="h-5 w-5 flex-shrink-0" style={{ color }} />
          </IconWrapper>
        );
      case "team":
        return (
          <IconWrapper>
            <MessageSquare
              className="h-5 w-5 flex-shrink-0"
              style={{ color }}
            />
          </IconWrapper>
        );
      case "individual":
        return (
          <IconWrapper>
            <Target className="h-5 w-5 flex-shrink-0" style={{ color }} />
          </IconWrapper>
        );
      case "sales":
        return (
          <IconWrapper>
            <DollarSign className="h-5 w-5 flex-shrink-0" style={{ color }} />
          </IconWrapper>
        );
      default:
        return null;
    }
  };

  const { data: leadershipResult, isLoading: leadershipLoading } = useQuery({
    queryKey: ["/api/leadership-assessment/latest"],
    queryFn: async () => {
      const res = await fetch("/api/leadership-assessment/latest", {
        credentials: "include",
      });
      if (res.status === 404) return null;
      if (!res.ok)
        throw new Error(
          `${res.status}: ${(await res.text()) || res.statusText}`,
        );
      return await res.json();
    },
    enabled: !!user,
  });

  const { data: middleManagementResult, isLoading: middleManagementLoading } =
    useQuery({
      queryKey: ["/api/middle-management-assessment/latest"],
      queryFn: async () => {
        const res = await fetch("/api/middle-management-assessment/latest", {
          credentials: "include",
        });
        if (res.status === 404) return null;
        if (!res.ok)
          throw new Error(
            `${res.status}: ${(await res.text()) || res.statusText}`,
          );
        return await res.json();
      },
      enabled: !!user,
    });

  const { data: teamCommunicationResult, isLoading: teamCommunicationLoading } =
    useQuery({
      queryKey: ["/api/team-communication-assessment/latest"],
      queryFn: async () => {
        const res = await fetch("/api/team-communication-assessment/latest", {
          credentials: "include",
        });
        if (res.status === 404) return null;
        if (!res.ok)
          throw new Error(
            `${res.status}: ${(await res.text()) || res.statusText}`,
          );
        return await res.json();
      },
      enabled: !!user,
    });

  const { data: careerGrowthResult, isLoading: careerGrowthLoading } = useQuery(
    {
      queryKey: ["/api/career-growth-assessment/latest"],
      queryFn: async () => {
        const res = await fetch("/api/career-growth-assessment/latest", {
          credentials: "include",
        });
        if (res.status === 404) return null;
        if (!res.ok)
          throw new Error(
            `${res.status}: ${(await res.text()) || res.statusText}`,
          );
        return await res.json();
      },
      enabled: !!user,
    },
  );

  const { data: salesResult, isLoading: salesLoading } = useQuery({
    queryKey: ["/api/sales-assessment/latest"],
    queryFn: async () => {
      const res = await fetch("/api/sales-assessment/latest", {
        credentials: "include",
      });
      if (res.status === 404) return null;
      if (!res.ok)
        throw new Error(
          `${res.status}: ${(await res.text()) || res.statusText}`,
        );
      return await res.json();
    },
    enabled: !!user,
  });

  const { data: individualResult, isLoading: individualLoading } = useQuery({
    queryKey: ["/api/individual-assessment/latest"],
    queryFn: async () => {
      const res = await fetch("/api/individual-assessment/latest", {
        credentials: "include",
      });
      if (res.status === 404) return null;
      if (!res.ok)
        throw new Error(
          `${res.status}: ${(await res.text()) || res.statusText}`,
        );
      return await res.json();
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };

  const assessmentCategories = [
    {
      id: "leadership",
      title: "Leadership Performance",
      description:
        "Assess executive-level decision making and strategic vision",
      features: [
        "Strategic resistance",
        "Vision control",
        "Executive presence",
      ],
      status: "premium",
      url: "/assessment/leadership",
    },
    {
      id: "middle-management",
      title: "Middle Management Assessment",
      description: "Evaluate middle management effectiveness and delegation",
      features: [
        "Delegation challenges",
        "Micromanagement tendencies",
        "Team development",
      ],
      status: "premium",
      url: "/assessment/middle-management",
    },
    {
      id: "career",
      title: "Career Growth",
      description:
        "Identify barriers to professional advancement and visibility",
      features: [
        "Risk avoidance patterns",
        "Self-advocacy blocks",
        "Leadership readiness",
      ],
      status: "premium",
      url: "/assessment/career",
    },
    {
      id: "team",
      title: "Team Communication",
      description:
        "Analyze communication flows and collaboration effectiveness",
      features: [
        "Communication blocks",
        "Conflict resolution",
        "Team alignment",
      ],
      status: "premium",
      url: "/assessment/team",
    },
    {
      id: "individual",
      title: "Individual Performance",
      description:
        "Discover patterns affecting personal productivity and goal achievement",
      features: [
        "Procrastination patterns",
        "Perfectionism analysis",
        "Self-sabotage identification",
      ],
      status: "premium",
      url: "/assessment/individual",
    },
    {
      id: "sales",
      title: "Sales Performance",
      description:
        "Uncover patterns impacting sales effectiveness and deal-closing",
      features: [
        "Over-promising tendencies",
        "Discounting habits",
        "Pipeline management",
      ],
      status: "premium",
      url: "/assessment/sales",
    },
  ];

  const isAssessmentCompleted = (assessmentId: string) => {
    switch (assessmentId) {
      case "leadership":
        return !!leadershipResult && !leadershipLoading;
      case "middle-management":
        return !!middleManagementResult && !middleManagementLoading;
      case "team":
        return !!teamCommunicationResult && !teamCommunicationLoading;
      case "career":
        return !!careerGrowthResult && !careerGrowthLoading;
      case "sales":
        return !!salesResult && !salesLoading;
      case "individual":
        return !!individualResult && !individualLoading;
      default:
        return false;
    }
  };

  const getAssessmentResult = (assessmentId: string) => {
    switch (assessmentId) {
      case "leadership":
        return leadershipResult;
      case "middle-management":
        return middleManagementResult;
      case "team":
        return teamCommunicationResult;
      case "career":
        return careerGrowthResult;
      case "sales":
        return salesResult;
      case "individual":
        return individualResult;
      default:
        return null;
    }
  };

  const getAssessmentSummary = (assessmentId: string) => {
    const result = getAssessmentResult(assessmentId);
    if (!result) return null;

    // Get assessment data based on ID
    let assessmentData;
    switch (assessmentId) {
      case "leadership":
        assessmentData = LEADERSHIP_DATA["leadership"];
        break;
      case "middle-management":
        assessmentData = MIDDLE_MANAGEMENT_DATA["middle-management"];
        break;
      case "team":
        assessmentData =
          TEAM_COMMUNICATION_DATA["team"] ||
          TEAM_COMMUNICATION_DATA["team-communication"];
        break;
      case "career":
        assessmentData =
          CAREER_GROWTH_DATA["career"] || CAREER_GROWTH_DATA["career-growth"];
        break;
      case "sales":
        assessmentData = SALES_DATA["sales-assessment"];
        break;
      case "individual":
        assessmentData = INDIVIDUAL_DATA["individual"];
        break;
      default:
        return null;
    }

    if (!assessmentData) {
      console.error(`No assessment data found for ID: ${assessmentId}`);
      return null;
    }

    // Get archetype display names
    const getArchetypeName = (archetypeId: string) => {
      const archetype = assessmentData.archetypes.find(
        (a: any) => a.id === archetypeId,
      );
      return archetype ? archetype.name : archetypeId;
    };

    // Extract top 3 archetypes from stored scores
    const archetypeScores = result.archetypeScores || {};
    const topArchetypes = Object.entries(archetypeScores)
      .map(([id, score]: [string, any]) => ({
        id,
        name: getArchetypeName(id),
        percentage: typeof score === "object" ? score.percentage : score,
      }))
      .sort((a: any, b: any) => b.percentage - a.percentage)
      .slice(0, 3);

    return {
      resistancePercentage: result.resistancePercentage || 0,
      resistanceLevel: result.resistanceLevel || "low",
      dominantArchetype: getArchetypeName(result.dominantArchetype || ""),
      topArchetypes,
      completedAt: result.completedAt,
    };
  };

  const availableAssessments = assessmentCategories.filter(
    (assessment) => !isAssessmentCompleted(assessment.id),
  );
  const completedAssessments = assessmentCategories.filter((assessment) =>
    isAssessmentCompleted(assessment.id),
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.firstName || user?.email?.split("@")[0]}!
              </p>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => setLocation("/dashboard")}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                disabled
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground cursor-not-allowed opacity-60"
              >
                <div className="relative">
                  <BookOpen className="h-5 w-5" />
                  <Lock className="h-3 w-3 absolute -top-1 -right-1" />
                </div>
                <span className="font-medium">Courses</span>
              </button>
              <button
                disabled
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground cursor-not-allowed opacity-60"
              >
                <div className="relative">
                  <Users className="h-5 w-5" />
                  <Lock className="h-3 w-3 absolute -top-1 -right-1" />
                </div>
                <span className="font-medium">Community</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 p-0"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {user?.firstName?.[0]?.toUpperCase() ||
                        user?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName ||
                          user?.email?.split("@")[0] ||
                          "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {user?.email === "resistanceintellegence@gmail.com" && (
                    <>
                      <DropdownMenuItem onClick={() => setLocation("/resistance-map")}>
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Resistance Map</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("/admin")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Resistance Intelligence Assessments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and overcome resistance patterns that hold back your
              performance. Take comprehensive assessments to unlock your
              potential.
            </p>
          </div>

          {completedAssessments.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-2xl font-bold text-foreground">
                  Completed Assessments
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedAssessments.map((category) => (
                  <Card
                    key={category.id}
                    className="rounded-lg border shadow-sm hover:shadow-lg transition-shadow"
                    style={{
                      backgroundColor:
                        assessmentStyles[
                          category.id as keyof typeof assessmentStyles
                        ]?.cardBg || "#f8f9fa",
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="flex items-center text-lg text-[#000000]">
                            {getIcon(category.id)}
                            {category.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="w-fit font-bold"
                            style={{
                              borderColor:
                                assessmentStyles[
                                  category.id as keyof typeof assessmentStyles
                                ]?.buttonBg || "#22c55e",
                              color:
                                assessmentStyles[
                                  category.id as keyof typeof assessmentStyles
                                ]?.buttonBg || "#22c55e",
                            }}
                          >
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm text-[#000000]">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(() => {
                        const summary = getAssessmentSummary(category.id);
                        if (!summary) {
                          return (
                            <>
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  onClick={() =>
                                    setLocation(`/results/${category.id}`)
                                  }
                                  variant="outline"
                                  size="sm"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Results
                                </Button>
                                <Button
                                  onClick={() => setLocation(category.url)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <RotateCcw className="h-4 w-4 mr-1" />
                                  Retake
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground text-center">
                                Last completed • View detailed analysis
                              </p>
                            </>
                          );
                        }

                        return (
                          <>
                            {/* Overall Resistance */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-[#000000]">
                                Overall Resistance
                              </span>
                              <span className="text-lg font-bold text-[#0a0a0a]">
                                {summary.resistancePercentage}%
                              </span>
                            </div>

                            {/* Dominant Pattern */}
                            <div>
                              <p className="text-sm mb-1 text-[#0f0f0f]">
                                Dominant Pattern
                              </p>
                              <p className="font-semibold text-sm leading-tight">
                                {summary.dominantArchetype}
                              </p>
                            </div>

                            {/* Completion Date */}
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Completed</span>
                              <span>
                                {summary.completedAt
                                  ? new Date(
                                      summary.completedAt,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "Recently"}
                              </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              <Button
                                onClick={() => setLocation(category.url)}
                                variant="outline"
                                size="sm"
                                className="bg-[#fffcfc]"
                              >
                                <RotateCcw className="h-4 w-4 mr-1" />
                                Retake
                              </Button>
                              <Button
                                onClick={() =>
                                  setLocation(`/results/${category.id}`)
                                }
                                className="text-white"
                                style={{
                                  backgroundColor:
                                    assessmentStyles[
                                      category.id as keyof typeof assessmentStyles
                                    ]?.buttonBg || "#22c55e",
                                }}
                                onMouseEnter={(e) => {
                                  const target = e.target as HTMLElement;
                                  target.style.backgroundColor =
                                    assessmentStyles[
                                      category.id as keyof typeof assessmentStyles
                                    ]?.buttonHover || "#16a34a";
                                }}
                                onMouseLeave={(e) => {
                                  const target = e.target as HTMLElement;
                                  target.style.backgroundColor =
                                    assessmentStyles[
                                      category.id as keyof typeof assessmentStyles
                                    ]?.buttonBg || "#22c55e";
                                }}
                                size="sm"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {availableAssessments.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-500" />
                <h3 className="text-2xl font-bold text-foreground">
                  Available Assessments
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableAssessments.map((category) => (
                  <Card
                    key={category.id}
                    className="hover:shadow-lg"
                    style={{
                      backgroundColor:
                        assessmentStyles[
                          category.id as keyof typeof assessmentStyles
                        ]?.cardBg || "#f8f9fa",
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="flex items-center text-lg text-[#000000]">
                            {getIcon(category.id)}
                            {category.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-sm text-[#000000]">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {implementedAssessments.includes(category.id) ? (
                        <>
                          <div className="mb-5">
                            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-[#000000]">
                              Assessment Areas
                            </h4>
                            <div className="space-y-2.5">
                              {category.features?.map(
                                (feature: string, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-start space-x-2.5"
                                  >
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm leading-relaxed text-[#0a0a0d]">
                                      {feature}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <Button
                            onClick={() => setLocation(category.url)}
                            className="w-full text-white"
                            style={{
                              backgroundColor:
                                assessmentStyles[
                                  category.id as keyof typeof assessmentStyles
                                ]?.buttonBg || "#22c55e",
                            }}
                            onMouseEnter={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.backgroundColor =
                                assessmentStyles[
                                  category.id as keyof typeof assessmentStyles
                                ]?.buttonHover || "#16a34a";
                            }}
                            onMouseLeave={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.backgroundColor =
                                assessmentStyles[
                                  category.id as keyof typeof assessmentStyles
                                ]?.buttonBg || "#22c55e";
                            }}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Take Assessment
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => setLocation(category.url)}
                            disabled
                            variant="outline"
                            className="w-full"
                          >
                            Coming Soon
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            Premium assessments will be available soon
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {assessmentCategories.length}
                </CardTitle>
                <CardDescription>Premium Assessments</CardDescription>
              </CardHeader>
            </Card>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {completedAssessments.length}
                </CardTitle>
                <CardDescription>Assessments Completed</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
