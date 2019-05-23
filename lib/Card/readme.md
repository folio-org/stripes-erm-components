# Card

Renders a card that's generally used for displaying lists of complex objects of key-value pairs.

## Basic Usage

The component itself only sets up the styling of the card and the contents are completely up to the user. E.g.,
```
<Card
  id="my-card"
  header={
    <React.Fragment>
      <span className="my-card-header">My Header<span>
      <button>Click Me!</button>
    </React.Fragment>
  }
>
  <div>This is my card body content!</div>
</Card>
```

## Props

| Name | Type | Required | Note |
--- | --- | --- | --- |
| `children` | node | Yes |
| `header` | node | Yes |
| _rest_ | | | Other props will be applied to the top-level card `div`. |

