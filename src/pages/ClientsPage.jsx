import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClientsPage({ clients, onSaveClient }) {
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ name: '', contact: '', notes: '' });

  const filtered = useMemo(
    () => clients.filter((client) => client.name?.toLowerCase().includes(query.toLowerCase())),
    [clients, query],
  );

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-lg font-semibold">Add Client</h2>
        <form
          className="mt-4 grid gap-3 md:grid-cols-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const id = crypto.randomUUID();
            await onSaveClient(id, {
              ...form,
              depositPaid: false,
              fullPaymentPaid: false,
              amountDue: 0,
              statusHistory: ['Client created'],
              updatedAt: new Date().toISOString(),
            });
            setForm({ name: '', contact: '', notes: '' });
          }}
        >
          <input className="input" placeholder="Client name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <input className="input" placeholder="Contact info" value={form.contact} onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))} required />
          <input className="input" placeholder="Notes" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
          <button className="btn-primary md:col-span-3 md:w-max" type="submit">
            Save client
          </button>
        </form>
      </section>

      <section className="card">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Clients</h2>
          <input className="input max-w-xs" placeholder="Search clients" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="mt-4 space-y-3">
          {filtered.map((client) => (
            <Link key={client.id} to={`/clients/${client.id}`} className="block rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-slate-500">{client.contact}</p>
            </Link>
          ))}
          {filtered.length === 0 && <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">No clients found.</p>}
        </div>
      </section>
    </div>
  );
}
