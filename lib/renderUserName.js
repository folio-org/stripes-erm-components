import { get } from 'lodash';

export default (user) => {
  const {
    firstName = '',
    lastName = '-',
    middleName = '',
  } = get(user, 'personal', {});

  return `${lastName}${firstName ? ', ' : ' '}${firstName} ${middleName}`;
};
