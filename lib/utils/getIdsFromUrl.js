const getIdsFromUrl = (url) => {
  const regex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/ig;
  const matches = Array.from(url.matchAll(regex), match => match[0]);
  return matches;
};

export default getIdsFromUrl;
