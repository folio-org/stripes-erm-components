import {
  clickable,
  interactor,
  count,
  fillable,
  text,
  scoped,
  collection,
  attribute,
} from '@interactors/html';

import SelectionInteractor from '@folio/stripes-components/lib/Selection/tests/interactor';
import css from '@folio/stripes-components/lib/Selection/Selection.css';
import { selectorFromClassnameString } from '../../../tests/helpers';

const optionSegment = selectorFromClassnameString(`.${css.optionSegment}`);
const selectionList = selectorFromClassnameString(`.${css.selectionListRoot}`);
const error = selectorFromClassnameString(`.${css.option}`);

@interactor class optionSegmentInteractor {
  text = text();
  click = clickable();
}

@interactor class errorInteractor {
  text = text();
}

@interactor class selectionListInteractor {
  optionCount = count('li');
}

export default interactor(class OrganizationSelectionInteractor {
  selectInteractor = new SelectionInteractor();
  clickDropdown = clickable('#testId');
  fillFilter = fillable('input[type="text"]');
  options = scoped(optionSegment, optionSegmentInteractor);
  optionsList = collection(optionSegment, optionSegmentInteractor);
  selectionList = scoped(selectionList, selectionListInteractor);
  errorInteractor= scoped(error, errorInteractor);
  id = attribute('button[aria-labelledby="selected-testId-item"]', 'id');
});
