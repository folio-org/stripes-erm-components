const downloadBlob = (name, defaultSpaceDelimiter = '_', defaultDotDelimiter = '') => (
  blob => {
    const nameModified = name.replaceAll(/\s/g, defaultSpaceDelimiter).replaceAll(/\./g, defaultDotDelimiter);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nameModified;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
);

export default downloadBlob;
