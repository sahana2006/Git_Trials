import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Calendar, Mail, Lock, User, Phone, Eye, EyeOff, MapPin, CreditCard } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl animate-slide-up">
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
              <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
              <p className="text-muted-foreground mt-2">
                Register as a patient to start booking appointments
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="dob"
                      type="date"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Address
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main Street"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" type="text" placeholder="New York" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" type="text" placeholder="NY" className="h-12" />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" type="text" placeholder="10001" className="h-12" />
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Account Details
                </h3>
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
                  <Label htmlFor="password">Password</Label>
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
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters with one uppercase and one number
                  </p>
                </div>
              </div>

              {/* Insurance (Optional) */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Insurance Information <span className="text-muted-foreground font-normal">(Optional)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      type="text"
                      placeholder="Blue Cross"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceId">Member ID</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="insuranceId"
                        type="text"
                        placeholder="ABC123456"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
