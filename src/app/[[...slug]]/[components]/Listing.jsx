import { getListing } from "@/lib/service"
import ListingCard from "./ListingCard"
// import InfiniteLoading from "@/components/shared/InfiniteLoading"

export default async function Listing({ pathName }) {
  /**
   * 
   * @param {String} params 
   * @returns 
   */
  const loadListing = async (params) => {
    "use server"
    /**@type {import("@/lib/service").ListingChildren[]} */
    let result = []
    let pageParam = null
    try {
      const { data, after } = await getListing(`${pathName}${params}`)
      result = data
      pageParam = after
    } catch(e) {
      console.log(e)
    }

    return {result, pageParam}
  }

  const { result, pageParam } = await loadListing("")

  return (
    <div className="flex flex-col">
      <ListingCard list={result} pageParam={pageParam}/>
    </div>
  )
}
