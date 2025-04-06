
import { useState, useEffect, useRef, memo } from 'react';
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
  
  // Use garbage collection hook
  useGarbageCollection(uniqueId, undefined, { touchOnRender: false });
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setError(true);
    if (onError) onError();
  };
  
  // Determine loading strategy
  const loadingAttribute = lazyLoad && !priority ? 'lazy' : undefined;
  
  // Calculate a reasonable size for the placeholder to avoid layout shifts
  const placeholderStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
  };
  
  return (
    <div 
      className={`optimized-image-container relative ${className}`}
      style={placeholderStyle}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-50 rounded" style={placeholderStyle} />
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded" style={placeholderStyle}>
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttribute}
          onLoad={handleLoad}
          onError={handleError}
          className={`rounded transition-opacity`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transitionDuration: '0.2s',
          }}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
