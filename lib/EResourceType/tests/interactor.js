import {
  interactor,
  text,
} from '@interactors/html';

export default @interactor class EresourceTypeInteractor {
  publicationType = text('[data-test-eresource-publication-type]');
}
