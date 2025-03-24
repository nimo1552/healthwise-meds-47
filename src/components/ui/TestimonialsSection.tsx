
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    text: "I'm impressed with the speed of delivery and the quality of service. My prescription medications arrived exactly when promised, and the pharmacist even called to make sure I understood my dosage."
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg", 
    rating: 5,
    text: "The online consultation feature saved me so much time. I was able to get my prescription refilled without having to visit my doctor. The process was seamless and the medication arrived the next day."
  },
  {
    id: 3,
    name: "Emma Roberts",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
    text: "As someone with chronic conditions, having reliable access to my medications is crucial. This pharmacy has never let me down, and their medication reminders help me stay on track with my treatment plan."
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Austin, TX",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    text: "The prices are competitive, and I love that I can easily compare generic and brand-name options. Their automatic refill program ensures I never run out of my essential medications."
  }
];

const TestimonialsSection = () => {
  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it — hear from some of our satisfied customers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-nimocare-100"
                />
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="inline-flex items-center text-nimocare-600 hover:text-nimocare-700 font-medium">
            Read more reviews on Trustpilot
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
