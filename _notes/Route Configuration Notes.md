# Route Configuration Notes

## `routeManifest` Syntax With Explicit Default File Paths

```js
const routeManifest = {
  _: './routes/_index.tsx', // index
  about: './routes/about.tsx', // leaf
  post: [
    './routes/post/__root.tsx', // branch (has `<Outlet />`, may have index)
    {
      new: './routes/post/new.tsx', // leaf
      $postId: [
        './routes/post/$postId/__root.tsx', // dynamic branch (has `<Outlet />`, may have index)
        {
          _: './routes/post/$postId/_index.tsx', // index
          edit: './routes/post/$postId/edit.tsx', // leaf
        },
        {
          delete: './routes/post/$postId/^delete.tsx', // leaf (escapes parent layout)
        },
      ],
    },
  ],
  wiki: {
    // prefix segment, no layout
    _$lang_: {
      // optional segment, no layout
      search: './routes/wiki/(lang)/search.tsx', // leaf
      $: './routes/wiki/(lang)/$.tsx', // splat
    },
  },
  __auth: [
    './routes/[auth]/__layout.tsx', // layout (has `<Outlet />`, no index)
    {
      login: './routes/[auth]/login.tsx', // leaf
      register: './routes/[auth]/register.tsx', // root
    },
  ],
}
```

## `makeRouteConfig` Expected Output

```js
const routeConfig = [
  index('./routes/_index.tsx'),
  route('about', './routes/about.tsx'),
  route('post', './routes/post/__root.tsx', [
    route('new', './routes/post/new.tsx'),
    route(':postId', './routes/post/$postId/__root.tsx', [
      index('./routes/post/$postId/_index.tsx'),
      route('edit', './routes/post/$postId/edit.tsx'),
    ]),
    route(':postId/delete', './routes/post/$postId/^delete.tsx'),
  ]),
  ...prefix('wiki', [
    route(':lang?/search', './routes/wiki/(lang)/search.tsx'),
    route(':lang?/*', './routes/wiki/(lang)/$.tsx'),
  ]),
  layout('./routes/[auth]/__layout.tsx', [
    route('login', './routes/[auth]/login.tsx'),
    route('register', './routes/[auth]/register.tsx'),
  ]),
]
```

## `routeManifest` Short-hand Syntax With Default File Paths

```js
// prettier-ignore
const routeManifest = {
  _: true,
  about: true,
  post: [true, {
    new: true,
    $postId: [true, { _: true, edit: true }, { delete: true }],
  }],
  wiki: { _$lang_: { search: true, $: true }},
  __auth: [true, { login: true, register: true }],
}
```

## `routeManifest` Collapsed Syntax With Explicit Default File Paths

```js
// prettier-ignore
const routeManifest = {
  _: './routes/_index.tsx',
  about: './routes/about.tsx',
  post: [ './routes/post/__root.tsx', {
    new: './routes/post/new.tsx',
    $postId: [ './routes/post/$postId/__root.tsx', {
      _: './routes/post/$postId/_index.tsx',
      edit: './routes/post/$postId/edit.tsx',
    }, {
      delete: './routes/post/$postId/^delete.tsx',
    }],
  }],
  wiki: { _$lang_: {
    search: './routes/wiki/(lang)/search.tsx',
    $: './routes/wiki/(lang)/$.tsx',
  }},
    __auth: [ './routes/[auth]/__layout.tsx', {
    login: './routes/[auth]/login.tsx',
    register: './routes/[auth]/register.tsx',
  }],
}
```

## ChatGPT

https://chatgpt.com/share/67d29a39-9ed8-8002-aee8-d81fb858132e
