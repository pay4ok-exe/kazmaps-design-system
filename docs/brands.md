# Бренды

Кит один: `Button` для KazMaps, KazMaps Business и KazMaps Booking — один и тот же компонент.
Бренд меняет **значения** ролей, не имена и не геометрию. Переключается атрибутом
`data-brand` на `<html>`, файл значений — `tokens/brands/<brand>.json`,
CSS — `styles/brands/<brand>.css`.

| бренд      | источник значений                                         | шрифт                 | тема без атрибута        |
| ---------- | --------------------------------------------------------- | --------------------- | ------------------------ |
| `maps`     | Figma «KazMaps Design System», `scripts/import-figma.mjs` | Inter 400/450/500/550 | светлая, следует системе |
| `business` | переходный набор, ждёт макета                             | Inter                 | тёмная                   |
| `booking`  | переходный набор, ждёт макета                             | Lexend                | тёмная                   |

## Переходные значения business и booking

Макетов этих брендов на контракте Figma пока нет. Чтобы переключатель бренда работал
уже сейчас, их файлы собраны из двух источников:

- роль имеет прямой аналог в прежней палитре бренда (0.3.0) — взято оттуда;
- аналога нет — взято значение `maps`.

Таблица переноса (новая роль ← прежняя):

| новая роль                  | прежняя роль                                                           |
| --------------------------- | ---------------------------------------------------------------------- |
| `action-accent-primary`     | `accent`                                                               |
| `action-accent-secondary`   | `accent-press`                                                         |
| `action-accent-subtle`      | `accent-soft-border`                                                   |
| `action-accent-hover`       | `accent-press` при 50 % — по правилу макета `hover = secondary @ 50 %` |
| `action-danger-primary`     | `danger`                                                               |
| `background-primary`        | `surface-panel`                                                        |
| `background-secondary`      | `surface-base`                                                         |
| `background-tertiary`       | `surface-raised`                                                       |
| `background-toggle`         | `surface-subtle`                                                       |
| `overlay-modal-dialog`      | `backdrop-scrim`                                                       |
| `border-primary`            | `border`                                                               |
| `border-secondary`          | `border-subtle`                                                        |
| `border-focus`              | `accent`                                                               |
| `border-error`              | `danger`                                                               |
| `text-primary`              | `text-primary`                                                         |
| `text-secondary`            | `text-muted`                                                           |
| `text-tertiary`             | `text-tertiary`                                                        |
| `text-white`                | `text-on-accent`                                                       |
| `text-accent`, `text-link`  | `accent`                                                               |
| `text-danger`               | `danger`                                                               |
| `icon-*`                    | как `text-*` той же ступени                                            |
| `tag-green`                 | `success`                                                              |
| `tag-orange`                | `warning`                                                              |
| `tag-red`                   | `danger`                                                               |
| `tag-blue`                  | `info`                                                                 |
| `tag-yellow`, `rating-star` | `highlight`                                                            |
| `text-on-map`               | `text-primary`                                                         |
| `surface-map`               | `surface-base`                                                         |

Всё остальное (`action-danger-secondary/subtle/hover`, `action-neutral-*`, `action-disabled`,
`background-toggle-2`, `traffic-*`, `weather-*`, остальные `tag-*`, числовые шкалы, тени,
тайминги) — значения `maps`. Пометка `_pending` в файле бренда попадает в `docs/tokens.md`
и на страницу Foundations → Tokens → Pending from designer.

Когда дизайнер отдаст макет бренда: значения переносятся литералами в
`tokens/brands/<brand>.json`, `_pending` удаляется, `npm run tokens:build`.

## Переезд business-client (0.6.x) и booking-client (0.3.0)

Оба клиента используют по четыре-пять компонентов; корневые `atoms` и `molecules` удалены.

| было (0.x)                                                                                   | стало (1.0.0)                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                                                                     | `Button` — `variant`: `accent` \| `neutral` \| `danger`; `size` и `loading` убраны, одна высота 40                                                                                                   |
| `Badge`, `BadgeVariant`                                                                      | прямой замены нет: `Chip` с `tone` покрывает `neutral` и `info`; цветные статусы (`success`, `warning`, `error`, `brand`) ждут макета бренда                                                         |
| `Avatar`                                                                                     | `Avatar` — кнопка 40 с тенью: снимок → буква имени → глиф; `size` и `color` убраны, цвет берётся из `seed`                                                                                           |
| `Spinner`                                                                                    | нет в макете; загрузка — `ShimmerBlock`                                                                                                                                                              |
| `StarRating`                                                                                 | `StarRating`                                                                                                                                                                                         |
| `ErrorBoundary`                                                                              | нет; ошибка секции — `SectionError`, ошибка действия — `useToast`                                                                                                                                    |
| `cn`                                                                                         | `cn`                                                                                                                                                                                                 |
| `colorFor`                                                                                   | удалён; для аватара — `seed` у `Avatar`, для прочих мест — перенести функцию в приложение                                                                                                            |
| `styles/core.css` + `styles/brands/<brand>.css`                                              | + `styles/theme.css` и `styles/kit.css` (порядок в README §1)                                                                                                                                        |
| роли `--brand`, `--ink`, `--card`, `--line`, `--muted`, `--bg`, `--space-page`, `--dur-base` | контракт Figma: `--action-accent-primary`, `--text-primary`, `--background-primary`, `--border-primary`, `--text-secondary`, `--background-secondary`; `--space-*` и `--dur-*` остаются в `core.css` |

Тексты ошибок в полях убраны намеренно: любая ошибка показывается тостом
(`ToastProvider` + `useToast`), поля принимают только `invalid`. Если текст ошибки всё же выводится рядом с `TextInput` или `PhoneInput`, свяжите его через
`aria-describedby`; `PhoneInput` принимает и `ref` для react-hook-form. У `CodeInput` и `DayPicker`
такой связи нет — для них ошибка остаётся тостом.
