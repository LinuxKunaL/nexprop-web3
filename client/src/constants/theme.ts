import Icon from "@components/display/Icon";

export const templateColors = {
  default: {
    icon: "account",
    /* ---------- LIGHT ---------- */
    background: "rgb(245, 245, 245)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(15, 15, 15)",
    muted: "rgb(92, 92, 92)",

    border: "rgb(224, 224, 224)",
    "border/70": "rgba(233, 233, 233)",

    primary: "rgb(20, 184, 166)",
    "primary/20": "rgba(20, 184, 166, 0.30)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(17, 19, 21)",
    "card-dark": "rgb(26, 28, 30)",
    "card-secondary-dark": "rgb(45, 47, 49)",

    "foreground-dark": "rgb(255, 255, 255)",
    "muted-dark": "rgb(180, 182, 184)",

    "border-dark": "rgb(92, 92, 92)",
    "border-dark/30": "rgb(50, 50, 50)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },

  whatsapp: {
    icon: "whatsapp",
    background: "rgb(240, 242, 245)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(17, 27, 33)",
    muted: "rgb(102, 119, 129)",

    border: "rgb(209, 215, 219)",
    "border/70": "rgba(209, 215, 219,0.70)",

    primary: "rgb(37, 211, 102)",
    "primary/20": "rgba(37, 211, 102, 0.30)",

    "background-dark": "rgb(11, 20, 26)",
    "card-dark": "rgb(17, 27, 33)",
    "card-secondary-dark": "rgb(32, 44, 51)",

    "foreground-dark": "rgb(233, 237, 239)",
    "muted-dark": "rgb(134, 150, 160)",

    "border-dark": "rgb(42, 57, 66)",
    "border-dark/30": "rgba(42, 57, 66,0.30)",

    success: "rgb(37, 211, 102)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },

  twitter: {
    icon: "twitter",
    background: "rgb(255, 255, 255)",
    card: "rgb(247, 249, 249)",

    foreground: "rgb(15, 20, 25)",
    muted: "rgb(83, 100, 113)",

    border: "rgb(239, 243, 244)",
    "border/70": "rgba(239, 243, 244,0.70)",

    primary: "rgb(29, 161, 242)",
    "primary/20": "rgba(29, 161, 242, 0.30)",

    "background-dark": "rgb(21, 32, 43)",
    "card-dark": "rgb(25, 39, 52)",
    "card-secondary-dark": "rgb(34, 48, 60)",

    "foreground-dark": "rgb(231, 233, 234)",
    "muted-dark": "rgb(136, 153, 166)",

    "border-dark": "rgb(56, 68, 77)",
    "border-dark/30": "rgba(56, 68, 77,0.30)",

    success: "rgb(29, 161, 242)",
    danger: "rgb(244, 33, 46)",
    warring: "rgb(255, 212, 0)",
  },

  instagram: {
    icon: "instagram",

    background: "rgb(250, 250, 250)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(38, 38, 38)",
    muted: "rgb(142, 142, 142)",

    border: "rgb(219, 219, 219)",
    "border/70": "rgba(219, 219, 219,0.70)",

    primary: "rgb(225, 48, 108)", // insta pink-red
    "primary/20": "rgba(225, 48, 108,0.30)",

    "background-dark": "rgb(0, 0, 0)",
    "card-dark": "rgb(18, 18, 18)",
    "card-secondary-dark": "rgb(30, 30, 30)",

    "foreground-dark": "rgb(250, 250, 250)",
    "muted-dark": "rgb(168, 168, 168)",

    "border-dark": "rgb(38, 38, 38)",
    "border-dark/30": "rgba(38, 38, 38,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },

  youtube: {
    icon: "youtube",

    /* ---------- LIGHT ---------- */
    background: "rgb(248, 248, 248)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(15, 15, 15)",
    muted: "rgb(96, 96, 96)",

    border: "rgb(225, 225, 225)",
    "border/70": "rgba(225, 225, 225,0.70)",

    primary: "rgb(255, 0, 0)",
    "primary/20": "rgba(255, 0, 0,0.20)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(15, 15, 15)",
    "card-dark": "rgb(28, 28, 28)",
    "card-secondary-dark": "rgb(40, 40, 40)",

    "foreground-dark": "rgb(255, 255, 255)",
    "muted-dark": "rgb(170, 170, 170)",

    "border-dark": "rgb(60, 60, 60)",
    "border-dark/30": "rgba(60, 60, 60,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(255, 59, 48)",
    warring: "rgb(255, 204, 0)",
  },

  snapchat: {
    icon: "snapchat",

    /* ---------- LIGHT ---------- */
    background: "rgb(255, 255, 255)", // 👈 clean base
    card: "rgb(255, 255, 255)",

    foreground: "rgb(0, 0, 0)",
    muted: "rgb(90, 90, 90)",

    border: "rgb(235, 235, 235)",
    "border/70": "rgba(235, 235, 235,0.70)",

    primary: "rgb(255, 252, 0)", // 👈 snap yellow used smartly
    "primary/20": "rgba(255, 252, 0,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(15, 15, 15)",
    "card-dark": "rgb(25, 25, 25)",
    "card-secondary-dark": "rgb(40, 40, 40)",

    "foreground-dark": "rgb(255, 255, 255)",
    "muted-dark": "rgb(170, 170, 170)",

    "border-dark": "rgb(60, 60, 60)",
    "border-dark/30": "rgba(60, 60, 60,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(255, 200, 0)",
  },
  forest: {
    icon: "leaf",

    /* ---------- LIGHT ---------- */
    background: "rgb(245, 250, 245)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(20, 40, 20)",
    muted: "rgb(100, 130, 100)",

    border: "rgb(220, 235, 220)",
    "border/70": "rgba(220, 235, 220,0.70)",

    primary: "rgb(34, 139, 34)", // forest green
    "primary/20": "rgba(34, 139, 34,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(10, 20, 10)",
    "card-dark": "rgb(20, 35, 20)",
    "card-secondary-dark": "rgb(35, 55, 35)",

    "foreground-dark": "rgb(220, 255, 220)",
    "muted-dark": "rgb(150, 180, 150)",

    "border-dark": "rgb(40, 70, 40)",
    "border-dark/30": "rgba(40, 70, 40,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },
  midnightPurple: {
    icon: "moon-waxing-crescent",

    /* ---------- LIGHT ---------- */
    background: "rgb(248, 247, 252)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(30, 20, 50)",
    muted: "rgb(120, 110, 150)",

    border: "rgb(230, 225, 240)",
    "border/70": "rgba(230, 225, 240,0.70)",

    primary: "rgb(139, 92, 246)", // violet-500
    "primary/20": "rgba(139, 92, 246,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(15, 10, 25)",
    "card-dark": "rgb(25, 18, 40)",
    "card-secondary-dark": "rgb(40, 30, 65)",

    "foreground-dark": "rgb(230, 220, 255)",
    "muted-dark": "rgb(160, 150, 200)",

    "border-dark": "rgb(60, 50, 90)",
    "border-dark/30": "rgba(60, 50, 90,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },
  obsidian: {
    icon: "diamond-stone",

    /* ---------- LIGHT (fallback) ---------- */
    background: "rgb(250, 250, 250)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(20, 20, 20)",
    muted: "rgb(110, 110, 110)",

    border: "rgb(230, 230, 230)",
    "border/70": "rgba(230, 230, 230,0.70)",

    primary: "rgb(99, 102, 241)", // subtle indigo
    "primary/20": "rgba(99, 102, 241,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(10, 10, 10)", // deep base
    "card-dark": "rgb(20, 20, 20)", // layer 1
    "card-secondary-dark": "rgb(32, 32, 32)", // layer 2

    "foreground-dark": "rgb(245, 245, 245)",
    "muted-dark": "rgb(160, 160, 160)",

    "border-dark": "rgb(45, 45, 45)",
    "border-dark/30": "rgba(45, 45, 45,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },
  oceanDark: {
    icon: "water",

    /* ---------- LIGHT (fallback) ---------- */
    background: "rgb(245, 250, 255)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(20, 30, 40)",
    muted: "rgb(100, 120, 140)",

    border: "rgb(220, 230, 240)",
    "border/70": "rgba(220, 230, 240,0.70)",

    primary: "rgb(56, 189, 248)", // sky blue
    "primary/20": "rgba(56, 189, 248,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(8, 18, 28)", // blue-tinted base
    "card-dark": "rgb(15, 28, 40)", // layer 1
    "card-secondary-dark": "rgb(25, 45, 65)", // layer 2

    "foreground-dark": "rgb(220, 240, 255)",
    "muted-dark": "rgb(140, 170, 200)",

    "border-dark": "rgb(40, 65, 90)",
    "border-dark/30": "rgba(40, 65, 90,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },
  carbon: {
    icon: "contrast",

    /* ---------- LIGHT (fallback) ---------- */
    background: "rgb(248, 249, 250)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(20, 20, 20)",
    muted: "rgb(110, 110, 110)",

    border: "rgb(230, 230, 230)",
    "border/70": "rgba(230, 230, 230,0.70)",

    primary: "rgb(96, 165, 250)", // soft blue accent
    "primary/20": "rgba(96, 165, 250,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(12, 14, 18)", // base (not pure black)
    "card-dark": "rgb(20, 24, 30)", // layer 1
    "card-secondary-dark": "rgb(30, 36, 44)", // layer 2

    "foreground-dark": "rgb(230, 235, 240)",
    "muted-dark": "rgb(150, 160, 170)",

    "border-dark": "rgb(40, 48, 60)",
    "border-dark/30": "rgba(40, 48, 60,0.30)",

    success: "rgb(34, 197, 94)",
    danger: "rgb(239, 68, 68)",
    warring: "rgb(234, 179, 8)",
  },
  dracula: {
    icon: "code-brackets",

    /* ---------- LIGHT (fallback) ---------- */
    background: "rgb(248, 248, 252)",
    card: "rgb(255, 255, 255)",

    foreground: "rgb(40, 42, 54)",
    muted: "rgb(98, 114, 164)",

    border: "rgb(230, 230, 240)",
    "border/70": "rgba(230, 230, 240,0.70)",

    primary: "rgb(189, 147, 249)", // signature purple
    "primary/20": "rgba(189, 147, 249,0.25)",

    /* ---------- DARK ---------- */
    "background-dark": "rgb(40, 42, 54)", // main dracula bg
    "card-dark": "rgb(48, 50, 65)", // layer 1
    "card-secondary-dark": "rgb(68, 71, 90)", // layer 2

    "foreground-dark": "rgb(248, 248, 242)", // soft white
    "muted-dark": "rgb(98, 114, 164)", // bluish gray

    "border-dark": "rgb(68, 71, 90)",
    "border-dark/30": "rgba(68, 71, 90,0.30)",

    success: "rgb(80, 250, 123)", // green
    danger: "rgb(255, 85, 85)", // red
    warring: "rgb(241, 250, 140)", // yellow
  },
};

export type TemplateColors = typeof templateColors;
export type TemplateName = keyof TemplateColors;
export type TColors = TemplateColors[TemplateName];

type LightKeys<T> = {
  [K in keyof T as K extends `${string}-dark` ? never : K]: T[K];
};

type DarkKeys<T> = {
  [K in keyof T as K extends `${infer Base}-dark` ? Base : never]: T[K];
};

export type PreviewTheme<T extends TColors = TColors> = {
  template: TemplateName;
  icon: React.ComponentProps<typeof Icon>["name"];
  primary: T["primary"];
  light: LightKeys<T>;
  dark: DarkKeys<T>;
};

export const previewThemes: PreviewTheme[] = Object.entries(templateColors).map(
  ([templateName, colors]) => {
    const light = {} as LightKeys<typeof colors>;
    const dark = {} as DarkKeys<typeof colors>;

    Object.entries(colors).forEach(([key, value]) => {
      if (key.includes("-dark")) {
        const cleanKey = key.replace("-dark", "") as keyof typeof dark;
        dark[cleanKey] = value;
      } else {
        light[key as keyof typeof light] = value;
      }
    });

    return {
      template: templateName as TemplateName,
      icon: colors["icon"] as React.ComponentProps<typeof Icon>["name"],
      primary: colors.primary,
      light,
      dark,
    };
  },
);
