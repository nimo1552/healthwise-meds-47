
import { MapPin } from 'lucide-react';

interface ShippingAddressProps {
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const ShippingAddressCard = ({ address }: ShippingAddressProps) => {
  return (
    <div className="p-6">
      <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
      
      <div className="flex items-start">
        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
        <div>
          <p className="font-medium text-gray-900">{address.name}</p>
          <p className="text-gray-600">{address.street}</p>
          <p className="text-gray-600">
            {address.city}, {address.state} {address.zipCode}
          </p>
          <p className="text-gray-600">{address.country}</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressCard;
