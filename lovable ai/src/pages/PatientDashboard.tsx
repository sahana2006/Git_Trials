import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  ArrowRight,
  CalendarPlus,
  History,
  CheckCircle2,
  XCircle
} from "lucide-react";

const PatientDashboard = () => {
  const upcomingAppointment = {
    doctor: "Dr. Sarah Johnson",
    specialty: "General Physician",
    date: "January 20, 2026",
    time: "10:00 AM",
    location: "Room 203, Building A",
  };

  const appointmentHistory = [
    {
      id: 1,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "December 15, 2025",
      status: "completed",
    },
    {
      id: 2,
      doctor: "Dr. Emily Davis",
      specialty: "Dermatologist",
      date: "November 28, 2025",
      status: "completed",
    },
    {
      id: 3,
      doctor: "Dr. Robert Wilson",
      specialty: "Orthopedic",
      date: "October 10, 2025",
      status: "cancelled",
    },
  ];

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your healthcare appointments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Action Card */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 animate-slide-up">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Need to see a doctor?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a new appointment with one of our healthcare providers
                  </p>
                  <Link to="/book-appointment">
                    <Button variant="hero" size="lg">
                      <CalendarPlus className="h-5 w-5" />
                      Book New Appointment
                    </Button>
                  </Link>
                </div>
                <div className="w-24 h-24 rounded-2xl healthcare-gradient flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Upcoming Appointment */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Upcoming Appointment
                </h2>
                <span className="text-xs font-medium px-3 py-1 bg-accent text-accent-foreground rounded-full">
                  In 4 days
                </span>
              </div>
              <div className="bg-secondary/50 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {upcomingAppointment.doctor}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {upcomingAppointment.specialty}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{upcomingAppointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{upcomingAppointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{upcomingAppointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <Button variant="outline" size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Appointment History */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <History className="h-5 w-5 text-muted-foreground" />
                  Appointment History
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {appointmentHistory.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {appointment.doctor}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {appointment.specialty} • {appointment.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {appointment.status === "completed" ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                          <XCircle className="h-4 w-4" />
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Visits</span>
                  <span className="text-lg font-semibold text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Upcoming</span>
                  <span className="text-lg font-semibold text-primary">1</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Cancelled</span>
                  <span className="text-lg font-semibold text-destructive">1</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-slide-up" style={{ animationDelay: "250ms" }}>
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <User className="h-4 w-4" />
                  Update Profile
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <History className="h-4 w-4" />
                  Medical Records
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <Calendar className="h-4 w-4" />
                  View Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
