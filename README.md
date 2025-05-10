<div align="center">

<h1>timezone-convert</h1>

<h3>Convert between timezone formats</h3>
<img src="./branding.svg" alt="Project's branding image" width="320"/>

</div>

# timezone-convert ![TypeScript heart icon](https://img.shields.io/badge/♡-%23007ACC.svg?logo=typescript&logoColor=white)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]
[![Bundlejs][bundlejs-src]][bundlejs-href]

* [timezone-convert ](#timezone-convert-)
  * [Overview](#overview)
    * [Important notes](#important-notes)
      * [Imperfect accuracy](#imperfect-accuracy)
      * [Partial 'etcetera' and 'backward' zones for IANA](#partial-etcetera-and-backward-zones-for-iana)
  * [Features](#features)
  * [Usage](#usage)
    * [CLI](#cli)
    * [Programatic](#programatic)
      * [Install package](#install-package)
      * [Import \& use:](#import--use)
  * [License](#license)

## Overview

**timezone-convert** is a small and efficient utility library and CLI for (smart parsing and) converting between timezone formats.

### Important notes

#### Imperfect accuracy

The primary goal of the project is to focus on converting from one timezone format into a roughly accurate representation in other formats for possible of use with other libraries (e.g Windows display name from calendar => TZID / IANA for datetime manipulation), and AS SIMPLE AS POSSIBLE, things like extensive array mapping (Windows id => Multiple IANA ids) won't be available.

#### Partial 'etcetera' and 'backward' zones for IANA

The project will only supports the `ETC` IANA ids that is also used by Windows, and only supports the commonly-used `backward` IANA ids (like `America/Indianapolis`), uncommon ids like `WET`, `W-SU` is not supported, but in a fast-check, this library should support a few more commonly-used ids than `windows-iana`.

## Features

* Parsing and converting between:
  * Windows display name
  * Windows time zone id
  * IANA (Olsen) tzdb ids
* Auto parse from any formats, just `parseTzAuto(str)`

## Usage

### CLI

```sh
npx timezone-convert "Europe/Athens"
# Outputs a JSON string of the parsed timezone
# { iana, windowsId, windowsDisplay }

# Example use with `jq`
npx -y timezone-convert Asia/Saigon | jq '.windowsDisplay'
```

### Programatic

#### Install package

```sh
# npm
npm install timezone-convert

# bun
bun add timezone-convert

# pnpm (recommended)
pnpm install timezone-convert
```

#### Import & use:

```ts
// ESM
import { parseTzAuto } from 'timezone-convert'

const bucharestTz = parseTzAuto('Europe/Bucharest')
```

## License

[![License][license-src]][license-href]

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/timezone-convert?labelColor=18181B&color=F0DB4F
[npm-version-href]: https://npmjs.com/package/timezone-convert
[npm-downloads-src]: https://img.shields.io/npm/dm/timezone-convert?labelColor=18181B&color=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/timezone-convert
[codecov-src]: https://img.shields.io/codecov/c/gh/namesmt/timezone-convert/main?labelColor=18181B&color=F0DB4F
[codecov-href]: https://codecov.io/gh/namesmt/timezone-convert
[license-src]: https://img.shields.io/github/license/namesmt/timezone-convert.svg?labelColor=18181B&color=F0DB4F
[license-href]: https://github.com/namesmt/timezone-convert/blob/main/LICENSE
[bundlejs-src]: https://img.shields.io/bundlejs/size/timezone-convert?labelColor=18181B&color=F0DB4F
[bundlejs-href]: https://bundlejs.com/?q=timezone-convert
