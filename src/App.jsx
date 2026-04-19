import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import BookingsPage from './pages/BookingsPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailPage from './pages/ClientDetailPage';
import IncomePage from './pages/IncomePage';
import {
  addBooking,
  deleteBooking,
  ensureUserProfile,
  getClient,
  subscribeToBookings,
  subscribeToClients,
  updateBooking,
  upsertClient,
} from './lib/firestoreService';

const routeTitles = {
  '/': 'Dashboard',
  '/pricing': 'Pricing Calculator',
  '/bookings': 'Bookings',
  '/clients': 'Clients',
  '/income': 'Income Tracker',
};

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!user) return;

    ensureUserProfile(user.uid, {
      email: user.email,
      createdAt: new Date().toISOString(),
      appName: 'Unfiltered OS',
    });

    const unsubBookings = subscribeToBookings(user.uid, setBookings);
    const unsubClients = subscribeToClients(user.uid, setClients);

    return () => {
      unsubBookings();
      unsubClients();
    };
  }, [user]);

  const title = useMemo(() => {
    if (location.pathname.startsWith('/clients/')) return 'Client Details';
    return routeTitles[location.pathname] || 'Unfiltered OS';
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Layout title={title}>
              <Routes>
                <Route path="/" element={<DashboardPage bookings={bookings} />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route
                  path="/bookings"
                  element={
                    <BookingsPage
                      bookings={bookings}
                      onAdd={(payload) => addBooking(user.uid, payload)}
                      onUpdate={(id, payload) => updateBooking(user.uid, id, payload)}
                      onDelete={(id) => deleteBooking(user.uid, id)}
                    />
                  }
                />
                <Route path="/income" element={<IncomePage bookings={bookings} />} />
                <Route path="/clients" element={<ClientsPage clients={clients} onSaveClient={(id, data) => upsertClient(user.uid, id, data)} />} />
                <Route
                  path="/clients/:clientId"
                  element={<ClientDetailPage fetchClient={(id) => getClient(user.uid, id)} saveClient={(id, data) => upsertClient(user.uid, id, data)} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
