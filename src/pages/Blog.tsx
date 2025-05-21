
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Over-the-Counter Pain Relievers",
      excerpt: "Learn about the different types of OTC pain relievers and how to choose the right one for your needs.",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop",
      date: "May 15, 2025",
      author: "Dr. Sarah Johnson",
      category: "Health Education"
    },
    {
      id: 2,
      title: "The Importance of Medication Adherence",
      excerpt: "Why taking your medications as prescribed is crucial for managing chronic conditions effectively.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
      date: "May 10, 2025",
      author: "Dr. Michael Chen",
      category: "Medication Management"
    },
    {
      id: 3,
      title: "Seasonal Allergies: Prevention and Treatment",
      excerpt: "Tips and strategies to manage seasonal allergies and find relief from symptoms.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=400&auto=format&fit=crop",
      date: "May 5, 2025",
      author: "Dr. Emily Roberts",
      category: "Seasonal Health"
    },
    {
      id: 4,
      title: "Vitamins and Supplements: What You Need to Know",
      excerpt: "A guide to common vitamins and supplements, their benefits, and how to choose quality products.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop",
      date: "April 28, 2025",
      author: "Dr. James Wilson",
      category: "Nutrition"
    },
    {
      id: 5,
      title: "Managing Diabetes: Lifestyle and Medication Tips",
      excerpt: "Practical advice for living well with diabetes through proper medication management and lifestyle choices.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop",
      date: "April 20, 2025",
      author: "Dr. Lisa Martinez",
      category: "Chronic Conditions"
    },
    {
      id: 6,
      title: "The Future of Pharmacy: Trends and Innovations",
      excerpt: "Exploring how technology and new approaches are transforming the pharmacy industry.",
      image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=400&auto=format&fit=crop",
      date: "April 15, 2025",
      author: "Dr. Robert Thompson",
      category: "Industry Insights"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container-custom py-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health & Wellness Blog</h1>
            <p className="text-gray-600 mb-8">Expert insights, health tips, and the latest in pharmaceutical care.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    <div className="absolute top-0 right-0 bg-nimocare-600 text-white text-xs px-2 py-1 m-2 rounded">
                      {post.category}
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="text-sm text-gray-500 mb-2">
                      {post.date} • By {post.author}
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link to={`#`} className="text-nimocare-600 inline-flex items-center font-medium hover:underline">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
