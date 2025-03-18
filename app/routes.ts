import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('./routes/_index.tsx'),
  route('demo', './routes/demo/__root.tsx', []),
] satisfies RouteConfig
