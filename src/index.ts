import type { TimezonesElement } from './allTimezones'
import { keyBy } from '@namesmt/utils'
import { allTimezones } from './allTimezones'

export interface TimezonesElementMap {
  [key: string]: TimezonesElement
}

export const ianaMap = keyBy(allTimezones, 'iana') satisfies TimezonesElementMap
export const windowsIdMap = keyBy(allTimezones, 'windowsId') satisfies TimezonesElementMap
export const windowsDisplayMap = keyBy(allTimezones, 'windowsDisplay') satisfies TimezonesElementMap

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
