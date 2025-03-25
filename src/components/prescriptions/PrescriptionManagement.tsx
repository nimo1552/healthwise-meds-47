
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Pill, RefreshCw, Plus, AlarmClock, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Prescription {
  id: string;
  name: string;
  doctor: string;
  issuedDate: string;
  expiryDate: string;
  dosage: string;
  refills: number;
  instructions: string;
  status: 'active' | 'expired' | 'refill-needed';
}

const PrescriptionManagement = () => {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 'RX-12345',
      name: 'Lisinopril 10mg',
      doctor: 'Dr. Sarah Johnson',
      issuedDate: '2023-08-15',
      expiryDate: '2024-08-15',
      dosage: '1 tablet once daily',
      refills: 2,
      instructions: 'Take with food in the morning',
      status: 'active'
    },
    {
      id: 'RX-12346',
      name: 'Atorvastatin 20mg',
      doctor: 'Dr. Sarah Johnson',
      issuedDate: '2023-09-10',
      expiryDate: '2024-09-10',
      dosage: '1 tablet daily',
      refills: 0,
      instructions: 'Take in the evening',
      status: 'refill-needed'
    },
    {
      id: 'RX-12347',
      name: 'Amoxicillin 500mg',
      doctor: 'Dr. Michael Chen',
      issuedDate: '2023-06-05',
      expiryDate: '2023-06-12',
      dosage: '1 capsule three times daily',
      refills: 0,
      instructions: 'Take until completed, even if feeling better',
      status: 'expired'
    }
  ]);
  
  const [selectedReminder, setSelectedReminder] = useState<Prescription | null>(null);
  const [reminderTime, setReminderTime] = useState('08:00');
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleRefillRequest = (id: string) => {
    toast({
      title: "Refill Requested",
      description: "Your prescription refill request has been submitted. We'll notify you when it's ready."
    });
    
    // Update the prescription status in the UI
    setPrescriptions(prevPrescriptions => 
      prevPrescriptions.map(p => 
        p.id === id ? { ...p, status: 'active' as const, refills: p.refills + 3 } : p
      )
    );
  };
  
  const handleSetReminder = () => {
    if (!selectedReminder) return;
    
    toast({
      title: "Reminder Set",
      description: `You will be reminded to take ${selectedReminder.name} at ${reminderTime} daily.`
    });
    
    setSelectedReminder(null);
  };
  
  const getStatusBadge = (status: Prescription['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      case 'refill-needed':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Refill Needed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Prescriptions</h2>
          <p className="text-gray-600">Manage your prescriptions and set medication reminders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button asChild className="bg-nimocare-600 hover:bg-nimocare-700">
            <Link to="/prescription">
              <FileUp className="h-4 w-4 mr-2" /> Upload New
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{prescription.name}</CardTitle>
                  <p className="text-sm text-gray-600">{prescription.doctor}</p>
                </div>
                {getStatusBadge(prescription.status)}
              </div>
            </CardHeader>
            
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Pill className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Dosage: {prescription.dosage}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Expires: {formatDate(prescription.expiryDate)}</span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Instructions: </span>
                  <span>{prescription.instructions}</span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Refills Remaining: </span>
                  <span>{prescription.refills}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 flex justify-between bg-gray-50 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedReminder(prescription)}
                  >
                    <AlarmClock className="h-4 w-4 mr-2" /> Set Reminder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set Medication Reminder</DialogTitle>
                    <DialogDescription>
                      Set a daily reminder to take your medication at the specified time.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedReminder && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <p className="font-medium">{selectedReminder.name}</p>
                        <p className="text-sm text-gray-600">Dosage: {selectedReminder.dosage}</p>
                        <p className="text-sm text-gray-600">{selectedReminder.instructions}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Reminder Time</Label>
                        <Input 
                          id="time" 
                          type="time" 
                          value={reminderTime} 
                          onChange={(e) => setReminderTime(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea id="notes" placeholder="E.g., Take with food" />
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button onClick={handleSetReminder}>Set Reminder</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {prescription.status === 'refill-needed' || prescription.refills === 0 ? (
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-nimocare-600 hover:bg-nimocare-700"
                  onClick={() => handleRefillRequest(prescription.id)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Request Refill
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to={`/cart?prescription=${prescription.id}`}>
                    Refill Now
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionManagement;
