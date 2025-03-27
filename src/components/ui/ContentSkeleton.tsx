
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ContentSkeletonProps {
  type?: "card" | "list" | "detail";
  count?: number;
  className?: string;
}

const ContentSkeleton = ({ type = "card", count = 3, className }: ContentSkeletonProps) => {
  const renderCardSkeleton = () => (
    <div className="border rounded-lg p-4 overflow-hidden">
      <Skeleton className="h-48 w-full rounded-lg mb-4 shimmer" />
      <Skeleton className="h-4 w-3/4 mb-2 shimmer" />
      <Skeleton className="h-4 w-1/2 mb-4 shimmer" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24 shimmer" />
        <Skeleton className="h-8 w-8 rounded-full shimmer" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="border rounded-lg p-4 flex items-center space-x-4 overflow-hidden">
      <Skeleton className="h-12 w-12 rounded-full shimmer" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3 shimmer" />
        <Skeleton className="h-4 w-1/2 shimmer" />
      </div>
      <Skeleton className="h-8 w-20 shimmer" />
    </div>
  );

  const renderDetailSkeleton = () => (
    <div className="space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-6">
        <Skeleton className="h-64 w-full sm:w-1/3 rounded-lg shimmer" />
        <div className="space-y-4 flex-1">
          <Skeleton className="h-8 w-3/4 shimmer" />
          <Skeleton className="h-4 w-1/2 shimmer" />
          <Skeleton className="h-4 w-full shimmer" />
          <Skeleton className="h-4 w-full shimmer" />
          <div className="pt-4">
            <Skeleton className="h-10 w-32 shimmer" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-40 shimmer" />
        <Skeleton className="h-24 w-full rounded-lg shimmer" />
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return renderCardSkeleton();
      case "list":
        return renderListSkeleton();
      case "detail":
        return renderDetailSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div 
            key={index} 
            style={{ 
              animationDelay: `${index * 150}ms` 
            }}
            className="animate-fade-in"
          >
            {renderSkeleton()}
          </div>
        ))}
    </div>
  );
};

export { ContentSkeleton };
