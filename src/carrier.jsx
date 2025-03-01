import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { initializeAuth } from './features/auth/authSlice';
import ProtectedRoute from './features/auth/ProtectedRoute';
import SignInForm from './components/SignIn|signup/SignIn';
import SignUpForm from './components/SignIn|signup/SignUp';
import App from './App';
import Cart from './components/cart/Cart';
import Payment from './components/payment/Payment';
import Profile from './components/Profile/Profile';
import AuthFormsContainer from './components/SignIn|signup/AuthFormsContainer';
import ErrorBoundary from './features/auth/ErrorBoundary.jsx';

function Carrier() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Get total price from Redux store
  const discountedPrice = useSelector((state) => state.cart.discountedPrice); // Get discounted price from Redux store
  const discount = useSelector((state) => state.cart.discount); // Get discount from Redux store

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path='/' element={<App />}>
        {/* Public Routes */}
        <Route path='signin' element={<SignInForm />} />
        <Route path='signup' element={<SignUpForm />} />
        <Route path='cart' element={<Cart />} />
        <Route path='/login' element={<AuthFormsContainer />} />
        <Route path='/signup' element={<AuthFormsContainer />} />

        {/* Protected Routes */}
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='payment'
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Payment
                  cart={cartItems}
                  totalPrice={totalPrice}
                  discountedPrice={discountedPrice}
                  discount={discount}
                  onClose={() => navigate('/')} // Navigate to home on close
                />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default Carrier;