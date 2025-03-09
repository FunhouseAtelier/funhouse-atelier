# scratchpad

## `routeManifest` Syntax With Explicit Default File Paths

```js
const routeManifest = {
  _: './routes/_index.tsx', // root index route
  about: './routes/about.tsx', // root leaf route
  post: [
    './routes/post/__root.tsx', // branch root route, has `<Outlet />`
    {
      _: './routes/post/_index.tsx', // branch index route
      new: './routes/post/new.tsx', // branch leaf route
      $postId: [
        './routes/post/$postId/__root.tsx', // dynamic branch root route, has `<Outlet />`
        {
          delete: './routes/post/$postId/delete.tsx', // dynamic branch leaf route
        },
      ],
      $postId_edit: './routes/post/$postId/edit.tsx', // dynamic branch leaf route, escapes parent root
    },
  ],
  __auth: [
    './routes/[auth]/__layout.tsx', // layout, has `<Outlet />`
    {
      login: './routes/[auth]/login.tsx', // root leaf route with shared layout
      register: './routes/[auth]/register.tsx', // root leaf route with shared layout
    },
  ],
  $lang_: {
    // optional segment, no root layout
    product: {
      // route prefix segment, no root layout
      search: './routes/(lang)/product/search.tsx', // prefixed leaf route with optional segment
      $productId: './routes/(lang)/product/$productId.tsx', // prefixed dynamic leaf route with optional segment
      $: './routes/(lang)/product/$.tsx', // prefixed splat route with optional segment
    },
  },
}
```

## `routeManifest` Syntax With Default File Paths

```js
const routeManifest = {
  _: true, // root index route
  about: true, // root leaf route
  post: [
    true, // branch root route, has `<Outlet />`
    {
      _: true, // branch index route
      new: true, // branch leaf route
      $postId: [
        true, // dynamic branch root route, has `<Outlet />`
        {
          delete: true, // dynamic branch leaf route
        },
      ],
      $postId_edit: true, // dynamic branch leaf route, escapes parent root
    },
  ],
  __auth: [
    true, // layout, has `<Outlet />`
    {
      login: true, // root leaf route with shared layout
      register: true, // root leaf route with shared layout
    },
  ],
  $lang_: {
    // optional segment, no root layout
    product: {
      // route prefix segment, no root layout
      search: true, // prefixed leaf route with optional segment
      $productId: true, // prefixed dynamic leaf route with optional segment
      $: true, // prefixed splat route with optional segment
    },
  },
}
```
