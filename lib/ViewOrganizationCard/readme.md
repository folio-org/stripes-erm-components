# ViewOrganizationCard

Renders a card displaying information about individual Organizations. The information generally includes displaying either the `interfaces` data associated with an organization or just displaying the name of an organization.

## Basic Usage

```
import { ViewOrganizationCard } from '@folio/stripes-erm-components';

...
<ViewOrganizationCard
  headerStart={
    <React.Fragment>
      <span className="my-card-header">My Header<span>
      <button>Click Me!</button>
    </React.Fragment>
  }
  headerEnd={
    <Button
      buttonStyle="danger"
      onClick={() => this.handleUnlinkOrg()}
    >
      <FormattedMessage id="stripes-erm-components.organizations.unlinkOrganization" />
    />
  }
  interfaces={interfaces}
  org={org}
/>
```
## Props

| Name | Type | Required |
--- | --- | --- |
| `headerStart` | node, string | Yes |
| `headerEnd` | node, string | |
| `id` | string | |
| `interfaces` | array of object | |
| `org` | object | |


