
import { useState, useEffect, useRef } from 'react';
import { useGarbageCollection } from '@/hooks/use-garbage-collection';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazyLoad?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
};

/**
 * An optimized image component that uses garbage collection
 * to clean up resources when the component is unmounted
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazyLoad = true,
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const uniqueId = `image-${src.split('/').pop() || Math.random().toString(36).substring(7)}`;
  
  // Use the enhanced garbage collection hook
  const { touch } = useGarbageCollection(
    uniqueId,
    () => {
      // Cleanup function - executed when the resource is disposed
      if (imgRef.current) {
        // In a real application, you might want to do more cleanup
        imgRef.current.src = '';
      }
    },
    { touchOnRender: true, verbose: false }
  );
  
  // Touch the resource when the image is interacted with
  const handleInteraction = () => {
    touch();
  };
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    setIsLoaded(true);
    touch(); // Ensure this resource is marked as recently used
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setError(true);
    if (onError) onError();
  };
  
  // Determine loading strategy
  const loadingAttribute = lazyLoad && !priority ? 'lazy' : undefined;
  const fetchPriority = priority ? 'high' : 'auto';
  
  return (
    <div 
      className={`optimized-image-container relative ${className}`}
      onMouseOver={handleInteraction}
      onFocus={handleInteraction}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttribute}
          fetchPriority={fetchPriority as 'high' | 'low' | 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} rounded`}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
