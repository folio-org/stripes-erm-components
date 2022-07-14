import {
  clickable,
  collection,
  count,
  fillable,
  interactor,
  value,
} from '@bigtest/interactor';

@interactor class TaskInteractor {
  fillTask = fillable('[data-test-label]');
  task = value('[data-test-label]');
  delete = clickable('[data-test-delete]');
  replace = clickable('[data-test-replace]');
  update = clickable('[data-test-update]');
}

export default @interactor class TasksFormInteractor {
  size = count('[data-test-task');
  items = collection('[data-test-task]', TaskInteractor);

  appendTask = clickable('#add');
  prependTask = clickable('#prepend');
  submit = clickable('#submit')
}
