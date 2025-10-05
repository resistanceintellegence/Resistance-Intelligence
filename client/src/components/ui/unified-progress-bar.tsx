import { Badge } from "@/components/ui/badge";
import {
  calculateUnifiedAssessmentProgress,
  type AssessmentPhaseConfig,
} from "../../../shared/assessment-progress-utils";

interface UnifiedProgressBarProps {
  phase1Questions: number;
  phase2Questions: number;
  currentPhase: 1 | 2;
  currentQuestionIndex: number;
  color: "pink" | "green" | "blue" | "purple";
  contextIcon?: string;
  contextLabel?: string;
  phaseText: string;
}

export function UnifiedProgressBar({
  phase1Questions,
  phase2Questions,
  currentPhase,
  currentQuestionIndex,
  color,
  contextIcon,
  contextLabel,
  phaseText,
}: UnifiedProgressBarProps) {
  const progressData = calculateUnifiedAssessmentProgress({
    phase1Questions,
    phase2Questions,
    currentPhase,
    currentQuestionIndex,
  });

  const colorClasses = {
    pink: "bg-gradient-to-r from-pink-500 to-pink-600",
    green: "bg-gradient-to-r from-green-500 to-green-600",
    blue: "bg-gradient-to-r from-blue-500 to-blue-600",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600",
  };

  return (
    <div className="text-center space-y-4">
      <Badge variant="outline" className="mb-4">
        {contextIcon && contextLabel && `${contextIcon} ${contextLabel} - `}
        {phaseText}
      </Badge>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        {progressData.progressPercentage}% Complete
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`${colorClasses[color]} h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-2`}
          style={{ width: `${progressData.progressPercentage}%` }}
        >
          {progressData.progressPercentage > 0 && (
            <span className="text-xs font-semibold text-white">
              {progressData.progressPercentage}%
            </span>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-500">
        Phase {currentPhase}: {phaseText}
      </div>
    </div>
  );
}
