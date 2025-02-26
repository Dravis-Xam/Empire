// ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to='/signin' replace />;
  }

  return children;
};

export default ProtectedRoute;