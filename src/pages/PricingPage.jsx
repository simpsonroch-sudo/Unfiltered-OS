import { useMemo, useState } from 'react';
import { calculatePricing } from '../utils/pricing';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function PricingPage() {
  const [form, setForm] = useState({
    serviceName: '',
    baseCost: 100,
    hours: 2,
    margin: 40,
    addons: 0,
    travelFee: 0,
    rushFee: 0,
    depositPercentage: 30,
  });

  const pricing = useMemo(() => calculatePricing(form), [form]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">Pricing Calculator</h2>
        <p className="text-sm text-slate-500">Keep your pricing consistent and profitable.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['serviceName', 'Service name', 'text'],
            ['baseCost', 'Base cost', 'number'],
            ['hours', 'Time required (hours)', 'number'],
            ['margin', 'Desired profit margin (%)', 'number'],
            ['addons', 'Optional add-ons ($)', 'number'],
            ['travelFee', 'Travel fee ($)', 'number'],
            ['rushFee', 'Rush fee ($)', 'number'],
            ['depositPercentage', 'Deposit percentage (%)', 'number'],
          ].map(([key, label, type]) => (
            <label className="space-y-1 text-sm" key={key}>
              <span>{label}</span>
              <input
                className="input"
                type={type}
                min={type === 'number' ? 0 : undefined}
                value={form[key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h3 className="text-lg font-semibold">Recommended Pricing</h3>
        <div className="rounded-xl bg-brand-50 p-4">
          <p className="text-sm text-brand-700">Suggested final price</p>
          <p className="text-3xl font-semibold text-brand-900">{money.format(pricing.finalPrice)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Deposit amount</p>
          <p className="text-xl font-semibold">{money.format(pricing.depositAmount)}</p>
        </div>

        <div className="space-y-3">
          {[['Basic', pricing.packages.basic], ['Standard', pricing.packages.standard], ['Premium', pricing.packages.premium]].map(
            ([name, price]) => (
              <div key={name} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span className="font-medium">{name}</span>
                <span>{money.format(price)}</span>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
