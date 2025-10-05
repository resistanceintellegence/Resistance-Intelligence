import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  BarChart3,
  Users,
  Building2,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Search,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  Activity,
  CheckCircle2,
  XCircle,
  Calendar,
  Edit,
} from "lucide-react";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimePeriod = "24h" | "7d" | "30d";

export default function AdminPage() {
  const { toast } = useToast();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7d");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState("all");
  const [resistanceLevelFilter, setResistanceLevelFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  // User/Company drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");

  // Edit dialog states
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editCompanyDialogOpen, setEditCompanyDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);

  // Fetch KPIs
  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: ["/api/admin/kpis", timePeriod],
    queryFn: async () => {
      const res = await fetch(`/api/admin/kpis?period=${timePeriod}`);
      if (!res.ok) throw new Error("Failed to fetch KPIs");
      return res.json();
    },
  });

  // Fetch time series data
  const { data: timeSeries } = useQuery({
    queryKey: ["/api/admin/time-series", timePeriod],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/time-series?period=${timePeriod}&metric=all`,
      );
      if (!res.ok) throw new Error("Failed to fetch time series");
      return res.json();
    },
    enabled: selectedTab === "overview" || selectedTab === "analytics",
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users", searchTerm],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users?search=${searchTerm}&limit=50`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    enabled: selectedTab === "users",
  });

  // Global search query
  const { data: globalSearchResults, isLoading: globalSearchLoading } =
    useQuery({
      queryKey: ["/api/admin/global-search", globalSearch],
      queryFn: async () => {
        const res = await fetch(
          `/api/admin/users?search=${globalSearch}&limit=10`,
        );
        if (!res.ok) throw new Error("Failed to search");
        return res.json();
      },
      enabled: globalSearch.length > 2,
    });

  // Filter users client-side based on segment and plan
  const filteredUsers = users?.filter((user: any) => {
    if (segmentFilter !== "all" && user.segment !== segmentFilter) return false;
    if (planFilter !== "all" && user.plan !== planFilter) return false;
    return true;
  });

  // Fetch user details for drawer
  const { data: userDetails } = useQuery({
    queryKey: ["/api/admin/users", selectedUserId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${selectedUserId}`);
      if (!res.ok) throw new Error("Failed to fetch user details");
      return res.json();
    },
    enabled: !!selectedUserId && drawerOpen,
  });

  // Fetch companies
  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ["/api/admin/companies", searchTerm],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/companies?search=${searchTerm}&limit=50`,
      );
      if (!res.ok) throw new Error("Failed to fetch companies");
      return res.json();
    },
    enabled: selectedTab === "companies",
  });

  // Fetch assessments
  const { data: assessments, isLoading: assessmentsLoading } = useQuery({
    queryKey: [
      "/api/admin/assessments",
      assessmentTypeFilter,
      resistanceLevelFilter,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "100" });
      if (assessmentTypeFilter !== "all")
        params.append("type", assessmentTypeFilter);
      if (resistanceLevelFilter !== "all")
        params.append("resistanceLevel", resistanceLevelFilter);

      const res = await fetch(`/api/admin/assessments?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch assessments");
      return res.json();
    },
    enabled: selectedTab === "assessments",
  });

  // Fetch distribution data
  const { data: distribution } = useQuery({
    queryKey: ["/api/admin/distribution", timePeriod],
    queryFn: async () => {
      const res = await fetch(`/api/admin/distribution?period=${timePeriod}`);
      if (!res.ok) throw new Error("Failed to fetch distribution");
      return res.json();
    },
    enabled: selectedTab === "overview",
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("PUT", `/api/admin/users/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User updated successfully" });
      setEditUserDialogOpen(false);
      setEditingUser(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    },
  });

  // Update company mutation
  const updateCompanyMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("PUT", `/api/admin/companies/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/companies"] });
      toast({ title: "Company updated successfully" });
      setEditCompanyDialogOpen(false);
      setEditingCompany(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update company",
        variant: "destructive",
      });
    },
  });

  const handleEditUser = (user: any) => {
    setEditingUser({ ...user });
    setEditUserDialogOpen(true);
  };

  const handleEditCompany = (company: any) => {
    setEditingCompany({ ...company });
    setEditCompanyDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      updateUserMutation.mutate(editingUser);
    }
  };

  const handleSaveCompany = () => {
    if (editingCompany) {
      updateCompanyMutation.mutate(editingCompany);
    }
  };

  const KPICard = ({ title, value, icon: Icon, change, trend }: any) => (
    <Card
      data-testid={`card-kpi-${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="text-3xl font-bold"
          data-testid={`text-${title.toLowerCase().replace(/\s+/g, "-")}-value`}
        >
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            {trend === "up" && (
              <TrendingUp className="h-3 w-3 text-green-600" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span>
              {change > 0 ? "+" : ""}
              {change} in {timePeriod}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const InsightCard = ({
    title,
    description,
    value,
    icon: Icon,
    status,
  }: any) => (
    <Card
      className={`hover:shadow-lg transition-all duration-200 border-l-4 ${
        status === "warning"
          ? "border-l-yellow-500/50 hover:border-l-yellow-500"
          : status === "critical"
            ? "border-l-red-500/50 hover:border-l-red-500"
            : "border-l-primary/20 hover:border-l-primary"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            status === "warning"
              ? "bg-yellow-100"
              : status === "critical"
                ? "bg-red-100"
                : "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${status === "warning" ? "text-yellow-600" : status === "critical" ? "text-red-600" : "text-primary"}`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  const openUserDrawer = (userId: string) => {
    setSelectedUserId(userId);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-5 max-w-[1400px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-back-dashboard"
                  className="hover:bg-primary/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold from-primary to-primary/70 bg-clip-text text-transparent bg-[#81c5bc]">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  System analytics, user management & insights
                </p>
              </div>
            </div>

            {/* Global Search */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Global search (user, email, company, ID)..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10"
                data-testid="input-global-search"
              />
              {/* Global Search Results Dropdown */}
              {globalSearch.length > 2 &&
                globalSearchResults &&
                globalSearchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-auto">
                    <div className="p-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                        Search Results ({globalSearchResults.length})
                      </p>
                      {globalSearchResults.map((result: any) => (
                        <div
                          key={result.id}
                          className="p-2 hover:bg-muted/50 rounded cursor-pointer flex justify-between items-center"
                          onClick={() => {
                            openUserDrawer(result.id);
                            setGlobalSearch("");
                          }}
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {result.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {result.firstName} {result.lastName || ""}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              {globalSearchLoading && globalSearch.length > 2 && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Searching...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-6 max-w-[1400px]">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          {/* Tabs Navigation */}
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#fafafa] z-10 py-3">
            <TabsList data-testid="tabs-admin-navigation">
              <TabsTrigger
                value="overview"
                data-testid="tab-overview"
                className="bg-[#fafafa]"
              >
                <Activity className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                data-testid="tab-analytics"
                className="bg-[#fafafa]"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="users"
                data-testid="tab-users"
                className="bg-[#fafafa]"
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="companies"
                data-testid="tab-companies"
                className="bg-[#fafafa]"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Companies
              </TabsTrigger>
              <TabsTrigger
                value="assessments"
                data-testid="tab-assessments"
                className="bg-[#fafafa]"
              >
                <FileText className="h-4 w-4 mr-2" />
                Assessments
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            {selectedTab === "overview" && (
              <div className="flex gap-2">
                <Button
                  variant={timePeriod === "24h" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimePeriod("24h")}
                  className={timePeriod !== "24h" ? "bg-[#fafafa]" : ""}
                  data-testid="button-period-24h"
                >
                  24h
                </Button>
                <Button
                  variant={timePeriod === "7d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimePeriod("7d")}
                  className={timePeriod !== "7d" ? "bg-[#fafafa]" : ""}
                  data-testid="button-period-7d"
                >
                  7d
                </Button>
                <Button
                  variant={timePeriod === "30d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimePeriod("30d")}
                  className={timePeriod !== "30d" ? "bg-[#fafafa]" : ""}
                  data-testid="button-period-30d"
                >
                  30d
                </Button>
              </div>
            )}
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {kpisLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Primary KPIs */}
                <div>
                  <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary rounded" />
                    User & Engagement Metrics
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <KPICard
                      title="Total Users"
                      value={kpis?.totalUsers || 0}
                      icon={Users}
                      change={kpis?.newUsers}
                      trend="up"
                    />
                    <KPICard
                      title="New Users"
                      value={kpis?.newUsers || 0}
                      icon={TrendingUp}
                      trend="up"
                    />
                    <KPICard
                      title="DAU"
                      value={kpis?.dau || 0}
                      icon={Activity}
                    />
                    <KPICard title="MAU" value={kpis?.mau || 0} icon={Users} />
                  </div>
                </div>

                {/* Company & Assessment KPIs */}
                <div>
                  <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary rounded" />
                    Company & Assessment Metrics
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <KPICard
                      title="Total Companies"
                      value={kpis?.totalCompanies || 0}
                      icon={Building2}
                      change={kpis?.newCompanies}
                      trend="up"
                    />
                    <KPICard
                      title="New Companies"
                      value={kpis?.newCompanies || 0}
                      icon={TrendingUp}
                    />
                    <KPICard
                      title="Assessments Completed"
                      value={kpis?.periodAssessmentsCompleted || 0}
                      icon={CheckCircle2}
                    />
                    <KPICard
                      title="Completion Rate"
                      value={`${kpis?.assessmentCompletionRate || 0}%`}
                      icon={Target}
                    />
                  </div>
                </div>

                {/* Performance KPIs */}
                <div>
                  <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary rounded" />
                    Performance Metrics
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <KPICard
                      title="Total Assessments"
                      value={kpis?.totalAssessmentsCompleted || 0}
                      icon={BarChart3}
                    />
                    <KPICard title="WAU" value={kpis?.wau || 0} icon={Users} />
                    <KPICard
                      title="Free → Paid Rate"
                      value={`${kpis?.freeToPayedConversion || 0}%`}
                      icon={DollarSign}
                    />
                    <KPICard
                      title="Paid Companies"
                      value={kpis?.paidCompanies || 0}
                      icon={Building2}
                    />
                  </div>
                </div>

                {/* Instant Insights */}
                <div>
                  <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary rounded" />
                    Instant Insights
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <InsightCard
                      title="At-Risk Companies"
                      description="DAU down 7+ days"
                      value={kpis?.atRiskCompanies || 0}
                      icon={AlertTriangle}
                      status="warning"
                    />
                    <InsightCard
                      title="High-Value Events"
                      description="Large enterprise signups"
                      value={kpis?.highValueEvents || 0}
                      icon={TrendingUp}
                      status="info"
                    />
                    <InsightCard
                      title="Drop-off Rate"
                      description="Assessment abandonment"
                      value={`${kpis?.dropOffRate || 0}%`}
                      icon={XCircle}
                      status={kpis?.dropOffRate > 50 ? "critical" : "warning"}
                    />
                    <InsightCard
                      title="Top Source"
                      description="Primary acquisition channel"
                      value={kpis?.topSource || "Direct"}
                      icon={Target}
                      status="info"
                    />
                  </div>
                </div>

                {/* Distribution Charts */}
                {distribution && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resistance Level Distribution</CardTitle>
                        <CardDescription>
                          Last {timePeriod} breakdown
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {distribution.resistanceLevels?.length > 0 ? (
                            distribution.resistanceLevels.map((item: any) => (
                              <div
                                key={item.resistanceLevel}
                                className="flex justify-between items-center"
                              >
                                <span className="text-sm font-medium flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      item.resistanceLevel === "High"
                                        ? "bg-red-500"
                                        : item.resistanceLevel === "Moderate"
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                    }`}
                                  />
                                  {item.resistanceLevel || "Unknown"}
                                </span>
                                <span className="text-sm text-muted-foreground font-semibold">
                                  {item.count}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No data available
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Top Archetypes</CardTitle>
                        <CardDescription>Most common patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {distribution.topArchetypes?.length > 0 ? (
                            distribution.topArchetypes
                              .slice(0, 5)
                              .map((item: any, index: number) => (
                                <div
                                  key={item.archetype}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-sm font-medium flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground w-4">
                                      #{index + 1}
                                    </span>
                                    {item.archetype}
                                  </span>
                                  <span className="text-sm text-muted-foreground font-semibold">
                                    {item.count}
                                  </span>
                                </div>
                              ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No data available
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Time Series Analytics</CardTitle>
                  <CardDescription>
                    Daily metrics over the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Select
                        value={timePeriod}
                        onValueChange={(v) => setTimePeriod(v as TimePeriod)}
                      >
                        <SelectTrigger className="w-32 bg-[#fafafa]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">7 Days</SelectItem>
                          <SelectItem value="30d">30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {timeSeries && timeSeries.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={timeSeries}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(var(--border))"
                          />
                          <XAxis
                            dataKey="date"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "6px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="hsl(172, 37%, 64%)"
                            strokeWidth={2}
                            dot={{ fill: "hsl(172, 37%, 64%)", r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : timeSeries ? (
                      <div className="h-64 flex items-center justify-center border rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          No data available for this period
                        </p>
                      </div>
                    ) : (
                      <div className="h-64 flex items-center justify-center border rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Loading time series data...
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>
                      User journey from signup to paid
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded">
                        <span className="text-sm font-medium">Free Start</span>
                        <span className="text-sm font-bold">
                          {kpis?.totalUsers || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/20 rounded">
                        <span className="text-sm font-medium">
                          Free Complete
                        </span>
                        <span className="text-sm font-bold">
                          {kpis?.totalAssessmentsCompleted || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/30 rounded">
                        <span className="text-sm font-medium">
                          Paid Conversion
                        </span>
                        <span className="text-sm font-bold">
                          {kpis?.paidUsers || 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Segment Distribution</CardTitle>
                    <CardDescription>Companies by segment type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["SMB", "Mid-Market", "Enterprise", "Entrepreneur"].map(
                        (segment) => (
                          <div
                            key={segment}
                            className="flex justify-between items-center p-2 border-b last:border-0"
                          >
                            <span className="text-sm font-medium">
                              {segment}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {kpis?.[`segment${segment.replace("-", "")}`] ||
                                0}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-users"
                />
              </div>
              {/* <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                <SelectTrigger className="w-48 bg-[#fafafa]">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="smb">SMB</SelectItem>
                  <SelectItem value="mid">Mid-Market</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-32 bg-[#fafafa]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            {usersLoading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company Size</TableHead>
                      <TableHead>Profile</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers?.map((user: any) => (
                        <TableRow
                          key={user.id}
                          data-testid={`row-user-${user.id}`}
                        >
                          <TableCell className="font-medium">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : "-"}
                          </TableCell>
                          <TableCell>{user.role || "-"}</TableCell>
                          <TableCell>{user.companySize || "-"}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                user.profileCompleted === "true"
                                  ? "bg-[#fafafa] text-gray-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {user.profileCompleted === "true"
                                ? "Complete"
                                : "Incomplete"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openUserDrawer(user.id)}
                                data-testid={`button-view-user-${user.id}`}
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                data-testid={`button-edit-user-${user.id}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-companies"
                />
              </div>
            </div>

            {companiesLoading ? (
              <div className="text-center py-8">Loading companies...</div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No companies found
                        </TableCell>
                      </TableRow>
                    ) : (
                      companies?.map((company: any) => (
                        <TableRow
                          key={company.id}
                          data-testid={`row-company-${company.id}`}
                        >
                          <TableCell className="font-medium">
                            {company.name}
                          </TableCell>
                          <TableCell>{company.segment || "-"}</TableCell>
                          <TableCell>{company.employeeCount || "-"}</TableCell>
                          <TableCell>{company.industry || "-"}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                company.plan === "paid"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {company.plan || "free"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(company.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCompany(company)}
                              data-testid={`button-edit-company-${company.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-4">
            <div className="flex gap-4">
              <Select
                value={assessmentTypeFilter}
                onValueChange={setAssessmentTypeFilter}
              >
                <SelectTrigger
                  className="w-48 bg-[#fafafa]"
                  data-testid="select-assessment-type"
                >
                  <SelectValue placeholder="Assessment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="middle-management">
                    Middle Management
                  </SelectItem>
                  <SelectItem value="team-communication">
                    Team Communication
                  </SelectItem>
                  <SelectItem value="career-growth">Career Growth</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={resistanceLevelFilter}
                onValueChange={setResistanceLevelFilter}
              >
                <SelectTrigger
                  className="w-48 bg-[#fafafa]"
                  data-testid="select-resistance-level"
                >
                  <SelectValue placeholder="Resistance Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {assessmentsLoading ? (
              <div className="text-center py-8">Loading assessments...</div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Dominant Archetype</TableHead>
                      <TableHead>Resistance Level</TableHead>
                      <TableHead>Resistance %</TableHead>
                      <TableHead>Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessments?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No assessments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      assessments?.map((assessment: any) => (
                        <TableRow
                          key={assessment.id}
                          data-testid={`row-assessment-${assessment.id}`}
                        >
                          <TableCell className="font-mono text-xs">
                            {assessment.userId?.slice(0, 8)}...
                          </TableCell>
                          <TableCell>{assessment.type}</TableCell>
                          <TableCell>{assessment.dominantArchetype}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                assessment.resistanceLevel?.toLowerCase() ===
                                "high"
                                  ? "bg-red-100 text-red-800"
                                  : assessment.resistanceLevel?.toLowerCase() ===
                                      "moderate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-[#fafafa] text-gray-800"
                              }`}
                            >
                              {assessment.resistanceLevel
                                ?.charAt(0)
                                .toUpperCase() +
                                assessment.resistanceLevel
                                  ?.slice(1)
                                  .toLowerCase()}
                            </span>
                          </TableCell>
                          <TableCell>
                            {assessment.resistancePercentage}%
                          </TableCell>
                          <TableCell>
                            {new Date(
                              assessment.completedAt,
                            ).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      {/* User/Company Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="overflow-y-auto w-[500px]">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>
              Comprehensive user information and activity
            </SheetDescription>
          </SheetHeader>

          {userDetails ? (
            <div className="mt-6 space-y-6">
              {/* Profile Section */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Profile Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{userDetails.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">
                      {userDetails.firstName} {userDetails.lastName || ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">
                      {userDetails.role || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Size:</span>
                    <span className="font-medium">
                      {userDetails.companySize || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity Section */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Activity
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Activity:
                    </span>
                    <span className="font-medium">
                      {userDetails.lastActivity
                        ? new Date(
                            userDetails.lastActivity,
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="font-medium">
                      {new Date(userDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assessment History */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Assessment History
                </h3>
                <div className="space-y-2">
                  {userDetails.assessments?.length > 0 ? (
                    userDetails.assessments.map(
                      (assessment: any, index: number) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg space-y-1"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium">
                              {assessment.type}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                assessment.resistanceLevel === "High"
                                  ? "bg-red-100 text-red-800"
                                  : assessment.resistanceLevel === "Moderate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {assessment.resistanceLevel}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {assessment.dominantArchetype}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Completed:{" "}
                            {new Date(
                              assessment.completedAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No assessments yet
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full History
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Export User Data (GDPR)
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center py-8">
              <p className="text-sm text-muted-foreground">
                Loading user details...
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editingUser.email || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">First Name</Label>
                  <Input
                    id="edit-firstName"
                    value={editingUser.firstName || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastName">Last Name</Label>
                  <Input
                    id="edit-lastName"
                    value={editingUser.lastName || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  value={editingUser.role || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-companySize">Company Size</Label>
                <Input
                  id="edit-companySize"
                  value={editingUser.companySize || ""}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      companySize: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveUser}
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Company Dialog */}
      <Dialog
        open={editCompanyDialogOpen}
        onOpenChange={setEditCompanyDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>Update company information</DialogDescription>
          </DialogHeader>
          {editingCompany && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-company-name">Company Name</Label>
                <Input
                  id="edit-company-name"
                  value={editingCompany.name || ""}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-segment">Segment</Label>
                <Select
                  value={editingCompany.segment || ""}
                  onValueChange={(value) =>
                    setEditingCompany({ ...editingCompany, segment: value })
                  }
                >
                  <SelectTrigger id="edit-segment">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMB">SMB</SelectItem>
                    <SelectItem value="Mid-Market">Mid-Market</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Micro">Micro</SelectItem>
                    <SelectItem value="Growing">Growing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-employeeCount">Employee Count</Label>
                <Input
                  id="edit-employeeCount"
                  type="number"
                  value={editingCompany.employeeCount || ""}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      employeeCount: parseInt(e.target.value) || null,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-industry">Industry</Label>
                <Input
                  id="edit-industry"
                  value={editingCompany.industry || ""}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      industry: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-plan">Plan</Label>
                <Select
                  value={editingCompany.plan || "free"}
                  onValueChange={(value) =>
                    setEditingCompany({ ...editingCompany, plan: value })
                  }
                >
                  <SelectTrigger id="edit-plan">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditCompanyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCompany}
              disabled={updateCompanyMutation.isPending}
            >
              {updateCompanyMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
