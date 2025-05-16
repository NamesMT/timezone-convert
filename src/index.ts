import type { TimezonesElement } from '#src/allTimezones.js'
import type { KeyedBy } from '@namesmt/utils'
import { allTimezones } from '#src/allTimezones.js'

export interface TimezonesElementMap {
  [key: string]: TimezonesElement
}

export const {
  ianaMap,
  windowsIdMap,
  windowsDisplayMap,
} = allTimezones.reduce((p, c) => {
  p.ianaMap[c.iana] = c
  p.windowsIdMap[c.windowsId] = c
  p.windowsDisplayMap[c.windowsDisplay] = c
  return p
}, {
  ianaMap: {},
  windowsIdMap: {},
  windowsDisplayMap: {},
} as Record<'ianaMap' | 'windowsIdMap' | 'windowsDisplayMap', TimezonesElementMap>) as {
  ianaMap: KeyedBy<typeof allTimezones, 'iana'>
  windowsIdMap: KeyedBy<typeof allTimezones, 'windowsId'>
  windowsDisplayMap: KeyedBy<typeof allTimezones, 'windowsDisplay'>
}

export function parseTzFromIana(iana: keyof typeof ianaMap | string): TimezonesElement | undefined {
  // @ts-expect-error index signature mismatch
  return ianaMap[iana]
}

export function parseTzFromWindowsId(windowsId: keyof typeof windowsIdMap | string): TimezonesElement | undefined {
  // @ts-expect-error index signature mismatch
  return windowsIdMap[windowsId]
}

export function parseTzFromWindowsDisplay(windowsDisplay: keyof typeof windowsDisplayMap | string): TimezonesElement | undefined {
  const _wD = windowsDisplay.match(/^(?:\(UTC(?:[+-]\d{1,2}(?::\d{2})?)?\) ?)?(.+)$/)?.[1]

  // @ts-expect-error index signature mismatch
  return windowsDisplayMap[_wD!]
}

export function parseTzAuto(str: keyof typeof ianaMap | keyof typeof windowsIdMap | keyof typeof windowsDisplayMap | string): TimezonesElement | undefined {
  return parseTzFromIana(str) ?? parseTzFromWindowsId(str) ?? parseTzFromWindowsDisplay(str)
}
