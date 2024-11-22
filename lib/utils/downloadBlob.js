/*
 * The options block allows for a very customisable approach to naming files
 * and applying extensions. The default options are chosen in order to keep default
 * behaviour found in other apps, but this can now be changed use case by use case.
 */

const downloadBlob = (
  name,
  {
    fileExt = '',
    spaceDelimiter = '_',
    dotDelimiter = '',
    processWhitespace = true,
    processDots = false
  } = {}
) => {
  let downloadName = name;
  if (processWhitespace) {
    downloadName = downloadName.replaceAll(/\s/g, spaceDelimiter);
  }

  if (processDots) {
    downloadName = downloadName.replaceAll(/\./g, dotDelimiter);
  }

  if (fileExt.length) {
    downloadName = `${downloadName}.${fileExt}`;
  }

  return blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    a.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    URL.revokeObjectURL(url);
  };
};

export default downloadBlob;
