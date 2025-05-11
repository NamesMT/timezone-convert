import { describe, expect, it } from 'vitest'
import { ianaMap, parseTzAuto, parseTzFromIana, parseTzFromWindowsDisplay, parseTzFromWindowsId } from '../src/index'

describe('parseTzFromIana', () => {
  it('should parse sample iana time zone ids', () => {
    expect(parseTzFromIana('Etc/GMT+12'))
      .toMatchObject({ iana: 'Etc/GMT+12' })
  })

  it('should return undefined for invalid iana time zone ids', () => {
    expect(parseTzFromIana('Invalid/Timezone'))
      .toBeUndefined()
  })
})

describe('parseTzFromWindowsId', () => {
  it('should parse sample windows time zone ids', () => {
    expect(parseTzFromWindowsId('Cape Verde Standard Time'))
      .toMatchObject({ windowsId: 'Cape Verde Standard Time' })

    expect(parseTzFromWindowsId('UTC'))
      .toMatchObject({ windowsId: 'UTC' })
  })

  it('should return undefined for invalid windows time zone ids', () => {
    expect(parseTzFromWindowsId('Invalid/Timezone'))
      .toBeUndefined()
  })
})

describe('parseTzFromWindowsDisplay', () => {
  it('should parse sample windows time zone display names', () => {
    expect(parseTzFromWindowsDisplay('(UTC+12:00) Auckland, Wellington'))
      .toMatchObject({ windowsDisplay: 'Auckland, Wellington' })

    expect(parseTzFromWindowsDisplay('(UTC+2) Athens, Bucharest'))
      .toMatchObject({ windowsDisplay: 'Athens, Bucharest' })

    expect(parseTzFromWindowsDisplay('Coordinated Universal Time'))
      .toMatchObject({ windowsDisplay: 'Coordinated Universal Time' })
  })

  it('should return undefined for invalid windows time zone display names', () => {
    expect(parseTzFromWindowsDisplay('Invalid/Timezone'))
      .toBeUndefined()
  })
})

describe('parseTzAuto', () => {
  it('should parse sample iana time zone ids', () => {
    expect(parseTzAuto('Etc/GMT+12'))
      .toMatchObject({ iana: 'Etc/GMT+12' })
  })

  it('should parse sample windows time zone ids', () => {
    expect(parseTzAuto('Cape Verde Standard Time'))
      .toMatchObject({ windowsId: 'Cape Verde Standard Time' })
  })

  it('should parse sample windows time zone display names', () => {
    expect(parseTzAuto('(UTC+12:00) Auckland, Wellington'))
      .toMatchObject({ windowsDisplay: 'Auckland, Wellington' })
  })

  it('should return undefined for entries', () => {
    expect(parseTzAuto('Invalid/Timezone'))
      .toBeUndefined()
  })
})

describe('ianaMap', () => {
  it('should be accessible', () => {
    expect(ianaMap['Asia/Saigon']).toMatchObject({ iana: 'Asia/Saigon' })
  })
})
