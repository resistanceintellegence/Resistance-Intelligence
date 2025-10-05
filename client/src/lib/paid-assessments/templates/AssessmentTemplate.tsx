import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAssessmentData,
  type AssessmentCategory,
  type AssessmentQuestion,
  type ForcedChoiceBlock,
} from "../data/registry";
import {
  calculateAssessmentResults,
  type AssessmentResponse,
  type AssessmentResult,
} from "./scoring-engine";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  getPreAssessmentQuestions,
  hasPreAssessmentQuestions,
  type PreAssessmentQuestion,
} from "../data/pre-assessment-questions";

// Standardized Likert Scale for all assessments - templated approach
const STANDARD_LIKERT_SCALE = {
  "strongly-disagree": 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  "strongly-agree": 5,
};

// Helper functions for templated Likert scale handling
function getStandardLikertValue(label: string): number {
  return (
    STANDARD_LIKERT_SCALE[label as keyof typeof STANDARD_LIKERT_SCALE] || 0
  );
}

function getStandardLikertOptions(): [string, number][] {
  return Object.entries(STANDARD_LIKERT_SCALE);
}

// Templated helper to get option text (handles both 'text' and 'label' properties)
function getOptionText(option: any): string {
  return option.text || option.label || "";
}

// OptionBox component for styled question options
interface OptionBoxProps {
  value: string;
  id: string;
  children: React.ReactNode;
  testId: string;
  disabled?: boolean;
}

function OptionBox({
  value,
  id,
  children,
  testId,
  disabled = false,
}: OptionBoxProps) {
  return (
    <div className="relative">
      <RadioGroupItem
        value={value}
        id={id}
        className="sr-only peer"
        disabled={disabled}
        data-testid={testId}
      />
      <Label
        htmlFor={id}
        className={`
          block w-full cursor-pointer rounded-lg border p-4 h-16 
          flex items-center justify-center text-center transition-all duration-200
          hover:bg-blue-100 dark:hover:bg-blue-800 
          hover:border-blue-500 dark:hover:border-blue-400 
          hover:text-blue-900 dark:hover:text-white 
          hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
          peer-checked:bg-primary/15 peer-checked:border-primary peer-checked:shadow-md peer-checked:scale-[1.01]
          peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40
          ${disabled ? "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none" : ""}
        `}
      >
        {children}
      </Label>
    </div>
  );
}

interface AssessmentTemplateProps {
  categoryId: string;
}

export default function AssessmentTemplate({
  categoryId,
}: AssessmentTemplateProps) {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();

  // Assessment data state
  const [category, setCategory] = useState<AssessmentCategory | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [forcedChoiceBlocks, setForcedChoiceBlocks] = useState<
    ForcedChoiceBlock[]
  >([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Pre-assessment state
  const [preAssessmentQuestions, setPreAssessmentQuestions] = useState<
    PreAssessmentQuestion[]
  >([]);
  const [preAssessmentResponses, setPreAssessmentResponses] = useState<
    Record<string, string>
  >({});
  const [showConditionalQuestions, setShowConditionalQuestions] = useState<
    Record<string, boolean>
  >({});
  const [currentPreAssessmentIndex, setCurrentPreAssessmentIndex] = useState(0);

  // Assessment state
  const [currentPhase, setCurrentPhase] = useState<
    "pre-assessment" | "likert" | "forced-choice"
  >("pre-assessment");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [responses, setResponses] = useState<
    Record<
      string,
      number | string | { mostLikeMe: string; leastLikeMe: string }
    >
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Progress state
  const [progressInfo, setProgressInfo] = useState<{
    current: number;
    total: number;
    progress: number;
  }>({ current: 1, total: 1, progress: 0 });

  // Load assessment data dynamically
  useEffect(() => {
    async function loadAssessmentData() {
      setIsLoadingData(true);
      try {
        const dataFile = await getAssessmentData(categoryId);
        if (dataFile) {
          const categoryData = dataFile.getAssessmentCategory(categoryId);
          const questionsData = dataFile.getAllQuestions(categoryId);
          const forcedChoiceData = dataFile.getForcedChoiceBlocks(categoryId);

          setCategory(categoryData);
          setQuestions(questionsData);
          setForcedChoiceBlocks(forcedChoiceData);

          // Load pre-assessment questions if available
          const preQuestions = getPreAssessmentQuestions(categoryId);
          setPreAssessmentQuestions(preQuestions);

          // Set initial phase based on whether pre-assessment questions exist
          if (preQuestions.length > 0) {
            setCurrentPhase("pre-assessment");
          } else {
            setCurrentPhase("likert");
          }

          // Initialize progress
          updateProgress();
        } else {
          console.error(
            `Failed to load assessment data for category: ${categoryId}`,
          );
        }
      } catch (error) {
        console.error(
          `Error loading assessment data for ${categoryId}:`,
          error,
        );
      } finally {
        setIsLoadingData(false);
      }
    }

    loadAssessmentData();
  }, [categoryId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  // Filter questions by phase (excluding demographic - handled in pre-assessment phase)
  const likertQuestions = questions.filter(
    (q) =>
      q.type === "direct" ||
      q.type === "oblique" ||
      q.type === "scenario" ||
      q.type === "balancing",
  );

  // Calculate total conditional questions currently visible
  const getVisibleConditionalQuestions = () => {
    let count = 0;
    preAssessmentQuestions.forEach((question) => {
      const response = preAssessmentResponses[question.id];
      const selectedOption = question.options.find(
        (opt) => opt.value === response,
      );
      if (
        selectedOption?.additionalQuestions &&
        showConditionalQuestions[question.id]
      ) {
        count += selectedOption.additionalQuestions.length;
      }
    });
    return count;
  };

  // Calculate progress based on current phase
  const calculateProgressInfo = () => {
    const basePreAssessmentCount = preAssessmentQuestions.length;
    const conditionalCount = getVisibleConditionalQuestions();
    const preAssessmentCount = basePreAssessmentCount + conditionalCount;

    // Main assessment questions only (excluding pre-assessment)
    const mainAssessmentTotal =
      likertQuestions.length + forcedChoiceBlocks.length;

    let currentQuestionNumber = 1;
    let totalQuestions = 1;

    if (currentPhase === "pre-assessment") {
      // For pre-assessment: count only pre-assessment questions
      let questionsAnswered = currentPreAssessmentIndex;
      // Add conditional questions for completed base questions
      for (let i = 0; i < currentPreAssessmentIndex; i++) {
        const question = preAssessmentQuestions[i];
        const response = preAssessmentResponses[question.id];
        const selectedOption = question.options.find(
          (opt) => opt.value === response,
        );
        if (
          selectedOption?.additionalQuestions &&
          showConditionalQuestions[question.id]
        ) {
          questionsAnswered += selectedOption.additionalQuestions.length;
        }
      }
      currentQuestionNumber = questionsAnswered + 1;
      totalQuestions = preAssessmentCount;
    } else if (currentPhase === "likert") {
      // For main assessment: count only main assessment questions, starting from 1
      currentQuestionNumber = currentQuestionIndex + 1;
      totalQuestions = mainAssessmentTotal;
    } else {
      // For forced-choice: count only main assessment questions
      currentQuestionNumber = likertQuestions.length + currentBlockIndex + 1;
      totalQuestions = mainAssessmentTotal;
    }

    return {
      current: currentQuestionNumber,
      total: totalQuestions,
      progress: (currentQuestionNumber / totalQuestions) * 100,
    };
  };

  // Update progress state
  const updateProgress = () => {
    setProgressInfo(calculateProgressInfo());
  };

  // Handle pre-assessment response selection
  const handlePreAssessmentResponse = (questionId: string, value: string) => {
    setPreAssessmentResponses((prev) => ({ ...prev, [questionId]: value }));

    // Check if this response triggers conditional questions
    const question = preAssessmentQuestions.find((q) => q.id === questionId);
    const selectedOption = question?.options.find((opt) => opt.value === value);

    if (selectedOption?.additionalQuestions) {
      setShowConditionalQuestions((prev) => ({ ...prev, [questionId]: true }));
    } else {
      setShowConditionalQuestions((prev) => ({ ...prev, [questionId]: false }));
    }

    // Update progress after response
    updateProgress();
  };

  // Handle response selection for all question types
  const handleResponseSelect = (
    questionId: string,
    response: number | string | { mostLikeMe: string; leastLikeMe: string },
  ) => {
    setResponses((prev) => ({ ...prev, [questionId]: response }));

    if (currentPhase === "likert") {
      // If we're in the Likert phase
      if (currentQuestionIndex < likertQuestions.length - 1) {
        // Move to next Likert question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        updateProgress(); // Update progress after advancing
      } else {
        // We've finished all Likert questions
        if (forcedChoiceBlocks.length > 0) {
          // Transition to forced-choice if there are blocks
          setCurrentPhase("forced-choice");
          setCurrentBlockIndex(0);
          updateProgress(); // Update progress after phase change
        } else {
          // No forced-choice blocks, submit immediately
          handleSubmit();
        }
      }
    } else if (currentPhase === "forced-choice") {
      // If we're in the forced-choice phase
      if (currentBlockIndex < forcedChoiceBlocks.length - 1) {
        // Move to next forced-choice block
        setCurrentBlockIndex(currentBlockIndex + 1);
        updateProgress(); // Update progress after advancing
      } else {
        // We've finished all forced-choice blocks, now submit
        handleSubmit();
      }
    }
  };

  // Handle forced choice selection
  const handleForcedChoiceSelect = (
    blockId: string,
    statementText: string,
    type: "most" | "least",
  ) => {
    const block = forcedChoiceBlocks.find((b) => b.id === blockId);
    const statement = block?.statements.find((s) => s.text === statementText);
    const archetypeId = statement?.archetype;

    if (!archetypeId) return;

    setResponses((prev) => {
      const current = (prev[blockId] as {
        mostLikeMe: string;
        leastLikeMe: string;
      }) || { mostLikeMe: "", leastLikeMe: "" };

      const newResponse =
        type === "most"
          ? { ...current, mostLikeMe: archetypeId }
          : { ...current, leastLikeMe: archetypeId };

      // Check if both selections are made with the new response
      if (
        newResponse.mostLikeMe &&
        newResponse.leastLikeMe &&
        newResponse.mostLikeMe !== newResponse.leastLikeMe
      ) {
        // Auto-advance to next block after a short delay
        setTimeout(() => {
          handleNext();
        }, 500);
      }

      return { ...prev, [blockId]: newResponse };
    });
  };

  // Check if all required pre-assessment questions are answered
  const areAllPreAssessmentQuestionsAnswered = () => {
    // Check all base questions are answered
    for (const question of preAssessmentQuestions) {
      if (question.required && !preAssessmentResponses[question.id]) {
        return false;
      }

      // Check conditional questions if they are shown
      const response = preAssessmentResponses[question.id];
      const selectedOption = question.options.find(
        (opt) => opt.value === response,
      );
      if (
        selectedOption?.additionalQuestions &&
        showConditionalQuestions[question.id]
      ) {
        for (const conditionalQ of selectedOption.additionalQuestions) {
          if (
            conditionalQ.required &&
            !preAssessmentResponses[conditionalQ.id]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Navigate to next question/block
  const handleNext = () => {
    if (currentPhase === "pre-assessment") {
      if (currentPreAssessmentIndex < preAssessmentQuestions.length - 1) {
        setCurrentPreAssessmentIndex(currentPreAssessmentIndex + 1);
        updateProgress(); // Update progress after advancing
      } else {
        // Only validate all questions when transitioning out of pre-assessment phase
        if (!areAllPreAssessmentQuestionsAnswered()) {
          return; // Block transition to main assessment if required questions aren't answered
        }
        setCurrentPhase("likert");
        setCurrentQuestionIndex(0);
        updateProgress(); // Update progress after phase change
      }
    } else if (currentPhase === "likert") {
      if (currentQuestionIndex < likertQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        updateProgress(); // Update progress after advancing
      } else {
        setCurrentPhase("forced-choice");
        setCurrentBlockIndex(0);
        updateProgress(); // Update progress after phase change
      }
    } else {
      if (currentBlockIndex < forcedChoiceBlocks.length - 1) {
        setCurrentBlockIndex(currentBlockIndex + 1);
        updateProgress(); // Update progress after advancing
      } else {
        handleSubmit();
      }
    }
  };

  // Navigate to previous question/block
  const handlePrevious = () => {
    if (currentPhase === "forced-choice") {
      if (currentBlockIndex > 0) {
        setCurrentBlockIndex(currentBlockIndex - 1);
        updateProgress(); // Update progress after navigating back
      } else {
        setCurrentPhase("likert");
        setCurrentQuestionIndex(likertQuestions.length - 1);
        updateProgress(); // Update progress after phase change
      }
    } else if (currentPhase === "likert") {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        updateProgress(); // Update progress after navigating back
      } else if (preAssessmentQuestions.length > 0) {
        setCurrentPhase("pre-assessment");
        setCurrentPreAssessmentIndex(preAssessmentQuestions.length - 1);
        updateProgress(); // Update progress after phase change
      }
    } else if (currentPhase === "pre-assessment") {
      if (currentPreAssessmentIndex > 0) {
        setCurrentPreAssessmentIndex(currentPreAssessmentIndex - 1);
        updateProgress(); // Update progress after navigating back
      }
    }
  };

  // Extract pre-assessment data for database columns
  const extractPreAssessmentData = () => {
    const data: Record<string, any> = {};

    // Map pre-assessment responses to appropriate database columns based on assessment type
    switch (categoryId) {
      case "leadership":
      case "career-growth":
        data.organizationCategory =
          preAssessmentResponses["organizationCategory"];
        data.entrepreneurSubcategory =
          preAssessmentResponses["entrepreneurSubcategory"];
        break;

      case "sales":
        data.salesType = preAssessmentResponses["salesType"];
        data.companySize = preAssessmentResponses["companySize"];
        break;

      case "team-communication":
        data.teamSize = preAssessmentResponses["teamSize"];
        data.workType = preAssessmentResponses["workType"];
        break;

      case "middle-management":
        data.companySize = preAssessmentResponses["companySize"];
        data.industry = preAssessmentResponses["industry"];
        data.yearsInManagement = preAssessmentResponses["yearsInManagement"];
        data.currentTeamSize = preAssessmentResponses["currentTeamSize"];
        break;
    }

    return data;
  };

  // Submit assessment
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const assessmentResponses: AssessmentResponse[] = [];

      // Add Likert, demographic, and balancing responses
      likertQuestions.forEach((question) => {
        const response = responses[question.id];
        if (response !== undefined) {
          if (question.type === "forced-choice") return;
          assessmentResponses.push({
            questionId: question.id,
            response: typeof response === "number" ? response : response,
            questionType: question.type as any,
          });
        }
      });

      // Add forced choice responses
      forcedChoiceBlocks.forEach((block) => {
        const fcResponse = responses[block.id];
        if (
          fcResponse &&
          typeof fcResponse === "object" &&
          "mostLikeMe" in fcResponse &&
          "leastLikeMe" in fcResponse
        ) {
          assessmentResponses.push({
            questionId: block.id,
            response: {
              mostLikeMe: fcResponse.mostLikeMe,
              leastLikeMe: fcResponse.leastLikeMe,
            },
            questionType: "forced-choice",
          });
        }
      });

      const result = await calculateAssessmentResults(
        categoryId,
        assessmentResponses,
      );

      // Extract pre-assessment data for database storage
      const preAssessmentData = extractPreAssessmentData();

      const getApiEndpoint = (categoryId: string) => {
        const routingMap: Record<string, string> = {
          team: "team-communication",
          "team-communication": "team-communication",
          career: "career-growth",
          "career-growth": "career-growth",
          "individual-performance": "individual",
        };
        const backendCategory = routingMap[categoryId] || categoryId;
        return `/api/${backendCategory}-assessment`;
      };

      const apiEndpoint = getApiEndpoint(categoryId);

      // Prepare data in the format expected by server validation (flattened structure)
      const submissionData = {
        responses: assessmentResponses,
        archetypeScores: result.archetypeScores,
        dominantArchetype: result.dominantArchetype,
        secondaryArchetype: result.secondaryArchetype,
        insights: result.insights,
        developmentAreas: result.developmentAreas,
        totalQuestions: result.totalQuestions,
        resistanceLevel: result.resistanceLevel,
        resistancePercentage: result.resistancePercentage,
        balancingIndex: result.balancingIndex,
        ...preAssessmentData, // Merge pre-assessment demographic data
      };

      await apiRequest("POST", apiEndpoint, submissionData);

      queryClient.invalidateQueries({ queryKey: [`${apiEndpoint}/latest`] });
      setLocation(`/results/${categoryId}`);
    } catch (error) {
      console.error("Failed to submit assessment:", error);
      alert("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render pre-assessment question
  const renderPreAssessmentQuestion = () => {
    const question = preAssessmentQuestions[currentPreAssessmentIndex];
    if (!question) return null;

    // Get current response and check for conditional questions
    const currentResponse = preAssessmentResponses[question.id];
    const selectedOption = question.options.find(
      (opt) => opt.value === currentResponse,
    );
    const hasConditionalQuestions =
      selectedOption?.additionalQuestions &&
      selectedOption.additionalQuestions.length > 0;
    const showConditional = showConditionalQuestions[question.id];

    // Get all questions to display (main + conditional if applicable)
    const questionsToShow = [question];
    if (
      hasConditionalQuestions &&
      showConditional &&
      selectedOption?.additionalQuestions
    ) {
      questionsToShow.push(...selectedOption.additionalQuestions);
    }

    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="secondary" className="text-sm">
                Pre-Assessment
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentPreAssessmentIndex + 1} of{" "}
                {preAssessmentQuestions.length}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {question.text}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Please provide some basic information before we begin the
              assessment.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {questionsToShow.map((q, index) => {
            const isMainQuestion = index === 0;
            const responseValue = preAssessmentResponses[q.id];

            return (
              <div
                key={q.id}
                className={
                  isMainQuestion
                    ? ""
                    : "ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                }
              >
                {!isMainQuestion && (
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {q.text}
                  </h3>
                )}
                <RadioGroup
                  value={responseValue || ""}
                  onValueChange={(value) =>
                    handlePreAssessmentResponse(q.id, value)
                  }
                >
                  <div className="grid gap-3">
                    {q.options.map((option) => (
                      <OptionBox
                        key={option.value}
                        value={option.value}
                        id={`${q.id}-${option.value}`}
                        testId={`option-${q.id}-${option.value}`}
                      >
                        {getOptionText(option)}
                      </OptionBox>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            );
          })}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              data-testid="button-previous"
              disabled={currentPreAssessmentIndex === 0}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 hover:border hover:border-primary/20 hover:rounded-lg px-3 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-gray-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {/* Check if we can proceed to next */}
            {(() => {
              const hasMainResponse = preAssessmentResponses[question.id];
              const allConditionalAnswered =
                !hasConditionalQuestions ||
                !showConditional ||
                (selectedOption?.additionalQuestions?.every(
                  (cq) => preAssessmentResponses[cq.id],
                ) ??
                  true);

              const canProceed = hasMainResponse && allConditionalAnswered;
              const isLastQuestion =
                currentPreAssessmentIndex === preAssessmentQuestions.length - 1;
              const allQuestionsCompleted =
                areAllPreAssessmentQuestionsAnswered();

              return (
                <Button
                  onClick={handleNext}
                  disabled={
                    !canProceed || (isLastQuestion && !allQuestionsCompleted)
                  }
                  data-testid="button-next"
                  className="ml-auto"
                >
                  {isLastQuestion ? "Start Assessment" : "Next"}
                </Button>
              );
            })()}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render current question
  const renderCurrentQuestion = () => {
    if (currentPhase === "likert") {
      const question = likertQuestions[currentQuestionIndex];
      if (!question) return null;

      const archetypeName = question.archetype
        ? category.archetypes.find((a) => a.id === question.archetype)?.name
        : null;

      return (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {question.text}
              </h1>
              {archetypeName && <div className="mt-2"></div>}
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={responses[question.id]?.toString() || ""}
              onValueChange={(value) => {
                const selectedValue = question.options?.length
                  ? value
                  : getStandardLikertValue(value);
                handleResponseSelect(question.id, selectedValue);
              }}
            >
              <div className="grid gap-3">
                {question.type === "demographic" ||
                (question.options && question.options.length > 0)
                  ? question.options?.map((option) => (
                      <OptionBox
                        key={option.value}
                        value={option.value}
                        id={`${question.id}-${option.value}`}
                        testId={`option-${question.id}-${option.value}`}
                      >
                        {getOptionText(option)}
                      </OptionBox>
                    )) || []
                  : getStandardLikertOptions().map(([label, value]) => (
                      <OptionBox
                        key={value}
                        value={label}
                        id={`${question.id}-${value}`}
                        testId={`option-${question.id}-${value}`}
                      >
                        {label.charAt(0).toUpperCase() +
                          label.slice(1).replace("-", " ")}
                      </OptionBox>
                    ))}
              </div>
            </RadioGroup>

            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrevious}
                data-testid="button-previous"
                disabled={
                  currentPhase === "likert" &&
                  currentQuestionIndex === 0 &&
                  preAssessmentQuestions.length === 0
                }
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 hover:border hover:border-primary/20 hover:rounded-lg px-3 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-gray-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
            </div>
          </CardContent>
        </Card>
      );
    } else {
      const block = forcedChoiceBlocks[currentBlockIndex];
      if (!block) return null;

      const currentResponse = (responses[block.id] as {
        mostLikeMe: string;
        leastLikeMe: string;
      }) || { mostLikeMe: "", leastLikeMe: "" };

      return (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Choose "Most Like Me" and "Least Like Me"
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Select one statement that is most like you and one that is least
                like you.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {block.statements.map((statement) => (
                <div key={statement.text} className="border rounded-lg p-4">
                  <p className="mb-3 text-sm">{statement.text}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handleForcedChoiceSelect(
                          block.id,
                          statement.text,
                          "most",
                        )
                      }
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                        currentResponse.mostLikeMe === statement.archetype
                          ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-green-900/20"
                      }`}
                      data-testid={`most-${block.id}-${statement.text}`}
                      disabled={
                        currentResponse.leastLikeMe === statement.archetype
                      }
                    >
                      Most Like Me
                    </button>
                    <button
                      onClick={() =>
                        handleForcedChoiceSelect(
                          block.id,
                          statement.text,
                          "least",
                        )
                      }
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                        currentResponse.leastLikeMe === statement.archetype
                          ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-400 dark:text-red-300"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-red-900/20"
                      }`}
                      data-testid={`least-${block.id}-${statement.text}`}
                      disabled={
                        currentResponse.mostLikeMe === statement.archetype
                      }
                    >
                      Least Like Me
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrevious}
                data-testid="button-previous"
                disabled={
                  currentPhase === "forced-choice" &&
                  currentBlockIndex === 0 &&
                  currentQuestionIndex === 0 &&
                  preAssessmentQuestions.length === 0
                }
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 hover:border hover:border-primary/20 hover:rounded-lg px-3 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-gray-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            <h1 className="text-xl font-semibold">{category?.name}</h1>
          </div>
          {currentPhase === "likert" &&
            likertQuestions[currentQuestionIndex]?.archetype && (
              <div className="inline-flex items-center justify-center px-6 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-sm font-medium text-primary">
                  {
                    category?.archetypes.find(
                      (a) =>
                        a.id ===
                        likertQuestions[currentQuestionIndex].archetype,
                    )?.name
                  }
                </span>
              </div>
            )}
          <Progress
            value={progressInfo.progress}
            className="w-full max-w-md mx-auto"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Question {progressInfo.current} of {progressInfo.total}
          </div>
        </div>
        {currentPhase === "pre-assessment"
          ? renderPreAssessmentQuestion()
          : renderCurrentQuestion()}
      </div>
    </div>
  );
}
