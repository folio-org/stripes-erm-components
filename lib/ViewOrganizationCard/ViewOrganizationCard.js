import React from 'react';
import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { get, isEmpty } from 'lodash';
import {
  Button,
  Card,
  Icon,
  MultiColumnList,
} from '@folio/stripes/components';

export default class ViewOrganizationCard extends React.Component {
  static propTypes = {
    getCreds: PropTypes.func,
    headerEnd: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    headerStart: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    id: PropTypes.string,
    interfaces: PropTypes.arrayOf(PropTypes.object),
    org: PropTypes.object,
  };

  state = { hasHideButtonMap: {} };

  toggleCreds = id => {
    this.setState((prevState) => ({
      hasHideButtonMap: {
        ...prevState.hasHideButtonMap,
        [id]: !prevState.hasHideButtonMap[id],
      }
    }), () => {
      if (this.state.hasHideButtonMap[id]) {
        this.props.getCreds(id);
      }
    });
  }

  getCreds = (id, name) => {
    const { interfaces } = this.props;
    if (!this.state.hasHideButtonMap[id]) return '****';
    const interfaceRecord = interfaces.find(item => item.id === id);
    const { creds } = interfaceRecord;
    return creds ? creds[name] : '-';
  }

  renderInterfaces = (interfaces) => {
    const { hasHideButtonMap } = this.state;

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
            'name': 150,
            'notes': 150,
            'username': 80,
            'password': 80,
            'type': 150,
            ' ': 160
          }}
          contentData={interfaces}
          formatter={{
            'name': item => (
              <span>
                {item.name}
                <a
                  href={item.uri}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon icon="external-link" />
                </a>
              </span>
            ),
            'notes': item => get(item, 'notes'),
            'username': item => (
              <span data-test-username>
                {this.getCreds(item.id, 'username')}
              </span>
            ),
            'password': item => (
              <span data-test-password>
                {this.getCreds(item.id, 'password')}
              </span>
            ),
            'type': item => get(item, 'type', []).join(', '),
            ' ': item => (
              <Button
                data-test-show-creds
                buttonStyle="primary"
                onClick={() => this.toggleCreds(item.id)}
              >
                {hasHideButtonMap[item.id] ? <FormattedMessage id="stripes-erm-components.interface.hideCreds" />
                  : <FormattedMessage id="stripes-erm-components.interface.showCreds" />
                }
              </Button>
            )
          }}
          interactive={false}
          visibleColumns={['name', 'type', 'notes', 'username', 'password', ' ']}
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
        >
          <strong id={id} data-test-org-name>
            {orgName}
          </strong>
        </AppIcon>
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
