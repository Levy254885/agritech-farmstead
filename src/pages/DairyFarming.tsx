export function DairyFarming() {
  const sections = [
    { title: 'Our herd', text: 'We maintain a dairy herd managed for health, productivity, and welfare. Daily observation and routine care are part of how we protect milk quality at the source.' },
    { title: 'Feeding', text: 'Nutrition is planned to support healthy animals. We focus on consistent, appropriate feed as a foundation for reliable production.' },
    { title: 'Animal care', text: 'Veterinary attention, clean housing where applicable, and attentive stockmanship are priorities on the farm.' },
    { title: 'Milking & hygiene', text: 'Milking routines emphasise cleanliness and careful handling so that milk leaves the parlour in good condition.' },
    { title: 'Quality control', text: 'From cooling to packaging, we follow steps intended to preserve freshness and meet the expectations of our customers.' },
    { title: 'Responsible farming', text: 'We aim to use resources thoughtfully and care for the land that supports the dairy operation.' },
  ];

  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Dairy farming</h1>
          <p className="prose-farm mt-4 max-w-2xl text-lg">
            How we manage the dairy operation — from the herd to the milk that reaches your table.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 aspect-[21/9] overflow-hidden rounded-lg bg-forest-100">
            <img src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1400&q=80" alt="Dairy cows on pasture" className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-semibold text-forest-800">{s.title}</h2>
                <p className="mt-3 text-charcoal-700 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
