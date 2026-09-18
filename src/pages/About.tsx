export function About() {
  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-forest-600">
            About us
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Agritech Farmstead
          </h1>
          <p className="prose-farm mt-6 text-lg">
            We are a Kenyan dairy farming business focused on producing quality
            milk and farm products with care for our animals, our land, and the
            households that trust us.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-forest-100">
            <img
              src="https://images.unsplash.com/photo-1516467501853-1efe0f6f07a9?w=1000&q=80"
              alt="Dairy farm landscape"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Who we are
            </h2>
            <p className="prose-farm mt-4">
              Agritech Farmstead operates a dairy farming enterprise where daily
              routines — feeding, animal health, milking, and hygiene — are
              managed with consistency. Our goal is straightforward: reliable,
              quality products that reflect the care taken on the farm.
            </p>
            <p className="prose-farm mt-4">
              [Farm Description — replace with client-provided detail about
              history, location, and scale.]
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-forest-100 bg-white section-padding">
        <div className="container-page">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            What guides us
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Quality',
                text: 'From the parlour to packaging, we prioritise practices that protect the integrity of our milk and farm products.',
              },
              {
                title: 'Responsibility',
                text: 'Animal welfare and thoughtful use of resources are part of how we run the farm day to day.',
              },
              {
                title: 'Trust',
                text: 'We aim to be a dependable source for families and customers who value farm-fresh products.',
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="text-lg font-semibold text-forest-800">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
