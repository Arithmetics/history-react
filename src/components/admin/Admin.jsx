import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login } from "../../store/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
  },
  failure: {
    color: theme.palette.secondary.light,
  },
}));

export default function Admin() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { user, loginLoading, loginError } = useSelector((state) => state.user);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  if (user) {
    return <Redirect to={"/home"} />;
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Admin
      </Typography>
    </>
  );
}
