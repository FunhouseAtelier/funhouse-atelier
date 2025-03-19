# Funhouse Atelier (company website app)

## Changelog

## 2025-03-19

- revised link styling
- created colors demo page

## 2025-03-18

- installed `@funhouse-atelier/logger` dependency for custom logging
- removed React Route v7 boilerplate view
- replaced `@/public/favicon.ico` with brand icon
- added `@/public/image/` folder containing full company logo and thumbnail logo
- added `@/scripts/` folder with a testing script for the `makeRouteConfig` function
- added a `@/types/` folder with a global definition file to catch all dependencies with no types, like the `@funhouse-atelier/logger` package.
- added custom entries to `@/.gitignore`
- added `@/.prettierrc.json` for custom auto-formatting preferences with Prettier
- integrated custom brand color palette with Tailwind and set default background/text combinations for both light (default) and dark modes, according to browser settings
- set home page to show centered full logo with welcome heading and button for demo route
- stubbed-out demo route
- made home page link to demo route client-side navigation with prefetch on render
- stubbed out colors and routes demos
- fixed custom brand color palette integration with Tailwind (Coolers.co convention is higher shading numbers for lighter colors, but Tailwind uses higher numbers for darker colors)
