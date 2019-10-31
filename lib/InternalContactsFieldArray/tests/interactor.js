import {
  clickable,
  collection,
  count,
  interactor,
  isPresent,
  scoped,
  selectable,
  text,
  value,
} from '@bigtest/interactor';

@interactor class InternalContactInteractor {
  static defaultScope = '[data-test-internal-contact]';

  hasLinkUserButton = isPresent('[data-test-ic-link-user]');
  hasName = isPresent('[data-test-user-name]');
  hasRole = isPresent('[data-test-ic-role]');

  isEmpty = isPresent('[data-test-user-empty]')
  isError = isPresent('[data-test-user-error]')

  userName = text('[data-test-user-name]');
  userPhone = text('[data-test-user-phone]');
  userEmail = text('[data-test-user-email]');
  roleValue = value('[data-test-ic-role]');

  linkUser = clickable('[data-test-ic-link-user]');

  setRole = selectable('[data-test-ic-role]');

  clickDeleteButton = clickable('[data-test-ic-delete-button]');
}

@interactor class InternalContactsFieldArrayInteractor {
  static defaultScope = '[data-test-internal-contacts-field-array]';

  count = count('[data-test-internal-contact]');
  contacts = collection('[data-test-internal-contact]', InternalContactInteractor);
  firstContact = scoped('[data-test-internal-contact]', InternalContactInteractor);

  hasAddButton = isPresent('[data-test-icfa-add-button]');
  clickAddButton = clickable('[data-test-icfa-add-button]');
  addContactBtnLabel = text('[data-test-icfa-add-button]');
  emptyMessage = text('[data-test-ic-empty-message]');
}

export default InternalContactsFieldArrayInteractor;
