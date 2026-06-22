import VinylFloaters from './VinylFloaters';
import { getVinylCollection } from './getVinylCollection';

export default async function Vinyl() {
  const records = await getVinylCollection();

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Home Vinyl Collection</h1>
        <p className="text-sm">
          Click through my records to see more information about the album.
        </p>
      </div>
      <VinylFloaters records={records} />
    </section>
  );
}