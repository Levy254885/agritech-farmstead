import { Link } from 'react-router-dom';

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

function LegalLayout({ title, children }: LegalPageProps) {
  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-page py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="prose-farm mt-8 max-w-3xl space-y-4 text-sm leading-relaxed">
          {children}
        </div>
        <Link to="/" className="mt-10 inline-block text-sm text-forest-700 hover:text-forest-900">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        This page is a placeholder for Agritech Farmstead’s privacy policy.
        Replace with legal text reviewed for Kenyan data protection requirements.
      </p>
      <p>
        We may collect contact details when you place an order or use the contact form.
        That information is used to fulfil orders and respond to enquiries.
      </p>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        These terms are placeholders. Replace with terms reviewed for the farm’s sales and delivery policies.
      </p>
      <p>
        By placing an order through the Farm Shop, you agree to provide accurate contact information
        and to complete payment as arranged via WhatsApp.
      </p>
    </LegalLayout>
  );
}

export function ShippingDelivery() {
  return (
    <LegalLayout title="Shipping & Delivery">
      <p>
        Delivery is available in configured zones. Farm pickup is available at the farm gate.
        Exact areas, fees, and timelines will be confirmed when you place an order via WhatsApp.
      </p>
    </LegalLayout>
  );
}

export function ReturnsRefunds() {
  return (
    <LegalLayout title="Returns & Refunds">
      <p>
        Because many of our products are perishable, returns and refunds are handled case by case.
        Contact us on WhatsApp promptly if there is an issue with your order.
      </p>
    </LegalLayout>
  );
}
