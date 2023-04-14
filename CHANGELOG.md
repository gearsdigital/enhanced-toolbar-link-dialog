## [3.1.3](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v3.1.2...v3.1.3) (2023-04-14)


### Bug Fixes

* remove styles which changed the height of all kirby modals ([ca3fe6a](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/ca3fe6a93a220c2b7f957582c7f291f7c5f0d227)), closes [#84](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/84)

## [3.1.2](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v3.1.1...v3.1.2) (2022-08-17)


### Bug Fixes

* **auto-suggest:** focus behaviour after typing works now as expected ([76488d4](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/76488d4eeeab9b1d1f98a29267292cd37150a195))

## [3.1.1](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v3.1.0...v3.1.1) (2022-08-16)


### Bug Fixes

* **localization:** add missing localizations and translations ([7e49d01](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/7e49d012735f2cedf64ec3bae26046226815df0d))

# [3.1.0](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v3.0.1...v3.1.0) (2022-08-16)


### Features

* **accessibility:** enable keyboard navigation in auto-suggest dropdown ([1f8849b](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/1f8849b94c1a09d1f01ccb8023006e9470cb8755)), closes [#76](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/76)

## [3.0.1](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v3.0.0...v3.0.1) (2022-08-15)


### Bug Fixes

* clarify placeholder text of link input field ([00c4580](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/00c4580916e46260de09ba37b4aa4e08fe8a49bd))

# [3.0.0](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v2.2.4...v3.0.0) (2022-08-14)


### Bug Fixes

* **dialog:** reset form after dialog closed and optimize input order ([8a86da7](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/8a86da7eef6893b8539794fc50e0972e39d1c03d))
* handle anchor only links correctly ([70da1c9](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/70da1c9ba75eb25f9940fef024e2145bcf573885))


### Features

* add support for blocks and compatibility to Kirby 3.7 ([16e26e3](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/16e26e3f19f7082ef8fbfbcfdf0b31ac1ae5189a)), closes [#59](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/59)
* **test:** add basic integration tests ([b3bd126](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/b3bd126ba8f9596e8428a56610b9972ded355450))
* **test:** run tests for Kirby 3.6 and 3.7 ([0816299](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/0816299ba102ff3d656f18b0ffe4ae720964d7a1))


### BREAKING CHANGES

* While adding support for Kirby blocks the user interface and the user experience got a revision that itself led to a major rework of the code base.

I simplified the process of selecting pages and optimised the configurability. It is now possible not only to customize the page title, but also to sort and filter the list of results.

## [2.2.4](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v2.2.3...v2.2.4) (2022-08-06)


### Bug Fixes

* qualify model type to prevent dialog errors ([f307adf](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/f307adff1c32f334e0ceff22756987b8e5c3f24c)), closes [#71](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/71)

## [2.2.3](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v2.2.2...v2.2.3) (2022-08-05)


### Bug Fixes

* pages are now shown again ([3af135d](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/3af135d747d41a50ad39cc0fa9422ef144e98a81)), closes [#67](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/67)
* resolve deprecation warning upon login and save actions ([9024e93](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/9024e93801d3b78080ba0723459e5da92083c82b)), closes [#60](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/60)

## [2.2.2](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v2.2.1...v2.2.2) (2021-11-30)


### Bug Fixes

* update french translations to be more user friendly ([c4691f6](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/c4691f6ce0bfa1edd0b46601739356853c2684ec)), closes [#58](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/58)

## [2.2.1](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v2.2.0...v2.2.1) (2021-11-30)


### Bug Fixes

* update french translations ([3fbd487](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/3fbd4872ef9ecf050a46d6335d8d1b3f9e607490)), closes [#57](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/issues/57)

# [2.2.0](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/v2.1.0...v2.2.0) (2021-11-30)


### Bug Fixes

* add missing dependencies ([058f543](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/058f543a0b6eb8c4a63ebf18140770304ba50276))
* add missing semantic release config ([f6b63af](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/f6b63afb6b5b7badca1137f53911e7d27c026977))
* remove console.log statements ([4a2e55c](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/4a2e55c3d7eea99fc4a0f43e40bffb8b4bd03b45))


### Features

* add semantic release process ([d2151a8](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/commit/d2151a8502ff66b659cc4f0cb73988ecd027710c))

# [2.1.0](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/compare/2.0.0...v2.1.0) (2021-11-30)

* add translations for 🇩🇰 🇸🇪 🇮🇸 🇳🇴 ([#54](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/pull/54))
* optimize internal link ui ([#56](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/pull/56))
