import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Layout,
  Select,
} from '@folio/stripes/components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import EditCard from '../EditCard';
import { composeValidators, requiredValidator as required } from '../utils';

import UserField from './UserField';

const InternalContactsFieldArray = ({
  addContactBtnLabel = <FormattedMessage id="stripes-erm-components.contacts.addContact" />,
  isEmptyMessage = <FormattedMessage id="stripes-erm-components.contacts.noContacts" />,
  fields: { name },
  contactRoles,
  users: propUsers
}) => {
  const { items, onAddField, onDeleteField, onUpdateField } = useKiwtFieldArray(name);
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (propUsers.length > Object.keys(users).length) {
      const outputUsers = {};
      propUsers.forEach(u => { outputUsers[u.id] = u; });
      setUsers(outputUsers);
    }
  }, [propUsers, users]);

  // istanbul ignore next
  // Execution of this block only occurs with the find-user plugin existing in UserPicker.
  const validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const contacts = allValues[name] || [];

    const contactsForThisUser = contacts.filter(c => c.user === value);
    if (contactsForThisUser.length < 2) return undefined;

    const rolesForThisUser = contactsForThisUser.map(c => c.role);
    if (uniq(rolesForThisUser).length !== rolesForThisUser.length) {
      return <FormattedMessage id="stripes-erm-components.contacts.noDuplicates" />;
    }

    return undefined;
  };

  // Execution of this block only occurs with the find-user plugin existing in UserPicker.
  const handleUserSelected = /* istanbul ignore next */ (index, user) => {
    onUpdateField(index, { user: user.id });
    setUsers({
      ...users,
      [user.id]: user,
    });
  };

  const renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-ic-empty-message>
      {isEmptyMessage}
    </Layout>
  );

  const renderContacts = () => {
    return items.map((contact, index) => (
      <EditCard
        key={index}
        data-test-internal-contact
        data-testid={`internalContactsFielArray[${index}]`}
        deleteBtnProps={{
          'data-test-ic-delete-button': true,
          'id': `${name}-delete-${index}`,
        }}
        deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.contacts.removeContact" values={{ index: index + 1 }} />}
        header={<FormattedMessage id="stripes-erm-components.contacts.contactIndex" values={{ index: index + 1 }} />}
        id={`edit-ic-card-${index}`}
        onDelete={() => onDeleteField(index, contact)}
      >
        <Field
          key={`internal-contact[${index}]-user`}
          component={UserField}
          id={`${name}-user-${index}`}
          index={index}
          name={`${name}[${index}].user`}
          onUserSelected={selectedUser => handleUserSelected(index, selectedUser)}
          user={users[contact.user] || contact}
          validate={composeValidators(required, validateDuplicateEntries)}
        />
        <Field
          key={`internal-contact[${index}]-role`}
          component={Select}
          data-test-ic-role
          dataOptions={contactRoles}
          id={`${name}-role-${index}`}
          label={<FormattedMessage id="stripes-erm-components.contacts.role" />}
          name={`${name}[${index}].role`}
          placeholder=" "
          required
          validate={required}
        />
      </EditCard>
    ));
  };

  return (
    <div data-test-internal-contacts-field-array data-testid="internalContactsFieldArray">
      <div>
        {items.length ? renderContacts() : renderEmpty()}
      </div>
      <Layout className="marginTop1">
        <Button
          data-test-icfa-add-button
          id={`add-${name}-btn`}
          onClick={() => onAddField()}
        >
          {addContactBtnLabel}
        </Button>
      </Layout>
    </div>
  );
};

InternalContactsFieldArray.propTypes = {
  addContactBtnLabel: PropTypes.node,
  isEmptyMessage: PropTypes.node,
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
  contactRoles: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object)
};

export default InternalContactsFieldArray;
