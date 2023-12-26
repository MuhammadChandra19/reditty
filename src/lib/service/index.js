"use server"

const { requester } = require("@/utils/requester")

const { request } = requester()

/**
 * 
 * @typedef { Object } ListingData
 * @property { String } id
 * @property { String } author_fullname
 * @property { String } title
 * @property { String } subreddit_name_prefixed
 * @property { String } selftext
 * @property { String | null } thumbnail
 * @property { Number | null } thumbnail_width
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
  try {
    const { data: {
      children = []
    }} = await request(url)
    
    return children

  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
}