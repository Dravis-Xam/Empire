import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { initializeAuth } from './features/auth/authSlice'; 
import ProtectedRoute from './features/auth/ProtectedRoute';
import SignInForm from './components/SignIn_signup/SignIn';
import SignUpForm from './components/SignIn_signup/SignUp';
import App from './App';
import Cart from './components/cart/Cart';
import Profile from './components/Profile/Profile';
import AuthFormsContainer from './components/SignIn_signup/AuthFormsContainer';
import Payment from './components/payment/Payment';
import './index.css';

function Carrier() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [reducersLoaded, setReducersLoaded] = useState(false);
 // Get discount from Redux store

  useEffect(() => {
    dispatch(initializeAuth()).then(() => {
      setReducersLoaded(true); // Set reducersLoaded to true after auth initialization
    });
  }, [dispatch]);

  if (authLoading || !reducersLoaded) return <div className='loading-animation-container'></div>;

  return (
    <Routes>
      <Route path='/' element={<App />}>
        {/* Public Routes */}
        <Route path='signin' element={<SignInForm />} />
        <Route path='signup' element={<SignUpForm />} />
        <Route path='cart' element={<Cart />} />
        <Route path='/login' element={<AuthFormsContainer />} />
        <Route path='/signup' element={<AuthFormsContainer />} />
        <Route path='/payment' element={<Payment />} />

        {/* Protected Routes */}
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default Carrier;