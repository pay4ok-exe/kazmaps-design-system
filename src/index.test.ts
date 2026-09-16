import * as kit from "./index";

const EXPECTED = [
  "Avatar",
  "BottomSheet",
  "Button",
  "Chip",
  "CodeInput",
  "CollapseHandle",
  "DayPicker",
  "Dialog",
  "EmptyState",
  "ForecastCard",
  "IconButton",
  "IconButtonGroup",
  "InDevelopment",
  "LegalLink",
  "ListRow",
  "LogoLockup",
  "MapCompass",
  "MapTrafficBadge",
  "Menu",
  "MenuDivider",
  "MenuItem",
  "MenuTabs",
  "NavBar",
  "NavItem",
  "PHONE_INPUT_DEFAULT_LABELS",
  "PasswordInput",
  "PhoneInput",
  "PillTabs",
  "PlaceRow",
  "QrCode",
  "REGIONS",
  "ScaleBar",
  "SearchInput",
  "SectionHeader",
  "SelectField",
  "ShimmerBlock",
  "StarRating",
  "TextInput",
  "ToastProvider",
  "Toggle",
  "WeatherBadge",
  "cn",
  "findRegion",
  "formatE164",
  "isKazakhstanMobile",
  "isTopmostTrap",
  "parseE164",
  "toE164",
  "useFocusTrap",
  "useToast",
];

describe("public API", () => {
  it.each(EXPECTED)("exports %s", (name) => {
    expect(kit).toHaveProperty(name);
  });

  it("exports nothing beyond the expected list", () => {
    expect(Object.keys(kit).sort()).toEqual([...EXPECTED].sort());
  });
});
