import { Routes, Route } from 'react-router-dom';
import { AddPage } from '../pages/add_page';
import { StatsPage } from '../pages/stats_page';
import { MainPage } from '../pages/mainPage';

function Router() {
  return (
    <>
      <Routes>
        <Route element={<MainPage />}>
          <Route path={'/'} element={<AddPage />} />
          <Route path={'/add'} element={<AddPage />} />
          <Route path={'/stats'} element={<StatsPage />} />
          <Route path={'*'} element={<div>Not found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
