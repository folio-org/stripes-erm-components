# LicenseTermsList
Lists a license and its terms

## Basic Usage
Simply passing a license object and it's terms is all that's required.
```
import { LicenseTermsList } from '@folio/stripes-erm-components';

...
<LicenseTermsList
          license={license}
          terms={terms}
/>
...
```

## Props

| Name | Type | Description | Required | Default |
--- | --- | --- | --- | --- |
| `license` | object | [`License`](https://github.com/folio-org/mod-licenses/blob/master/service/grails-app/domain/org/olf/licenses/License.groovy) | Yes |
| `terms` | array | [`Licenses`](https://github.com/folio-org/ui-licenses/blob/master/src/routes/Licenses.js) | Yes |
