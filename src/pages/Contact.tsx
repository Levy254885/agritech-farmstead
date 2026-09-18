import { useState, type FormEvent } from 'react';
import { SITE, whatsappUrl, telUrl } from '@/lib/site';
import { MessageCircle, Phone } from 'lucide-react';

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  }

  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact us</h1>
          <p className="prose-farm mt-4 text-lg">
            Reach out for orders, farm visits, or general enquiries.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-charcoal-900">Phone</dt>
                <dd className="mt-1">
                  <a href={telUrl()} className="text-forest-700 hover:text-forest-900">
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-charcoal-900">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-700 hover:text-forest-900"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-charcoal-900">Email</dt>
                <dd className="mt-1 text-charcoal-600">{SITE.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-charcoal-900">Location</dt>
                <dd className="mt-1 text-charcoal-600">{SITE.location}</dd>
              </div>
              <div>
                <dt className="font-medium text-charcoal-900">Business hours</dt>
                <dd className="mt-1 text-charcoal-600">{SITE.businessHours}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl('Hello Agritech Farmstead, I would like to enquire...')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a href={telUrl()} className="btn-secondary gap-2">
                <Phone className="h-4 w-4" />
                Call {SITE.phoneDisplay}
              </a>
            </div>

            <div className="mt-8 rounded-lg border border-dashed border-forest-200 bg-white p-6 text-sm text-charcoal-500">
              Google Maps embed placeholder — add map when location is confirmed.
            </div>
          </div>

          <div className="rounded-lg border border-forest-100 bg-white p-6 md:p-8">
            {sent ? (
              <div className="py-8 text-center">
                <p className="text-lg font-medium text-forest-800">Thank you for your message</p>
                <p className="mt-2 text-sm text-charcoal-600">
                  We will respond as soon as possible. For faster replies, message us on WhatsApp.
                </p>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 inline-flex gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">Name *</label>
                  <input
                    id="name"
                    required
                    className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
