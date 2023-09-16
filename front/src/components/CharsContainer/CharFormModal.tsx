import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { IChar } from '../../utils/interfaces';

type CharFormPropsType = {
  show: boolean;
  action: 'add' | 'update';
  char?: IChar | undefined | null;
  handleForm: (
    charName: string,
    server: string,
    fraction: string,
    portrait: string | null,
    id?: string,
  ) => void;
  closeForm: () => void;
};

function CharFormModal(props: CharFormPropsType) {
  const { show, action, handleForm, closeForm } = props;
  const charID = useRef<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameInputField: '',
      serverInputField: '',
      fractionInputField: 'horde',
    },
    values: {
      nameInputField: props.char?.name,
      serverInputField: props.char?.server,
      fractionInputField: props.char?.fraction,
    },
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const addChar = async () => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      const formData: { [key: string]: string } = {};
      data.forEach((value, key) => {
        formData[key] = value as string;
      });
      if (action === 'add') {
        handleForm(
          formData.nameInputField,
          formData.serverInputField,
          formData.fractionInputField,
          null,
        );
      } else {
        handleForm(
          formData.nameInputField,
          formData.serverInputField,
          formData.fractionInputField,
          null,
          charID.current,
        );
      }
    }
    closeForm();
  };

  useEffect(() => {
    if (props.char) {
      charID.current = props.char.id;
    }
  }, [props.char]);

  return (
    <Modal show={show} onHide={closeForm}>
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
              {...register(`nameInputField`, {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              aria-invalid={errors.nameInputField ? 'true' : 'false'}
            />
            {errors.nameInputField?.type === 'required' && (
              <p role='alert' className='align-self-end fs-7 fst-italic text-danger'>
                Name is required
              </p>
            )}
            {errors.nameInputField?.type === 'pattern' && (
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
              {...register(`serverInputField`, {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              aria-invalid={errors.serverInputField ? 'true' : 'false'}
            />
            {errors.serverInputField?.type === 'required' && (
              <p role='alert' className='align-self-end fs-7 fst-italic text-danger'>
                Name is required
              </p>
            )}
            {errors.serverInputField?.type === 'pattern' && (
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
              {...register(`fractionInputField`, { required: true })}>
              <option value='horde'>Horde</option>
              <option value='aliance'>Aliance</option>
            </Form.Select>
          </Form.Group>
          <div className="'mb-3 d-flex flex-row justify-content-end gap-2">
            <Button variant='outline-secondary' onClick={closeForm}>
              Close
            </Button>
            <Button variant='secondary' type='submit'>
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CharFormModal;
