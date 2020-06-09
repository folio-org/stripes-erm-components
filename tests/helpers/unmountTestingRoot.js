import ReactDOM from 'react-dom';

export function unmountTestingRoot(id = 'root') {
  const $root = document.getElementById(id);

  // if a root exists, unmount anything inside and remove it
  if ($root) {
    ReactDOM.unmountComponentAtNode($root);
    $root.parentNode.removeChild($root);
  }
}
