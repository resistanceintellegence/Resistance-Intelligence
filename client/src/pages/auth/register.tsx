import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { user, registerMutation } = useAuth();
  const [step, setStep] = useState(1); // Track current step (1 or 2)
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const handleStepOneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !isValidEmail(formData.email)) {
      return;
    }

    setEmailError("");
    setCheckingEmail(true);

    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error || "This email is already registered");
        setCheckingEmail(false);
        return;
      }

      // Email is available, proceed to step 2
      setCheckingEmail(false);
      setStep(2);
    } catch (error) {
      console.error("Email check error:", error);
      setEmailError("Failed to verify email. Please try again.");
      setCheckingEmail(false);
    }
  };

  const handleStepTwoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, confirmPassword, firstName } = formData;

    if (!email || !password || !confirmPassword || !firstName) return;

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      setLocation("/dashboard");
    } catch (error) {
      // Error is handled by the mutation's onError
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear email error when user starts typing
    if (e.target.name === "email" && emailError) {
      setEmailError("");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = formData.password.length >= 8;
  const isConfirmPasswordValid = formData.confirmPassword.length >= 8;
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length > 0;

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Unlock your complete analysis
          </h1>
          <p className="text-gray-600 mb-6">
            Enter your email to save your personalized insights and come back
            anytime.
          </p>
          <form onSubmit={handleStepOneSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-left block text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="w-full border-gray-300 rounded-md p-2"
                data-testid="input-email"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/50"
              disabled={!formData.email || !isValidEmail(formData.email) || checkingEmail}
              data-testid="button-continue"
            >
              {checkingEmail ? "Checking..." : "Continue →"}
            </Button>
            {formData.email && !isValidEmail(formData.email) && (
              <p className="text-xs text-red-500 text-left">
                Please enter a valid email address
              </p>
            )}
            {emailError && (
              <p className="text-xs text-red-500 text-left">
                {emailError}
              </p>
            )}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => setLocation("/auth/login")}
                className="text-primary hover:text-primary/80 p-0"
                data-testid="link-login"
              >
                Sign in
              </Button>
            </div>
            <div className="text-xs text-gray-500 space-y-1 mt-2">
              <p>We'll never sell your data. Unsubscribe anytime.</p>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Just a few details to save your results securely.
          </h1>
          <form onSubmit={handleStepTwoSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-left block text-gray-700"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  className="w-full border-gray-300 rounded-md p-2"
                  data-testid="input-firstName"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-left block text-gray-700"
                >
                  Last name (optional)
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full border-gray-300 rounded-md p-2"
                  data-testid="input-lastName"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-left block text-gray-700"
              >
                Password (8+ characters)
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter a strong password"
                required
                minLength={8}
                className="w-full border-gray-300 rounded-md p-2"
                data-testid="input-password"
              />
              {formData.password && !isPasswordValid && (
                <p className="text-xs text-red-500">
                  Password must be at least 8 characters
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-left block text-gray-700"
              >
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                minLength={8}
                className="w-full border-gray-300 rounded-md p-2"
                data-testid="input-confirmPassword"
              />
              {formData.confirmPassword && !isConfirmPasswordValid && (
                <p className="text-xs text-red-500">
                  Password must be at least 8 characters
                </p>
              )}
              {formData.confirmPassword &&
                isConfirmPasswordValid &&
                !doPasswordsMatch && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                className="flex-1 bg-white text-primary border border-primary py-2 rounded-md hover:bg-[#fafafa]"
                onClick={() => setStep(1)}
                data-testid="button-back"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/50"
                disabled={
                  registerMutation.isPending ||
                  !formData.email ||
                  !formData.firstName ||
                  !isPasswordValid ||
                  !isConfirmPasswordValid ||
                  !doPasswordsMatch
                }
                data-testid="button-register"
              >
                Create Account
              </Button>
            </div>
            <div className="text-xs text-gray-500 space-y-1 mt-2">
              <p>We'll never sell your data. Unsubscribe anytime.</p>
              {/* <p>
                By continuing, you agree to our{" "}
                <a href="#" className="text-primary hover:text-primary/80">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:text-primary/80">
                  Privacy
                </a>
                .
              </p> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
