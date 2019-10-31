import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Layout
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import OrganizationPicker from './OrganizationPicker';
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
    organizationPickerComponent: PropTypes.elementType,
    roles: PropTypes.arrayOf(PropTypes.object),
    uniqueRole: PropTypes.string,
  };

  static defaultProps = {
    addOrganizationBtnLabel: <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
    organizationPickerComponent: OrganizationPicker,
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-org-empty-message>
      {this.props.isEmptyMessage}
    </Layout>
  );

  renderOrganizations = (items) => {
    const orgs = items.map((organization, index) => {
      return (
        <EditOrganizationCard
          index={index}
          key={index}
          name={this.props.name}
          onDeleteField={this.props.onDeleteField}
          onUpdateField={this.props.onUpdateField}
          organization={organization}
          organizationPickerComponent={this.props.organizationPickerComponent}
          roles={this.props.roles}
          uniqueRole={this.props.uniqueRole}
        />
      );
    });

    return (
      <div>
        {orgs}
      </div>
    );
  };

  render() {
    const { items, onAddField } = this.props;
    return (
      <div data-test-org-fa>
        <div>
          {items.length ? this.renderOrganizations(items) : this.renderEmpty()}
        </div>
        <Button
          data-test-org-fa-add-button
          onClick={() => onAddField()}
          id="add-org-btn"
        >
          {this.props.addOrganizationBtnLabel}
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(OrganizationsFieldArray);
