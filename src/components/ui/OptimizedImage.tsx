
import { useState, useEffect, useRef } from 'react';
import { useGarbageCollection } from '@/hooks/use-garbage-collection';
import { throttle } from '@/utils/performanceUtils';

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
  
  // Use the enhanced garbage collection hook with less frequent touches
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
  
  // Throttle the interaction handler to reduce performance impact
  const handleInteraction = throttle(() => {
    touch();
  }, 1000); // Only run at most once per second
  
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
  
  // Calculate a reasonable size for the placeholder to avoid layout shifts
  const placeholderStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
  };
  
  return (
    <div 
      className={`optimized-image-container relative ${className}`}
      onMouseOver={handleInteraction}
      onFocus={handleInteraction}
      style={placeholderStyle}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-100 rounded" style={placeholderStyle} />
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded" style={placeholderStyle}>
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
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} rounded`}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
