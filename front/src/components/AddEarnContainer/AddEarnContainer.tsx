import { Button, Container, Form } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';
import { useEffect, useState } from 'react';
import { useCharsStore } from '../../store/store';
import { getToday, transformDate } from '../../utils/getToday';
import { IEarning } from '../../utils/interfaces';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface IEarningFormInput {
  date: string;
  profit: number;
}

function AddEarnContainer() {
  const chars = useCharsStore((state) => state.chars);
  const selChar = useCharsStore((state) => state.selectedSingleChar);
  const addEarning = useCharsStore((state) => state.addEarning);
  const getChars = useCharsStore((state) => state.getChars);
  const [selServer, setSelServer] = useState(selChar?.server || 'all');
  const [showDateField, setShowDateField] = useState(false);
  const [day, setDay] = useState(getToday());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleDateField = () => {
    setShowDateField((prev) => !prev);
  };
  const handleEarningSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { date, profit } = data as IEarningFormInput;
    if (!date) {
      setDay(getToday());
    } else {
      setDay(transformDate(date));
    }

    if (selChar && profit) {
      const dateArr = day.split('/');
      const earningData: IEarning = {
        day: +dateArr[0],
        month: +dateArr[1],
        year: +dateArr[2],
        amount: +profit,
        belongTo: selChar.id,
      };
      await addEarning(earningData);
    }
  };

  useEffect(() => {
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
      <Form onSubmit={handleSubmit(handleEarningSubmit)}>
        <Form.Group
          className='mb-3 mt-5 d-flex flex-column align-content-center'
          controlId='dateInput'>
          <Form.Label>
            <i>The day is </i>
            {day}
          </Form.Label>
          <Button
            variant='outline-secondary'
            className='ps-2 pb-1 pt-0 pe-2 mb-3 w-25 align-self-center'
            style={{ height: '30px', fontSize: '0.8rem' }}
            onClick={toggleDateField}>
            Change
          </Button>
          {showDateField && (
            <Form.Control
              type='date'
              placeholder='Enter date'
              {...register('date')}
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
            {...register('profit', {
              required: true,
              pattern: /^[0-9]+$/i,
            })}
            aria-invalid={errors.profit ? 'true' : 'false'}
            className='w-25 align-self-center'
          />
          {errors.profit?.type === 'required' && (
            <p role='alert' className='align-self-center fs-7 fst-italic text-danger'>
              You have to enter the profit
            </p>
          )}
        </Form.Group>
        <Button variant='secondary' type='submit'>
          Submit
        </Button>
      </Form>
      <div>{selChar?.earnings?.reduce((acc, val) => acc + (+val.amount || 0), 0)}</div>
    </Container>
  );
}

export default AddEarnContainer;
