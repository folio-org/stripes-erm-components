import {
  clickable,
  interactor,
  count
} from '@bigtest/interactor';


export default interactor(class OrganizationSelectionInteractor {
  static defaultScope = '#ui-dummy-module-display'
  clickDropdown = clickable('#selected-testId-item');
  optionCount = count('li');
});
