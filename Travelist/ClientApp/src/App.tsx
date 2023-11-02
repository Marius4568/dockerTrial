import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';

import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';

function Root() { 
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
      </Route>

    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
