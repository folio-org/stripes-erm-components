import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class ResourceIdentifierInteractor {
  identifier = text('[data-test-resource-identifier]');
}
