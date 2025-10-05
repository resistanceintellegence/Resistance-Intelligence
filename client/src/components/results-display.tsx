import { getArchetypeData } from "@/lib/assessment-data";
import { useLocation } from "wouter";

interface ResultsDisplayProps {
  results: {
    assessmentType: string;
    totalScore: number;
    dominantArchetype: string;
    resistanceLevel: string;
    resistancePercentage: number;
    responses: number[];
    archetypeScores?: Array<{ name: string; score: number }>;
    topArchetypes?: Array<{
      name: string;
      score: number;
      percentage: number;
      level: string;
    }>;
    balancingScore?: number;
  };
  onGetFullReport: () => void;
  isAuthenticated: boolean;
}

export function ResultsDisplay({
  results,
  onGetFullReport,
  isAuthenticated,
}: ResultsDisplayProps) {
  const [, setLocation] = useLocation();
  const assessmentType = results.assessmentType;

  // Use topArchetypes from the scoring engine if available, otherwise calculate
  const topArchetypes =
    results.topArchetypes ||
    (results.archetypeScores || [])
      .map((archetype) => {
        const maxScore = assessmentType === "sales" ? 15 : 15;
        const minScore = assessmentType === "sales" ? 3 : 3;
        const percentageScore =
          ((archetype.score - minScore) / (maxScore - minScore)) * 100;

        return {
          name: archetype.name,
          score: archetype.score,
          percentage: Math.round(percentageScore),
          level:
            percentageScore <= 34
              ? "low"
              : percentageScore <= 50
                ? "moderate"
                : "high",
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

  // Get archetype details for displaying blurbs
  const archetypesWithDetails = topArchetypes.map((archetype) => {
    const archetypeDetails = getArchetypeData(assessmentType, archetype.name);
    return {
      ...archetype,
      details: archetypeDetails?.details || "",
      description: archetypeDetails?.description || "",
    };
  });

  // Get resistance level styling
  const getResistanceBand = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return {
          text: "Low",
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-200",
        };
      case "moderate":
        return {
          text: "Moderate",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-200",
        };
      case "high":
        return {
          text: "High",
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
        };
      default:
        return {
          text: "Unknown",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-200",
        };
    }
  };

  const resistanceBand = getResistanceBand(results.resistanceLevel);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Section: Resistance Snapshot */}
        <div className="text-center py-10 mb-10 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 flex justify-center items-center">
            <i className="fas fa-check-circle text-blue-600 mr-2 text-2xl" />
            Your resistance snapshot
          </h2>

          <div className="text-6xl font-extrabold text-blue-700 mb-4">
            {Math.round(results.resistancePercentage)}%
          </div>

          <div className="mb-6">
            <span
              className={`inline-block ${resistanceBand.bgColor} ${resistanceBand.color} px-4 py-2 rounded-full font-medium text-sm md:text-base shadow-sm ${resistanceBand.borderColor} border`}
            >
              {resistanceBand.text} Overall Resistance
            </span>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mx-auto max-w-2xl border border-blue-200 text-left">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              What does "Resistance" measure?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Resistance is the emotional friction that makes follow-through
              harder than it needs to be — even when you know exactly what to
              do. It isn't a character flaw; it's a mix of learned patterns,
              protective emotions, and old beliefs trying (imperfectly) to keep
              you safe.
            </p>
          </div>
        </div>

        {/* What It's Made Of */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            What it’s made of:
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-medium text-red-700 flex items-center">
                <span className="mr-2">🔄</span> Patterns (what you do):
              </h3>
              <p className="text-gray-700 mt-2">
                Patterns are the things you do on autopilot to feel safe—like
                avoiding hard tasks, over-controlling details, or over-giving to
                keep the peace. They're not character flaws; they're protective
                habits your nervous system learned over time. Once you spot
                them, you can replace them with smaller, healthier actions that
                still feel safe.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-700 flex items-center">
                <span className="mr-2">💭</span> Emotions (what you feel):
              </h3>
              <p className="text-gray-700 mt-2">
                Emotions are your body's alarm system—feelings like anxiety,
                shame, and fear that try to keep you safe. They aren't the
                problem; they're signals. When you name and allow them (instead
                of fighting them), your nervous system settles and taking action
                gets easier.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-medium text-purple-700 flex items-center">
                <span className="mr-2">🧠</span> Beliefs (what you assume is
                true):
              </h3>
              <p className="text-gray-700 mt-2">
                Beliefs are the quiet rules your mind uses to stay safe—like
                "I'll fail anyway," "Love must be earned," or "Money only comes
                through struggle." They're not facts; they're old protective
                stories that shape what you try, avoid, and expect. When you
                surface and question them, you can swap them for truer, kinder
                beliefs that open up new choices.
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-medium text-green-700 flex items-center">
                <span className="mr-2">⚡</span> Why it matters:
              </h3>
              <p className="text-gray-700 mt-2">
                Higher resistance means more energy lost to hesitation,
                second-guessing, and start-stop cycles. Lower resistance means
                decisions feel lighter and actions stick.
              </p>
            </div>
          </div>
        </div>

        {/* Top 3 Resistance Archetypes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">
            📊 Your Top Three Resistance Patterns
          </h2>
          <p className="text-gray-600 mb-6">
            Based on your results, here are your top three resistance patterns:
          </p>
          <div className="space-y-6">
            {archetypesWithDetails.map((archetype, index) => {
              const resistanceBandStyle = getResistanceBand(archetype.level);
              return (
                <div
                  key={archetype.name}
                  className="p-5 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="mr-3 text-blue-600 font-bold">•</span>
                      {archetype.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-700">
                        {archetype.percentage}%
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${resistanceBandStyle.bgColor} ${resistanceBandStyle.color} border ${resistanceBandStyle.borderColor}`}
                      >
                        {resistanceBandStyle.text} Resistance
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-2">
                    {archetype.description}
                  </p>
                  {archetype.details && (
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {archetype.details}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* {/* Overall Resistance Band Description */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            🌟 What This Means for You
          </h2>
          <div
            className={`p-4 rounded-lg border ${resistanceBand.bgColor} ${resistanceBand.borderColor}`}
          >
            <h3
              className={`text-lg font-medium mb-2 flex items-center ${resistanceBand.color}`}
            >
              <span className="mr-2">📈</span> Your Overall Resistance Level:{" "}
              {resistanceBand.text}
            </h3>
            <p className="text-gray-700">
              {results.resistanceLevel === "low" &&
                "You have relatively low resistance patterns. You likely find it easier to take action and follow through on your goals. Your challenges may be more about optimization and fine-tuning rather than overcoming major internal barriers."}
              {results.resistanceLevel === "moderate" &&
                "You have moderate resistance patterns. You experience some internal friction that can slow down your progress, but you also have areas where action comes more naturally. Focus on understanding and working with your specific patterns."}
              {results.resistanceLevel === "high" &&
                "You have higher resistance patterns that may be creating significant internal friction. This isn't a character flaw—it's learned protective patterns. Understanding these patterns is the first step toward reducing the effort required to achieve your goals."}
            </p>
          </div>
        </div> */}

        {/* CTA to Paid Assessment */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🎯 See the Full Picture to Grow
          </h2>
          <p className="text-blue-100 mb-6 text-center leading-relaxed">
            The free assessment gave you a snapshot of your top resistance
            patterns. But your growth depends on seeing the full picture.
          </p>
          <ul className="text-blue-100 mb-6 list-disc list-inside leading-relaxed max-w-xl mx-auto">
            <li>
              A complete profile of all 8 archetypes and how they shape your
              performance
            </li>
            <li>
              A deep-dive report on your primary archetype with root causes,
              core behaviors, and resistance costs
            </li>
          </ul>
          <p className="text-blue-100 mb-6 text-center leading-relaxed">
            👉 <strong>Next Step:</strong> Create your free account to upgrade
            and save your results.
            <br />
            Once your account is created, you’ll be able to access the full paid
            assessment.
          </p>
          <div className="text-center">
            <button
              onClick={onGetFullReport}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              data-testid="button-get-full-report"
            >
              Create My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
