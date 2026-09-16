# Changelog

All notable changes to `@temirtator/kazmaps-design-system` are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning: semver.

## [Не выпущено]

### Changed

- `ForecastCard`: строки занимают всю ширину карточки и выравнены по центру, сама карточка
  обрезает содержимое, а заголовок и строка дня получают многоточие — как в макете `179:199`.
  Прежде длинное название дня («понедельник») вылезало за 64 пикселя карточки. У температуры и
  осадков обрезка в макете выключена, поэтому многоточия у них нет.
- **Ломающее.** `Dialog` больше не принимает `subtitle` и `showHeader`. В макете `137:440` в шапке
  только заголовок, а сама шапка есть всегда; поясняющий текст кладётся первым абзацем в тело —
  в макете это свободный слот. Семь диалогов main-web переносят текст из `subtitle` в `children`.
  Ширина (`size`) и растяжка тела оставлены как есть — `docs/figma-deltas.md`, пункты 18 и 19.
- **Ломающее.** `CollapseHandle` больше не принимает `children`: шеврон вшит в компонент и
  разворачивается вслед за `open`, как варианты макета (`Close` — влево, `Open` — вправо).
- `CollapseHandle` сведён к макету сайта (`Collapse Sidebar Action`, `121:7021` и `155:7884`):
  правые углы скруглены на 8, левые прямые; в свёрнутом виде белая кромка идёт только по верху,
  правому краю и низу — прежде обводка шла по всем четырём сторонам. Размер 24 × 36 больше не задан
  числом, а выведен из паддинга (`size-fit`).
- **Ломающее.** `SearchInput` сведён к макету `79:157`: пропы `onSubmit`, `submitLabel`,
  `compact` и `suffix` удалены вместе с синей кнопкой отправки и слотом справа, тень
  `--shadow-field` стоит всегда. В фокусе остаётся одна рамка `border/focus` — прежде поверх неё
  рисовалось второе кольцо `focus-ring-within`. Крестик очистки `::-webkit-search-cancel-button`
  скрыт: в макете его нет, в Firefox его не было, нашим ролям он не подчиняется.
  Что это значит для main-web — `docs/figma-deltas.md`, пункт 16.

## [1.0.0] — 2026-09-15

Один кит на все бренды. Все пункты «Removed» и отмеченные пункты «Changed» ломают совместимость с 0.7.0.
Таблица замен для business-client и booking-client — `docs/brands.md`.

### Removed

- `atoms` и `molecules`: `Input`, `Select`, `Badge`, `Tabs`, `FormField`, `ErrorBoundary`,
  `ThemeToggle`, `SegmentedControl`, `Spinner`, `Skeleton`, `Heading`, `Text`, `Caption`,
  `Checkbox`, `Textarea`, `Divider`, `ChipPill` и прежние корневые `Button`, `Avatar`, `Chip`,
  `Toggle`, `PhoneInput`, `SearchInput`, `StarRating`. Корневой вход отдаёт компоненты макета.
- Корневые `colorFor`, `DEFAULT_REGION` и тип `RegionGroup`. Цвет по строке нужен только аватару —
  `Avatar` берёт его из `seed`; другим местам приложения функцию стоит перенести к себе.
- `AvatarInitial` и `AvatarInitialSize`: запасная буква и цвет из `seed` переехали в `Avatar`.
- `ProfileButton`: переименован в `Avatar`.
- `LogoPin` и `LogoPinProps`: разметка значка теперь внутри `LogoLockup`.
- `size` у `Button` и `IconButton`, `shape` у `IconButton`, типы `ButtonSize`, `IconButtonSize`,
  `IconButtonShape`: в макете одна высота — 40 у кнопки и 36 у кнопки карты.
- Варианты `Button` `outline` и `outline-accent`: в макете их нет, `SectionError` перешёл на `neutral`.
- `PhoneInput`: проп `hint`. Под полем нет ни подсказок, ни текста ошибки — любой текст показывает тост.
- Прежний контракт токенов (`--surface-*`, `--text-muted`, `--accent*`, `--radius-*`, `--brand`,
  `--ink`, `--card`, `--line`, `--muted`, `--bg`, `--gold`, `--highlight*`, `--shadow-sm/md/lg`),
  все алиасы, `schema.byBrand` с `replacesContract`, роли `--marker-primary` и `--map-tile-style`.
- Вход `styles/kits/maps.css`: теперь `styles/kit.css`, утилиты и keyframes нужны любому бренду.

### Changed

- **Ломающее.** Контракт токенов один — имена переменных Figma (`action/*`, `background/*`,
  `border/*`, `text/*`, `icon/*`, `tag/*`, `traffic/*`, `weather/*`, `map/*`, `effect/*`, шкалы
  `dimension/*`, `spacing/*`, `stroke/*`, `shadow/*`, `typography/*`). Тени и тайминги кита
  (`--shadow-hud`, `--motion-panel`, `--ease-standard` и остальные) — статические роли каждого бренда;
  `--shimmer-peak`, `--surface-map`, `--text-on-map`, `--rating-star` — темизируемые роли.
- **Ломающее.** `business` и `booking` переведены на контракт Figma переходным набором: где у роли есть
  прямой аналог в прежней палитре — взято оттуда, остальное из `maps`. Шрифты брендов сохранены.
  Значения ждут макетов дизайнера — пометка `_pending` в файле бренда.
- **Ломающее.** `formatE164` отдаёт номер группами через пробел: «+7 701 234 56 78» вместо
  «+7 701 234-56-78».
- **Ломающее.** `Avatar` — кнопка 40 с тенью макета: снимок, иначе первая буква имени на цвете из
  `seed`, иначе глиф. `seed` — строка; меньших размеров и варианта без кнопки нет.
- `PhoneInput` по макету `148:721`: селектор показывает флаг и шеврон, код страны набран в поле перед
  номером и назван в подписи кнопки региона, маска группами через пробел. Принимает `ref` на поле и `aria-describedby`, `aria-label`, `aria-labelledby`: текст ошибки рядом с полем связывается через `aria-describedby`. `aria-label` действует только без видимой подписи, `aria-labelledby` — всегда; подпись получает id `<id>-label` для составного имени. Флаги регионов — эмодзи для
  всех 198 стран; для Windows — `country-flag-emoji-polyfill` в приложении (README §4).
- Вход `/maps` — реэкспорт корня; новые импорты — из корня.
- Набор `/icons`: 101 иконка вместо 96 (`edit`, `map-error`, `support`, набор `notification`),
  начертания одиночных иконок сняты по разделам макета.
- `theme.css` объявляет `--color-*` только для ролей типа `color` — по `$type` бренда `maps`.
- Storybook: витрина — раздел Components, переключатель бренда действует на каждую историю,
  Foundations → Tokens показывает палитру, статические роли и ожидания от дизайнера.

### Added

- `IconButtonGroup`: спаренные кнопки карты с общими тенью и радиусом.
- `npm run tokens:import`: импорт переменных из `tokens/figma/export.json` и сборка CSS. Роли контракта
  синхронизируются во все бренды: недостающие получают значения `maps`, лишние удаляются.

## [0.7.0] — 2026-09-15

### Changed

- **Ломающее для `/maps`.** Бренд `maps` переведён на переменные файла Figma «KazMaps Design System»:
  собственный контракт ролей (`action/*`, `background/*`, `border/*`, `text/*`, `icon/*`,
  `tag/*`, `traffic/*`, `weather/*`, шкалы `numerics`) описан в `schema.byBrand.maps` с
  `replacesContract`. Прежние имена кита (`--surface-*`, `--text-muted`, `--border-*`,
  `--accent*`, `--radius-*` и другие) остаются `var()`-алиасами. Роли общего контракта (`--bg`,
  `--ink`, `--brand`, `--card`, `--line`, `--muted`, `--warn`, `--gold`, `--highlight`,
  `--shadow-sm/md/lg`) под `data-brand="maps"` больше не объявлены: корневые атомы и молекулы
  под этим брендом не поддерживаются. Бренды `business` и `booking` не изменились.
- **Ломающее для `/maps`.** Гарнитура бренда — переменный Inter через `--font-inter`, веса 400,
  450, 500 и 550. Шрифт в приложении подключается без списка `weight`.
- **Ломающее для `/maps`.** Компоненты перемерены по макету:
  - `Button`: `variant="filled-accent"` → `accent`, добавлены `neutral`, `danger` и проп `icon`.
    Обводка — градиент, отдельного hover-стиля нет.
  - `TextInput` и `PhoneInput`: текстовый проп `error` заменён на булев `invalid`, текст ошибки
    показывает тост.
  - `PlaceRow`: `status` — строка без цвета, тип `PlaceRowStatus` удалён, добавлен слот
    `additional`.
  - `IconButton`: размер по умолчанию `md` (36px) вместо `lg` (40px), добавлен `shape`.
    `aria-pressed` ставится только при переданном `active`.
  - `SectionHeader` крупнее и принимает `action`; `SegmentedRow` отмечает активный пункт
    заливкой чипа; `Chip` получил `icon` и `tone`; `Dialog` — `closeLabel`.
- Тени `--shadow-field`, `--shadow-hud`, `--shadow-hud-hover`, `--shadow-hud-side`,
  `--shadow-hud-badge` и `--shadow-modal` сняты с макета. Обводки повторяют `strokeAlign` макета и
  места не занимают: внутренние рисуются кольцом `inset`, градиентное кольцо `Button` лежит
  отдельным слоем, у `MapTrafficBadge` обводка по центру, у `ProfileButton` — снаружи снимка.
  Высоты совпадают с макетом: `Chip` и `SelectField` 28, `TextInput`, `PhoneInput` и
  `SearchInput` 36, `Button` 40, ячейка `CodeInput` 48, `PlaceRow` 72.
- Значения, которых в макете нет, перенесены из 0.6.0 с пометкой ожидания дизайнера; сводный
  список — `docs/tokens.md` и `docs/figma-deltas.md`.

### Added

- Вход `@temirtator/kazmaps-design-system/icons`: 96 иконок макета (`IconSearchBold` и другие),
  обёртка `Icon` и `ICON_MANIFEST`. Многоцветные иконки погоды читают роли `--weather-*`.
- В `/maps`: `CodeInput`, `CollapseHandle`, `ForecastCard`, `LegalLink`, `MapCompass`,
  `MapTrafficBadge`, `NavRail`, `ProfileButton`, `SelectField`, `ToggleSwitch`, `WeatherBadge`.
- Скрипты `icons:import` (нужен `FIGMA_TOKEN`), `icons:build` и `icons:check`.

## [0.6.0] — 2026-09-14

### Removed

- `Input mask="phone"` (atoms), помеченный устаревшим с 0.3.0. Телефон вводится только через
  `PhoneInput` (корневой вход и `/maps`): регион, маска, E.164. Тип `InputMask` сужен до
  `"email" | "bin" | "url"`, пометка `@deprecated` с пропа `mask` снята — оставшиеся маски
  поддерживаются. Миграция: `<Input mask="phone" … />` → `<PhoneInput … />` (business-client,
  main-web и booking-client этот проп уже не используют, из-за этого удаления правок при
  обновлении пина не требуется).

## [0.5.1] — 2026-09-10

### Fixed

- `PhoneInput` (корневой и `maps`): казахстанские номера с сетевым кодом на `7`
  (`770`…`778`) невозможно было набрать посимвольно — каждая новая `7`, совпав с
  литералом маски KZ `(799) 999-99-99`, схлопывала `national` до `""`, из-за чего
  контролируемое значение сбрасывалось до пустой строки и следующая цифра снова
  попадала «перед» тем же литералом. Теперь литерал не путается с пустотой:
  `national`, равный одному литералу, больше не стирает отображение маски, а
  наружу (в `onChange`/`e164`/`complete`) по-прежнему проецируется как пустое
  значение. Заодно набор номера с ведущей `8` (`8 707 123 45 67` вместо `+7 707…`)
  теперь отбрасывает эту `8`, как и раньше делала только вставка/вклейка через
  `normalizeNational` — иначе `8` занимала первый редактируемый слот и итоговый
  номер получался неверным (`+77870712345` вместо `+77071234567`). Правило
  привязано к маске (первый слот не может принять `8`), а не к коду страны —
  срабатывает только там, где у маски есть литерал (KZ); RU с тем же кодом `7`,
  но без литерала, легитимные номера на `8` (`8005553535`) не теряет. Ветка
  правила также учитывает семантическую пустоту: набранный один литерал сам по
  себе больше не отключает проверку. См. issue #8.
- Устаревший `Input mask="phone"` (atoms) этим фиксом не затронут: он не
  использует общее ядро маски телефона и будет удалён в 0.6.0 — business-client
  уже перешёл на `PhoneInput` и его не использует.

## [0.5.0] — 2026-09-10

### Added

- Второй вход `@temirtator/kazmaps-design-system/maps` — примитивы main-web с родными
  именами (Button, IconButton, Chip, Toggle, TextInput, PasswordInput, SearchInput,
  StarRating, SegmentedRow, AvatarInitial, Dialog, BottomSheet, ToastProvider/useToast,
  Panel, ListRow, EmptyState, SectionHeader, SectionError, ShimmerBlock, DayPicker,
  ScaleBar, LogoPin, LogoLockup, PlaceRow, QrCode, InDevelopment, useFocusTrap,
  isTopmostTrap, PhoneInput, formatE164, parseE164, PHONE_INPUT_DEFAULT_LABELS,
  Region, RegionCode, findRegion, REGIONS, isKazakhstanMobile, toE164).
- `styles/kits/maps.css` — утилиты и keyframes кита; кит-статики бренда maps
  (`--motion-*`, `--shadow-button-*`, `--shadow-modal` …) в `tokens/brands/maps.json`.
- Роли контракта `--highlight` / `--highlight-soft` (все бренды); `--gold`/`--gold-soft`
  стали алиасами.
- Безголовое ядро телефона `useRegionPicker` / `usePhoneMask`; `maps/PhoneInput`.
- Бренд booking в VRT; интеракции PhoneInput под business и maps.

### Changed

- Шкала текста `--text-xs…3xl` переехала из `core.css` в бренды. business/booking — прежние px;
  maps — rem-значения Tailwind (`radius-sm|md|lg` maps = 0.25/0.375/0.5rem). **Апгрейд:**
  `--text-xs…3xl` теперь живут на `[data-brand]`, а не на `:root` — приложение-потребитель
  обязано держать атрибут `data-brand` на `<html>` (business-client и booking-client уже
  так и делают), иначе текстовая шкала не определена.
- Под `data-brand="maps"` любой корневой компонент, использующий `var(--ease-standard)`,
  теперь анимируется с кривой кита `cubic-bezier(0.4, 0, 0.2, 1)`, а не с `core.css`
  (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) — кит побеждает по порядку импорта, см. README §4.

### Deprecated

- `Input mask="phone"` остаётся с пометкой `@deprecated`: удаление перенесено на следующую
  минорную версию после миграции business-client на `PhoneInput` (три места: настройки,
  два шага онбординга).

## [0.4.0] — 2026-09-08

### Added

- Бренд `maps` (`styles/brands/maps.css`): светлая тема по умолчанию, тёмная по `data-theme="dark"`
  или системной `prefers-color-scheme`. Значения — палитра main-web.
- Источник истины токенов — `tokens/schema.json`, `tokens/core.json`, `tokens/brands/*.json`
  (W3C DTCG, литералы). CSS генерируется `npm run tokens:build`, дрейф ловит `npm run tokens:check`.
- `styles/theme.css` — Tailwind `@theme` с `--color-<роль>` для всех цветовых ролей контракта.
- `docs/tokens.md` — таблица значений по брендам и темам, список ролей и расширений брендов,
  ожидающих значения от дизайнера.
- Storybook: бренд `maps` в тулбаре, страница Foundations → Tokens читает JSON.
- Бренд `maps` также объявляет расширения `--gold` и `--gold-soft`: их читают Button и StarRating;
  в C2 пара становится ролью контракта.

### Changed

- Канон имён контракта v2: `--surface-base|panel|raised|subtle`, `--backdrop-scrim`,
  `--text-primary|secondary|muted|tertiary|faint|on-accent`, `--border|-subtle|-hairline|-input`,
  `--accent|-press|-soft-bg|-soft-border`, `--success|warning|danger|info` + `*-soft-bg`.
  Значения business и booking не изменились.
- Новые роли business/booking получили перенесённые значения (`text-faint` = прежний `muted-2`,
  `surface-subtle` = `bg-2`, `border-hairline` = `line-2`, `border-input` = `line`,
  `accent-soft-border` = `brand-200`, `text-on-accent` = `#ffffff`); `backdrop-scrim` временно
  `#00000080` до значения от дизайнера.
- Шкала `--brand-50…700` и `--gold*` — расширения брендов business/booking, не часть контракта.
- Удаление `Input mask="phone"` перенесено с 0.4.0 на 0.5.0.

### Deprecated

- Старые имена `--bg`, `--bg-2`, `--card`, `--ink`, `--ink-2`, `--muted`, `--muted-2`, `--line`,
  `--line-2`, `--brand`, `--brand-press`, `--brand-soft`, `--warn`, `--success-soft`, `--warn-soft`,
  `--danger-soft`, `--info-soft` — алиасы на канон, удаление в 1.0.0.

## [0.3.0] — 2026-09-04

### Added

- PhoneInput: телефон с выбором региона (флаг + код страны внутри поля), маской под регион и
  E.164 наружу (`{ e164, region, national, complete }`). Все страны в пикере с поиском; точные
  маски для KZ, RU, KG, UZ, TJ, TM, AZ, AM, BY, GE; остальным — цифры группами и проверка длины.
  Пустое поле остаётся пустым на фокусе ради автозаполнения; ведущие `8`/`7`/`+7` нормализуются;
  вставленный `+код` переключает регион. Размеры `md`/`lg`, `labels`/`locale` для i18n.
- Данные `REGIONS`/`findRegion` и хелперы `toE164`, `parseE164`, `formatE164`, `isKazakhstanMobile`.
- Playwright-контур интеракций в реальном Chromium поверх Storybook (`npm run test:e2e`).

### Changed

- Input `mask="phone"` переведён на `react-input-mask-format`: формат теперь
  `+7 (7__) ___-__-__` (дефисы, постоянная `7`), вставка `8 701…` нормализуется. Контракт
  `onChange(event)` прежний.

### Deprecated

- Input `mask="phone"` и тип `InputMask` — используйте `PhoneInput`; удаление в 0.4.0.

## [0.2.2] — 2026-07-28

### Added

- Select: проп `ariaLabel` — доступное имя триггера, когда видимого `label` нет. Нужен
  фильтрам без подписей (booking-client `/organizations`): `SelectProps` не расширяет
  нативные атрибуты, поэтому переданный `aria-label` уходил в никуда. Когда `label` задан,
  имя по-прежнему берётся из него — accname признаёт нативный `<label>` источником имени
  для labelable-элементов, включая `<button>`.
- ErrorBoundary: пропы `title` / `reloadLabel` / `genericMessage` и функциональная форма
  `fallback((message) => …)` — она отдаёт наружу текст пойманной ошибки, чтобы потребитель
  мог отрисовать свой локализованный фолбэк без потери сообщения. Дефолты прежние
  (русские), поэтому потребителям на 0.2.1 правки не нужны. Нужны трёхъязычным клиентам:
  фолбэк был захардкожен по-русски и пропами не открывался.
- ErrorBoundary: экспортируется тип `ErrorBoundaryProps`.

## [0.2.1] — 2026-07-28

### Added

- StarRating: проп `formatRating(value, max)` — задаёт числовую часть подписи и для каждой
  звезды в интерактивном режиме, и для рейтинга в display-режиме. Дефолт прежний
  («N из 5»), поэтому потребителям на 0.2.0 правки не нужны. Нужен трёхъязычным клиентам:
  подпись каждой звезды раньше была захардкожена по-русски и пропом не открывалась.
- Input: пропы `revealLabel` / `hideLabel` — подписи reveal-кнопки пароля. Дефолты прежние
  («Показать пароль» / «Скрыть пароль»).
- Avatar: проп `ariaLabel` — доступное имя, когда `name` не задан. Дефолт прежний
  («Аватар пользователя»).

### Fixed

- StarRating: при дробном `value` (например, средний рейтинг 3.4) интерактивная группа
  оставалась без единого фокусируемого элемента — точное сравнение `index === value` не
  совпадало ни с одной звездой, roving tabindex ломался и группа выпадала из tab-обхода.
  Активная звезда теперь округляется.

## [0.2.0] — 2026-07-23

### Added

- Клавиатура в Select: Enter/Space/ArrowDown/ArrowUp открывают, стрелки/Home/End ходят по
  опциям (disabled пропускаются), Escape закрывает с возвратом фокуса на триггер; listbox
  связан с label через aria-labelledby.
- StarRating: интерактивный режим — radiogroup из 5 звёзд (стрелки, roving tabindex,
  «N из 5»); display-режим — role="img" с подписью рейтинга; новый проп `ariaLabel`.
- Tabs: паттерн tablist/tab (aria-selected, стрелки, Home/End, roving tabindex).
- SegmentedControl: radiogroup-семантика со стрелками; новый проп `ariaLabel`.
- SearchInput: дефолтный aria-label («Поиск»); новый проп `ariaLabel`.
- FormField: render-prop получает `{ id, describedBy, invalid }` для aria-проводки; новый
  экспорт типа `FormFieldRenderProps`.
- Сводный axe-сьют по всем компонентам; a11y-аддон в Storybook.
- Скриншот-тесты (Playwright поверх собранного Storybook, `npm run test:vrt`): 28 базлайнов —
  все затронутые релизом компоненты × dark/light, плюс состояния open-Select и включённый
  Toggle. Базлайны платформозависимы (chromium-darwin); обновление — `npm run test:vrt:update`.
- Фокус-кольца у Toggle, reveal-кнопки Input, опций Select, звёзд StarRating.

### Fixed

- Select не открывался с клавиатуры (Enter/Space двойным переключением закрывали его обратно).
- Checkbox: галочка была невидима в тёмной теме (white на --ink); теперь var(--bg).
- Toggle: бегунок был невидим в тёмной теме; теперь var(--bg); подпись ассоциирована с
  переключателем (клик по ней работает, switch получил имя).
- ErrorBoundary: несуществующий класс text-inverse и сырые классы заменены токенами контракта.
- Input: reveal-кнопка пароля недостижима с клавиатуры (tabIndex=-1 убран).

### Breaking

- FormField render-prop: сигнатура `(id: string)` → `(field: { id, describedBy, invalid })`.
- Tabs/SegmentedControl: роли кнопок изменились (button → tab/radio) — селекторы в тестах
  потребителей обновить.
- StarRating: интерактивный режим теперь рендерит 5 кнопок role="radio" вместо голых SVG
  (селекторы по svg/кнопкам в тестах потребителей обновить); display-режим обёрнут в
  role="img", звёзды aria-hidden.
- Tabs: элемент-обёртка сменился с <nav> на <div role="tablist"> — лендмарк navigation
  исчез (селекторы getByRole("navigation") в тестах потребителей обновить).

## [0.1.0] — 2026-07-16

### Added

- Token contract: core defaults + brand presets `business` and `booking`, each dark + light
  (`data-brand`/`data-theme` on `<html>`).
- Atoms: Button, Input, Textarea, Select, Checkbox, Toggle, Badge, Chip, ChipPill, Avatar,
  Spinner, Skeleton, Divider, Heading, Text, Caption.
- Molecules: FormField, SearchInput, SegmentedControl, StarRating, ThemeToggle, Tabs,
  ErrorBoundary.
- `cn()` and `colorFor()` helpers; full TypeScript prop types.
- Storybook showcase with brand × theme toolbar and a Tokens page.
