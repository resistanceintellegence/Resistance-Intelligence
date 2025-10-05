import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Archetype {
  id: string;
  code: string;
  shortLabel: string;
  name: string;
  description: string;
}

export default function ResistanceMapPage() {
  const [selectedOrg, setSelectedOrg] = useState("demo-org-1");
  const [selectedTemplate, setSelectedTemplate] =
    useState("leadership_paid_v1");
  const [selectedWindow, setSelectedWindow] = useState("latest_per_person");

  // Extract context from selected template
  const assessmentContext = selectedTemplate.split("_paid_")[0]; // e.g., "leadership" from "leadership_paid_v1"

  // Fetch archetypes filtered by assessment context
  const { data: archetypes, isLoading: archetypesLoading } = useQuery<
    Archetype[]
  >({
    queryKey: ["/api/resistance-map/archetypes", assessmentContext],
    queryFn: async () => {
      const response = await fetch(
        `/api/resistance-map/archetypes?context=${assessmentContext}`,
        {
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch archetypes");
      }
      return response.json();
    },
  });

  // Fetch org resistance map data
  const { data: mapData, isLoading: mapDataLoading } = useQuery({
    queryKey: [
      "/api/resistance-map/organizations",
      selectedOrg,
      { template: selectedTemplate, window: selectedWindow },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        template: selectedTemplate,
        window: selectedWindow,
      });
      const response = await fetch(
        `/api/resistance-map/organizations/${selectedOrg}?${params}`,
        {
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resistance map data");
      }
      return response.json();
    },
    enabled: !!selectedOrg,
  });

  const isLoading = archetypesLoading || mapDataLoading;

  // Transform data for radar chart
  const radarData = (archetypes || []).map((archetype) => ({
    archetype: archetype.shortLabel || archetype.code, // Use abbreviation for radar chart labels
    fullName: archetype.name,
    mean: mapData?.series?.[0]?.data?.[archetype.code] || 0,
    p90: mapData?.series?.[1]?.data?.[archetype.code] || 0,
  }));

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Resistance Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize team and organizational resistance patterns across
            archetypes
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Select organization, assessment type, and time window
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Assessment Type
                </label>
                <Select
                  value={selectedTemplate}
                  onValueChange={setSelectedTemplate}
                >
                  <SelectTrigger data-testid="select-template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadership_paid_v1">
                      Leadership
                    </SelectItem>
                    <SelectItem value="middle_management_paid_v1">
                      Middle Management
                    </SelectItem>
                    <SelectItem value="team_communication_paid_v1">
                      Team Communication
                    </SelectItem>
                    <SelectItem value="career_growth_paid_v1">
                      Career Growth
                    </SelectItem>
                    <SelectItem value="sales_paid_v1">
                      Sales
                    </SelectItem>
                    <SelectItem value="individual_paid_v1">
                      Individual Performance
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Time Window
                </label>
                <Select
                  value={selectedWindow}
                  onValueChange={setSelectedWindow}
                >
                  <SelectTrigger data-testid="select-window">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest_per_person">
                      Latest Per Person
                    </SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="all_time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Organization
                </label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger data-testid="select-organization">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo-org-1">
                      Demo Organization
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 border-teal-200 dark:border-teal-800 shadow-lg">
            <CardHeader>
              <CardTitle>Archetype Resistance Map</CardTitle>
              <CardDescription>
                {mapData?.meta ? (
                  <>
                    Based on {mapData.meta.n_people}{" "}
                    {mapData.meta.n_people === 1 ? "person" : "people"}
                    {mapData.meta.last_attempt_at && (
                      <>
                        {" "}
                        · Last updated{" "}
                        {new Date(
                          mapData.meta.last_attempt_at,
                        ).toLocaleDateString()}
                      </>
                    )}
                  </>
                ) : (
                  "Loading data..."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent data-testid="radar-chart-container">
              {isLoading ? (
                <Skeleton className="w-full h-[500px]" />
              ) : radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis
                      dataKey="archetype"
                      tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#94a3b8" }}
                    />
                    <Radar
                      name="Team Mean"
                      dataKey="mean"
                      stroke="hsl(172, 37%, 64%)"
                      fill="hsl(172, 37%, 64%)"
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                    <Radar
                      name="P90"
                      dataKey="p90"
                      stroke="hsl(200, 70%, 50%)"
                      fill="hsl(200, 70%, 50%)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-teal-200 dark:border-teal-700">
                              <p className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
                                {payload[0]?.payload?.fullName}
                              </p>
                              {payload.map((entry: any, index: number) => (
                                <p
                                  key={index}
                                  className="text-sm"
                                  style={{ color: entry.color }}
                                >
                                  {entry.name}: {entry.value}%
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[500px] text-gray-500">
                  <div className="text-center">
                    <p className="text-lg font-medium">No data available</p>
                    <p className="text-sm">
                      No assessments found for the selected filters
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Archetype Legend */}
          <Card className="border-teal-200 dark:border-teal-800 shadow-lg">
            <CardHeader>
              <CardTitle>Archetypes</CardTitle>
              <CardDescription>8 core resistance patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" data-testid="archetype-list">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))
                  : (archetypes || []).map((archetype) => {
                      const meanScore =
                        mapData?.series?.[0]?.data?.[archetype.code] || 0;
                      const band =
                        meanScore >= 55
                          ? "high"
                          : meanScore >= 35
                            ? "moderate"
                            : "low";
                      const bandColor = {
                        high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                        moderate:
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                        low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                      }[band];

                      return (
                        <div
                          key={archetype.id}
                          className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                          data-testid={`archetype-${archetype.code}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-teal-700 dark:text-teal-400">
                                {archetype.shortLabel}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {archetype.name}
                              </span>
                            </div>
                            {mapData && (
                              <Badge className={`text-xs ${bandColor}`}>
                                {meanScore}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resistance Heatmap Grid */}
        <Card className="border-teal-200 dark:border-teal-800 shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Resistance Heatmap</CardTitle>
            <CardDescription>
              Visual overview of resistance bands across all archetypes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[200px]" />
            ) : (archetypes || []).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(archetypes || []).map((archetype) => {
                  const meanScore =
                    mapData?.series?.[0]?.data?.[archetype.code] || 0;
                  const band =
                    meanScore >= 55
                      ? "high"
                      : meanScore >= 35
                        ? "moderate"
                        : "low";
                  const heatmapColor = {
                    high: "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 border-red-300 dark:border-red-700",
                    moderate:
                      "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 border-yellow-300 dark:border-yellow-700",
                    low: "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 border-green-300 dark:border-green-700",
                  }[band];

                  return (
                    <div
                      key={archetype.id}
                      className={`p-4 rounded-xl border-2 ${heatmapColor} transition-all hover:scale-105 hover:shadow-lg`}
                      data-testid={`heatmap-cell-${archetype.code}`}
                    >
                      <div className="text-center">
                        <div className="font-bold text-2xl mb-1 text-gray-800 dark:text-gray-200">
                          {archetype.shortLabel}
                        </div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                          {archetype.name}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {meanScore}%
                        </div>
                        <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          {band}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-500">
                <div className="text-center">
                  <p className="text-lg font-medium">No data available</p>
                  <p className="text-sm">
                    No assessments found for the selected filters
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Band Legend */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle>Resistance Bands</CardTitle>
            <CardDescription>
              Understanding the resistance levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="font-semibold text-green-800 dark:text-green-400 mb-1">
                  Low (0-34%)
                </div>
                <div className="text-sm text-green-700 dark:text-green-500">
                  Healthy balance, adaptive use of pattern
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <div className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                  Moderate (35-50%)
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-500">
                  Some resistance, protective behaviors present
                </div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div className="font-semibold text-red-800 dark:text-red-400 mb-1">
                  High (50-100%)
                </div>
                <div className="text-sm text-red-700 dark:text-red-500">
                  Significant resistance, restrictive patterns dominant
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
