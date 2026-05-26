import { client } from "./client";
import type {
  SiteSettings,
  Professeure,
  Tarif,
  Creneau,
  AccueilPage,
  EquipePage,
  StudioPage,
  ReglementPage,
} from "@/types/sanity.types";

async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const result = await client.fetch<T>(query, {}, { signal: controller.signal });
    clearTimeout(timer);
    return result;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings>(`*[_type == "siteSettings"][0]`);
}

export async function getProfesseures(): Promise<Professeure[]> {
  const result = await sanityFetch<Professeure[]>(`*[_type == "professeure"] | order(ordre asc)`);
  return result ?? [];
}

export async function getTarifs(): Promise<Tarif[]> {
  const result = await sanityFetch<Tarif[]>(`*[_type == "tarif"] | order(categorie asc, ordre asc)`);
  return result ?? [];
}

export async function getCreneaux(): Promise<Creneau[]> {
  const result = await sanityFetch<Creneau[]>(
    `*[_type == "creneau" && actif == true]{
      ...,
      professeure->{ nom, photo }
    } | order(jour asc, heure asc)`
  );
  return result ?? [];
}

export async function getAccueilPage(): Promise<AccueilPage | null> {
  return sanityFetch<AccueilPage>(`*[_type == "accueil"][0]`);
}

export async function getEquipePage(): Promise<EquipePage | null> {
  return sanityFetch<EquipePage>(`*[_type == "equipe"][0]`);
}

export async function getStudioPage(): Promise<StudioPage | null> {
  return sanityFetch<StudioPage>(`*[_type == "studio"][0]`);
}

export async function getReglementPage(): Promise<ReglementPage | null> {
  return sanityFetch<ReglementPage>(`*[_type == "reglement"][0]`);
}
