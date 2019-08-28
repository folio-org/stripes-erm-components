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
  showCredsButton = clickable('[data-test-show-creds]');
}

export default interactor(class ViewOrganizationCardInteractor {
  hasCard = isPresent('[data-test-organization-card]');
  hasHeaderStart = isPresent('[data-test-card-header-start]')
  hasCardBody = isPresent('[data-test-card-body]')
  hasMCL = isPresent('[data-test-mcl]')
  count = count('[data-test-organization-card]')
  hasOrg = isPresent('[data-test-org-name]')
  name = text('[data-test-org-name]')
  creds = collection('[data-test-organization-card]', CredInteractor)
});
