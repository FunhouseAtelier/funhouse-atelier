# Route Configuration Notes

## Registry Functions

### layout(filePath: string, nestedRoutes: [Function])

> Using `layout`, layout routes create new nesting for their children, but they don't add any segments to the URL. It's like the root route but they can be added at any level.

### index(filePath: string)

> Index routes render into their parent's `Outlet` at their parent's URL (like a default child route).

### route(urlPattern: string, filePath: string)

> Each route has two required parts: a URL pattern to match the URL, and a file path to the route module that defines its behavior.

### route(urlPattern: string, filePath: string, nestedRoutes: [Function])

> Routes can be nested inside parent routes.

### prefix(urlPrefix: string, nestedRoutes: [Function])

> Using `prefix`, you can add a path prefix to a set of routes without needing to introduce a parent route file.

## URL Pattern Conventions

### Dynamic Segments

> If a path segment starts with `:` then it becomes a "dynamic segment". When the route matches the URL, the dynamic segment will be parsed from the URL and provided as `params` to other router APIs.

### Optional Segments

> You can make a route segment optional by adding a `?` to the end of the segment.

### Splats

> Also known as "catchall" and "star" segments. If a route path pattern ends with `/*` then it will match any characters following the `/`, including other `/` characters.

> You can destructure the `*`, you just have to assign it a new name. A common name is `splat`:

```js
const { '*': splat } = params
```

### Component Routes

> You can also use components that match the URL to elements anywhere in the component tree:

```jsx
import { Routes, Route } from 'react-router'

function Wizard() {
  return (
    <div>
      <h1>Some Wizard with Steps</h1>
      <Routes>
        <Route
          index
          element={<StepOne />}
        />
        <Route
          path="step-2"
          element={<StepTwo />}
        />
        <Route
          path="step-3"
          element={<StepThree />}
        />
      </Routes>
    </div>
  )
}
```

> Note that these routes do not participate in data loading, actions, code splitting, or any other route module features, so their use cases are more limited than those of the route module.

## Custom Route Registry Object

### Goal

Create a utility function `makeRouteConfig` that takes a `RouteManifest`, a POJO of configuration data as input, then outputs a `routeConfig` array to be exported by `@/app/routes.ts`. The hierarchy should be based on the filesystem conventions.

The `RouteManifest` should be as easy to write as possible, while allowing all of the flexibility of the conventional React Router method (each entry that corresponds to a route module file can be mapped to any file within `@/app/`).

### File System Conventions

- All root route module file names inside of a folder (because there are nested routes) start with a `__` dunder and are named `__root.tsx` by deault.
- All index route module file names start with a `_` underscore and are named `_index.tsx` by default.
- All child routes with nested layouts are contained in a folder with the same name as the parent route module file.
- Dynamic route segments are represented with a `$` dollar sign in place of the standard `:` colon, like in Remix.
- Splat route segments are represented with a lone `$` dollar sign, like in Remix.
- Nested route segments that do not use a nested layout in the parent are named like Remix flat routes, but instead of a `.` dot as the segment delimiter, I'm using a `^` carat to sort them all beneath the parent segment route module file.
- Layout routes are used for shared/nested layouts without adding a route segment, and are done with a folder name wrapped in `[]` square brackets. Instead of `__root.tsx`, the filename `__layout.tsx` is the default.
- Route prefixes are done with folders where there is no root route module file.
- Optional segments are done with folders or files where the name is wrapped in `()` parentheses.

### Example Output

Based on the [React Router Routing Doc](https://reactrouter.com/start/framework/routing), with an additional ChefFree example of opting out of nested layouts:

```js
const routeConfig = [
  index('./home.tsx'),
  route('about', './about.tsx'),

  layout('./auth/layout.tsx', [
    route('login', './auth/login.tsx'),
    route('register', './auth/register.tsx'),
  ]),

  ...prefix('concerts', [
    index('./concerts/home.tsx'),
    route(':city', './concerts/city.tsx'),
    route('trending', './concerts/trending.tsx'),
  ]),

  route('dashboard', './dashboard.tsx', [
    index('./home.tsx'),
    route('settings', './settings.tsx'),
  ]),

  route(':lang?/categories', './categories.tsx'),
  route('users/:userId/edit?', './user.tsx'),

  route('files/*', './files.tsx'),

  route('recipe', './recipe.tsx', [
    route(':recipeId', './recipe/show.tsx', [
      route('delete', './recipe/delete.tsx'),
    ]),
    ...prefix(':recipeId', [route('edit', './recipe/edit.tsx')]),
  ]),
]
```

### Example Input

#### With Default Naming and Location

```js
const routeManifest = {
  '/': true,
  '/about': true,
  '/[auth]': {
    '': true,
    '/login': true,
    '/register': true,
  },
  '/concerts': {
    '/': true,
    '/$city': true,
    '/trending': true,
  },
  '/dashboard': {
    '': true,
    '/': true,
    '/settings': true,
  },
  '/(lang)': {
    '/categories': true,
  },
  '/users': {
    '/$userId': {
      '/(edit)': true,
    },
  },
  '/files': {
    '/$': true,
  },
  '/recipe': {
    '': true,
    '/$recipeId': {
      '': true,
      '/delete': true,
    },
    '/$recipeId/edit': true,
  },
}
```

#### With Custom Naming and Location

```js
const routeManifest = {
  '/': './home.tsx',
  '/about': './about.tsx',
  '/[auth]': {
    '': './auth/layout.tsx',
    '/login': './auth/login.tsx',
    '/register': './auth/register.tsx',
  },
  '/concerts': {
    '/': './concerts/home.tsx',
    '/$city': './concerts/city.tsx',
    '/trending': './concerts/trending.tsx',
  },
  '/dashboard': {
    '': './dashboard.tsx',
    '/': './home.tsx',
    '/settings': './settings.tsx',
  },
  '/(lang)': {
    '/categories': './categories.tsx',
  },
  '/users': {
    '/$userId': {
      '/(edit)': './user.tsx',
    },
  },
  '/files': {
    '/$': './files.tsx',
  },
  '/recipe': {
    '': './recipe.tsx',
    '/$recipeId': {
      '': './recipe/show.tsx',
      '/delete': './recipe/delete.tsx',
    },
    '/$recipeId/edit': './recipe/edit.tsx',
  },
}
```

### Algorithm Logic

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
