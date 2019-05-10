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

export default interactor(class InternalContactsFieldArrayInteractor {
  static defaultScope = '[data-test-internal-contacts-field-array]';

  hasAddButton = isPresent('[data-test-icfa-add-button]');
  hasUser = isPresent('[data-test-ic-user]');
  hasRole = isPresent('[data-test-ic-role]');
  userValue = value('[data-test-ic-user]');
  roleValue = value('[data-test-ic-role]');
  userText = text('[data-test-ic-user]');
  roleText = text('[data-test-ic-role]');
  setUser = fillable('[data-test-ic-user]');
  setRole = selectable('[data-test-ic-role]');
  clickAddButton = clickable('[data-test-icfa-add-button]');
  addContactBtnLabel = text('[data-test-icfa-add-button]');
  emptyMessage = text('[data-test-ic-empty-message]');
  count = count('[data-test-internal-contact]');
  clickDeleteButton = clickable('[data-test-ic-delete-button]');
});
