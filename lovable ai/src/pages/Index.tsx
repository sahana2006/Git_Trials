import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, Shield, Users, CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments with your preferred doctors in just a few clicks.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Manage your healthcare anytime, anywhere from any device.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health information is protected with enterprise-grade security.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up with your basic information in under 2 minutes.",
    },
    {
      number: "02",
      title: "Choose Doctor",
      description: "Browse available doctors and select based on specialty.",
    },
    {
      number: "03",
      title: "Book Appointment",
      description: "Pick a date and time that works for your schedule.",
    },
    {
      number: "04",
      title: "Visit & Heal",
      description: "Attend your appointment and receive quality care.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/30" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Healthcare Made
              <span className="text-primary"> Simple</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Book appointments, manage your health records, and connect with trusted healthcare providers—all in one secure platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <Button variant="hero" size="xl">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl">
                  Login to Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose MediCare?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              We've designed our platform with patients in mind—simple, secure, and efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-background border border-border hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl healthcare-gradient flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Getting started with MediCare is quick and easy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of patients who trust MediCare for their healthcare needs.
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg">
                Get Started Today
                <CheckCircle className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
