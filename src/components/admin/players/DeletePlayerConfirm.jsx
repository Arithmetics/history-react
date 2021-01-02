import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { deletePlayer } from '../../../store/player';

const useStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main,
    margin: 16,
  },
  link: {
    color: theme.palette.primary.main,
  },
  buttonProgress: {
    color: theme.palette.primary.light,
  },
}));

export default function DeletePlayerConfirm({
  player,
  open,
  handleClose,
}) {
  const {
    deletePlayerLoading,
    deletePlayerSuccess,
    deletePlayerError,
  } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const submitDeletePlayer = () => {
    dispatch(deletePlayer(player.id));
  };

  useEffect(() => {
    if (deletePlayerSuccess) {
      handleClose();
    }
  }, [handleClose, deletePlayerSuccess]);

  const playName = (player && player.name) || '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Delete ${playName}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`This will delete the player permanently ${JSON.stringify(
            player,
          )}`}
          {deletePlayerError ? 'There was an error' : undefined}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={deletePlayerLoading}
          onClick={submitDeletePlayer}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
