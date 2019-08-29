import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import InternalContactSelectionDisplay from './InternalContactSelectionDisplay';

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
        const query = get(props.resources, 'contacts.records', [])
          .filter(contact => contact.user)
          .map(contact => `id==${contact.user}`)
          .join(' or ');

        return query ? { query } : null;
      },
      records: 'users',
      recordsRequired: '%{totalContactsCount}',
    },
    loadUsers: { initialValue: 0 },
    totalContactsCount: { initialValue: RECORDS_PER_REQUEST },
  })

  static propTypes = {
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    id: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    mutator: PropTypes.shape({
      loadUsers: PropTypes.shape({
        replace: PropTypes.func,
      }),
      totalContactsCount: PropTypes.shape({
        replace: PropTypes.func,
      }),
    }),
    path: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    resources: PropTypes.shape({
      contacts: PropTypes.object,
      loadUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    }),
  }

  constructor(props) {
    super(props);

    const { input } = props;
    const selectedOption = input.value ? { value: input.value.id, label: input.value.name } : undefined;
    const contacts = selectedOption ? [selectedOption] : [];

    this.state = {
      contacts,
      selectedOption, // eslint-disable-line react/no-unused-state
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    // console.log('contacts', nextProps.resources.contacts);
    // console.log('users', nextProps.resources.users);

    const contacts = get(nextProps.resources, 'contacts.records', [])
      .map(contact => {
        const user = get(nextProps.resources, 'users.records', []).find(u => u.id === contact.user);

        if (!user) return { value: contact.user, label: contact.user };

        const {
          firstName = '',
          lastName = '-',
          middleName = '',
        } = get(user, 'personal', {});

        const name = `${lastName}${firstName ? ', ' : ' '}${firstName} ${middleName}`;

        return {
          value: contact.user,
          label: name
        };
      });

    // If an option is selected and it is /not/ in the list of users we just
    // fetched, unshift it onto the list so it's always available for
    // display, highlighting and selection.
    // const { selectedOption } = state;
    // if (selectedOption && selectedOption.value) {
    //   if (!contacts.find(o => o.value === selectedOption.value)) {
    //     contacts.unshift(selectedOption);
    //   }
    // }

    return { contacts };
  }

  componentDidUpdate() {
    const { mutator, resources } = this.props;
    const totalContactsCount = get(resources, 'contacts.other.totalRecords', RECORDS_PER_REQUEST);

    if (totalContactsCount > resources.totalContactsCount) {
      mutator.totalContactsCount.replace(totalContactsCount);
    }
  }

  handleChange = (value) => {
    const { contacts } = this.state;
    this.setState({ selectedOption: contacts.find(o => o.value === value) }); // eslint-disable-line react/no-unused-state
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
