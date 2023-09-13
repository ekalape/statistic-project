import { useLocation } from 'react-router-dom';
import './App.scss';

import Router from './routes';
import { useEffect } from 'react';

function App() {
  const getPathname = useLocation().pathname;

  useEffect(() => {
    console.log(' inside app getPathname --> ', getPathname);
  }, [getPathname]);

  return <Router />;
}

export default App;
