import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';

import { getCurrentUser } from './api/userService.ts';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import { signInFailure, signInStart, signInSuccess } from './redux/slices/userSlice.ts';
import { AppDispatch } from './redux/stores/store.ts';

function Root() { 
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getUser() {

      try {
        if(token){
          dispatch(signInStart());
          const userData = await getCurrentUser(token);
          dispatch(signInSuccess(userData));
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch(signInFailure(err.message));
        } else {
          dispatch(signInFailure('An unknown error occurred. Try again later'));
        }
      }

    }
   
    getUser()
      .catch(() => {});

  }, [dispatch]);

  return (
    <>
      <Header />
      <div className='min-h-[calc(100vh-var(--footer-height))]'>
        <Outlet />
      </div>
      <Footer />
    </>

  );
};

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
