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
    route('colors', './routes/demo/colors.tsx'),
    route('routes', './routes/demo/routes.tsx'),
  ]),
] satisfies RouteConfig
