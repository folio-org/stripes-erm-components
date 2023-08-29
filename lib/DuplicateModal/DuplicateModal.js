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
import { INVALID_JSON_ERROR, JSON_ERROR } from '../constants';

export default class DuplicateModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    onClone: PropTypes.func,
    cloneableProperties: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.node.isRequired,
      })
    ),
    translationIds: PropTypes.shape({
      cloneEndpointError: PropTypes.string.isRequired,
      duplicateModalLabel: PropTypes.string.isRequired,
      duplicateModalMessage: PropTypes.string.isRequired,
      duplicateModalError: PropTypes.string.isRequired,
      invalidResponseError: PropTypes.string.isRequired,
    }),
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
    const { translationIds } = this.props;
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
            <FormattedMessage id={translationIds.duplicateModalError} />
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
    const { cloneableProperties, translationIds } = this.props;

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
                    {
                        error.message === INVALID_JSON_ERROR ?
                          <div>
                            <FormattedMessage id={translationIds.invalidResponseError} />
                            <Layout className="padding-top-gutter">
                              <strong><FormattedMessage id="stripes-erm-components.duplicateModal.errors.tryAgain" /></strong>
                            </Layout>
                          </div> :
                          error.message === JSON_ERROR ?
                            <div>
                              <FormattedMessage id={translationIds.cloneEndpointError} />
                              <Layout className="padding-top-gutter">
                                <strong><FormattedMessage id="stripes-erm-components.duplicateModal.errors.tryAgain" /></strong>
                              </Layout>
                            </div> :
                            error.message // error message thats passed back when its none of the predefined errors
                    }
                    <Layout className="padding-top-gutter"><FormattedMessage id="stripes-erm-components.duplicateModal.errors.systemAdministrator" /></Layout>
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
        data-testid="duplicateModal"
        dismissible
        footer={footer}
        id="duplicate-modal"
        label={<FormattedMessage id={translationIds.duplicateModalLabel} />}
        onClose={this.props.onClose}
        open
        size="small"
      >
        <Layout className="padding-bottom-gutter">
          <FormattedMessage id={translationIds.duplicateModalMessage} />
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
