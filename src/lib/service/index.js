"use server"

const { requester } = require("@/utils/requester")

/**
 * 
 * @typedef { Object } ListingData
 * @property { String } id
 * @property { String } author
 * @property { String } title
 * @property { Number } ups
 * @property { Number } num_comments
 * @property { String } subreddit_name_prefixed
 * @property { String } selftext
 * @property { Number | null  } thumbnail_height
 * @property { Number | null } thumbnail_width
 * @property { String | null } url
 * @property { reddit_video: { fallback_url: String }} media
 * @property { Boolean } is_video
 * @property { Number } created
 */

/**
 * 
 * @param { String } url 
 * 
 * @typedef { Object } ListingChildren
 * @property { String } kind
 * @property { ListingData } data 
 * @return { Promise<ListingChildren[]> }
 */

export const getListing = async (url) => {
  const { request } = requester()
  try {
    const { data: {
      children = []
    }} = await request(url)
    
    return children

  } catch(e) {
    throw new Error(e)
  }
}