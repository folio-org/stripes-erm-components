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
  hasLinkOrgButton = isPresent('[data-test-org-link]');
  hasOrg = isPresent('[data-test-org-name]');
  hasRole = isPresent('[data-test-org-role]');
  hasNote = isPresent('[data-test-org-note]');
  roleValue = value('[data-test-org-role]');
  orgText = text('[data-test-org-name]');
  roleText = text('[data-test-org-role]');
  noteText = text('[data-test-org-note]');
  setOrg = clickable('[data-test-org-link]');
  setRole = selectable('[data-test-org-role]');
  setNote = fillable('[data-test-org-note]');
  clickAddButton = clickable('[data-test-org-fa-add-button]');
  addOrganizationBtnLabel = text('[data-test-org-fa-add-button]');
  emptyMessage = text('[data-test-org-empty-message]');
  count = count('[data-test-organizations-org]');
  clickDeleteButton = clickable('[data-test-org-delete-button]');
});
