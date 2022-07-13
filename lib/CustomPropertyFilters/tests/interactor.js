import {
  clickable,
  collection,
  count,
  fillable,
  interactor,
  isPresent,
  selectable,
  value,
} from '@interactors/html';

@interactor class RuleInteractor {
  operator = value('[data-test-rule-operator]');
  selectOperator = selectable('[data-test-rule-operator]');

  value = value('[data-test-rule-value]');
  fillValue = fillable('[data-test-rule-value]');
  selectValue = selectable('[data-test-rule-value]');

  delete = clickable('[data-test-delete-rule-btn]');
}

@interactor class CustomPropertyFilterInteractor {
  rules = collection('[data-test-rule-row]', RuleInteractor);
  rulesCount = count('[data-test-rule-row]');
  addRule = clickable('[data-test-add-rule-btn]');

  custProp = value('[data-test-custprop]');
  selectCustProp = selectable('[data-test-custprop');
}

export default @interactor class CustomPropertyFiltersFormInteractor {
  open = clickable('[data-test-open-custprop-filters]');
  cancel = clickable('[data-test-cancel-filters]');
  apply = clickable('[data-test-apply-filters]');
  addCustPropFilter = clickable('[data-test-add-custprop-filter-btn]');
  modalIsVisible = isPresent('#custprop-filters-modal');
  errorIsVisible = isPresent('[class*=feedbackError]');

  filters = collection('[data-test-custprop-filter]', CustomPropertyFilterInteractor);
  filtersCount = count('[data-test-custprop-filter]');
}
