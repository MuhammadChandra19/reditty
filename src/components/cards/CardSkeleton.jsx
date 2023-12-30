import { Card } from "../ui/card"

const { Skeleton } = require("../ui/skeleton")

const CardSkeleton = ({ total = 10 }) => {
  const arr = new Array(total).fill('')
  return (
    arr.map((_, idx) => (
      <Card key={`skeleton-${idx}`} className="w-full mb-2">
          <div className="flex-auto flex-col p-4">
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-2 w-64"/>
              <Skeleton className="h-2 w-64"/>
              <Skeleton className="h-2 w-64"/>
            </div>
            <Skeleton className="h-4 cursor-pointer mb-4" />
            <Skeleton className="h-2 w-64"/>
          </div>
      </Card>
    ))
  )
}

export default CardSkeleton