import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const useAvailableCustomProperties = (customProperties) => {
  const intl = useIntl();
  const [custProps, setCustProps] = useState([]);

  useEffect(() => {
    if (customProperties.length !== custProps.length) {
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
          type: customProperty.type,
          options,
          value: customProperty.name,
          defaultInternal: customProperty.defaultInternal,
        };
      }));
    }
  }, [custProps, customProperties, intl]);

  return custProps;
};

export default useAvailableCustomProperties;
