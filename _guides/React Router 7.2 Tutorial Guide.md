# React Router 7.2 Tutorial Guide

## Tutorial URL

[Address Book | React Router](https://reactrouter.com/tutorials/address-book)

For the tutorial they give you a template with hard-coded data and styles. Your task is to build out the structure and functionality, using React Router (formerly Remix) techniques to create routes and make the content dynamic, with a nice user experience (UX).

This will introduce you to the fundamental concepts of what makes React Router special and powerful, using the kinds of components you'll see in many different apps, including CRUD operations on a simulated database and real-time tracking of a Search input field to give immediate updates in the list of search results, with no need to click a button or refresh the page. You'll also see how nested routes can represent sections of the page, making it easier to break down your data fetching by route, which is useful for search engine optimization (SEO) and URL-sharing purposes.

## Video Walkthrough

This is new. Before the tutorial was only instructions in the docs, but now they've made a video so you can watch someone else following the instructions if that helps. The video is only 35 minutes, and the tutorial says to expect to spend 30-45 minutes doing it, but don't feel pressured to complete it in that amount of time. It's more important that you focus on trying to learn the techniques, no matter how long that takes. It took me 60-90 minutes the first time, and you will be splitting your attention between the React Router docs, this guide, and maybe the video walkthrough, plus the tutorial is somewhat longer than before, but that's not a problem and this is not a race. Take your time.

## Setup

### Generate a basic template

Create a new React Router app, using the address book tutorial template.

```bash
npx create-react-router@latest --template remix-run/react-router/tutorials/address-book
```

While `npm` will install a package in an existing project, `npx` can be used to create new projects and also many other things that Node scripts can do.

`create-react-router` is the command to generate the boilerplate for a new React Router project.

The `@latest` part does exactly what it looks like, it says "install the latest _stable_ version". At this time it is **React Router 7.2.0**.

### Start the app

Rather than `cd` into the new project directory, you should open the new folder with VS Code, using `File > Open Folder...` in the menu bar. Whenever you work on a project it is best to do that. It makes managing the git repository much easier in VS Code, because it is the only one in the VS Code workspace root folder, which is what you choose with `File > Open Folder...`. Having multiple repos in that folder means multiple repos in the VS Code Source Control (i.e., git) sidebar, which can get confusing. Also it is easier to create and publish to GitHub a new repo when that is the workspace root folder, you can just click the buttons for those actions in the Source Control sidebar and they will make/publish the repo based on the workspace root folder.

If you told the installer "Yes" to install the NPM packages for you then you don't need to do it again.

Although you did not use Vite to install the project, you're still using Vite to run the development web server, the command is still `npm run dev`, and the port number is still `5173`. Nothing new there.

## The Root Route

`@/app/root.tsx` is like the `@/src/App.jsx` file in a React app created by Vite.

The `@/src/main.jsx` (entry-point) file is replaced in React Router with hidden files that you should not ever need to view or modify unless you want to do something very hacky with the framework.

## The Contact Route UI

### Create a contact route module

All routes in Remix have a sepcific route file. That file can handle a GET request, a POST request, or both, but there are no other options, so forget about PUT, PATCH, DELETE, and all that other jazz. It's just GET and/or POST.

Conventionally, all route files go in the `@/app/routes` folder.

Ignore "file-based routing". That was how Remix v2 did it, which was not bad for very basic apps, but for large apps it made the `@/app/routes` folder difficult to manage because there were no nested folders, all of the route files were at the root level of the folder.

### Configure the route

The `@/app/routes.ts` file is like a registry of all routes in the app. For a route to exist, it must be registered here, inside the default export (an array), using a `route` function, and passing two strings to the function, where the first string is the route and the second string is the location of the file within the `@/app/` folder.

Note that you don't need to start the route string with a `/` slash, although it is common for it to be done that way in other contexts, like an Express route handler.

### Add the contact component UI

Whenever the tutorial says something like "feel free to copy/paste" I recommend doing that. The purpose of the tutorial is not to exercise your Monkey See, Monkey Do ability.

## Nested Routes and Outlets

This is one of the most powerful features of React Router, the ability to break down page content by the route segments, just like breaking down a large component into sub-components. That means navigation to different routes doesn't need to cause a full page reload, it can just change one section of the page content, without reloading other sections that will stay the same.

### Render an `<Outlet />`

This component tells React Router where to render a nested child route, and the nested routes can go as many levels deep as you need, so a route like `post/:postId/comment/:commentId` could have an `<Outlet />` at `post`, another at `post/:postId` and yet another at `post/:postId/comment`, so the entire view is actually a combination of 4 different route files, each one a React function component.

## Client Side Routing

Great for your app's performance!

### Change the sidebar `<a href>` to `<Link to>`

Use React Router's `<Link>` component to do client-side routing. Using the `<a>` tag for navigating to another route within your app will always cause a full page reload, even when it is not necessary.

## Loading Data

### Export a `clientLoader` function from `app/root.tsx` and render the data

The `clientLoader` function is useful for Single-Page Apps (SPAs), like in this tutorial, but for other apps you will use the regular `loader` function much more.

There are limitations to `clientLoader`. For example, you can't use your secrets in a `clientLoader`, or else they would be exposed, so how would you do database operations? If you wanted to do it with `clientLoader` you would need to set up an API endpoint on your server for `getContacts` to send a request to, then get the data back as a response. That is done using JavaScript's built-in `fetch()` function.

In the tutorial the database operations are simulated with functions that read the hard-coded data in a file, so no secrets or API endpoints are needed.

## Type Safety

### Add the `ComponentProps` type to the `App` component

Here's your first TypeScript example to learn. TS needs you to tell it what is acceptable to be passed as props to a route component. That requires you to define or (in this case) import the _type_ that defines what the props can be, then refer to it after the destructured props, in this case `{ loaderData }` by using a `:` colon and then the type name, in this case `Route.ComponentProps`.

React Router takes care of defining this _type_ exactly as it should be automatically, by scanning the project files at compile time and regenerating the TypeScript types based on what it finds.

## Adding a `HydrateFallback`

### Add a `HydrateFallback` export

This is similar to how a `<Suspense>` boundary works, but it works for the entire page and is done by exporting a function named `HydrateFallback` from the `@/app/root.tsx` file that returns the fallback JSX for the entire page, because even a simple loading message is better UX than a blank page.

## Index Routes

### Create an index route for the root route

If a route is an index route, then it must be registered in the `@/app/routes.ts` file using an `index()` function call, instead of a `route()` function call, and there is no route string argument. Where the `index()` is nested will make it clear what route it applies to, in this case the root route, so `http://localhost:5173/` by default (in development).

### Fill in the index component's elements

Just like any other route file, an index route file has a default export that is a React function component.

## Adding an About Route

### Create the about route

Simple enough.

### Add the about page UI

More copy-pasta.

### Add a link to the about page in the sidebar

Hook it up, navigate to it, and watch it take the place of the index content.

## Layout Routes

### Create a layout route for the sidebar

In React Router layout routes are not just templates or boilerplate, they control how the routes and views are nested and can also group together routes that all need access to the same data from a database or API.

### Move route definitions under the sidebar layout

To have the routes nested the way you want, when you register them in the `@/app/routes.ts` file you can import and call the `layout()` function, which takes two arguments: 1. the layout route file location (inside of `@/app/`). 2. An array of routes to nest inside that layout.

### Move the layout and data fetching to the sidebar layout

Refactoring to put the sidebar, and the data loading function, in the new layout, so it is viewed separately from the stand-alone About route.

## Pre-rendering a Static Route

When a route has entirely static content, nothing that is meant to be changed client-side, in the browser, it is better to render it all on the server and just send the rendered content to the browser to display.

### Pre-render the about page

You can selectively pre-render static routes in the `@/react.router.config.ts` file. The tutorial says the file is located at `@/app/react.router.config.ts`, but that is incorrect. It's not in the `@/app/` folder, it's in the project root folder.

## Server-Side Rendering

### Enable server-side rendering

You can also enable server-side rendering (SSR) for all routes in the `@/react.router.config.ts` file.

### Switch to using `loader` to fetch data

The important thing to understand here is that `loader` **only runs on the server**, while `clientLoader` **only runs on the client**. Because Express was 100% SSR, all of the data loading done in that framework was on the server. The techniques are rather different for loading data on the client, because it is not a secure environment, like your web server. If you want to develop SPAs you'll benefit from learning how to fetch data client-side, but SPAs are over-rated in my opinion and there are multiple drawbacks to them, including app performance and sub-standard search-engine optimization.

## URL Params in Loaders

### Click on one of the sidebar links

It's working!

### Add a `loader` function to the contact page and access data with `loaderData`

If you destructure the argument passed to `loader`, one of the properties is `params`. It contains the actual string used for a dynamic route segment, like `:id`. In Express you'd need to reference `req.params.id`, but in React Router it's just `params.id`.

## Throwing Responses

Note that there is no `res` in React Router. No response object is made for you, and you can't call methods like `res.send()` or `res.render()`. Instead you create a `new` instance of the `Response` object, which the MDN docs can tell you all about:

[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

## Data Mutations

The key piece of information here is that React Router changes the normal behavior of form submission, so the request is intercepted by an `action` function.

## Creating Contacts

### Export an `action` function from `app/root.tsx`

The `action` function is the counterpart to the `loader` function. It runs (server-side) every time a POST request is made to the route, and then it can redirect to another route, the typical behavior for a POST route handler, but the result of saving changes to the database doesn't need to reload the entire route or page, or anything really, it can just return data to the route component, like the `loader` function does.

This enhancement of form submissions is built into React Router's `<Form>` component.

## Updating Data

The `U` in CRUD! Nuff said.

### Create the edit contact route

It needs to be registered inside the `layout("layouts/sidebar.tsx")`, because it shares a layout with the sidebar.

### Add the edit page UI

Copy-pasta.

## Updating Contacts with `FormData`

### Add an `action` function to the `edit` route

How to access the form data in the `action` function, something you'll probably do a lot of. The form data comes in a stream from the browser, so you need to `await request.formData()` to get it, and then it's an instance of the `FormData` class, so to convert it to a _plain-old JavaScript object_ (POJO) you can pass the raw form data to `Object.fromEntries()`.

## Mutation Discussion

For more information about how form data is accessed in JavaScript, check this MDN doc about the `FormData` class:

[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

## Redirecting new records to the edit page

Sure, that's good, intuitive UX.

### Redirect to the new record's edit page

In Express you use `res.redirect()`, but in React Router you import and call a `redirect()` function instead.

## Active Link Styling

Using `<NavLink>` and a function to determine your classes, so that the styles will be automatically applied based on the current URL. Nifty!

It works by hijacking the `className` prop so it can take a function and pass two boolean variables named `isActive` and `isPending` to the function, so they can be used for conditional styling.

## Global Pending UI

Nicer UX.

### Use `useNavigation` to add global pending UI

React Router includes a `useNavigation` hook that can be used to track the current state of navigation in the browser, which is also good for conditionally disabling controls when the browser is busy loading new content.

## Deleting Records

### Configure the "destroy" route module

### Add the destroy action

Routes don't need to have a view, they can just be route handlers that just return data or redirect to another route when finished. Routes that do not have a view are called _resource routes_ in React Router.

## Cancel Button

You'll probably often want to have a cancel button. This is how that can work nicely in React Router.

### Add the cancel button click handler with `useNavigate`

An example of how `navigate(-1)` means the same as the back button in the browser, and this works particularly well with client-side navigation and nested routes of content in the same page/layout.

## `URLSearchParams` and `GET` Submissions

### Type a name into the search field and hit the enter key

This is what happens when a form submits a GET request instead of a POST request, so it's commonly used for searches and pagination.

### Filter the list if there are `URLSearchParams`

As opposed to the route params in the URL, like `:contactId`, the `URLSearchParams` are the last part of the url (if it exists), like `?search=react&page=1`. In Express you'd access that with `req.query.search` and `req.query.page`. This is the React Router way to do it, extracting them manually from the `request.url` object instead.

## Synchronizing URLs to Form State

Neat-o. Useful for forms that submit GET requests.

### Return `q` from your `loader`, set it as the input's default value

Better UX for a search.

### Synchronize input value with the `URLSearchParams`

Also useful for when people navigate to search results by clicking a link or pasting the URL into their browser.

## Submitting `Form`'s `onChange`

Well, since submitting a form each time doesn't necessarily mean making another request to the web server, why not submit automatically for something like a search bar? This can be accomplished with the `onChange` event prop on the `<Form>` component and the `useSubmit` hook, which returns a `submit` function for programmatically submitting form data any time you want, not only when the user chooses to submit it.

## Adding Search Spinner

Better UX.

### Add a variable to know if we're searching

Another benefit of the `useNavigation()` hook.

### Add classes to search form elements using the new `searching` state

Now you can apply conditional styling and visibility based on whether search results are pending or not.

## Managing the History Stack

Much better UX, and many tutorials completely ignore this.

### Use `replace` in `submit`

The `submit()` function call used to automatically submit the form after any change also takes an options object as the second argument, and the `replace` option tells the browser not to track the last URL in the browser history, to just replace it with the new URL.

## `Form`s Without Navigation

You don't even need to navigate anywhere when submitting a form.

### Change the `<Favorite>` form to a fetcher form

By prefixing the `<Form>` component with `fetcher.` you can: 1. track the status of form submissions and the form data sent with them. 2. Submit a form to the `action` function without navigating anywhere.

### Create the `action`

Then the `action` function can do a database operation and return the result data (or error messages) to the component.

## Optimistic UI

Better UX.

### Read the optimistic value from `fetcher.formData`

By using `fetcher` to check the form data upon submission, before it is sent to the web server, you can optimistically assume success and update the DOM before a response comes back from the server.

In the tutorial a ternary operator is used to check if any form data has been submitted yet. If it has, then use the value of the `favorite` entry in the form data to determine if the star should be highlighted. If no form data has been submitted yet, use the data from the database to determine it. Now the toggle is immediate, no lag.

## Congratulations

You're done with the tutorial! Combined with what you've already learned about React, you are now ready to start working on React Router projects!
