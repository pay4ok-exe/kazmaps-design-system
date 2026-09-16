import { Coffee, Layers, MapPin, Minus, Plus, Route, Sun, Users } from "lucide-react";
import { type ReactElement, useEffect } from "react";

import { BottomSheet } from "./bottom-sheet";
import { Button } from "./button";
import { Chip } from "./chip";
import { CodeInput } from "./code-input";
import { CollapseHandle } from "./collapse-handle";
import { DayPicker } from "./day-picker";
import { InDevelopment } from "./dev-badge";
import { Dialog } from "./dialog";
import { EmptyState } from "./empty-state";
import { ForecastCard } from "./forecast-card";
import { IconButton } from "./icon-button";
import { IconButtonGroup } from "./icon-button-group";
import { LegalLink } from "./legal-link";
import { ListRow } from "./list-row";
import { LogoLockup } from "./logo-lockup";
import { MapCompass } from "./map-compass";
import { MapTrafficBadge } from "./map-traffic-badge";
import { NavRail } from "./nav-rail";
import { Panel } from "./panel";
import { PasswordInput } from "./password-input";
import { PhoneInput } from "./phone-input";
import { PlaceRow } from "./place-row";
import { QrCode } from "./qr-code";
import { ScaleBar } from "./scale-bar";
import { SearchInput } from "./search-input";
import { SectionError } from "./section-error";
import { SectionHeader } from "./section-header";
import { SegmentedRow } from "./segmented-row";
import { SelectField } from "./select-field";
import { ShimmerBlock } from "./shimmer-block";
import { StarRating } from "./star-rating";
import { TextInput } from "./text-input";
import { ToastProvider, useToast } from "./toast";
import { Toggle } from "./toggle";
import { ToggleSwitch } from "./toggle-switch";
import { WeatherBadge } from "./weather-badge";

const noop = () => undefined;

export const KIT_CASES: [string, ReactElement][] = [
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
  [
    "Panel",
    <Panel key="k">
      <div className="p-3">Панель</div>
    </Panel>,
  ],
  ["PasswordInput", <PasswordInput key="k" label="Пароль" value="secret" onChange={noop} />],
  ["PhoneInput", <PhoneInput key="k" label="Телефон" />],
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
    <SelectField
      key="k"
      bordered
      aria-label="Город"
      value="almaty"
      onChange={noop}
      options={[{ value: "almaty", label: "Алматы" }]}
    />,
  ],
  ["MapCompass", <MapCompass key="k" label="На север" heading={35} />],
  ["MapCompass aligned", <MapCompass key="k" label="На север" aligned />],
  [
    "IconButtonGroup",
    <IconButtonGroup key="k" label="Масштаб">
      <IconButton label="Приблизить">
        <Plus size={24} aria-hidden="true" />
      </IconButton>
      <IconButton label="Отдалить">
        <Minus size={24} aria-hidden="true" />
      </IconButton>
    </IconButtonGroup>,
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
  ["CollapseHandle открыта", <CollapseHandle key="k" open label="Свернуть панель" />],
  ["CollapseHandle свёрнута", <CollapseHandle key="k" label="Развернуть панель" />],
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
    <Dialog key="k" title="Удалить маршрут?" onClose={() => undefined}>
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

export function Cases({ component }: { component: string }) {
  const cases = KIT_CASES.filter(([name]) => name.split(" ")[0] === component);
  return (
    <div className="flex max-w-[420px] flex-col gap-(--spacing-gap-16)">
      {cases.map(([name, element]) => (
        <section key={name} className="flex flex-col gap-(--spacing-gap-8)">
          <h3 className="text-[10px] leading-(--typography-line-height-12) tracking-wider text-(color:--text-tertiary) uppercase">
            {name}
          </h3>
          {element}
        </section>
      ))}
    </div>
  );
}

export function Overlay({ component }: { component: string }) {
  const found = OVERLAY_CASES.find(([name]) => name === component);
  return found ? found[1] : null;
}
