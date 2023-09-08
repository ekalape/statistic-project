import { useState } from 'react';
import { Button } from 'react-bootstrap';

type DateChooserType = {
  label: 'From' | 'to' | 'The day is';
  day: Date;
  handleDate: (value: Date) => void;
};

function DateChooser(props: DateChooserType) {
  const { label, day, handleDate } = props;
  const [showChangeDate, setShowChangeDate] = useState(false);
  const today = new Date();

  function changeDate(value: string) {
    console.log('value', value);
    const date = new Date(value);
    if (date > today) {
      console.log('dates --> ', date, today);
      console.log('inside dateChanger -- ', date > today);
      handleDate(today);
    } else handleDate(date);
    setShowChangeDate(false);
  }

  return (
    <div className='d-flex flex-column gap-2 mt-2'>
      <Button
        variant='outline-primary'
        className='ps-4 pe-4 fs-6'
        style={{ width: '180px' }}
        onClick={() => setShowChangeDate((prev) => !prev)}>
        <i>{label}</i> <b>{day.toLocaleDateString()}</b>
      </Button>
      {showChangeDate && (
        <input
          type='Date'
          className=' ps-2 pe-2 border border-secondary rounded text-info bg-primary-subtle'
          onChange={(e) => changeDate(e.currentTarget?.value)}></input>
      )}
    </div>
  );
}

export default DateChooser;
