import { Dropdown } from 'react-bootstrap';
import './style.scss';

type DropDownPropsType = {
  show: boolean;
  handleContextMenu: (eventKey: string) => void;
};

function DropDownCharMenu(props: DropDownPropsType) {
  const { show, handleContextMenu } = props;
  return (
    <>
      <Dropdown
        autoClose='inside'
        show={show}
        onSelect={(eventKey: any) => handleContextMenu(eventKey)}>
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
