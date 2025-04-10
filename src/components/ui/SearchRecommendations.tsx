
import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchRecommendationsProps {
  query: string;
  onSelect: (selected: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

// Common search terms to suggest
const popularSearches = [
  "vitamins",
  "paracetamol",
  "baby care",
  "skin care",
  "antibiotics",
  "cold and flu",
  "diabetes",
  "first aid",
  "pain relief",
  "supplements"
];

export const SearchRecommendations: React.FC<SearchRecommendationsProps> = ({ 
  query, 
  onSelect, 
  isVisible,
  onClose 
}) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Close recommendations when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);
  
  // Generate recommendations based on user input
  useEffect(() => {
    if (!query.trim()) {
      setRecommendations(popularSearches.slice(0, 5));
      return;
    }
    
    const filtered = popularSearches.filter(term => 
      term.toLowerCase().includes(query.toLowerCase())
    );
    
    const exactMatch = filtered.find(term => 
      term.toLowerCase() === query.toLowerCase()
    );
    
    if (exactMatch) {
      setRecommendations([exactMatch, ...filtered.filter(term => term !== exactMatch).slice(0, 4)]);
    } else {
      setRecommendations([...filtered.slice(0, 5)]);
    }
    
    // Add the query itself if it's not in recommendations
    if (filtered.length === 0) {
      setRecommendations([query]);
    }
  }, [query]);
  
  const handleSelectRecommendation = (recommendation: string) => {
    onSelect(recommendation);
    navigate(`/products?search=${encodeURIComponent(recommendation)}`);
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={containerRef}
      className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-auto"
    >
      {recommendations.length > 0 ? (
        <ul className="py-2">
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between group"
                onClick={() => handleSelectRecommendation(recommendation)}
              >
                <div className="flex items-center">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">
                    {recommendation}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-2 px-4 text-gray-500">No suggestions found</div>
      )}
      
      <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-500 bg-gray-50">
        Press Enter to search
      </div>
    </div>
  );
};
