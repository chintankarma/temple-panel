import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TempleForm from './screens/temple_screen/temple_form_screen/temple_form';
import { NavRoutes } from './utils/nav_routes';
import Layout from './commons/layout/Layout';
import Landing from './screens/landing_screen/Landing';
import Login from './screens/authentication_screens/login_screen/Login';
import Register from './screens/authentication_screens/register_screen/Register';
import Dashboard from './screens/dashboard_screen/Dashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={NavRoutes.LANDING} replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path={NavRoutes.LANDING} element={<Landing />} />
        <Route path={NavRoutes.LOGIN} element={<Login />} />
        <Route path={NavRoutes.REGISTER} element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path={NavRoutes.DASHBOARD.replace('/', '')} element={<Dashboard />} />
                  <Route path={NavRoutes.TEMPLE_EDIT.replace('/', '')} element={<TempleForm />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
