# OrganizationSelection

A Stripes `<Selection>` component used for selecting an ERM organization. It performs async lookups of the user's query and allows for the selection of one of the organizations returned.

The component defaults to using the `/erm/org` endpoint.

## React final Form Usage

```
import { OrganizationSelection } from '@folio/stripes-erm-components';
import { Field } from 'react-final-form';

...
<Field
  component={OrganizationSelection}
  name="organization"
  path="other/orgs/endpoint" // Override the default path of "erm/org"
  ...
/>
```

## Basic Usage
The component is intended for use in a React final Form environment, but by supplying an `input` prop with a few necessary keys, you can bypass this. For example:
```
<OrganizationSelection
  input={{
    name: 'organization',
    onChange: value => this.setState({ org: value }),
    value: this.state.org,
  }}
/>
```
