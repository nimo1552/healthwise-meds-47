
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList = ({ items }: OrderItemsListProps) => {
  console.log("Rendering OrderItemsList with items:", items);
  
  return (
    <div className="space-y-4">
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id || Math.random()} className="flex items-start py-3">
            <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <div className="ml-4 flex-grow">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="font-medium text-gray-900">${(item.price || 0).toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 text-center text-gray-500">No items found in your order.</div>
      )}
    </div>
  );
};

export default OrderItemsList;
