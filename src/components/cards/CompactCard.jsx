import { nFormatter, timeAgoFromUnixTimestamp } from "@/utils/helper"
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react"

/**
 * @typedef { Object } TListingCard
 * @property { import("@/lib/service").ListingData } data
 * @param { TListingCard } listingCard
 * @returns 
 */
const CompactCard = ({ data }) => {
  return (
    <div className="flex border-b-slate-300 border-b-2 gap-2">
      <div className="flex gap-2 bg-slate-300 justify-center items-center min-w-32">
        <ArrowBigUp className="cursor-pointer"/>
        <div className="font-medium text-sm">{ nFormatter(data.ups)}</div>
        <ArrowBigDown className="cursor-pointer"/>
      </div>
      <div className="flex justify-between flex-auto p-2">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-gray-500 cursor-pointer">{data.title}</div>
          <div className="flex gap-2">
            <div className="font-semibold text-xs cursor-pointer">{data.subreddit_name_prefixed}</div>
            <div className="text-xs text-gray-400 cursor-pointer">Posted by {`u/${data.author}`} </div>
            <div className="text-xs text-gray-400">{timeAgoFromUnixTimestamp(data.created)}</div>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <MessageSquare className="mr-2 text-gray-500"/>
          <div className="text-gray-400 font-semibold">{nFormatter(data.num_comments)}</div>
        </div>
      </div>
    </div>
  )
}

export default CompactCard