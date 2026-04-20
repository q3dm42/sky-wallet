import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function GuestRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/expenses" replace />;
  }
  return children;
}

export default GuestRoute;
