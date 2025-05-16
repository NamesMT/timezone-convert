#!/usr/bin/env node

import { parseTzAuto, parseTzFromIana, parseTzFromWindowsDisplay, parseTzFromWindowsId } from '#src/parse.js'
import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'timezone-convert',
    description: 'Convert between timezone formats',
  },
  args: {
    input: {
      type: 'positional',
      description: 'The input timezone value',
      required: true,
      valueHint: 'Europe/Athens',
    },
    format: {
      type: 'string',
      description: `The format of the input: 'auto', 'iana', 'windowsId', 'windowsDisplay'`,
      default: 'auto',
      valueHint: 'auto',
    },
  },
  async run({ args }) {
    const {
      input,
      format,
    } = args

    const tz = (() => {
      switch (format) {
        case 'auto':
          return parseTzAuto(input)
        case 'iana':
          return parseTzFromIana(input)
        case 'windowsId':
          return parseTzFromWindowsId(input)
        case 'windowsDisplay':
          return parseTzFromWindowsDisplay(input)
        default:
          throw new Error('Invalid format')
      }
    })()

    if (!tz)
      throw new Error(`Input value parse resulted not found`)

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(tz, null, 2))
  },
})

runMain(main)
