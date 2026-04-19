const statuses = ['Inquiry', 'Quote Sent', 'Awaiting Deposit', 'Booked', 'Completed', 'Cancelled'];

export default function BookingForm({ formData, onChange, onSubmit, onCancel, submitLabel = 'Save' }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span>Client name</span>
          <input className="input" name="clientName" value={formData.clientName} onChange={onChange} required />
        </label>
        <label className="space-y-1 text-sm">
          <span>Service</span>
          <input className="input" name="service" value={formData.service} onChange={onChange} required />
        </label>
        <label className="space-y-1 text-sm">
          <span>Date</span>
          <input className="input" type="date" name="date" value={formData.date} onChange={onChange} required />
        </label>
        <label className="space-y-1 text-sm">
          <span>Status</span>
          <select className="input" name="status" value={formData.status} onChange={onChange}>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span>Payment status</span>
          <select className="input" name="paymentStatus" value={formData.paymentStatus} onChange={onChange}>
            <option>Unpaid</option>
            <option>Deposit Paid</option>
            <option>Paid in Full</option>
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span>Amount due</span>
          <input
            className="input"
            type="number"
            min="0"
            name="amountDue"
            value={formData.amountDue}
            onChange={onChange}
            required
          />
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
