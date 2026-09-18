export function Sustainability() {
  const topics = [
    { title: 'Responsible farming', text: 'We aim to run the dairy operation in a way that respects animals, land, and the resources we depend on.' },
    { title: 'Animal welfare', text: 'Healthy animals are central to our approach. Care routines and living conditions are managed with welfare in mind.' },
    { title: 'Resource use', text: 'We work to use water, feed, and energy thoughtfully as part of everyday farm management.' },
    { title: 'Land & soil', text: 'Looking after the land that supports the farm is part of long-term, practical agriculture.' },
    { title: 'Waste & by-products', text: 'Where practical, we seek sensible ways to manage waste and make use of farm by-products.' },
  ];

  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Sustainability</h1>
          <p className="prose-farm mt-4 max-w-2xl text-lg">
            Practical responsibility in how we farm — without overstated claims.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-page max-w-3xl">
          <p className="text-charcoal-700 leading-relaxed">
            Sustainability at Agritech Farmstead means everyday choices: animal care, careful use of resources, and attention to the land. We do not claim certifications or statistics that have not been verified.
          </p>
          <div className="mt-12 space-y-10">
            {topics.map((t) => (
              <div key={t.title}>
                <h2 className="text-xl font-semibold text-forest-800">{t.title}</h2>
                <p className="mt-2 text-charcoal-700 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
