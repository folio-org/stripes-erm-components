import {
  clickable,
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

@interactor class FileUploaderFieldInteractor {
  static defaultScope = '[data-test-document-field-file]';

  hasFilename = isPresent('[data-test-fuf-name]');
  hasUploaded = isPresent('[data-test-fuf-uploaded]');
  hasDeleteBtn = isPresent('[data-test-fuf-delete]');

  filename = text('[data-test-fuf-name]');
  uploaded = text('[data-test-fuf-uploaded]');
  clickDelete = clickable('[data-test-fuf-delete]');

  download = clickable('[data-test-fuf-name]');
}

export default FileUploaderFieldInteractor;
