import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('./routes/_index.tsx'),
  route('demo', './routes/demo/__root.tsx', [
    index('./routes/demo/_index.tsx'),
    route('routes', './routes/demo/routes.tsx'),
    route('color', './routes/demo/color/__root.tsx', [
      index('./routes/demo/color/_index.tsx'),
      route(':color', './routes/demo/color/$color.tsx'),
    ]),
  ]),
] satisfies RouteConfig
