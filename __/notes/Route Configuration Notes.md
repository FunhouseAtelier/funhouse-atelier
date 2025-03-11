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
  __auth: [
    './routes/[auth]/__layout.tsx', // layout (has `<Outlet />`, no index)
    {
      login: './routes/[auth]/login.tsx', // leaf
      register: './routes/[auth]/register.tsx', // root
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

## Explanation

I've finalized the way the `routeManifest` object will be written and came up with an example that will show all of the options. The example is a video game fandom app that has forum posts, a wiki of articles about the game, and user accounts. The way that might start out would normally be written like this in RRv7:

But if my `makeRouteConfig` function is used, and the default file/folder names are all accepted, the above will all be reducible to this:

Although it's brief, there's a lot going on there. Each `true` represents a separate route module file that will need to be written, 13 in total (good thing I'm not superstitious).

First of all I used a `// prettier-ignore` comment to tell the Prettier auto-formatter not to touch the next statement, so it will not try to format anything in the `routeManifest` variable definition. Normally I like how it expands arrays and objects onto new lines, but in this case I'm looking to collapse some of them, to make the code as compact as possible, while still fairly readable.

`_` is an index route. It's what renders if no child route is being viewed, so the first `_` is the home page.

`about` is a leaf. It has no children, it's just a stand-alone page.

`post` is a branch with a layout. Inside that layout it can render the `new` post form or it can show a post `$postId` (dynamic route).

Each "show post" route has it's own layout too, and the `_` and `edit` child routes use that layout, but the `delete` child route does not, which is why they are in different objects in the manifest.

`wiki` is where the game wiki articles are found, but there is nothing rendered and no layout for just `/wiki`

`_$lang_` is an optional, dynamic segment for language localization, as I explained before.

`search` is a special search page for the wiki

`$` is a splat route, a catch-all, so unless the user navigated to `search` it will be caught by this route, even if there are nested segments like `/wiki/achievements/steam/rare`. That's what catch-all means, not just one segment of the route being dynamic.

`__auth` gives the login and register pages a shared layout (makes sense), but without adding a route segment, so the routes are still just `/login` and `/register`.

Now I will finally write the function, which I've been thinking a lot about so I can make it work as painlessly as possible. That means considering things like if there's a dynamic segment or splat route, I might need to make sure those are registered after the static routes, so that the catch-all or dynamic route doesn't intercept those requests. I don't know how that works yet, but I'm about to find out. Other than that I think the logic should not be too difficult, and I plan to add verbose logging so it will log everything it does and can print out a report of the app's routing system in various formats, like the filesystem structure, the route tree structure, or a flat-map of all routes. That will be the first demo page, then I'll do the brand colors demo page and share what I've done with you.

---

That's the idea! It isn't easy to know right from the start how best to generalize a component, but that's fine. You can start by making one for a specific use, then adapt it so it can be used in another context, and then eventually you get an idea how to make it so generic that you could plug it in to many different projects.

And yeah, with React you're really seeing how to leverage functions in different ways, like having a function to render and re-render a component or being able to pass a function to a component in a prop. That is very common to do in React, because you have everything split up into components, but sometimes an event that happens in a component, like a click, needs to be accessed by a parent component.

You can easily pass a value from parent component to child component, using props, but there's no way to simply pass a value from child to parent, like a reverse prop. But what you can do is pass a function that the child will call, but it runs in the parent scope where it is defined.

Thus you see how to make a custom button component that can communicate to its parent component that it has been clicked, and then the parent component gets to decide exactly what happens then, while the child component is agnostic about that, it just runs whatever function it is given when it is clicked, so that custom button component can be used to do anything. Of course it can be done for _any_ event, not just a click. And by default React will pass the event object to the function automatically, which can be used to gather more information about the event and the element it happened on.

That means, for example, if you have a bunch of list items and you want the click handler function to figure out which one was clicked, you have options:

- Pass something like a `listItemId` to the click handler function, or whatever you used for the `key=` prop.

- Uniquely identify each list item in the DOM, using the `id=` attribute, so maybe `id={'list-item-' + listItemId}`. If each list item has a unique ID like that then you don't need to pass anything to the click-handler function, you can just pass the function name to the prop, and then in the click handler function if the paramter is named `event`, that will be the event object. The element that triggered the event is `event.target`, and that means `event.target.id` will tell you the value of the `id` attribute, so you can use that to figure out which one was clicked.

```js
export default function List() {
  const list = getList()
  const handleClick = (event) => {
    console.log(`You clicked on the list item with the ID: ${event.target.id}`)
  }
  return (
    <ul>
      {list.map((item) => (
        <li
          id={'list-item-' + item.id}
          onClick={handleClick}
        >
          {item.text}
        </li>
      ))}
    </ul>
  )
}
```
