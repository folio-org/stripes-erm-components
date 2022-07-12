import {
  interactor,
  text,
  isPresent,
} from '@interactors/html';

@interactor class TitleOnPlatformLinkInteractor {
  isPlatformNamePresent = isPresent('[data-test-platform-name]');
  isToolTipPresent = isPresent('[id^=pti-link-tooltip-]');
  platformName = text('[data-test-platform-name]');
}

export default TitleOnPlatformLinkInteractor;
