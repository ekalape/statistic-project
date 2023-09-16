import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './style.scss';
import { useCharsStore } from '../../store/store';

type ServerContainerType = {
  type: 'one' | 'many';
  selectedServer: string;
  handleServerChange: (value: string) => void;
};

function ServerContainer({ selectedServer, handleServerChange, type }: ServerContainerType) {
  const chars = useCharsStore((state) => state.chars);
  const selchars = useCharsStore((state) => state.selectedChars);
  const selOnechar = useCharsStore((state) => state.selectedSingleChar);
  const setSelectedAllChars = useCharsStore((state) => state.selectAllChars);
  const setSelectedSingleChar = useCharsStore((state) => state.setSelectedSingleChar);
  const servs = ['all', ...new Set(chars.map((ch) => ch.server))];

  function handleServChange(value: string) {
    handleServerChange(value);
  }

  return (
    <div className='server-container pt-1'>
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
        <ToggleButton
          variant='outline-secondary'
          value={'none'}
          type='radio'
          name='servers'
          key={'none'}
          checked={type === 'one' ? selOnechar === null : selchars.length === 0}
          onClick={() => {
            setSelectedAllChars([]);
            setSelectedSingleChar(null);
            handleServerChange('none');
          }}
          style={{ fontStyle: 'italic', fontSize: '0.7rem', textTransform: 'uppercase' }}>
          None
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
}

export default ServerContainer;
