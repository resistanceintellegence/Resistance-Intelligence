import { useRoute, useLocation } from "wouter";
import { ResultsDisplay } from "@/components/results-display";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FreeResults() {
  const [, params] = useRoute("/free-results/:type");
  const [, setLocation] = useLocation();
  const categoryId = params?.type || "";

  // Get results from session storage
  const resultsData = sessionStorage.getItem("freeAssessmentResults");
  const results = resultsData ? JSON.parse(resultsData) : null;

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Results Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            No assessment results found. Please take an assessment first.
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="flex items-center space-x-2"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </div>
    );
  }

  const handleGetFullReport = () => {
    // Navigate to login/auth for full report
    setLocation("/auth/register");
  };

  return (
    <ResultsDisplay
      results={results}
      onGetFullReport={handleGetFullReport}
      isAuthenticated={false}
    />
  );
}
