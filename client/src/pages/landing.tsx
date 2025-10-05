import { AssessmentCategories } from "@/components/assessment-categories";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Landing() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-lg backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                className="text-2xl font-bold text-black"
                data-testid="header-title"
              >
                Resistance Intelligence
              </h1>
            </div>
            {user && (
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setLocation("/")}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
                  data-testid="nav-assessments"
                >
                  Assessments
                </button>
                <button
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
                  data-testid="nav-support"
                >
                  Support
                </button>
              </nav>
            )}
            <div className="flex items-center space-x-4">
              {!user ? (
                <button
                  onClick={() => setLocation("/auth/login")}
                  className="bg-primary text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                  data-testid="button-login"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => setLocation("/dashboard")}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium"
                  data-testid="button-dashboard"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Assessment Categories Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your Assessment Path
            </h2>
            <p className="text-black max-w-2xl mx-auto font-medium text-[20px]">
              Select the area where you'd like to identify and breakthrough
              resistance patterns
            </p>
          </div>

          <AssessmentCategories isAuthenticated={!!user} />
        </div>
      </section>
    </div>
  );
}
