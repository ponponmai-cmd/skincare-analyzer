export type Evidence = "strong" | "moderate" | "limited" | "context";

export type Pregnancy = "avoid" | "caution" | "compatible";

export type Concern =
  | "acne"
  | "pigment"
  | "aging"
  | "barrier"
  | "hydration"
  | "redness"
  | "oil"
  | "sun";

export type AgeBand = "teens" | "20s" | "30s" | "40s" | "50plus";

export type IngredientCategory =
  | "retinoid"
  | "antioxidant"
  | "brightening"
  | "exfoliant"
  | "humectant"
  | "barrier"
  | "soothing"
  | "peptide"
  | "antimicrobial"
  | "filter"
  | "base";

export type Origin = "korea" | "taiwan" | "japan" | "western";

export type ProductCategory =
  | "serum"
  | "moisturizer"
  | "sunscreen"
  | "toner"
  | "treatment"
  | "body";

export type SkinType = "dry" | "oily" | "combination" | "sensitive" | "normal";

export type RoleId =
  | "vitamin-c"
  | "pigment"
  | "acne"
  | "retinoid"
  | "barrier"
  | "hydration"
  | "peptide"
  | "sun-daily"
  | "sun-outdoor"
  | "sun-mineral"
  | "sun-sensitive";

export type WhiteCast = "none" | "slight" | "visible";

export type Verdict = "close" | "partial" | "broader" | "same-job" | "different";

export interface Ingredient {
  slug: string;
  nameZh: string;
  nameEn: string;
  inci: string;
  aliases: string[];
  category: IngredientCategory;
  concerns: Concern[];
  functions: string[];
  summary: string;
  mechanism: string;
  strengths: string[];
  weaknesses: string[];
  howToUse: string;
  typicalRange: string;
  evidence: Evidence;
  evidenceNote: string;
  irritancy: 0 | 1 | 2 | 3 | 4;
  pregnancy: Pregnancy;
  pregnancyNote: string;
  pairsWith: string[];
  cautionWith: { slug: string; reason: string }[];
  ages: AgeBand[];
  ageNote: string;
}

export interface KeyActive {
  ingredient: string;
  note: string;
  centrality: number;
}

export interface RoleWeight {
  id: RoleId;
  weight: number;
}

export interface Product {
  slug: string;
  brand: string;
  brandZh: string;
  name: string;
  nameZh: string;
  category: ProductCategory;
  concerns: Concern[];
  ages: AgeBand[];
  skinTypes: SkinType[];
  priceTwd: number;
  volume: number;
  volumeUnit: "ml" | "g";
  texture: string;
  fragrance: boolean;
  dryingAlcohol: boolean;
  pregnancy: Pregnancy;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  expertNote: string;
  keyActives: KeyActive[];
  roles: RoleWeight[];
  formulaNote: string;
  tier?: "luxury";
  howToUse?: string;
  officialUrl?: string;
  spf?: number;
  pa?: string;
  whiteCast?: WhiteCast;
  waterResistant?: boolean;
  sunscreenNote?: string;
}

export interface RoutineStep {
  step: string;
  why: string;
  productSlugs: string[];
}

export interface AgeGuide {
  id: AgeBand;
  title: string;
  years: string;
  physiology: string;
  priority: string;
  morning: RoutineStep[];
  evening: RoutineStep[];
  start: string[];
  delay: string[];
  mistakes: string[];
  picks: { slug: string; why: string }[];
}

export interface ActiveGap {
  ingredient: string;
  note: string;
  centrality: number;
}

export interface AnalogGap {
  from: string;
  to: string;
  factor: number;
  fromNote: string;
  toNote: string;
}

export interface PairComparison {
  score: number;
  activeRatio: number;
  roleRatio: number;
  sameCategory: boolean;
  verdict: Verdict;
  concentrationGap: boolean;
  exact: { ingredient: string; sourceNote: string; targetNote: string }[];
  analogs: AnalogGap[];
  missing: ActiveGap[];
  extras: ActiveGap[];
}
