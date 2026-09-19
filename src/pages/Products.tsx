import { Link } from 'react-router-dom';

const groups = [
  {
    title: 'Livestock',
    items: [
      { name: 'Piglets', note: 'Weaned piglets for herd expansion' },
      { name: 'Pregnant sows', note: 'Breeding sows confirmed in pig' },
      { name: 'Boars', note: 'Breeding boars for your programme' },
      { name: 'Gilts', note: 'Young females ready for breeding' },
    ],
  },
  {
    title: 'Butchery',
    items: [
      { name: 'Fresh pork', note: 'Farm pork and special cuts' },
      { name: 'Kienyeji chicken', note: 'Free-range style birds' },
      { name: 'Broiler chicken', note: 'Fresh birds for home and bulk orders' },
      { name: 'Eggs', note: 'Farm eggs by the tray' },
    ],
  },
];

export function Products() {
  return (
    <div className="bg-white">
      <div className="border-b border-charcoal-200">
        <div className="container-page py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
            Our products
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal-900 sm:text-5xl">
            Livestock and farm foods
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
            Breeding stock, fresh pork, chicken and eggs from Agritech
            Farmstead. Browse the Farm Shop for current prices and availability,
            or contact us to confirm stock.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex bg-[#1e88e5] px-6 py-3 text-sm font-bold text-white hover:bg-[#1565c0]"
          >
            Open Farm Shop
          </Link>
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="font-display text-2xl text-charcoal-900">
                {g.title}
              </h2>
              <ul className="mt-6 space-y-4 border-t border-charcoal-200 pt-6">
                {g.items.map((item) => (
                  <li key={item.name} className="flex justify-between gap-4">
                    <span className="text-sm font-semibold text-charcoal-900">
                      {item.name}
                    </span>
                    <span className="text-right text-sm text-charcoal-500">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
