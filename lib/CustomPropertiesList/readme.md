# CustomPropertiesList
Lists a license or agreement and its terms

## Basic Usage
Simply passing a license or agreement object and it's terms is all that's required.
```
import { CustomPropertiesList } from '@folio/stripes-erm-components';

...
<CustomPropertiesList
          resource={license}
          customProperties={terms}
/>
...
```

## Props

| Name | Type | Description | Required | Default |
--- | --- | --- | --- | --- |
| `resource` | object | [`License` || `Agreement`](https://github.com/folio-org/mod-licenses/blob/master/service/grails-app/domain/org/olf/licenses/License.groovy) | Yes |
| `customProperties` | array | Array of objects | Yes |
| `customProperties[].name` | string | Used for lookup against the license properties. | Yes |
| `customProperties[].label` | string | The term's formatted name that's displayed to the user in the UI | Yes |
| `customProperties[].primary` | boolean | Whether a term should always be listed (with value shown as "Not set") even when it hasn't been configured for the license. | No |
| `customProperties[].description` | string | The term's description that's displayed in the UI | No |
