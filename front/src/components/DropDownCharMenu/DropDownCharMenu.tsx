import { Dropdown } from 'react-bootstrap';
import { IChar } from '../../utils/interfaces';
import './style.scss';

type DropDownPropsType = {
  show: boolean;
  char: IChar;
  handleContectMenu: (char: IChar, eventKey: string) => void;
};

function DropDownCharMenu(props: DropDownPropsType) {
  const { show, char, handleContectMenu } = props;
  return (
    <>
      <Dropdown
        autoClose='inside'
        show={show}
        onSelect={(eventKey: any) => handleContectMenu(char, eventKey)}>
        <Dropdown.Menu className='drop-down-char-menu'>
          <Dropdown.Item eventKey='update' as='button'>
            Update
          </Dropdown.Item>
          <Dropdown.Item eventKey='delete' as='button'>
            Delete
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey='close' as='button'>
            Close
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropDownCharMenu;
