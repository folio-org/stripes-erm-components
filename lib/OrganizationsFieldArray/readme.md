# OrganizationsFieldArray

A component intended to be used with react-final-form for editing arrays of Organizations rendered
using the stripes-components `Card` component.

## React final Form Usage

As with any react-final-form field, it's required to pass in a `name` to the parent `FieldArray`. `OrganizationsFieldArray` also uses the name to construct IDs and form the objects that make up each element in the array.

`addOrganizationBtnLabel` and `isEmptyMessage` can be optionally included to override the default labels.

```
import { OrganizationsFieldArray } from '@folio/stripes-erm-components';
import { FieldArray } from 'react-final-form-arrays';

...
<FieldArray
  component={OrganizationsFieldArray}
  name="orgs"
  roles={data.orgRoleValues}
  ...
/>
```

## Props

| Name | Type | Required |
--- | --- | --- |
| `addOrganizationBtnLabel` | string | |
| `isEmptyMessage` | string | |
| `name` | string | Yes |
| `roles` | array | Yes |
| `roles[].label` | string | Yes |
| `roles[].value` | string | Yes |

### `roles` prop

The `roles` prop should be an array of objects that have `value` and `label` properties. The role of an organization will be editable via a dropdown populated by the `roles` prop.

The values shown to the user will be the `label` properties of the `roles` entries, and the value of the `${props.name}[${index}].role` react-final-form field will be set to the `value` of the role chosen.
