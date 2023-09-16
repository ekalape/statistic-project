import { Accordion, Button, Container, Table } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import { useEffect, useMemo, useState } from 'react';
import { DateChooser } from '../DateChooser';
import { useCharsStore } from '../../store/store';
import { getAllProfits } from '../../store/apiCalls';
import { ChartsContainer } from '../Charts';
import { groupBy, map as lodashMap, sumBy } from 'lodash';
import './style.scss';

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
  const [fullProfitTable, setFullProfitTable] = useState<
    { charname: string | undefined; profit: number }[] | null
  >(null);

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
      //table
      const charsDataArray = groupBy(data, 'belongTo');
      const mapped = lodashMap(charsDataArray, (group, _) => ({
        charname: group[0].char?.name,
        profit: sumBy(group, 'amount'),
      }));
      setFullProfitTable(mapped);

      setFullProfit(data.reduce((acc, p) => acc + p.amount, 0));
    });
  }, [store.selectedChars, fromDay, toDay]);

  return (
    <Container
      fluid
      className='border-top border-secondary1 flex-grow-1 pt-1 d-flex flex-column align-items-center'>
      <ServerContainer
        selectedServer={selServer}
        handleServerChange={handleServerChange}
        type='many'
      />
      <div
        className={`w-50 d-flex flex-sm-row flex-column gap-2 pt-2 justify-content-center align-items-center align-items-sm-start ms-sm-0 ms-n5 fixed-height`}>
        <Button
          variant='outline-primary'
          className='fs-7 fst-italic'
          onClick={() => handleFromDate(new Date('2023-09-13'))}>
          Start
        </Button>
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
      <Accordion className='col-lg-3 col-md-6 col-sm-9 m-3'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>{`Full profits: ${fullProfit}`}</Accordion.Header>
          <Accordion.Body>
            <Table striped>
              <tbody>
                {fullProfitTable?.map((pr) => (
                  <tr key={pr.charname}>
                    <td>{pr.charname}</td>
                    <td>{pr.profit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ChartsContainer startDate={fromDay} endDate={toDay} />
    </Container>
  );
}

export default StatsContainer;
