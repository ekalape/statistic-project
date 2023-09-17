import './style.scss';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import wowLogo from '../../assets/w-icon.png';
import { NavLink, useLocation } from 'react-router-dom';

import { DateChooser } from '../DateChooser';
import { useCharsStore } from '../../store/store';

const displayedToday = new Date();

function Header() {
  const loc = useLocation();
  const getPathname = loc.pathname;

  const [destination, setDestination] = useState(
    getPathname === '/stats' ? 'Statistics' : 'Add earning',
  );
  const [logoName, setLogoName] = useState(destination);

  const sign = new Date(useCharsStore((state) => state.timeSign));

  const setSign = useCharsStore((state) => state.setTimeSign);

  function handleTimeSign(value: Date) {
    setSign(value);
  }

  useEffect(() => {
    setDestination(loc.pathname === '/stats' ? 'Statistics' : 'Add earning');
  }, [loc]);
  useEffect(() => {
    setLogoName(destination);
  }, [destination]);

  return (
    <Navbar expand='md' className='bg-body-tertiary ' fixed='top'>
      <Container className='justify-content-space-between'>
        <Navbar.Brand
          href='/'
          className='ms-2 d-flex align-items-center gap-0 flex-column p-0 pt-1'
          style={{ width: '60px' }}>
          <img src={wowLogo} alt='Wow logo' className='logo-image' />
          <span className='fs-7 fst-italic text-secondary d-none d-sm-block'>{logoName}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='order-1' />
        <Navbar.Collapse
          aria-controls='basic-navbar-nav'
          className='justify-content-end justify-content-md-center order-0 order-md-1'>
          <Nav
            className='justify-content-space-between justify-content-end'
            activeKey={logoName}
            fill>
            <NavLink to='/add' className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
              Add earning
            </NavLink>
            <NavLink to='/stats' className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
              Statistics
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <div className='w-25 order-0 order-md-2 d-flex align-items-center justify-content-end'>
          <Badge bg='transparent' text='secondary' className=' fs-6 fst-italic'>
            Today - {displayedToday.toLocaleDateString()}
          </Badge>
          <DateChooser label={'Sign'} day={sign} handleDate={handleTimeSign} size='sm' />
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
