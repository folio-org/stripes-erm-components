import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Card,
  Col,
  KeyValue,
  Layout,
  NoValue,
  Tooltip,
  Row,
} from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import { Link } from 'react-router-dom';
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
      touched: PropTypes.bool,
    }).isRequired,
    onUserSelected: PropTypes.func.isRequired,
    user: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
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
    if (!(this.props.input?.value) && (this.triggerButton?.current)) {
      this.triggerButton.current.focus();
    }
  }

  renderLinkUserButton = value => (
    <Pluggable
      dataKey="user"
      disableRecordCreation
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
              id={`${this.props.id}-user-button-tooltip`}
              text={<FormattedMessage id="stripes-erm-components.contacts.replaceUserSpecific" values={{ user: renderUserName(this.props.user) }} />}
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
      selectUser={this.props.onUserSelected}
      type="find-user"
    >
      <FormattedMessage id="stripes-erm-components.contacts.noUserPlugin" />
    </Pluggable>
  )

  renderUser = () => {
    const {
      email,
      phone
    } = this.props.user?.personal ?? {};
    const id = (user?.id);

    const { user } = this.props;
    const name = renderUserName(this.props.user);
    const id = (user?.id);

    return (
      <div data-test-user-card>
        <Row>
          <Col md={3} xs={12}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.name" />}>
              <span data-test-user-name>
                <Link
                  to={`/users/view/${id}`}
                >
                  {name}
                </Link>
              </span>
            </KeyValue>
          </Col>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.phone" />}>
              <span data-test-user-phone>
                {phone ?? <NoValue />}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.email" />}>
              <span data-test-user-email>
                {email ?? <NoValue />}
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
        headerEnd={this.renderLinkUserButton(value)}
        headerStart={(
          <AppIcon app="users" size="small">
            <strong>
              <FormattedMessage id="stripes-erm-components.contacts.user" />
            </strong>
          </AppIcon>
        )}
        id={id}
        roundedBorder
      >
        {value ? this.renderUser() : this.renderEmpty()}
        {touched && error ? this.renderError() : null}
      </Card>
    );
  }
}
