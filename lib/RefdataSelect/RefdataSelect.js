import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@folio/stripes/components';

const RefdataSelect = ({
  input,
  meta,
  dataOptions,
  onChange,
  value,
  format = (v) => v?.value || '', // Format function to transform the value for the UI
  parse = (v) => ({ value: v }), // Parse function to transform the value for the API
  ...rest
}) => {
  const currentValue = input ? format(input.value) : format(value);

  const handleChange = (event) => {
    const parsedValue = parse(event.target.value);
    if (input) {
      input.onChange(parsedValue);
    }
    if (onChange) {
      onChange(parsedValue);
    }
  };

  return (
    <Select
      {...rest}
      value={currentValue}
      onChange={handleChange}
      dataOptions={dataOptions}
      error={meta?.touched && meta?.error}
    />
  );
};

RefdataSelect.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  dataOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
  format: PropTypes.func,
  parse: PropTypes.func,
};

RefdataSelect.defaultProps = {
  input: undefined,
  meta: undefined,
  onChange: undefined,
  value: undefined,
};

export default RefdataSelect;
