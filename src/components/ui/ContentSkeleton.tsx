
import { Skeleton } from "@/components/ui/skeleton";

interface ContentSkeletonProps {
  type?: "card" | "list" | "detail";
  count?: number;
}

const ContentSkeleton = ({ type = "card", count = 3 }: ContentSkeletonProps) => {
  const renderCardSkeleton = () => (
    <div className="border rounded-lg p-4">
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="border rounded-lg p-4 flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );

  const renderDetailSkeleton = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <Skeleton className="h-64 w-full sm:w-1/3 rounded-lg" />
        <div className="space-y-4 flex-1">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="pt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-24 w-full rounded-lg" />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{renderSkeleton()}</div>
        ))}
    </div>
  );
};

export { ContentSkeleton };
