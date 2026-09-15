import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconUserLight } from "../icons/generated";
import { Avatar } from "./avatar";
import { AVATAR_STATE } from "./avatar.states";

const meta: Meta<typeof Avatar> = {
  title: "Maps kit/Avatar",
  component: Avatar,
  globals: { brand: "maps" },
};
export default meta;

const PHOTO =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#4589ff"/><stop offset="1" stop-color="#08bdba"/>
      </linearGradient></defs>
      <rect width="72" height="72" fill="url(#g)"/>
      <circle cx="36" cy="27" r="13" fill="#ffffff" opacity="0.92"/>
      <path d="M8 72c4-18 15-27 28-27s24 9 28 27z" fill="#ffffff" opacity="0.92"/>
    </svg>`,
  );

function Cell({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-(--spacing-gap-4)">
      {children}
      <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
        {caption}
      </span>
    </div>
  );
}

function Row({
  title,
  note,
  photoUrl,
  name,
  seed,
}: {
  title: string;
  note: string;
  photoUrl?: string;
  name?: string;
  seed?: string;
}) {
  const glyph = <IconUserLight />;
  return (
    <section className="flex flex-col gap-(--spacing-gap-8)">
      <div>
        <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
          {title}
        </h3>
        <p className="max-w-[520px] text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
          {note}
        </p>
      </div>
      <div className="flex items-center gap-(--spacing-gap-16)">
        <Cell caption="Default">
          <Avatar label="Профиль" photoUrl={photoUrl} name={name} seed={seed} icon={glyph} />
        </Cell>
        <Cell caption="Hover">
          <Avatar
            label="Профиль"
            photoUrl={photoUrl}
            name={name}
            seed={seed}
            icon={glyph}
            className={AVATAR_STATE.hoverPreview}
          />
        </Cell>
        <Cell caption="Active">
          <Avatar label="Профиль" photoUrl={photoUrl} name={name} seed={seed} icon={glyph} active />
        </Cell>
      </div>
    </section>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <p className="max-w-[620px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Колонка Hover нарисована ролью, а не настоящим наведением: статикой псевдокласс не показать.
        Роли берутся из того же модуля, что и в компоненте, и сверяются тестом.
      </p>
      <Row
        title="Без снимка"
        note="Image=False в макете: глиф User weight=light, паддинг 8. На наведении глиф СВЕТЛЕЕТ — так в макете, как и у Map Action типа Default (docs/figma-deltas.md, пункт 13)."
      />
      <Row
        title="Без снимка, но с именем"
        note="Запасной вариант вместо глифа: первая буква имени на цвете из tag/*, выведенном из seed. В макете такого варианта нет — он заменил удалённый AvatarInitial, на котором держались списки друзей и чатов."
        name="Айгерим"
        seed="aigerim"
      />
      <Row
        title="Со снимком"
        note="Image=True: паддинг 2, снимок 36 кругом. В Active появляется кольцо icon/accent — единственная обводка макета, выровненная НАРУЖУ, поэтому ring, а не inset-ring: она не сжимает снимок."
        photoUrl={PHOTO}
      />
    </div>
  ),
};

export const Playground: StoryObj<typeof Avatar> = {
  args: { label: "Профиль", active: false, photoUrl: PHOTO },
  argTypes: { photoUrl: { control: "text" } },
};
