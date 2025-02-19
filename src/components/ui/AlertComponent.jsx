import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertComponent({ alertProps }) {
  const { variant = 'success', content = '', show = false } = alertProps;

  const style = {
    backgroundColor: variant === 'success' ? 'green' : 'red',
    border: 'none',
    transition: '0.3s ease',
    color: '#fff',
    position: 'absolute',
    top: '8vh',
    right: '5%',
    borderRadius: '16px',
    padding: '10px 30px',
    fontSize: 20,
    fontWeight: 600,
    transform: `translateX(${show ? 0 : 'calc(100% + 6vw)'})`
  };

  return (
    <Alert variant={variant} style={style}>
      {content}
    </Alert>
  );
}

export default AlertComponent;
