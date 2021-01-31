import React from 'react';
import { Controller } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function ControlledSelect({
  rules,
  control,
  name,
  label,
  autoComplete,
  error,
  options = [],
  helperText,
  disabled,
}) {
  return (
    <Controller
      control={control}
      name={name}
      label={label}
      autoComplete={autoComplete}
      rules={rules}
      error={error}
      helperText={helperText}
      disabled={disabled}
      as={
        <Select
          variant="outlined"
          labelId="age-label"
          helperText={errors.year?.message}
        >
          {/* options are primitives */}
          {options.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {options}
              </MenuItem>
            );
          })}
        </Select>
      }
    />
  );
}
