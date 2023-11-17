const tagNamespaceArray = ['tags', 'stripes-erm-components', 'Tags'];

const tagsPath = 'tags';
const defaultTagsParams = [
  'limit=1000',
  'query=cql.allRecords%3D1%20sortby%20label'
];

const defaultTagQuery = `${tagsPath}?${defaultTagsParams?.join('&')}`;

export {
  tagsPath,
  defaultTagsParams,
  defaultTagQuery,
  tagNamespaceArray
};
