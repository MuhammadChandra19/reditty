import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getListing } from "@/lib/service"
import ListingCard from "./ListingCard"

export default async function Listing({ pathName }) {
  const data  = await getListing(pathName)
  return (
    <div className="flex flex-col gap-4">
      {
        data.map(listing => <ListingCard  key={listing.data.id} data={listing.data} />)
      }
    </div>
  )
}