"use client"
import ClassicCard from "@/components/cards/ClassicCard"
import CompactCard from "@/components/cards/CompactCard"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { nFormatter, timeAgoFromUnixTimestamp } from "@/utils/helper"
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as type from "@/lib/types"
import { LoadMore } from "@/components/shared/LoadMore"
import { getListing } from "@/lib/service"
/**
 * @typedef { Object } TListingCard
 * @property { import("@/lib/service").ListingChildren[]} data
 * @property { String } param
 * @property { String } pathName
 * @param { TListingCard } listingCard
 * @returns 
 */
export default function ListingCard({ data: list, param, pathName }) {
  const cardType = useStore((state) => state.cardType)
  /**
   * 
   * @param {{ data: import("@/lib/service").ListingChildren }} param0 
   * @returns 
   */
  const RenderCard = ({ data: { data } }) => {
    if(cardType === "Compact") {
      return <CompactCard key={data.id || ''} data={data}/>
    }

    if(cardType === "Classic") {
      return <ClassicCard key={data.id || ''} data={data}/>
    }

    return (
      <Card key={data.id || ''} className="w-full flex mb-4">
        <div className="w-20 flex-none flex-col flex gap-2 p-4 bg-slate-300 rounded-l-md items-center justify-center">
          <ArrowBigUp className="cursor-pointer"/>
          <div className="font-semibold text-md">{ nFormatter(data.ups)}</div>
          <ArrowBigDown className="cursor-pointer"/>
        </div>
        <div className="flex-auto flex-col">
          <div className="flex gap-2 mb-2 p-2">
            <Link className="font-medium text-sm cursor-pointer" href={`/${data.subreddit_name_prefixed}`}>{data.subreddit_name_prefixed}</Link>
            <div className="text-gray-500 text-sm">Posted By {`u/${data.author}`}</div>
            <div className="text-gray-500 text-sm">{ timeAgoFromUnixTimestamp(data.created) }</div>
          </div>
          <Link  href={`/comments${data.permalink}`} className="font-semibold cursor-pointer mb-4 p-2">{ data.title }</Link>
          <div className="bg-black ml-2">
            {
              data.thumbnail_height && 
              !data.is_video && 
              <Image 
                src={data.url} 
                alt={data.title} 
                height={480} 
                width={240} 
                className="m-auto"
              />
            }
          </div>
          <div className="flex gap-4 p-2">
            <div className="flex">
              <MessageSquare className="mr-2 text-gray-500"/>
              <div className="text-gray-500 text-sm font-semibold">{nFormatter(data.num_comments)} Comments</div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <>
      { list.map(listing => <RenderCard key={listing.data.id} data={listing}/>)}
      <LoadMore 
        onLoadData={getListing}
        renderChild={
          (data) => data.map(listing => <RenderCard key={listing.data.id} data={listing}/>)
        }
        paramKey={param}
        url={pathName}
      />
    </>
  )
}