import {
  clickable,
  collection,
  count,
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

@interactor class CredInteractor {
  passwordBlockText = text('[data-test-password]');
  usernameBlockText = text('[data-test-username]');
  showCredentialsButton = clickable('[data-test-show-credentials]');
}

export default interactor(class ViewOrganizationCardInteractor {
  hasCard = isPresent('[data-test-organization-card]');
  hasHeaderStart = isPresent('[data-test-card-header-start]')
  hasCardBody = isPresent('[data-test-card-body]')
  hasInterfacesList = isPresent('[data-test-interfaces]')
  count = count('[data-test-organization-card]')
  hasOrg = isPresent('[data-test-org-name]')
  name = text('[data-test-org-name]')
  note = text('[data-test-org-note]')
  credentials = collection('[data-test-organization-card]', CredInteractor)
});
