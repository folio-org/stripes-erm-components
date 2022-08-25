export default (eresource = {}, type, returnAll) => {
  const identifiers = eresource?.identifiers || [];

  if (returnAll === true) {
    // find all identifiers value of namespace 'type', return an array
    const value = identifiers.filter(i => i.identifier?.ns.value === type).map(r => r?.identifier?.value);
    return value;
  } else { // returnAll is 'false' or undefined
    // find first identifiers value of namespace 'type', return a string
    const value = identifiers.find(i => i.identifier?.ns.value === type)?.identifier?.value;
    return value;
  }
};
