import {
  attribute,
  clickable,
  fillable,
  interactor,
  text,
  value,
  isPresent,
  count,
  collection,
  selectable,
  scoped,
} from '@bigtest/interactor';


@interactor class NameFieldInteractor {
  optionCount = count('option');
  selectOption = selectable();
}

@interactor class ValueFieldInteractor {
  type = attribute('type');
  optionCount = count('option');
}

@interactor class InternalNoteFieldInteractor {
  type = attribute('type');
  optionCount = count('option');
}

@interactor class PublicNoteFieldInteractor {
  type = attribute('type');
  optionCount = count('option');
}

@interactor class CustomPropertyInteractor {
  isLabelPresent = isPresent('[data-test-card-header-start]');
  isVisibilityPresent = isPresent('[data-test-customproperty-visibility]');
  isValuePresent = isPresent('[data-test-customproperty-value]');
  isNotePresent = isPresent('[data-test-customproperty-note]');
  isPublicNotePresent = isPresent('[data-test-customproperty-public-note]');

  label = text('[data-test-card-header-start]');
  visibility = value('[data-test-customproperty-visibility]');
  value = text('[data-test-customproperty-value]');
  note = text('[data-test-customproperty-note]');
  publicNote = text('[data-test-customproperty-public-note]');

  nameField = scoped('[data-test-customproperty-name]', NameFieldInteractor);
  valueField = scoped('[data-test-customproperty-value]', ValueFieldInteractor);
  internalNoteField = scoped('[data-test-customproperty-note]', InternalNoteFieldInteractor);
  publicNoteField = scoped('[data-test-customproperty-public-note]', PublicNoteFieldInteractor);

  fillValue = fillable('[data-test-customproperty-value]');
  fillNote = fillable('[data-test-customproperty-note]');
  fillPublicNote = fillable('[data-test-customproperty-public-note]')
  fillVisibility = fillable('[data-test-customproperty-visibility]');

  clickDeleteButton = clickable('[data-test-customproperty-delete-btn]');
  hasError = isPresent('[class^="feedbackError---"]')
}

@interactor class FormCustomPropertiesInteractor {
  isCustomPropertyPresent = isPresent('[data-test-customproperty]');
  isAddButtonPresent = isPresent('#add-customproperty-btn');
  clickAddButton = clickable('#add-customproperty-btn');
  count = count('[data-test-card-body]');
  customPropertyInteractor = collection('[data-test-customproperty]', CustomPropertyInteractor);
  optionalPropertiesCount = count('[data-test-customproperty="optional"]');
  submit = clickable('#submit')
}

export default FormCustomPropertiesInteractor;
