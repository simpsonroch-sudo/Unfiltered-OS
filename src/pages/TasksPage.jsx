import { useMemo, useState } from 'react';
import TaskForm from '../components/TaskForm';

const initialTask = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
};

const priorityClass = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

export default function TasksPage({ tasks, onAdd, onUpdate, onDelete, onToggleComplete }) {
  const [formData, setFormData] = useState(initialTask);
  const [editingId, setEditingId] = useState(null);

  const incompleteTasks = useMemo(
    () => tasks.filter((task) => !task.completed).sort((a, b) => (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31')),
    [tasks],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')),
    [tasks],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await onUpdate(editingId, { ...formData });
    } else {
      await onAdd({
        ...formData,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    }

    setFormData(initialTask);
    setEditingId(null);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate || '',
      priority: task.priority || 'medium',
    });
  };

  const TaskRow = ({ task }) => {
    const overdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString());

    return (
      <div className="rounded-xl border border-slate-200 p-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</p>
            {task.description && <p className="mt-1 text-sm text-slate-500">{task.description}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full px-2 py-1 ${priorityClass[task.priority] || priorityClass.medium}`}>{task.priority}</span>
              {task.dueDate && (
                <span className={`rounded-full px-2 py-1 ${overdue ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                  Due {task.dueDate}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary px-2 py-1 text-xs" onClick={() => onToggleComplete(task.id, !task.completed)}>
              {task.completed ? 'Mark incomplete' : 'Mark complete'}
            </button>
            <button type="button" className="btn-secondary px-2 py-1 text-xs" onClick={() => startEdit(task)}>
              Edit
            </button>
            <button type="button" className="btn-secondary px-2 py-1 text-xs" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-lg font-semibold">{editingId ? 'Edit Task' : 'Add Task'}</h2>
        <p className="mt-1 text-sm text-slate-500">Keep your business to-dos organized in one place.</p>
        <div className="mt-4">
          <TaskForm
            formData={formData}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            onSubmit={handleSubmit}
            onCancel={
              editingId
                ? () => {
                    setEditingId(null);
                    setFormData(initialTask);
                  }
                : undefined
            }
            submitLabel={editingId ? 'Update task' : 'Add task'}
          />
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Incomplete Tasks</h3>
        <div className="mt-4 space-y-3">
          {incompleteTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
          {incompleteTasks.length === 0 && (
            <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">No incomplete tasks. You are all caught up.</p>
          )}
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Completed Tasks</h3>
        <div className="mt-4 space-y-3">
          {completedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
          {completedTasks.length === 0 && <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">No completed tasks yet.</p>}
        </div>
      </section>
    </div>
  );
}
