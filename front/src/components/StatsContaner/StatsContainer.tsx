import { Button, Container, Form } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';

import { useRef, useState } from 'react';
import { getToday } from '../../utils/getToday';
import { DateChooser } from '../DateChooser';

const defDate = new Date();

function StatsContainer() {
  const [fromDay, setFromDay] = useState(defDate);
  const [toDay, setToDay] = useState(defDate);

  function handleFromDate(value: Date) {
    if (value < toDay) setFromDay(value);
    else {
      setFromDay(toDay);
    }
  }
  function handleToDate(value: Date) {
    console.log('value', value);
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
      <div className='w-50 d-flex flex-md-row flex-column gap-2 justify-content-center align-items-start ms-sm-0 ms-n5'>
        <DateChooser label={'From'} day={fromDay} handleDate={handleFromDate} />
        <DateChooser label={'to'} day={toDay} handleDate={handleToDate} />
      </div>
    </Container>
  );
}

export default StatsContainer;
