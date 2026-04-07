export interface DreamCard {
  id: string;
  title: string;
  summary: string;
  teaser: string;
  outcome: string;
  accent: string;
  posterGradient: [string, string];
}

export const dreamCards: DreamCard[] = [
  {
    id: "property-platform",
    title: "Verified Property Platform",
    summary:
      "A trusted app where customers submit contact info and property owners respond with verified images, details, and tailored requirements.",
    teaser: "Property tech with verified listings and owner contact routing",
    outcome: "Less confusion. More trust. Faster matches.",
    accent: "from-cyan-300/30 via-sky-300/20 to-indigo-300/30",
    posterGradient: ["#e0f2fe", "#4f46e5"],
  },
  {
    id: "3d-print",
    title: "Large 3D Print Setup",
    summary:
      "A build-to-order manufacturing flow where people describe a need, send a concept, and receive a custom 3D printed result.",
    teaser: "A large 3D print setup for custom-order manufacturing",
    outcome: "Make ideas real, without the usual friction.",
    accent: "from-orange-300/30 via-amber-300/20 to-rose-300/30",
    posterGradient: ["#fff7ed", "#ea580c"],
  },
  {
    id: "cloth-brand",
    title: "Good Cloth Brand",
    summary:
      "A clothing brand with identity, quality, and style that feels modern instead of generic.",
    teaser: "A smart clothing brand with a strong identity",
    outcome: "Wearable design with a strong point of view.",
    accent: "from-fuchsia-300/30 via-violet-300/20 to-blue-300/30",
    posterGradient: ["#fdf2f8", "#6366f1"],
  },
  {
    id: "healthy-food",
    title: "Healthy Food Business",
    summary:
      "A tech-forward food product that uses height, weight, and goals to suggest smart dietary plans that help people stay healthy.",
    teaser: "A healthy food business with adaptive dietary suggestions",
    outcome: "Simple guidance that actually adapts to the person.",
    accent: "from-emerald-300/30 via-teal-300/20 to-cyan-300/30",
    posterGradient: ["#ecfdf5", "#14b8a6"],
  },
];

export const dreamQuotes: string[] = [
  "If people do not laugh at your dream, you are not dreaming big enough.",
  "Dreams need a blueprint, not just a mood.",
  "Build the future so clearly that it starts to feel normal.",
  "A strong dream becomes dangerous only when you keep it vague.",
];
