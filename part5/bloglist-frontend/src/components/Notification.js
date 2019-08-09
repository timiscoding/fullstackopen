import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ notification : { type, message } }) => {
  if (message === null) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(['success', 'error']),
    message: PropTypes.string.isRequired,
  }),
};

export default Notification;
