import type { Meta, StoryObj } from "@storybook/react-vite";

import { KIT_CASES, OVERLAY_CASES } from "./cases";

const meta: Meta = { title: "Maps kit", globals: { brand: "maps" } };
export default meta;

function Cases({ component }: { component: string }) {
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

const cases = (component: string): StoryObj => ({
  name: component,
  render: () => <Cases component={component} />,
});

export const IconButton: StoryObj = cases("IconButton");
export const AvatarInitial: StoryObj = cases("AvatarInitial");
export const Chip: StoryObj = cases("Chip");
export const CodeInput: StoryObj = cases("CodeInput");
export const InDevelopment: StoryObj = cases("InDevelopment");
export const EmptyState: StoryObj = cases("EmptyState");
export const ListRow: StoryObj = cases("ListRow");
export const LogoLockup: StoryObj = cases("LogoLockup");
export const Panel: StoryObj = cases("Panel");
export const PasswordInput: StoryObj = cases("PasswordInput");
export const PhoneInput: StoryObj = cases("PhoneInput");
export const PlaceRow: StoryObj = cases("PlaceRow");
export const QrCode: StoryObj = cases("QrCode");
export const ScaleBar: StoryObj = cases("ScaleBar");
export const SearchInput: StoryObj = cases("SearchInput");
export const SectionError: StoryObj = cases("SectionError");
export const SectionHeader: StoryObj = cases("SectionHeader");
export const SegmentedRow: StoryObj = cases("SegmentedRow");
export const SelectField: StoryObj = cases("SelectField");
export const ProfileButton: StoryObj = cases("ProfileButton");
export const MapTrafficBadge: StoryObj = cases("MapTrafficBadge");
export const WeatherBadge: StoryObj = cases("WeatherBadge");
export const ForecastCard: StoryObj = cases("ForecastCard");
export const CollapseHandle: StoryObj = cases("CollapseHandle");
export const LegalLink: StoryObj = cases("LegalLink");
export const NavRail: StoryObj = cases("NavRail");
export const ShimmerBlock: StoryObj = cases("ShimmerBlock");
export const StarRating: StoryObj = cases("StarRating");
export const TextInput: StoryObj = cases("TextInput");
export const Toggle: StoryObj = cases("Toggle");
export const ToggleSwitch: StoryObj = cases("ToggleSwitch");

export const Dialog: StoryObj = { name: "Dialog (оверлей)", render: () => OVERLAY_CASES[0][1] };
export const BottomSheet: StoryObj = {
  name: "BottomSheet (оверлей)",
  render: () => OVERLAY_CASES[1][1],
};
export const Toast: StoryObj = { name: "Toast (оверлей)", render: () => OVERLAY_CASES[2][1] };
export const DayPicker: StoryObj = {
  name: "DayPicker (оверлей)",
  render: () => OVERLAY_CASES[3][1],
};
