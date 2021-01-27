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
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

import { newWAB } from '../../../store/wab';

const ControlledAutocomplete = ({
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
  rules,
}) => {
  return (
    <Controller
      rules={rules}
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
      // defaultValue={defaultValue}
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
    formState,
    reset,
    errors,
  } = useForm({
    defaultValues: {
      year: '',
      week: '',
      player: null,
      'teamBids[0].team': null,
    },
  });

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

  const onSubmit = (data) => {
    console.log(data, errors);
    // const { year, week, player, teamBids } = data;
    // const wab = {
    //   year,
    //   week,
    //   playerId: parseInt(player.id),
    //   teamBids,
    // };
    // dispatch(newWAB(wab));
  };

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

  const tryThis = (currentVal) => {
    // console.log(formState, formState.dirty, formState.dirtyFields);
    let checkedCount = 0;
    const teamBids = formState?.dirtyFields?.teamBids;
    if (!teamBids) {
      return false;
    }
    Object.keys(teamBids).forEach((key) => {
      if (teamBids[key].winner) {
        checkedCount += 1;
      }
    });
    if (checkedCount !== 1) {
      return false;
    }
    return true;
  };

  console.log(errors);
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
              control={control}
              rules={{ required: 'Select player' }}
              name="player"
              options={players}
              getOptionLabel={(option) => `${option.name}`}
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
              <InputLabel id="age-label">Year</InputLabel>
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
                    labelId="age-label"
                    helperText={errors.year?.message}
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
            const fieldName = `teamBids[${index}]`;
            return (
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={4}>
                  <ControlledAutocomplete
                    control={control}
                    rules={{ required: 'Select team' }}
                    name={`${fieldName}.team`}
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
                        error={!!errors.teamBids?.[i]?.team}
                        helperText={
                          errors.teamBids?.[i]?.team?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="number"
                    name={`${fieldName}.amount`}
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
                    error={!!errors.teamBids?.[i]?.amount}
                    helperText={errors.teamBids?.[i]?.amount?.message}
                    disabled={newWABLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl error={true}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          helperText={
                            errors.teamBids?.[i]?.winner?.message
                          }
                          name={`${fieldName}.winner`}
                          color="primary"
                          inputRef={register({
                            validate: tryThis,
                          })}
                        />
                      }
                      label="Winning?"
                      labelPlacement="top"
                    />
                    {errors.teamBids?.[i]?.winner && (
                      <FormHelperText>
                        Only one winning bid
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  {i !== 0 && (
                    <IconButton
                      className={classes.buttonCenter}
                      color="secondary"
                      onClick={removeTeamBid(i)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                  {i === indexes.length - 1 && (
                    <IconButton
                      className={classes.buttonCenter}
                      disabled={newWABLoading}
                      onClick={addTeamBid}
                    >
                      <GroupAddIcon />
                    </IconButton>
                  )}
                </Grid>
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
