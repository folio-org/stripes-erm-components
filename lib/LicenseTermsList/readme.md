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
| `terms` | array | Array of objects | Yes |
| `terms[].name` | string | Used for lookup against the license properties. | Yes |
| `terms[].label` | string | The term's formatted name that's displayed to the user in the UI | Yes |
| `terms[].primary` | boolean | Whether a term should always be listed (with value shown as "Not set") even when it hasn't been configured for the license. | No |
| `terms[].description` | string | The term's description that's displayed in the UI | No |
