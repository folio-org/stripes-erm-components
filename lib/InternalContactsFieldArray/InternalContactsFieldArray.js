import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Layout,
  Select,
} from '@folio/stripes/components';

import EditCard from '../EditCard';
import withKiwtFieldArray from '../withKiwtFieldArray';
import { composeValidators, required } from '../validators';

import UserField from './UserField';

class InternalContactsFieldArray extends React.Component {
  static propTypes = {
    addContactBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onUpdateField: PropTypes.func.isRequired,
    contactRoles: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    addContactBtnLabel: <FormattedMessage id="stripes-erm-components.contacts.addContact" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.contacts.noContacts" />,
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
  handleUserSelected = /* istanbul ignore next */ (index, user) => {
    this.props.onUpdateField(index, { user: user.id });

    this.setState(prevState => ({
      users: {
        ...prevState.users,
        [user.id]: user,
      },
    }));
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-ic-empty-message>
      {this.props.isEmptyMessage}
    </Layout>
  );

  renderContacts = () => {
    const { items, name } = this.props;

    return items.map((contact, index) => (
      <EditCard
        key={index}
        data-test-internal-contact
        deleteBtnProps={{
          'data-test-ic-delete-button': true,
          'id': `${name}-delete-${index}`,
        }}
        deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.contacts.removeContact" values={{ index: index + 1 }} />}
        header={<FormattedMessage id="stripes-erm-components.contacts.contactIndex" values={{ index: index + 1 }} />}
        id={`edit-ic-card-${index}`}
        onDelete={() => this.props.onDeleteField(index, contact)}
      >
        <Field
          component={UserField}
          id={`${name}-user-${index}`}
          index={index}
          name={`${name}[${index}].user`}
          onUserSelected={selectedUser => this.handleUserSelected(index, selectedUser)}
          user={this.state.users[contact.user] || contact}
          validate={composeValidators(required, this.validateDuplicateEntries)}
        />
        <Field
          component={Select}
          data-test-ic-role
          dataOptions={this.props.contactRoles}
          id={`${name}-role-${index}`}
          label={<FormattedMessage id="stripes-erm-components.contacts.role" />}
          name={`${name}[${index}].role`}
          placeholder=" "
          required
          validate={required}
        />
      </EditCard>
    ));
  }

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div data-test-internal-contacts-field-array>
        <div>
          {items.length ? this.renderContacts() : this.renderEmpty()}
        </div>
        <Layout className="marginTop1">
          <Button
            data-test-icfa-add-button
            id={`add-${name}-btn`}
            onClick={() => onAddField()}
          >
            {this.props.addContactBtnLabel}
          </Button>
        </Layout>
      </div>
    );
  }
}

export default withKiwtFieldArray(InternalContactsFieldArray);
