import './style.scss';
import { Container } from 'react-bootstrap';
import { CharsContainer } from '../../components/CharsContainer';
import { ServerContainer } from '../../components/ServerContainer';

function AddPage() {
  return (
    <div className='base-container'>
      <CharsContainer />
      <Container fluid className='border flex-grow-1 main-container'>
        <ServerContainer
          selectedServer={'Azuregos'}
          handleServerChange={(value) => {
            console.log('server -> ', value);
          }}
        />
      </Container>
    </div>
  );
}

export default AddPage;
