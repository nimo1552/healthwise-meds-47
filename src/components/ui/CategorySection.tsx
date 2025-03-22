
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Sample category data
const categories = [
  {
    id: 1,
    name: "Prescription Medicines",
    icon: "💊",
    backgroundColor: "bg-blue-50",
    description: "Authorized medications requiring a valid prescription",
    link: "/categories/prescription"
  },
  {
    id: 2,
    name: "Over-the-Counter Drugs",
    icon: "🩹",
    backgroundColor: "bg-green-50",
    description: "Medicines available without a prescription",
    link: "/categories/otc"
  },
  {
    id: 3,
    name: "Vitamins & Supplements",
    icon: "🍊",
    backgroundColor: "bg-orange-50",
    description: "Essential nutrients for overall health and wellbeing",
    link: "/categories/vitamins"
  },
  {
    id: 4,
    name: "Personal Care",
    icon: "🧴",
    backgroundColor: "bg-purple-50",
    description: "Skincare, haircare, and personal hygiene products",
    link: "/categories/personal-care"
  },
  {
    id: 5,
    name: "Medical Devices",
    icon: "🩺",
    backgroundColor: "bg-red-50",
    description: "Health monitoring and medical equipment",
    link: "/categories/devices"
  },
  {
    id: 6,
    name: "Baby & Mother Care",
    icon: "👶",
    backgroundColor: "bg-pink-50",
    description: "Products for infants and new mothers",
    link: "/categories/baby-mother"
  }
];

const CategorySection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
            Categories
          </span>
          <h2 className="header-2 text-gray-900 mb-4">Browse By Categories</h2>
          <p className="subtitle-1 mx-auto">
            Explore our wide range of health products organized in easy-to-navigate categories for your convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className={cn(
                "group p-6 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200",
                "hover:shadow-medium hover:-translate-y-1 flex flex-col h-full",
                category.backgroundColor
              )}
            >
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <span className="text-nimocare-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                  Browse Products
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
