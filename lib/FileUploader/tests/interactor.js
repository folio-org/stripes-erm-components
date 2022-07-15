import {
  interactor,
  isPresent,
  isVisible,
  text,
  triggerable,
} from '@bigtest/interactor';

import css from '../FileUploader.css';

const file = new File([], 'Test File', { type: 'text/plain' });
const event = { dataTransfer: { files: [file], types: ['Files'] } };
const multipleEvent = { dataTransfer: { files: [file, file], types: ['Files'] } };

@interactor class FileUploaderInteractor {
  static defaultScope = `.${css.upload}`

  hasError = isPresent('[data-test-error-msg]');
  isTitleVisible = isVisible('[data-test-title]');
  isButtonVisible = isVisible('[data-test-button]');
  isChildrenVisible = isVisible('[data-test-children]');
  isFooterVisible = isVisible('[data-test-footer]');

  errorMessage = text('[data-test-error-msg]');
  title = text('[data-test-title]');
  button = text('[data-test-button]');
  children = text('[data-test-children]');
  footer = text('[data-test-footer]');

  dragEnter = triggerable('dragenter', event);
  dragLeave = triggerable('dragleave', event);
  drop = triggerable('drop', event);
  dropMultiple = triggerable('drop', multipleEvent)
}

export default FileUploaderInteractor;
