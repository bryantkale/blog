import SpinningVinyl from './SpinningVinyl';
import VinylFloaters from './VinylFloaters';
import { getVinylCollection } from './getVinylCollection';

export default async function Vinyl() {
  const records = await getVinylCollection();

  return (
    <section className="space-y-4">
      <div className="relative min-h-32 pr-28 sm:pr-40">
        <div className="absolute right-0 top-0">
          <SpinningVinyl />
        </div>
      </div>
      <VinylFloaters records={records} />
    </section>
  );
}