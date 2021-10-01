import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import CustomPropertiesListField from './CustomPropertiesListField';
import useAvailableCustomProperties from '../hooks/useAvailableCustomProperties';

const FormCustomProperties = (props) => {
  const refToCustomPropertiesListField = useRef();
  const custProps = useAvailableCustomProperties(props.customProperties);

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
