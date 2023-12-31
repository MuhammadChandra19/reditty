import { getListing } from '@/lib/service';
import ListingCard from './ListingCard';

export default async function Listing({ pathName }) {
  const { data: result, after: param } = await getListing(pathName);

  return (
    <div className="flex flex-col">
      <ListingCard
        data={result}
        param={param}
        pathName={pathName}
        data-testid="listing-cards"
      />
    </div>
  );
}
