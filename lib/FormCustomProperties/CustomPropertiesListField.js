import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Button,
  Col,
  InfoPopover,
  KeyValue,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';
import CustomPropertyValue from './CustomPropertyValue';

import EditCard from '../EditCard';
import customPropertyTypes from '../customPropertyTypes';

const CustomPropertiesListField = (props) => {
  const {
    availableCustomProperties = [],
    input: {
      onChange,
      value
    },
    meta: {
      pristine
    },
    optionalSectionLabel,
    primarySectionLabel,
    translationKey
  } = props;

  const intl = useIntl();

  const [customProperties, setCustomProperties] = useState([]); // This is the list of customProperties we're currently displaying for edit.
  const [dirtying, setDirtying] = useState(false);

  useEffect(() => {
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
    if (pristine && !dirtying) {
      setCustomProperties(availableCustomProperties.filter(
        customProperty => value[customProperty.value] !== undefined
      ));
    }
    return null;
  }, [availableCustomProperties, dirtying, pristine, value]);

  const getCustomProperty = (customPropertyValue) => {
    return availableCustomProperties.find(customProperty => customProperty.value === customPropertyValue);
  };

  const renderCustomPropertyName = (customProperty, i) => {
    // renderCustomPropertyName is only used for optional custom properties (primary = false)
    const unsetCustomProperties = availableCustomProperties.filter(cp => cp.primary === false).filter(t => {
      const custPropValue = value[t.value];

      // The customProperty is unset and has no value.
      if (custPropValue === undefined) return true;

      // The customProperty is set but is marked for deletion. Allow reuse.
      if (custPropValue[0]?._delete) return true;
      return false;
    });

    const customPropertyValue = value[customProperty.value];
    const id = customPropertyValue?.[0]?.id;

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
          const newCustomProperties = [...customProperties];
          newCustomProperties[i] = getCustomProperty(newValue);
          setCustomProperties(newCustomProperties);

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
  };

  const validate = (fieldValue, allValues, customProperty) => {
    const { note, publicNote, value: currentValue } = allValues?.customProperties?.[customProperty?.value]?.[0] ?? {};

    if ((note && !currentValue) || (publicNote && !currentValue)) {
      if (
        customProperty.type === customPropertyTypes.NUMBER ||
        customProperty.type === customPropertyTypes.DECIMAL
      ) {
        return <FormattedMessage id="stripes-erm-components.errors.customPropertyNoteInvalidNumber" />;
      } else {
        return <FormattedMessage id="stripes-erm-components.errors.customPropertyNoteWithoutValue" />;
      }
    }

    if (customProperty.type === customPropertyTypes.DECIMAL) {
      const regexp = /^-?[\d]*(\.[\d]{0,2})?$/;
      return (fieldValue && !regexp.test(fieldValue)) ?
        <FormattedMessage id="stripes-erm-components.errors.customPropertyMaxTwoDecimals" /> : undefined;
    }

    if (customProperty.type === customPropertyTypes.NUMBER) {
      const min = Number.MIN_SAFE_INTEGER;
      const max = Number.MAX_SAFE_INTEGER;

      return (fieldValue && !Number.isInteger(+fieldValue)) ?
        <FormattedMessage id="stripes-erm-components.errors.customPropertyValueNotInRange" values={{ min, max }} /> : undefined;
    }
    if (!customProperty.primary && !currentValue) {
      return <FormattedMessage id="stripes-core.label.missingRequiredField" />;
    }

    return undefined;
  };

  const renderCustomPropertyValue = (customProperty, i) => {
    return (
      <CustomPropertyValue
        customProperty={customProperty}
        index={i}
        intl={intl}
        validate={validate}
        {...props}
      />
    );
  };

  const renderCustomPropertyVisibility = (customProperty, i) => {
    const customPropertyObject = value[customProperty.value]?.[0] ?? {};

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
      <Select
        data-test-customproperty-visibility
        dataOptions={[
          { value: true, label: intl.formatMessage({ id: 'stripes-erm-components.customProperty.internalTrue' }) },
          { value: false, label: intl.formatMessage({ id: 'stripes-erm-components.customProperty.internalFalse' }) }
        ]}
        id={`edit-customproperty-${i}-visibility`}
        label={<FormattedMessage id="stripes-erm-components.prop.customPropertyVisibility" />}
        onChange={handleChange}
        value={customPropertyObject?.internal ?? customProperty.defaultInternal}
      />
    );
  };

  const handleDeleteCustomProperty = (customProperty, i) => {
    const currentValue = value[customProperty.value]?.[0] ?? {};

    const newCustomProperties = [...customProperties];
    newCustomProperties.splice(i, 1);
    setCustomProperties(newCustomProperties);
    setDirtying(true);

    onChange({
      ...value,
      [customProperty.value]: [{
        ...currentValue,
        _delete: true,
      }],
    });
  };

  const renderCustomPropertyNoteInternal = (customProperty, i) => {
    const customPropertyObject = value[customProperty.value]?.[0] ?? {};

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
        value={customPropertyObject?.note}
      />
    );
  };

  const renderCustomPropertyNotePublic = (customProperty, i) => {
    const customPropertyObject = value[customProperty.value]?.[0] ?? {};

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
        label={<FormattedMessage id="stripes-erm-components.customProperty.publicNote" />}
        onChange={handleChange}
        value={customPropertyObject?.publicNote}
      />
    );
  };

  const renderAddCustomProperty = () => {
    return (
      <Button
        id="add-customproperty-btn"
        onClick={() => {
          setCustomProperties([...customProperties, {}]);
          setDirtying(true);
        }}
      >
        <FormattedMessage id={`stripes-erm-components.customProperties.${translationKey}.add`} />
      </Button>
    );
  };

  const renderCustomProperties = (customPropertyType) => {
    let optionalCustomPropertyCounter = 0;
    return customProperties.map((customProperty = {}, i) => {
      if (customPropertyType === 'primary' && !customProperty.primary) return undefined;
      if (customPropertyType === 'optional' && customProperty.primary) return undefined;

      const deleteBtnProps = customPropertyType === 'optional' ? {
        'id': `edit-customproperty-${i}-delete`,
        'data-test-customproperty-delete-btn': true
      } : null;

      const header = customPropertyType === 'optional' ?
        <FormattedMessage
          id={`stripes-erm-components.customProperty.${translationKey}Title`}
          values={{ number: optionalCustomPropertyCounter + 1 }}
        /> : customProperty.label;

      optionalCustomPropertyCounter += 1;

      return (
        <EditCard
          key={customProperty.value}
          data-test-customproperty={customPropertyType}
          deleteBtnProps={deleteBtnProps}
          deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.customProperty.remove" values={{ type: translationKey }} />}
          header={
            <div>
              {header}
              {customProperty.description ? (
                <InfoPopover
                  content={customProperty.description}
                />
              ) : null}
            </div>
          }
          onDelete={customPropertyType === 'optional' ? () => handleDeleteCustomProperty(customProperty, i) : null}
        >
          {
            customPropertyType === 'optional' &&
            <Row>
              <Col xs={12}>
                {renderCustomPropertyName(customProperty, i)}
              </Col>
            </Row>
          }
          <Row>
            <Col md={6} xs={12}>
              {renderCustomPropertyValue(customProperty, i)}
            </Col>
            <Col md={6} xs={12}>
              {renderCustomPropertyNoteInternal(customProperty, i)}
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              {renderCustomPropertyVisibility(customProperty, i)}
            </Col>
            <Col md={6} xs={12}>
              {renderCustomPropertyNotePublic(customProperty, i)}
            </Col>
          </Row>
        </EditCard>
      );
    }).filter(customProperty => customProperty !== undefined);
  };

  const renderCustomPropertiesList = () => {
    return (
      <div>
        {availableCustomProperties.some((customProperty = {}) => customProperty.primary) ?
          <KeyValue
            label={primarySectionLabel}
            value={renderCustomProperties('primary')}
          />
          :
          null
        }
        {availableCustomProperties.some((customProperty = {}) => !customProperty.primary) ?

          <KeyValue
            label={optionalSectionLabel}
            value={renderCustomProperties('optional')}
          />
          :
          null
        }
      </div>
    );
  };



  return (
    <div>
      {renderCustomPropertiesList()}
      {availableCustomProperties.some((customProperty = {}) => !customProperty.primary) ?
        renderAddCustomProperty()
        :
        null}
    </div>
  );
};

CustomPropertiesListField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onChange: PropTypes.func,
  }),
  meta: PropTypes.object,
  optionalSectionLabel: PropTypes.node.isRequired,
  primarySectionLabel: PropTypes.node.isRequired,
  translationKey: PropTypes.string,
  availableCustomProperties: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    defaultInternal: PropTypes.bool,
  })).isRequired,
};

export default CustomPropertiesListField;

