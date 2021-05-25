# css-groups

> Reuse CSS groups in your stylesheets.

Syntax:

```css
@group group1 { /* Create a group. */
  ...
}

@group group2 {
  ... /* Add styles. */
}

.selector {
  groups: group1 group2; /* Add as many groups as you want. Will be replaced at runtime with the styles associated with each group. */
}
```
