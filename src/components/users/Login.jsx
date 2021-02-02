import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { login, logout } from '../../store/user';
import { isJSONTokenExpired } from '../../api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: theme.palette.primary.light,
  },
  failure: {
    color: theme.palette.secondary.light,
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { user, loginLoading, loginError } = useSelector(
    (state) => state.user,
  );

  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    if (storedToken || storedUser) {
      if (!storedToken) {
        dispatch(logout());
        return;
      }
      if (isJSONTokenExpired(storedToken)) {
        dispatch(logout());
      }
    }
  }, [storedToken, storedUser, dispatch]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  if (user && storedToken) {
    return <Redirect to="/home" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: 'Enter email' })}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loginLoading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: 'Enter password' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loginLoading}
          />
          {loginError && (
            <Typography variant="p" className={classes.failure}>
              Login failed
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loginLoading}
          >
            {loginLoading ? (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            ) : (
              'Sign In'
            )}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
