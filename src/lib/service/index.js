'use server';

import { requester } from '@/utils/requester';
import * as type from '@/lib/types';

/**
 *
 * @param { String } url
 *
 * @typedef { Object } ListingChildren
 * @property { String } kind
 * @property { type.ListingData } data
 * @return {Promise<{ data: ListingChildren[]; after: String }> }
 */

export const getListing = async (url) => {
  const { request } = requester();
  try {
    const {
      data: { children = [], after = '' },
    } = await request(url);
    return {
      after,
      data: children,
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 *
 * @param { String } url
 * @typedef { Object } Thread
 * @property { type.ListingData } content
 * @property { Array<{data: type.Comment }> } content.comments
 *
 * @returns { Promise<Thread> }
 */

export const getThread = async (url) => {
  const { request } = requester();

  try {
    const [rawContent = { data: {} }, rawComment = { data: {} }] =
      await request(`${url}?raw_json=1`);
    return {
      comments: _extractChild(rawComment),
      content: _extractChild(rawContent)[0].data,
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @typedef { Object } RawObject
 * @property { Object } data
 * @property { Array } data.children
 *
 * @param { RawObject } data
 *
 * @returns { Array }
 */
const _extractChild = ({ data }) => {
  return data.children;
};
