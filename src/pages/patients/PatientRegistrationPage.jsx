import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, User, Phone, Shield } from "lucide-react";

const steps = [
  { id: "personal", title: "Personal Info", icon: User },
  { id: "contact", title: "Contact & Emergency", icon: Phone },
  { id: "insurance", title: "Insurance Details", icon: Shield },
];

export default function PatientRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-10">
      <PageHeader 
        title="Patient Registration" 
        description="Register a new patient into the hospital management system."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Patients", path: "/patients" },
          { label: "Registration" }
        ]}
      />

      {/* Stepper */}
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const StepIcon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 flex-1">
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                  isActive 
                    ? "border-primary bg-primary text-primary-foreground shadow-md" 
                    : isCompleted 
                      ? "border-primary bg-primary-light text-primary" 
                      : "border-muted bg-surface text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
              </div>
              <span className={`text-xs font-medium mt-2 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {step.title}
              </span>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-[50%] right-[-50%] h-[2px] -z-10 ${
                    isCompleted ? "bg-primary" : "bg-muted"
                  }`} 
                />
              )}
            </div>
          );
        })}
      </div>

      <Card className="shadow-sm border-border rounded-xl">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>Please fill in the required information below.</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth <span className="text-destructive">*</span></Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender <span className="text-destructive">*</span></Label>
                <select id="gender" className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select id="bloodGroup" className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Residential Address</Label>
                <Input id="address" placeholder="123 Main St, Apt 4B" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="10001" />
              </div>
              
              <div className="md:col-span-2 mt-4 pt-4 border-t">
                <h4 className="text-sm font-semibold mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emName">Contact Name</Label>
                    <Input id="emName" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emRelation">Relationship</Label>
                    <Input id="emRelation" placeholder="Spouse" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emPhone">Contact Phone</Label>
                    <Input id="emPhone" placeholder="+1 (555) 999-9999" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insProvider">Insurance Provider</Label>
                <Input id="insProvider" placeholder="Blue Cross Blue Shield" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insPolicy">Policy Number</Label>
                <Input id="insPolicy" placeholder="POL-987654321" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insGroup">Group Number</Label>
                <Input id="insGroup" placeholder="GRP-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insExpiry">Expiry Date</Label>
                <Input id="insExpiry" type="date" />
              </div>
              
              <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-900 mt-4">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Verify Insurance</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                  You can verify the patient's active coverage instantly using our API integration.
                </p>
                <Button variant="outline" className="bg-white hover:bg-gray-50 text-blue-700 border-blue-200" size="sm">
                  Run Verification Check
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t bg-muted/10 pt-4">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep}>
              Next Step <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="mr-2 h-4 w-4" /> Complete Registration
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
