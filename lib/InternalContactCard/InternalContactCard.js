import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import { Card, Col, KeyValue, Row } from '@folio/stripes/components';

import renderUserName from '../renderUserName';

export default class ContactCard extends React.Component {
  static propTypes = {
    contact: PropTypes.shape({
      role: PropTypes.shape({
        label: PropTypes.string,
      }),
      user: PropTypes.oneOfType([
        PropTypes.shape({
          personal: PropTypes.shape({
            email: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            middleName: PropTypes.string,
            phone: PropTypes.string,
          }),
        }),
        PropTypes.string,
      ]),
    })
  }

  renderHeader = () => {
    const { contact } = this.props;

    const name = renderUserName(contact.user);
    const role = get(contact, 'role.label', '');
    const id = get(contact, 'user.id');

    return (
      <span data-test-contact-name>
        <AppIcon
          app="users"
          size="small"
        >
          <Link
            data-test-contact-link
            to={`/users/view/${id}`}
          >
            <strong>
              {name}
            </strong>
          </Link>
          &nbsp;·&nbsp;
          <span data-test-contact-role>
            {role}
          </span>
        </AppIcon>
      </span>
    );
  }

  render() {
    const {
      email = '-',
      phone = '-',
    } = get(this.props.contact, 'user.personal', {});

    return (
      <Card
        cardStyle="positive"
        data-test-contact-card
        hasMargin
        headerStart={this.renderHeader()}
        roundedBorder
      >
        <Row>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.phone" />}>
              <span data-test-contact-phone>
                {phone}
              </span>
            </KeyValue>
          </Col>
          <Col xs={8}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.email" />}>
              <span data-test-contact-email>
                {email}
              </span>
            </KeyValue>
          </Col>
        </Row>
      </Card>
    );
  }
}
