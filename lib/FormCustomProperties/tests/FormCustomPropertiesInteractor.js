import {
  attribute,
  clickable,
  collection,
  count,
  fillable,
  interactor,
  isPresent,
  selectable,
  scoped,
  text,
  value,
  blurrable,
} from '@bigtest/interactor';

@interactor class NameFieldInteractor {
  optionCount = count('option');
  selectOption = selectable();
}

@interactor class ValueFieldInteractor {
  type = attribute('type');
  optionCount = count('option');
}

@interactor class visibilityFieldInteractor {
  selectOption = selectable();
}

@interactor class CustomPropertyInteractor {
  isLabelPresent = isPresent('[data-test-card-header-start]');
  isNotePresent = isPresent('[data-test-customproperty-note]');
  isPublicNotePresent = isPresent('[data-test-customproperty-public-note]');
  isVisibilityPresent = isPresent('[data-test-customproperty-visibility]');
  isValuePresent = isPresent('[data-test-customproperty-value]');

  label = text('[data-test-card-header-start]');
  note = text('[data-test-customproperty-note]');
  publicNote = text('[data-test-customproperty-public-note]');
  value = value('[data-test-customproperty-value]');
  visibility = value('[data-test-customproperty-visibility]');

  nameField = scoped('[data-test-customproperty-name]', NameFieldInteractor);
  valueField = scoped('[data-test-customproperty-value]', ValueFieldInteractor);
  visibilityField = scoped('[data-test-customproperty-visibility]', visibilityFieldInteractor);

  fillNote = fillable('[data-test-customproperty-note]');
  blurNote = blurrable('[data-test-customproperty-note]');
  fillPublicNote = fillable('[data-test-customproperty-public-note]')
  blurPublicNote = blurrable('[data-test-customproperty-public-note]')
  fillValue = fillable('[data-test-customproperty-value]');
  blurValue = blurrable('[data-test-customproperty-value]');
  fillVisibility = fillable('[data-test-customproperty-visibility]');
  blurVisibility = blurrable('[data-test-customproperty-visibility]');

  clickDeleteButton = clickable('[data-test-customproperty-delete-btn]');
  hasError = isPresent('[class^="feedbackError---"]')
  isDeleteBtnPresent = isPresent('[data-test-customproperty-delete-btn]');
}

@interactor class FormCustomPropertiesInteractor {
  isAddButtonPresent = isPresent('#add-customproperty-btn');
  isCustomPropertyPresent = isPresent('[data-test-customproperty]');

  count = count('[data-test-card-body]');
  optionalPropertiesCount = count('[data-test-customproperty="optional"]');

  customPropertyInteractor = collection('[data-test-customproperty]', CustomPropertyInteractor);

  clickAddButton = clickable('#add-customproperty-btn');
  submit = clickable('#submit')
}

export default FormCustomPropertiesInteractor;
