[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# occsn-checkout

An importable boilerplate Occasion checkout experience using React, the Occasion SDK, and Mitragyna

## Install

```bash
$ yarn
```

## Develop

First, modify `index.html` with your merchant API login and product ID:

```html
<script>
  window.OCCSN = {
    api_key: 'YOUR_API_LOGIN',
    host_url: 'https://occ.sn',
    product_id: 'YOUR_PRODUCT_ID'
  };
</script>
```

Then, run poi to start a local webpack hot-reloading build:

```bash
$ yarn poi
```

## Build

To build changes to be merged into the production experience, run:

```bash
$ yarn build
```
