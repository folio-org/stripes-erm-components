# Tags

Extends a `withTags` Higher Order Component to enable the CRUD operations on the `Tags` helper app.

## Basic Usage

```
import { withTags } from '@folio/stripes-erm-components';
import { compose } from 'redux-form';
import ViewAgreement from '../components/Agreements/ViewAgreement';

...
export default compose(
  withTags,
)(ViewAgreement);
```
