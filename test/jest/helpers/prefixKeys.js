export default function prefixKeys(obj, prefix = 'stripes-erm-components') {
  const res = {};

  for (const key of Object.keys(obj)) {
    res[`${prefix}.${key}`] = obj[key];
  }

  return res;
}
