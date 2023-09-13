import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';

function MainPage() {
  const pathloc = useLocation().pathname;
  const lastDestination = pathloc.slice(1) || localStorage.getItem('wwekl-lastdestination');

  useEffect(() => {
    console.log(' inside mainpage pathloc --> ', pathloc);
  }, [pathloc]);
  return (
    <>
      <Header />
      {lastDestination === 'stats' ? <Navigate to={'/stats'} /> : <Navigate to={'/add'} />}
      <Outlet />
    </>
  );
}

export default MainPage;
