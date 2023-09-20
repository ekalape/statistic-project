import { Modal, Button, Table } from 'react-bootstrap';
import { IChar } from '../../utils/interfaces';
import { useEffect, useRef } from 'react';

type DetailsPropsType = {
  show: boolean;
  char: IChar | undefined | null;
  handleDetailsFrame: () => void;
  handleClose: () => void;
};

function DetailsModal(props: DetailsPropsType) {
  const { show, handleDetailsFrame, handleClose, char } = props;
  const currectChar = useRef(char);

  useEffect(() => {
    if (char) {
      currectChar.current = char;
      const profits = char.earnings;
      console.log(profits);
    }
  }, [char]);

  useEffect(() => {}, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Character Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='fs-4'>
          <strong>{` ${currectChar.current?.name} `}</strong> {`(server`}
          <strong>{` ${currectChar.current?.server} `}</strong>
          {`) `}
        </p>
        <div className='fs-7 d-flex flex-column align-items-center p-1'>
          <Table striped className='w-75 '>
            <tbody>
              {currectChar.current?.earnings.map((pr, idx) => {
                const day = new Date(pr.date).toLocaleDateString();

                return (
                  <tr key={idx}>
                    <td>{day}</td>
                    <td>{pr.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Button
        variant='outline-primary'
        className='m-3 w-25 align-self-end'
        onClick={() => handleDetailsFrame()}>
        Ok
      </Button>
    </Modal>
  );
}

export default DetailsModal;
