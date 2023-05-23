import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';

import { highlightString, Typedown } from '@k-int/stripes-kint-components';

import { AppIcon } from '@folio/stripes/core';
import { useBatchedFetch, useChunkedUsers } from '../hooks';
import renderUserName from '../renderUserName';

const InternalContactSelection = ({
  displayClearItem = false,
  id,
  input,
  meta,
  path
}) => {
  // Batch fetch all contacts from path handed to us
  const {
    results: contacts,
  } = useBatchedFetch({
    // Ensure we get a uniquely ordered list
    batchParams: {
      sort: [{ path: 'id' }]
    },
    path
  });

  const contactsUserIds = useMemo(() => contacts?.filter(c => c.user)?.map(c => c.user) ?? [], [contacts]);

  // Fetch all users relevant to internal contacts
  const { users } = useChunkedUsers(contactsUserIds);

  const [contactState, setContactState] = useState([]);

  useEffect(() => {
    // This is the same logic that we used to have,
    if (users.length > contactState.length) {
      const newContacts = uniqBy(contacts, 'user')
        .map(contact => {
          const user = users.find(u => u.id === contact.user);

          if (!user) return { value: contact.user, label: contact.user, userData: {} };

          return {
            value: contact.user,
            label: renderUserName(user),
            userData: user, // Save this here so we could render more should we wish
            filterPath: `${renderUserName(user)}${user.personal?.email}`
          };
        });

      setContactState(newContacts);
    }
  }, [contactState.length, contacts, users]);

  return (
    <Typedown
      dataOptions={contactState}
      displayClearItem={displayClearItem}
      filterPath="filterPath" // Constructed field that lets us search on extra fields we looked up earlier
      id={id}
      input={{
        ...input,
        onChange: value => {
          input.onChange(value?.value);
        },
        value: contactState?.find(u => u.value === input?.value)
      }}
      meta={meta}
      path={path}
      renderListItem={(user, inp) => {
        return (
          <AppIcon
            app="users"
            size="small"
          >
            {highlightString(inp, user.label)}
            {highlightString(inp, user.userData?.personal?.email ?? '')}
          </AppIcon>
        );
      }}
      uniqueIdentificationPath="value"
    />
  );
};

InternalContactSelection.propTypes = {
  displayClearItem: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }),
  meta: PropTypes.object,
  path: PropTypes.string,
};

export default InternalContactSelection;
