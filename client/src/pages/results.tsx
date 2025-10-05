import { useRoute } from "wouter";
import ResultsTemplate from "@/lib/paid-assessments/templates/ResultsTemplate";

export default function Results() {
  const [, params] = useRoute("/results/:type");
  const categoryId = params?.type || "";

  return <ResultsTemplate categoryId={categoryId} />;
}