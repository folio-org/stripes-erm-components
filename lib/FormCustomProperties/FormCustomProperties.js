import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Field } from 'react-final-form';
import CustomPropertiesListField from './CustomPropertiesListField';

class FormCustomProperties extends React.Component {
  static propTypes = {
    customProperties: PropTypes.arrayOf(PropTypes.object),
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.refToCustomPropertiesListField = React.createRef();
    this.state = {
      customProperties: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { customProperties } = props;
    if (customProperties.length !== state.customProperties.length) {
      return {
        customProperties: customProperties.map(customProperty => {
          let options = customProperty?.category?.values;
          if (options) {
            options = [
              {
                label: props.intl.formatMessage({
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
        }),
      };
    }

    return null;
  }

  render() {
    return (
      <Field
        validate={value => this.refToCustomPropertiesListField.current &&
          this.refToCustomPropertiesListField.current.isInvalid(value)
        }
        {...this.props}
        render={props => {
          return (
            <CustomPropertiesListField
              ref={this.refToCustomPropertiesListField}
              availableCustomProperties={this.state.customProperties}
              {...props}
            />
          );
        }}
      />
    );
  }
}

export default injectIntl(FormCustomProperties);
