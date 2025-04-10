
import { useState, useEffect, useRef, memo } from 'react';
import { useGarbageCollection } from '@/hooks/use-garbage-collection';
import { throttle, getDevicePerformanceProfile } from '@/utils/performanceUtils';

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
const OptimizedImage = memo(({
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
  
  // Get device capabilities once on mount
  const capabilities = getDevicePerformanceProfile();
  
  // Use the enhanced garbage collection hook with less frequent touches
  const { touch } = useGarbageCollection(
    uniqueId,
    () => {
      // Cleanup function - executed when the resource is disposed
      if (imgRef.current) {
        imgRef.current.src = '';
      }
    },
    { touchOnRender: false, verbose: false } // Don't touch on every render to reduce overhead
  );
  
  // Throttle the interaction handler to reduce performance impact
  const handleInteraction = throttle(() => {
    touch();
  }, 2000); // Only run at most once per 2 seconds (reduced frequency)
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  // Preload priority images
  useEffect(() => {
    if (priority && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (imgRef.current) {
          imgRef.current.src = src;
        }
      };
    }
  }, [priority, src, isLoaded]);
  
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
  
  // For low-end devices, only use simple fade transitions
  const transitionDuration = capabilities.tier === 'low' ? '0.1s' : '0.3s';
  
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
          src={priority ? src : lazyLoad ? undefined : src} // Only set src immediately if not lazy loading
          data-src={lazyLoad && !priority ? src : undefined} // Use data-src for lazy loading
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttribute}
          fetchPriority={fetchPriority as 'high' | 'low' | 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`rounded transition-opacity`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transitionDuration: transitionDuration,
          }}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
