import { Button, Container, Form } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';
import { useEffect, useState } from 'react';
import { useCharsStore } from '../../store/store';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { DateChooser } from '../DateChooser';
import { addNewEarning } from '../../store/apiCalls';
import { InfoToast } from '../InfoToast';

const today = new Date();

interface IEarningFormInput {
  date: string;
  profit: number;
}

function AddEarnContainer() {
  const selChar = useCharsStore((state) => state.selectedSingleChar);
  const updateSelectedChar = useCharsStore((state) => state.updateSelectedChar);

  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

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

    if (selChar && profit) {
      if (selChar && profit) {
        const success = await addNewEarning(selChar.id, day, +profit);
        if (success) {
          setShowToast(true);
          updateSelectedChar(selChar.id);
        } else {
          console.log('Bad request');
          setShowErrorToast(true);
        }
      }
    } else if (profit && !selChar) {
      setShowErrorToast(true);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ profit: '' });
    }
  }, [formState, reset]);

  useEffect(() => {
    setSelServer(selChar?.server || 'all');
  }, [selChar]);

  return (
    <Container
      fluid
      className='border-top border-secondary1 flex-grow-1 d-flex flex-column align-items-center '>
      <ServerContainer
        selectedServer={selServer}
        type='one'
        handleServerChange={(value) => {
          setSelServer(value);
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
      <InfoToast
        show={showToast}
        text={`Your earning for ${selChar?.name} was succesfully added!`}
        success={true}
        handleCloseToast={() => setShowToast(false)}
      />
      <InfoToast
        show={showErrorToast}
        text={
          selChar
            ? `Your earning for ${selChar?.name} was not added!`
            : `You have to choose a character!`
        }
        success={false}
        handleCloseToast={() => setShowErrorToast(false)}
      />
    </Container>
  );
}

export default AddEarnContainer;
