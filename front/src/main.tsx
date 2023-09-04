import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddPage } from './pages/add_page/index.tsx';
import { StatsPage } from './pages/stats_page/index.tsx';

const router = createBrowserRouter([
  {
    path: '/add',
    element: <AddPage />,
  },
  {
    path: '/stats',
    element: <StatsPage />,
  },
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
