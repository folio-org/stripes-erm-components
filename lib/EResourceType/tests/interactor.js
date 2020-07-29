import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class EresourceTypeInteractor {
  publicationType = text('[data-test-eresource-publication-type]');
}
