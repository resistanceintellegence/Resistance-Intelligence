import { useState, useEffect } from "react";
type ResponseType = number | { most: number; least: number };

interface QuestionDisplayProps {
  question: string;
  selectedResponse?: ResponseType;
  onResponseSelect: (response: ResponseType) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  isSubmitting: boolean;
}

export function QuestionDisplay({
  question,
  selectedResponse,
  onResponseSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  isSubmitting,
}: QuestionDisplayProps) {
  const isForcedChoiceQuestion = question
    .toLowerCase()
    .includes("pick most like me and least like me");

  let letters: string[] = [];
  if (/[A-Z]\)/.test(question)) {
    letters = ["A", "B", "C", "D", "E", "F"];
  } else if (/[a-z]\)/.test(question)) {
    letters = ["a", "b", "c", "d", "e", "f"];
  }
  const isMultipleChoiceQuestion = letters.length > 0;

  const getMultipleChoiceOptions = () => {
    if (!isMultipleChoiceQuestion) return null;

    const options: { letter: string; text: string; value: number }[] = [];

    for (let i = 0; i < letters.length; i++) {
      const currentLetter = letters[i];
      const nextLetter = letters[i + 1];

      if (!question.includes(`${currentLetter})`)) break;

      let optionText: string;

      if (nextLetter && question.includes(`${nextLetter})`)) {
        const regex = new RegExp(
          `${currentLetter}\\)[\\s·]*(.+?)[\\s·]*${nextLetter}\\)`,
          "s",
        );
        optionText =
          question.match(regex)?.[1]?.trim() || `Option ${currentLetter}`;
      } else {
        const regex = new RegExp(`${currentLetter}\\)[\\s·]*(.+?)$`, "s");
        optionText =
          question.match(regex)?.[1]?.trim() || `Option ${currentLetter}`;
      }

      const totalOptions = letters.filter((l) =>
        question.includes(`${l})`),
      ).length;
      let value: number;

      if (totalOptions === 2) {
        value = i === 0 ? 5 : 1;
      } else if (totalOptions === 3) {
        value = i === 0 ? 5 : i === 1 ? 3 : 1;
      } else if (totalOptions === 4) {
        value = i === 0 ? 5 : i === 1 ? 4 : i === 2 ? 2 : 1;
      } else {
        value = 5 - i;
      }

      options.push({
        letter: currentLetter.toUpperCase(),
        text: optionText,
        value: value,
      });
    }

    return options;
  };

  const getForcedChoiceOptions = () => {
    if (!isForcedChoiceQuestion) return null;
    const parts = question.split(":");
    if (parts.length < 2) return [];
    const optionsPart = parts.slice(1).join(":").trim();
    const matches = [...optionsPart.matchAll(/['“"](.*?)['"”]/g)].map((m) =>
      m[1].trim(),
    );
    return matches;
  };

  const getQuestionText = () => {
    if (isForcedChoiceQuestion) {
      return question.split(":")[0].trim();
    }
    if (!isMultipleChoiceQuestion) return question;
    const firstLetter = letters[0];
    return question
      .split(`${firstLetter})`)[0]
      .replace(/[·\s]*$/, "")
      .trim();
  };

  const multipleChoiceOptions = getMultipleChoiceOptions();
  const forcedChoiceOptions = getForcedChoiceOptions();
  const questionText = getQuestionText();

  // For forced choice
  const [selectedMost, setSelectedMost] = useState<number | null>(null);
  const [selectedLeast, setSelectedLeast] = useState<number | null>(null);

  useEffect(() => {
    // Reset state when question changes to ensure selections are per question
    setSelectedMost(null);
    setSelectedLeast(null);
  }, [question]);

  useEffect(() => {
    if (typeof selectedResponse === "object" && selectedResponse !== null) {
      setSelectedMost(selectedResponse.most);
      setSelectedLeast(selectedResponse.least);
    } else {
      setSelectedMost(null);
      setSelectedLeast(null);
    }
  }, [selectedResponse]);

  useEffect(() => {
    if (
      selectedMost !== null &&
      selectedLeast !== null &&
      selectedMost !== selectedLeast
    ) {
      onResponseSelect({ most: selectedMost, least: selectedLeast });
      setTimeout(onNext, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMost, selectedLeast]);

  return (
    <div className="bg-card rounded-2xl border border-border/30 shadow-lg p-10 space-y-8">
      {/* Question */}
      <div className="text-center space-y-4">
        <h2
          id="question-text"
          className="text-2xl md:text-3xl font-semibold text-black leading-relaxed max-w-xl mx-auto"
          data-testid="question-text"
        >
          {questionText}
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Answer Options */}
      <div className="space-y-8">
        <div
          className="space-y-3 md:space-y-4"
          role="radiogroup"
          aria-labelledby="question-text"
        >
          {isForcedChoiceQuestion ? (
            // Updated forced choice layout with button-like selections for consistency
            <div className="space-y-4">
              {forcedChoiceOptions?.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
                  <span className="text-muted-foreground flex-1 text-left text-sm md:text-base">
                    {option}
                  </span>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        if (selectedLeast === index) return;
                        setSelectedMost(index);
                      }}
                      className={`
                        px-4 py-2 rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                        ${
                          selectedMost === index
                            ? "bg-primary border-primary text-white shadow-lg scale-105"
                            : "bg-white border-border hover:bg-primary hover:border-primary hover:text-white text-muted-foreground"
                        }
                      `}
                      aria-label={`Select ${option} as Most like me`}
                    >
                      <span className="text-xs md:text-sm font-bold">Most</span>
                    </button>
                    <button
                      onClick={() => {
                        if (selectedMost === index) return;
                        setSelectedLeast(index);
                      }}
                      className={`
                        px-4 py-2 rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                        ${
                          selectedLeast === index
                            ? "bg-destructive border-destructive text-white shadow-lg scale-105"
                            : "bg-white border-border hover:bg-destructive hover:border-destructive hover:text-white text-muted-foreground"
                        }
                      `}
                      aria-label={`Select ${option} as Least like me`}
                    >
                      <span className="text-xs md:text-sm font-bold">
                        Least
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : isMultipleChoiceQuestion ? (
            // Multiple choice question layout
            multipleChoiceOptions?.map((option) => {
              const isSelected = selectedResponse === option.value;

              const handleSelect = (selectedValue: number) => {
                onResponseSelect(selectedValue);
                setTimeout(() => {
                  onNext();
                }, 300);
              };

              return (
                <label
                  key={option.value}
                  className="cursor-pointer group block"
                >
                  <input
                    type="radio"
                    name="questionResponse"
                    value={option.value}
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => handleSelect(option.value)}
                    data-testid={`radio-response-${option.value}`}
                    aria-label={`${option.letter}) ${option.text}`}
                  />
                  <div
                    className={`
                      w-full h-auto min-h-12 md:min-h-14 border-2 transition-all duration-200 transform group-hover:scale-105
                      flex items-center justify-center my-2 rounded-lg text-center px-4 py-3
                      ${
                        isSelected
                          ? "bg-primary border-primary text-white shadow-lg scale-105"
                          : "bg-white border-border hover:bg-primary hover:border-primary hover:text-white text-muted-foreground"
                      }
                    `}
                  >
                    <span className="text-xs md:text-sm font-bold">
                      {option.letter}) {option.text}
                    </span>
                  </div>
                </label>
              );
            })
          ) : (
            // 5-point Likert scale
            [5, 4, 3, 2, 1].map((value, index) => {
              const labels = [
                "Strongly Agree",
                "Agree",
                "Neutral",
                "Disagree",
                "Strongly Disagree",
              ];
              const isSelected = selectedResponse === value;

              const handleSelect = (selectedValue: number) => {
                onResponseSelect(selectedValue);
                setTimeout(() => {
                  onNext();
                }, 300);
              };

              return (
                <label key={value} className="cursor-pointer group block">
                  <input
                    type="radio"
                    name="questionResponse"
                    value={value}
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => handleSelect(value)}
                    data-testid={`radio-response-${value}`}
                    aria-label={labels[index]}
                  />
                  <div
                    className={`
                      w-full h-12 md:h-14 border-2 transition-all duration-200 transform group-hover:scale-105
                      flex items-center justify-center my-2 rounded-lg text-center
                      ${
                        isSelected
                          ? "bg-primary border-primary text-white shadow-lg scale-105"
                          : "bg-white border-border hover:bg-primary hover:border-primary hover:text-white text-muted-foreground"
                      }
                    `}
                  >
                    <span className="text-xs md:text-sm font-bold">
                      <span className="hidden sm:block">{labels[index]}</span>
                      <span className="sm:hidden">
                        {labels[index] === "Strongly Agree" && "SA"}
                        {labels[index] === "Agree" && "A"}
                        {labels[index] === "Neutral" && "N"}
                        {labels[index] === "Disagree" && "D"}
                        {labels[index] === "Strongly Disagree" && "SD"}
                      </span>
                    </span>
                  </div>
                </label>
              );
            })
          )}
        </div>
      </div>

      {/* Navigation - Previous button only */}
      <div className="flex flex-col items-center pt-6 space-y-4">
        {canGoPrevious && (
          <button
            onClick={onPrevious}
            className="text-muted-foreground hover:text-primary flex items-center transition-all duration-200 px-4 py-2 rounded-lg hover:bg-muted/50"
            data-testid="button-previous"
          >
            <span className="mr-2 text-lg">←</span>
            <span className="font-medium">Previous</span>
          </button>
        )}

        {isSubmitting && (
          <div className="flex items-center text-muted-foreground">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            <span className="font-medium">Submitting...</span>
          </div>
        )}
      </div>
    </div>
  );
}
