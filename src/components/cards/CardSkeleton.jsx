import { Card } from "../ui/card"

const { Skeleton } = require("../ui/skeleton")

const CardSkeleton = ({ total = 10 }) => {
  const arr = new Array(total).fill('')
  return (
    arr.map((_, idx) => (
      <Card key={`skeleton-${idx}`} className="w-full mb-4 h-60 p-2">
        <div className="flex gap-4">
          <Skeleton className="w-20 h-56 rounded-l-md"/>
          <div className="flex-auto flex flex-col gap-4 justify-center items-center">
            <Skeleton className="w-full rounded-md h-8"/>
            <Skeleton  className="w-full rounded-md h-24" />
            <Skeleton className="w-full rounded-md h-8"/>
          </div>
        </div>
      </Card>
    ))
  )
}

export default CardSkeleton
