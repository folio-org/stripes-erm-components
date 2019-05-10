import {
  isPresent,
  clickable,
  interactor,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';

export default interactor(class CreateOrganizationModalInteractor {
  isModalPresent = isPresent('#testId');
  isTextFieldPresent = isPresent('#create-org-modal-name-field');
  isButtonPresent = isPresent('#create-org-modal-submit-btn');
  textField = scoped('#testId', TextFieldInteractor);
  click = clickable('#create-org-modal-submit-btn');
});
