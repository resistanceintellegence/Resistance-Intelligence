import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { QuestionDisplay } from "@/components/question-display";
import { Progress } from "@/components/ui/progress";
import { getAssessmentData } from "@/lib/assessment-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { calculateFreeAssessmentResults } from "@/lib/scoring-engine";

export default function FreeAssessment() {
  const [, params] = useRoute("/free-assessment/:type");
  const [, setLocation] = useLocation();
  const categoryId = params?.type || "";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load assessment data dynamically for any category
  useEffect(() => {
    async function loadFreeAssessmentData() {
      setIsLoading(true);
      try {
        // Try to get assessment data - this works for any category now
        const data = getAssessmentData(categoryId);
        setAssessmentData(data);
      } catch (error) {
        console.error(
          `Error loading free assessment data for ${categoryId}:`,
          error,
        );
        setAssessmentData(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (categoryId) {
      loadFreeAssessmentData();
    } else {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (assessmentData) {
      setResponses(new Array(assessmentData.questions.length).fill(undefined));
    }
  }, [assessmentData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading free assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Assessment Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested free assessment "{categoryId}" is not available.
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

  const currentQuestion = assessmentData.questions[currentQuestionIndex];
  const answeredCount = responses.filter((r) => r !== undefined).length;
  const progress = (answeredCount / assessmentData.questions.length) * 100;

  const handleResponseSelect = (response: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = response;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Calculate results using the proper scoring engine
    const results = calculateFreeAssessmentResults(assessmentData, responses);

    // Simulate processing time
    setTimeout(() => {
      setIsSubmitting(false);
      // Store results in session storage and navigate
      const resultsData = {
        assessmentType: categoryId,
        totalScore: results.totalScore,
        dominantArchetype: results.dominantArchetype,
        resistanceLevel: results.resistanceLevel,
        resistancePercentage: results.resistancePercentage,
        responses: responses,
        archetypeScores: Object.entries(results.archetypeScores).map(
          ([name, score]) => ({ name, score }),
        ),
        topArchetypes: results.topArchetypes,
        balancingScore: results.balancingScore,
      };

      sessionStorage.setItem(
        "freeAssessmentResults",
        JSON.stringify(resultsData),
      );
      setLocation(`/free-results/${categoryId}`);
    }, 1500);
  };

  const canGoNext = responses[currentQuestionIndex] !== undefined;
  const canGoPrevious = currentQuestionIndex > 0;
  const isLastQuestion =
    currentQuestionIndex === assessmentData.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="flex items-center space-x-2"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {assessmentData.title}
            </h1>
          </div>
          <div></div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of{" "}
              {assessmentData.questions.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Display */}
        <QuestionDisplay
          question={currentQuestion}
          selectedResponse={responses[currentQuestionIndex]}
          onResponseSelect={handleResponseSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isLastQuestion={isLastQuestion}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
