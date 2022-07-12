import {
  attribute,
  interactor,
  isPresent,
  text,
} from '@interactors/html';

@interactor class InternalContactCardInteractor {
  static defaultScope = '[data-test-contact-card]';

  exists = isPresent('div');

  name = text('[data-test-contact-name]');
  phone = text('[data-test-contact-phone]');
  email = text('[data-test-contact-email]');
  role = text('[data-test-contact-role]');
  link = attribute('[data-test-contact-link]', 'href');
}

export default InternalContactCardInteractor;
