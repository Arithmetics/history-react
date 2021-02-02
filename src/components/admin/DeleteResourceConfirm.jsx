import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import themeX from 'react-json-pretty/dist/1337';

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
  resetDeleteResource,
}) {
  const dispatch = useDispatch();

  const submitDeleteResource = () => {
    dispatch(deleteResource(resourceId));
  };

  useEffect(() => {
    if (deleteResourceSuccess) {
      handleClose();
      dispatch(resetDeleteResource());
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
          This will permanently delete the data below:
          <JSONPretty
            theme={themeX}
            id="json-pretty"
            data={resource}
          />
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
