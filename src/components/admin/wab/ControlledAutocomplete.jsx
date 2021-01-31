import React from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ControlledAutocomplete({
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
  rules,
  noOptionsText,
}) {
  return (
    <Controller
      rules={rules}
      onChange={([, data]) => data}
      name={name}
      noOptionsText={noOptionsText}
      defaultValue={defaultValue}
      control={control}
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
    />
  );
}
