import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import ProfilePage from "@/pages/profile";
import AdminPage from "@/pages/admin";
import ResistanceMapPage from "@/pages/resistance-map";
import Assessment from "@/pages/assessment";
import FreeAssessment from "@/pages/free-assessment";
import FreeResults from "@/pages/free-results";
import Results from "@/pages/results";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/free-assessment/:type" component={FreeAssessment} />
      <Route path="/free-results/:type" component={FreeResults} />
      <Route path="/auth/login">
        <LoginPage />
      </Route>
      <Route path="/auth/register">
        <RegisterPage />
      </Route>
      <Route path="/auth/forgot-password">
        <ForgotPasswordPage />
      </Route>
      
      {/* Profile route */}
      <ProtectedRoute path="/profile" component={ProfilePage} />
      
      {/* Admin route */}
      <ProtectedRoute path="/admin" component={AdminPage} />
      
      {/* Resistance Map route */}
      <ProtectedRoute path="/resistance-map" component={ResistanceMapPage} />
      
      {/* Paid assessment routes - require authentication */}
      <ProtectedRoute path="/assessment/:type" component={Assessment} />
      <ProtectedRoute path="/results/:type" component={Results} />
      
      {/* Protected routes */}
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      
      {/* Catch all */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
