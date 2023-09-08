import { Button, Card, Form, Modal } from 'react-bootstrap';
import './style.scss';
import hordeIcon from '../../assets/horde-icon.png';
import alianceIcon from '../../assets/aliance-icon.png';
import { useCharsStore } from '../../store/store';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IChar } from '../../utils/interfaces';
import { AddCardBtn } from '../AddCardBtn';
import { EAddCharInputs } from '../../utils/constants';
import { useForm } from 'react-hook-form';

function CharsContainer({ stat }: { stat: boolean }) {
  const charsStore = useCharsStore();
  const chars = useCharsStore((state) => state.chars);
  const addNewChar = useCharsStore((state) => state.addNewChar);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const selChars = stat
    ? useCharsStore((state) => state.selectedChars)
    : useCharsStore((state) => state.selectedSingleChar);

  const [showAddModal, setShowAddModal] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const addChar = async () => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      const formData: { [key: string]: string } = {};
      data.forEach((value, key) => {
        formData[key] = value as string;
      });
      console.log(...Object.values(formData));
      await addNewChar(
        formData[`${EAddCharInputs.NAME_INPUT}`],
        formData[`${EAddCharInputs.SERV_INPUT}`],
        formData[`${EAddCharInputs.FRACT_INPUT}`],
        null,
      );
      console.log('chars', chars);
    }
    console.log('add char');
    setShowAddModal(false);
  };
  const handleCharSelect = (char: IChar) => {
    if (stat) charsStore.selectChar(char);
    else charsStore.setSelectedSingleChar(char);
  };

  const bgColor = useCallback(
    (ch: IChar) => {
      let sel: IChar | null | undefined = null;
      if (stat) {
        sel = (selChars as IChar[]).find((c) => c.id === ch.id);
      } else {
        sel = selChars as IChar;
      }

      if (!sel || ch.id !== sel.id) return 'transparent';
      if (sel.fraction === 'horde') return '#ff000042';
      if (sel.fraction === 'aliance') return '#0066ff54';
    },
    [selChars],
  );

  useEffect(() => {
    charsStore.getChars();
  }, []);

  return (
    <div className='char-container'>
      {chars.map((ch) => (
        <Card
          key={ch.id}
          className='char-card'
          style={{
            borderColor: `${ch.fraction === 'horde' ? 'red' : 'lightBlue'}`,
            background: `${bgColor(ch)}`,
          }}
          onClick={() => handleCharSelect(ch)}>
          <Card.Img
            variant='top'
            src={ch.fraction === 'horde' ? hordeIcon : alianceIcon}
            style={{ width: '50px', height: '50px' }}
          />

          <Card.Text style={{ fontSize: '0.8rem' }}>{ch.name}</Card.Text>
        </Card>
      ))}
      <AddCardBtn handleClick={() => setShowAddModal(true)} size='40px' text='+' />
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            className='d-flex flex-column align-content-center'
            onSubmit={handleSubmit(addChar)}>
            <Form.Group className='mb-3 d-flex flex-column align-content-center'>
              <Form.Label className='align-self-center'>Character's name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Name'
                {...register(`${EAddCharInputs.NAME_INPUT}`, {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                aria-invalid={errors[`${EAddCharInputs.NAME_INPUT}`] ? 'true' : 'false'}
              />
              {errors[`${EAddCharInputs.NAME_INPUT}`]?.type === 'required' && (
                <p role='alert' className='align-self-end fs-7 fst-italic text-danger'>
                  Name is required
                </p>
              )}
              {errors[`${EAddCharInputs.NAME_INPUT}`]?.type === 'pattern' && (
                <p role='alert' className='align-self-end fs-7 fst-italic text-danger'>
                  Only letters are allowed
                </p>
              )}
            </Form.Group>
            <Form.Group className='mb-3 d-flex flex-column align-content-center'>
              <Form.Label className='align-self-center'>Character's server</Form.Label>
              <Form.Control
                type='text'
                placeholder='Server'
                {...register(`${EAddCharInputs.SERV_INPUT}`, {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                aria-invalid={errors[`${EAddCharInputs.SERV_INPUT}`] ? 'true' : 'false'}
              />
              {errors[`${EAddCharInputs.SERV_INPUT}`]?.type === 'required' && (
                <p role='alert' className='align-self-end fs-7 fst-italic text-danger'>
                  Name is required
                </p>
              )}
              {errors[`${EAddCharInputs.SERV_INPUT}`]?.type === 'pattern' && (
                <p role='alert' className='align-self-end fs-7 fst-italic text-danger'>
                  Only letters are allowed
                </p>
              )}
            </Form.Group>
            <Form.Group className='mb-3 d-flex flex-column align-content-center'>
              <Form.Label className='align-self-center'>Character's fraction</Form.Label>
              <Form.Select
                aria-label='horde'
                className='w-50 align-self-center'
                {...register(`${EAddCharInputs.FRACT_INPUT}`, { required: true })}>
                <option value='horde'>Horde</option>
                <option value='aliance'>Aliance</option>
              </Form.Select>
            </Form.Group>
            <div className="'mb-3 d-flex flex-row justify-content-end gap-2">
              <Button variant='outline-secondary' onClick={() => setShowAddModal(false)}>
                Close
              </Button>
              <Button variant='secondary' type='submit'>
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CharsContainer;
