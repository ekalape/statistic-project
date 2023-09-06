import React from 'react';
import './style.scss';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CharsContainer } from '../../components/CharsContainer';

function AddPage() {
  return (
    <div className='base-container'>
      <CharsContainer />
      <Container fluid className='border flex-grow-1 main-container'>
        2
      </Container>
    </div>
  );
}

export default AddPage;
