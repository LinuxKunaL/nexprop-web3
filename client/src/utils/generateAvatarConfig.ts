import {
  AvatarConfig,
  EarSize,
  EyeBrowStyle,
  EyeStyle,
  GlassesStyle,
  HairStyle,
  HatStyle,
  MouthStyle,
  NoseStyle,
  Sex,
  ShirtStyle,
} from "@zamplyy/react-native-nice-avatar";

type AvatarConfigWithGradient = AvatarConfig & {
  gradientColors: [string, string];
};

export function generateAvatarConfig(
  address: string,
): AvatarConfigWithGradient {
  const seed = address.toLowerCase().trim();

  let hash = 2123457;

  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  hash >>>= 0;

  const random = () => {
    hash += 0x6d2b79f5;

    let t = hash;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const pick = <T>(items: readonly T[]): T => {
    return items[Math.floor(random() * items.length)];
  };

  const colors = {
    face: ["#F9C9B6", "#F2B69F", "#D99A78", "#C68662", "#A96F4F", "#8D5524"],

    hair: [
      "#000000",
      "#2C1810",
      "#4A2C20",
      "#654321",
      "#8B4513",
      "#A0522D",
      "#D4A373",
    ],

    hat: ["#FC909F", "#9287FF", "#6BD6E1", "#FFD166", "#FF8C42", "#7BD389"],

    shirt: [
      "#9287FF",
      "#6BD6E1",
      "#FC909F",
      "#FFD166",
      "#7BD389",
      "#FF8C42",
      "#5C7AEA",
    ],

    background: [
      "#D2EFF3",
      "#E8DFFF",
      "#FFE0E6",
      "#FFF1CC",
      "#DFF5E1",
      "#DCE7FF",
    ],
  };
  const gradientPairs = [
    ["#4FD8C8", "#55BFE8"],
    ["#9B72D8", "#E47FA8"],
    ["#E86F8C", "#E89A68"],
    ["#668FE8", "#956FC4"],
    ["#63CFA8", "#55BFE8"],
    ["#E8B94F", "#E99A62"],
    ["#A982D8", "#DF82AE"],
    ["#55B8CE", "#6B9FE5"],
    ["#5DC49B", "#55B8CE"],
    ["#E4778C", "#9A7BD6"],
  ];
  const sex = pick([Sex.man, Sex.woman] as const);

  const hairStyle =
    sex === Sex.man
      ? pick([HairStyle.normal, HairStyle.thick, HairStyle.mohawk] as const)
      : pick([
          HairStyle.normal,
          HairStyle.womanLong,
          HairStyle.womanShort,
        ] as const);

  const gradientColors = pick(gradientPairs);

  const gradientColor1 = pick(colors.background);
  let gradientColor2 = pick(colors.background);

  while (gradientColor2 === gradientColor1) {
    gradientColor2 = pick(colors.background);
  }

  return {
    sex,

    faceColor: pick(colors.face),

    earSize: pick([EarSize.small, EarSize.big] as const),

    hairColor: pick(colors.hair),

    hairStyle,

    hairColorRandom: false,

    hatColor: pick(colors.hat),

    hatStyle: pick([
      HatStyle.none,
      HatStyle.none,
      HatStyle.beanie,
      HatStyle.turban,
    ] as const),

    eyeStyle: pick([EyeStyle.circle, EyeStyle.oval, EyeStyle.smile] as const),

    glassesStyle: pick([
      GlassesStyle.none,
      GlassesStyle.none,
      GlassesStyle.round,
      GlassesStyle.square,
    ] as const),

    noseStyle: pick([
      NoseStyle.short,
      NoseStyle.long,
      NoseStyle.round,
    ] as const),

    mouthStyle: pick([
      MouthStyle.laugh,
      MouthStyle.smile,
      MouthStyle.peace,
    ] as const),

    shirtStyle: pick([
      ShirtStyle.hoody,
      ShirtStyle.short,
      ShirtStyle.polo,
    ] as const),

    shirtColor: pick(colors.shirt),

    bgColor: gradientColor1,

    isGradient: true,

    gradientColors: [gradientColors[0], gradientColors[1]],
  };
}
