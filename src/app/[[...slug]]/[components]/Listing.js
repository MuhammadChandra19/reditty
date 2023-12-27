import { getListing } from "@/lib/service"
import ListingCard from "./ListingCard"

export default async function Listing({ pathName }) {
  /**@type {import("@/lib/service").ListingChildren[]} */
  let data = []
  try {
    data = await getListing(pathName)
  } catch(e) {
    console.log(e)
  }
  return (
    <div className="flex flex-col gap-4">
      {
        data.map(listing => <ListingCard  key={listing.data.id} data={listing.data} />)
      }
    </div>
  )
}