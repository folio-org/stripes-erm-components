import {
  clickable,
  interactor,
  text,
  isPresent,
  count,
  collection
} from '@bigtest/interactor';

@interactor class ConfirmationModalInteractor {
  isDeleteConfirmationButtonPresent = isPresent('[data-test-confirmation-modal-confirm-button]')
  clickConfirmDeleteButton = clickable('[data-test-confirmation-modal-confirm-button]')
}

@interactor class CustomPropertyConfigFieldInteractor {
  isCancelButtonPresent = isPresent('[data-test-customproperty-cancel-btn]');
  isDescriptionPresent = isPresent('[data-test-customproperty-description]');
  isDeleteButtonPresent = isPresent('[data-test-customproperty-delete-btn]');
  isEditButtonPresent = isPresent('[data-test-customproperty-edit-btn]');
  isLabelPresent = isPresent('[data-test-customproperty-label]');
  isOrderWeightPresent = isPresent('[data-test-customproperty-weight]');
  isDefaultVisibilityPresent = isPresent('[data-test-customproperty-defaultinternal]');
  isNamePresent = isPresent('[data-test-customproperty-name]');
  isPrimaryPresent = isPresent('[data-test-customproperty-primary]');
  isSaveButtonPresent = isPresent('[data-test-customproperty-save-btn]');
  isTypePresent = isPresent('[data-test-customproperty-type]');
  clickDeleteButton = clickable('[data-test-customproperty-delete-btn]');
  clickEditButton = clickable('[data-test-customproperty-edit-btn]');

  description = text('[data-test-customproperty-description] > [data-test-kv-value]');
  label = text('[data-test-customproperty-label] > [data-test-kv-value]');
  orderWeight = text('[data-test-customproperty-weight] > [data-test-kv-value]');
  defaultVisibility = text('[data-test-customproperty-defaultinternal] > [data-test-kv-value]');
  name = text('[data-test-customproperty-name] > [data-test-kv-value]');
  primary = text('[data-test-customproperty-primary] > [data-test-kv-value]');
  type = text('[data-test-customproperty-type] > [data-test-kv-value]');

  confirmation = new ConfirmationModalInteractor(['data-test-confirmationModal']);
}

@interactor class CustomPropertiesConfigListFieldArrayInteractor {
  isPropertyPresent = isPresent('[data-test-customproperty]');
  isNewButtonPresent = isPresent('#clickable-new-customproperty');
  clickNewButton = clickable('#clickable-new-customproperty');
  count = count('[data-test-card-body]');
  customPropertiesConfigField = collection('[data-test-customproperty]', CustomPropertyConfigFieldInteractor);
}

export default CustomPropertiesConfigListFieldArrayInteractor;
