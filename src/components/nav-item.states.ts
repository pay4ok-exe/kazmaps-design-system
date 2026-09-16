export const NAV_ITEM_STATE = {
  idle: "bg-(--background-secondary) text-(color:--icon-secondary) group-hover:text-(color:--icon-accent)",
  active: "bg-(--action-accent-primary) text-(color:--icon-white)",
  hoverPreview: "[&>span]:text-(color:--icon-accent)!",
} as const;
