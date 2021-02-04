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
  buttonCenter: {
    margin: 18,
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
  index: indexX,
  control,
  allowedTeams,
  errors,
  disabled,
  addTeamBid,
  register,
  indexes,
  getValues,
  removeTeamBid,
  trigger,
}) {
  const classes = useStyles();

  const mustBeOneWinning = () => {
    // let checkedCount = 0;
    // indexes.forEach((index) => {
    //   const winning = getValues(`teamBids[${index}].winning`);
    //   if (winning) {
    //     checkedCount += 1;
    //   }
    // });
    // if (checkedCount !== 1) {
    //   return 'Must have exactly one winning bid';
    // }
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

  const mustBeTheHighestValue = (_inputIsWinning) => {
    // if (!inputIsWinning) {
    //   return true;
    // }
    // let bad = false;
    // let highestValue = 0;
    // indexes.forEach((index) => {
    //   const amount = getValues(`teamBids[${index}].amount`);
    //   if (amount > highestValue) {
    //     highestValue = amount;
    //   }
    // });
    // indexes.forEach((index) => {
    //   const amount = getValues(`teamBids[${index}].amount`);
    //   const winning = getValues(`teamBids[${index}].winning`);

    //   if (winning && amount !== highestValue) {
    //     bad = true;
    //   }
    // });
    // if (bad) {
    //   return 'Winning bid must be at least tied for the highest amount';
    // }
    return true;
  };

  const reRunTeamBidVal = () => {
    indexes.forEach((index) => {
      trigger(`teamBids[${index}].winning`);
    });
  };

  const fieldName = `teamBids[${indexX}]`;
  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={8} md={4}>
        <ControlledAutocomplete
          defaultValue={null}
          control={control}
          noOptionsText="Select a year first"
          rules={{
            required: 'Select team',
            validate: {
              mustMatchSelectedYear,
            },
          }}
          name={`${fieldName}.team`}
          options={allowedTeams}
          getOptionLabel={(option) =>
            `${option.year} - ${option.owner.name} - ${option.name}`
          }
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Team"
              margin="normal"
              variant="outlined"
              error={!!errors.teamBids?.[indexX]?.team}
              helperText={errors.teamBids?.[indexX]?.team?.message}
            />
          )}
        />
      </Grid>
      <Hidden mdUp xsDown>
        <Grid item xs={4} />
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
          error={!!errors.teamBids?.[indexX]?.amount}
          helperText={errors.teamBids?.[indexX]?.amount?.message}
          disabled={disabled}
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
        <FormControl error>
          <FormControlLabel
            inputRef={register({
              validate: {
                mustBeOneWinning,
                mustBeTheHighestValue,
              },
            })}
            control={
              <Checkbox
                onChange={() => reRunTeamBidVal()}
                helperText={
                  errors.teamBids?.[indexX]?.winning?.message
                }
                name={`${fieldName}.winning`}
                color="primary"
                inputRef={register({
                  validate: {
                    mustBeOneWinning,
                    mustBeTheHighestValue,
                  },
                })}
              />
            }
            label="Winning?"
            labelPlacement="top"
            className={
              errors.teamBids?.[indexX]?.winning
                ? classes.winningLabelError
                : classes.winningLabel
            }
          />
          {errors.teamBids?.[indexX]?.winning && (
            <FormHelperText className={classes.checkboxErrorLabel}>
              {errors.teamBids?.[indexX]?.winning.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={8} md={4}>
        {indexX !== 0 && (
          <Tooltip title="Delete bid">
            <IconButton
              className={classes.buttonCenter}
              color="secondary"
              onClick={removeTeamBid(indexX)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
        {indexX === indexes[indexes.length - 1] && (
          <Tooltip title="Add bid on player">
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonCenter}
              disabled={disabled}
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
