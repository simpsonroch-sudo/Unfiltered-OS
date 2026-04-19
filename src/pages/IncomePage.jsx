const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function IncomePage({ bookings }) {
  const completed = bookings.filter((item) => item.status === 'Completed');
  const monthlyIncome = completed.reduce((sum, item) => sum + Number(item.amountDue || 0), 0);
  const outstanding = bookings
    .filter((item) => item.paymentStatus !== 'Paid in Full')
    .reduce((sum, item) => sum + Number(item.amountDue || 0), 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="card">
          <p className="text-sm text-slate-500">Completed jobs</p>
          <p className="mt-2 text-2xl font-semibold">{completed.length}</p>
        </article>
        <article className="card">
          <p className="text-sm text-slate-500">Monthly income total</p>
          <p className="mt-2 text-2xl font-semibold">{money.format(monthlyIncome)}</p>
        </article>
        <article className="card">
          <p className="text-sm text-slate-500">Outstanding balances</p>
          <p className="mt-2 text-2xl font-semibold">{money.format(outstanding)}</p>
        </article>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Payment summary</h2>
        <div className="mt-4 space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <div>
                <p className="font-medium">{booking.clientName}</p>
                <p className="text-sm text-slate-500">{booking.service}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{money.format(Number(booking.amountDue || 0))}</p>
                <p className="text-xs text-slate-500">{booking.paymentStatus}</p>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">No income data yet.</p>}
        </div>
      </section>
    </div>
  );
}
