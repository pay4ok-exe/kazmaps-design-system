# Токены контракта v2

Источник истины — `tokens/brands/*.json`. Имена ролей = имена Figma Variables (`группа/роль` → `--группа-роль`).

Бренд с собственным контрактом (`schema.byBrand.<brand>.replacesContract`) вынесен
в отдельные таблицы: его роли приходят из своего файла Figma и с общим списком не пересекаются.

## Роли по темам — общий контракт

| Роль                   | business light          | business dark           | booking light                     | booking dark            |
| ---------------------- | ----------------------- | ----------------------- | --------------------------------- | ----------------------- |
| `--surface-base`       | `#fbfbfb`               | `#08090a`               | `#f4f6f9`                         | `#141921`               |
| `--surface-panel`      | `#ffffff`               | `#232326`               | `#ffffff`                         | `#1e2635`               |
| `--surface-raised`     | `#f4f4f5`               | `#1c1c1f`               | `#eef1f6`                         | `#1c2330`               |
| `--surface-subtle`     | `#f4f4f5`               | `#1c1c1f`               | `#eef1f6`                         | `#1c2330`               |
| `--backdrop-scrim`     | `#00000080`             | `#00000080`             | `#00000080`                       | `#00000080`             |
| `--text-primary`       | `#282a30`               | `#f7f8f8`               | `#1b2230`                         | `#e8edf4`               |
| `--text-secondary`     | `#3c4149`               | `#d0d6e0`               | `#3a4456`                         | `#b8c4d4`               |
| `--text-muted`         | `#6f6e77`               | `#8a8f98`               | `#6b7585`                         | `#7a8699`               |
| `--text-tertiary`      | `#86848d`               | `#62666d`               | `#97a0ae`                         | `#5a6575`               |
| `--text-faint`         | `#86848d`               | `#62666d`               | `#97a0ae`                         | `#5a6575`               |
| `--text-on-accent`     | `#ffffff`               | `#ffffff`               | `#ffffff`                         | `#ffffff`               |
| `--border`             | `#e9e8ea`               | `#23252a`               | `#e6e9ef`                         | `#414b5e`               |
| `--border-subtle`      | `#e4e2e4`               | `#34343a`               | `#eff1f5`                         | `#243040`               |
| `--border-hairline`    | `#e4e2e4`               | `#34343a`               | `#eff1f5`                         | `#243040`               |
| `--border-input`       | `#e9e8ea`               | `#23252a`               | `#e6e9ef`                         | `#414b5e`               |
| `--accent`             | `#5e6ad2`               | `#5e6ad2`               | `#5e6ad2`                         | `#6e79d6`               |
| `--accent-press`       | `#4f5ab8`               | `#4f5ab8`               | `#4f5ab8`                         | `#8b94e0`               |
| `--accent-soft-bg`     | `#f0f1fb`               | `#1a1d33`               | `#eef0fb`                         | `#262a52`               |
| `--accent-soft-border` | `#c5cbf0`               | `#262a52`               | `#c4c8f0`                         | `#262a52`               |
| `--success`            | `#27a644`               | `#27a644`               | `#1f8a5b`                         | `#1f8a5b`               |
| `--success-soft-bg`    | `#e7f6ec`               | `#0f2417`               | `#e5f4ec`                         | `#17362b`               |
| `--warning`            | `#c99a16`               | `#f0bf00`               | `#c9871a`                         | `#c9871a`               |
| `--warning-soft-bg`    | `#f9f0d8`               | `#241f10`               | `#fbefd3`                         | `#382d1a`               |
| `--danger`             | `#eb5757`               | `#eb5757`               | `#d8334a`                         | `#d8334a`               |
| `--danger-soft-bg`     | `#fdecec`               | `#2a1416`               | `#fce7eb`                         | `#3a222b`               |
| `--info`               | `#4ea7fc`               | `#4ea7fc`               | `#2a6fdb`                         | `#2a6fdb`               |
| `--info-soft-bg`       | `#e8f3fe`               | `#0e1f2e`               | `#e7f0fc`                         | `#1c2c47`               |
| `--highlight`          | `#c99a16`               | `#f0bf00`               | `#e8a317`                         | `#e8a317`               |
| `--highlight-soft`     | `#f9f0d8`               | `#241f10`               | `#fbefd3`                         | `#3a2f1a`               |
| `--shadow-sm`          | `0 1px 2px #0000000f`   | `0 1px 2px #0000004d`   | `0 1px 3px rgba(0, 0, 0, 0.08)`   | `0 1px 2px #0000004d`   |
| `--shadow-md`          | `0 4px 12px #00000014`  | `0 4px 12px #00000066`  | `0 4px 12px rgba(0, 0, 0, 0.1)`   | `0 4px 12px #00000066`  |
| `--shadow-lg`          | `0 16px 48px #0000001f` | `0 16px 48px #00000080` | `0 20px 48px rgba(0, 0, 0, 0.14)` | `0 20px 48px #00000080` |

## Роли по темам — maps

| Роль                         | maps light  | maps dark   |
| ---------------------------- | ----------- | ----------- |
| `--action-accent-primary`    | `#4589ff`   | `#0f62fe`   |
| `--action-accent-secondary`  | `#0f62fe`   | `#0043ce`   |
| `--action-accent-subtle`     | `#a6c8ff`   | `#4589ff`   |
| `--action-accent-hover`      | `#0f62fe80` | `#0043ce80` |
| `--action-danger-primary`    | `#fa4d56`   | `#da1e28`   |
| `--action-danger-secondary`  | `#da1e28`   | `#a2191f`   |
| `--action-danger-subtle`     | `#ffb3b8`   | `#fa4d56`   |
| `--action-danger-hover`      | `#da1e2880` | `#a2191f80` |
| `--action-neutral-primary`   | `#a4aab3`   | `#686f78`   |
| `--action-neutral-secondary` | `#888f99`   | `#4b5157`   |
| `--action-neutral-subtle`    | `#c1c5c9`   | `#888f99`   |
| `--action-neutral-hover`     | `#888f9980` | `#4b515780` |
| `--action-disabled`          | `#dadce0`   | `#4b5157`   |
| `--background-primary`       | `#ffffff`   | `#222528`   |
| `--background-secondary`     | `#f1f3f5`   | `#2f3338`   |
| `--background-tertiary`      | `#dadce0`   | `#4b5157`   |
| `--background-toggle`        | `#f1f3f5`   | `#0f1214`   |
| `--background-toggle-2`      | `#00000008` | `#ffffff08` |
| `--overlay-modal-dialog`     | `#0000001a` | `#00000033` |
| `--border-primary`           | `#c1c5c9`   | `#686f78`   |
| `--border-secondary`         | `#dadce0`   | `#4b5157`   |
| `--border-focus`             | `#78a9ff`   | `#4589ff`   |
| `--border-error`             | `#ff8389`   | `#fa4d56`   |
| `--text-primary`             | `#0f1214`   | `#ffffff`   |
| `--text-secondary`           | `#686f78`   | `#c1c5c9`   |
| `--text-tertiary`            | `#a4aab3`   | `#888f99`   |
| `--text-white`               | `#ffffff`   | `#ffffff`   |
| `--text-accent`              | `#4589ff`   | `#4589ff`   |
| `--text-danger`              | `#fa4d56`   | `#fa4d56`   |
| `--text-link`                | `#4589ff`   | `#78a9ff`   |
| `--icon-primary`             | `#0f1214`   | `#ffffff`   |
| `--icon-secondary`           | `#686f78`   | `#c1c5c9`   |
| `--icon-tertiary`            | `#a4aab3`   | `#888f99`   |
| `--icon-white`               | `#ffffff`   | `#ffffff`   |
| `--icon-accent`              | `#4589ff`   | `#4589ff`   |
| `--icon-link`                | `#4589ff`   | `#78a9ff`   |
| `--icon-dander`              | `#fa4d56`   | `#fa4d56`   |
| `--tag-blue`                 | `#78a9ff`   | `#4589ff`   |
| `--tag-cyan`                 | `#33b1ff`   | `#1192e8`   |
| `--tag-gray`                 | `#a4aab3`   | `#686f78`   |
| `--tag-green`                | `#42be65`   | `#24a148`   |
| `--tag-magenta`              | `#ff7eb6`   | `#ee5396`   |
| `--tag-orange`               | `#ff832b`   | `#eb6200`   |
| `--tag-purple`               | `#be95ff`   | `#a56eff`   |
| `--tag-red`                  | `#ff8389`   | `#fa4d56`   |
| `--tag-teal`                 | `#08bdba`   | `#009d9a`   |
| `--tag-yellow`               | `#f1c21b`   | `#d2a106`   |
| `--traffic-fill-green`       | `#a7f0ba`   | `#24a148`   |
| `--traffic-fill-yellow`      | `#fddc69`   | `#d2a106`   |
| `--traffic-fill-orange`      | `#ffb784`   | `#eb6200`   |
| `--traffic-fill-red`         | `#ffb3b8`   | `#fa4d56`   |
| `--traffic-border-green`     | `#198038`   | `#198038`   |
| `--traffic-border-yellow`    | `#8e6a00`   | `#8e6a00`   |
| `--traffic-border-orange`    | `#ba4e00`   | `#ba4e00`   |
| `--traffic-border-red`       | `#a2191f`   | `#a2191f`   |
| `--traffic-text-green`       | `#0e6027`   | `#ffffff`   |
| `--traffic-text-yellow`      | `#684e00`   | `#ffffff`   |
| `--traffic-text-orange`      | `#8a3800`   | `#ffffff`   |
| `--traffic-text-red`         | `#750e13`   | `#ffffff`   |
| `--weather-sun`              | `#f1c21b`   | `#d2a106`   |
| `--weather-moon`             | `#a4aab3`   | `#a4aab3`   |
| `--weather-cloud`            | `#82cfff`   | `#0072c3`   |
| `--weather-raindrop`         | `#4589ff`   | `#78a9ff`   |
| `--weather-snow`             | `#c1c5c9`   | `#d0e2ff`   |

## Статические роли — общий контракт

| Роль            | business                                                                                       | booking                                                     |
| --------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `--text-xs`     | `11px`                                                                                         | `11px`                                                      |
| `--text-sm`     | `13px`                                                                                         | `13px`                                                      |
| `--text-base`   | `15px`                                                                                         | `15px`                                                      |
| `--text-lg`     | `17px`                                                                                         | `17px`                                                      |
| `--text-xl`     | `20px`                                                                                         | `20px`                                                      |
| `--text-2xl`    | `24px`                                                                                         | `24px`                                                      |
| `--text-3xl`    | `30px`                                                                                         | `30px`                                                      |
| `--radius-sm`   | `6px`                                                                                          | `8px`                                                       |
| `--radius-md`   | `8px`                                                                                          | `12px`                                                      |
| `--radius-lg`   | `12px`                                                                                         | `16px`                                                      |
| `--radius-full` | `9999px`                                                                                       | `9999px`                                                    |
| `--font-sans`   | `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | `"Lexend", "Manrope", system-ui, -apple-system, sans-serif` |

## Статические роли — maps

| Роль                            | maps                                       |
| ------------------------------- | ------------------------------------------ |
| `--dimension-corner-radius-2`   | `2px`                                      |
| `--dimension-corner-radius-4`   | `4px`                                      |
| `--dimension-corner-radius-6`   | `6px`                                      |
| `--dimension-corner-radius-8`   | `8px`                                      |
| `--dimension-corner-radius-10`  | `10px`                                     |
| `--dimension-corner-radius-12`  | `12px`                                     |
| `--dimension-corner-radius-16`  | `16px`                                     |
| `--dimension-corner-radius-max` | `9999px`                                   |
| `--dimension-height-4`          | `4px`                                      |
| `--dimension-height-8`          | `8px`                                      |
| `--dimension-height-12`         | `12px`                                     |
| `--dimension-height-16`         | `16px`                                     |
| `--dimension-height-20`         | `20px`                                     |
| `--dimension-height-24`         | `24px`                                     |
| `--dimension-height-28`         | `28px`                                     |
| `--dimension-height-40`         | `40px`                                     |
| `--dimension-height-64`         | `64px`                                     |
| `--dimension-width-4`           | `4px`                                      |
| `--dimension-width-8`           | `8px`                                      |
| `--dimension-width-12`          | `12px`                                     |
| `--dimension-width-16`          | `16px`                                     |
| `--dimension-width-20`          | `20px`                                     |
| `--dimension-width-24`          | `24px`                                     |
| `--dimension-width-28`          | `28px`                                     |
| `--dimension-width-40`          | `40px`                                     |
| `--dimension-width-64`          | `64px`                                     |
| `--spacing-gap-0`               | `0px`                                      |
| `--spacing-gap-1`               | `1px`                                      |
| `--spacing-gap-2`               | `2px`                                      |
| `--spacing-gap-4`               | `4px`                                      |
| `--spacing-gap-6`               | `6px`                                      |
| `--spacing-gap-8`               | `8px`                                      |
| `--spacing-gap-10`              | `10px`                                     |
| `--spacing-gap-12`              | `12px`                                     |
| `--spacing-gap-16`              | `16px`                                     |
| `--spacing-gap-20`              | `20px`                                     |
| `--spacing-gap-24`              | `24px`                                     |
| `--spacing-padding-1`           | `1px`                                      |
| `--spacing-padding-2`           | `2px`                                      |
| `--spacing-padding-4`           | `4px`                                      |
| `--spacing-padding-6`           | `6px`                                      |
| `--spacing-padding-8`           | `8px`                                      |
| `--spacing-padding-10`          | `10px`                                     |
| `--spacing-padding-12`          | `12px`                                     |
| `--spacing-padding-16`          | `16px`                                     |
| `--spacing-padding-24`          | `24px`                                     |
| `--stroke-border-1`             | `1px`                                      |
| `--stroke-border-0_5`           | `0.5px`                                    |
| `--stroke-border-1_5`           | `1.5px`                                    |
| `--stroke-divider-1`            | `1px`                                      |
| `--stroke-divider-2`            | `2px`                                      |
| `--shadow-blur-2`               | `2px`                                      |
| `--shadow-blur-4`               | `4px`                                      |
| `--shadow-blur-8`               | `8px`                                      |
| `--shadow-blur-16`              | `16px`                                     |
| `--shadow-blur-32`              | `32px`                                     |
| `--shadow-position-8`           | `8px`                                      |
| `--shadow-position-24`          | `24px`                                     |
| `--typography-font-size-10`     | `10px`                                     |
| `--typography-font-size-12`     | `12px`                                     |
| `--typography-font-size-14`     | `14px`                                     |
| `--typography-font-size-16`     | `16px`                                     |
| `--typography-line-height-12`   | `12px`                                     |
| `--typography-line-height-16`   | `16px`                                     |
| `--typography-line-height-18`   | `18px`                                     |
| `--typography-line-height-20`   | `20px`                                     |
| `--font-sans`                   | `var(--font-inter), system-ui, sans-serif` |
| `--font-weight-regular`         | `400`                                      |
| `--font-weight-book`            | `450`                                      |
| `--font-weight-medium`          | `500`                                      |
| `--font-weight-strong`          | `550`                                      |
| `--text-xs`                     | `0.75rem`                                  |
| `--text-sm`                     | `0.875rem`                                 |
| `--text-base`                   | `1rem`                                     |
| `--text-lg`                     | `1.125rem`                                 |
| `--text-xl`                     | `1.25rem`                                  |
| `--text-2xl`                    | `1.5rem`                                   |
| `--text-3xl`                    | `1.875rem`                                 |

## Кит бренда

- maps: `--shadow-field` = `rgba(0, 0, 0, 0.04) 0px 4px 4px 0px`
- maps: `--shadow-hud` = `rgba(0, 0, 0, 0.12) 0px 4px 8px 0px`
- maps: `--shadow-hud-hover` = `rgba(0, 0, 0, 0.24) 0px 4px 8px 0px`
- maps: `--shadow-hud-side` = `rgba(0, 0, 0, 0.08) 4px 0px 8px 0px`
- maps: `--shadow-hud-badge` = `rgba(0, 0, 0, 0.12) 0px 2px 8px 0px`
- maps: `--shadow-modal` = `rgba(0, 0, 0, 0.08) 0px 4px 8px 0px`
- maps: `--ease-standard` = `cubic-bezier(0.4, 0, 0.2, 1)`
- maps: `--motion-fast` = `140ms`
- maps: `--motion-panel` = `240ms`
- maps: `--motion-shimmer` = `1.6s`
- maps: `--shadow-column` = `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px`
- maps: `--shadow-button-sm` = `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`
- maps: `--shadow-button-md` = `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px`
- maps: `--shadow-sheet-top` = `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px`
- maps: `--shadow-dropdown` = `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px`

## Алиасы (deprecated, удаление в 1.0.0)

- общий контракт (business, booking):
  - `--bg` → `--surface-base`
  - `--card` → `--surface-panel`
  - `--bg-2` → `--surface-raised`
  - `--ink` → `--text-primary`
  - `--ink-2` → `--text-secondary`
  - `--muted` → `--text-muted`
  - `--muted-2` → `--text-tertiary`
  - `--line` → `--border`
  - `--line-2` → `--border-subtle`
  - `--brand` → `--accent`
  - `--brand-press` → `--accent-press`
  - `--brand-soft` → `--accent-soft-bg`
  - `--warn` → `--warning`
  - `--success-soft` → `--success-soft-bg`
  - `--warn-soft` → `--warning-soft-bg`
  - `--danger-soft` → `--danger-soft-bg`
  - `--info-soft` → `--info-soft-bg`
  - `--gold` → `--highlight`
  - `--gold-soft` → `--highlight-soft`
- maps:
  - `--radius-sm` → `--dimension-corner-radius-4`
  - `--radius-md` → `--dimension-corner-radius-6`
  - `--radius-lg` → `--dimension-corner-radius-8`
  - `--radius-xl` → `--dimension-corner-radius-12`
  - `--radius-2xl` → `--dimension-corner-radius-16`
  - `--radius-full` → `--dimension-corner-radius-max`
  - `--surface-base` → `--background-secondary`
  - `--surface-panel` → `--background-primary`
  - `--surface-raised` → `--background-secondary`
  - `--surface-subtle` → `--background-secondary`
  - `--backdrop-scrim` → `--overlay-modal-dialog`
  - `--text-muted` → `--text-secondary`
  - `--text-faint` → `--text-tertiary`
  - `--text-on-accent` → `--text-white`
  - `--border` → `--border-primary`
  - `--border-subtle` → `--border-secondary`
  - `--border-hairline` → `--border-secondary`
  - `--border-input` → `--border-primary`
  - `--accent` → `--action-accent-primary`
  - `--accent-press` → `--action-accent-secondary`
  - `--accent-soft-bg` → `--background-secondary`
  - `--accent-soft-border` → `--action-accent-subtle`
  - `--success` → `--tag-green`
  - `--success-soft-bg` → `--traffic-fill-green`
  - `--warning` → `--tag-orange`
  - `--warning-soft-bg` → `--traffic-fill-orange`
  - `--danger` → `--action-danger-primary`
  - `--danger-soft-bg` → `--action-danger-subtle`
  - `--info` → `--action-accent-primary`
  - `--info-soft-bg` → `--background-secondary`
  - `--bg-2` → `--background-secondary`
  - `--ink-2` → `--text-secondary`

## Расширения брендов

- business: `--brand-50`, `--brand-100`, `--brand-200`, `--brand-300`, `--brand-400`, `--brand-500`, `--brand-600`, `--brand-700`, `--gold-press`
- booking: `--brand-50`, `--brand-100`, `--brand-200`, `--brand-300`, `--brand-400`, `--brand-500`, `--brand-600`, `--brand-700`, `--gold-press`
- maps: `--map-tile-style`, `--shimmer-peak`, `--surface-map`, `--text-on-map`, `--rating-star`, `--marker-primary`

## Ожидает значения от дизайнера

- business light `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- business dark `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- booking light `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- booking dark `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- maps light `--icon-dander` = `#fa4d56` — опечатка в Figma (ожидается icon/danger) — имя держим как в источнике до правки макета
- maps dark `--icon-dander` = `#fa4d56` — опечатка в Figma (ожидается icon/danger) — имя держим как в источнике до правки макета
- maps `--text-lg` = `1.125rem` — ожидает значения от дизайнера
- maps `--text-xl` = `1.25rem` — ожидает значения от дизайнера
- maps `--text-2xl` = `1.5rem` — ожидает значения от дизайнера
- maps `--text-3xl` = `1.875rem` — ожидает значения от дизайнера
- maps light `--shimmer-peak` = `0.94` — ожидает значения от дизайнера
- maps light `--surface-map` = `#e9ece4` — ожидает значения от дизайнера
- maps light `--text-on-map` = `#22272e` — ожидает значения от дизайнера
- maps light `--rating-star` = `#f2a615` — ожидает значения от дизайнера
- maps light `--marker-primary` = `#e0442f` — ожидает значения от дизайнера
- maps dark `--shimmer-peak` = `1.12` — ожидает значения от дизайнера
- maps dark `--surface-map` = `#0a0e18` — ожидает значения от дизайнера
- maps dark `--text-on-map` = `#22272e` — ожидает значения от дизайнера
- maps dark `--rating-star` = `#f2a615` — ожидает значения от дизайнера
- maps dark `--marker-primary` = `#e0442f` — ожидает значения от дизайнера

## Как отдать значения

1. В Figma Variables имена ролей совпадают с таблицей выше; коллекция на бренд, режим на тему.
2. Значения переносятся в `tokens/brands/<brand>.json` литералами (без ссылок), PR в этот репозиторий.
3. `npm run tokens:build` перегенерирует CSS и этот файл; `npm test` не пропустит пропущенную роль или `var()` в значении.
