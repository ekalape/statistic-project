import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './style.scss';
import { useCharsStore } from '../../store/store';

type ServerContainerType = {
  selectedServer: string;
  handleServerChange: (value: string) => void;
};

function ServerContainer({ selectedServer, handleServerChange }: ServerContainerType) {
  const chars = useCharsStore((state) => state.chars);
  const servs = ['all', ...new Set(chars.map((ch) => ch.server))];

  //const [servValue, setServValue] = useState(selectedServer);
  function handleServChange(value: string) {
    //setServValue(value);
    handleServerChange(value);
  }

  return (
    <div className='server-container'>
      <ButtonGroup className='servers-radioGroup'>
        {servs.map((s, idx) => (
          <ToggleButton
            variant='outline-secondary'
            value={s}
            type='radio'
            name='servers'
            key={idx}
            checked={selectedServer === s}
            onClick={(e) => {
              handleServChange(e.currentTarget.textContent || 'all');
            }}
            style={{ fontStyle: 'italic', fontSize: '0.7rem', textTransform: 'uppercase' }}>
            {s}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default ServerContainer;
