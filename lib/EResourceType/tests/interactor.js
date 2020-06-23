import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class EresourceTypeInteractor {
  type = text('[data-test-eresource-type]');
}
