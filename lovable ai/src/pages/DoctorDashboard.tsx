import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  Eye,
  CheckCircle,
  Users,
  CalendarCheck,
  TrendingUp
} from "lucide-react";

const DoctorDashboard = () => {
  const todayAppointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "9:00 AM",
      type: "General Checkup",
      status: "completed",
    },
    {
      id: 2,
      patient: "Emma Wilson",
      time: "9:30 AM",
      type: "Follow-up",
      status: "completed",
    },
    {
      id: 3,
      patient: "Michael Brown",
      time: "10:00 AM",
      type: "Consultation",
      status: "in-progress",
    },
    {
      id: 4,
      patient: "Sarah Davis",
      time: "10:30 AM",
      type: "General Checkup",
      status: "pending",
    },
    {
      id: 5,
      patient: "Robert Johnson",
      time: "11:00 AM",
      type: "Lab Results Review",
      status: "pending",
    },
    {
      id: 6,
      patient: "Lisa Anderson",
      time: "11:30 AM",
      type: "Follow-up",
      status: "pending",
    },
  ];

  const stats = [
    { label: "Today's Patients", value: "12", icon: Users, color: "text-primary" },
    { label: "Completed", value: "5", icon: CalendarCheck, color: "text-success" },
    { label: "Pending", value: "7", icon: Clock, color: "text-warning" },
    { label: "This Week", value: "48", icon: TrendingUp, color: "text-accent-foreground" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
            <CheckCircle className="h-3 w-3" />
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Clock className="h-3 w-3" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Good Morning, Dr. Sarah
          </h1>
          <p className="text-muted-foreground mt-2">
            You have 12 appointments scheduled for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-soft border border-border p-5 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Appointments */}
        <div className="bg-card rounded-2xl shadow-card border border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg healthcare-gradient flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Today's Appointments
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    January 16, 2026
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Full Schedule
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Patient
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((appointment, index) => (
                  <tr
                    key={appointment.id}
                    className={`border-b border-border hover:bg-secondary/20 transition-colors ${
                      appointment.status === "in-progress" ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {appointment.time}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {appointment.patient}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-muted-foreground">
                        {appointment.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        {appointment.status === "pending" && (
                          <Button variant="success" size="sm">
                            <CheckCircle className="h-4 w-4" />
                            Complete
                          </Button>
                        )}
                        {appointment.status === "in-progress" && (
                          <Button variant="success" size="sm">
                            <CheckCircle className="h-4 w-4" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
