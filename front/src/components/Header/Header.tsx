import './style.scss';
import { useState } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import wowLogo from '../../assets/main-wow-icon.png';
import { useLocation } from 'react-router-dom';

import { DateChooser } from '../DateChooser';
import { useCharsStore } from '../../store/store';

function Header() {
  const getPathname = useLocation().pathname;
  const lastDestination = getPathname === '/stats' ? 'Statistics' : 'Add earning';
  const [logoName, setLogoName] = useState(lastDestination);

  const sign = new Date(useCharsStore((state) => state.timeSign));

  const setSign = useCharsStore((state) => state.setTimeSign);

  function handleTimeSign(value: Date) {
    setSign(value);
  }

  const displayedToday = new Date();
  const changeLogoName = (key: string | null) => {
    let text = key || 'Add earning';
    setLogoName(text);
  };
  return (
    <Navbar expand='md' className='bg-body-tertiary' fixed='top'>
      <Container className='justify-content-space-between'>
        <Navbar.Brand
          href='/'
          className='brand-addition d-flex align-items-center gap-0 flex-column'>
          <img src={wowLogo} alt='Wow logo' className='logo-image' />
          <span className='fs-7 fst-italic text-secondary d-none d-sm-block'>{logoName}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='order-1' />
        <Navbar.Collapse
          aria-controls='basic-navbar-nav'
          className='justify-content-center order-0 order-md-1'>
          <Nav
            className='justify-content-space-between '
            activeKey={logoName}
            fill
            onSelect={(key) => changeLogoName(key)}>
            <Nav.Link eventKey='Add earning' href='/add'>
              Add earning
            </Nav.Link>
            <Nav.Link eventKey='Statistics' href='/stats'>
              Statistics
            </Nav.Link>
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
