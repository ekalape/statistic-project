import { CharsContainer } from '../../components/CharsContainer';
import { AddEarnContainer } from '../../components/AddEarnContainer';

function AddPage() {
  return (
    <div className='base-container'>
      <CharsContainer stat={false} />
      <AddEarnContainer />
    </div>
  );
}

export default AddPage;
