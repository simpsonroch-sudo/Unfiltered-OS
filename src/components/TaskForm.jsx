const priorities = ['low', 'medium', 'high'];

export default function TaskForm({ formData, onChange, onSubmit, onCancel, submitLabel = 'Add task' }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm md:col-span-2">
          <span>Task title</span>
          <input className="input" name="title" value={formData.title} onChange={onChange} placeholder="e.g. Send invoice to client" required />
        </label>
        <label className="space-y-1 text-sm md:col-span-2">
          <span>Description (optional)</span>
          <textarea
            className="input min-h-24"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Any context or details"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span>Due date (optional)</span>
          <input className="input" type="date" name="dueDate" value={formData.dueDate} onChange={onChange} />
        </label>
        <label className="space-y-1 text-sm">
          <span>Priority</span>
          <select className="input" name="priority" value={formData.priority} onChange={onChange}>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
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
