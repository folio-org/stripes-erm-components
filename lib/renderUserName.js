export default (user) => {
  const {
    firstName = '',
    lastName = '-',
    middleName = '',
  } = user?.personal ?? {};

  return `${lastName}${firstName ? ', ' : ' '}${firstName} ${middleName}`;
};
