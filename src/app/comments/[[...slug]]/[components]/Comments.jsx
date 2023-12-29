import { nFormatter, timeAgoFromUnixTimestamp } from "@/utils/helper"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import Image from "next/image"

/**
 * 
 * @param {{ comments: Array<{data: import("@/lib/types").Comment>}> }} param0 
 */
export default function Comments({ comments }) {
  /**
   * 
   * @param {import("@/lib/types").Comment} comment 
   */
  const haveNestedChild = (comment) => {
    return comment.replies && comment.replies.data && comment.replies.data.children && comment.replies.data.children.length > 0
  }
  /**
   * 
   * @param { String } body 
   * @returns 
   */
  const renderCommentContent = (body) => {
    const bodyArr = body.split('\n')

    return (
      <div className="mb-2 text-sm text-gray-800">
        {
          bodyArr.map((s, i) => {
            if(s.includes("preview.redd.it")) {
              return (
                <Image 
                  key={i}
                  src={s}
                  objectFit={"contain"}
                  width={240}
                  height={480}
                  alt="reddit-gif"
                />
              )
            } 
            return <p key={i}>{s}</p>
          })
        }
      </div>
    )
  }
  /**
   * 
   * @param { import("@/lib/types").Comment } comment 
   */
  const renderComment = (comment) => {
    if(comment.distinguished !== null) return null
    return (
      <article className="flex gap-4 mb-2">
        <div className="h-auto w-6 mb-6">
          <div className="rounded-full h-6 w-6 bg-gray-400 p-1 mb-1" />
          <div className="w-[2px] h-full m-auto bg-gray-200"></div>
        </div>
        <div className="flex-auto">
          <div className="flex gap-4 mb-1">
            <div className="font-bold text-xs text-gray-800">Posted By {`u/${comment.author}`}</div>
            <div className="text-gray-500 text-xs">{ timeAgoFromUnixTimestamp(comment.created) }</div>
          </div>
          {renderCommentContent(comment.body)}
          <div className="flex gap-2 mb-4">
            <ArrowBigUp className="cursor-pointer w-6 h-6"/>
            <div className="font-semibold text-sm">{ nFormatter(comment?.ups || '')}</div>
            <ArrowBigDown className="cursor-pointer w-6 h-6"/>
          </div>
          {
            haveNestedChild(comment) && 
            comment.replies.data.children.map((v) => renderComment(v.data))
          }
        </div>
      </article>
    )

  }
  return (
    <div className="p-2">
      { 
        comments.map((comment) => renderComment(comment.data))
      }
    </div>
  )
}