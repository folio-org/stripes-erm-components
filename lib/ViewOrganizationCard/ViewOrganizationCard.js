import React from 'react';
import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { get, isEmpty } from 'lodash';
import {
  Card,
  Icon,
  MultiColumnList,
} from '@folio/stripes/components';

export default class ViewOrganizationCard extends React.Component {
  static propTypes = {
    headerEnd: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    headerStart: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    id: PropTypes.string,
    interfaces: PropTypes.object,
    org: PropTypes.object,
  };

  renderInterfaces = (interfaces) => {
    return interfaces.length ? (
      <div data-test-mcl>
        <MultiColumnList
          columnMapping={{
            name: <FormattedMessage id="stripes-erm-components.interface.name" />,
            username: <FormattedMessage id="stripes-erm-components.interface.username" />,
            password: <FormattedMessage id="stripes-erm-components.interface.password" />,
            type: <FormattedMessage id="stripes-erm-components.interface.type" />,
            notes: <FormattedMessage id="stripes-erm-components.interface.notes" />,
          }}
          columnWidths={{
            name: 150,
            notes: 250,
            username: 130,
            password: 130,
            type: 150,
          }}
          contentData={interfaces}
          formatter={{
            name: item => (
              <span>
                {item.name}
                <a href={item.uri}>
                  <Icon icon="external-link" iconPosition="end" />
                </a>
              </span>
            ),
            notes: item => get(item, 'notes'),
            username: item => get(item, 'username'),
            password: item => get(item, 'password'),
            type: item => get(item, 'type', []).join(', '),
          }}
          interactive={false}
          visibleColumns={['name', 'username', 'password', 'type', 'notes']}
        />
      </div>
    ) : <FormattedMessage id="stripes-erm-components.interface.notFound" />;
  };

  renderOrganizationName = (orgName) => {
    const { id } = this.props;
    return (
      <span>
        <AppIcon
          app="organizations"
          size="small"
        />
        &nbsp;
        <strong id={id} data-test-org-name>
          {`${orgName}`}
        </strong>
      </span>
    );
  }


  render() {
    const {
      headerStart,
      headerEnd,
      interfaces,
      org,
    } = this.props;

    return (
      <div>
        <Card
          cardStyle="positive"
          data-test-organization-card
          hasMargin
          headerStart={headerStart}
          headerEnd={headerEnd}
          roundedBorder
        >
          {
            (interfaces && this.renderInterfaces(interfaces)) ||
            (org && !isEmpty(org) && this.renderOrganizationName(org.name))
          }
        </Card>
      </div>
    );
  }
}
