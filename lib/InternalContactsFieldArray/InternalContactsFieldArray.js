import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  IconButton,
  Label,
  Layout,
  Row,
  Select,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import { required } from '../validators';
import UserPicker from './UserPicker';

class InternalContactsFieldArray extends React.Component {
  static propTypes = {
    addContactBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    contactRoles: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
    userPickerComponent: PropTypes.elementType,
  };

  static defaultProps = {
    addContactBtnLabel: <FormattedMessage id="stripes-erm-components.contacts.addContact" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.contacts.noContacts" />,
    userPickerComponent: UserPicker,
  }

  state = {
    users: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.users.length > Object.keys(state.users).length) {
      const { users } = state;
      props.users.forEach(u => { users[u.id] = u; });
      return { users };
    }

    return null;
  }

  // Execution of this block only occurs with the find-user plugin existing in UserPicker.
  validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const contacts = allValues[this.props.name] || [];

    const contactsForThisUser = contacts.filter(c => c.user === value);
    if (contactsForThisUser.length < 2) return undefined;

    const rolesForThisUser = contactsForThisUser.map(c => c.role);
    if (uniq(rolesForThisUser).length !== rolesForThisUser.length) {
      return <FormattedMessage id="stripes-erm-components.contacts.noDuplicates" />;
    }

    return undefined;
  }

  // Execution of this block only occurs with the find-user plugin existing in UserPicker.
  addUser = /* istanbul ignore next */ (user) => {
    this.setState(prevState => ({
      users: {
        ...prevState.users,
        [user.id]: user,
      },
    }));
  }

  // Execution of this block only occurs with the find-user plugin existing in UserPicker.
  renderUserName = /* istanbul ignore next */ (userId) => {
    const user = this.state.users[userId];
    if (!user || !user.personal) return userId;

    const { firstName, lastName, middleName } = user.personal;
    let displayName = lastName;
    if (firstName) displayName = `${displayName}, ${firstName}`;
    if (middleName) displayName = `${displayName} ${middleName}`;
    return displayName;
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-ic-empty-message>
      { this.props.isEmptyMessage }
    </Layout>
  );

  renderContacts = () => {
    const { items, name, onDeleteField } = this.props;

    const contacts = items.map((contact, index) => (
      <Row
        data-test-internal-contact
        key={index}
      >
        <Col xs={6}>
          <Field
            addUser={this.addUser}
            component={this.props.userPickerComponent}
            data-test-ic-user
            format={this.renderUserName}
            id={`${name}-user-${index}`}
            name={`${name}[${index}].user`}
            normalize={value => value.id}
            // When this component gets new `state.users` metadata, it's used in
            // `renderUserName`. However, that function won't get called
            // automatically as part of the React component lifecycle when the
            // props/state change. As a result, we force a rerender if `state.users`
            // has changed which will in turn call `renderUserName`.
            users={Object.keys(this.state.users).length}
            validate={[required, this.validateDuplicateEntries]}
          />
        </Col>
        <Col xs={5}>
          <FormattedMessage id="stripes-erm-components.contacts.selectRole">
            {placeholder => (
              <Field
                name={`${name}[${index}].role`}
                component={Select}
                data-test-ic-role
                dataOptions={this.props.contactRoles}
                id={`${name}-role-${index}`}
                placeholder={placeholder}
                validate={required}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col xs={1}>
          <IconButton
            data-test-ic-delete-button
            icon="trash"
            id={`${name}-delete-${index}`}
            onClick={() => onDeleteField(index, contact)}
          />
        </Col>
      </Row>
    ));

    return (
      <React.Fragment>
        <Row>
          <Col xs={6}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.contacts.name" />
            </Label>
          </Col>
          <Col xs={5}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.contacts.role" />
            </Label>
          </Col>
        </Row>
        { contacts }
      </React.Fragment>
    );
  }

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div data-test-internal-contacts-field-array>
        <div>
          { items.length ? this.renderContacts() : this.renderEmpty() }
        </div>
        <Button
          data-test-icfa-add-button
          id={`add-license-${name}-btn`}
          onClick={() => onAddField({})}
        >
          { this.props.addContactBtnLabel }
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(InternalContactsFieldArray);
