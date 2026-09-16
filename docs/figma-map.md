# Что из макета во что превратилось

Файл Figma «KazMaps Design System» (`eI51Nnu0d74Y5xdO3XIZ30`), страницы
«Components - Web», «Blocks - Web» и «Additional». Экранов сайта это не касается:
файл «KazMaps Website» своих компонентов не содержит, там стоят копии отсюда.

Таблица нужна в обе стороны. Дизайнеру — увидеть, под каким именем его компонент
живёт в коде, и поправить имя у себя, если оно неудачное. Разработчику — понять,
какую ноду мерить, когда компонент изменится.

## Компоненты макета

| Figma                   | id        | раздел       | в коде                     | заметка                                                                               |
| ----------------------- | --------- | ------------ | -------------------------- | ------------------------------------------------------------------------------------- |
| Button                  | `147:271` | Essential    | `Button`                   | варианты `accent`, `neutral`, `danger`                                                |
| Select Field            | `129:77`  | Essential    | `SelectField`              | вариант `Stroke` — проп `bordered`; открытый список не нарисован                      |
| Toggle Switch           | `141:612` | Essential    | `PillTabs`                 | **имя изменено**: переключателя тут нет, это вкладки-пилюли                           |
| _Toggle Option          | `141:604` | Essential    | внутри `PillTabs`          | отдельным компонентом не выносили                                                     |
| Contact Input           | `148:721` | Login        | `TextInput` и `PhoneInput` | `Type=Email` и `Type=Number` — разные компоненты                                      |
| Code Input Cell         | `149:836` | Login        | `CodeInput`                | в макете нарисована ячейка, собранного поля нет                                       |
| Welcome Label           | `157:895` | Login        | `Chip` `tone="info"`       | геометрия та же, что у Category Label                                                 |
| Search Field            | `79:157`  | Navigation   | `SearchInput`              |                                                                                       |
| Near Place Card         | `89:31`   | Navigation   | `PlaceRow`                 | **имя изменено**                                                                      |
| Category Label          | `81:181`  | Navigation   | `Chip`                     | **имя изменено**: это чип с иконкой                                                   |
| Header                  | `88:30`   | Navigation   | —                          | **удалён по решению продукта**; совпадал по замерам                                   |
| _Tab Action             | `76:342`  | Navigation   | `NavItem`                  | **имя изменено**; вес глифа меняется с состоянием                                     |
| Map Action              | `97:53`   | Map HUD      | `IconButton`               | **имя изменено**                                                                      |
| Map Compass             | `109:612` | Map HUD      | `MapCompass`               |                                                                                       |
| Map Traffic             | `106:427` | Map HUD      | `MapTrafficBadge`          | **имя изменено**                                                                      |
| Map Weather             | `110:895` | Map HUD      | `WeatherBadge`             | **имя изменено**                                                                      |
| Forecast Card           | `179:199` | Map HUD      | `ForecastCard`             | четыре варианта: Current/Future × Hourly/Weekly                                       |
| Profile                 | `110:962` | Map HUD      | `Avatar`                   | **имя изменено**                                                                      |
| Collapse Sidebar Action | `99:124`  | Map HUD      | `CollapseHandle`           | **имя изменено**                                                                      |
| Legal                   | `109:720` | Map HUD      | `LegalLink`                | **имя изменено**                                                                      |
| Menu                    | `245:569` | Map HUD      | `Menu`                     |                                                                                       |
| Menu Item Divder        | `243:436` | Map HUD      | `MenuDivider`              | **опечатка в макете**: Divder → Divider                                               |
| Profile Menu Item       | `243:429` | Map HUD      | `MenuItem`                 | счётчик и точка непрочитанного                                                        |
| Servises Menu Item      | `245:680` | Map HUD      | `MenuItem` `chevron`       | **опечатка в макете**: Servises → Services                                            |
| Layers Menu Item        | `253:187` | Map HUD      | `MenuItem` `active`        | жирный глиф у активного                                                               |
| Menu Toggle Switch      | `245:744` | Map HUD      | `PillTabs` `size="menu"`   | тот же компонент, другие числа                                                        |
| _Menu Toggle Option     | `245:716` | Map HUD      | внутри `PillTabs`          |                                                                                       |
| Menu Toggle Item        | `251:758` | Map HUD      | `MenuTabs`                 | **имя изменено**: заголовок плюс пилюли                                               |
| Nav bar                 | `134:406` | Blocks - Web | `NavBar`                   |                                                                                       |
| Dialog                  | `137:440` | Blocks - Web | `Dialog`                   |                                                                                       |
| _ Dialog Close          | `137:422` | Blocks - Web | внутри `Dialog`            | три состояния кнопки закрытия                                                         |
| Captcha                 | `141:651` | Additional   | —                          | **не наш компонент**: Turnstile рисует Cloudflare в чужом iframe (`figma-deltas`, 15) |
| Map                     | `141:646` | Additional   | токен `--map-tile-style`   | не компонент, а название стиля тайлов                                                 |

Три пункта — `_Toggle Option`, `_Menu Toggle Option`, `_ Dialog Close` — в макете помечены
подчёркиванием как внутренние. В коде они тоже не экспортируются: живут внутри `PillTabs` и
`Dialog`.

## Компоненты, которых в макете нет

Это то, что осталось от прежнего кита main-web. Они работают, но дизайнером не нарисованы —
любой из них может поехать, когда появится макет.

| В коде            | Что это                  | Откуда взялось                                 |
| ----------------- | ------------------------ | ---------------------------------------------- |
| `BottomSheet`     | лист снизу на мобильном  | прежний кит                                    |
| `DayPicker`       | выбор даты               | прежний кит; глиф календаря тоже не из набора  |
| `EmptyState`      | заглушка пустого списка  | прежний кит, оставлен по решению               |
| `IconButtonGroup` | спаренные кнопки зума    | снят с экрана сайта, отдельного компонента нет |
| `InDevelopment`   | пометка «в разработке»   | прежний кит                                    |
| `ListRow`         | строка списка настроек   | прежний кит                                    |
| `LogoLockup`      | логотип с подписью       | снят с экрана сайта                            |
| `PasswordInput`   | пароль с глазом          | прежний кит; глифа глаза в наборе нет          |
| `QrCode`          | QR-код                   | прежний кит                                    |
| `ScaleBar`        | линейка масштаба карты   | снята с экрана сайта                           |
| `StarRating`      | рейтинг звездой          | прежний кит                                    |
| `Toast`           | всплывающее сообщение    | прежний кит; на нём держатся все тексты ошибок |
| `Toggle`          | переключатель «вкл/выкл» | прежний кит; не путать с `PillTabs`            |

## Что стоит поправить в макете

1. **`Menu Item Divder`** — опечатка, ожидается `Divider`.
2. **`Servises Menu Item`** — опечатка, ожидается `Services`.
3. **`icon/dander`** — опечатка в имени переменной, ожидается `icon/danger`. Имя роли мы держим
   как в источнике, иначе рассыпается трассировка (`figma-deltas`, 8).
4. **`Toggle Switch` и `Menu Toggle Item`** — переключателя в них нет, это вкладки. Если
   переименуете у себя, мы приведём код к новым именам.
5. **Высота пилюли в `Menu Toggle Switch`** — объявлен паддинг 4 при тексте 18, но высота
   зафиксирована числом 30: сумма не сходится (`figma-deltas`, 23).

Остальные открытые вопросы — в `docs/figma-deltas.md`.
