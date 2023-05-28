#!/usr/bin/env node

const { Command } = require('commander')
const init = require('./bin/init.js')
const touch = require('./bin/touch.js')
const download = require('./bin/download.js')
const seed = require('./bin/seed.js')
const mirror = require('./bin/mirror.js')
const serve = require('./bin/serve.js')
const ls = require('./bin/ls.js')
const put = require('./bin/put.js')
const entry = require('./bin/entry.js')
const get = require('./bin/get.js')
const rm = require('./bin/rm.js')
const info = require('./bin/info.js')
const purge = require('./bin/purge.js')

const program = new Command()

program
  .description('CLI to seed, mirror, and serve a Hyperdrive or Localdrive')

program.command('init')
  .description('Initializes a new storage on the cwd')
  .action(init)

program.command('touch')
  .description('Create a writable Hyperdrive')
  .option('--storage <path>', 'Storage path')
  .action(touch)

program.command('mirror')
  .description('Mirror a drive into another drive')
  .argument('<src>', 'Source drive (key or path)')
  .argument('[dst]', 'Destination drive (key or path)')
  .option('--live', 'Enables real-time sharing')
  .option('--prefix <path>', 'Prefix entries path')
  .option('--filter [ignore...]', 'Ignore entries')
  .option('--dry-run', 'Disables writing')
  .option('--verbose', 'Print more information')
  .option('--storage <path>', 'Storage path')
  .action(mirror)

program.command('ls')
  .description('List files of the drive')
  .argument('<src>', 'Source drive (key or path)')
  .argument('[path]', 'Filename')
  .option('--prefix <path>', 'Prefix entries path')
  .option('--storage <path>', 'Storage path')
  .action(ls)

program.command('seed')
  .description('Seed a Hyperdrive to the DHT network')
  .argument('[key]', 'Drive public key')
  .option('--storage <path>', 'Storage path')
  .action(seed)

program.command('download')
  .description('Archive download a Hyperdrive by key')
  .argument('<key>', 'Drive public key')
  .option('--storage <path>', 'Storage path')
  .action(download)

program.command('serve')
  .description('Creates a HTTP drive server')
  .argument('<src>', 'Source drive (key or path)')
  .option('--host <address>', 'Bind to address')
  .option('--port <number>', 'Bind to port')
  .option('--disable-any-port', 'Disable random port if port in use')
  .option('--verbose', 'Print more information')
  .option('--storage <path>', 'Storage path')
  .action(serve)

program.command('put')
  .description('Create a file')
  .argument('<src>', 'Source drive (key or path)')
  .argument('<path>', 'Filename')
  .argument('<blob>', 'Content')
  .option('--storage <path>', 'Storage path')
  .action(put)

program.command('entry')
  .description('Show a single entry file')
  .argument('<src>', 'Source drive (key or path)')
  .argument('<path>', 'Filename')
  .option('--storage <path>', 'Storage path')
  .action(entry)

program.command('get')
  .description('Show the file content')
  .argument('<src>', 'Source drive (key or path)')
  .argument('<path>', 'Filename')
  .option('--storage <path>', 'Storage path')
  .action(get)

program.command('rm')
  .description('Delete a file')
  .argument('<src>', 'Source drive (key or path)')
  .argument('<path>', 'Filename')
  .option('-r, --recursive', 'Recursively delete all sub files')
  .option('--storage <path>', 'Storage path')
  .action(rm)

program.command('info')
  .description('Show info about the Hyperdrive')
  .argument('<key>', 'Drive public key')
  .option('--storage <path>', 'Storage path')
  .action(info)

program.command('purge')
  .description('Delete all local storage of the drive')
  .argument('<key>', 'Drive public key')
  .option('--storage <path>', 'Storage path')
  .action(purge)

program.parseAsync()
