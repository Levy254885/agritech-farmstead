export function Farm() {
  const areas = [
    {
      title: 'Farm overview',
      text: 'Agritech Farmstead is organised around dairy production, with supporting areas for animals, feed, and handling of milk and farm products.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80',
    },
    {
      title: 'Pastures & environment',
      text: 'Green space and outdoor areas support animal comfort and the broader farm environment. [Details to be confirmed with client.]',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80',
    },
    {
      title: 'Dairy facilities',
      text: 'Milking and milk handling areas are managed with attention to hygiene and efficient daily routines.',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900&q=80',
    },
  ];

  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Our farm</h1>
          <p className="prose-farm mt-4 max-w-2xl text-lg">
            A look at the place where our milk and farm products begin.
          </p>
        </div>
      </section>
      {areas.map((area, i) => (
        <section key={area.title} className={`section-padding ${i % 2 === 1 ? 'bg-white' : ''}`}>
          <div className={`container-page grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-forest-100">
              <img src={area.image} alt={area.title} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{area.title}</h2>
              <p className="prose-farm mt-4">{area.text}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
