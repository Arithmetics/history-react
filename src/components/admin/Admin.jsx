import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingSpinner from "../LoadingSpinner";
import { DatePicker } from "@material-ui/pickers";
import { newPlayer, getAllPlayers, deletePlayer } from "../../store/player";
import MaterialTable from "material-table";
import { NFL_PLAYER_PAGE, NFL_IMAGE_URL } from '../../constants';
import {
  PlayerAvatarLink,
} from "../materialTableElements";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  dateCell: {
    marginTop: 16,
    width: "100%",
  },
  paperPad: {
    padding: 16,
  },
  failure: {
    color: theme.palette.secondary.light,
    margin: 16,
  },
  success: {
    color: theme.palette.success.main,
    margin: 16,
  },
  link: {
    color: theme.palette.primary.main,
  }
}));

export default function Admin() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Admin
      </Typography>
      <NewPlayerForm />
      <br></br>
      <PlayerDeleteTable />
    </>
  );
}

function PlayerDeleteTable() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(undefined);

  const handleClickOpen = (player) => {
    setOpen(true);
    setPlayerToDelete(player);
  };

  const handleClose = () => {
    setOpen(false);
    setPlayerToDelete(undefined);
  };

  const dispatch = useDispatch();
  const { allPlayersLoading, allPlayers, allPlayersSuccess, allPlayersError } = useSelector(
    (state) => state.player
  );

  useEffect(() => (dispatch(getAllPlayers())), [dispatch])

  if (allPlayersLoading) {
    return <LoadingSpinner isLoading={allPlayersLoading} />
  }

  if (allPlayersError) {
    return <p>There was an error fetching the player data</p>
  }

  

  if (allPlayersSuccess) {
    const unfrozenData = allPlayers.map((p) => {
      const {name, birthdate, id, createdAt, nflUrlName, pictureId} = p
      return {name, birthdate, id, createdAt, nflUrlName, pictureId}
    })
    return  (
    <>
    <DeletePlayerConfirm handleClose={handleClose} open={open} player={playerToDelete} />
    <MaterialTable
    title="Manage Players"
    data={unfrozenData}
    options={{
      filtering: false,
      padding: "dense",
      paging: true,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
      search: true,
      exportButton: false,
      emptyRowsWhenPaging: false,
      showTitle: true,
      actionsColumnIndex: -1,
    }}
    actions={[
      {
        icon: 'delete',
        tooltip: 'Delete player',
        onClick: (event, rowData) => handleClickOpen(rowData)
      },
    ]}
    columns={[
      {
      title: "Name",
      field: "name",
      filtering: false,
      render: (rowData) => (
        <PlayerAvatarLink
          id={rowData.id}
          playerName={rowData.name}
          pictureId={rowData.pictureId}
        />
      ),
    },
    {
      title: "Profile ID",
      field: "id",
    }, 
    {
      title: "Picture ID",
      field: "pictureId",
      render: (rowData) => (
        <a
          href={`${NFL_IMAGE_URL}/${rowData.pictureId}`}
          rel="noopener noreferrer"
          target="_blank"
          className={classes.link}
        >{rowData.pictureId}</a>
      ),
    },
    { 
      title: "NFL URL", 
      field: "nflUrlName",
      render: (rowData) => (
        <a
          href={`${NFL_PLAYER_PAGE}/${rowData.nflUrlName}`}
          rel="noopener noreferrer"
          target="_blank"
          className={classes.link}
        >{rowData.nflUrlName}</a>
      ),
    },
    {
      title: "Birthdate",
      field: "birthdate"
    },
    { 
      title: "Created At", 
      field: "createdAt",
      defaultSort: "desc",
    }
  ]}
    />
    </>)
  }

  return null;

 
}

function NewPlayerForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { newPlayerLoading, newPlayerError, newPlayerSuccess } = useSelector(
    (state) => state.player
  );

  const { register, control, handleSubmit, reset, errors } = useForm();

  useEffect(() => (newPlayerSuccess ? reset() : undefined), [
    newPlayerSuccess,
    reset,
  ]);

  const onSubmit = (data) => {
    dispatch(newPlayer(data));
  };

  return (
    <Paper className={classes.paperPad}>
      <Typography variant="h5" gutterBottom>
        Create Player
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              inputRef={register({ required: "Enter name" })}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
              disabled={newPlayerLoading}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              name="profileId"
              label="Profile ID"
              id="profileId"
              inputRef={register({ required: "Enter profile id" })}
              error={errors.profileId ? true : false}
              helperText={errors.profileId?.message}
              disabled={newPlayerLoading}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Controller
              as={
                <DatePicker
                  className={classes.dateCell}
                  clearable
                  autoOk
                  label="Date of birth"
                  format="MM/DD/YYYY"
                  views={["year", "month", "date"]}
                  inputVariant="outlined"
                  InputAdornmentProps={{ position: "start" }}
                  error={errors.birthdate ? true : false}
                />
              }
              name="birthdate"
              defaultValue="01/01/1990"
              rules={{ required: "Field Required" }}
              control={control}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              name="nflURLName"
              label="NFL URL Name"
              id="nflURLName"
              inputRef={register({ required: "Enter NFL URL Name" })}
              error={errors.nflURLName ? true : false}
              helperText={errors.nflURLName?.message}
              disabled={newPlayerLoading}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              name="pictureId"
              label="Picture ID"
              id="pictureId"
              inputRef={register({ required: "Enter Picture ID" })}
              error={errors.pictureId ? true : false}
              helperText={errors.pictureId?.message}
              disabled={newPlayerLoading}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={newPlayerLoading}
        >
          Submit
        </Button>
        {newPlayerLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
      <br></br>
      {newPlayerError && (
        <Typography variant="body" className={classes.failure}>
          New player error
        </Typography>
      )}
      {newPlayerSuccess && (
        <Typography variant="body" className={classes.success}>
          New player added!
        </Typography>
      )}
    </Paper>
  );
}

function DeletePlayerConfirm({ player, open, handleClose}) {

  const { deletePlayerLoading, deletePlayerSuccess, deletePlayerError } = useSelector(
    (state) => state.player
  );

  const dispatch = useDispatch();

  const submitDeletePlayer = () => {
    console.log(player.id)
    dispatch(deletePlayer(player.id))
  }

  useEffect(() => {
    if (deletePlayerSuccess) {
      handleClose()
    }
  }, [handleClose, deletePlayerSuccess])

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete {player && player.name}?</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        This will delete the player permanently {JSON.stringify(player)}
        {deletePlayerError ? 'There was an error' : undefined}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button disabled={deletePlayerLoading} onClick={submitDeletePlayer} color="primary" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>)
}