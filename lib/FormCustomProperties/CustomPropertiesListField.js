import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IntlConsumer } from '@folio/stripes/core';
import {
  Button,
  Col,
  KeyValue,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { isEmpty } from 'lodash';

import EditCard from '../EditCard';

const CUSTOM_PROPERTY_TYPE_TEXT = 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'; // eslint-disable-line no-unused-vars
const CUSTOM_PROPERTY_TYPE_NUMBER = 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger';
const CUSTOM_PROPERTY_TYPE_SELECT = 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata';

export default class CustomPropertiesListField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      onChange: PropTypes.func,
    }),
    meta: PropTypes.object,
    optionalSectionLabel: PropTypes.string.isRequired,
    primarySectionLabel: PropTypes.string.isRequired,
    availableCustomProperties: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string.isRequired,
      options: PropTypes.array,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      defaultInternal: PropTypes.bool,
    })).isRequired,
  };

  state = {
    customProperties: [], // This is the list of customProperties we're currently displaying for edit.
    errors: {},
  }

  static getDerivedStateFromProps(props, state) {
    const {
      input: { value },
      meta: { pristine },
      availableCustomProperties = [],
    } = props;

    // When the user loads this form, we want to init the list of customProperties
    // we're displaying (state.customProperties) with the list of customProperties that have been set
    // either via defaults or previously-saved data. Since that data may come in
    // _after_ we have mounted this component, we need to check if new data has come in
    // while the form is still marked as pristine.
    //
    // final-form unsets `pristine` after its `onChange` is called, but we also dirty
    // the component when we add/remove rows. That happens _before_ `onChange` is called,
    // so internally we use `state.dirtying` to show that we just initiated an action
    // that will result in a dirty component.
    if (pristine && !state.dirtying) {
      return {
        customProperties: availableCustomProperties.filter(customProperty => value[customProperty.value] !== undefined),
      };
    }

    return null;
  }

  getCustomProperty = (customPropertyValue) => {
    return this.props.availableCustomProperties.find(customProperty => customProperty.value === customPropertyValue);
  }

  renderCustomPropertyName = (customProperty, i) => {
    const { availableCustomProperties, input: { onChange, value } } = this.props;

    const unsetCustomProperties = availableCustomProperties.filter(t => {
      const customPropertyValue = value[t.value];

      // The customProperty is unset and has no value.
      if (customPropertyValue === undefined) return true;

      // The customProperty is set but is marked for deletion. Allow reuse.
      if (customPropertyValue[0] && customPropertyValue[0]._delete) return true;

      return false;
    });

    const customPropertyValue = value[customProperty.value];
    const id = customPropertyValue ? customPropertyValue[0].id : null;

    return (
      <Select
        autoFocus={!id}
        data-test-customproperty-name
        dataOptions={[customProperty, ...unsetCustomProperties]} // The selected customProperty, and the available unset customProperties
        id={`edit-customproperty-${i}-name`}
        label={<FormattedMessage id="stripes-erm-components.prop.customPropertyName" />}
        onChange={e => {
          const newValue = e.target.value;

          // Update `state.customProperties` which controls what customProperties are being edited.
          this.setState(prevState => {
            const newCustomProperties = [...prevState.customProperties];
            newCustomProperties[i] = this.getCustomProperty(newValue);

            return { customProperties: newCustomProperties };
          });

          // Update final-form (which tracks what the values for a given customProperty are) because
          // in essence we're deleting a customProperty and creating a new customProperty.
          // We do this by 1) marking the current customProperty for deletion and 2) initing
          // the new customProperty to an empty object.
          const currentValue = value[customProperty.value] ? value[customProperty.value][0] : {};
          onChange({
            ...value,
            [customProperty.value]: [{
              id: currentValue.id,
              _delete: true,
            }],
            [newValue]: [{}],
          });
        }}
        required
        value={customProperty.value}
      />
    );
  }


  isInvalid = (values) => {
    const errors = {};

    this.state.customProperties.forEach((customProperty) => {
      const val = values ? values[customProperty.value] : [];
      const { note, publicNote, value } = val ? val[0] : {};

      if (!customProperty.primary && customProperty.value && !value) {
        errors[customProperty.value] = <FormattedMessage id="stripes-core.label.missingRequiredField" />;
      }

      if ((note && !value) || (publicNote && !value)) {
        errors[customProperty.value] = <FormattedMessage id="stripes-erm-components.errors.customPropertyNoteWithoutValue" />;
      }

      if (customProperty.type === CUSTOM_PROPERTY_TYPE_NUMBER) {
        const min = Number.MIN_SAFE_INTEGER;
        const max = Number.MAX_SAFE_INTEGER;
        if (value < min || value > max) {
          errors[customProperty.value] = <FormattedMessage id="stripes-erm-components.errors.customPropertyValueNotInRange" values={{ min, max }} />;
        }
      }
    });

    this.setState({ errors });

    return Object.keys(errors).length > 0;
  }

  renderCustomPropertyValue = (customProperty, i) => {
    const { input: { onChange, value } } = this.props;
    const { errors } = this.state;
    const currentValue = value[customProperty.value] ? value[customProperty.value][0] : {};

    // Initialise to just the value (for text/number values)
    // and then check if it's an object (for Select/refdata values).
    let controlledFieldValue = currentValue.value;
    if (controlledFieldValue && controlledFieldValue.value) {
      controlledFieldValue = controlledFieldValue.value;
    }

    // Figure out which component we're rendering and specify its unique props.
    let FieldComponent = TextArea;
    const fieldProps = {};
    if (customProperty.type === CUSTOM_PROPERTY_TYPE_SELECT) {
      FieldComponent = Select;
      fieldProps.dataOptions = customProperty.options;
    }

    if (customProperty.type === CUSTOM_PROPERTY_TYPE_NUMBER) {
      FieldComponent = TextField;
      fieldProps.type = 'number';
    }

    const handleChange = e => {
      onChange({
        ...value,
        [customProperty.value]: [{
          ...currentValue,
          _delete: e.target.value === '' ? true : undefined, // Delete customProperty if removing the value.
          value: e.target.value
        }],
      });
    };

    return (
      <FieldComponent
        data-test-customproperty-value
        id={`edit-customproperty-${i}-value`}
        label={<FormattedMessage id="stripes-erm-components.prop.customPropertyValue" />}
        onChange={handleChange}
        value={controlledFieldValue}
        error={!isEmpty(errors) ? errors[customProperty.value] : undefined}
        {...fieldProps}
        required={!customProperty.primary}
      />
    );
  }

  renderCustomPropertyVisibility = (customProperty, i) => {
    const { input: { onChange, value } } = this.props;
    const customPropertyObject = value[customProperty.value] ? value[customProperty.value][0] : {};
    const { internal } = customPropertyObject;

    const dataOptions = (intl) => {
      return [
        { value: true, label: intl.formatMessage({ id: 'stripes-erm-components.customProperty.internalTrue' }) },
        { value: false, label: intl.formatMessage({ id: 'stripes-erm-components.customProperty.internalFalse' }) }
      ];
    };

    const handleChange = e => {
      onChange({
        ...value,
        [customProperty.value]: [{
          ...customPropertyObject,
          internal: e.target.value
        }],
      });
    };

    return (
      /* TODO: Refactor this component to use `injectIntl` when Folio starts using react-intl 3.0 */
      <IntlConsumer>
        {intl => (
          <Select
            data-test-customproperty-visibility
            id={`edit-customproperty-${i}-visibility`}
            dataOptions={dataOptions(intl)}
            label={<FormattedMessage id="stripes-erm-components.prop.customPropertyVisibility" />}
            onChange={handleChange}
            value={internal === undefined ? customProperty.defaultInternal : internal}
          />
        )}
      </IntlConsumer>
    );
  }

  handleDeleteCustomProperty = (customProperty, i) => {
    const { input: { onChange, value } } = this.props;
    const currentValue = value[customProperty.value] ? value[customProperty.value][0] : {};

    this.setState(prevState => {
      const newCustomProperties = [...prevState.customProperties];
      newCustomProperties.splice(i, 1);
      return {
        dirtying: true,
        customProperties: newCustomProperties
      };
    });

    onChange({
      ...value,
      [customProperty.value]: [{
        ...currentValue,
        _delete: true,
      }],
    });
  }

  renderCustomPropertyNoteInternal = (customProperty, i) => {
    const { input: { onChange, value } } = this.props;
    const customPropertyObject = value[customProperty.value] ? value[customProperty.value][0] : {};
    const { note } = customPropertyObject;

    const handleChange = e => {
      onChange({
        ...value,
        [customProperty.value]: [{
          ...customPropertyObject,
          note: e.target.value
        }],
      });
    };

    return (
      <TextArea
        data-test-customproperty-note
        id={`edit-customproperty-${i}-internal-note`}
        label={<FormattedMessage id="stripes-erm-components.customProperty.internalNote" />}
        onChange={handleChange}
        value={note}
      />
    );
  }

  renderCustomPropertyNotePublic = (customProperty, i) => {
    const { input: { onChange, value } } = this.props;
    const customPropertyObject = value[customProperty.value] ? value[customProperty.value][0] : {};
    const { publicNote } = customPropertyObject;

    const handleChange = e => {
      onChange({
        ...value,
        [customProperty.value]: [{
          ...customPropertyObject,
          publicNote: e.target.value
        }],
      });
    };

    return (
      <TextArea
        data-test-customproperty-public-note
        id={`edit-customproperty-${i}-public-note`}
        onChange={handleChange}
        label={<FormattedMessage id="stripes-erm-components.customProperty.publicNote" />}
        value={publicNote}
      />
    );
  }

  renderAddCustomProperty = () => {
    const { input: { type } } = this.props;
    return (
      <Button
        id="add-customproperty-btn"
        onClick={() => {
          this.setState(prevState => {
            return {
              dirtying: true,
              customProperties: [...prevState.customProperties, {}],
            };
          });
        }}
      >
        {type === 'terms' ? <FormattedMessage id="stripes-erm-components.customProperties.addTerm" /> :
        <FormattedMessage id="stripes-erm-components.customProperties.addSupplementaryProperty" />}
      </Button>
    );
  }

  renderCustomPropertiesList = () => {
    const { optionalSectionLabel, primarySectionLabel } = this.props;
    return (
      <div>
        <KeyValue
          label={primarySectionLabel}
          value={this.renderCustomProperties('primary')}
        />
        <KeyValue
          label={optionalSectionLabel}
          value={this.renderCustomProperties('optional')}
        />
      </div>
    );
  }

  renderCustomProperties = (customPropertyType) => {
    const { input: { type } } = this.props;

    let optionalCustomPropertyCounter = 0;

    const customPropertiesList = this.state.customProperties.map((customProperty, i) => {
      if (customPropertyType === 'primary' && !customProperty.primary) return undefined;
      if (customPropertyType === 'optional' && customProperty.primary) return undefined;

      const deleteBtnProps = customPropertyType === 'optional' ? {
        'id': `edit-customproperty-${i}-delete`,
        'data-test-customproperty-delete-btn': true
      } : null;

      const header = customPropertyType === 'optional' ?
        <FormattedMessage
          id={`stripes-erm-components.customProperty.${(type === 'terms') ? 'term' : 'supplementaryProperty'}Title`}
          values={{ number: optionalCustomPropertyCounter + 1 }}
        /> : customProperty.label;

      optionalCustomPropertyCounter += 1;

      return (
        <EditCard
          data-test-customproperty={customPropertyType}
          deleteBtnProps={deleteBtnProps}
          deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.customProperty.removeTerm" />}
          header={header}
          key={customProperty.value}
          onDelete={customPropertyType === 'optional' ? () => this.handleDeleteCustomProperty(customProperty, i) : null}
        >
          {
            customPropertyType === 'optional' &&
            <Row>
              <Col xs={12}>
                {this.renderCustomPropertyName(customProperty, i)}
              </Col>
            </Row>
          }
          <Row>
            <Col xs={12} md={6}>
              {this.renderCustomPropertyValue(customProperty, i)}
            </Col>
            <Col xs={12} md={6}>
              {this.renderCustomPropertyNoteInternal(customProperty, i)}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              {this.renderCustomPropertyVisibility(customProperty, i)}
            </Col>
            <Col xs={12} md={6}>
              {this.renderCustomPropertyNotePublic(customProperty, i)}
            </Col>
          </Row>
        </EditCard>
      );
    }).filter(customProperty => customProperty !== undefined);

    return customPropertiesList;
  }

  render() {
    return (
      <div>
        {this.renderCustomPropertiesList()}
        {this.renderAddCustomProperty()}
      </div>
    );
  }
}
