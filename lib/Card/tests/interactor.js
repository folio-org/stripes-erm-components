import {
  interactor,
  text,
  isPresent,
} from '@interactors/html';

import css from '../Card.css';

@interactor class CardInteractor {
  static defaultScope = `.${css.card}`
  isHeaderPresent = isPresent('[data-test-card-header]');
  header = text('[data-test-card-header]');
  isBodyPresent = isPresent('[data-test-card-body]');
  body = text('[data-test-card-body]');
}

export default CardInteractor;
