import { Toast } from 'react-bootstrap';

type InfoToastPropsType = {
  show: boolean;
  text: string;
  success: boolean;
  handleCloseToast: () => void;
};

function InfoToast(props: InfoToastPropsType) {
  const { show, text, success, handleCloseToast } = props;
  return (
    <Toast
      style={{
        position: 'absolute',
        bottom: '0px',
      }}
      show={show}
      onClose={handleCloseToast}
      autohide={true}
      delay={2000}
      bg={success ? 'success' : 'danger'}>
      <Toast.Header>
        <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
        <strong className='me-auto'>{success ? `Success!` : `Error!`}</strong>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
}

export default InfoToast;
