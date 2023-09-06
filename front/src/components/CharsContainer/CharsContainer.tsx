import { Card } from 'react-bootstrap';
import './style.scss';
import hordeIcon from '../../assets/horde-icon.png';
import alianceIcon from '../../assets/aliance-icon.png';
import { useCharsStore } from '../../store/store';
import { useEffect } from 'react';
import { AddCardBtn } from '../AddCardBtn';
import { IChar } from '../../utils/interfaces';

function CharsContainer() {
  const charsStore = useCharsStore();
  const chars = useCharsStore((state) => state.chars);
  const selChars = useCharsStore((state) => state.selectedChars);

  const addChar = () => {
    console.log('add');
  };
  const handleCharSelect = (char: IChar) => {
    charsStore.selectChar(char);
  };

  useEffect(() => {
    charsStore.getChars();
    console.log('selChars start', selChars);
  }, []);
  return (
    <div className='char-container'>
      {chars.map((ch) => (
        <Card
          key={ch.id}
          className='char-card'
          style={{
            borderColor: `${ch.fraction === 'horde' ? 'red' : 'lightBlue'}`,
            background: `${
              selChars.find((c) => c.id === ch.id)
                ? ch.fraction === 'horde'
                  ? '#ff000042'
                  : '#006eff59'
                : 'transparent'
            }`,
          }}
          onClick={() => handleCharSelect(ch)}>
          <Card.Img
            variant='top'
            src={ch.fraction === 'horde' ? hordeIcon : alianceIcon}
            style={{ width: '50px', height: '50px' }}
          />

          <Card.Text style={{ fontSize: '0.8rem' }}>{ch.name}</Card.Text>
        </Card>
      ))}
      <AddCardBtn handleClick={() => addChar()} size='40px' />
    </div>
  );
}

export default CharsContainer;
