import { Button } from 'react-bootstrap';
import './style.scss';

type AddBtnType = {
  handleClick: () => void;
  size: string;
};

function AddCardBtn(prop: AddBtnType) {
  const { handleClick, size } = prop;
  return (
    <div style={{ width: size, height: size }}>
      <Button variant='outline-primary' className='add-btn' onClick={handleClick}>
        +
      </Button>
    </div>
  );
}

export default AddCardBtn;
