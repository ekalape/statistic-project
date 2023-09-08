import { Button, Container } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';

import { useState } from 'react';

import { DateChooser } from '../DateChooser';
import { useCharsStore } from '../../store/store';
import { AddCardBtn } from '../AddCardBtn';

const defDate = new Date();

function StatsContainer() {
  const sign = new Date(useCharsStore((state) => state.timeSign));
  const [fromDay, setFromDay] = useState(sign);
  const [toDay, setToDay] = useState(defDate);

  function handleFromDate(value: Date) {
    if (value < toDay) setFromDay(value);
    else {
      setFromDay(toDay);
    }
  }
  function handleToDate(value: Date) {
    setToDay(value);
    if (value < fromDay) {
      setFromDay(value);
    }
  }

  return (
    <Container fluid className='border flex-grow-1 pt-1 d-flex flex-column align-items-center'>
      <ServerContainer
        selectedServer={'all'}
        handleServerChange={function (value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div className='w-50 d-flex flex-md-row flex-column gap-2 pt-2 justify-content-center align-items-start ms-sm-0 ms-n5'>
        <Button
          variant='outline-primary'
          className='fs-6 fst-italic'
          onClick={() => handleFromDate(sign)}>
          Sign
        </Button>
        <DateChooser label={'From'} day={fromDay} handleDate={handleFromDate} size='lg' />
        <DateChooser label={'to'} day={toDay} handleDate={handleToDate} size='lg' />
        <Button
          variant='outline-primary'
          className='fs-6 fst-italic'
          onClick={() => handleToDate(defDate)}>
          Today
        </Button>
      </div>
    </Container>
  );
}

export default StatsContainer;
