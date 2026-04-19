import { Link, NavLink } from 'react-router-dom';
import { BriefcaseBusiness, Calculator, CalendarCheck2, CheckSquare, DollarSign, Home, Users } from 'lucide-react';
import { BriefcaseBusiness, Calculator, CalendarCheck2, DollarSign, Home, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/pricing', label: 'Pricing', icon: Calculator },
  { to: '/bookings', label: 'Bookings', icon: CalendarCheck2 },
  { to: '/income', label: 'Income', icon: DollarSign },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
];

export default function Sidebar({ open, onClose }) {
  const { logOut } = useAuth();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/30 md:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white p-5 transition md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link to="/" className="mb-8 flex items-center gap-3" onClick={onClose}>
          <div className="rounded-xl bg-brand-600 p-2 text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Unfiltered OS</p>
            <p className="text-xs text-slate-500">Run your business. Not just your talent.</p>
          </div>
        </Link>

        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/clients"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Users className="h-4 w-4" />
            Clients
          </NavLink>
        </nav>

        <button type="button" className="btn-secondary mt-8 w-full" onClick={logOut}>
          Log out
        </button>
      </aside>
    </>
  );
}
