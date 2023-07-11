export default (url) => {
  let decodedUrl = decodeURIComponent(url);
  let lastDecodedUrl = url;

  while (decodedUrl !== lastDecodedUrl) {
    lastDecodedUrl = decodedUrl;
    decodedUrl = decodeURIComponent(decodedUrl);
  }

  return decodedUrl;
};
