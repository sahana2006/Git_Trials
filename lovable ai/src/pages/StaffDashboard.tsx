import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  UserPlus
} from "lucide-react";

const StaffDashboard = () => {
  const appointmentQueue = [
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      time: "10:00 AM",
      status: "checked-in",
      waitTime: "5 min",
    },
    {
      id: 2,
      patient: "Emma Wilson",
      doctor: "Dr. Michael Chen",
      time: "10:15 AM",
      status: "waiting",
      waitTime: "12 min",
    },
    {
      id: 3,
      patient: "Michael Brown",
      doctor: "Dr. Sarah Johnson",
      time: "10:30 AM",
      status: "waiting",
      waitTime: "8 min",
    },
    {
      id: 4,
      patient: "Sarah Davis",
      doctor: "Dr. Robert Wilson",
      time: "10:45 AM",
      status: "arrived",
      waitTime: "2 min",
    },
    {
      id: 5,
      patient: "Robert Johnson",
      doctor: "Dr. Lisa Anderson",
      time: "11:00 AM",
      status: "scheduled",
      waitTime: "-",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
            <CheckCircle className="h-3 w-3" />
            Checked In
          </span>
        );
      case "waiting":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
            <Clock className="h-3 w-3" />
            Waiting
          </span>
        );
      case "arrived":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <User className="h-3 w-3" />
            Arrived
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            <Calendar className="h-3 w-3" />
            Scheduled
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage patient registrations and appointment queue
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - Quick Registration */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 sticky top-24 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg healthcare-gradient flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Quick Registration
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Register a walk-in patient
                  </p>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Input
                    id="reason"
                    placeholder="General checkup"
                    className="h-11"
                  />
                </div>

                <div className="pt-2">
                  <Button className="w-full" size="lg">
                    <UserPlus className="h-4 w-4" />
                    Register Patient
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Appointment Queue */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl shadow-card border border-border animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Appointment Queue
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        5 patients in queue today
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                      2 Checked In
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-sm font-medium">
                      2 Waiting
                    </div>
                  </div>
                </div>
              </div>

              {/* Queue List */}
              <div className="divide-y divide-border">
                {appointmentQueue.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className="p-5 hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {appointment.patient}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {appointment.time}
                            </span>
                            {appointment.waitTime !== "-" && (
                              <span className="text-xs text-muted-foreground">
                                Wait: {appointment.waitTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(appointment.status)}
                        {(appointment.status === "arrived" || appointment.status === "waiting") && (
                          <Button size="sm" variant="success">
                            <CheckCircle className="h-4 w-4" />
                            Check In
                          </Button>
                        )}
                        {appointment.status === "checked-in" && (
                          <Button size="sm" variant="secondary">
                            <ArrowRight className="h-4 w-4" />
                            Send to Doctor
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StaffDashboard;
