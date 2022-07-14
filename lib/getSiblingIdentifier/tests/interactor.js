import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class SiblingIdentifierInteractor {
  identifier = text('[data-test-sibling-identifier]');
}
