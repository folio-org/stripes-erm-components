import {
  interactor,
  clickable,
  collection,
  scoped,
  fillable,
  text,
  isPresent,
  isVisible
} from '@bigtest/interactor';

import css from '../DocumentCard.css';
import { selectorFromClassnameString } from '../../../tests/helpers';

@interactor class DocumentCardInteractor {
  static defaultScope = `.${css.docCard}`
  isHeadlinePresent = isPresent('[data-test-doc-name]');
  renderHeadline = text('[data-test-doc-name]');
  isNotePresent = isPresent('[data-test-doc-note]');
  renderNote = text('[data-test-doc-note]');
  isCategoryPresent = isPresent('[data-test-doc-note]');
  renderCategory = text('[data-test-doc-category]');
  isURLPresent = isPresent('[data-test-doc-url]')
  renderURL = text('[data-test-doc-url]');
  isLocationPresent = isPresent('[data-test-doc-location]');
  renderLocation = text('[data-test-doc-location]');
}

export default DocumentCardInteractor;
