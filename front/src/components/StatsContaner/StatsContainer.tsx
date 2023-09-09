import { Button, Container } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';

import { useEffect, useMemo, useState } from 'react';

import { DateChooser } from '../DateChooser';
import { useCharsStore } from '../../store/store';
import { getAllProfits } from '../../store/apiCalls';
import { RoundChart } from '../Charts';

const defDate = new Date();

function StatsContainer() {
  const sign = new Date(useCharsStore((state) => state.timeSign));
  const store = useCharsStore();
  const [fromDay, setFromDay] = useState(sign);
  const [toDay, setToDay] = useState(defDate);

  const servToSelect = useMemo(() => {
    const servers = Array.from(new Set(store.selectedChars.map((ch) => ch.server)));
    if (servers.length === 1) return servers[0];
    else return 'all';
  }, [store.selectedChars]);

  const [selServer, setSelServer] = useState(servToSelect);
  const [fullProfit, setFullProfit] = useState(0);

  function handleServerChange(value: string) {
    setSelServer(value);
    let selChars;
    if (value === 'all') selChars = store.chars;
    else selChars = store.chars.filter((ch) => ch.server === value);
    store.selectAllChars(selChars);
  }

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

  useEffect(() => {
    setSelServer(servToSelect);
  }, [store.selectedChars]);

  useEffect(() => {
    getAllProfits(fromDay, toDay, store.selectedChars).then((data) => {
      setFullProfit(data.reduce((acc, p) => acc + p.amount, 0));
    });
  }, [store.selectedChars, fromDay, toDay]);

  return (
    <Container fluid className='border flex-grow-1 pt-1 d-flex flex-column align-items-center'>
      <ServerContainer selectedServer={selServer} handleServerChange={handleServerChange} />
      <div className='w-50 d-flex flex-md-row flex-column gap-2 pt-2 justify-content-center align-items-start ms-sm-0 ms-n5'>
        <Button
          variant='outline-primary'
          className='fs-7 fst-italic'
          onClick={() => handleFromDate(sign)}>
          Sign
        </Button>
        <DateChooser label={'From'} day={fromDay} handleDate={handleFromDate} size='lg' />
        <DateChooser label={'to'} day={toDay} handleDate={handleToDate} size='lg' />
        <Button
          variant='outline-primary'
          className='fs-7 fst-italic'
          onClick={() => handleToDate(defDate)}>
          Today
        </Button>
      </div>
      <div> All profits: {fullProfit}</div>
      <RoundChart startDate={fromDay} endDate={toDay} />
    </Container>
  );
}

export default StatsContainer;
