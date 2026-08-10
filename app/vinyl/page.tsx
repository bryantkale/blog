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
      <div>I wanted to create a digital catalog of my vinyl collection at home. I will always know what is on my shelf before I buy something new.</div>
      <div>This project helped me understand how to build a database and incorporate it into a web application.</div>
      <div>I found out how difficult it is to work with different music APIs and integrating them into a cohesive system.</div>
      <VinylFloaters records={records} />
    </section>
  );
}