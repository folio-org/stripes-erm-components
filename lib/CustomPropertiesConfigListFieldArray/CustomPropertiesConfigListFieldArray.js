import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import { CalloutContext } from '@folio/stripes/core';
import { Button, Col, ConfirmationModal, Row } from '@folio/stripes/components';
import CustomPropertyField from './CustomPropertyField';


class CustomPropertiesConfigListFieldArray extends React.Component {
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
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }),
    translationKey: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { showConfirmDelete: false, disableNewButton: false, deleteIndex: 0, deleteName: '' };
  }

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

  showDeleteConfirmationModal = () => this.setState({ showConfirmDelete: true });

  hideDeleteConfirmationModal = () => this.setState({ showConfirmDelete: false });

  render() {
    const { fields, mutators, pickLists, translationKey } = this.props;
    const { formatMessage } = this.props.intl;

    const messages = defineMessages({
      customProperty: {
        id: `stripes-erm-components.customProperties.${translationKey}`,
        defaultMessage: <FormattedMessage id="stripes-erm-components.customProperty" />,
      },
      customPropertyLowercase: {
        id: `stripes-erm-components.customProperties.${translationKey}.lowercase`,
        defaultMessage: <FormattedMessage id="stripes-erm-components.customProperty.lowercase" />,
      },
    });

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
        {fields.value.map((customProperty, i) => {
          return (
            <>
              <Field
                component={CustomPropertyField}
                isEqual={isEqual}
                key={customProperty.id || 'new'}
                mutators={mutators}
                name={`${fields.name}[${i}]`}
                onDelete={() => {
                  this.setState({ deleteIndex: i });
                  this.setState({ deleteName: customProperty.name });
                  this.showDeleteConfirmationModal();
                }}
                onSave={() => this.handleSave(i)}
                pickLists={pickLists}
                translationKey={translationKey}
                // This `validate` appears stupid and like a no-op, but it's necessary because of the way
                // that RFF decides whether to run validation: https://github.com/final-form/final-form/pull/267
                // We want this Field to have validation info (meta.invalid) upon mount because some of the
                // child Fields are required and they will run validation.
                validate={() => {}}
              />
            </>
          );
        })}
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            id="delete-job-confirmation"
            confirmLabel={<FormattedMessage id="stripes-erm-components.customProperties.delete.confirmLabel" />}
            heading={<FormattedMessage id="stripes-erm-components.customProperties.delete.confirmHeading" values={{ custProp: formatMessage(messages.customPropertyLowercase) }} />}
            message={<SafeHTMLMessage id="stripes-erm-components.customProperties.delete.confirmMessage" values={{ custProp: formatMessage(messages.customProperty), name: this.state.deleteName }} />}
            onCancel={this.hideDeleteConfirmationModal}
            onConfirm={this.handleDelete(this.state.deleteIndex)}
            buttonStyle="danger"
            open
          />
        )}
      </div>
    );
  }
}

export default injectIntl(CustomPropertiesConfigListFieldArray);
