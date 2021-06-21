import {
  clickable,
  collection,
  count,
  fillable,
  interactor,
  isPresent,
  selectable,
  text,
  value,
} from '@bigtest/interactor';

@interactor class OrgRoleInteractor {
  hasRole = isPresent('[data-test-org-role-field]');
  roleValue = value('[data-test-org-role-field]');
  roleText = text('[data-test-org-role-field]');
  setRole = selectable('[data-test-org-role-field]');
}
export default interactor(class OrganizationsFieldArrayInteractor {
  static defaultScope = '[data-test-org-fa]';

  hasAddButton = isPresent('[data-test-org-fa-add-button]');
  hasLinkOrgButton = isPresent('[data-test-org-link]');
  hasOrg = isPresent('[data-test-org-name]');
  hasNote = isPresent('[data-test-org-note]');
  orgText = text('[data-test-org-name]');
  noteText = text('[data-test-org-note]');
  setOrg = clickable('[data-test-org-link]');
  roles = collection('[data-test-render-org-role]', OrgRoleInteractor);
  setNote = fillable('[data-test-org-note]');
  clickAddButton = clickable('[data-test-org-fa-add-button]');
  addOrganizationBtnLabel = text('[data-test-org-fa-add-button]');
  emptyMessage = text('[data-test-org-empty-message]');
  count = count('[data-test-organizations-org]');
  clickDeleteButton = clickable('[data-test-org-delete-button]');
});
