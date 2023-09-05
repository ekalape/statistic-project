import React from 'react';
import './style.scss';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CharsContainer } from '../../components/CharsContainer';

function AddPage() {
  return (
    <Container className='d-flex base-container flex-row flex-sm-column'>
      <CharsContainer />
      <Container fluid className='border flex-grow-1 main-container'>
        2
      </Container>
    </Container>
  );
}

export default AddPage;
