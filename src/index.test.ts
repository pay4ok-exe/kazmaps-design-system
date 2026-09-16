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
  "NavBar",
  "NavItem",
  "PHONE_INPUT_DEFAULT_LABELS",
  "PasswordInput",
  "PhoneInput",
  "PlaceRow",
  "QrCode",
  "REGIONS",
  "ScaleBar",
  "SearchInput",
  "SelectField",
  "StarRating",
  "TextInput",
  "ToastProvider",
  "Toggle",
  "PillTabs",
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
