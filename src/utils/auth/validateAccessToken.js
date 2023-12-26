import { isInvalidOrExpired } from "../jwt/isInvalidOrExpired"
import { requestAccessToken } from "./requestAccessToken"

/**
 * 
 * @param {String} accessToken 
 * @return { Promise<String> }
 */

export const validateAccessToken = async (accessToken) => {

  if(isInvalidOrExpired(accessToken)) {
    console.log('here')
    return await requestAccessToken()
  }

  return accessToken
}