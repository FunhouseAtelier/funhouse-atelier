# scratchpad

## `routeManifest` Syntax With Default File Paths

```js
const routeManifest = {
  _: true,
  about: true,
  post: [
    true,
    {
      _: true,
      new: true,
      $postId: [
        true,
        {
          delete: true,
          $: true,
        },
      ],
      $postId_edit: true,
    },
  ],
  __auth: [
    true,
    {
      login: true,
      register: true,
    },
  ],
  $lang_: {
    product: {
      search_: true,
      $productId: true,
    },
  },
}
```

## `routeManifest` Syntax With Default File Paths, With Comments

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
          $: true, // dynamic branch splat route
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
      search_: true, // prefixed optional leaf route with optional segment
      $productId: true, // prefixed dynamic leaf route with optional segment
    },
  },
}
```

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
          $: './routes/(lang)/product/$.tsx', // dynamic branch splat route
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
      search_: './routes/(lang)/product/search.tsx', // prefixed optional leaf route with optional segment
      $productId: './routes/(lang)/product/$productId.tsx', // prefixed dynamic leaf route with optional segment
    },
  },
}
```

```js
const routeManifest = {
  _: true,
  about: true,
  post: [
    true,
    {
      _: true,
      new: true,
      $postId: [
        true,
        {
          delete: true,
          $: true,
        },
      ],
      $postId_edit: true,
    },
  ],
  __auth: [
    true,
    {
      login: true,
      register: true,
    },
  ],
  $lang_: {
    product: {
      search_: true,
      $productId: true,
    },
  },
}
```

## `routeConfig` Returned By `makeRouteConfig(routeManifest)`

```js
const routeConfig = [
  index('./routes/_index.tsx'),
  route('about', './routes/about.tsx'),
  route('post', './routes/post/__root.tsx', [
    index('./routes/post/_index.tsx'),
    route('new', './routes/post/new.tsx'),
    route(':postId', './routes/post/$postId/__root.tsx', [
      index('./routes/post/$postId/_index.tsx'),
      route('delete', './routes/post/$postId/delete.tsx'),
      route('*', './routes/post/$postId/$.tsx'),
    ]),
    route(':postId/edit', './routes/post/$postId_edit.tsx'),
  ]),
  layout('./routes/[auth]/__layout.tsx', [
    route('login', './routes/[auth]/login.tsx'),
    route('register', './routes/[auth]/register.tsx'),
  ]),
  ...prefix(':lang?/product', [
    route('search?', './routes/(lang)/product/(search).tsx'),
    route(':productId', './routes/(lang)/product/$productId.tsx'),
  ]),
]
```

## Algorithm Logic

## Conversation Notes

All right, I've finalized the `routeManifest` conventions and simplified it a bit. Instead of using empty strings as keys I'm using `_` for index routes, and instead of always trying to match the keys to the filesystem conventions, I'm using `__` at the beginning to say "a layout with no route segment" and `_` at the end to say "optional segment". To escape parent layouts, I'm using `_` in between the parent segment and child segments, so now all of the unnecessary `/` slash characters can be removed, and that means we won't need `''` quotes to write any of the property names. As before, `$` before a route name means it is dynamic, and a lone `$` is a _splat route_, also called a catch-all route, which is done in Express with `*`.

Now I just need to think about the function logic, write notes that are a rough flow chart of what it needs to do, then write and test it. The end result will process the manifest into the route registration needed for React Router v7, and will also optionally log the step-by-step registry progress and can finish by logging the entire route structure in an easy-to-read format.

I won't repeat the example with all of the explict route file names or explain the filesystem conventions in detail. You can just see for yourself in the project code, when we collaborate. For now, I'll just show you how the shorthand version looks, now that I finalized the format. Any `true` can be replaced with an exact file name and location, and at first I'll do that, just to be clear, even though it isn't necessary. When we're both comfortable with the filesystem conventions we can switch to this abbreviated form.
