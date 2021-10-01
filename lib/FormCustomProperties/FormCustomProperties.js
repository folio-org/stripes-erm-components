import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import CustomPropertiesListField from './CustomPropertiesListField';

const FormCustomProperties = (props) => {
  const intl = useIntl();
  const refToCustomPropertiesListField = useRef();
  const [custProps, setCustProps] = useState([]);

  useEffect(() => {
    const { customProperties } = props;
    setCustProps(customProperties.map(customProperty => {
      let options = customProperty?.category?.values;
      if (options) {
        options = [
          {
            label: intl.formatMessage({
              id: 'stripes-erm-components.formCustomProperties.notSet',
            }),
            value: '',
          },
          ...options,
        ];
      }

      return {
        description: customProperty.description,
        label: customProperty.label,
        primary: customProperty.primary,
        _delete: customProperty.primary,
        type: customProperty.type,
        options,
        value: customProperty.name,
        defaultInternal: customProperty.defaultInternal,
      };
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
