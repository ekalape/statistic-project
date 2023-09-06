import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import './style.scss';
import { useCharsStore } from '../../store/store';
import { useEffect, useState } from 'react';
import { AddCardBtn } from '../AddCardBtn';

type ServerContainerType = {
  selectedServer: string;
  handleServerChange: (value: string) => void;
};

function ServerContainer({ selectedServer, handleServerChange }: ServerContainerType) {
  const chars = useCharsStore((state) => state.chars);
  const servs = ['all', ...new Set(chars.map((ch) => ch.server))];

  //const [servValue, setServValue] = useState(selectedServer);
  function handleServChange(value: string) {
    //setServValue(value);
    handleServerChange(value);
  }

  return (
    <div className='server-container'>
      <ButtonGroup className='servers-radioGroup'>
        {servs.map((s, idx) => (
          <ToggleButton
            variant='outline-info'
            value={s}
            type='radio'
            name='servers'
            key={idx}
            checked={selectedServer === s}
            onClick={(e) => {
              handleServChange(e.currentTarget.textContent || 'all');
            }}
            style={{ fontStyle: 'italic', fontSize: '0.7rem', textTransform: 'uppercase' }}>
            {s}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <AddCardBtn
        handleClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        size={'30px'}
      />
    </div>
  );
}

export default ServerContainer;
