import { Bigtest } from '@folio/stripes-testing';

export default Bigtest.createInteractor('headline')
  .selector('[class^=headline]')
  .locator((el) => el.textContent)
  .filters({
    textContent: (el) => el.textContent,
  });
