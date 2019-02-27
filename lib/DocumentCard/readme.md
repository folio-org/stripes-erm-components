# DocumentCard

Renders a card displaying information about documents of the type [`DocumentAttachment`](https://github.com/folio-org/mod-agreements/blob/master/service/grails-app/domain/org/olf/general/DocumentAttachment.groovy).


## Basic Usage
Generally, expanding a document's keys is the easiest way to use this component.
```
return docs.map(doc => <DocumentCard key={doc.id} {...doc} />);
```

## Props

| Name | Type | Required |
--- | --- | --- |
| `location` | string | |
| `name` | string | Yes |
| `note` | string | |
| `url` | string | |

