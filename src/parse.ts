import type { TimezonesElement } from '#src/types.js'
import { ianaMap, windowsDisplayMap, windowsIdMap } from '#src/dataMaps.js'

export function parseTzFromIana(iana: string): TimezonesElement | undefined {
  return ianaMap[iana]
}

export function parseTzFromWindowsId(windowsId: string): TimezonesElement | undefined {
  return windowsIdMap[windowsId]
}

export function parseTzFromWindowsDisplay(windowsDisplay: string): TimezonesElement | undefined {
  const _wD = windowsDisplay.match(/^(?:\(UTC(?:[+-]\d{1,2}(?::\d{2})?)?\) ?)?(.+)$/)?.[1]

  return _wD ? windowsDisplayMap[_wD] : undefined
}

export function parseTzAuto(str: string): TimezonesElement | undefined {
  return parseTzFromIana(str) ?? parseTzFromWindowsId(str) ?? parseTzFromWindowsDisplay(str)
}
