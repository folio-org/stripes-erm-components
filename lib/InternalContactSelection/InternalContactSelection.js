import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';

import { useBatchedFetch, useChunkedUsers } from '../hooks';
import renderUserName from '../renderUserName';
import InternalContactSelectionDisplay from './InternalContactSelectionDisplay';

const InternalContactSelection = ({
  id,
  input,
  meta,
  path
}) => {
  // Batch fetch all contacts from path handed to us
  const {
    results: contacts,
    isLoading: areContactsLoading
  } = useBatchedFetch({
    // Ensure we get a uniquely ordered list
    batchParams: {
      sort: [{ path: 'id' }]
    },
    path
  });

  const contactsUserIds = useMemo(() => uniqBy(contacts, 'user')?.filter(c => c.user)?.map(c => c.user) ?? [], [contacts]);

  // Fetch all users relevant to internal contacts
  const { users, isLoading: areUsersLoading } = useChunkedUsers(contactsUserIds);

  const [contactState, setContactState] = useState([]);

  useEffect(() => {
    // This is the same logic that we used to have,
    if (users.length > contactState.length) {
      const newContacts = uniqBy(contacts, 'user')
        .map(contact => {
          const user = users.find(u => u.id === contact.user);

          if (!user) return { value: contact.user, label: contact.user };

          return {
            value: contact.user,
            label: renderUserName(user)
          };
        });

      setContactState(newContacts);
    }
  }, [contactState.length, contacts, users]);

  return (
    <div data-testid="internalContactSelectionDisplay">
      <InternalContactSelectionDisplay
        contacts={contactState}
        error={meta?.error}
        id={id}
        loading={areUsersLoading || areContactsLoading}
        onChange={(value) => { input.onChange(value); }}
        value={input.value?.id || input.value}
      />
    </div>
  );
};

InternalContactSelection.propTypes = {
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }),
  meta: PropTypes.object,
  path: PropTypes.string.isRequired,
};

export default InternalContactSelection;
