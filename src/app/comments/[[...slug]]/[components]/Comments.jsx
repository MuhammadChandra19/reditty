import { timeAgoFromUnixTimestamp } from "@/utils/helper"

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

  const encodeString = (str) => {
    const encoded = str
    const decodedString = encoded
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

    return decodedString

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
          <div className="mb-2 text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: encodeString(comment.body_html) }}></div>
          <div className="flex gap-4"></div>
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