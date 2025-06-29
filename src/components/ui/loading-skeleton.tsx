import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const KPICardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-4 h-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="mb-2 w-20 h-8" />
      <Skeleton className="w-32 h-3" />
    </CardContent>
  </Card>
)

export const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-48 h-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="w-full h-[300px]" />
    </CardContent>
  </Card>
)

export const TableSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="w-32 h-6" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
