import {
  clickable,
  collection,
  count,
  fillable,
  interactor,
  value
} from '@bigtest/interactor';

@interactor class TaskInteractor {
  fillTask = fillable('[data-test-alternative-names-field]');
  task = value('[data-test-alternative-names-field]');
  delete = clickable('[data-test-delete-field-button]');
}

export default @interactor class TasksFormInteractor {
  size = count('[data-test-render-alternative-names');
  items = collection('[data-test-render-alternative-names]', TaskInteractor);

  appendTask = clickable('[data-test-alternative-names-field-array-add-button]');
  submit = clickable('#submit')
}
