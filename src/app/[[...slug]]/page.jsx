import Listing from './[components]/Listing';
import { Suspense } from 'react';
import ListingControl from './[components]/ListingControl';
import CardSkeleton from '@/components/cards/CardSkeleton';

/**
 * @typedef { Object } TParams
 * @property { { slug: String[] } } params
 * @param { TParams } param
 * @returns
 */
export default function Page({ params }) {
  const { slug = ['r', 'popular', 'hot'] } = params;
  const slugParams = slug.join('/');

  return (
    <main className="container max-w-6xl">
      <ListingControl params={slug} />
      <Suspense fallback={<CardSkeleton />}>
        <Listing pathName={slugParams} />
      </Suspense>
    </main>
  );
}
