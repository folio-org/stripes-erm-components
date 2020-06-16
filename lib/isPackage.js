export default function isPackage(resource) {
  return (
    resource.class === 'org.olf.kb.Pkg' ||
    resource.reference_object?.type === 'Package'
  );
}
