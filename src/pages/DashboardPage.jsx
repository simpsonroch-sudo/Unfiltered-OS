import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function DashboardPage({ bookings }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyBookings = bookings.filter((item) => {
    const date = new Date(item.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyBookings
    .filter((item) => item.status === 'Completed')
    .reduce((sum, item) => sum + Number(item.amountDue || 0), 0);

  const outstanding = bookings
    .filter((item) => item.paymentStatus !== 'Paid in Full')
    .reduce((sum, item) => sum + Number(item.amountDue || 0), 0);

  const upcoming = bookings.filter((item) => new Date(item.date) >= now && item.status !== 'Cancelled').length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Monthly income" value={currency.format(monthlyIncome)} />
        <StatCard label="Bookings this month" value={monthlyBookings.length} />
        <StatCard label="Upcoming bookings" value={upcoming} />
        <StatCard label="Outstanding payments" value={currency.format(outstanding)} />
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/clients">
            Add Client
          </Link>
          <Link className="btn-secondary" to="/bookings">
            Add Booking
          </Link>
          <Link className="btn-secondary" to="/pricing">
            Open Pricing Calculator
          </Link>
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Upcoming bookings</h2>
        <div className="mt-4 space-y-3">
          {bookings
            .filter((item) => new Date(item.date) >= now)
            .slice(0, 5)
            .map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                <div>
                  <p className="font-medium">{item.clientName}</p>
                  <p className="text-sm text-slate-500">
                    {item.service} • {item.date}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{item.status}</span>
              </div>
            ))}
          {bookings.filter((item) => new Date(item.date) >= now).length === 0 && (
            <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">No upcoming bookings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
