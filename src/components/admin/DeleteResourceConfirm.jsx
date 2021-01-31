import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteResourceConfirm({
  resourceId,
  resourceName,
  resource,
  open,
  handleClose,
  deleteResource,
  deleteResourceLoading,
  deleteResourceSuccess,
  deleteResourceError,
}) {
  const dispatch = useDispatch();

  const submitDeleteResource = () => {
    dispatch(deleteResource(resourceId));
  };

  useEffect(() => {
    if (deleteResourceSuccess) {
      handleClose();
    }
  }, [handleClose, deleteResourceSuccess]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Delete ${resourceName}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`This will delete the resource permanently ${JSON.stringify(
            resource,
          )}`}
          {deleteResourceError ? 'There was an error' : undefined}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={deleteResourceLoading}
          onClick={submitDeleteResource}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
