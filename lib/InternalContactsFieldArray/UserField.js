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
  Tooltip,
  Row,
} from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import css from '../styles.css';
import renderUserName from '../renderUserName';

export default class UserField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.node,
    }).isRequired,
    onUserSelected: PropTypes.func.isRequired,
    user: PropTypes.shape({
      label: PropTypes.string,
      personal: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        middleName: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    user: {},
  }

  componentDidMount() {
    if (!get(this.props, 'input.value') && get(this.triggerButton, 'current')) {
      this.triggerButton.current.focus();
    }
  }

  renderLinkUserButton = value => (
    <Pluggable
      dataKey="user"
      disableRecordCreation
      selectUser={this.props.onUserSelected}
      renderTrigger={(props) => {
        this.triggerButton = props.buttonRef;

        const buttonProps = {
          'aria-haspopup': 'true',
          'buttonStyle': value ? 'default' : 'primary',
          'id': `${this.props.id}-search-button`,
          'name': this.props.input.name,
          'onClick': props.onClick,
          'buttonRef': this.triggerButton,
          'marginBottom0': true
        };

        if (value) {
          return (
            <Tooltip
              text={<FormattedMessage id="stripes-erm-components.contacts.replaceUserSpecific" values={{ user: renderUserName(this.props.user) }} />}
              id={`${this.props.id}-user-button-tooltip`}
              triggerRef={this.triggerButton}
            >
              {({ ariaIds }) => (
                <Button
                  aria-labelledby={ariaIds.text}
                  data-test-ic-link-user
                  {...buttonProps}
                >
                  <FormattedMessage id="stripes-erm-components.contacts.replaceUser" />
                </Button>
              )}
            </Tooltip>
          );
        }
        return (
          <Button
            data-test-ic-link-user
            {...buttonProps}
          >
            <FormattedMessage id="stripes-erm-components.contacts.linkUser" />
          </Button>
        );
      }}
      type="find-user"
    >
      <FormattedMessage id="stripes-erm-components.contacts.noUserPlugin" />
    </Pluggable>
  )

  renderUser = () => {
    const {
      email = '-',
      phone = '-',
    } = get(this.props.user, 'personal', {});


    return (
      <div data-test-user-card>
        <Row>
          <Col xs={12} md={5}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.name" />}>
              <span data-test-user-name>
                {renderUserName(this.props.user)}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={3}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.phone" />}>
              <span data-test-user-phone>
                {phone}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={4}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.email" />}>
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
    <div data-test-user-empty>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="stripes-erm-components.contacts.noUserLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="stripes-erm-components.contacts.linkUserToStart" />
      </Layout>
    </div>
  )

  renderError = () => (
    <Layout className={`textCentered ${css.error}`} data-test-user-error>
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
        headerEnd={this.renderLinkUserButton(value)}
        id={id}
        roundedBorder
      >
        {value ? this.renderUser() : this.renderEmpty()}
        {touched && error ? this.renderError() : null}
      </Card>
    );
  }
}
