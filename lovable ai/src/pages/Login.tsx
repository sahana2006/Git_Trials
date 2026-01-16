import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Calendar, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor" | "staff">("patient");

  const userTypes = [
    { id: "patient", label: "Patient" },
    { id: "doctor", label: "Doctor" },
    { id: "staff", label: "Staff" },
  ] as const;

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl healthcare-gradient">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-semibold text-foreground">MediCare</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl shadow-card border border-border p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to access your healthcare portal
              </p>
            </div>

            {/* User Type Selector */}
            <div className="flex p-1 bg-secondary rounded-lg mb-6">
              {userTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setUserType(type.id)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    userType === type.id
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
