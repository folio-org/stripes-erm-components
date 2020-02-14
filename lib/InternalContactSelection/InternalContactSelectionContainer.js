import React from 'react';
import PropTypes from 'prop-types';
import { get, uniqBy } from 'lodash';

import InternalContactSelectionDisplay from './InternalContactSelectionDisplay';
import renderUserName from '../renderUserName';

const RECORDS_PER_REQUEST = 100;

export default class InternalContactSelectionContainer extends React.Component {
  static manifest = Object.freeze({
    contacts: {
      type: 'okapi',
      path: '!{path}',
      params: {
        stats: 'true',
      },
      limitParam: 'perPage',
      perRequest: RECORDS_PER_REQUEST,
      records: 'results',
      recordsRequired: '%{totalContactsCount}',
    },
    users: {
      type: 'okapi',
      path: 'users',
      params: (_q, _p, _r, _l, props) => {
        const query = uniqBy(get(props.resources, 'contacts.records', []), 'user')
          .filter(contact => contact.user)
          .map(contact => `id==${contact.user}`)
          .join(' or ');

        return query ? { query } : null;
      },
      records: 'users',
      recordsRequired: '%{totalContactsCount}',
    },
    totalContactsCount: { initialValue: RECORDS_PER_REQUEST },
  })

  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    mutator: PropTypes.shape({
      totalContactsCount: PropTypes.shape({
        replace: PropTypes.func,
      }),
    }),
    path: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    resources: PropTypes.shape({
      contacts: PropTypes.object,
      totalContactsCount: PropTypes.number,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const users = get(nextProps.resources, 'users.records', []);

    if (users.length > state.contacts.length) {
      const contacts = uniqBy(get(nextProps.resources, 'contacts.records', []), 'user')
        .map(contact => {
          const user = get(nextProps.resources, 'users.records', []).find(u => u.id === contact.user);

          if (!user) return { value: contact.user, label: contact.user };

          return {
            value: contact.user,
            label: renderUserName(user)
          };
        });

      return { contacts };
    }

    return null;
  }

  componentDidUpdate() {
    const { mutator, resources } = this.props;
    const totalContactsCount = get(resources, 'contacts.other.totalRecords', RECORDS_PER_REQUEST);

    if (totalContactsCount > resources.totalContactsCount) {
      mutator.totalContactsCount.replace(totalContactsCount);
    }
  }

  handleChange = (value) => {
    this.props.input.onChange(value);
  }

  render() {
    return (
      <InternalContactSelectionDisplay
        error={get(this.props, 'meta.error')}
        id={this.props.id}
        loading={get(this.props.resources, 'contacts.isPending', false) || get(this.props.resources, 'users.isPending', false)}
        onChange={this.handleChange}
        contacts={this.state.contacts}
        value={this.props.input.value.id || this.props.input.value}
      />
    );
  }
}
