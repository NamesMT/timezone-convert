import type { TimezonesElement } from '#src/types.js'
import { ianaMap, windowsDisplayMap, windowsIdMap } from '#src/dataMaps.js'

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
