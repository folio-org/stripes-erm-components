import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Layout } from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import EditOrganizationCard from './EditOrganizationCard';

class OrganizationsFieldArray extends React.Component {
  static propTypes = {
    addOrganizationBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onUpdateField: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.object),
    uniqueRole: PropTypes.string,
  }

  static defaultProps = {
    addOrganizationBtnLabel: <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-org-empty-message>
      {this.props.isEmptyMessage}
    </Layout>
  )

  renderOrganizations = (items) => (
    items.map((organization, index) => {
      return (
        <Field
          key={index}
          component={EditOrganizationCard}
          id={`${this.props.name}-${index}`}
          index={index}
          name={`${this.props.name}[${index}]`}
          onDelete={() => this.props.onDeleteField(index, organization)}
          onUpdate={this.props.onUpdateField}
          organization={organization}
          orgsKey={this.props.name}
          roleValues={this.props.roles}
          uniqueRole={this.props.uniqueRole}
        />
      );
    })
  )

  render() {
    const { items, onAddField } = this.props;

    return (
      <div data-test-org-fa>
        <div>
          {items.length ? this.renderOrganizations(items) : this.renderEmpty()}
        </div>
        <Button
          data-test-org-fa-add-button
          id="add-org-btn"
          onClick={() => onAddField()}
        >
          {this.props.addOrganizationBtnLabel}
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(OrganizationsFieldArray);
