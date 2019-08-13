import ReactDOM from 'react-dom';
import { getCleanTestingRoot } from './getCleanTestingRoot';

export function mount(component) {
  return new Promise(resolve => {
    ReactDOM.render(component, getCleanTestingRoot(), resolve);
  });
}
