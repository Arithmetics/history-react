import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingSpinner from '../../LoadingSpinner';

import TeamBidLine from './TeamBidLine';
import ControlledAutocomplete from './ControlledAutocomplete';

import { newWAB } from '../../../store/wab';
import { getAllPlayers } from '../../../store/player';
import { getAllFantasyTeams } from '../../../store/fantasyTeam';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  failure: {
    color: theme.palette.error.main,
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
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonCenter: {
    margin: 18,
  },
  bidType: {
    marginTop: 10,
  },
  winningLabel: {
    marginTop: 8,
    marginLeft: 43,
    '& span': {
      fontSize: 12,
    },
  },
  winningLabelError: {
    color: theme.palette.error.main,
    marginTop: 8,
    marginBottom: -2,
    '& span': {
      fontSize: 12,
    },
  },
  checkboxErrorLabel: {
    marginLeft: 16,
    marginRight: 6,
  },
}));

export default function NewWABForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { newWABLoading, newWABError, newWABSuccess } = useSelector(
    (state) => state.wab,
  );
  const {
    allPlayersLoading,
    allPlayers,
    allPlayersError,
  } = useSelector((state) => state.player);
  const {
    allFantasyTeamsLoading,
    allFantasyTeams,
    allFantasyTeamsError,
  } = useSelector((state) => state.fantasyTeam);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    errors,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      year: '',
      week: '',
      player: null,
    },
  });

  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllFantasyTeams());
  }, [dispatch]);

  useEffect(() => (newWABSuccess ? reset() : undefined), [
    newWABSuccess,
    reset,
  ]);

  const [indexes, setIndexes] = React.useState([0]);
  const [counter, setCounter] = React.useState(1);

  const addTeamBid = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeTeamBid = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const reRunTeamBidVal = () => {
    indexes.forEach((index) => {
      trigger(`teamBids[${index}].winning`);
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    // const { year, week, player, teamBids } = data;
    // const wab = {
    //   year,
    //   week,
    //   playerId: parseInt(player.id),
    //   teamBids,
    // };
    // dispatch(newWAB(wab));
  };

  const mustBeOneWinning = () => {
    let checkedCount = 0;
    indexes.forEach((index) => {
      const winning = getValues(`teamBids[${index}].winning`);
      if (winning) {
        checkedCount += 1;
      }
    });
    if (checkedCount !== 1) {
      return 'Must have exactly one winning bid';
    }
    return true;
  };

  const mustMatchSelectedYear = (currentTeam) => {
    const selectedYear = getValues('year');
    if (!selectedYear) {
      return 'Unable to match team to year';
    }
    if (currentTeam.year !== selectedYear) {
      return 'Team must match the selected year';
    }
    return true;
  };

  const mustBeTheHighestValue = () => {
    console.log('running');
    let bad = false;
    let highestValue = 0;
    indexes.forEach((index) => {
      const amount = getValues(`teamBids[${index}].amount`);

      if (amount > highestValue) {
        highestValue = amount;
      }
      const winning = getValues(`teamBids[${index}].winning`);

      console.log(
        'test',
        winning,
        amount !== highestValue,
        amount,
        highestValue,
      );
      if (winning && amount !== highestValue) {
        console.log('asdfkhsljdfhslkdfjh');
        bad = true;
      }
    });
    if (bad) {
      return 'Winning bid must be at least tied for the highest amount';
    }
    return true;
  };

  if (allPlayersLoading || allFantasyTeamsLoading) {
    return (
      <LoadingSpinner
        isLoading={allPlayersLoading || allFantasyTeamsLoading}
      />
    );
  }

  if (allPlayersError || allFantasyTeamsError) {
    return <p>There was an error, sorry no new wab</p>;
  }

  const years = [2020, 2021];
  const weeks = [...Array(17).keys()].slice(1, 17);
  const watchYear = watch('year', 0);
  const allowedTeams =
    allFantasyTeams?.filter((f) => f.year === watchYear) || [];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        New waiver bids
      </Typography>

      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ControlledAutocomplete
              defaultValue={null}
              control={control}
              rules={{ required: 'Select player' }}
              name="player"
              options={allPlayers}
              getOptionLabel={(option) => `${option.name}`}
              noOptionsText={'Select a year'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Player"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.player}
                  helperText={errors.player?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl
              variant="outlined"
              className={classes.select}
              error={!!errors.year}
            >
              <InputLabel id="year-label">Year</InputLabel>
              <Controller
                control={control}
                name="year"
                label="Year"
                autoComplete="year"
                rules={{ required: 'Select year' }}
                error={!!errors.year}
                helperText={errors.year?.message}
                disabled={newWABLoading}
                as={
                  <Select
                    variant="outlined"
                    labelId="year-label"
                    helperText={errors.year?.message}
                  >
                    {years.map((year) => {
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              />
              <FormHelperText>{errors.year?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl
              variant="outlined"
              className={classes.select}
              error={!!errors.week}
            >
              <InputLabel id="week-label">Week</InputLabel>
              <Controller
                control={control}
                name="week"
                label="Week"
                autoComplete="week"
                rules={{ required: 'Select week' }}
                error={!!errors.week}
                helperText={errors.week?.message}
                disabled={newWABLoading}
                as={
                  <Select variant="outlined">
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
              <FormHelperText>{errors.week?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}></Grid>
          <Divider />
          {indexes.map((index, i) => {
            return (
              <TeamBidLine
                key={index}
                index={index}
                indexes={indexes}
                i={i}
                control={control}
                mustMatchSelectedYear={mustMatchSelectedYear}
                allowedTeams={allowedTeams}
                errors={errors}
                newWABLoading={newWABLoading}
                addTeamBid={addTeamBid}
                register={register}
                mustBeOneWinning={mustBeOneWinning}
                mustBeTheHighestValue={mustBeTheHighestValue}
                removeTeamBid={removeTeamBid}
                reRunTeamBidVal={reRunTeamBidVal}
              />
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
