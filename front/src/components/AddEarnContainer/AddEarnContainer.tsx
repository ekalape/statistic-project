import { Container } from 'react-bootstrap';
import { ServerContainer } from '../ServerContainer';
import './style.scss';
import { useEffect, useState } from 'react';
import { useCharsStore } from '../../store/store';

function AddEarnContainer() {
  const chars = useCharsStore((state) => state.chars);
  const selChar = useCharsStore((state) => state.selectedSingleChar);
  const [selServer, setSelServer] = useState(selChar?.server || 'all');
  useEffect(() => {
    setSelServer(selChar?.server || 'all');
    console.log('selChar', selChar?.server);
  }, [selChar]);

  return (
    <Container fluid className='border flex-grow-1 main-container'>
      <ServerContainer
        selectedServer={selServer}
        handleServerChange={(value) => {
          setSelServer(value);
          console.log('server -> ', value);
        }}
      />
    </Container>
  );
}

export default AddEarnContainer;
