// carrier.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { initializeAuth } from './features/auth/authSlice';
import ProtectedRoute from './features/auth/ProtectedRoute';
import SignInForm from './components/SignIn|signup/SignIn';
import App from './App';

function Carrier() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<SignInForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<App />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default Carrier;