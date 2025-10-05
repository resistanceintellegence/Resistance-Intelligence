import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DoorOpen } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !isValidEmail(formData.email)) return;

    try {
      await loginMutation.mutateAsync(formData);
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
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-6">
          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <DoorOpen className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            The Success Formula
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back to your transformation journey
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="name@email.com"
              required
              className="w-full border-gray-300 rounded-md p-2"
              data-testid="input-email"
            />
            {formData.email && !isValidEmail(formData.email) && (
              <p className="text-xs text-red-500 text-left">Please enter a valid email address</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-left block text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              className="w-full border-gray-300 rounded-md p-2"
              data-testid="input-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/50"
            disabled={!formData.email || !formData.password || !isValidEmail(formData.email)}
            data-testid="button-login"
          >
            Sign In
          </Button>
          <div className="text-center text-sm">
            <Button
              variant="link"
              onClick={() => setLocation("/auth/forgot-password")}
              className="text-primary hover:text-primary/80 p-0"
              data-testid="link-forgot-password"
            >
              Forgot your password?
            </Button>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => setLocation("/auth/register")}
                className="text-primary hover:text-primary/80 p-0"
                data-testid="link-register"
              >
                Sign up here
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
