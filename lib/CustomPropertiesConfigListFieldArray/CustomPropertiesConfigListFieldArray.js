import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Col, Row } from '@folio/stripes/components';
import CustomPropertyField from './CustomPropertyField';

export default class CustomPropertiesConfigListFieldArray extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      name: PropTypes.string,
      remove: PropTypes.func,
      unshift: PropTypes.func.isRequired,
      value: PropTypes.array.isRequired,
    }).isRequired,
    mutators: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    pickLists: PropTypes.arrayOf(PropTypes.object),
    translationKey: PropTypes.string,
  };

  state = {
    disableNewButton: false,
  };

  defaultCustomPropertyValue = {
    defaultInternal: true,
    primary: false,
    weight: 0,
  };

  handleDelete = index => {
    const { fields, onDelete } = this.props;
    const customProperty = fields.value[index];

    if (customProperty.id) {
      onDelete(customProperty);
    } else {
      fields.remove(index);
      this.setState({ disableNewButton: false });
    }
  };

  handleNew = () => {
    this.props.fields.unshift(this.defaultCustomPropertyValue);
    this.setState({ disableNewButton: true });
  };

  handleSave = index => {
    const customProperty = this.props.fields.value[index];

    if (!customProperty.id) {
      this.setState({ disableNewButton: false });
    }

    return this.props.onSave(customProperty);
  };

  render() {
    const { fields, mutators, pickLists, translationKey } = this.props;
    return (
      <div>
        <Row end="sm">
          <Col>
            <Button
              buttonStyle="primary"
              disabled={this.state.disableNewButton}
              id="clickable-new-customproperty"
              onClick={this.handleNew}
            >
              <FormattedMessage id="stripes-components.button.new" />
            </Button>
          </Col>
        </Row>
        {fields.value.map((customProperty, i) => (
          <Field
            component={CustomPropertyField}
            isEqual={isEqual}
            key={customProperty.id || 'new'}
            mutators={mutators}
            name={`${fields.name}[${i}]`}
            onDelete={() => this.handleDelete(i)}
            onSave={() => this.handleSave(i)}
            pickLists={pickLists}
            translationKey={translationKey}
            // This `validate` appears stupid and like a no-op, but it's necessary because of the way
            // that RFF decides whether to run validation: https://github.com/final-form/final-form/pull/267
            // We want this Field to have validation info (meta.invalid) upon mount because some of the
            // child Fields are required and they will run validation.
            validate={() => {}}
          />
        ))}
      </div>
    );
  }
}
