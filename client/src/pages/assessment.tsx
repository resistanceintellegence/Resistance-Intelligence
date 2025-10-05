import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import AssessmentTemplate from "@/lib/paid-assessments/templates/AssessmentTemplate";
import { getAssessmentData } from "@/lib/paid-assessments/data/registry";

export default function Assessment() {
  const [, params] = useRoute("/assessment/:type");
  const categoryId = params?.type || "";
  
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load assessment data dynamically for any category
  useEffect(() => {
    async function loadAssessmentData() {
      setIsLoading(true);
      try {
        const data = await getAssessmentData(categoryId);
        setAssessmentData(data);
      } catch (error) {
        console.error(`Error loading assessment data for ${categoryId}:`, error);
        setAssessmentData(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (categoryId) {
      loadAssessmentData();
    } else {
      setIsLoading(false);
    }
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Assessment Not Found
          </h2>
          <p className="text-muted-foreground">
            The requested assessment category "{categoryId}" is not available.
          </p>
        </div>
      </div>
    );
  }

  return <AssessmentTemplate categoryId={categoryId} />;
}
