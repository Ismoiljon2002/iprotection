import 'aos/dist/aos.css';
import AOS from 'aos';
// Header and Footer layout components import
// Outlet for other routes (Home, Team and other pages)
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import NavbarComponent from './Header';

const Layout = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic'
    });
  }, []);
  return (
    <>
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
