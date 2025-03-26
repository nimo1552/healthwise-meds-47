
import React, { useState } from 'react';
import { MapPin, Search, Phone, Clock, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Sample store location data - in a real app, this would come from an API
const storeLocations = [
  {
    id: 1,
    name: "Nimocare Downtown",
    address: "123 Main Street, Downtown, NY 10001",
    phone: "+1 (212) 555-1234",
    hours: "9:00 AM - 9:00 PM",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    services: ["Prescription Filling", "Medication Consultation", "Vaccination", "Health Screening"]
  },
  {
    id: 2,
    name: "Nimocare Midtown",
    address: "456 Park Avenue, Midtown, NY 10022",
    phone: "+1 (212) 555-5678",
    hours: "8:00 AM - 10:00 PM",
    coordinates: { lat: 40.7580, lng: -73.9855 },
    services: ["Prescription Filling", "Medication Consultation", "Vaccination", "Home Delivery"]
  },
  {
    id: 3,
    name: "Nimocare Uptown",
    address: "789 Broadway, Uptown, NY 10025",
    phone: "+1 (212) 555-9012",
    hours: "8:30 AM - 8:30 PM",
    coordinates: { lat: 40.8075, lng: -73.9626 },
    services: ["Prescription Filling", "Medication Consultation", "Health Screening", "Medical Equipment"]
  },
  {
    id: 4,
    name: "Nimocare Queens",
    address: "321 Queens Blvd, Queens, NY 11101",
    phone: "+1 (718) 555-3456",
    hours: "9:00 AM - 8:00 PM",
    coordinates: { lat: 40.7448, lng: -73.9485 },
    services: ["Prescription Filling", "Medication Consultation", "Vaccination"]
  },
  {
    id: 5,
    name: "Nimocare Brooklyn",
    address: "654 Atlantic Ave, Brooklyn, NY 11217",
    phone: "+1 (718) 555-7890",
    hours: "8:00 AM - 9:00 PM",
    coordinates: { lat: 40.6845, lng: -73.9773 },
    services: ["Prescription Filling", "Medication Consultation", "Home Delivery", "Drive-Thru Service"]
  }
];

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [filteredStores, setFilteredStores] = useState(storeLocations);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredStores(storeLocations);
      return;
    }
    
    // Filter stores based on search query (name or address)
    const filtered = storeLocations.filter(store => 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredStores(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No stores found",
        description: "Try a different search term or location",
        variant: "destructive",
      });
    }
  };

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          <h1 className="header-2 text-gray-900 mb-6">Find a Nimocare Store Near You</h1>
          <p className="subtitle-1 mb-8 max-w-2xl">
            Locate your nearest Nimocare pharmacy for in-person services, consultations, and pick-ups.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by city, zip code, or store name..."
                className="pl-10 py-6 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nimocare-600 text-white rounded-md px-4 py-2"
              >
                Search
              </Button>
            </div>
          </form>
          
          {/* Store Listings and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store listings */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-soft overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-semibold text-gray-900">
                  {filteredStores.length} {filteredStores.length === 1 ? 'Store' : 'Stores'} Found
                </h2>
              </div>
              <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
                {filteredStores.map((store) => (
                  <div 
                    key={store.id} 
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-nimocare-50 ${selectedStore?.id === store.id ? 'bg-nimocare-50' : ''}`}
                    onClick={() => setSelectedStore(store)}
                  >
                    <h3 className="font-medium text-nimocare-600">{store.name}</h3>
                    <p className="text-gray-600 text-sm flex items-start mt-2">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-1" />
                      <span>{store.address}</span>
                    </p>
                    <p className="text-gray-600 text-sm flex items-center mt-2">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </p>
                    <p className="text-gray-600 text-sm flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{store.hours}</span>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-nimocare-600 border-nimocare-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetDirections(store.address);
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map placeholder - in a real app, you would integrate with a mapping API */}
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-xl h-[500px] flex items-center justify-center relative overflow-hidden shadow-soft border border-gray-200">
                {selectedStore ? (
                  <div className="absolute top-4 left-4 right-4 bg-white p-4 rounded-lg shadow-soft border border-gray-100 z-10">
                    <h3 className="font-medium text-nimocare-600">{selectedStore.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{selectedStore.address}</p>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-900">Available Services:</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedStore.services.map((service, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-nimocare-50 text-nimocare-600 px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <div className="text-center px-8">
                  <MapPin className="w-16 h-16 text-nimocare-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    This is a placeholder for the map. In a real application, this would be integrated with Google Maps or a similar mapping service.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Select a store from the list to see its location.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Store Services */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our In-Store Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Prescription Filling",
                  description: "Quick and accurate prescription filling by our licensed pharmacists.",
                  icon: "💊"
                },
                {
                  title: "Medication Consultation",
                  description: "Private consultation about your medications and potential interactions.",
                  icon: "👨‍⚕️"
                },
                {
                  title: "Vaccinations",
                  description: "Flu shots, COVID-19 vaccines, and other immunizations.",
                  icon: "💉"
                },
                {
                  title: "Health Screening",
                  description: "Blood pressure, cholesterol, and diabetes screening services.",
                  icon: "🩸"
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover-scale-subtle"
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoreLocator;
