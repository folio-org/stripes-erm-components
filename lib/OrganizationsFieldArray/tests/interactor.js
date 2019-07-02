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
  static defaultScope = '[data-test-org-fa]';

  hasAddButton = isPresent('[data-test-org-fa-add-button]');
  hasOrg = isPresent('[data-test-org-name]');
  hasRole = isPresent('[data-test-org-role]');
  orgValue = value('[data-test-org-name]');
  roleValue = value('[data-test-org-role]');
  orgText = text('[data-test-org-name]');
  roleText = text('[data-test-org-role]');
  setOrg = fillable('[data-test-org-name]');
  setRole = selectable('[data-test-org-role]');
  clickAddButton = clickable('[data-test-org-fa-add-button]');
  addOrganizationBtnLabel = text('[data-test-org-fa-add-button]');
  emptyMessage = text('[data-test-org-empty-message]');
  count = count('[data-test-organizations-org]');
  clickDeleteButton = clickable('[data-test-org-delete-button]');
});
