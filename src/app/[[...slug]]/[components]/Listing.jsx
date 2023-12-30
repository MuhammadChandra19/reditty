import { getListing } from '@/lib/service';
import ListingCard from './ListingCard';
import { LoadMore } from '@/components/shared/LoadMore';

export default async function Listing({ pathName }) {
  const { data: result, after: param } = await getListing(pathName);

  return (
    <div className="flex flex-col">
      <ListingCard data={result} param={param} pathName={pathName} />
    </div>
  );
}
