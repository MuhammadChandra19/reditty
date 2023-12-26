"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * @typedef { Object } TListingCard
 * @property { import("@/lib/service").ListingData } data
 * 
 * 
 * @param { TListingCard } param0 
 * @returns 
 */

export default function ListingCard({ data }) {
  return (
    <Card key={data.id || ''} className="w-[640px]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
    </Card>
  )
}