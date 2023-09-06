import { Navigate, Outlet, useLocation } from 'react-router-dom';

function MainPage() {
  const lastDestination =
    useLocation().pathname.slice(1) || localStorage.getItem('wwekl-lastdestination');
  return (
    <>
      {lastDestination === 'stats' ? <Navigate to={'/stats'} /> : <Navigate to={'/add'} />}
      <Outlet />
    </>
  );
}

export default MainPage;
