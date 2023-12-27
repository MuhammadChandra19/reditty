"use client"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
/**
 * @typedef { Object } TListingCard
 * @property { import("@/lib/service").ListingData } data
 * @param { TListingCard } listingCard
 * @returns 
 */
export default function ListingCard({ data }) {
  const cardType = useStore((state) => state.cardType)
  console.log(cardType)
  return (
    <Card key={data.id || ''} className="w-full">
      <CardHeader>
        <CardTitle className="text-base">{data.title}</CardTitle>
      </CardHeader>
    </Card>
  )
}