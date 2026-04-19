import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClientDetailPage({ fetchClient, saveClient }) {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetchClient(clientId).then(setClient);
  }, [clientId, fetchClient]);

  if (!client) {
    return <div className="card">Loading client details...</div>;
  }

  return (
    <section className="card space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{client.name}</h2>
        <p className="text-slate-500">{client.contact}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span>Service booked</span>
          <input className="input" value={client.serviceBooked || ''} onChange={(e) => setClient((p) => ({ ...p, serviceBooked: e.target.value }))} />
        </label>
        <label className="space-y-1 text-sm">
          <span>Booking date</span>
          <input className="input" type="date" value={client.bookingDate || ''} onChange={(e) => setClient((p) => ({ ...p, bookingDate: e.target.value }))} />
        </label>
        <label className="space-y-1 text-sm md:col-span-2">
          <span>Notes</span>
          <textarea className="input min-h-24" value={client.notes || ''} onChange={(e) => setClient((p) => ({ ...p, notes: e.target.value }))} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={client.depositPaid || false} onChange={(e) => setClient((p) => ({ ...p, depositPaid: e.target.checked }))} />
          Deposit paid
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={client.fullPaymentPaid || false} onChange={(e) => setClient((p) => ({ ...p, fullPaymentPaid: e.target.checked }))} />
          Full payment paid
        </label>
        <label className="space-y-1 text-sm">
          <span>Amount due</span>
          <input className="input" type="number" value={client.amountDue || 0} onChange={(e) => setClient((p) => ({ ...p, amountDue: Number(e.target.value) }))} />
        </label>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Status history</p>
        <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-600">
          {(client.statusHistory || []).join(' → ') || 'No status history yet'}
        </div>
      </div>

      <button
        className="btn-primary"
        type="button"
        onClick={async () => {
          await saveClient(clientId, {
            ...client,
            updatedAt: new Date().toISOString(),
          });
        }}
      >
        Save changes
      </button>
    </section>
  );
}
