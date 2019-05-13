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

export default interactor(class OrganizationsFieldArrayInteractor {
  static defaultScope = '[data-test-organizations-field-array]';

  hasAddButton = isPresent('[data-test-orgfa-add-button]');
  hasOrg = isPresent('[data-test-org-name]');
  hasRole = isPresent('[data-test-org-role]');
  orgValue = value('[data-test-org-name]');
  roleValue = value('[data-test-org-role]');
  orgText = text('[data-test-org-name]');
  roleText = text('[data-test-org-role]');
  setOrg = fillable('[data-test-org-name]');
  setRole = selectable('[data-test-org-role]');
  clickAddButton = clickable('[data-test-orgfa-add-button]');
  addOrganizationBtnLabel = text('[data-test-orgfa-add-button]');
  emptyMessage = text('[data-test-org-empty-message]');
  count = count('[data-test-org]');
  clickDeleteButton = clickable('[data-test-org-delete-button]');
});
