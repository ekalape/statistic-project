import { Card } from 'react-bootstrap';
import './style.scss';
import hordeIcon from '../../assets/horde-icon.png';
import alianceIcon from '../../assets/aliance-icon.png';
import { useCharsStore } from '../../store/store';
import { useCallback, useEffect, useMemo } from 'react';

import { IChar } from '../../utils/interfaces';
import { AddCardBtn } from '../AddCardBtn';

function CharsContainer({ stat }: { stat: boolean }) {
  const charsStore = useCharsStore();
  const chars = useCharsStore((state) => state.chars);
  const selChars = stat
    ? useCharsStore((state) => state.selectedChars)
    : useCharsStore((state) => state.selectedSingleChar);

  const addChar = () => {
    console.log('add');
  };
  const handleCharSelect = (char: IChar) => {
    if (stat) charsStore.selectChar(char);
    else charsStore.setSelectedSingleChar(char);
  };

  const bgColor = useCallback(
    (ch: IChar) => {
      let sel: IChar | null | undefined = null;
      if (stat) {
        sel = (selChars as IChar[]).find((c) => c.id === ch.id);
      } else {
        sel = selChars as IChar;
      }

      if (!sel || ch.id !== sel.id) return 'transparent';
      if (sel.fraction === 'horde') return '#ff000042';
      if (sel.fraction === 'aliance') return '#0066ff54';
    },
    [selChars],
  );

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
            background: `${bgColor(ch)}`,
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
