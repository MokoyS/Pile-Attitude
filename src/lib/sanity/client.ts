import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Client null si pas de vrai projectId — les pages utilisent leurs fallbacks hardcodés
export const client: SanityClient | null =
  projectId && !/placeholder/i.test(projectId)
    ? createClient({
        projectId,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
        useCdn: false,
      })
    : null;
