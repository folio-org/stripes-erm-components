import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@folio/stripes/components';

const RefdataSelect = ({
  input,
  meta,
  dataOptions: refdataOptions = [], // This should be an array of refdataValues
  onChange,
  value,
  ...rest
}) => {
  const refdataToId = (v) => v?.id || ''; // Format function to transform the value for the UI
  const currentValue = input ? refdataToId(input.value) : refdataToId(value);

  const refdataSelectOptions = useMemo(() => refdataOptions.map(rdv => ({ value: rdv.id, label: rdv.label })), [refdataOptions]);

  const handleChange = (event) => {
    const parsedValue = refdataOptions.find(rdv => rdv.id === event.target.value);
    if (input) {
      input.onChange(parsedValue);
    }
    if (onChange) {
      onChange(parsedValue);
    }
  };

  return (
    <Select
      dataOptions={refdataSelectOptions}
      meta={meta}
      onChange={handleChange}
      value={currentValue}
      {...rest}
    />
  );
};

RefdataSelect.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
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
  value: PropTypes.string,
};

export default RefdataSelect;
