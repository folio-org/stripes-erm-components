// This is a copy of baseHTML from stripes-testing, since it is not currently exposed...
import { HTML as BaseHTML } from '@interactors/html';

export default BaseHTML
  .filters({
    element: element => element,
    role: element => element.getAttribute('role'),
  });
