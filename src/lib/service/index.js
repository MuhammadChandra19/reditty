"use server"

const { requester } = require("@/utils/requester")

const { request } = requester()

/**
 * 
 * @param { String } url 
 * 
 * @typedef { Object } ListingChildren
 * @property { String } id
 * @property { String } author_fullname
 * @property { String } title
 * @property { String } subreddit_name_prefixed
 * 
 * @return { Promise<ListingChildren[]> }
 */

export const getListing = async (url) => {
  try {
    const { data: {
      children = []
    }} = await request(url)
    
    return children

  } catch(e) {
    throw new Error(e)
  }
}