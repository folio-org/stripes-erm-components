import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Card,
  Col,
  KeyValue,
  Layout,
  Row,
} from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import css from './UserField.css';

export default class UserField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.node,
    }).isRequired,
    onUserSelected: PropTypes.func.isRequired,
    onUserUnselected: PropTypes.func.isRequired,
    user: PropTypes.shape({
      label: PropTypes.string,
    }),
  }

  static defaultProps = {
    user: {},
  }

  renderLinkUserButton = () => (
    <Pluggable
      aria-haspopup="true"
      dataKey="user"
      data-test-ic-link-user
      disableRecordCreation
      id={`${this.props.id}-search-button`}
      marginBottom0
      searchLabel={<FormattedMessage id="stripes-erm-components.contacts.addUser" />}
      searchButtonStyle="primary"
      selectUser={this.props.onUserSelected}
      type="find-user"
    >
      <FormattedMessage id="stripes-erm-components.contacts.noUserPlugin" />
    </Pluggable>
  )

  renderUnlinkUserButton = () => (
    <Button
      buttonStyle="danger"
      data-test-ic-unlink-user
      id={`${this.props.id}-unlink-button`}
      marginBottom0
      onClick={this.props.onUserUnselected}
    >
      <FormattedMessage id="stripes-erm-components.contacts.unlinkUser" />
    </Button>
  )


  renderUser = () => {
    const {
      email = '-',
      firstName = '-',
      lastName = '-',
      phone = '-',
    } = get(this.props.user, 'personal', {});

    return (
      <div data-test-user-card>
        <Row>
          <Col xs={6} md={3}>
            <KeyValue label="Last name">
              <span data-test-user-last-name>
                {lastName}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={3}>
            <KeyValue label="First name">
              <span data-test-user-first-name>
                {firstName}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={3}>
            <KeyValue label="Phone">
              <span data-test-user-phone>
                {phone}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={3}>
            <KeyValue label="Email address">
              <span data-test-user-email>
                {email}
              </span>
            </KeyValue>
          </Col>
        </Row>
      </div>
    );
  }

  renderEmpty = () => (
    <div>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="stripes-erm-components.contacts.noUserAdded" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="stripes-erm-components.contacts.addUserToStart" />
      </Layout>
    </div>
  )

  renderError = () => (
    <Layout className={`textCentered ${css.error}`}>
      <strong>
        {this.props.meta.error}
      </strong>
    </Layout>
  )

  render() {
    const {
      id,
      input: { value },
      meta: { error, touched }
    } = this.props;

    return (
      <Card
        cardStyle={value ? 'positive' : 'negative'}
        hasMargin
        headerStart={(
          <AppIcon app="users" size="small">
            <strong>
              <FormattedMessage id="stripes-erm-components.contacts.user" />
            </strong>
          </AppIcon>
        )}
        headerEnd={value ? this.renderUnlinkUserButton() : this.renderLinkUserButton()}
        id={id}
        roundedBorder
      >
        { value ? this.renderUser() : this.renderEmpty() }
        { touched && error ? this.renderError() : null }
      </Card>
    );
  }
}
