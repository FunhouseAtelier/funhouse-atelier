import logger from '@funhouse-atelier/logger'

const log = logger({ name: '@/scripts/make-route-config.js', level: 0 })
log.debug('logger instantiated')

const regexByKeyPattern = {
  layout: /^__[a-zA-Z0-9]+$/,
  index: /^_$/,
  staticRoute: /^[a-zA-Z0-9]+$/,
  dynamicRoute: /^\$[a-zA-Z0-9]+$/,
  staticOptional: /^_[a-zA-Z0-9]+_$/,
  dynamicOptional: /^_\$[a-zA-Z0-9]+_$/,
  splat: /^\$$/,
}

const regexForValidPattern = new RegExp(
  Object.values(regexByKeyPattern)
    .map((regex) => regex.source)
    .join('|')
)

const singletonPatterns = ['layout', 'index', 'splat']
const routePatterns = ['staticRoute', 'dynamicRoute']
const optionalPatterns = ['staticOptional', 'dynamicOptional']

// prettier-ignore
const routeManifest = {
  // _about_: true, // error test: duplicate optional static
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
    _$postId_: true, // error test: duplicate optional dynamic
  }],
  __auth: [ './routes/[auth]/__layout.tsx', {
    login: './routes/[auth]/login.tsx',
    register: './routes/[auth]/register.tsx',
  }],
  wiki: { _$lang_: {
    search: './routes/wiki/(lang)/search.tsx',
    $: './routes/wiki/(lang)/$.tsx',
  }},
  // '#': true, // error test: invalid key
  // _post_: true, // error test: duplicate optional static
}

export function makeRouteConfig(manifest, options) {
  log.info('makeRouteConfig() called')
  log.debug('manifest =', manifest)
  const routeConfig = []
  const rootKeysByPattern = {
    layout: [],
    index: [],
    staticRoute: [],
    dynamicRoute: [],
    staticOptional: [],
    dynamicOptional: [],
    splat: [],
  }
  const rootKeys = Object.keys(manifest)
  log.debug('rootKeys =', rootKeys)
  try {
    rootKeys.forEach((key) => {
      // check validity of key
      if (!regexForValidPattern.test(key))
        throw `invalid key in route manifest: "${key}"`

      // categorize keys that cannot have duplicates
      singletonPatterns.forEach((pattern) => {
        if (regexByKeyPattern[pattern].test(key))
          rootKeysByPattern[pattern].push(key)
      })

      // categorize keys for standard routes
      routePatterns.forEach((pattern) => {
        if (regexByKeyPattern[pattern].test(key)) {
          const modality = pattern.split('Route')[0]
          const isDuplicate = rootKeysByPattern[modality + 'Optional'].includes(
            '_' + key + '_'
          )
          if (isDuplicate) {
            throw `conflicting mandatory and optional routes using the same ${modality} name: "${key}"`
          }
          rootKeysByPattern[pattern].push(key)
        }
      })

      // categorize keys for optional segments
      optionalPatterns.forEach((pattern) => {
        if (regexByKeyPattern[pattern].test(key)) {
          const modality = pattern.split('Optional')[0]
          const baseName = key.slice(1, -1)
          const isDuplicate =
            rootKeysByPattern[modality + 'Route'].includes(baseName)
          if (isDuplicate) {
            throw `conflicting optional and mandatory routes using the same ${modality} name: "${baseName}"`
          }
          rootKeysByPattern[pattern].push(key)
        }
      })
    })
    log.debug('rootKeysByCategory =', rootKeysByPattern)

    // register any leaves
    // - index
    if (rootKeysByPattern.index.length) {
      routeConfig.push(`  index("./routes/_index.tsx"),`)
    }

    // - static
    rootKeysByPattern.staticRoute.forEach((key) => {
      if (manifest[key] === true || typeof manifest[key] === 'string') {
        routeConfig.push(`  route("${key}", "./routes/${key}.tsx"),`)
      }
    })

    // - dynamic
    rootKeysByPattern.dynamicRoute.forEach((key) => {
      if (manifest[key] === true || typeof manifest[key] === 'string') {
        const baseName = key.slice(1)
        routeConfig.push(`  route(":${baseName}", "./routes/${key}.tsx"),`)
      }
    })

    // register any branches
    // - static
    rootKeysByPattern.staticRoute.forEach((key) => {
      if (Array.isArray(manifest[key])) {
        // route
        routeConfig.push(`  route("${key}", "./routes/${key}/__root.tsx", [`)
        // TODO: process children
        routeConfig.push(`  ]),`)
      } else if (typeof manifest[key] === 'object') {
        // prefix
        routeConfig.push(`  ...prefix("${key}", [`)
        // TODO: process children
        routeConfig.push(`  ]),`)
      } else {
        // TODO: handle error
      }
    })

    // - dynamic
    rootKeysByPattern.dynamicRoute.forEach((key) => {
      const baseName = key.slice(1)
      if (Array.isArray(manifest[key])) {
        // route
        routeConfig.push(
          `  route(":${baseName}", "./routes/${key}/__root.tsx", [`
        )
        // TODO: process children
        routeConfig.push(`  ]),`)
      } else if (typeof manifest[key] === 'object') {
        // prefix
        routeConfig.push(`  ...prefix(":${baseName}", [`)
        // TODO: process children
        routeConfig.push(`  ]),`)
      } else {
        // TODO: handle error
      }
    })

    // register any optionals

    // register any layouts
    rootKeysByPattern.layout.forEach((key) => {
      const baseName = key.slice(2)
      if (Array.isArray(manifest[key])) {
        // route
        routeConfig.push(`  layout("./routes/[${baseName}]/__layout.tsx", [`)
        // TODO: process children
        routeConfig.push(`  ]),`)
      } else {
        // TODO: handle error
      }
    })

    // register any splats
  } catch (e) {
    log.error('÷÷÷÷÷ ' + e + ' ÷÷÷÷÷')
  }
  return routeConfig
}

const routeConfig = makeRouteConfig(routeManifest)

log.info('routeConfig = [\n', ...routeConfig.map((el) => el + '\n'), ']')
