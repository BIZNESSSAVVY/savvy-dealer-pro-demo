import { useState, useEffect } from "react";
import { FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
  "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

interface InventoryVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  vin: string;
}

const Financing = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [textConsentChecked, setTextConsentChecked] = useState(false);
  const [hasCoBuyer, setHasCoBuyer] = useState(false);
  const [inventoryVehicles, setInventoryVehicles] = useState<InventoryVehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", address1: "", address2: "",
    city: "", state: "", zip: "", ssn: "", dob: "", dlNumber: "", dlState: "",
    dlExp: "", mobilePhone: "", homePhone: "", email: "", residenceYears: "0",
    residenceMonths: "0", residenceType: "", rentMortgage: "", employer: "",
    employerType: "", monthlyIncome: "", occupation: "", employerAddress1: "",
    employerAddress2: "", employerCity: "", employerState: "", employerZip: "",
    workPhone: "", jobYears: "0", jobMonths: "0", vehicleToFinance: "",
    stockNumber: "", year: "", make: "", model: "", trim: "", vin: "",
    mileage: "", checkingAccount: "", checkingAccountNumber: "",
    checkingBankName: "", checkingBankAddress1: "", checkingBankAddress2: "",
    checkingBankCity: "", checkingBankState: "", checkingBankZip: "",
    checkingBankPhone: "", savingsAccount: "", savingsAccountNumber: "",
    savingsBankName: "", savingsBankAddress1: "", savingsBankAddress2: "",
    savingsBankCity: "", savingsBankState: "", savingsBankZip: "",
    savingsBankPhone: "", loanTerm: "", amountRequired: "", downpayment: "",
    additionalComments: ""
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesCollection = collection(db, "vehicles");
        const vehiclesSnapshot = await getDocs(vehiclesCollection);
        const vehiclesList = vehiclesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            year: data.year || 0,
            make: data.make || "",
            model: data.model || "",
            vin: data.vin || ""
          };
        });
        
        vehiclesList.sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return a.make.localeCompare(b.make);
        });
        
        setInventoryVehicles(vehiclesList);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoadingVehicles(false);
      }
    };

    fetchVehicles();
  }, [toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVehicleSelect = (vehicleString: string) => {
    handleInputChange("vehicleToFinance", vehicleString);
    
    const selectedVehicle = inventoryVehicles.find(v => 
      `${v.year} ${v.make} ${v.model} - VIN: ${v.vin}` === vehicleString
    );
    
    if (selectedVehicle) {
      handleInputChange("year", selectedVehicle.year.toString());
      handleInputChange("make", selectedVehicle.make);
      handleInputChange("model", selectedVehicle.model);
      handleInputChange("vin", selectedVehicle.vin);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consentChecked) {
      toast({
        title: "Consent Required",
        description: "Please acknowledge and consent to the credit application terms.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "creditApplications"), {
        ...formData,
        hasCoBuyer,
        consentAcknowledged: consentChecked,
        textConsentAcknowledged: textConsentChecked,
        submittedAt: new Date().toISOString()
      });

      try {
        const response = await fetch('/api/send-financing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            hasCoBuyer,
            consentAcknowledged: consentChecked,
            textConsentAcknowledged: textConsentChecked
          })
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('API error:', data);
        }
      } catch (apiError) {
        console.error("Notification error:", apiError);
      }

      toast({
        title: "Application Submitted!",
        description: "Your credit application has been received. We'll contact you shortly."
      });

      setFormData({
        firstName: "", middleName: "", lastName: "", address1: "", address2: "",
        city: "", state: "", zip: "", ssn: "", dob: "", dlNumber: "", dlState: "",
        dlExp: "", mobilePhone: "", homePhone: "", email: "", residenceYears: "0",
        residenceMonths: "0", residenceType: "", rentMortgage: "", employer: "",
        employerType: "", monthlyIncome: "", occupation: "", employerAddress1: "",
        employerAddress2: "", employerCity: "", employerState: "", employerZip: "",
        workPhone: "", jobYears: "0", jobMonths: "0", vehicleToFinance: "",
        stockNumber: "", year: "", make: "", model: "", trim: "", vin: "",
        mileage: "", checkingAccount: "", checkingAccountNumber: "",
        checkingBankName: "", checkingBankAddress1: "", checkingBankAddress2: "",
        checkingBankCity: "", checkingBankState: "", checkingBankZip: "",
        checkingBankPhone: "", savingsAccount: "", savingsAccountNumber: "",
        savingsBankName: "", savingsBankAddress1: "", savingsBankAddress2: "",
        savingsBankCity: "", savingsBankState: "", savingsBankZip: "",
        savingsBankPhone: "", loanTerm: "", amountRequired: "", downpayment: "",
        additionalComments: ""
      });
      setConsentChecked(false);
      setTextConsentChecked(false);
      setHasCoBuyer(false);

    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Apply for Financing
          </h1>
          <p className="text-xl text-gray-600">Credit Application</p>
        </div>

        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Please include your bank name in the Additional Comments section if you have a checking account.
          </AlertDescription>
        </Alert>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-600" />
              Credit Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Applicant Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input id="middleName" value={formData.middleName} onChange={(e) => handleInputChange("middleName", e.target.value)} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} required className="mt-2" />
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor="address1">Address *</Label>
                    <Input id="address1" value={formData.address1} onChange={(e) => handleInputChange("address1", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)} required>
                      <SelectTrigger className="mt-2"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip *</Label>
                    <Input id="zip" value={formData.zip} onChange={(e) => handleInputChange("zip", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="ssn">Social Security *</Label>
                    <Input id="ssn" value={formData.ssn} onChange={(e) => handleInputChange("ssn", e.target.value)} placeholder="XXX-XX-XXXX" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" value={formData.dob} onChange={(e) => handleInputChange("dob", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="dlNumber">Drivers License *</Label>
                    <Input id="dlNumber" value={formData.dlNumber} onChange={(e) => handleInputChange("dlNumber", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="mobilePhone">Mobile Phone *</Label>
                    <Input id="mobilePhone" type="tel" value={formData.mobilePhone} onChange={(e) => handleInputChange("mobilePhone", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Employment */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Employment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="employer">Employer *</Label>
                    <Input id="employer" value={formData.employer} onChange={(e) => handleInputChange("employer", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                    <Input id="monthlyIncome" type="number" value={formData.monthlyIncome} onChange={(e) => handleInputChange("monthlyIncome", e.target.value)} required className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="vehicleToFinance">Select Vehicle</Label>
                    <Select value={formData.vehicleToFinance} onValueChange={handleVehicleSelect} disabled={loadingVehicles}>
                      <SelectTrigger className="mt-2"><SelectValue placeholder={loadingVehicles ? "Loading..." : "Select Vehicle"} /></SelectTrigger>
                      <SelectContent>
                        {inventoryVehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={`${vehicle.year} ${vehicle.make} ${vehicle.model} - VIN: ${vehicle.vin}`}>
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Bank Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="checkingAccountNumber">Account Number *</Label>
                    <Input id="checkingAccountNumber" value={formData.checkingAccountNumber} onChange={(e) => handleInputChange("checkingAccountNumber", e.target.value)} required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="checkingBankName">Bank Name *</Label>
                    <Input id="checkingBankName" value={formData.checkingBankName} onChange={(e) => handleInputChange("checkingBankName", e.target.value)} required className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Additional Comments */}
              <div>
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea id="additionalComments" value={formData.additionalComments} onChange={(e) => handleInputChange("additionalComments", e.target.value)} rows={4} className="mt-2" />
              </div>

              {/* Consent */}
              <div className="space-y-4">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    I certify that the above information is complete and accurate. I authorize creditors to obtain credit reports and check my credit and employment history.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="consent" checked={consentChecked} onCheckedChange={(checked) => setConsentChecked(checked as boolean)} required />
                  <Label htmlFor="consent" className="text-sm">I acknowledge and consent to the terms stated above *</Label>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isSubmitting || !consentChecked}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Financing;