import { Button } from 'react-bootstrap';
import './style.scss';

type AddBtnType = {
  handleClick: () => void;
  size: string;
  text: string;
};

function AddCardBtn(prop: AddBtnType) {
  const { handleClick, text, size } = prop;
  return (
    <div style={{ width: size, height: size }}>
      <Button variant='outline-primary' className='add-btn' onClick={handleClick}>
        {text}
      </Button>
    </div>
  );
}

export default AddCardBtn;
