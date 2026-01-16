import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  Stethoscope
} from "lucide-react";

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", available: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Cardiologist", available: true },
    { id: 3, name: "Dr. Emily Davis", specialty: "Dermatologist", available: false },
    { id: 4, name: "Dr. Robert Wilson", specialty: "Orthopedic", available: true },
    { id: 5, name: "Dr. Lisa Anderson", specialty: "Neurologist", available: true },
    { id: 6, name: "Dr. James Brown", specialty: "Pediatrician", available: true },
  ];

  const dates = [
    { date: "2026-01-20", display: "Mon, Jan 20", slots: 5 },
    { date: "2026-01-21", display: "Tue, Jan 21", slots: 3 },
    { date: "2026-01-22", display: "Wed, Jan 22", slots: 8 },
    { date: "2026-01-23", display: "Thu, Jan 23", slots: 2 },
    { date: "2026-01-24", display: "Fri, Jan 24", slots: 6 },
    { date: "2026-01-25", display: "Sat, Jan 25", slots: 4 },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  ];

  const steps = [
    { number: 1, label: "Select Doctor", icon: User },
    { number: 2, label: "Choose Date", icon: Calendar },
    { number: 3, label: "Pick Time", icon: Clock },
    { number: 4, label: "Confirm", icon: CheckCircle2 },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedDoctor !== null;
      case 2: return selectedDate !== null;
      case 3: return selectedTime !== null;
      default: return true;
    }
  };

  const getSelectedDoctor = () => doctors.find(d => d.id === selectedDoctor);
  const getSelectedDate = () => dates.find(d => d.date === selectedDate);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Follow the steps below to schedule your visit
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.number
                        ? "healthcare-gradient text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 ${
                    currentStep > step.number ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 animate-scale-in">
            {/* Step 1: Select Doctor */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Select a Doctor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      disabled={!doctor.available}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedDoctor === doctor.id
                          ? "border-primary bg-primary/5"
                          : doctor.available
                          ? "border-border hover:border-primary/50 hover:bg-secondary/50"
                          : "border-border bg-muted/50 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          selectedDoctor === doctor.id ? "bg-primary/10" : "bg-secondary"
                        }`}>
                          <Stethoscope className={`h-6 w-6 ${
                            selectedDoctor === doctor.id ? "text-primary" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                      </div>
                      {!doctor.available && (
                        <span className="text-xs text-destructive mt-2 block">
                          Currently unavailable
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Choose a Date
                </h2>
                <p className="text-muted-foreground mb-6">
                  Appointment with {getSelectedDoctor()?.name}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dates.map((date) => (
                    <button
                      key={date.date}
                      onClick={() => setSelectedDate(date.date)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        selectedDate === date.date
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50"
                      }`}
                    >
                      <Calendar className={`h-5 w-5 mx-auto mb-2 ${
                        selectedDate === date.date ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <p className="font-medium text-foreground">{date.display}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {date.slots} slots available
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Time */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Pick a Time Slot
                </h2>
                <p className="text-muted-foreground mb-6">
                  {getSelectedDoctor()?.name} on {getSelectedDate()?.display}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedTime === time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50 text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full healthcare-gradient flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Confirm Your Appointment
                </h2>
                <p className="text-muted-foreground mb-8">
                  Please review your appointment details below
                </p>
                <div className="bg-secondary/50 rounded-xl p-6 max-w-md mx-auto text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Doctor</p>
                      <p className="font-medium text-foreground">{getSelectedDoctor()?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Specialty</p>
                      <p className="font-medium text-foreground">{getSelectedDoctor()?.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{getSelectedDate()?.display}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{selectedTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="success">
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppointment;
