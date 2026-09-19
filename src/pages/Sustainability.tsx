import { Link } from 'react-router-dom';

export function Sustainability() {
  return (
    <div className="bg-white">
      <div className="border-b border-charcoal-200">
        <div className="container-page py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
            Sustainability
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal-900 sm:text-5xl">
            Responsible farming
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
            We aim to raise animals humanely, use resources carefully and supply
            honest products to the farmers and families who depend on us.
          </p>
        </div>
      </div>
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          {[
            {
              title: 'Animal care',
              text: 'Clean housing, adequate feed and daily observation are central to how we run the pig unit.',
            },
            {
              title: 'Resource use',
              text: 'We work to reduce waste in feed handling and butchery operations where practical.',
            },
            {
              title: 'Community supply',
              text: 'Local collection and transparent ordering help keep supply reliable for nearby customers.',
            },
            {
              title: 'Long-term view',
              text: 'Breeding decisions and farm practices are guided by the goal of a lasting, healthy herd.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="text-base font-semibold text-charcoal-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.text}</p>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-12 inline-block text-sm font-semibold text-[#1565c0] underline-offset-4 hover:underline"
        >
          Contact the farm
        </Link>
      </div>
    </div>
  );
}
