import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Col,
  Label,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';
import withKiwtFieldArray from '../withKiwtFieldArray';
import EditCard from '../EditCard';

class RolesFieldArray extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.shape({
        note: PropTypes.string,
        org: PropTypes.shape({
          name: PropTypes.string,
          orgsUuid: PropTypes.string,
        }),
        roles: PropTypes.arrayOf(PropTypes.object),
      })
    }),
    items: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
      touched: PropTypes.bool,
    }),
    name: PropTypes.string,
    onAddField: PropTypes.func,
    onDeleteField: PropTypes.func,
    roleValues: PropTypes.arrayOf(PropTypes.object),
    uniqueRole: PropTypes.string,
    organization: PropTypes.shape({
      org: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    orgIndex: PropTypes.number,
  };

  validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const { input: { name } } = this.props;
    const orgsKey = name.substring(0, name.indexOf('['));
    const orgs = allValues[orgsKey] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org && (organization.role === value);
    });

    if (organizations.length < 2) return undefined;
    const namesForThisOrg = organizations.map(organization => {
      const { org } = organization;
      return org.name;
    });

    if (uniq(namesForThisOrg).length !== namesForThisOrg.length) {
      return <FormattedMessage id="stripes-erm-components.organizations.noDuplicates" />;
    }

    return undefined;
  }

  validateMultipleUniqueRoles = /* istanbul ignore next */ (value, allValues) => {
    const { input: { name }, uniqueRole } = this.props;

    if (!uniqueRole) return undefined;

    const orgsKey = name.substring(0, name.indexOf('['));
    const orgs = allValues[orgsKey] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org && (organization.role === uniqueRole);
    });

    if (organizations.length > 1) {
      return <FormattedMessage id="stripes-erm-components.organizations.multipleUniqueRoles" />;
    }

    return undefined;
  }

  renderRoles = (items) => {
    const { orgIndex } = this.props;
    return items.map((role, index) => {
      return (
        <EditCard
          key={index}
          data-test-org-role
          deleteBtnProps={{
            'id': `org-role-delete-${orgIndex}-${index}`,
            'data-test-delete-field-button': true
          }}
          deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.orgRoles.remove" values={{ index: index + 1 }} />}
          header={<FormattedMessage id="stripes-erm-components.orgRoles.orgRoleIndex" values={{ index: index + 1 }} />}
          id={`edit-or-card-${orgIndex}-${index}`}
          onDelete={() => this.props.onDeleteField(index, role)}
        >
          <Row key={index}>
            <Col md={4} xs={12}>
              <Label required tagName="span">
                <FormattedMessage id="stripes-erm-components.organizations.role" />
              </Label>
              <Field
                component={Select}
                dataOptions={this.props.roleValues}
                name={`${this.props.name}[${index}].role`}
                placeholder=" "
              />
            </Col>
            <Col md={8} xs={12}>
              <Field
                component={TextArea}
                data-test-org-note
                label={<FormattedMessage id="stripes-erm-components.organizations.note" />}
                name={`${this.props.name}[${index}].note`}
                parse={v => v}
              />
            </Col>
          </Row>
        </EditCard>
      );
    });
  }

  render() {
    const {
      items
    } = this.props;
    console.log(this.props.name, 'naaame');

    return (

      <div data-test-org-fa>
        <div>
          {items.length ? this.renderRoles(items) : null}
        </div>
        <Button
          data-test-org-fa-add-button
          id="add-org-btn"
          onClick={() => this.props.onAddField()}
        >
          Add Role
        </Button>
      </div>

    );
  }
}

export default withKiwtFieldArray(RolesFieldArray);
