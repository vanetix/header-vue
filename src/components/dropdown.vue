<docs>
### Dropdown

Used for rendering out a dropdown menu.

#### Examples:

An `items` attribute should be passed to the `dropdown` component, which
should be an array of any type of `Object`. Each element in `items` will then
be passed to the defined `template` as the `item` property used to override
the named slot `item`.

Optionally, you can pass a default `template`, which will be used to render the
dropdown trigger or placeholder text. The default is simply, "Dropdown".

In parent passing both `slot` blocks:
```
<dropdown :items="elements">
  <template>
    <span class="dropdown__trigger">Sites</span>
  </template>

  <template slot="item" scope="props">
    <a href="https://www.google.com">{{props.item}}</a>
  </template>
</dropdown>
```

In parent passing only the `item` named `slot`:

```
<dropdown :items="elements">
  <template slot="item" scope="props">
    <a href="https://www.google.com">{{props.item}}</a>
  </template>
</dropdown>
```
</docs>

<template>
<div class="dropdown">
  <slot>Dropdown</slot>

  <ul class="dropdown__content">
    <li v-for="item in items">
      <slot name="item" :item="item">
        <a :href="item.href">{{item.name}}</a>
      </slot>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
@import '~styles/variables';

.dropdown {
  position: relative;
  cursor: pointer;
  padding: 0.8rem 1.8rem 0.8rem 0.6rem;
  min-width: 10rem;
  flex-direction: column;

  &:hover ul {
    opacity: 1;
    visibility: visible;
  }

  &:after {
    position: absolute;
    top: 50%;
    right: 0;
    margin-right: 0.6rem;
    transform: translateY(-50%);
    content: "";
    border-top: 6px solid $white;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }

  ul {
    position: absolute;
    top: 100%;
    right: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s ease-in-out;
    background: $blue;
    max-height: 60vh;
    overflow: auto;

    li {
      border-top: 1px solid $white;

      &:first-child { border-top: none; }
    }

    a {
      display: block;
      color: $link;
      background: $blue;
      padding: 0.8rem;
      font-size: 1em;
      text-decoration: none;

      &:hover { color: $link-hover; }
    }
  }
}
</style>
