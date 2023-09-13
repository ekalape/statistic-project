import { Button, Container, Form, Toast } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';
import { useEffect, useState } from 'react';
import { useCharsStore } from '../../store/store';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { DateChooser } from '../DateChooser';
import { addNewEarning } from '../../store/apiCalls';

const today = new Date();

interface IEarningFormInput {
  date: string;
  profit: number;
}

function AddEarnContainer() {
  const selChar = useCharsStore((state) => state.selectedSingleChar);
  const updateSelectedChar = useCharsStore((state) => state.updateSelectedChar);

  const [showToast, setShowToast] = useState(false);

  const [selServer, setSelServer] = useState(selChar?.server || 'all');
  const [showDateField, setShowDateField] = useState(false);
  const [day, setDay] = useState(today);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  function handleDate(value: Date) {
    if (value < today) setDay(value);
    setShowDateField(false);
  }

  const handleEarningSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { profit } = data as IEarningFormInput;

    console.log('date --> ', day.toLocaleDateString());
    if (selChar && profit) {
      if (selChar && profit) {
        const success = await addNewEarning(selChar.id, day, +profit);
        if (success) {
          setShowToast(true);
          await updateSelectedChar(selChar.id);
        } else {
          console.log('Bad request');
        }
      }
    }
  };

  useEffect(() => {
    console.log('chars changed', selChar?.earnings);
  }, [selChar]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ profit: '' });
    }
  }, [formState, reset]);

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
      {showToast && (
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide={true}
          delay={2000}
          bg={'success'}>
          <Toast.Header>
            <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
            <strong className='me-auto'>Success!</strong>
          </Toast.Header>
          <Toast.Body>Your earning for {selChar?.name} was succesfully added!</Toast.Body>
        </Toast>
      )}
    </Container>
  );
}

export default AddEarnContainer;
