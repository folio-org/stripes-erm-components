import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import CustomPropertiesListField from './CustomPropertiesListField';
import useAvailableCustomProperties from '../hooks/useAvailableCustomProperties';

/* DEPRECATED */
const FormCustomProperties = (props) => {
  const refToCustomPropertiesListField = useRef();
  const custProps = useAvailableCustomProperties(props.customProperties);

  /* eslint-disable no-console */
  console.warn('Warning: <FormCustomProperties> is deprecated in stripes-erm-components and will be removed in a future release');

  return (
    <Field
      {...props}
      render={p => {
        return (
          <CustomPropertiesListField
            ref={refToCustomPropertiesListField}
            availableCustomProperties={custProps}
            {...p}
          />
        );
      }}
    />
  );
};

FormCustomProperties.propTypes = {
  customProperties: PropTypes.arrayOf(PropTypes.object),
};

export default FormCustomProperties;
