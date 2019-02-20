import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


class Notification extends React.Component {
  render() {
    let alertText;
    if (this.props.databaseError) {
      alertText = this.props.databaseError;
    } else if (this.props.searchError) {
      alertText = this.props.searchError;
    } else if (this.props.updatingDatabase === 'in progress') {
      alertText = 'Updating database...';
    } else if (this.props.updatingDatabase === 'done') {
      alertText = 'Database is now up to date!';
    } else {
      alertText = undefined;
    }

    let className;
    if (this.props.databaseError || this.props.searchError) {
      className = 'notification-error';
    } else {
      className = 'notification-info';
    }

    return (
      <div>
        <Dialog
          open={alertText !== undefined}
        >
          <DialogContent classes={{ root: className }}>
            <DialogContentText classes={{ root: 'notification-text' }}>
              {alertText}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatingDatabase: state.database.updatingDatabase,
    databaseError: state.database.error,
    searchError: state.search.error
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;