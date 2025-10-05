import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegistrationModal({ isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, this would create the account
      // For now, we'll simulate success and redirect to login
      console.log("Registration data:", data);
      
      toast({
        title: "Account Created",
        description: "Please log in to access your complete assessment report.",
      });
      
      // Redirect to login
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="registration-modal">
      <div className="bg-card rounded-lg border border-border max-w-md w-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          data-testid="button-close-modal"
        >
          <i className="fas fa-times"></i>
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="modal-title">
            Get Your Complete Report
          </h3>
          <p className="text-muted-foreground" data-testid="modal-description">
            Create your account to access the full resistance analysis
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your first name" 
                      {...field} 
                      data-testid="input-first-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your last name" 
                      {...field} 
                      data-testid="input-last-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your work email" 
                      {...field} 
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Create a password" 
                      {...field} 
                      data-testid="input-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="text-xs text-muted-foreground" data-testid="privacy-notice">
              By creating an account, you agree to receive insights and updates about resistance breakthrough strategies.
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              data-testid="button-create-account"
            >
              {isSubmitting ? "Creating Account..." : "Create Account & Get Report"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
