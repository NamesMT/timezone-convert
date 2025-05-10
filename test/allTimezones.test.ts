import { describe, expect, it } from 'vitest'
import { allTimezones } from '../src/allTimezones'
import { validIanaIds } from './validIanaIds'

describe('allTimezones', () => {
  it('should have valid iana tzid', () => {
    for (const timezone of allTimezones) {
      expect(timezone.iana).toBeTypeOf('string')

      if (timezone.iana.startsWith('Etc/'))
        continue

      expect(validIanaIds).toContain(timezone.iana)
    }
  })
})
