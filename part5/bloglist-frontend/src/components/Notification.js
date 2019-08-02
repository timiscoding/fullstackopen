import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ text, type='success' }) => {
  return (
    <div className={`notification ${type}`}>
      {text}
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
};

export default Notification;
