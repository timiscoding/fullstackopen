import React from "react";
import PropTypes from "prop-types";
import "./Notification.css";

const NotificationView = ({ notification }) => {
  if (notification === null) return null;
  const { type, message } = notification;
  return <div className={`notification ${type}`}>{message}</div>;
};

NotificationView.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired
  })
};

export default NotificationView;
