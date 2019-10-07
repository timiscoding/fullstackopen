import React from "react";
import { connect } from "react-redux";
import Notification from "./NotificationView";

const NotificationContainer = ({ notification }) => (
  <Notification notification={notification} />
);

const mapStateToProps = ({ notification }) => ({
  notification
});

export default connect(mapStateToProps)(NotificationContainer);
