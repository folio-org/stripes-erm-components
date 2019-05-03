import {
  clickable,
  interactor,
  isPresent,
  text,
  count,
} from '@bigtest/interactor';

export default interactor(class DocumentsFieldArrayInteractor {
  static defaultScope = '[data-test-documents-field-array]';

  hasAddButton = isPresent('[data-test-documents-field-array-add-button]');
  hasName = isPresent('[data-test-document-field-name]');
  hasNote = isPresent('[data-test-document-field-note]');
  hasLocation = isPresent('[data-test-document-field-location]');
  hasUrl = isPresent('[data-test-document-field-url]');
  clickAddButton = clickable('[data-test-documents-field-array-add-button]');
  addDocBtnLabel = text('[data-test-documents-field-array-add-button]');
  emptyMessage = text('[data-test-document-field-empty-message]');
  count = count('[data-test-document-field]');
  clickDeleteButton = clickable('[data-test-delete-field-button]');
});
