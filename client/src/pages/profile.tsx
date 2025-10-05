import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { User } from "@shared/schema";
import { useEffect } from "react";

const profileSchema = z.object({
  role: z.string().min(1, "Role is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  yearsExperience: z.string().min(1, "Experience level is required"),
  primaryGoal: z.string().min(1, "Primary goal is required"),
  teamSizeManaged: z.string().min(1, "Team size is required"),
  decisionEnvironment: z.string().min(1, "Decision environment is required"),
  keyChallenges: z.array(z.string()).min(1, "Select at least one challenge"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const challenges = [
  "Delegation",
  "Conflict",
  "Risk-taking",
  "Vision execution",
  "Communication",
  "Time management",
  "Team motivation",
];

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/profile"],
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      role: "",
      companySize: "",
      industry: "",
      yearsExperience: "",
      primaryGoal: "",
      teamSizeManaged: "",
      decisionEnvironment: "",
      keyChallenges: [],
    },
  });

  // Reset form when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        role: user.role || "",
        companySize: user.companySize || "",
        industry: user.industry || "",
        yearsExperience: user.yearsExperience || "",
        primaryGoal: user.primaryGoal || "",
        teamSizeManaged: user.teamSizeManaged || "",
        decisionEnvironment: user.decisionEnvironment || "",
        keyChallenges: user.keyChallenges || [],
      });
    }
  }, [user, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiRequest("PUT", "/api/profile", data);
      return response.json();
    },
    onSuccess: async (updatedUser) => {
      // Update the cache immediately with the new user data
      queryClient.setQueryData(["/api/user"], updatedUser);
      queryClient.setQueryData(["/api/profile"], updatedUser);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      // Small delay to ensure cache update propagates
      setTimeout(() => {
        setLocation("/dashboard");
      }, 100);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent px-8 py-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              Complete Your Profile
            </h1>
            <p className="text-white/90 text-lg">
              Help us tailor your assessment experience by providing some
              information about yourself.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-8 space-y-8"
            >
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Professional Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tell us about your role and organization
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Role/Position
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-role"
                            className="bg-[#fafafa] border-gray-300"
                          >
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Executive">Executive</SelectItem>
                          <SelectItem value="Mid-level Manager">
                            Mid-level Manager
                          </SelectItem>
                          <SelectItem value="Team Lead">Team Lead</SelectItem>
                          <SelectItem value="Individual Contributor">
                            Individual Contributor
                          </SelectItem>
                          <SelectItem value="Entrepreneur">
                            Entrepreneur
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Company Size
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-company-size"
                            className="bg-[#fafafa] border-gray-300"
                          >
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Solo">Solo</SelectItem>
                          <SelectItem value="Micro Startup">
                            Micro Startup
                          </SelectItem>
                          <SelectItem value="SMB">SMB</SelectItem>
                          <SelectItem value="Mid-size">Mid-size</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Industry
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-industry"
                            className="bg-[#fafafa] border-gray-300"
                          >
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tech">Tech</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Construction">
                            Construction
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Years in Leadership / Experience Level
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., 5 years or Mid-level"
                          data-testid="input-years-experience"
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 pt-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Goals & Context
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Help us understand your objectives and environment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="primaryGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Primary Reason for Assessment
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-primary-goal"
                            className="bg-[#fafafa] border-gray-300"
                          >
                            <SelectValue placeholder="Select your primary goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Improve leadership agility">
                            Improve leadership agility
                          </SelectItem>
                          <SelectItem value="Build stronger team collaboration">
                            Build stronger team collaboration
                          </SelectItem>
                          <SelectItem value="Balance short-term vs. long-term">
                            Balance short-term vs. long-term
                          </SelectItem>
                          <SelectItem value="Prepare for promotion">
                            Prepare for promotion
                          </SelectItem>
                          <SelectItem value="Personal growth">
                            Personal growth
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamSizeManaged"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Team Size Managed
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., 5-10 people"
                          data-testid="input-team-size"
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="decisionEnvironment"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-900 dark:text-white font-medium">
                        Decision-Making Environment
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-decision-environment"
                            className="bg-[#fafafa] border-gray-300"
                          >
                            <SelectValue placeholder="Select your environment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Stable">Stable</SelectItem>
                          <SelectItem value="Volatile">Volatile</SelectItem>
                          <SelectItem value="Growth">Growth</SelectItem>
                          <SelectItem value="Turnaround">Turnaround</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 pt-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Key Challenges
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select the areas where you'd like to improve
                </p>
              </div>

              <FormField
                control={form.control}
                name="keyChallenges"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {challenges.map((challenge) => (
                        <FormField
                          key={challenge}
                          control={form.control}
                          name="keyChallenges"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-[#fafafa] dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-colors">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(challenge)}
                                  onCheckedChange={(checked) => {
                                    const updatedChallenges = checked
                                      ? [...(field.value || []), challenge]
                                      : field.value?.filter(
                                          (val) => val !== challenge,
                                        ) || [];
                                    field.onChange(updatedChallenges);
                                  }}
                                  data-testid={`checkbox-challenge-${challenge.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="data-[state=checked]:bg-primary"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex-1">
                                {challenge}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-save-profile"
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Profile & Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
