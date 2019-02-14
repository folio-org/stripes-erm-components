# OrganizationSelection

A Stripes `<Selection>` component used for selecting an ERM organization. It performs async lookups of the user's query and allows for the selection of one of the organizations returned.

The component assumes the existence of the `/erm/org` endpoint.

## Redux Form Usage

```
import { OrganizationSelection } from '@folio/stripes-erm-components';
import { Field } from 'redux-form';

...
<Field
  component={OrganizationSelection}
  name="organization"
  ...
/>
```

## Basic Usage
The component is intended for use in a Redux Form environment, but by supplying an `input` prop with a few necessary keys, you can bypass this. For example:
```
<OrganizationSelection
  input={{
    name: 'organization',
    onChange: value => this.setState({ org: value }),
    value: this.state.org,
  }}
/>
```
