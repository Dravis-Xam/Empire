// AuthFormsContainer.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeSignInForm,
  closeSignUpForm,
} from '../../features/auth/authSlice';
import SignInForm from './SignIn';
import SignUpForm from './SignUp';

export default function AuthFormsContainer() {
  const dispatch = useDispatch();
  const { isSignInFormOpen, isSignUpFormOpen } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(closeSignInForm());
      dispatch(closeSignUpForm());
    };
  }, [dispatch]);

  return (
    <>
      {isSignInFormOpen && <SignInForm />}
      {isSignUpFormOpen && <SignUpForm />}
    </>
  );
}
