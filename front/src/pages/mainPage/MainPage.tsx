import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

function MainPage() {
  const pathloc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathloc.pathname === '/') navigate('/add');
  }, [pathloc]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainPage;
