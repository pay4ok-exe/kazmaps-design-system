# @temirtator/kazmaps-design-system

Дизайн-система KazMaps: один UI-кит для всех продуктов — KazMaps, KazMaps Business, KazMaps
Booking. Компоненты сняты с макета Figma «KazMaps Design System» пиксель в пиксель; бренд
меняет только значения токенов, не компоненты. React 19, Tailwind CSS v4, TypeScript.

## Установка

```bash
npm i @temirtator/kazmaps-design-system lucide-react
```

Peer-зависимости:

- `react` ^19.0.0
- `react-dom` ^19.0.0
- `lucide-react` ^1.0.0
- `qrcode` ^1.5.4 — необязательный, нужен только `QrCode`

## Подключение в Next.js или Tailwind v4 приложение

### 1. Стили в `globals.css`

```css
@import "tailwindcss";
@import "@temirtator/kazmaps-design-system/styles/core.css";
@import "@temirtator/kazmaps-design-system/styles/theme.css";
@import "@temirtator/kazmaps-design-system/styles/brands/maps.css";
@import "@temirtator/kazmaps-design-system/styles/kit.css";

@source "../../node_modules/@temirtator/kazmaps-design-system/dist";
```

Файл бренда — один из `brands/maps.css`, `brands/business.css`, `brands/booking.css`.
Порядок менять нельзя: `--ease-standard` объявлен и в `core.css`, и в файле бренда с одной
специфичностью — побеждает тот, что подключён позже, то есть бренд.

`theme.css` даёт утилиты Tailwind вида `bg-background-primary`, `text-text-secondary`,
`border-border-primary` для всех цветовых ролей; можно писать и напрямую —
`bg-(--background-primary)`.

`kit.css` — утилиты и keyframes, которые читают компоненты (`transition-interactive`,
`focus-ring`, `gradient-ring`, `animate-modal-in`, `animate-shimmer-placeholder`).

### 2. Атрибуты на корневом элементе

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-brand="maps" data-theme="light" lang="ru">
      <body>{children}</body>
    </html>
  );
}
```

- `data-brand`: `maps` | `business` | `booking`.
- `data-theme`: `light` | `dark`. Без атрибута `maps` показывает светлую тему и следует
  `prefers-color-scheme`; `business` и `booking` — тёмную.

Оба атрибута ставятся на `<html>`: `theme.css` объявляет `--color-*` на `:root`, и при атрибуте
на другом элементе утилиты `bg-background-primary` перестанут находить значения.

### 3. Шрифт

Бренд `maps` использует переменный Inter с весами 400, 450, 500 и 550 через `--font-inter`.
В Next.js — `next/font` без списка `weight`, иначе 450 и 550 не загрузятся:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
```

### 4. Флаги стран

`PhoneInput` показывает флаг региона эмодзи — так он нарисован в макете. macOS, iOS и Android
рисуют флаги сами; Windows вместо флага показывает две буквы. Для Windows подключите в
приложении шрифт с флагами один раз при старте:

```bash
npm i country-flag-emoji-polyfill
```

```tsx
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

polyfillCountryFlagEmojis(); // регистрирует шрифт «Twemoji Country Flags» только там, где флагов нет
```

Компонент ставит этот шрифт первым в стеке, поэтому больше ничего настраивать не нужно.

### 5. Компоненты

```tsx
import { Button, TextInput, PlaceRow, useToast } from "@temirtator/kazmaps-design-system";
```

Вход `/maps` оставлен как реэкспорт корня и будет удалён; новые импорты — из корня.

### 6. Иконки

Набор иконок макета: 101 заливной глиф в поле 24×24, три раздела — Interface, Map UI,
Weather.

```tsx
import { IconSearchBold, IconStarLight } from "@temirtator/kazmaps-design-system/icons";

<IconSearchBold size={20} />
<IconStarLight title="Рейтинг" />
```

Одноцветные иконки залиты `currentColor`. Иконки погоды многоцветные: читают роли
`--weather-*` и на `currentColor` не реагируют. Без `title` иконка декоративная и скрыта от
скринридера. `ICON_MANIFEST` перечисляет набор, раздел и начертание каждой иконки.

## Компоненты

Действия: `Button` (`accent` | `neutral` | `danger`), `IconButton` (Map Action, 36), `IconButtonGroup` (зум), `Chip`, `Toggle`,
`ToggleSwitch`, `SegmentedRow`, `Avatar`.

Поля: `TextInput`, `PasswordInput`, `SearchInput`, `PhoneInput`, `CodeInput`, `SelectField`,
`DayPicker`.

Оверлеи: `Dialog`, `BottomSheet`, `ToastProvider` + `useToast`.

Карта: `MapCompass`, `MapTrafficBadge`, `WeatherBadge`, `ForecastCard`, `ScaleBar`, `NavRail`,
`CollapseHandle`, `Panel`.

Содержимое: `PlaceRow`, `ListRow`, `SectionHeader`, `SectionError`, `EmptyState`,
`ShimmerBlock`, `StarRating`, `LogoLockup`, `LegalLink`, `InDevelopment`, `QrCode`.

Хелперы: `cn`, `useFocusTrap`, `isTopmostTrap`, `REGIONS`, `findRegion`, `parseE164`,
`formatE164`, `toE164`, `isKazakhstanMobile`.

### Ошибки — только тостом

Ни одно поле не рисует текст ошибки под собой: поля принимают булев `invalid`, а текст
показывает `useToast`. Так во всех продуктах KazMaps.

```tsx
const show = useToast();
<TextInput value={v} onChange={setV} invalid={!valid} />;
if (!valid) show("Введите номер полностью");
```

### PhoneInput

```tsx
<PhoneInput label="Номер телефона" onChange={({ e164, complete }) => complete && send(e164)} />
```

| Проп                                      | Тип                            | Описание                                                                                                   |
| ----------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `value`                                   | `string`                       | E.164 (`"+77012345678"`) или `""` — контролируемый режим.                                                  |
| `defaultValue`                            | `string`                       | Начальное E.164 для неконтролируемого режима.                                                              |
| `defaultRegion`                           | `RegionCode`                   | Регион, когда `value`/`defaultValue` пусты; по умолчанию `"KZ"`.                                           |
| `onChange`                                | `(value: PhoneValue) => void`  | На каждое изменение; `value.e164` пуст, пока номер не введён полностью.                                    |
| `onRegionChange`                          | `(region: RegionCode) => void` | Только при смене региона — выбор в пикере или вставка номера с другим кодом страны.                        |
| `onFocus`, `onBlur`                       | `FocusEventHandler`            | Проксируются на внутренний `<input>`.                                                                      |
| `regions`                                 | `RegionCode[]`                 | Ограничивает список регионов.                                                                              |
| `locale`                                  | `"ru" \| "en"`                 | Язык названий стран; по умолчанию `"ru"`.                                                                  |
| `label`                                   | `string`                       | Подпись над полем; пустая строка или пробелы — без подписи. Подсказок и текста ошибки под полем нет.       |
| `invalid`                                 | `boolean`                      | Красная обводка и `aria-invalid`; текст ошибки — тостом.                                                   |
| `required`, `disabled`, `readOnly`        | `boolean`                      |                                                                                                            |
| `id`, `name`, `autoFocus`, `autoComplete` |                                | Как у обычного `<input>`; `autoComplete` по умолчанию `"tel-national"`.                                    |
| `labels`                                  | `Partial<PhoneInputLabels>`    | Тексты пикера: имя кнопки региона, плейсхолдер поиска, заголовки групп, пустой результат.                  |
| `className`                               | `string`                       | Класс корневой обёртки.                                                                                    |
| `ref`                                     | `Ref<HTMLInputElement>`        | Ссылка на внутренний `<input>`: `ref={field.ref}` у react-hook-form фокусирует поле с ошибкой.             |
| `aria-describedby`                        | `string`                       | Связывает поле с текстом ошибки, выведенным рядом с ним.                                                   |
| `aria-label`                              | `string`                       | Имя поля без видимой подписи; при непустом `label` не применяется.                                         |
| `aria-labelledby`                         | `string`                       | Применяется всегда. Видимая подпись имеет id `<id>-label` — сошлитесь на неё, чтобы собрать составное имя. |

- Селектор показывает флаг, код страны набран текстом в поле: «+7 701 234 56 78». Пикер — все
  страны с поиском, точные маски для СНГ, остальным цифры группами и проверка длины E.164. Вставка `+998…` переключает регион сама; `8 701…` нормализуется в KZ.
- Код `+1` общий для нескольких стран; `parseE164` и вставленный `+1…` по умолчанию дают `US`.
- React Hook Form — через `Controller`: `onChange={(v) => field.onChange(v.e164)}` и `ref={field.ref}`,
  чтобы форма могла поставить фокус в поле с ошибкой.
- Контролируемый `value=""` не очищает частично введённое поле: компонент пересинхронизируется
  только когда внешний `value` отличается от последнего отправленного E.164 — иначе поле дёргалось
  бы во время набора.
- `locale` переключает только названия стран; остальные тексты пикера — из `labels`, дефолты
  русские.

## Токены

Контракт один на все бренды: имена ролей — имена Figma Variables (`группа/роль` →
`--группа-роль`).

- Цвета по темам: `action/*`, `background/*`, `overlay/*`, `border/*`, `text/*`, `icon/*`,
  `tag/*`, `traffic/*`, `weather/*`, `map/*`; `effect/shimmer-peak`.
- Статические: `dimension/corner-radius/*`, `dimension/height|width/*`, `spacing/gap|padding/*`,
  `stroke/*`, `shadow/blur|position/*`, `typography/font-size|line-height/*`, `font-sans`,
  `font-weight-*`, `text-xs…3xl`, тени и тайминги кита (`shadow-hud`, `motion-panel`,
  `ease-standard` и другие).

Источник истины — `tokens/schema.json` и `tokens/brands/*.json`; CSS и `docs/tokens.md`
генерирует `npm run tokens:build`. Бренд `maps` импортируется из `tokens/figma/export.json`
командой `npm run tokens:import`; `business` и `booking` пока переходные — `docs/brands.md`.
Чего не хватает в макете — `docs/figma-deltas.md`.

Обводки повторяют `strokeAlign` макета и места не занимают: внутренние рисуются `inset-ring`,
градиентное кольцо `Button` — отдельным слоем `gradient-ring`, внешние — `ring`. Высоты
совпадают с макетом: `Chip` и `SelectField` 28, `IconButton` 36, `TextInput`, `PhoneInput` и
`SearchInput` 36, `Button`, `Avatar` и `MapCompass` 40, ячейка `CodeInput` 48, `PlaceRow` 72.

### Переопределение токенов в приложении

Селектор должен быть не слабее селектора бренда `[data-brand="…"]` (0,1,0), иначе значения
бренда победят:

```css
:root[data-brand] {
  --font-sans: var(--font-inter, "Inter"), system-ui, sans-serif;
}
```

`--font-inter` должен быть объявлен загрузчиком шрифтов — голый `var()` на несуществующую
переменную инвалидирует весь `--font-sans`.

## Разработка

### Storybook

Витрина с переключателями бренда × темы в тулбаре — каждая история показывается под любым
брендом. По умолчанию канва — фон страницы Figma (`#a7a7a7` + белый 25 %), чтобы сравнивать компонент с
макетом один в один; переключатель Canvas возвращает фон бренда:

```bash
npm run storybook
```

Опубликованная версия: https://temirtator.github.io/kazmaps-design-system/

### Проверки

```bash
npm run lint
npm run typecheck
npm run test          # tokens:check + vitest
npm run test:vrt      # скриншоты Storybook, Playwright
npm run test:e2e      # взаимодействия PhoneInput
npm run build
```

### Иконки из Figma

Нужен персональный токен Figma с областью `file_read` в переменной `FIGMA_TOKEN` или в
локальном `.env`:

```bash
npm run icons:import
npm run icons:build
```

Импорт заменяет `src/icons/svg` только после того, как все глифы скачаны. Слои с
подчёркиванием в начале имени в набор не входят. `npm run icons:check` падает, если
сгенерированные компоненты разошлись с исходными SVG.

## Релизы

1. Секция `## [X.Y.Z] — YYYY-MM-DD` в `CHANGELOG.md`.
2. `npm version patch|minor|major -m "chore: release X.Y.Z"`.
3. `git push --follow-tags`.
4. `npm publish`.

`1.0.0` — один кит на все бренды; `business-client` и `booking-client` переезжают с `0.3.0` по
`docs/brands.md`.

## Лицензия

MIT, copyright Temirlan Shagyrov, 2026.
