import { CharsContainer } from '../../components/CharsContainer';
import { StatsContainer } from '../../components/StatsContaner';

function StatsPage() {
  return (
    <div className='base-container'>
      <CharsContainer stat={true} />
      <StatsContainer />
    </div>
  );
}

export default StatsPage;
