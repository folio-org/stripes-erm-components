import {
  clickable,
  count,
  fillable,
  interactor,
  isPresent,
  selectable,
  text,
  value,
} from '@bigtest/interactor';

export default interactor(class OrganizationCardInteractor {
  static defaultScope = '[data-test-orgcard]';

  hasAddButton = isPresent('[data-test-orgcard-add-button]');
  hasOrg = isPresent('[data-test-org-name]');
  hasRole = isPresent('[data-test-org-role]');
  orgValue = value('[data-test-org-name]');
  roleValue = value('[data-test-org-role]');
  orgText = text('[data-test-org-name]');
  roleText = text('[data-test-org-role]');
  setOrg = fillable('[data-test-org-name]');
  setRole = selectable('[data-test-org-role]');
  clickAddButton = clickable('[data-test-orgcard-add-button]');
  addOrganizationBtnLabel = text('[data-test-orgcard-add-button]');
  emptyMessage = text('[data-test-org-empty-message]');
  count = count('[data-test-organizations-org]');
  clickDeleteButton = clickable('[data-test-org-delete-button]');
});
