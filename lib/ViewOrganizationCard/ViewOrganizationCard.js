import { useState } from 'react';
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
  MessageBanner,
  MultiColumnList,
  NoValue,
  Tooltip,
} from '@folio/stripes/components';

import css from '../styles.css';
import { useSingleFetchInterfaceCredentials } from '../hooks';

const ViewOrganizationCard = ({
  duplicateMessage,
  duplicateWarning,
  headerEnd,
  headerStart,
  meta,
  setDuplicateWarning,
  id,
  interfaces,
  note,
  org,
  roles,
}) => {
  const [hasHideButtonMap, setHasHideButtonMap] = useState({});

  const { storedInterfaceCredentials, setInterfaceId } = useSingleFetchInterfaceCredentials();

  const toggleCredentials = toggleId => {
    setHasHideButtonMap({
      ...hasHideButtonMap,
      [toggleId]: !hasHideButtonMap[toggleId]
    });

    if (!storedInterfaceCredentials[toggleId]) {
      setInterfaceId(toggleId);
    }
  };

  const renderInterfaceCredentials = (interfaceRecord, property) => {
    if (hasHideButtonMap[interfaceRecord.id]) {
      return storedInterfaceCredentials[interfaceRecord?.id]?.[property] ?? <NoValue />;
    }

    return '****';
  };

  const renderInterfaces = () => {
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
            name: { min: 100, max: 150 },
            notes: { min: 200, max: 300 },
            username: { min: 80, max: 100 },
            password: { min: 80, max: 100 },
            type: { min: 100, max: 150 },
            showHideButton: 300,
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
                {renderInterfaceCredentials(item, 'username')}
              </span>
            ),
            password: item => (
              <span data-test-password style={{ wordBreak: 'break-all' }}>
                {renderInterfaceCredentials(item, 'password')}
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
                    onClick={() => toggleCredentials(item.id)}
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

  const renderRoles = () => (
    roles.map(r => {
      const { note: rnote, role: { label, value } } = r;
      return (
        <li key={value}><b>{label}</b>
          {rnote ? `: ${rnote}` : null}
        </li>
      );
    })
  );

  const renderOrganizationName = (name) => (
    <KeyValue label={<FormattedMessage id="stripes-erm-components.viewOrg.name" />}>
      <span
        data-test-org-name
        id={`${id}-name`}
      >
        {name}
      </span>
    </KeyValue>
  );

  const renderError = (error) => (
    <Layout className={`textCentered ${css.error}`}>
      <strong>
        {error}
      </strong>
    </Layout>
  );

  const renderEmpty = () => {
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
          { duplicateWarning &&
          <Layout className="padding-top-gutter">
            <MessageBanner
              dismissable
              onExited={() => setDuplicateWarning(false)}
              type="error"
            >
              {duplicateMessage}
            </MessageBanner>
          </Layout> }
        </div>
        {meta && meta.error && meta.touched ? renderError(meta.error) : null}
      </>
    );
  };


  const hasOrgData = interfaces || !isEmpty(org);

  const renderCard = () => {
    if (interfaces) {
      return renderInterfaces();
    }

    if (hasOrgData) {
      return renderOrganizationName(org.name);
    }

    return renderEmpty();
  };

  return (
    <div>
      <Card
        cardStyle={hasOrgData ? 'positive' : 'negative'}
        data-test-organization-card
        headerEnd={headerEnd}
        headerStart={headerStart}
        roundedBorder
      >
        { roles?.length && <KeyValue label={<FormattedMessage id="stripes-erm-components.organizations.roles" />}>{renderRoles()}</KeyValue> }
        { note &&
        <KeyValue label={<FormattedMessage id="stripes-erm-components.organizations.note" />}>
          <div
            data-test-org-note
            id={`${id}-note`}
          >
            {note}
          </div>
        </KeyValue>
      }
        {renderCard()}
      </Card>
    </div>
  );
};

ViewOrganizationCard.propTypes = {
  duplicateMessage: PropTypes.object,
  duplicateWarning: PropTypes.bool,
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
  roles: PropTypes.arrayOf(PropTypes.object),
  setDuplicateWarning: PropTypes.func,
};

export default ViewOrganizationCard;
