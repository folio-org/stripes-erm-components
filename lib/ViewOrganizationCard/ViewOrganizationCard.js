import React from 'react';
import PropTypes from 'prop-types';
import { IfPermission } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { get, isEmpty } from 'lodash';
import {
  Button,
  Card,
  Icon,
  KeyValue,
  Layout,
  MultiColumnList,
  NoValue,
  Tooltip,
} from '@folio/stripes/components';

import css from '../styles.css';

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
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }),
    note: PropTypes.string,
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
    return this.state.hasHideButtonMap[interfaceRecord.id] ? interfaceRecord?.credentials?.[property] ?? <NoValue /> : '****';
  }

  renderInterfaces = (interfaces) => {
    const { hasHideButtonMap } = this.state;

    return interfaces.length ? (
      <div data-test-interfaces>
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
              <a
                href={item.uri}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon icon="external-link" iconPosition="end">{item.name}</Icon>
              </a>
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
                    buttonStyle="primary"
                    data-test-show-credentials
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
                          buttonStyle="primary"
                          data-test-show-credentials
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

  renderOrganizationName = (name) => (
    <KeyValue label={<FormattedMessage id="stripes-erm-components.viewOrg.name" />}>
      <span
        data-test-org-name
        id={`${this.props.id}-name`}
      >
        {name}
      </span>
    </KeyValue>
  )

  renderError = (error) => (
    <Layout className={`textCentered ${css.error}`}>
      <strong>
        {error}
      </strong>
    </Layout>
  );

  renderEmpty = () => {
    const { meta } = this.props;

    return (
      <>
        <div>
          <Layout className="textCentered">
            <strong>
              <FormattedMessage id="stripes-erm-components.organizations.noOrganization" />
            </strong>
          </Layout>
          <Layout className="textCentered">
            <FormattedMessage id="stripes-erm-components.organizations.linkOrganizationToStart" />
          </Layout>
        </div>
        {meta && meta.error && meta.touched ? this.renderError(meta.error) : null}
      </>
    );
  }

  render() {
    const {
      headerEnd,
      headerStart,
      interfaces,
      note,
      org,
    } = this.props;

    const hasOrgData = interfaces || !isEmpty(org);

    return (
      <div>
        <Card
          cardStyle={hasOrgData ? 'positive' : 'negative'}
          data-test-organization-card
          headerEnd={headerEnd}
          headerStart={headerStart}
          roundedBorder
        >
          { note &&
          <KeyValue label={<FormattedMessage id="stripes-erm-components.organizations.note" />}>
            <div
              data-test-org-note
              id={`${this.props.id}-note`}
            >
              {note}
            </div>
          </KeyValue>
        }
          {
            interfaces ?
              this.renderInterfaces(interfaces) :
              (hasOrgData ? this.renderOrganizationName(org.name) : this.renderEmpty())
          }
        </Card>
      </div>
    );
  }
}
