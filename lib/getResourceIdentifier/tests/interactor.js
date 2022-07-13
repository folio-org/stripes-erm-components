import {
  interactor,
  text,
} from '@interactors/html';

export default @interactor class ResourceIdentifierInteractor {
  identifier = text('[data-test-resource-identifier]');
}
