# CreateOrganizationModal

A Stripes `<Modal>` that contains the form elements and queries to create new ERM organizations.

The component defaults to using the `/erm/org` endpoint. When a user enters the name for a new organization and attempts to create the organization, a check is made to ensure that an org with the same name doesn't already exist. If there is an org with the same name, an error is displayed. Otherwise, the org is `POST`ed to the endpoint and the `onClose` prop is called.

# Basic Usage

```
  <CreateOrganizationModal
    onClose={() => this.setState({ showCreateOrgModal: false })}
    open={this.state.showCreateOrgModal}
    path="other/orgs/endpoint" // Override the default path of "erm/org"
  />
```
