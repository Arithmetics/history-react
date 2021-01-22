import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@material-ui/pickers';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { newPlayer } from '../../../store/player';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  dateCell: {
    marginTop: 16,
    width: '100%',
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
  buttonProgress: {
    color: theme.palette.primary.light,
  },
}));

export default function NewPlayerForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    newPlayerLoading,
    newPlayerError,
    newPlayerSuccess,
  } = useSelector((state) => state.player);

  const {
    register,
    control,
    handleSubmit,
    reset,
    errors,
  } = useForm();

  useEffect(() => (newPlayerSuccess ? reset() : undefined), [
    newPlayerSuccess,
    reset,
  ]);

  const onSubmit = (data) => {
    dispatch(newPlayer(data));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Create Player
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
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
              inputRef={register({ required: 'Enter name' })}
              error={!!errors.name}
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
              inputRef={register({ required: 'Enter profile id' })}
              error={!!errors.profileId}
              helperText={errors.profileId?.message}
              disabled={newPlayerLoading}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Controller
              name="birthdate"
              defaultValue="01/01/1990"
              rules={{ required: 'Field Required' }}
              control={control}
              as={
                <DatePicker
                  className={classes.dateCell}
                  clearable
                  autoOk
                  label="Date of birth"
                  format="MM/DD/YYYY"
                  views={['year', 'month', 'date']}
                  inputVariant="outlined"
                  InputAdornmentProps={{ position: 'start' }}
                  error={!!errors.birthdate}
                />
              }
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              name="nflURLName"
              label="NFL URL Name"
              id="nflURLName"
              inputRef={register({ required: 'Enter NFL URL Name' })}
              error={!!errors.nflURLName}
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
              inputRef={register({ required: 'Enter Picture ID' })}
              error={!!errors.pictureId}
              helperText={errors.pictureId?.message}
              disabled={newPlayerLoading}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={newPlayerLoading}
            >
              {newPlayerLoading ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                'Submit'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
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
    </>
  );
}
