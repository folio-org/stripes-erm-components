import {
  clickable,
  collection,
  interactor,
  isPresent,
} from '@interactors/html';

@interactor class CheckboxInteractor {
  click = clickable();
}

export default @interactor class DuplicateModalInteractor {
  isDuplicateModalPresent = isPresent('#duplicate-agreement');
  checkBoxList = collection('input[type="checkbox"]', CheckboxInteractor);
  clickSaveAndClose = clickable('#duplicate-modal-save-button');
  clickClose = clickable('#duplicate-modal-close-button');
  clickCancelButton = clickable('#duplicate-modal-cancel-button');
}
