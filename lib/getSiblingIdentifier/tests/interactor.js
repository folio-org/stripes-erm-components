import {
  interactor,
  text,
} from '@interactors/html';

export default @interactor class SiblingIdentifierInteractor {
  identifier = text('[data-test-sibling-identifier]');
}
