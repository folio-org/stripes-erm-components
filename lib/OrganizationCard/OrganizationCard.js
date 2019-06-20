import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import { Pluggable, AppIcon } from '@folio/stripes/core';

import {
  Button,
  Col,
  Card,
  IconButton,
  Label,
  Layout,
  Select,
  MultiColumnList,
  Icon,
} from '@folio/stripes/components';
import withKiwtFieldArray from '../withKiwtFieldArray';
import { required } from '../validators';

class OrganizationCard extends React.Component {
    static propTypes = {
      addOrganizationBtnLabel: PropTypes.node,
      change: PropTypes.func,
      isEmptyMessage: PropTypes.node,
      items: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string.isRequired,
      onAddField: PropTypes.func.isRequired,
      onDeleteField: PropTypes.func.isRequired,
      roles: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
      addOrganizationBtnLabel: <FormattedMessage id="stripes-erm-components.organizations.addOrganizationToAgreement" />,
      isEmptyMessage: <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
    }

    renderEmpty = () => (
      <Layout className="padding-bottom-gutter" data-test-org-empty-message>
        {this.props.isEmptyMessage}
      </Layout>
    );

    onAddOrg = (organization, fieldArrayName, index) => {
      const { name, id } = organization;
      const org = { name, orgsUuid: id };
      this.props.change(`${fieldArrayName}[${index}].org`, org);
    }

    renderOrganizationPicker = (name, index) => (
      <Pluggable
        aria-haspopup="true"
        dataKey="organization"
        disableRecordCreation
        marginTop0
        searchLabel={<FormattedMessage id="stripes-erm-components.organizations.addOrganization" />}
        searchButtonStyle="primary"
        selectVendor={org => {
          this.onAddOrg(org, name, index);
        }}
        type="find-organization"
      />
    );

    unlinkOrg = (name, index) => {
      this.props.change(`${name}[${index}]`, {});
    }

    renderOrgPreview = (o) => {
      const interfaces = get(o, ['org', 'interfaces'], []);
      return (
        o.org ?
          <Card
            data-test-organizations-org
            key={`${o.org.id}-${o.role && o.role.value}`}
            header={
              <span>
                {
                    o.org.orgsUuid ?
                      <span>
                        <Link to={`/organizations/view/${o.org.orgsUuid}`}>
                          {o.org.name}
                        </Link>
                      </span>
                      : o.org.name
                }
                {o.role && ` · ${o.role.label}`}
              </span>
            }
          >
            {interfaces && interfaces.length ?
              <MultiColumnList
                contentData={interfaces}
                visibleColumns={['name', 'username', 'password', 'type', 'notes']}
                columnMapping={{
                  name: <FormattedMessage id="ui-agreements.interface.name" />,
                  username: <FormattedMessage id="ui-agreements.interface.username" />,
                  password: <FormattedMessage id="ui-agreements.interface.password" />,
                  type: <FormattedMessage id="ui-agreements.interface.type" />,
                  notes: <FormattedMessage id="ui-agreements.interface.notes" />,
                }}
                formatter={{
                  name: item => (
                    <span>
                      {item.name}
                      <a href={item.uri}>
                        <Icon icon="external-link" iconPosition="end" />
                      </a>
                    </span>
                  ),
                  notes: item => get(item, ['notes']),
                  username: item => get(item, ['username']),
                  password: item => get(item, ['password']),
                  type: item => get(item, ['type']),
                }}
                columnWidths={{
                  name: 150,
                  notes: 250,
                  username: 130,
                  password: 130,
                  type: 150,
                }}
              /> : <FormattedMessage id="ui-agreements.interface.notFound" />}
          </Card> : null
      );
    }

    renderInnerCardField = (name, index) => {
      return (
        <Field
          component={Card}
          data-test-org-name
          id={`${name}-nameOrg-${index}`}
          name={`${name}[${index}].org`}
          cardStyle="negative"
          hasMargin
          headerStart={
            <span>
              <AppIcon
                app="organizations"
                appIconKey="organizations"
                size="small"
              />
              {' '}
              <strong>Organization</strong>
            </span>
          }
          headerEnd={this.renderOrganizationPicker(name, index)}
          roundedBorder
        >
          <React.Fragment>
            <Layout className="textCentered">
              <strong>
                <FormattedMessage id="stripes-erm-components.organizations.noOrganization" />
              </strong>
            </Layout>
            <Layout className="textCentered">
              <FormattedMessage id="stripes-erm-components.organizations.addOrganizationToStart" />
            </Layout>
          </React.Fragment>
        </Field>
      );
    }

    renderRole = (name, index) => {
      return (
        <Col xs={5}>
          <Label required tagName="span">
            <FormattedMessage id="stripes-erm-components.organizations.role" />
          </Label>
          <FormattedMessage id="stripes-erm-components.organizations.selectRole">
            {placeholder => (
              <Field
                component={Select}
                data-test-org-role
                id={`${name}-role-${index}`}
                name={`${name}[${index}].role`}
                placeholder={placeholder}
                dataOptions={this.props.roles}
                validate={required}
              />
            )}
          </FormattedMessage>
        </Col>);
    }

    renderInnerCardInterfaces = (org, name, index) => {
      return (
        <Card
          cardStyle="positive"
          hasMargin
          headerStart={
            <span>
              <AppIcon
                app="organizations"
                appIconKey="organizations"
                size="small"
              />
              {' '}
              <strong>{`${org.name}`}</strong>
            </span>
          }
          key={index}
          headerEnd={
            <Button
              buttonStyle="danger"
              id={`${name}-delete-${index}`}
              onClick={() => this.unlinkOrg(name, index)}
            >
              <FormattedMessage id="stripes-erm-components.organizations.unlinkOrganization" />
            </Button>
          }
          roundedBorder
        >
          {this.renderOrgPreview(org)}
        </Card>
      );
    }

    renderOrganizations = () => {
      const { items, name, onDeleteField } = this.props;
      const orgs = items.map((organization, index) => {
        const { org } = organization;
        return (
          <Card
            cardStyle="positive"
            hasMargin
            key={index}
            headerStart={<strong>{`Organization ${index + 1}`}</strong>}
            headerEnd={<IconButton
              data-test-org-delete-button
              id={`${name}-delete-${index}`}
              onClick={() => onDeleteField(index, organization)}
              icon="trash"
            />}
          >
            <React.Fragment>
              {
                org && !isEmpty(org) ?
                  this.renderInnerCardInterfaces(org, name, index) :
                  this.renderInnerCardField(name, index)
              }
              {this.renderRole(name, index)}
            </React.Fragment>
          </Card>
        );
      });

      return (
        <React.Fragment>
          {orgs}
        </React.Fragment>
      );
    };

    render() {
      const { items, onAddField } = this.props;
      return (
        <div data-test-organizations-field-array>
          <div>
            {items.length ? this.renderOrganizations() : this.renderEmpty()}
          </div>
          <Button
            data-test-orgfa-add-button
            onClick={() => onAddField({})}
            id="add-org-btn"
          >
            {this.props.addOrganizationBtnLabel}
          </Button>
        </div>
      );
    }
}

export default withKiwtFieldArray(OrganizationCard);
