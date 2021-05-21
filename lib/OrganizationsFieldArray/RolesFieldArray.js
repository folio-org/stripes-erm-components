import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Col,
  Label,
  Row,
  Select,
  TextArea,
  Tooltip,
} from '@folio/stripes/components';
import withKiwtFieldArray from '../withKiwtFieldArray';

class RolesFieldArray extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.shape({
        note: PropTypes.string,
        org: PropTypes.shape({
          name: PropTypes.string,
          orgsUuid: PropTypes.string,
        }),
        role: PropTypes.string,
      })
    }),
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
      touched: PropTypes.bool,
    }),
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
    uniqueRole: PropTypes.string,
    organization: PropTypes.shape({
      org: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
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
    return items.map((role, index) => {
      return (
        <Row key={index}>
          <Col md={4} xs={12}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.role" />
            </Label>
            <Field
              component={Select}
              data-test-org-role
              dataOptions={this.props.roles}
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
