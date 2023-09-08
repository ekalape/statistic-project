import { Button, Container, Form } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';
import { useEffect, useState } from 'react';
import { useCharsStore } from '../../store/store';
import { getToday, transformDate } from '../../utils/getToday';
import { IEarning } from '../../utils/interfaces';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { DateChooser } from '../DateChooser';

const today = new Date();

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
  const [day, setDay] = useState(today);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleDateField = () => {
    setShowDateField((prev) => !prev);
  };
  function handleDate(value: Date) {
    if (value < today) setDay(value);
    setShowDateField(false);
  }

  const handleEarningSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { date, profit } = data as IEarningFormInput;
    if (!date) {
      setDay(today);
    } else {
      setDay(new Date(date));
    }

    if (selChar && profit) {
      const dateArr = [day.getDate(), day.getMonth() + 1, day.getFullYear()];
      const earningData: IEarning = {
        day: +dateArr[0],
        month: +dateArr[1],
        year: +dateArr[2],
        amount: +profit,
        belongTo: selChar.id,
      };
      console.log(earningData);
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
    <Container fluid className='border flex-grow-1 d-flex flex-column align-items-center '>
      <ServerContainer
        selectedServer={selServer}
        handleServerChange={(value) => {
          setSelServer(value);
          console.log('server -> ', value);
        }}
      />
      <Form
        onSubmit={handleSubmit(handleEarningSubmit)}
        className='d-flex flex-column w-50 align-items-center align-content-center'>
        <Form.Group
          className='mb-3 mt-5 d-flex flex-column align-items-center'
          controlId='dateInput'>
          <DateChooser label={'The day is'} day={day} handleDate={handleDate} size='lg' />

          {showDateField && (
            <Form.Control
              type='date'
              placeholder='Enter date'
              {...register('date')}
              className=' align-self-center'
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
