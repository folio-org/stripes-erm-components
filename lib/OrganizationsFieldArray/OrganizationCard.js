import React from 'react';
import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { get, isEmpty } from 'lodash';
import {
  Card,
  Icon,
  MultiColumnList,
  Layout,
} from '@folio/stripes/components';
import css from './OrganizationCard.css';

export default class OrganizationCard extends React.Component {
  static propTypes = {
    cardStyle: PropTypes.string,
    headerStart: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    headerEnd: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    id: PropTypes.string,
    interfaces: PropTypes.object,
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    org: PropTypes.object,
    renderDefault: PropTypes.func,
  };

  renderError = (error) => (
    <Layout className={`textCentered ${css.error}`}>
      <strong>
        {error}
      </strong>
    </Layout>
  );

  renderInterfaces = (interfaces) => {
    return interfaces.length ? (
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
          type: item => get(item, 'type'),
        }}
        interactive={false}
        visibleColumns={['name', 'username', 'password', 'type', 'notes']}
      />
    ) : <FormattedMessage id="stripes-erm-components.interface.notFound" />;
  };

  renderOrganizationName = (orgName) => {
    const { meta, id } = this.props;
    const error = meta && meta.touched && meta.error;

    return (
      <div>
        <span>
          <AppIcon
            app="organizations"
            size="small"
          />
          &nbsp;
          <strong id={id}>
            {`${orgName}`}
          </strong>
        </span>
        <Layout className={`textCentered ${css.error}`}>
          <strong>
            {error}
          </strong>
        </Layout>
      </div>
    );
  }

  render() {
    const {
      org,
      renderDefault,
      cardStyle,
      headerStart,
      headerEnd,
      interfaces,
    } = this.props;

    return (
      <div>
        <Card
          data-test-organization-card
          cardStyle={cardStyle}
          hasMargin
          headerStart={headerStart}
          headerEnd={headerEnd}
          roundedBorder
        >
          {
            (interfaces && this.renderInterfaces(interfaces)) ||
            (org && !isEmpty(org) && this.renderOrganizationName(org.name)) ||
            (renderDefault && renderDefault())
          }
        </Card>
      </div>
    );
  }
}
