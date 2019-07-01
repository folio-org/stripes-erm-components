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
      onMarkforDeletion: PropTypes.func.isRequired,
      onReplaceField: PropTypes.func.isRequired,
      organizationPickerComponent: PropTypes.elementType,
      roles: PropTypes.object,
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
      const { onMarkforDeletion, name, roles, organizationPickerComponent, onDeleteField, onReplaceField } = this.props;
      const orgs = items.map((organization, index) => {
        return (
          <EditOrganizationCard
            name={name}
            organization={organization}
            index={index}
            items={items}
            onMarkforDeletion={onMarkforDeletion}
            onDeleteField={onDeleteField}
            onReplaceField={onReplaceField}
            roles={roles}
            organizationPickerComponent={organizationPickerComponent}
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
            onClick={() => onAddField({})}
            id="add-org-btn"
          >
            {this.props.addOrganizationBtnLabel}
          </Button>
        </div>
      );
    }
}

export default withKiwtFieldArray(OrganizationsFieldArray);
