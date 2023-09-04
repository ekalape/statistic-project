import React from 'react';
import { Header } from '../../components/Header';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

function MainPage() {
  const lastDestination =
    useLocation().pathname.slice(1) || localStorage.getItem('wwekl-lastdestination');
  console.log(lastDestination);
  return (
    <>
      <Header />
      {lastDestination && lastDestination === 'add' ? (
        <Navigate to={'/add'} />
      ) : (
        <Navigate to={'/stats'} />
      )}
      <Outlet />
    </>
  );
}

export default MainPage;
