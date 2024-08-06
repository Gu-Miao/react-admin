import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import chalk from 'chalk'

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '../src')
const viewsDir = join(srcDir, 'views')
const componentsDir = join(srcDir, 'components')
const layoutDir = join(srcDir, 'layouts')

generate(getPath())

/** Get the path where the component should be generate. */
function getPath() {
  const config = { base: viewsDir }
  process.argv.forEach(arg => {
    if (arg.includes('path=')) {
      config.path = arg.split('path=')[1]
    } else if (arg === '-c') {
      config.base = componentsDir
    } else if (arg === '-l') {
      config.base = layoutDir
    }
  })
  if (!config.path) {
    console.error(chalk.red('No `path` found, please use `npm run gen path=xx/xx`'))
    process.exit(1)
  }
  return join(config.base, config.path)
}

/**
 * Generate component files
 *
 * @param {string} path Path where the component should be generate.
 *
 * @example
 *
 * `npm run gen path=Dashboard/Welcome`
 *
 * Default dir is `views`, this comand will create the following structure:
 *
 * ```text
 * - src/views/Dashboard/Welcome
 *  - Welcome.tsx
 *  - index.ts
 *  - Welcome.less
 * ```
 * @example
 *
 * `npm run gen path=MenuList -c`
 *
 * With `-c` argument, the basic dir now is `components`. This comand will create the following structure:
 *
 * ```text
 * - src/components/MenuList
 *  - MenuList.tsx
 *  - index.ts
 *  - MenuList.less
 * ```
 * @example
 *
 * `npm run gen path=UserLayout -l`
 *
 * With `-l` argument, the basic dir now is `layouts`. This comand will create the following structure:
 *
 * ```text
 * - src/layouts/UserLayout
 *  - UserLayout.tsx
 *  - index.ts
 *  - UserLayout.less
 * ```
 */
async function generate(path) {
  const name = getComponentName(path)
  const _path = getCapitalizePath(path)

  if (existsSync(_path)) {
    console.error(chalk.red(`Path ${path} have already existed`))
    process.exit(1)
  }

  mkdirSync(_path, { recursive: true })

  const promsies = [
    writeFile(join(_path, `${name}.tsx`), createTsx(name)),
    writeFile(join(_path, `${name}.less`), createLess(name)),
    writeFile(join(_path, 'index.ts'), createIndex(name))
  ]

  await Promise.all(promsies)

  console.log(chalk.green(`Successfully generates component: ${_path}`))
}

/**
 * Create tsx file.
 * @param {string} name Component name.
 */
function createTsx(name) {
  return `import './${name}.less'\n\nfunction ${name}() {\n  return <div className="${name}"></div>\n}\n\nexport default ${name}\n`
}

/**
 * Create less file
 * @param {string} name
 */
function createLess(name) {
  return `.${name} {}\n`
}

/**
 * Create index file.
 * @param {string} name Component name.
 */
function createIndex(name) {
  return `export { default as default } from './${name}'\n`
}

/**
 * Get component name.
 * @param {string} path component path.
 */
function getComponentName(path) {
  return capitalize(path.split(/[/\\]/).at(-1))
}

/**
 * Get path with Capitalize component
 * @param {string} path
 */
function getCapitalizePath(path) {
  const slices = path.split(/[/\\]/)
  const last = capitalize(slices.at(-1))
  slices.pop()
  return [...slices, last].join('/')
}

/**
 * Capitalize string
 * @param {string} str string
 */
function capitalize(str) {
  return str.at(0).toUpperCase() + str.substring(1)
}
