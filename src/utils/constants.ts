export enum ParticleType {
  Text = "text",
  Link = "link",
  Image = "image",
}

export interface ParticleTypeRow {
  id: number;
  name: string;
  emoji?: string;
}

export const particleTypes: { [key: string]: ParticleTypeRow } = {
  [ParticleType.Link]: {
    id: 1,
    name: "URL",
    emoji: "🔗",
  },
  [ParticleType.Image]: {
    id: 2,
    name: "Image",
    emoji: "🖼️",
  },
  [ParticleType.Text]: {
    id: 3,
    name: "Text",
    emoji: "💭",
  },
};