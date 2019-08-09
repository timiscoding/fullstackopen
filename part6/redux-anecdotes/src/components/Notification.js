import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!props.notification.message) return null;

  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = state => ({ notification: state.notification });

export default connect(mapStateToProps)(Notification);
