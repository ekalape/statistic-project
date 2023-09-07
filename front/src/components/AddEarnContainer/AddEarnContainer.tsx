import { Button, Container, Form } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { useCharsStore } from '../../store/store';
import { getToday, transformDate } from '../../utils/getToday';
import { IEarning } from '../../utils/interfaces';

function AddEarnContainer() {
  const chars = useCharsStore((state) => state.chars);
  const selChar = useCharsStore((state) => state.selectedSingleChar);
  const addEarning = useCharsStore((state) => state.addEarning);
  const getChars = useCharsStore((state) => state.getChars);
  const [selServer, setSelServer] = useState(selChar?.server || 'all');
  const [showDateField, setShowDateField] = useState(false);
  const [date, setDate] = useState(getToday());
  const dateRef = useRef<HTMLInputElement | null>(null);
  const earningRef = useRef<HTMLInputElement | null>(null);

  const toggleDateField = () => {
    setShowDateField((prev) => !prev);
  };
  const handleEarningSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateRef.current) setDate(getToday());
    else if (dateRef.current.value.trim() === '') {
      setDate(getToday());
    } else {
      console.log(dateRef.current);
      setDate(transformDate(dateRef.current.value));
    }

    console.log(earningRef.current?.value);
    if (selChar && earningRef.current?.value) {
      const dateArr = date.split('/');
      const earningData: IEarning = {
        day: +dateArr[0],
        month: +dateArr[1],
        year: +dateArr[2],
        amount: +earningRef.current?.value,
        belongTo: selChar.id,
      };
      await addEarning(earningData);
    }
  };

  useEffect(() => {
    // console.log(chars.map((ch) => ch.earnings));
    console.log('chars changed', selChar?.earnings);
  }, [chars]);

  useEffect(() => {
    setSelServer(selChar?.server || 'all');
    console.log('selChar changed', selChar?.server);
  }, [selChar]);

  return (
    <Container fluid className='border flex-grow-1 main-container'>
      <ServerContainer
        selectedServer={selServer}
        handleServerChange={(value) => {
          setSelServer(value);
          console.log('server -> ', value);
        }}
      />
      <Form onSubmit={(e) => handleEarningSubmit(e)}>
        <Form.Group
          className='mb-3 mt-5 d-flex flex-column align-content-center'
          controlId='dateInput'>
          <Form.Label>
            <i>The day is </i>
            {date}
          </Form.Label>
          <Button
            variant='outline-info'
            className='ps-2 pb-1 pt-0 pe-2 mb-3 w-25 align-self-center'
            style={{ height: '30px', fontSize: '0.8rem' }}
            onClick={toggleDateField}>
            Change
          </Button>
          {showDateField && (
            <Form.Control
              type='date'
              placeholder='Enter date'
              ref={dateRef}
              className='w-25 align-self-center'
            />
          )}
        </Form.Group>

        <Form.Group
          className='mb-3 d-flex flex-column align-content-center'
          controlId='EarningInput'>
          <Form.Label>Earning</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter sum'
            ref={earningRef}
            className='w-25 align-self-center'
          />
        </Form.Group>
        <Button variant='info' type='submit' /*  onClick={handleEarningSubmit} */>
          Submit
        </Button>
      </Form>
      <div>{selChar?.earnings?.reduce((acc, val) => acc + (val.amount || 0), 0)}</div>
    </Container>
  );
}

export default AddEarnContainer;
