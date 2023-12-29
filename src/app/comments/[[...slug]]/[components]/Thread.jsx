import { getThread } from "@/lib/service"
import { nFormatter, timeAgoFromUnixTimestamp } from "@/utils/helper"
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Comments from "./Comments"

/**
 * 
 * @param {{ pathName: String }} param0 
 */
export default async function Thread({ pathName}) {
  /**@type {import("@/lib/service").Thread} */
  let data = {}
  try {
    data = await getThread(pathName)
  } catch(e) {
    console.log(e)
  }

  const content = data.content
  const comments = data.comments

  const encodeString = (str) => {
    const encodedString = str

    // Define the start and end strings to locate the HTML content
    const startString = '<!-- SC_OFF -->';
    const endString = '<!-- SC_ON -->';

    // Find the start and end indices
    const startIndex = encodedString.indexOf(startString);
    const endIndex = encodedString.indexOf(endString, startIndex + startString.length);

    // Extract the HTML content
   return encodedString.substring(startIndex + startString.length, endIndex);

  }

  return (
    <div className=" bg-white rounded-sm">
      <div className="flex gap-4">
        <div className="w-20 flex-none flex-col flex gap-2 bg-slate-100  items-center pt-4">
          <ArrowBigUp className="cursor-pointer w-6 h-6"/>
          <div className="font-semibold text-md">{ nFormatter(content?.ups || '')}</div>
          <ArrowBigDown className="cursor-pointer w-6 h-6"/>
        </div>
        <div className="flex-auto p-2">
          <div className="flex gap-2 mb-2 p-2">
            <Link className="font-medium text-sm cursor-pointer" href={`/${content.subreddit_name_prefixed}`}>{data.subreddit_name_prefixed}</Link>
            <div className="text-gray-500 text-sm">Posted By {`u/${content.author}`}</div>
            <div className="text-gray-500 text-sm">{ timeAgoFromUnixTimestamp(content.created) }</div>
          </div>
          <div className="font-semibold cursor-pointer mb-6">{ content?.title || '' }</div>
          {
            content.selftext_html && 
            <div 
              dangerouslySetInnerHTML={{
                  __html: 
                encodeString(content?.selftext_html) 
              }} 
            />
          }
          <div className=" ml-2 h-[410] w-[640] mb-8">
            {
              content.thumbnail_height && 
              !content.is_video && 
              <Image 
                src={content.url} 
                alt={content.title} 
                width={640}
                height={410}
                objectFit="contain"
                className="m-auto"
              />
            }
          </div>
          <div className="flex gap-6">
            <div className="flex">
              <MessageSquare className="mr-2 text-gray-500"/>
              <div className="text-gray-500 text-sm font-semibold">{nFormatter(content.num_comments)} Comments</div>
            </div>
          </div>
        </div>
      </div>
      <Comments comments={comments}/>
    </div>
  )
}