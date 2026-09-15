# Токены контракта

Источник истины — `tokens/brands/*.json`. Имена ролей = имена Figma Variables (`группа/роль` → `--группа-роль`).
Контракт один на все бренды: бренд меняет значения, не имена.

## Роли по темам

| Роль                         | business light | business dark | booking light | booking dark | maps light  | maps dark   |
| ---------------------------- | -------------- | ------------- | ------------- | ------------ | ----------- | ----------- |
| `--action-accent-primary`    | `#5e6ad2`      | `#5e6ad2`     | `#5e6ad2`     | `#6e79d6`    | `#4589ff`   | `#0f62fe`   |
| `--action-accent-secondary`  | `#4f5ab8`      | `#4f5ab8`     | `#4f5ab8`     | `#8b94e0`    | `#0f62fe`   | `#0043ce`   |
| `--action-accent-subtle`     | `#c5cbf0`      | `#262a52`     | `#c4c8f0`     | `#262a52`    | `#a6c8ff`   | `#4589ff`   |
| `--action-accent-hover`      | `#4f5ab880`    | `#4f5ab880`   | `#4f5ab880`   | `#8b94e080`  | `#0f62fe80` | `#0043ce80` |
| `--action-danger-primary`    | `#eb5757`      | `#eb5757`     | `#d8334a`     | `#d8334a`    | `#fa4d56`   | `#da1e28`   |
| `--action-danger-secondary`  | `#da1e28`      | `#a2191f`     | `#da1e28`     | `#a2191f`    | `#da1e28`   | `#a2191f`   |
| `--action-danger-subtle`     | `#ffb3b8`      | `#fa4d56`     | `#ffb3b8`     | `#fa4d56`    | `#ffb3b8`   | `#fa4d56`   |
| `--action-danger-hover`      | `#da1e2880`    | `#a2191f80`   | `#da1e2880`   | `#a2191f80`  | `#da1e2880` | `#a2191f80` |
| `--action-neutral-primary`   | `#a4aab3`      | `#686f78`     | `#a4aab3`     | `#686f78`    | `#a4aab3`   | `#686f78`   |
| `--action-neutral-secondary` | `#888f99`      | `#4b5157`     | `#888f99`     | `#4b5157`    | `#888f99`   | `#4b5157`   |
| `--action-neutral-subtle`    | `#c1c5c9`      | `#888f99`     | `#c1c5c9`     | `#888f99`    | `#c1c5c9`   | `#888f99`   |
| `--action-neutral-hover`     | `#888f9980`    | `#4b515780`   | `#888f9980`   | `#4b515780`  | `#888f9980` | `#4b515780` |
| `--action-disabled`          | `#dadce0`      | `#4b5157`     | `#dadce0`     | `#4b5157`    | `#dadce0`   | `#4b5157`   |
| `--background-primary`       | `#ffffff`      | `#232326`     | `#ffffff`     | `#1e2635`    | `#ffffff`   | `#222528`   |
| `--background-secondary`     | `#fbfbfb`      | `#08090a`     | `#f4f6f9`     | `#141921`    | `#f1f3f5`   | `#2f3338`   |
| `--background-tertiary`      | `#f4f4f5`      | `#1c1c1f`     | `#eef1f6`     | `#1c2330`    | `#dadce0`   | `#4b5157`   |
| `--background-toggle`        | `#f4f4f5`      | `#1c1c1f`     | `#eef1f6`     | `#1c2330`    | `#f1f3f5`   | `#0f1214`   |
| `--background-toggle-2`      | `#00000008`    | `#ffffff08`   | `#00000008`   | `#ffffff08`  | `#00000008` | `#ffffff08` |
| `--overlay-modal-dialog`     | `#00000080`    | `#00000080`   | `#00000080`   | `#00000080`  | `#0000001a` | `#00000033` |
| `--border-primary`           | `#e9e8ea`      | `#23252a`     | `#e6e9ef`     | `#414b5e`    | `#c1c5c9`   | `#686f78`   |
| `--border-secondary`         | `#e4e2e4`      | `#34343a`     | `#eff1f5`     | `#243040`    | `#dadce0`   | `#4b5157`   |
| `--border-focus`             | `#5e6ad2`      | `#5e6ad2`     | `#5e6ad2`     | `#6e79d6`    | `#78a9ff`   | `#4589ff`   |
| `--border-error`             | `#eb5757`      | `#eb5757`     | `#d8334a`     | `#d8334a`    | `#ff8389`   | `#fa4d56`   |
| `--text-primary`             | `#282a30`      | `#f7f8f8`     | `#1b2230`     | `#e8edf4`    | `#0f1214`   | `#ffffff`   |
| `--text-secondary`           | `#6f6e77`      | `#8a8f98`     | `#6b7585`     | `#7a8699`    | `#686f78`   | `#c1c5c9`   |
| `--text-tertiary`            | `#86848d`      | `#62666d`     | `#97a0ae`     | `#5a6575`    | `#a4aab3`   | `#888f99`   |
| `--text-white`               | `#ffffff`      | `#ffffff`     | `#ffffff`     | `#ffffff`    | `#ffffff`   | `#ffffff`   |
| `--text-accent`              | `#5e6ad2`      | `#5e6ad2`     | `#5e6ad2`     | `#6e79d6`    | `#4589ff`   | `#4589ff`   |
| `--text-danger`              | `#eb5757`      | `#eb5757`     | `#d8334a`     | `#d8334a`    | `#fa4d56`   | `#fa4d56`   |
| `--text-link`                | `#5e6ad2`      | `#5e6ad2`     | `#5e6ad2`     | `#6e79d6`    | `#4589ff`   | `#78a9ff`   |
| `--icon-primary`             | `#282a30`      | `#f7f8f8`     | `#1b2230`     | `#e8edf4`    | `#0f1214`   | `#ffffff`   |
| `--icon-secondary`           | `#6f6e77`      | `#8a8f98`     | `#6b7585`     | `#7a8699`    | `#686f78`   | `#c1c5c9`   |
| `--icon-tertiary`            | `#86848d`      | `#62666d`     | `#97a0ae`     | `#5a6575`    | `#a4aab3`   | `#888f99`   |
| `--icon-white`               | `#ffffff`      | `#ffffff`     | `#ffffff`     | `#ffffff`    | `#ffffff`   | `#ffffff`   |
| `--icon-accent`              | `#5e6ad2`      | `#5e6ad2`     | `#5e6ad2`     | `#6e79d6`    | `#4589ff`   | `#4589ff`   |
| `--icon-link`                | `#5e6ad2`      | `#5e6ad2`     | `#5e6ad2`     | `#6e79d6`    | `#4589ff`   | `#78a9ff`   |
| `--icon-dander`              | `#eb5757`      | `#eb5757`     | `#d8334a`     | `#d8334a`    | `#fa4d56`   | `#fa4d56`   |
| `--tag-blue`                 | `#4ea7fc`      | `#4ea7fc`     | `#2a6fdb`     | `#2a6fdb`    | `#78a9ff`   | `#4589ff`   |
| `--tag-cyan`                 | `#33b1ff`      | `#1192e8`     | `#33b1ff`     | `#1192e8`    | `#33b1ff`   | `#1192e8`   |
| `--tag-gray`                 | `#a4aab3`      | `#686f78`     | `#a4aab3`     | `#686f78`    | `#a4aab3`   | `#686f78`   |
| `--tag-green`                | `#27a644`      | `#27a644`     | `#1f8a5b`     | `#1f8a5b`    | `#42be65`   | `#24a148`   |
| `--tag-magenta`              | `#ff7eb6`      | `#ee5396`     | `#ff7eb6`     | `#ee5396`    | `#ff7eb6`   | `#ee5396`   |
| `--tag-orange`               | `#c99a16`      | `#f0bf00`     | `#c9871a`     | `#c9871a`    | `#ff832b`   | `#eb6200`   |
| `--tag-purple`               | `#be95ff`      | `#a56eff`     | `#be95ff`     | `#a56eff`    | `#be95ff`   | `#a56eff`   |
| `--tag-red`                  | `#eb5757`      | `#eb5757`     | `#d8334a`     | `#d8334a`    | `#ff8389`   | `#fa4d56`   |
| `--tag-teal`                 | `#08bdba`      | `#009d9a`     | `#08bdba`     | `#009d9a`    | `#08bdba`   | `#009d9a`   |
| `--tag-yellow`               | `#c99a16`      | `#f0bf00`     | `#e8a317`     | `#e8a317`    | `#f1c21b`   | `#d2a106`   |
| `--traffic-fill-green`       | `#a7f0ba`      | `#24a148`     | `#a7f0ba`     | `#24a148`    | `#a7f0ba`   | `#24a148`   |
| `--traffic-fill-yellow`      | `#fddc69`      | `#d2a106`     | `#fddc69`     | `#d2a106`    | `#fddc69`   | `#d2a106`   |
| `--traffic-fill-orange`      | `#ffb784`      | `#eb6200`     | `#ffb784`     | `#eb6200`    | `#ffb784`   | `#eb6200`   |
| `--traffic-fill-red`         | `#ffb3b8`      | `#fa4d56`     | `#ffb3b8`     | `#fa4d56`    | `#ffb3b8`   | `#fa4d56`   |
| `--traffic-border-green`     | `#198038`      | `#198038`     | `#198038`     | `#198038`    | `#198038`   | `#198038`   |
| `--traffic-border-yellow`    | `#8e6a00`      | `#8e6a00`     | `#8e6a00`     | `#8e6a00`    | `#8e6a00`   | `#8e6a00`   |
| `--traffic-border-orange`    | `#ba4e00`      | `#ba4e00`     | `#ba4e00`     | `#ba4e00`    | `#ba4e00`   | `#ba4e00`   |
| `--traffic-border-red`       | `#a2191f`      | `#a2191f`     | `#a2191f`     | `#a2191f`    | `#a2191f`   | `#a2191f`   |
| `--traffic-text-green`       | `#0e6027`      | `#ffffff`     | `#0e6027`     | `#ffffff`    | `#0e6027`   | `#ffffff`   |
| `--traffic-text-yellow`      | `#684e00`      | `#ffffff`     | `#684e00`     | `#ffffff`    | `#684e00`   | `#ffffff`   |
| `--traffic-text-orange`      | `#8a3800`      | `#ffffff`     | `#8a3800`     | `#ffffff`    | `#8a3800`   | `#ffffff`   |
| `--traffic-text-red`         | `#750e13`      | `#ffffff`     | `#750e13`     | `#ffffff`    | `#750e13`   | `#ffffff`   |
| `--weather-sun`              | `#f1c21b`      | `#d2a106`     | `#f1c21b`     | `#d2a106`    | `#f1c21b`   | `#d2a106`   |
| `--weather-moon`             | `#a4aab3`      | `#a4aab3`     | `#a4aab3`     | `#a4aab3`    | `#a4aab3`   | `#a4aab3`   |
| `--weather-cloud`            | `#82cfff`      | `#0072c3`     | `#82cfff`     | `#0072c3`    | `#82cfff`   | `#0072c3`   |
| `--weather-raindrop`         | `#4589ff`      | `#78a9ff`     | `#4589ff`     | `#78a9ff`    | `#4589ff`   | `#78a9ff`   |
| `--weather-snow`             | `#c1c5c9`      | `#d0e2ff`     | `#c1c5c9`     | `#d0e2ff`    | `#c1c5c9`   | `#d0e2ff`   |
| `--surface-map`              | `#fbfbfb`      | `#08090a`     | `#f4f6f9`     | `#141921`    | `#e9ece4`   | `#0a0e18`   |
| `--text-on-map`              | `#282a30`      | `#f7f8f8`     | `#1b2230`     | `#e8edf4`    | `#22272e`   | `#22272e`   |
| `--rating-star`              | `#c99a16`      | `#f0bf00`     | `#e8a317`     | `#e8a317`    | `#f2a615`   | `#f2a615`   |
| `--shimmer-peak`             | `0.94`         | `1.12`        | `0.94`        | `1.12`       | `0.94`      | `1.12`      |

## Статические роли

| Роль                            | business                                                                                       | booking                                                     | maps                                       |
| ------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| `--dimension-corner-radius-2`   | `2px`                                                                                          | `2px`                                                       | `2px`                                      |
| `--dimension-corner-radius-4`   | `4px`                                                                                          | `4px`                                                       | `4px`                                      |
| `--dimension-corner-radius-6`   | `6px`                                                                                          | `6px`                                                       | `6px`                                      |
| `--dimension-corner-radius-8`   | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--dimension-corner-radius-10`  | `10px`                                                                                         | `10px`                                                      | `10px`                                     |
| `--dimension-corner-radius-12`  | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--dimension-corner-radius-16`  | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--dimension-corner-radius-max` | `9999px`                                                                                       | `9999px`                                                    | `9999px`                                   |
| `--dimension-height-4`          | `4px`                                                                                          | `4px`                                                       | `4px`                                      |
| `--dimension-height-8`          | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--dimension-height-12`         | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--dimension-height-16`         | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--dimension-height-20`         | `20px`                                                                                         | `20px`                                                      | `20px`                                     |
| `--dimension-height-24`         | `24px`                                                                                         | `24px`                                                      | `24px`                                     |
| `--dimension-height-28`         | `28px`                                                                                         | `28px`                                                      | `28px`                                     |
| `--dimension-height-40`         | `40px`                                                                                         | `40px`                                                      | `40px`                                     |
| `--dimension-height-64`         | `64px`                                                                                         | `64px`                                                      | `64px`                                     |
| `--dimension-width-4`           | `4px`                                                                                          | `4px`                                                       | `4px`                                      |
| `--dimension-width-8`           | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--dimension-width-12`          | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--dimension-width-16`          | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--dimension-width-20`          | `20px`                                                                                         | `20px`                                                      | `20px`                                     |
| `--dimension-width-24`          | `24px`                                                                                         | `24px`                                                      | `24px`                                     |
| `--dimension-width-28`          | `28px`                                                                                         | `28px`                                                      | `28px`                                     |
| `--dimension-width-40`          | `40px`                                                                                         | `40px`                                                      | `40px`                                     |
| `--dimension-width-64`          | `64px`                                                                                         | `64px`                                                      | `64px`                                     |
| `--spacing-gap-0`               | `0px`                                                                                          | `0px`                                                       | `0px`                                      |
| `--spacing-gap-1`               | `1px`                                                                                          | `1px`                                                       | `1px`                                      |
| `--spacing-gap-2`               | `2px`                                                                                          | `2px`                                                       | `2px`                                      |
| `--spacing-gap-4`               | `4px`                                                                                          | `4px`                                                       | `4px`                                      |
| `--spacing-gap-6`               | `6px`                                                                                          | `6px`                                                       | `6px`                                      |
| `--spacing-gap-8`               | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--spacing-gap-10`              | `10px`                                                                                         | `10px`                                                      | `10px`                                     |
| `--spacing-gap-12`              | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--spacing-gap-16`              | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--spacing-gap-20`              | `20px`                                                                                         | `20px`                                                      | `20px`                                     |
| `--spacing-gap-24`              | `24px`                                                                                         | `24px`                                                      | `24px`                                     |
| `--spacing-padding-1`           | `1px`                                                                                          | `1px`                                                       | `1px`                                      |
| `--spacing-padding-2`           | `2px`                                                                                          | `2px`                                                       | `2px`                                      |
| `--spacing-padding-4`           | `4px`                                                                                          | `4px`                                                       | `4px`                                      |
| `--spacing-padding-6`           | `6px`                                                                                          | `6px`                                                       | `6px`                                      |
| `--spacing-padding-8`           | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--spacing-padding-10`          | `10px`                                                                                         | `10px`                                                      | `10px`                                     |
| `--spacing-padding-12`          | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--spacing-padding-16`          | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--spacing-padding-24`          | `24px`                                                                                         | `24px`                                                      | `24px`                                     |
| `--stroke-border-1`             | `1px`                                                                                          | `1px`                                                       | `1px`                                      |
| `--stroke-border-0_5`           | `0.5px`                                                                                        | `0.5px`                                                     | `0.5px`                                    |
| `--stroke-border-1_5`           | `1.5px`                                                                                        | `1.5px`                                                     | `1.5px`                                    |
| `--stroke-divider-1`            | `1px`                                                                                          | `1px`                                                       | `1px`                                      |
| `--stroke-divider-2`            | `2px`                                                                                          | `2px`                                                       | `2px`                                      |
| `--shadow-blur-2`               | `2px`                                                                                          | `2px`                                                       | `2px`                                      |
| `--shadow-blur-4`               | `4px`                                                                                          | `4px`                                                       | `4px`                                      |
| `--shadow-blur-8`               | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--shadow-blur-16`              | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--shadow-blur-32`              | `32px`                                                                                         | `32px`                                                      | `32px`                                     |
| `--shadow-position-8`           | `8px`                                                                                          | `8px`                                                       | `8px`                                      |
| `--shadow-position-24`          | `24px`                                                                                         | `24px`                                                      | `24px`                                     |
| `--typography-font-size-10`     | `10px`                                                                                         | `10px`                                                      | `10px`                                     |
| `--typography-font-size-12`     | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--typography-font-size-14`     | `14px`                                                                                         | `14px`                                                      | `14px`                                     |
| `--typography-font-size-16`     | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--typography-line-height-12`   | `12px`                                                                                         | `12px`                                                      | `12px`                                     |
| `--typography-line-height-16`   | `16px`                                                                                         | `16px`                                                      | `16px`                                     |
| `--typography-line-height-18`   | `18px`                                                                                         | `18px`                                                      | `18px`                                     |
| `--typography-line-height-20`   | `20px`                                                                                         | `20px`                                                      | `20px`                                     |
| `--font-sans`                   | `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | `"Lexend", "Manrope", system-ui, -apple-system, sans-serif` | `var(--font-inter), system-ui, sans-serif` |
| `--font-weight-regular`         | `400`                                                                                          | `400`                                                       | `400`                                      |
| `--font-weight-book`            | `450`                                                                                          | `450`                                                       | `450`                                      |
| `--font-weight-medium`          | `500`                                                                                          | `500`                                                       | `500`                                      |
| `--font-weight-strong`          | `550`                                                                                          | `550`                                                       | `550`                                      |
| `--text-xs`                     | `0.75rem`                                                                                      | `0.75rem`                                                   | `0.75rem`                                  |
| `--text-sm`                     | `0.875rem`                                                                                     | `0.875rem`                                                  | `0.875rem`                                 |
| `--text-base`                   | `1rem`                                                                                         | `1rem`                                                      | `1rem`                                     |
| `--text-lg`                     | `1.125rem`                                                                                     | `1.125rem`                                                  | `1.125rem`                                 |
| `--text-xl`                     | `1.25rem`                                                                                      | `1.25rem`                                                   | `1.25rem`                                  |
| `--text-2xl`                    | `1.5rem`                                                                                       | `1.5rem`                                                    | `1.5rem`                                   |
| `--text-3xl`                    | `1.875rem`                                                                                     | `1.875rem`                                                  | `1.875rem`                                 |
| `--shadow-field`                | `rgba(0, 0, 0, 0.04) 0px 4px 4px 0px`                                                          | `rgba(0, 0, 0, 0.04) 0px 4px 4px 0px`                       | `rgba(0, 0, 0, 0.04) 0px 4px 4px 0px`      |
| `--shadow-hud`                  | `rgba(0, 0, 0, 0.12) 0px 4px 8px 0px`                                                          | `rgba(0, 0, 0, 0.12) 0px 4px 8px 0px`                       | `rgba(0, 0, 0, 0.12) 0px 4px 8px 0px`      |
| `--shadow-hud-hover`            | `rgba(0, 0, 0, 0.24) 0px 4px 8px 0px`                                                          | `rgba(0, 0, 0, 0.24) 0px 4px 8px 0px`                       | `rgba(0, 0, 0, 0.24) 0px 4px 8px 0px`      |
| `--shadow-hud-side`             | `rgba(0, 0, 0, 0.08) 4px 0px 8px 0px`                                                          | `rgba(0, 0, 0, 0.08) 4px 0px 8px 0px`                       | `rgba(0, 0, 0, 0.08) 4px 0px 8px 0px`      |
| `--shadow-hud-badge`            | `rgba(0, 0, 0, 0.12) 0px 2px 8px 0px`                                                          | `rgba(0, 0, 0, 0.12) 0px 2px 8px 0px`                       | `rgba(0, 0, 0, 0.12) 0px 2px 8px 0px`      |
| `--shadow-modal`                | `rgba(0, 0, 0, 0.08) 0px 4px 8px 0px`                                                          | `rgba(0, 0, 0, 0.08) 0px 4px 8px 0px`                       | `rgba(0, 0, 0, 0.08) 0px 4px 8px 0px`      |
| `--ease-standard`               | `cubic-bezier(0.4, 0, 0.2, 1)`                                                                 | `cubic-bezier(0.4, 0, 0.2, 1)`                              | `cubic-bezier(0.4, 0, 0.2, 1)`             |
| `--motion-fast`                 | `140ms`                                                                                        | `140ms`                                                     | `140ms`                                    |
| `--motion-panel`                | `240ms`                                                                                        | `240ms`                                                     | `240ms`                                    |
| `--motion-shimmer`              | `1.6s`                                                                                         | `1.6s`                                                      | `1.6s`                                     |
| `--shadow-column`               | `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px`                                                       | `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px`                    | `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px`   |
| `--shadow-button-sm`            | `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`                                                       | `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`                    | `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`   |
| `--shadow-button-md`            | `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px`                                                        | `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px`                     | `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px`    |
| `--shadow-sheet-top`            | `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px`                                                     | `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px`                  | `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px` |
| `--shadow-dropdown`             | `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px`                                                     | `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px`                  | `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px` |

## Ожидает значения от дизайнера

- business: переходный набор: значения перенесены с прежней палитры бренда там, где роль имеет прямой аналог, остальное — из maps; ждёт макета дизайнера для этого бренда
- business `--text-lg` = `1.125rem` — ожидает значения от дизайнера
- business `--text-xl` = `1.25rem` — ожидает значения от дизайнера
- business `--text-2xl` = `1.5rem` — ожидает значения от дизайнера
- business `--text-3xl` = `1.875rem` — ожидает значения от дизайнера
- business `--motion-fast` = `140ms` — ожидает значения от дизайнера
- business `--motion-panel` = `240ms` — ожидает значения от дизайнера
- business `--motion-shimmer` = `1.6s` — ожидает значения от дизайнера
- business `--shadow-column` = `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px` — ожидает значения от дизайнера
- business `--shadow-button-sm` = `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px` — ожидает значения от дизайнера
- business `--shadow-button-md` = `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px` — ожидает значения от дизайнера
- business `--shadow-sheet-top` = `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px` — ожидает значения от дизайнера
- business `--shadow-dropdown` = `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px` — ожидает значения от дизайнера
- booking: переходный набор: значения перенесены с прежней палитры бренда там, где роль имеет прямой аналог, остальное — из maps; ждёт макета дизайнера для этого бренда
- booking `--text-lg` = `1.125rem` — ожидает значения от дизайнера
- booking `--text-xl` = `1.25rem` — ожидает значения от дизайнера
- booking `--text-2xl` = `1.5rem` — ожидает значения от дизайнера
- booking `--text-3xl` = `1.875rem` — ожидает значения от дизайнера
- booking `--motion-fast` = `140ms` — ожидает значения от дизайнера
- booking `--motion-panel` = `240ms` — ожидает значения от дизайнера
- booking `--motion-shimmer` = `1.6s` — ожидает значения от дизайнера
- booking `--shadow-column` = `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px` — ожидает значения от дизайнера
- booking `--shadow-button-sm` = `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px` — ожидает значения от дизайнера
- booking `--shadow-button-md` = `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px` — ожидает значения от дизайнера
- booking `--shadow-sheet-top` = `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px` — ожидает значения от дизайнера
- booking `--shadow-dropdown` = `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px` — ожидает значения от дизайнера
- maps light `--icon-dander` = `#fa4d56` — опечатка в Figma (ожидается icon/danger) — имя держим как в источнике до правки макета
- maps light `--shimmer-peak` = `0.94` — ожидает значения от дизайнера
- maps light `--surface-map` = `#e9ece4` — ожидает значения от дизайнера
- maps light `--text-on-map` = `#22272e` — ожидает значения от дизайнера
- maps light `--rating-star` = `#f2a615` — ожидает значения от дизайнера
- maps dark `--icon-dander` = `#fa4d56` — опечатка в Figma (ожидается icon/danger) — имя держим как в источнике до правки макета
- maps dark `--shimmer-peak` = `1.12` — ожидает значения от дизайнера
- maps dark `--surface-map` = `#0a0e18` — ожидает значения от дизайнера
- maps dark `--text-on-map` = `#22272e` — ожидает значения от дизайнера
- maps dark `--rating-star` = `#f2a615` — ожидает значения от дизайнера
- maps `--text-lg` = `1.125rem` — ожидает значения от дизайнера
- maps `--text-xl` = `1.25rem` — ожидает значения от дизайнера
- maps `--text-2xl` = `1.5rem` — ожидает значения от дизайнера
- maps `--text-3xl` = `1.875rem` — ожидает значения от дизайнера
- maps `--motion-fast` = `140ms` — ожидает значения от дизайнера
- maps `--motion-panel` = `240ms` — ожидает значения от дизайнера
- maps `--motion-shimmer` = `1.6s` — ожидает значения от дизайнера
- maps `--shadow-column` = `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px` — ожидает значения от дизайнера
- maps `--shadow-button-sm` = `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px` — ожидает значения от дизайнера
- maps `--shadow-button-md` = `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px` — ожидает значения от дизайнера
- maps `--shadow-sheet-top` = `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px` — ожидает значения от дизайнера
- maps `--shadow-dropdown` = `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px` — ожидает значения от дизайнера

## Как отдать значения

1. В Figma Variables имена ролей совпадают с таблицей выше; коллекция на бренд, режим на тему.
2. Значения переносятся в `tokens/brands/<brand>.json` литералами (без ссылок), PR в этот репозиторий.
3. `npm run tokens:build` перегенерирует CSS и этот файл; `npm test` не пропустит пропущенную роль или `var()` в значении.
