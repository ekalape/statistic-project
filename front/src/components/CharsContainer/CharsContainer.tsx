import { Container, Card, CardGroup } from 'react-bootstrap';
import './style.scss';
import hordeIcon from '../../assets/horde-icon.png';
import alianceIcon from '../../assets/aliance-icon.png';
import { useCharsStore } from '../../store/store';
import { useEffect, useState } from 'react';
import { AddCard } from '../AddCard';

function CharsContainer() {
  const charsStore = useCharsStore();
  const chars = useCharsStore((state) => state.chars);
  console.log(charsStore.chars);

  useEffect(() => {
    charsStore.getChars();
  }, []);
  return (
    <CardGroup className='char-container'>
      {chars.map((ch) => (
        <Card
          border={ch.fraction === 'horde' ? 'danger' : 'secondary'}
          style={{ width: '70px', height: '70px', alignItems: 'center' }}>
          <Card.Img
            variant='top'
            src={ch.fraction === 'horde' ? hordeIcon : alianceIcon}
            style={{ width: '50px', height: '50px' }}
          />

          <Card.Text style={{ fontSize: '0.8rem' }}>{ch.name}</Card.Text>
        </Card>
      ))}
      <AddCard />
    </CardGroup>
  );
}

export default CharsContainer;
