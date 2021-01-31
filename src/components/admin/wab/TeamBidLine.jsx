import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

import ControlledAutocomplete from './ControlledAutocomplete';

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

export default function TeamBidLine({
  index,
  i,
  control,
  mustMatchSelectedYear,
  allowedTeams,
  errors,
  newWABLoading,
  addTeamBid,
  register,
  indexes,
  mustBeOneWinning,
  mustBeTheHighestValue,
  removeTeamBid,
  reRunTeamBidVal,
}) {
  const classes = useStyles();

  const fieldName = `teamBids[${index}]`;
  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={8} md={4}>
        <ControlledAutocomplete
          defaultValue={null}
          control={control}
          noOptionsText={'Select a year first'}
          rules={{
            required: 'Select team',
            validate: {
              mustMatchSelectedYear: mustMatchSelectedYear,
            },
          }}
          name={`${fieldName}.team`}
          options={allowedTeams}
          getOptionLabel={(option) =>
            `${option.year} - ${option.owner.name} - ${option.name}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Team"
              margin="normal"
              variant="outlined"
              error={!!errors.teamBids?.[i]?.team}
              helperText={errors.teamBids?.[i]?.team?.message}
            />
          )}
        />
      </Grid>
      <Hidden mdUp xsDown>
        <Grid item xs={4}></Grid>
      </Hidden>

      <Grid item xs={2} md={2}>
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
          defaultValue={null}
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
            inputRef={register({
              validate: {
                mustBeOneWinning: mustBeOneWinning,
                mustBeTheHighestValue: mustBeTheHighestValue,
              },
            })}
            control={
              <Checkbox
                onChange={() => reRunTeamBidVal()}
                helperText={errors.teamBids?.[i]?.winning?.message}
                name={`${fieldName}.winning`}
                color="primary"
                inputRef={register({
                  validate: {
                    mustBeOneWinning: mustBeOneWinning,
                    mustBeTheHighestValue: mustBeTheHighestValue,
                  },
                })}
              />
            }
            label="Winning?"
            labelPlacement="top"
            className={
              errors.teamBids?.[i]?.winning
                ? classes.winningLabelError
                : classes.winningLabel
            }
          />
          {errors.teamBids?.[i]?.winning && (
            <FormHelperText className={classes.checkboxErrorLabel}>
              {errors.teamBids?.[i]?.winning.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={8} md={4}>
        {i !== 0 && (
          <Tooltip title="Delete bid">
            <IconButton
              className={classes.buttonCenter}
              color="secondary"
              onClick={removeTeamBid(i)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
        {i === indexes.length - 1 && (
          <Tooltip title="Add bid on player">
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonCenter}
              disabled={newWABLoading}
              onClick={addTeamBid}
              startIcon={<GroupAddIcon />}
            >
              Add Team Bid
            </Button>
          </Tooltip>
        )}
      </Grid>
    </>
  );
}
