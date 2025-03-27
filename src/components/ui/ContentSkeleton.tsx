
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
      <Skeleton className="h-48 w-full rounded-lg mb-4 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
      <Skeleton className="h-4 w-3/4 mb-2 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
      <Skeleton className="h-4 w-1/2 mb-4 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
        <Skeleton className="h-8 w-8 rounded-full shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="border rounded-lg p-4 flex items-center space-x-4 overflow-hidden">
      <Skeleton className="h-12 w-12 rounded-full shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
        <Skeleton className="h-4 w-1/2 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
      </div>
      <Skeleton className="h-8 w-20 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
    </div>
  );

  const renderDetailSkeleton = () => (
    <div className="space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-6">
        <Skeleton className="h-64 w-full sm:w-1/3 rounded-lg shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
        <div className="space-y-4 flex-1">
          <Skeleton className="h-8 w-3/4 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
          <Skeleton className="h-4 w-1/2 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
          <Skeleton className="h-4 w-full shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
          <Skeleton className="h-4 w-full shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
          <div className="pt-4">
            <Skeleton className="h-10 w-32 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-40 shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
        <Skeleton className="h-24 w-full rounded-lg shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
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
