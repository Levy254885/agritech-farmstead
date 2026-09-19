import { Link } from 'react-router-dom';

const practices = [
  {
    title: 'Animal welfare',
    text: 'Clean housing, adequate space and daily observation help keep our pigs healthy and productive.',
  },
  {
    title: 'Feeding',
    text: 'Balanced rations support growth for piglets and condition for breeding stock.',
  },
  {
    title: 'Breeding stock',
    text: 'We select and manage gilts, boars and sows carefully so buyers receive animals fit for their programmes.',
  },
  {
    title: 'Butchery hygiene',
    text: 'Meat and poultry products are handled with attention to cleanliness and cold storage where required.',
  },
  {
    title: 'Transparency',
    text: 'We confirm availability, expected weights and collection details before you commit to an order.',
  },
];

export function DairyFarming() {
  return (
    <div className="bg-white">
      <div className="border-b border-charcoal-200">
        <div className="container-page py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
            Our practices
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal-900 sm:text-5xl">
            Livestock farming
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
            How we manage the pig unit and butchery — from animal care to the
            products that leave the farm.
          </p>
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="aspect-[4/3] overflow-hidden bg-charcoal-100">
            <img
              src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1000&q=80"
              alt="Pigs on the farm"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-8">
            {practices.map((p) => (
              <div key={p.title}>
                <h2 className="text-base font-semibold text-charcoal-900">
                  {p.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                  {p.text}
                </p>
              </div>
            ))}
            <Link
              to="/shop"
              className="inline-block text-sm font-semibold text-[#1565c0] underline-offset-4 hover:underline"
            >
              Browse livestock and butchery products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
