import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Public layouts & pages
import PublicLayout from './components/layouts/PublicLayout';
import Home from './pages/public/Home';
import Destinations from './pages/public/Destinations';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import DestinationDetail from './pages/public/DestinationDetail';
import Login from './pages/public/Login';

// Client area
import ClientLayout from './components/layouts/ClientLayout';
import ClientDashboard from './pages/client/Dashboard';
import ClientBookings from './pages/client/Bookings';
import ClientFavourites from './pages/client/Favourites';
import ClientProfile from './pages/client/Profile';

// Operator area
import OperatorLayout from './components/layouts/OperatorLayout';
import OperatorDashboard from './pages/operator/Dashboard';
import OperatorServices from './pages/operator/Services';
import OperatorBookings from './pages/operator/Bookings';
import OperatorProfile from './pages/operator/Profile';

// Admin area
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminOperators from './pages/admin/Operators';
import AdminBookings from './pages/admin/Bookings';
import AdminPayments from './pages/admin/Payments';

function App() {
  const { role, isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Login — sem header/footer, tem layout próprio */}
      <Route path="/entrar" element={<Login />} />

      {/* Public — com header e footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinations />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/contactos" element={<Contact />} />
        <Route path="/destinos/:id" element={<DestinationDetail />} />
      </Route>

      {/* Client */}
      <Route path="/cliente/*" element={isAuthenticated && role === 'client' ? <ClientLayout /> : <Navigate to="/entrar" />}>
        <Route index element={<ClientDashboard />} />
        <Route path="reservas" element={<ClientBookings />} />
        <Route path="favoritos" element={<ClientFavourites />} />
        <Route path="perfil" element={<ClientProfile />} />
      </Route>

      {/* Operator */}
      <Route path="/operador/*" element={isAuthenticated && role === 'operator' ? <OperatorLayout /> : <Navigate to="/entrar" />}>
        <Route index element={<OperatorDashboard />} />
        <Route path="servicos" element={<OperatorServices />} />
        <Route path="reservas" element={<OperatorBookings />} />
        <Route path="perfil" element={<OperatorProfile />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/*" element={isAuthenticated && role === 'admin' ? <AdminLayout /> : <Navigate to="/entrar" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="utilizadores" element={<AdminUsers />} />
        <Route path="operadores" element={<AdminOperators />} />
        <Route path="reservas" element={<AdminBookings />} />
        <Route path="pagamentos" element={<AdminPayments />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
