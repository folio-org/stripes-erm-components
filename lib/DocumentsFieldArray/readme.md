# DocumentsFieldArray

A component intended to be used with redux-form for editing arrays of documents of the type [`DocumentAttachment`](https://github.com/folio-org/mod-agreements/blob/master/service/grails-app/domain/org/olf/general/DocumentAttachment.groovy).


## Redux Form Usage

As with any redux-form field, it's required to pass in a `name` to the parent `FieldArray`. `DocumentsFieldArray` also uses the name to construct IDs and form the objects that make up each element in the array.

`addDocBtnLabel` and `isEmptyMessage` can be optionally included to override the default labels.

```
import { DocumentsFieldArray } from '@folio/stripes-erm-components';
import { FieldArray } from 'redux-form';

...
<FieldArray
  addDocBtnLabel={<FormattedMessage id="ui-licenses.coreDocs.add" />}
  component={DocumentsFieldArray}
  isEmptyMessage={<FormattedMessage id="ui-licenses.coreDocs.none" />}
  name="docs"
/>
```

## Props

| Name | Type | Required |
--- | --- | --- |
| `addDocBtnLabel` | string | |
| `name` | string | Yes |
| `isEmptyMessage` | string | |
