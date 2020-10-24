import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { DatePicker } from "@material-ui/pickers";

import { newPlayer } from "../../store/player";

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
}));

export default function Admin() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Admin
      </Typography>
      <NewPlayerForm />
    </>
  );
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
          {newPlayerError && (
            <Typography variant="p" className={classes.failure}>
              New player error
            </Typography>
          )}
          {newPlayerSuccess && (
            <Typography variant="p" className={classes.success}>
              New player added!
            </Typography>
          )}
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
    </Paper>
  );
}
