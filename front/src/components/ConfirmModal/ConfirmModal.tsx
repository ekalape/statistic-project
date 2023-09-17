import { Modal, Button } from 'react-bootstrap';
import { IChar } from '../../utils/interfaces';
import { useEffect, useRef } from 'react';

type ConfirmPropsType = {
  show: boolean;
  char: IChar | undefined | null;
  handleConfirmFrame: (char: IChar | undefined | null) => void;
  handleClose: () => void;
};

function ConfirmModal(props: ConfirmPropsType) {
  const { show, handleConfirmFrame, handleClose, char } = props;
  const currectChar = useRef(char);

  useEffect(() => {
    if (char) {
      currectChar.current = char;
    }
  }, [char]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete alert!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='fs-6'>
          Please, confirm deleting character
          <strong>{` ${currectChar.current?.name} `}</strong> {`(server`}
          <strong>{` ${currectChar.current?.server} `}</strong>
          {`) `}
          completely
        </p>
        <p className='fs-8'>
          <em>All statistic for this character will be deleted as well</em>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={handleClose}>
          I changed my mind
        </Button>
        <Button variant='secondary' onClick={() => handleConfirmFrame(currectChar.current)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
