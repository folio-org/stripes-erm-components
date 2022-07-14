import {
  blurrable,
  clickable,
  count,
  fillable,
  focusable,
  interactor,
  isPresent,
  selectable,
  text,
  value,
} from '@bigtest/interactor';

@interactor class DocumentsFieldArrayInteractor {
  static defaultScope = '[data-test-documents-field-array]';

  hasAddButton = isPresent('[data-test-documents-field-array-add-button]');
  hasError = isPresent('[class*="feedbackError"]');
  hasName = isPresent('[data-test-document-field-name]');
  hasNote = isPresent('[data-test-document-field-note]');
  hasLocation = isPresent('[data-test-document-field-location]');
  hasUrl = isPresent('[data-test-document-field-url]');
  hasFile = isPresent('[data-test-document-field-file]');
  hasCategory = isPresent('[data-test-document-field-category]');

  fillName = fillable('[data-test-document-field-name]');
  fillNote = fillable('[data-test-document-field-note]');
  fillLocation = fillable('[data-test-document-field-location]');
  fillUrl = fillable('[data-test-document-field-url]');
  selectCategory = selectable('[data-test-document-field-category]');

  focusName = focusable('[data-test-document-field-name]');
  focusLocation = focusable('[data-test-document-field-location]');
  focusUrl = focusable('[data-test-document-field-url]');

  blurName = blurrable('[data-test-document-field-name]');
  blurLocation = blurrable('[data-test-document-field-location]');
  blurUrl = blurrable('[data-test-document-field-url]');

  category = value('[data-test-document-field-category]');;

  clickAddButton = clickable('[data-test-documents-field-array-add-button]');
  addDocBtnLabel = text('[data-test-documents-field-array-add-button]');
  emptyMessage = text('[data-test-document-field-empty-message]');
  count = count('[data-test-document-field]');
  clickDeleteButton = clickable('[data-test-delete-field-button]');
}

export default DocumentsFieldArrayInteractor;
