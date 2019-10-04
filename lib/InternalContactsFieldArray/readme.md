# InternalContactsFieldArray

A component intended to be used with react-final-form for editing arrays of internal contacts of the type [`InternalContact`](https://github.com/folio-org/mod-agreements/blob/master/service/grails-app/domain/org/olf/erm/InternalContact.groovy).


## Redux Form Usage

As with any react-final-form field, it's required to pass in a `name` to the parent `FieldArray`. `InternalContactsFieldArray` also uses the name to construct IDs and form the objects that make up each element in the array.

`addContactBtnLabel` and `isEmptyMessage` can be optionally included to override the default labels.

```
import { InternalContactsFieldArray } from '@folio/stripes-erm-components';
import { FieldArray } from 'react-final-form-arrays';

...
<FieldArray
  component={InternalContactsFieldArray}
  name="contacts"
  contactRoles={contactRoles}
  users={users}
  ...
/>
```

## Props

| Name | Type | Required |
--- | --- | --- |
| `addContactBtnLabel` | string | |
| `isEmptyMessage` | string | |
| `name` | string | Yes |
| `contactRoles` | array | Yes |
| `contactRoles[].label` | string | Yes |
| `contactRoles[].value` | string | Yes |
| `users[].personal.firstName` | string | |
| `users[].personal.lastName` | string | Yes |

### `contactRoles` prop

The `contactRoles` prop should be an array of objects that have `value` and `label` properties. The contact role of an internal contact will be editable via a dropdown populated by the `contactRoles` prop.

The values shown to the user will be the `label` properties of the `contactRoles` entries, and the value of the `${props.name}[${index}].role` react-final-form field will be set to the `value` of the contact role chosen.

### `users` prop

When a user is selected as an internal contact, the user ID is saved in the `${props.name}[${index}].user` react-final-form field. When a form is loaded with existing internal contacts, the metadata about the user (eg, their name) is not available in the form data.

As a result, this component needs to get that information from elsewhere. The `users` props serves this purpose. It should contain an array of user objects that contain at least the contact's `lastName` so that it can be shown to the user interacting with the page.
