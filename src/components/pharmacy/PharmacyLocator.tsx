import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Phone, Clock, Building, Search, Star } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { motion } from 'framer-motion';

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  distance: number;
  rating: number;
  isPartner: boolean;
}

const PharmacyLocator = () => {
  const { toast } = useToast();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState('10');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([
    {
      id: 1,
      name: "MedCare Pharmacy",
      address: "123 Health Ave",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-9PM, Sat-Sun: 9AM-6PM",
      distance: 0.8,
      rating: 4.7,
      isPartner: true
    },
    {
      id: 2,
      name: "Community Rx",
      address: "456 Wellness Blvd",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "(555) 987-6543",
      hours: "Mon-Fri: 9AM-8PM, Sat: 9AM-6PM, Sun: Closed",
      distance: 1.2,
      rating: 4.5,
      isPartner: true
    },
    {
      id: 3,
      name: "Family Drugstore",
      address: "789 Care Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "(555) 456-7890",
      hours: "Mon-Sun: 8AM-10PM",
      distance: 1.7,
      rating: 4.2,
      isPartner: false
    },
    {
      id: 4,
      name: "HealthPlus Pharmacy",
      address: "101 Medical Center Dr",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "(555) 789-0123",
      hours: "Mon-Fri: 8AM-9PM, Sat: 9AM-7PM, Sun: 10AM-6PM",
      distance: 2.3,
      rating: 4.8,
      isPartner: true
    },
    {
      id: 5,
      name: "QuickMeds",
      address: "202 Prescription Lane",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "(555) 321-6547",
      hours: "24 Hours, 7 Days a Week",
      distance: 3.1,
      rating: 4.3,
      isPartner: false
    }
  ]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchLocation.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search for nearby pharmacies.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    setTimeout(() => {
      const sortedPharmacies = [...pharmacies].sort((a, b) => a.distance - b.distance);
      setPharmacies(sortedPharmacies);
      
      setIsSearching(false);
      setSearchPerformed(true);
      
      toast({
        title: "Pharmacies Found",
        description: `Found ${pharmacies.length} pharmacies within ${searchRadius} miles of your location.`
      });
    }, 1200);
  };
  
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${
              i < fullStars 
                ? 'text-yellow-400 fill-yellow-400' 
                : i === fullStars && hasHalfStar 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
            }`} 
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };
  
  const pharmacyListVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const pharmacyItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold">Find a Pharmacy</h2>
        <p className="text-gray-600">Locate partner pharmacies in your area for pickup or consultation</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="location" className="text-sm font-medium mb-1 block">
                    Enter ZIP Code or City, State
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      id="location" 
                      placeholder="e.g., 90210 or Los Angeles, CA" 
                      className="pl-10"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="radius" className="text-sm font-medium mb-1 block">
                    Search Radius (miles)
                  </label>
                  <Input 
                    id="radius" 
                    type="number" 
                    min="1" 
                    max="50"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSearching} className="bg-nimocare-600 hover:bg-nimocare-700">
                  {isSearching ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Searching...</span>
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Find Pharmacies
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
      {isSearching && (
        <div className="flex flex-col items-center py-12">
          <LoadingSpinner size="lg" text="Searching for pharmacies near you" />
        </div>
      )}
      
      {searchPerformed && !isSearching && (
        <motion.div 
          className="space-y-4"
          variants={pharmacyListVariants}
          initial="hidden"
          animate="show"
        >
          <h3 className="text-lg font-semibold">Pharmacies Near {searchLocation}</h3>
          
          {pharmacies.map((pharmacy) => (
            <motion.div key={pharmacy.id} variants={pharmacyItemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold">{pharmacy.name}</h4>
                        {pharmacy.isPartner && (
                          <Badge className="ml-2 bg-nimocare-100 text-nimocare-800 border-nimocare-200">
                            Partner Pharmacy
                          </Badge>
                        )}
                      </div>
                      
                      {renderRatingStars(pharmacy.rating)}
                      
                      <div className="flex items-start space-x-2">
                        <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-gray-700">{pharmacy.address}</p>
                          <p className="text-gray-700">{pharmacy.city}, {pharmacy.state} {pharmacy.zipCode}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-700">{pharmacy.hours}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-700">{pharmacy.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 text-nimocare-600 mr-1" />
                        <span className="font-medium">{pharmacy.distance} miles away</span>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Button asChild variant="outline" size="sm" className="w-full md:w-auto">
                          <a href={`https://maps.google.com/?q=${pharmacy.address}, ${pharmacy.city}, ${pharmacy.state} ${pharmacy.zipCode}`} target="_blank" rel="noopener noreferrer">
                            Get Directions
                          </a>
                        </Button>
                        
                        {pharmacy.isPartner && (
                          <Button asChild size="sm" className="w-full md:w-auto bg-nimocare-600 hover:bg-nimocare-700">
                            <a href={`tel:${pharmacy.phone.replace(/\D/g, '')}`}>
                              Call Pharmacy
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

import { Badge } from '@/components/ui/badge';

export default PharmacyLocator;
