export default function (identifiers = [], type) {
  // find first identifiers value of namespace 'type'
  const value = identifiers.find(i => i.identifier.ns.value === type)?.identifier?.value;

  return value;
}
