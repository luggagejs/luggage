#!/usr/bin/env node
// Prepares a release: bumps all packages to one version, commits and tags it.
// Pushing the tag starts .github/workflows/release.yml, which tests and publishes to npm.
//
//   node scripts/release.js <patch | minor | major | x.y.z> [--dry-run]
//
// All packages share one version (like lerna's fixed mode in 2.x), and the tag is v<version>.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const packagesDir = join(root, 'packages')
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/

const log = message => process.stdout.write(`${message}\n`)

const fail = message => {
  process.stderr.write(`release: ${message}\n`)
  process.exit(1)
}

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()

const parse = version => {
  const match = SEMVER.exec(version)
  return match && match.slice(1).map(Number)
}

const nextVersion = (current, bump) => {
  const [major, minor, patch] = parse(current)

  switch (bump) {
  case 'major':
    return `${major + 1}.0.0`
  case 'minor':
    return `${major}.${minor + 1}.0`
  case 'patch':
    return `${major}.${minor}.${patch + 1}`
  default: {
    const target = parse(bump)
    if (!target) {
      fail(`expected patch, minor, major or a version like 3.1.0, got "${bump}"`)
    }
    const currentParts = [major, minor, patch]
    const firstDifference = target.findIndex((part, i) => part !== currentParts[i])
    if (firstDifference === -1 || target[firstDifference] < currentParts[firstDifference]) {
      fail(`${bump} is not greater than the current version ${current}`)
    }
    return bump
  }
  }
}

const readPackages = () => readdirSync(packagesDir)
  .map(dir => join(packagesDir, dir, 'package.json'))
  .filter(path => existsSync(path))
  .map(path => {
    const text = readFileSync(path, 'utf8')
    return { path, text, json: JSON.parse(text) }
  })

// Internal dependencies move with the release: devDependencies point to the exact
// version so that yarn links the workspace package; peer ranges change on a major release.
const internalRange = (field, range, version) => {
  if (field === 'devDependencies') {
    return version
  }
  if (field !== 'peerDependencies') {
    return `^${version}`
  }
  const [major] = parse(version)
  const rangeMajor = range.match(/\d+/)
  return rangeMajor && Number(rangeMajor[0]) === major ? range : `^${major}.0.0`
}

const updateInternalDependencies = (json, names, version) => {
  for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    const deps = json[field] || {}
    Object.keys(deps)
      .filter(name => names.includes(name))
      .forEach(name => {
        deps[name] = internalRange(field, deps[name], version)
      })
  }
}

const main = () => {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const [bump] = args.filter(arg => arg !== '--dry-run')

  if (!bump) {
    fail('usage: node scripts/release.js <patch | minor | major | x.y.z> [--dry-run]')
  }

  const packages = readPackages()
  const versions = [...new Set(packages.map(p => p.json.version))]
  if (versions.length !== 1) {
    fail(`packages have different versions (${versions.join(', ')}); align them first`)
  }

  const current = versions[0]
  const version = nextVersion(current, bump)
  const tag = `v${version}`

  if (!dryRun) {
    if (git('status', '--porcelain')) {
      fail('the working tree has uncommitted changes')
    }
    const branch = git('rev-parse', '--abbrev-ref', 'HEAD')
    if (branch !== 'master') {
      fail(`releases are made from master, you are on ${branch}`)
    }
    if (git('tag', '--list', tag)) {
      fail(`tag ${tag} already exists`)
    }
  }

  const names = packages.map(p => p.json.name)

  for (const pkg of packages) {
    pkg.json.version = version
    updateInternalDependencies(pkg.json, names, version)
    const indent = /^\s+/m.exec(pkg.text)?.[0] ?? '  '
    const output = `${JSON.stringify(pkg.json, null, indent)}\n`
    log(`${pkg.json.name}: ${current} -> ${version}`)
    if (!dryRun) {
      writeFileSync(pkg.path, output)
    }
  }

  if (dryRun) {
    log(`dry run: would commit "Release ${tag}" and tag ${tag}`)
    return
  }

  git('add', ...packages.map(p => p.path))
  git('commit', '-m', `Release ${tag}`)
  git('tag', '-a', tag, '-m', tag)

  log(`\nCommitted and tagged ${tag}. To publish, push both:\n  git push origin master ${tag}`)
}

main()
