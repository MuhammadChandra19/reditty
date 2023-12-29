/**
 * @typedef { Object } Comment
 * @property { String } author
 * @property { Number } ups
 * @property { String } body_html
 * @property { String } body
 * @property { String | null } distinguished
 * @property { Object } replies
 * @property {{ children: Array<{data: Comment }>}} replies.data
 * @property { Number } created
 */

/**
 * 
 * @typedef { Object } ListingData
 * @property { String } id
 * @property { String } author
 * @property { String } title
 * @property { Number } ups
 * @property { String } permalink
 * @property { String } selftext_html
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

export {}