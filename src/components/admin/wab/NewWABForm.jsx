import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@material-ui/pickers';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { newWAB } from '../../../store/wab';
import { YoutubeSearchedForSharp } from '@material-ui/icons';

const ControlledAutocomplete = ({
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
}) => {
  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionSelected={(option, value) =>
            option.id === value.id
          }
          renderOption={renderOption}
          renderInput={renderInput}
          onChange={(e, data) => onChange(data)}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
};

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
  select: {
    width: 192,
    marginTop: 16,
    marginBottom: 8,
  },
}));

export default function NewWABForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { newWABLoading, newWABError, newWABSuccess } = useSelector(
    (state) => state.wab,
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    errors,
  } = useForm();

  useEffect(() => (newWABSuccess ? reset() : undefined), [
    newWABSuccess,
    reset,
  ]);

  const onSubmit = (data) => {
    const { amount, year, week, player, team } = data;
    const wab = {
      amount: parseInt(data.amount, 10),
      year,
      week,
      playerId: parseInt(player.id),
      fantasyTeamId: parseInt(team.id),
      winning: true,
    };
    dispatch(newWAB(wab));
  };

  const bidCount = [0];
  const weeks = [...Array(17).keys()].slice(1, 17);
  const currentWeek = 1;
  const players = [
    { id: 310, name: 'Matt Ryan' },
    { id: 925, name: 'Jamal Charles' },
  ];

  const teams = [
    { id: 119, ownerName: 'Woody', teamName: 'Flip Rivers' },
    { id: 115, ownerName: 'Jhi', teamName: 'Burrows Boys' },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Enter waiver bids
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <ControlledAutocomplete
              control={control}
              name="player"
              options={players}
              getOptionLabel={(option) => `${option.name}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Player"
                  margin="normal"
                  variant="outlined"
                />
              )}
              defaultValue={null}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.select}
            >
              <InputLabel id="age-label">Year</InputLabel>
              <Controller
                control={control}
                name="year"
                label="Year"
                autoComplete="year"
                rules={{ required: true }}
                error={!!errors.year}
                helperText={errors.year?.message}
                disabled={newWABLoading}
                defaultValue={null}
                as={
                  <Select
                    variant="outlined"
                    margin="normal"
                    labelId="age-label"
                  >
                    {[2020, 2021].map((year) => {
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.select}
            >
              <InputLabel id="week-label">Week</InputLabel>
              <Controller
                control={control}
                name="week"
                label="Week"
                autoComplete="week"
                rules={{ required: true }}
                error={!!errors.week}
                helperText={errors.week?.message}
                disabled={newWABLoading}
                defaultValue={null}
                as={
                  <Select variant="outlined" margin="normal">
                    {weeks.map((week) => {
                      return (
                        <MenuItem key={week} value={week}>
                          {week}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              />
            </FormControl>
          </Grid>
          {bidCount.map((b) => {
            return (
              <>
                <Grid item xs={4}>
                  <ControlledAutocomplete
                    control={control}
                    name="team"
                    options={teams}
                    getOptionLabel={(option) =>
                      `${option.ownerName} - ${option.teamName}`
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Team"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                    defaultValue={null}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="number"
                    name="amount"
                    label="Amount"
                    inputRef={register({
                      required: 'Enter amount',
                      min: {
                        value: 1,
                        message: 'Must be at least 1',
                      },
                      max: {
                        value: 200,
                        message: '$200 at most',
                      },
                    })}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    disabled={newWABLoading}
                  />
                </Grid>
                <Grid item xs={4}></Grid>
              </>
            );
          })}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={newWABLoading}
            >
              {newWABLoading ? (
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
      {newWABError && (
        <Typography variant="body" className={classes.failure}>
          Error when creating waiver bid(s)
        </Typography>
      )}
      {newWABSuccess && (
        <Typography variant="body" className={classes.success}>
          New waiver bids added successfully
        </Typography>
      )}
    </>
  );
}
