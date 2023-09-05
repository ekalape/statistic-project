import { Container, Card } from 'react-bootstrap';
import './style.scss';

function CharsContainer() {
  return (
    <Container className='border border-info char-container'>
      <Card>
        <Card.Img variant='top'></Card.Img>
        <Card.Title>name</Card.Title>
      </Card>
    </Container>
  );
}

export default CharsContainer;
