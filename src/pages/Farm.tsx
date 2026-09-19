import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Livestock unit',
    text: 'Our pig unit is organised around clean housing, balanced feed and daily observation so animals remain healthy and productive.',
  },
  {
    title: 'Breeding stock',
    text: 'We offer piglets, gilts, boars and pregnant sows for farmers building or expanding their herds. Availability follows the breeding calendar.',
  },
  {
    title: 'Butchery',
    text: 'On the farm we prepare fresh pork, chicken and eggs for customers who prefer farm-sourced meat and poultry products.',
  },
  {
    title: 'Visits & collection',
    text: 'Farm collection is preferred for livestock. Contact us ahead of time so we can confirm stock and guide you on the best time to collect.',
  },
];

export function Farm() {
  return (
    <div className="bg-white">
      <div className="border-b border-charcoal-200">
        <div className="container-page py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
            The farm
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal-900 sm:text-5xl">
            Where our livestock and products begin
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
            Agritech Farmstead is a working farm focused on pig production and
            a practical butchery for fresh pork, chicken and eggs.
          </p>
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden bg-charcoal-100 md:sticky md:top-24 md:self-start">
            <img
              src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1000&q=80"
              alt="Farm livestock housing"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl text-charcoal-900">
                  {s.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-charcoal-600">
                  {s.text}
                </p>
              </div>
            ))}
            <Link
              to="/contact"
              className="inline-block text-sm font-semibold text-[#1565c0] underline-offset-4 hover:underline"
            >
              Plan a farm visit or order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
