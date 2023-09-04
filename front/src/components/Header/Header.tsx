import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import wowLogo from '../../assets/main-wow-icon.png';
import { useLocation } from 'react-router-dom';

function Header() {
  const lastDestination = useLocation().pathname.slice(1) === 'add' ? 'Add earning' : 'Statistics';
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/'>
          <img src={wowLogo} alt='Wow logo' />
          <span>{lastDestination}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Nav className='me-auto'>
          <Nav.Link href='/add'>Add earning</Nav.Link>
          <Nav.Link href='/stats'>Statistics</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
