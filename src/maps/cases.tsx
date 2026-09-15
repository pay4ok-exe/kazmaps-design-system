import { ChevronLeft, Coffee, Layers, MapPin, Plus, Route, Sun, Users } from "lucide-react";
import { type ReactElement, useEffect } from "react";

import {
  AvatarInitial,
  BottomSheet,
  Button,
  Chip,
  CodeInput,
  CollapseHandle,
  DayPicker,
  Dialog,
  EmptyState,
  ForecastCard,
  IconButton,
  InDevelopment,
  LegalLink,
  ListRow,
  LogoLockup,
  LogoPin,
  MapCompass,
  MapTrafficBadge,
  NavRail,
  Panel,
  ProfileButton,
  PasswordInput,
  PhoneInput,
  PlaceRow,
  QrCode,
  ScaleBar,
  SearchInput,
  SectionError,
  SectionHeader,
  SegmentedRow,
  SelectField,
  ShimmerBlock,
  StarRating,
  TextInput,
  ToastProvider,
  Toggle,
  WeatherBadge,
  ToggleSwitch,
  useToast,
} from "./index";

const noop = () => undefined;

export const KIT_CASES: [string, ReactElement][] = [
  [
    "Button outline",
    <Button key="k" variant="outline">
      Сохранить
    </Button>,
  ],
  [
    "Button accent",
    <Button key="k" variant="accent">
      Продолжить
    </Button>,
  ],
  [
    "Button neutral",
    <Button key="k" variant="neutral">
      Отмена
    </Button>,
  ],
  [
    "Button danger",
    <Button key="k" variant="danger">
      Удалить
    </Button>,
  ],
  [
    "IconButton",
    <IconButton key="k" label="Моё местоположение">
      <Plus size={24} aria-hidden="true" />
    </IconButton>,
  ],
  ["AvatarInitial", <AvatarInitial key="k" name="Айгерим" seed="Айгерим" />],
  ["Chip", <Chip key="k" label="Кафе" />],
  ["Chip active", <Chip key="k" label="Кафе" active />],
  ["Chip с иконкой", <Chip key="k" label="Кафе" icon={<Coffee size={16} aria-hidden="true" />} />],
  [
    "Chip info",
    <Chip
      key="k"
      tone="info"
      label="Добро пожаловать"
      icon={<Users size={16} aria-hidden="true" />}
    />,
  ],
  ["CodeInput", <CodeInput key="k" values={["1", "2", "", ""]} onChange={noop} />],
  ["CodeInput error", <CodeInput key="k" values={["1", "2", "3", "4"]} onChange={noop} invalid />],
  ["InDevelopment", <InDevelopment key="k">Скоро</InDevelopment>],
  ["EmptyState", <EmptyState key="k" title="Пусто" description="Здесь пока ничего нет" />],
  [
    "ListRow",
    <ListRow
      key="k"
      icon={<Route size={16} aria-hidden="true" />}
      title="Маршруты"
      subtitle="3 сохранённых"
    />,
  ],
  [
    "ListRow link",
    <ListRow key="k" title="Помощь" href="https://kazmaps.dev" target="_blank" rel="noreferrer" />,
  ],
  ["LogoLockup", <LogoLockup key="k" />],
  ["LogoPin", <LogoPin key="k" />],
  [
    "Panel",
    <Panel key="k">
      <div className="p-3">Панель</div>
    </Panel>,
  ],
  ["PasswordInput", <PasswordInput key="k" label="Пароль" value="secret" onChange={noop} />],
  ["PhoneInput", <PhoneInput key="k" label="Телефон" hint="Код придёт в WhatsApp" />],
  ["PhoneInput invalid", <PhoneInput key="k" label="Телефон" invalid />],
  [
    "PlaceRow",
    <PlaceRow
      key="k"
      name="Кофейня"
      rating={4.6}
      category="Кафе"
      status="Открыто"
      metaText="300 м"
    />,
  ],
  ["QrCode", <QrCode key="k" value="https://kazmaps.dev" />],
  ["ScaleBar", <ScaleBar key="k" label="100 м" widthPx={80} />],
  ["SearchInput", <SearchInput key="k" value="" onChange={noop} placeholder="Поиск" />],
  [
    "SearchInput compact",
    <SearchInput key="k" value="кофе" onChange={noop} placeholder="Поиск" compact />,
  ],
  ["SectionError", <SectionError key="k" message="Не удалось загрузить" onRetry={noop} />],
  ["SectionHeader", <SectionHeader key="k">Рядом</SectionHeader>],
  [
    "SectionHeader с действием",
    <SectionHeader key="k" action={<Chip label="Все" />}>
      Рядом
    </SectionHeader>,
  ],
  [
    "SegmentedRow",
    <SegmentedRow
      key="k"
      label="Слои"
      activeId="a"
      onSelect={noop}
      items={[
        { id: "a", label: "Карта", icon: <MapPin size={16} aria-hidden="true" /> },
        { id: "b", label: "Слои", icon: <Layers size={16} aria-hidden="true" /> },
      ]}
    />,
  ],
  [
    "SelectField",
    <SelectField
      key="k"
      label="Город"
      value="almaty"
      onChange={noop}
      options={[
        { value: "almaty", label: "Алматы" },
        { value: "astana", label: "Астана" },
      ]}
    />,
  ],
  [
    "SelectField bordered",
    // Без видимой подписи имя приходит из aria-label — иначе select остаётся
    // безымянным для скринридера (axe: select-name).
    <SelectField
      key="k"
      bordered
      aria-label="Город"
      value="almaty"
      onChange={noop}
      options={[{ value: "almaty", label: "Алматы" }]}
    />,
  ],
  [
    "IconButton circle",
    <IconButton key="k" shape="circle" label="Профиль">
      <Users size={20} aria-hidden="true" />
    </IconButton>,
  ],
  ["MapCompass", <MapCompass key="k" label="На север" heading={35} />],
  ["MapCompass aligned", <MapCompass key="k" label="На север" aligned />],
  [
    "ProfileButton",
    <ProfileButton key="k" label="Профиль" icon={<Users size={24} aria-hidden="true" />} />,
  ],
  [
    "ProfileButton active",
    <ProfileButton key="k" active label="Профиль" icon={<Users size={24} aria-hidden="true" />} />,
  ],
  ["MapTrafficBadge", <MapTrafficBadge key="k" level="orange" value={6} label="Пробки" />],
  ["MapTrafficBadge off", <MapTrafficBadge key="k" level={null} value={3} label="Пробки" />],
  [
    "WeatherBadge",
    <WeatherBadge
      key="k"
      aria-label="Погода"
      temperature="18"
      icon={<Sun size={20} aria-hidden="true" className="text-(color:--weather-sun)" />}
    />,
  ],
  [
    "ForecastCard",
    <ForecastCard
      key="k"
      current
      title="14:00"
      icon={<Sun size={32} aria-hidden="true" className="text-(color:--weather-sun)" />}
      temperature="+20°"
      precipitation="0%"
    />,
  ],
  [
    "ForecastCard weekly",
    <ForecastCard
      key="k"
      title="Пн"
      day="понедельник"
      icon={<Sun size={32} aria-hidden="true" className="text-(color:--weather-sun)" />}
      temperature="+20°"
      precipitation="10%"
    />,
  ],
  [
    "CollapseHandle",
    <CollapseHandle key="k" open label="Свернуть панель">
      <ChevronLeft size={20} aria-hidden="true" />
    </CollapseHandle>,
  ],
  [
    "LegalLink",
    <LegalLink key="k" href="https://kazmaps.dev">
      Условия
    </LegalLink>,
  ],
  [
    "NavRail",
    <NavRail
      key="k"
      label="Разделы"
      activeId="search"
      items={[
        {
          id: "search",
          label: "Поиск",
          icon: <MapPin size={20} aria-hidden="true" />,
          onSelect: noop,
        },
        {
          id: "routes",
          label: "Маршруты",
          icon: <Route size={20} aria-hidden="true" />,
          onSelect: noop,
        },
      ]}
      secondaryItems={[
        {
          id: "install",
          label: "Установить",
          icon: <Plus size={20} aria-hidden="true" />,
          onSelect: noop,
        },
      ]}
    />,
  ],
  ["ShimmerBlock", <ShimmerBlock key="k" className="h-4 w-24" />],
  ["StarRating", <StarRating key="k" value={4.5} />],
  [
    "TextInput",
    <TextInput key="k" label="Имя" value="" onChange={noop} placeholder="Как вас зовут" />,
  ],
  ["TextInput invalid", <TextInput key="k" label="Имя" value="" onChange={noop} invalid />],
  ["Toggle", <Toggle key="k" checked onChange={noop} label="Уведомления" />],
  [
    "ToggleSwitch",
    <ToggleSwitch
      key="k"
      label="Вид"
      activeId="map"
      onSelect={noop}
      options={[
        { id: "map", label: "Карта" },
        { id: "list", label: "Список" },
      ]}
    />,
  ],
];

function ToastDemo() {
  const show = useToast();
  useEffect(() => {
    show("Маршрут сохранён", {
      action: { label: "Открыть", onClick: () => undefined },
      durationMs: 60_000,
    });
  }, [show]);
  return null;
}

export const OVERLAY_CASES: [string, ReactElement][] = [
  [
    "Dialog",
    <Dialog
      key="k"
      title="Удалить маршрут?"
      subtitle="Действие нельзя отменить"
      onClose={() => undefined}
    >
      <p className="text-[13.5px]">Маршрут исчезнет из списка.</p>
    </Dialog>,
  ],
  [
    "BottomSheet",
    <BottomSheet
      key="k"
      snaps={[{ id: "half", heightClassName: "h-[50vh]" }]}
      snap="half"
      onSnapChange={() => undefined}
      label="Лист"
      title="Рядом"
    >
      <div className="p-4">Содержимое листа</div>
    </BottomSheet>,
  ],
  [
    "Toast",
    <ToastProvider key="k">
      <ToastDemo />
    </ToastProvider>,
  ],
  [
    "DayPicker",
    <DayPicker
      key="k"
      value="2026-09-09"
      max="2026-12-31"
      label="Дата"
      onChange={() => undefined}
    />,
  ],
];
