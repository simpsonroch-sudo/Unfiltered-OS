import { useMemo, useState } from 'react';
import BookingForm from '../components/BookingForm';

const initial = {
  clientName: '',
  service: '',
  date: '',
  status: 'Inquiry',
  paymentStatus: 'Unpaid',
  amountDue: 0,
};

const allStatuses = ['All', 'Inquiry', 'Quote Sent', 'Awaiting Deposit', 'Booked', 'Completed', 'Cancelled'];

export default function BookingsPage({ bookings, onAdd, onUpdate, onDelete }) {
  const [formData, setFormData] = useState(initial);
  const [editingId, setEditingId] = useState(null);
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = useMemo(
    () => (activeStatus === 'All' ? bookings : bookings.filter((item) => item.status === activeStatus)),
    [bookings, activeStatus],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await onUpdate(editingId, formData);
    } else {
      await onAdd(formData);
    }
    setFormData(initial);
    setEditingId(null);
  };

  const onEdit = (booking) => {
    setEditingId(booking.id);
    setFormData({
      clientName: booking.clientName,
      service: booking.service,
      date: booking.date,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      amountDue: booking.amountDue,
    });
  };

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-lg font-semibold">{editingId ? 'Edit Booking' : 'Add Booking'}</h2>
        <div className="mt-4">
          <BookingForm
            formData={formData}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            onSubmit={handleSubmit}
            onCancel={
              editingId
                ? () => {
                    setEditingId(null);
                    setFormData(initial);
                  }
                : undefined
            }
            submitLabel={editingId ? 'Update booking' : 'Create booking'}
          />
        </div>
      </section>

      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Bookings</h2>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <button
                type="button"
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`rounded-lg px-3 py-1 text-xs ${
                  activeStatus === status ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-2">Client</th>
                <th className="py-2">Service</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Payment</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-100">
                  <td className="py-3">{booking.clientName}</td>
                  <td className="py-3">{booking.service}</td>
                  <td className="py-3">{booking.date}</td>
                  <td className="py-3">{booking.status}</td>
                  <td className="py-3">{booking.paymentStatus}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="btn-secondary px-2 py-1 text-xs" type="button" onClick={() => onEdit(booking)}>
                        Edit
                      </button>
                      <button className="btn-secondary px-2 py-1 text-xs" type="button" onClick={() => onDelete(booking.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-500">No bookings yet.</p>}
        </div>
      </section>
    </div>
  );
}
