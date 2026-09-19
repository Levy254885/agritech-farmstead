import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="bg-white">
      <div className="border-b border-charcoal-200">
        <div className="container-page py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
            About us
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal-900 sm:text-5xl">
            Agritech Farmstead
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
            We are a Kenyan livestock and farm-products business focused on
            quality breeding stock, fresh meat and everyday farm foods —
            supplied with care for our animals, our customers and the land we
            work on.
          </p>
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="aspect-[4/3] overflow-hidden bg-charcoal-100">
            <img
              src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1000&q=80"
              alt="Livestock on the farm"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl text-charcoal-900 sm:text-3xl">
              What we do
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              Agritech Farmstead raises pigs for sale as piglets, gilts, boars
              and pregnant sows. We also run a butchery offering fresh pork,
              kienyeji and broiler chicken, and farm eggs. Orders are confirmed
              by phone or WhatsApp before fulfilment.
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  title: 'Livestock',
                  text: 'Healthy piglets and breeding stock managed with attention to housing, feeding and welfare.',
                },
                {
                  title: 'Butchery',
                  text: 'Fresh pork cuts, chicken and eggs prepared for households and regular customers.',
                },
                {
                  title: 'Direct supply',
                  text: 'Farm collection and arranged delivery options. We confirm stock before you travel.',
                },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-semibold text-charcoal-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/shop"
              className="mt-10 inline-block text-sm font-semibold text-[#1565c0] underline-offset-4 hover:underline"
            >
              Visit the Farm Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
