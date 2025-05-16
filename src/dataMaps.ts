import type { TimezonesElementMap } from '#src/types.js'
import type { KeyedBy } from '@namesmt/utils'
import { allTimezones } from '#src/allTimezones.js'

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
