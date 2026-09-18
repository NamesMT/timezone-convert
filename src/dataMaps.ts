import type { TimezonesElementMap } from '#src/types.js'
import { allTimezones } from '#src/allTimezones.js'

type Maps = Record<'ianaMap' | 'windowsIdMap' | 'windowsDisplayMap', TimezonesElementMap>

export const {
  ianaMap,
  windowsIdMap,
  windowsDisplayMap,
} = allTimezones.reduce<Maps>((p, c) => {
  p.ianaMap[c.iana] = c
  p.windowsIdMap[c.windowsId] = c
  p.windowsDisplayMap[c.windowsDisplay] = c
  return p
}, {
  ianaMap: {},
  windowsIdMap: {},
  windowsDisplayMap: {},
})
