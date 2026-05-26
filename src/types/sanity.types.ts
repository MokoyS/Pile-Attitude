import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

export interface SiteSettings {
  _type: "siteSettings";
  nom: string;
  slogan?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  instagram?: string;
  logoPolestar?: SanityImage;
  logoFpmp?: SanityImage;
  seoDescription?: string;
}

export interface Professeure {
  _id: string;
  _type: "professeure";
  nom: string;
  role?: string;
  photo?: SanityImage;
  bio?: PortableTextBlock[];
  telephone?: string;
  email?: string;
  instagram?: string;
  joursPresence?: string;
  ordre?: number;
}

export interface Tarif {
  _id: string;
  _type: "tarif";
  categorie: "Cours Machines" | "Cours Collectifs Tapis";
  formule: string;
  seanceUnite?: number;
  carte5?: number;
  carte5Validite?: string;
  carte10?: number;
  carte10Validite?: string;
  noteParPersonne?: boolean;
  ordre?: number;
}

export interface Creneau {
  _id: string;
  _type: "creneau";
  professeure?: { nom: string; photo?: SanityImage };
  typeCours: "Machines" | "Collectif Tapis";
  jour: "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";
  heure: string;
  duree?: string;
  lieu?: string;
  actif: boolean;
}

export interface AccueilPage {
  _type: "accueil";
  heroTitre?: string;
  heroSousTitre?: string;
  heroImage?: SanityImage;
  texteIntroduction?: PortableTextBlock[];
}

export interface EquipePage {
  _type: "equipe";
  introduction?: PortableTextBlock[];
}

export interface StudioPage {
  _type: "studio";
  titre?: string;
  description?: PortableTextBlock[];
  photos?: SanityImage[];
}

export interface ReglementPage {
  _type: "reglement";
  contenu?: PortableTextBlock[];
}
