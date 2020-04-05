import React from "react";
import { connect } from "react-redux";
import Notification from "./NotificationView";
import { clearNotification } from "../../actions";

const NotificationContainer = ({ notification, clearNotification }) => {
  return (
    <Notification notification={notification} onClear={clearNotification} />
  );
};

const mapStateToProps = ({ notification }) => ({
  notification
});

export default connect(mapStateToProps, { clearNotification })(
  NotificationContainer
);
