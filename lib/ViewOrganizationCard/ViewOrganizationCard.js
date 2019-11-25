import React from 'react';
import PropTypes from 'prop-types';
import { AppIcon, IfPermission } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { get, isEmpty } from 'lodash';
import {
  Button,
  Card,
  Icon,
  MultiColumnList,
  Tooltip,
} from '@folio/stripes/components';

export default class ViewOrganizationCard extends React.Component {
  static propTypes = {
    fetchCredentials: PropTypes.func,
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

  static defaultProps = {
    fetchCredentials: () => { },
  }

  state = { hasHideButtonMap: {} };

  toggleCredentials = id => {
    this.setState((prevState) => ({
      hasHideButtonMap: {
        ...prevState.hasHideButtonMap,
        [id]: !prevState.hasHideButtonMap[id],
      }
    }), () => {
      if (this.state.hasHideButtonMap[id]) {
        this.props.fetchCredentials(id);
      }
    });
  }

  renderInterfaceCredentials = (interfaceRecord, property) => {
    return this.state.hasHideButtonMap[interfaceRecord.id] ? get(interfaceRecord, ['credentials', property], '-') : '****';
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
            showHideButton: '',
          }}
          columnWidths={{
            name: 100,
            notes: 100,
            username: 80,
            password: 80,
            type: 100,
            showHideButton: 160
          }}
          contentData={interfaces}
          formatter={{
            name: item => (
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
            notes: item => get(item, 'notes'),
            username: item => (
              <span data-test-username style={{ wordBreak: 'break-all' }}>
                {this.renderInterfaceCredentials(item, 'username')}
              </span>
            ),
            password: item => (
              <span data-test-password style={{ wordBreak: 'break-all' }}>
                {this.renderInterfaceCredentials(item, 'password')}
              </span>
            ),
            type: item => get(item, 'type', []).join(', '),
            showHideButton: item => (
              <IfPermission perm="organizations-storage.interfaces.credentials.item.get">
                {({ hasPermission }) => (hasPermission ?
                  <Button
                    data-test-show-credentials
                    buttonStyle="primary"
                    marginBottom0
                    onClick={() => this.toggleCredentials(item.id)}
                  >
                    {hasHideButtonMap[item.id] ? <FormattedMessage id="stripes-erm-components.interface.hideCredentials" />
                      : <FormattedMessage id="stripes-erm-components.interface.showCredentials" />
                    }
                  </Button>
                  :
                  <Tooltip
                    text={<FormattedMessage id="stripes-erm-components.interface.noCredentialsPermission" />}
                  >
                    {({ ref, ariaIds }) => (
                      <div ref={ref} aria-labelledby={ariaIds.text}>
                        <Button
                          data-test-show-credentials
                          buttonStyle="primary"
                          disabled
                          marginBottom0
                        >
                          <FormattedMessage id="stripes-erm-components.interface.showCredentials" />
                        </Button>
                      </div>
                    )}
                  </Tooltip>)}
              </IfPermission>
            )
          }}
          interactive={false}
          rowUpdater={(rowData) => hasHideButtonMap[rowData.id]}
          visibleColumns={['name', 'type', 'notes', 'username', 'password', 'showHideButton']}
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
