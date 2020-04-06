import React from 'react';
import PropTypes from 'prop-types';
import { keyBy, mapValues, pickBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Checkbox,
  Icon,
  Layout,
  Modal,
  ModalFooter,
} from '@folio/stripes/components';

import css from './DuplicateModal.css';
import errorTypes from '../errorTypes';

export default class DuplicateModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    onClone: PropTypes.func,
    translationKey: PropTypes.string,
    cloneableProperties: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.node,
      })
    ),
  };

  state = {
    selected: mapValues(keyBy(this.props.cloneableProperties, 'key'), () => false)
  };

  updateSelection = (e) => {
    const { checked, name } = e.target;

    this.setState(prevState => ({
      selected: { ...prevState.selected, [name]: checked }
    }));
  };

  toggleSelectAll = (e) => {
    const { checked } = e.target;
    const { cloneableProperties } = this.props;

    this.setState(() => ({
      selected: mapValues(keyBy(cloneableProperties, 'key'), () => checked),
    }));
  }

  closeErrorModal = () => {
    this.setState({ errorMessage: '' });
  }

  renderErrorModal = () => {
    const { translationKey } = this.props;
    const footer = (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="duplicate-error-modal-close-button"
          onClick={this.closeErrorModal}
        >
          <FormattedMessage id="stripes-erm-components.close" />
        </Button>
      </ModalFooter>
    );

    return (
      <Modal
        footer={footer}
        label={
          <Layout className="flex">
            <Icon icon="exclamation-circle" size="medium" status="error" />
            &nbsp;
            <FormattedMessage id="stripes-erm-components.duplicateModal.error" values={{ type: translationKey }} />
          </Layout>
        }
        open
        size="small"
      >
        {this.state.errorMessage}
      </Modal>
    );
  }

  renderDuplicateModal = () => {
    const { selected } = this.state;
    const { cloneableProperties, translationKey } = this.props;

    const footer = (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          disabled={Object.values(selected).every(item => item === false)}
          id="duplicate-modal-save-button"
          onClick={() => {
            this.props.onClone(pickBy(selected))
              .catch(error => {
                const errorMessage = (
                  <Layout className="display-flex flex-direction-column">
                    {error.message === errorTypes.INVALID_JSON_ERROR ?
                      <FormattedMessage id="stripes-erm-components.duplicateModal.errors.invalidResponseError" values={{ type: translationKey }} /> :
                      <FormattedMessage id="stripes-erm-components.duplicateModal.errors.cloneEndpointError" values={{ type: translationKey }} />
                    }
                    <Layout className="padding-top-gutter padding-bottom-gutter">
                      <strong><FormattedMessage id="stripes-erm-components.duplicateModal.errors.tryAgain" /></strong>
                    </Layout>
                    <FormattedMessage id="stripes-erm-components.duplicateModal.errors.systemAdministrator" />
                  </Layout>
                );

                this.setState({ errorMessage });
              });
          }}
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
        <Button
          buttonStyle="default"
          id="duplicate-modal-cancel-button"
          onClick={this.props.onClose}
        >
          <FormattedMessage id="stripes-components.cancel" />
        </Button>
      </ModalFooter>
    );

    return (
      <Modal
        dismissible
        footer={footer}
        id="duplicate-modal"
        label={<FormattedMessage id="stripes-erm-components.duplicateModal.duplicate" values={{ type: translationKey }} />}
        onClose={this.props.onClose}
        open
        size="small"
      >
        <Layout className="padding-bottom-gutter">
          <FormattedMessage id="stripes-erm-components.duplicateModal.message" values={{ type: translationKey }} />
        </Layout>
        <Layout className="padding-bottom-gutter">
          <Checkbox
            checked={Object.values(selected).includes(false) !== true}
            label={<strong><FormattedMessage id="stripes-erm-components.selectAll" /></strong>}
            onChange={this.toggleSelectAll}
            value="selectAll"
          />
        </Layout>
        <div className={css.separator} />
        <Layout className="padding-top-gutter">
          {cloneableProperties.map(({ key: prop, value }, index) => (
            <Checkbox
              key={index}
              checked={this.state.selected[prop]}
              label={value}
              name={prop}
              onChange={this.updateSelection}
              value={prop}
            />
          ))}
        </Layout>
      </Modal>
    );
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div>
        {errorMessage ? this.renderErrorModal() : this.renderDuplicateModal()}
      </div>
    );
  }
}
