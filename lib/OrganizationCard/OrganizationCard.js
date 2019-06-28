import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  Button,
  Col,
  Card,
  IconButton,
  Label,
  Layout,
  Select,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import InnerCard from './InnerCard';

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

    renderOrganizations = () => {
      const { items, name, onDeleteField } = this.props;
      const orgs = items.map((organization, index) => {
        return (
          <Card
            data-test-organizations-org
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
              <InnerCard name={name} index={index} organization={organization} {...this.props} />
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
        <div data-test-orgcard>
          <div>
            {items.length ? this.renderOrganizations() : this.renderEmpty()}
          </div>
          <Button
            data-test-orgcard-add-button
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
