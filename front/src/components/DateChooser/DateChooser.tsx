import { useState } from 'react';
import { Button } from 'react-bootstrap';

type DateChooserType = {
  label: 'From' | 'to' | 'The day is' | 'Sign';
  day: Date;
  size: 'sm' | 'lg';
  handleDate: (value: Date) => void;
};

function DateChooser(props: DateChooserType) {
  const { label, day, size, handleDate } = props;
  const [showChangeDate, setShowChangeDate] = useState(false);
  const today = new Date();

  function changeDate(value: string) {
    const date = new Date(value);
    if (date > today) {
      handleDate(today);
    } else handleDate(date);
    setShowChangeDate(false);
  }

  return (
    <div className='d-flex flex-column gap-2'>
      <Button
        variant='outline-primary'
        className={size === 'lg' ? 'px-4 fs-6' : 'px-1 fs-7 text-secondary'}
        style={{ width: `${size === 'lg' ? '180px' : '100px'}` }}
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
