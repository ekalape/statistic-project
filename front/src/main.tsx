import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddPage } from './pages/add_page/index.tsx';
import { StatsPage } from './pages/stats_page/index.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './routes/index.tsx';

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
    <App />
  </React.StrictMode>,
);
