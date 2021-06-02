import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Col,
  IconButton,
  Label,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';
import { required } from '../validators';
import withKiwtFieldArray from '../withKiwtFieldArray';

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
  };

  static defaultProps = {
    items: [],
  }

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

  renderRoles = () => {
    const { items, name, onDeleteField } = this.props;
    return items.length ?
      items.map((item, index) => {
        return (
          <Row key={index}>
            <Col md={4} xs={12}>
              <Label required tagName="span">
                <FormattedMessage id="stripes-erm-components.organizations.role" />
              </Label>
              <Field
                component={Select}
                dataOptions={this.props.roleValues}
                index={index}
                name={`${name}[${index}].role.value`}
                placeholder=" "
                validate={required}
              />
            </Col>
            <Col md={7} xs={12}>
              <Field
                component={TextArea}
                data-test-org-note
                label={<FormattedMessage id="stripes-erm-components.organizations.note" />}
                name={`${name}[${index}].note`}
                parse={v => v}
              />
            </Col>
            {index !== 0 ?
              <Col xs={1}>
                <IconButton
                  data-test-delete-role-field-button
                  icon="trash"
                  onClick={() => onDeleteField(index, item)}
                />
              </Col>
              : undefined}
          </Row>
        );
      })
      :
      (
        <Row key="0">
          <Col md={4} xs={12}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.role" />
            </Label>
            <Field
              component={Select}
              dataOptions={this.props.roleValues}
              index="0"
              name={`${name}[0].role.value`}
              placeholder=" "
              validate={required}
            />
          </Col>
          <Col md={7} xs={12}>
            <Field
              component={TextArea}
              data-test-org-note
              label={<FormattedMessage id="stripes-erm-components.organizations.note" />}
              name={`${name}[0].note`}
              parse={v => v}
            />
          </Col>
        </Row>
      );
  }

  render() {
    return (

      <div data-test-org-role>
        <div>
          {this.renderRoles()}
        </div>
        <Button
          data-test-org-fa-add-button
          id="add-org-role-btn"
          onClick={() => this.props.onAddField()}
        >
          <FormattedMessage id="stripes-erm-components.organizations.addRole" />
        </Button>
      </div>

    );
  }
}

export default withKiwtFieldArray(RolesFieldArray);
