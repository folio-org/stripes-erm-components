import React from 'react';
import PropTypes from 'prop-types';

import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import { ConfirmationModal } from '@folio/stripes/components';

import CustomPropertyFieldEdit from './CustomPropertyFieldEdit';
import CustomPropertyFieldView from './CustomPropertyFieldView';

class CustomPropertyField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.shape({ id: PropTypes.string }),
        PropTypes.string,
      ]).isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }),
    mutators: PropTypes.shape({
      setCustomPropertyValue: PropTypes.func.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    translationKey: PropTypes.string
  }

  constructor(props) {
    super(props);

    const { value } = props.input;

    this.state = {
      editing: !(value && value.id),
      initialValue: value,
      showConfirmDelete: false,
    };
  }

  handleEdit = () => {
    this.setState({
      initialValue: this.props.input.value,
      editing: true,
    });
  }

  handleCancel = () => {
    const {
      input: { name, value },
      mutators,
      onDelete,
    } = this.props;

    if (value.id) {
      mutators.setCustomPropertyValue(name, this.state.initialValue);
    } else {
      onDelete();
    }

    this.setState({
      editing: false,
    });
  }

  handleSave = () => {
    this.props.onSave()
      .then(() => this.setState({ editing: false }));
  }

  showDeleteConfirmationModal = () => this.setState({ showConfirmDelete: true });

  hideDeleteConfirmationModal = () => this.setState({ showConfirmDelete: false });

  render() {
    const CustomPropertyComponent = this.state.editing ? CustomPropertyFieldEdit : CustomPropertyFieldView;
    const { translationKey } = this.props;
    const { formatMessage } = this.props.intl;
    const custPropName = this.props?.input?.value?.name;

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
      <>
        <CustomPropertyComponent
          {...this.props}
          onCancel={this.handleCancel}
          onDelete={this.showDeleteConfirmationModal}
          onEdit={this.handleEdit}
          onSave={this.handleSave}
        />
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            buttonStyle="danger"
            confirmLabel={<FormattedMessage id="stripes-erm-components.customProperties.delete.confirmLabel" />}
            data-test-confirmationModal
            heading={<FormattedMessage id="stripes-erm-components.customProperties.delete.confirmHeading" values={{ custProp: formatMessage(messages.customPropertyLowercase) }} />}
            id="delete-job-confirmation"
            message={<FormattedMessage id="stripes-erm-components.customProperties.delete.confirmMessage" values={{ custProp: formatMessage(messages.customProperty), name: custPropName }} />}
            onCancel={this.hideDeleteConfirmationModal}
            onConfirm={() => {
              this.props.onDelete();
              this.hideDeleteConfirmationModal();
            }}
            open
          />
        )}
      </>
    );
  }
}

export default injectIntl(CustomPropertyField);
