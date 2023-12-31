import { getListing } from '@/lib/service';
import ListingCard from './ListingCard';
/**
 * @param {{ pathName: String }} param0
 * @returns
 */
export default async function Listing({ pathName }) {
  console.log(pathName);
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
