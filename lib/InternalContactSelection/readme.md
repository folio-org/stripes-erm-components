# InternalContactSelection

A Stripes `<Selection>` component used for selecting an ERM internal contacts. It performs async lookups of the user's query and allows for the selection of one of the contacts returned.

The component defaults to using the `/erm/org` endpoint.

## Redux Form Usage

```
import { InternalContactSelection } from '@folio/stripes-erm-components';
import { Field } from 'redux-form';

...
<Field
  component={InternalContactSelection}
  name="contact"
  path="a/contacts/endpoint"
  ...
/>
```

## Basic Usage
The component is intended for use in a Redux Form environment, but by supplying an `input` prop with a few necessary keys, you can bypass this. For example:
```
<InternalContactSelection
  input={{
    name: 'organization',
    onChange: value => this.setState({ org: value }),
    value: this.state.org,
  }}
  path="a/contacts/endpoint"
/>
```
