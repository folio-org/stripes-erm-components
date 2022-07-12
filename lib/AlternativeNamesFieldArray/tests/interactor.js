import {
  clickable,
  collection,
  count,
  fillable,
  interactor,
  value
} from '@interactors/html';

@interactor class AlternativeNameInteractor {
  fillAlternativeName = fillable('[data-test-alternative-names-field]');
  alternativeName = value('[data-test-alternative-names-field]');
  delete = clickable('[data-test-delete-field-button]');
}

export default @interactor class AlternativeNamesFormInteractor {
  size = count('[data-test-render-alternative-names');
  items = collection('[data-test-render-alternative-names]', AlternativeNameInteractor);

  appendAlternativeName = clickable('[data-test-alternative-names-field-array-add-button]');
  submit = clickable('#submit')
}
