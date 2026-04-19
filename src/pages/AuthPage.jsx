import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { user, signUp, logIn } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await signUp(form.email, form.password);
      } else {
        await logIn(form.email, form.password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card">
        <p className="text-sm font-medium text-brand-700">Unfiltered OS</p>
        <h1 className="mt-2 text-2xl font-semibold">Run your business. Not just your talent.</h1>
        <p className="mt-2 text-sm text-slate-500">Simple operating system for service-based creatives.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-1 text-sm">
            <span>Email</span>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </label>
          <label className="space-y-1 text-sm">
            <span>Password</span>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              minLength={6}
              required
            />
          </label>
          {error && <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-600">{error}</p>}
          <button className="btn-primary w-full" type="submit">
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <button className="mt-4 text-sm text-slate-600" type="button" onClick={() => setIsSignup((prev) => !prev)}>
          {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
