import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react';
import { Card } from '../ui/card';
import { nFormatter, timeAgoFromUnixTimestamp } from '@/utils/helper';
import Link from 'next/link';
import Image from 'next/image';

/**
 * @typedef { Object } TListingCard
 * @property { import("@/lib/types").ListingData } data
 * @param { TListingCard } listingCard
 * @returns
 */
const ClassicCard = ({ data }) => {
  return (
    <Card key={data.id || ''} className="w-full flex mb-2">
      <div className="w-20 flex-none flex-col flex gap-2 p-4 bg-slate-200 rounded-l-md items-center justify-center">
        <ArrowBigUp className="cursor-pointer" />
        <div className="font-semibold">{nFormatter(data.ups)}</div>
        <ArrowBigDown className="cursor-pointer" />
      </div>
      {data.thumbnail_height && !data.is_video && (
        <div className="min-w-36 bg-black">
          <Image
            src={data.url}
            alt={data.title}
            height={data.thumbnail_height}
            width={data.thumbnail_width}
            className="m-auto"
          />
        </div>
      )}
      <div className="flex-auto flex-col p-4">
        <Link
          href={`/comments${data.permalink}`}
          className="font-semibold cursor-pointer mb-4"
        >
          {data.title}
        </Link>
        <div className="flex gap-2 mb-2">
          <Link
            className="font-medium text-sm cursor-pointer"
            href={`/${data.subreddit_name_prefixed}`}
          >
            {data.subreddit_name_prefixed}
          </Link>
          <div className="text-gray-500 text-sm">
            Posted By {`u/${data.author}`}
          </div>
          <div className="text-gray-500 text-sm">
            {timeAgoFromUnixTimestamp(data.created)}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex">
            <MessageSquare className="mr-2 text-gray-500" />
            <div className="text-gray-500 text-sm font-semibold">
              {nFormatter(data.num_comments)} Comments
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClassicCard;
