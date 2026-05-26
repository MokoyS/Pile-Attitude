# 🧘 ATELIER PILE-ATTITUDE — Brief Claude Code
> Projet : Site vitrine studio de Pilates — éditable par la cliente
> Agence : MELIOZ — Maxime Lebas
> Stack : Next.js 14 + Sanity CMS + Vercel
> Priorités : SEO soigné · Performance · Animations légères · Design élégant

---

## 🎯 Contexte du projet

Site vitrine pour **L'Atelier Pile-Attitude**, studio de Pilates sur machines situé à Chatou (27 avenue de Brimont — RER A Chatou-Croissy).

**Fondatrice :** Sophie Leblan
**Co-intervenante :** Elise
**Référence ancien site :** https://sophieleblan.wixsite.com/website

**Exigence clé :** La cliente doit pouvoir modifier seule le contenu (textes, photos, tarifs, planning) via une interface simple. Tout le contenu éditorial passe par Sanity CMS — AUCUN texte ne doit être hardcodé dans les composants.

**Scalabilité :** Le site doit pouvoir accueillir en V2 un système de réservation de cours en ligne avec paiement. Prévoir les hooks d'intégration (section Planning avec bouton "Réserver" désactivé en V1).

---

## 🛠️ Stack technique — NON NÉGOCIABLE

| Couche | Outil | Règle |
|---|---|---|
| Framework | Next.js 16.2.1 App Router | Pas Pages Router |
| Langage | TypeScript strict | Pas de `any` |
| CMS | Sanity v3 | Tout le contenu éditorial |
| Styling | Tailwind CSS v4 (couleurs via `@theme` dans `globals.css`) | Utility-first |
| Composants | Shadcn/ui | Via `npx shadcn@latest add` |
| Animations | Framer Motion | Légères uniquement — pas d'effets lourds |
| Images | next/image + Sanity Image URL | Optimisation automatique |
| Fonts | next/font/google | Cormorant Garamond (handwriting élégant) + Inter |
| SEO | next-sitemap + metadata API | Chaque page a ses propres métadonnées |
| Hébergement | Vercel | Déploiement continu |
| Sanity Studio | Déployé sur `/le-studio` (conflit avec route page studio) | Accessible via le domaine client |

---

## 🎨 Design System — RESPECTER STRICTEMENT

### Palette de couleurs
```typescript
// tailwind.config.ts
colors: {
  pile: {
    green:   '#aab8a5', // Couleur principale — fonds, nav, éléments doux
    violet:  '#5f3b61', // Accent — CTA, éléments graphiques discrets, hover
    white:   '#ffffff', // Fond général
    cream:   '#faf8f5', // Fond alternatif — sections légèrement chaudes
    dark:    '#1a1a1a', // Texte principal
    muted:   '#6b7280', // Texte secondaire
  }
}
```

### Typographie
```typescript
// layout.tsx — next/font/google
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

// Usage :
// Titres, citations, noms → font-cormorant (élégant, handwriting chic)
// Corps de texte, UI, labels → font-inter (lisible, moderne)
```

### Règles de design
- **Minimaliste et élégant** — beaucoup d'espace blanc, pas de surcharge visuelle
- **Vert `#aab8a5`** comme couleur dominante : fonds de sections, navbar, badges
- **Violet `#5f3b61`** comme accent discret : underlines, icônes, hover states, CTA secondaires
- **Titres en Cormorant Garamond italique** pour l'élégance artisanale
- **Corps de texte en Inter** pour la lisibilité
- **Animations Framer Motion légères** : fade-in au scroll, transitions douces (0.4s max), pas de bounce ni de spring agressif
- **Pas de box-shadow lourde** — préférer les borders subtils et l'espace blanc
- **Images pleine largeur** avec overlay discret si besoin de lisibilité du texte

---

## 📁 Structure de dossiers

```
atelier-pile-attitude/
├── src/
│   ├── app/
│   │   ├── (site)/                    # Groupe — pages publiques
│   │   │   ├── layout.tsx             # Layout avec nav + footer
│   │   │   ├── page.tsx               # Accueil
│   │   │   ├── equipe/
│   │   │   │   └── page.tsx           # L'équipe (Sophie + Elise)
│   │   │   ├── studio/
│   │   │   │   └── page.tsx           # Le studio
│   │   │   ├── tarifs/
│   │   │   │   └── page.tsx           # Tarifs
│   │   │   ├── planning/
│   │   │   │   └── page.tsx           # Planning (V1 : statique, V2 : réservation)
│   │   │   └── reglement/
│   │   │       └── page.tsx           # Règlement intérieur
│   │   ├── le-studio/                 # Sanity Studio
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── revalidate/
│   │   │       └── route.ts           # Webhook Sanity → revalidation Next.js
│   │   ├── layout.tsx                 # Layout racine
│   │   ├── sitemap.ts                 # Sitemap dynamique
│   │   └── robots.ts                  # Robots.txt
│   ├── components/
│   │   ├── ui/                        # Shadcn (générés)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/                  # Sections de pages
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Studio.tsx
│   │   │   ├── Tarifs.tsx
│   │   │   ├── Planning.tsx
│   │   │   └── Contact.tsx
│   │   └── shared/
│   │       ├── AnimatedSection.tsx    # Wrapper Framer Motion réutilisable
│   │       ├── SanityImage.tsx        # Composant image Sanity optimisé
│   │       └── PortableText.tsx       # Renderer Rich Text Sanity
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts              # Client Sanity (server)
│   │   │   ├── queries.ts             # Toutes les GROQ queries
│   │   │   └── image.ts               # urlFor helper
│   │   └── utils.ts
│   └── types/
│       └── sanity.types.ts            # Types générés par Sanity CLI
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.ts                   # Export de tous les schemas
│   │   ├── siteSettings.ts            # Paramètres globaux du site
│   │   ├── page/
│   │   │   ├── accueil.ts
│   │   │   ├── equipe.ts
│   │   │   ├── studio.ts
│   │   │   └── reglement.ts
│   │   ├── tarif.ts                   # Document tarif (Solo/Duo/Trio/Collectif)
│   │   ├── professeure.ts             # Document membre de l'équipe
│   │   └── planning.ts                # Document créneau planning
│   ├── lib/
│   │   └── image.ts
│   └── sanity.config.ts
├── public/
│   └── fonts/                         # Backup fonts si CDN indisponible
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── sanity.config.ts                   # Config Sanity (root level)
├── tsconfig.json
└── CLAUDE.md                          # Ce fichier
```

---

## 🗂️ Schémas Sanity — Contenu éditable par la cliente

### siteSettings.ts — Paramètres globaux
```typescript
// Singleton document — un seul dans tout le studio
{
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    { name: 'nom', title: 'Nom du studio', type: 'string' },
    { name: 'slogan', title: 'Slogan', type: 'string' },
    { name: 'telephone', title: 'Téléphone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'adresse', title: 'Adresse', type: 'string' },
    { name: 'instagram', title: 'Lien Instagram', type: 'url' },
    { name: 'logoPolestar', title: 'Logo Polestar', type: 'image' },
    { name: 'logoFpmp', title: 'Logo FPMP', type: 'image' },
    { name: 'seoDescription', title: 'Description SEO globale', type: 'text' },
  ]
}
```

### professeure.ts
```typescript
{
  name: 'professeure',
  title: 'Professeures',
  type: 'document',
  fields: [
    { name: 'nom', title: 'Nom complet', type: 'string' },
    { name: 'role', title: 'Rôle', type: 'string' }, // ex: Fondatrice & Professeure
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Biographie', type: 'array', of: [{ type: 'block' }] },
    { name: 'telephone', title: 'Téléphone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'instagram', title: 'Instagram', type: 'url' },
    { name: 'joursPresence', title: 'Jours de présence', type: 'string' },
    { name: 'ordre', title: 'Ordre d\'affichage', type: 'number' },
  ]
}
```

### tarif.ts
```typescript
{
  name: 'tarif',
  title: 'Tarifs',
  type: 'document',
  fields: [
    { name: 'categorie', title: 'Catégorie', type: 'string',
      options: { list: ['Cours Machines', 'Cours Collectifs Tapis'] }
    },
    { name: 'formule', title: 'Formule', type: 'string' }, // ex: Solo (50 mn)
    { name: 'seanceUnite', title: 'Séance à l\'unité (€)', type: 'number' },
    { name: 'carte5', title: 'Carte 5 séances (€)', type: 'number' },
    { name: 'carte5Validite', title: 'Validité carte 5', type: 'string' },
    { name: 'carte10', title: 'Carte 10 séances (€)', type: 'number' },
    { name: 'carte10Validite', title: 'Validité carte 10', type: 'string' },
    { name: 'noteParPersonne', title: 'Prix par personne ?', type: 'boolean' },
    { name: 'ordre', title: 'Ordre d\'affichage', type: 'number' },
  ]
}
```

### planning.ts
```typescript
{
  name: 'creneau',
  title: 'Planning',
  type: 'document',
  fields: [
    { name: 'professeure', title: 'Professeure', type: 'reference', to: [{ type: 'professeure' }] },
    { name: 'typeCours', title: 'Type de cours', type: 'string',
      options: { list: ['Machines', 'Collectif Tapis'] }
    },
    { name: 'jour', title: 'Jour', type: 'string',
      options: { list: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'] }
    },
    { name: 'heure', title: 'Heure', type: 'string' }, // ex: 09h45
    { name: 'duree', title: 'Durée', type: 'string' }, // ex: 1h
    { name: 'lieu', title: 'Lieu', type: 'string' }, // ex: Centre Coroze — Chatou
    { name: 'actif', title: 'Afficher ce créneau', type: 'boolean' },
  ]
}
```

---

## 📄 Pages — Contenu de référence

### Page Accueil
**Hero :**
- Titre : *"Un moment pour soi — S'entretenir — Bouger autrement"*
- Sous-titre : *"Bienveillance, plaisir et progrès"*
- Photos du studio (fournies par la cliente)
- CTA : "Découvrir le studio"

**Texte principal :**
> Bienvenue à l'Atelier Pile-Attitude, un studio entièrement dédié à la pratique du Pilates, idéalement situé à seulement 5 minutes à pied de la gare du RER A de Chatou-Croissy.
> Nous avons imaginé un espace où la Bienveillance, le Plaisir et le Progrès sont au cœur de chaque séance. Ici, chacun avance à son rythme, dans une atmosphère conviviale et respectueuse, propice à l'écoute de soi.
> Le Pilates est bien plus qu'une simple méthode d'entraînement : c'est un véritable outil pour se sentir mieux au quotidien, mais aussi pour améliorer ses performances dans ses activités sportives ou artistiques.

**Footer / Bandeau contact :**
- Téléphone · Email · Instagram · Adresse
- Logos Polestar Pilates + FPMP

### Page L'Équipe
**Introduction :**
> Au sein du studio, vous êtes accompagné par Sophie et Elise, toutes deux professeures certifiées en Pilates par l'école Polestar Pilates, une référence internationale reconnue pour la qualité et l'exigence de sa formation. Leur certification est également reconnue par la FPMP (Fédération des Professionnels de la Méthode Pilates).
> Passionnées et à l'écoute, elles mettent leurs compétences et leur expertise au service de votre progression, en vous proposant un accompagnement personnalisé, adapté à vos besoins et à vos objectifs.

**Sophie :** Fondatrice d'Atelier Pile-Attitude et professeure — Mardi · Mercredi · Jeudi · Samedi
**Elise :** Professeure — Lundi · Vendredi · Dimanche matin

### Page Le Studio
**Titre :** *"Découvrir le studio"*
> Le studio est un véritable cocon dédié au bien-être du corps et de l'esprit. Chaleureux, calme et baigné de lumière naturelle, il offre un cadre apaisant propice à la détente et à la concentration.
> Entièrement équipé avec l'ensemble des machines imaginées par Joseph Pilates — Reformer, Cadillac, Chair, Barrel, Spine Corrector… — le studio vous invite à découvrir la méthode dans toute son authenticité et sa richesse.
> Un vestiaire est également à votre disposition pour vous permettre d'attendre vos cours et de vous changer en toute tranquillité.

### Page Tarifs

**Cours Machines — 27 avenue de Brimont, Chatou**

| Formule | Séance unité | Carte 5 (2 mois) | Carte 10 (4 mois) |
|---|---|---|---|
| Solo (50 mn) | 70 € | 340 € | 680 € |
| Duo (50 mn) | 50 €/pers | 240 €/pers | 480 €/pers |
| Trio et + (50 mn) | 40 €/pers | 190 €/pers | 380 €/pers |
| Séance découverte (30 mn) | 30 €/pers | — | — |

> La séance sera facturée si elle est annulée la veille ou le jour même.

**Cours Collectifs Tapis**

Sophie — Centre Coroze, Chatou :
- Mardi 9h45 (1h) · Jeudi 19h (1h)
- 1 cours/semaine : 220 € le trimestre
- 2 cours/semaine : 370 € le trimestre

Elise — Natformgym, Croissy-sur-Seine :
- Lundi 18h30 (1h) · Vendredi 12h15 (1h) · Vendredi 13h15 (45 min)
- 1 cours d'1h/semaine : 173 € le trimestre
- 1 cours de 45 min/semaine : 138 € le trimestre

---

## 🔍 SEO — Règles strictes

### Metadata par page
Chaque page doit exporter une fonction `generateMetadata` avec :
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page | Atelier Pile-Attitude — Studio Pilates Chatou',
    description: '...',
    openGraph: {
      title: '...',
      description: '...',
      images: ['/og-image.jpg'],
      locale: 'fr_FR',
      type: 'website',
    },
  }
}
```

### Règles SEO à respecter
- `<h1>` unique par page — jamais deux H1
- Balises `alt` descriptives sur TOUTES les images (inclure "Pilates", "Chatou", "studio" dans les alt)
- URL en français et lisibles : `/equipe`, `/tarifs`, `/studio`, `/planning`, `/reglement`
- Sitemap XML dynamique via `app/sitemap.ts`
- `robots.ts` avec autorisation complète sauf `/studio/` (Sanity Studio)
- Schema.org JSON-LD sur la page d'accueil (LocalBusiness + SportsActivityLocation)
- Canonical URL sur chaque page
- Pas de contenu dupliqué entre pages

### JSON-LD Homepage
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: "L'Atelier Pile-Attitude",
  description: 'Studio de Pilates sur machines à Chatou',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '27 avenue de Brimont',
    addressLocality: 'Chatou',
    postalCode: '78400',
    addressCountry: 'FR',
  },
  telephone: '+33953024528',
  url: 'https://atelierpileattitude.fr',
  openingHoursSpecification: [...],
}
```

---

## ✨ Animations — Framer Motion

### Règles strictes
- **Durée max :** 0.5s par animation
- **Pas de bounce** — utiliser `ease: "easeOut"` uniquement
- **Pas d'animations en boucle** sur les éléments de contenu
- **Scroll-triggered** avec `whileInView` — pas d'animation au chargement de page sauf le hero

### Composant AnimatedSection réutilisable
```typescript
// components/shared/AnimatedSection.tsx
'use client'
import { motion } from 'framer-motion'

export function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

### Animations autorisées
- Fade-in + légère translation Y (20px max) au scroll
- Hover sur les cartes tarifs : légère élévation (translateY -4px)
- Transition de couleur sur les liens de navigation (0.2s)
- Apparition séquentielle des cartes (stagger 0.1s)

### Animations INTERDITES
- Rotation, scale agressif, bounce, spring
- Parallax lourd sur les images
- Animations de chargement de page complexes
- Boucles infinies sur le contenu

---

## ⚡ Performance — Règles

- `next/image` OBLIGATOIRE pour toutes les images — jamais de `<img>` natif
- Sanity Image CDN avec paramètres de qualité : `quality(80).format('webp')`
- `loading="lazy"` sur toutes les images sauf le hero (qui utilise `priority`)
- Pas de librairie CSS tierce (pas de Bootstrap, pas d'autre framework UI)
- Bundle analyse avec `@next/bundle-analyzer` avant livraison
- Pas d'import de librairies inutiles — chaque dépendance doit être justifiée
- Police chargée via `next/font` — jamais via `<link>` dans le HTML
- Pas de `useEffect` pour des données qui peuvent être fetchées côté serveur

---

## 🔐 Variables d'environnement

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=                    # Read token pour le serveur
SANITY_WEBHOOK_SECRET=               # Pour la revalidation

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note :** Le client Sanity doit être initialisé de manière conditionnelle — vérifier que `NEXT_PUBLIC_SANITY_PROJECT_ID` est valide avant d'instancier le client, pour éviter les erreurs en développement ou en cas de configuration manquante.

---

## 🚀 Commandes d'installation

```bash
# Créer le projet
npx create-next-app@latest atelier-pile-attitude \
  --typescript --tailwind --app --src-dir --import-alias "@/*"
cd atelier-pile-attitude

# Dépendances
npm install next-sanity @sanity/image-url @sanity/client
npm install framer-motion
npm install @portabletext/react
npm install next-sitemap
npm install lucide-react

# Shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button badge separator

# Sanity Studio
npm create sanity@latest -- \
  --project <project-id> \
  --dataset production \
  --template clean \
  --output-path sanity
```

---

## ✅ Checklist de démarrage — Dans l'ordre

- [ ] Créer le projet Next.js avec les flags ci-dessus
- [ ] Configurer le design system Tailwind (couleurs pile.green + pile.violet + fonts)
- [ ] Créer le projet Sanity et définir tous les schémas
- [ ] Configurer les clients Sanity (server + client)
- [ ] Créer le composant `AnimatedSection` Framer Motion
- [ ] Créer le composant `SanityImage` avec next/image
- [ ] Développer la Navbar et le Footer
- [ ] Page Accueil en premier (page la plus importante SEO)
- [ ] Pages dans l'ordre : Équipe → Studio → Tarifs → Planning → Règlement
- [ ] Configurer `sitemap.ts` et `robots.ts`
- [ ] Ajouter JSON-LD sur la homepage
- [ ] Déployer Sanity Studio sur `/studio`
- [ ] Configurer le webhook Sanity → revalidation Next.js
- [ ] Tester les Core Web Vitals (LCP < 2.5s, CLS < 0.1)

---

## ⚙️ Comportement attendu de Claude Code

- **TypeScript strict** — pas de `any`, pas de `// @ts-ignore`
- **Tout le contenu** vient de Sanity — jamais de texte hardcodé dans les composants
- **Server Components par défaut** — `"use client"` uniquement si nécessaire (animations, interactivité)
- **Pas de console.log** en production
- **Images via next/image** uniquement — jamais `<img>`
- **Animations légères** — respecter les règles Framer Motion définies ci-dessus
- **SEO** — chaque page a sa propre `generateMetadata`, son H1 unique, ses alt d'images
- **Sanity queries** centralisées dans `lib/sanity/queries.ts` — jamais inline dans les composants
- Pour le planning V2 : prévoir un composant `PlanningSection` avec un bouton "Réserver" visible mais désactivé (`disabled` + tooltip "Bientôt disponible"), et une architecture qui permettra d'intégrer un système de réservation (ex: Cal.com, Stripe) sans refactoring majeur

---

## 📦 V2 — Réservation en ligne (prévu, non développé)

La cliente a explicitement demandé la possibilité d'ajouter une réservation de cours en ligne avec paiement en V2. Prévoir :
- Section Planning avec bouton "Réserver" `disabled` en V1
- Composant `PlanningCard` avec props `reservable: boolean`
- Schema Sanity `creneau` avec champ `actif` pour activation future
- Architecture qui accepte l'intégration Cal.com ou Stripe sans refactoring

---

## 🎨 Design System V2 — Règles strictes

### Ambiance cible
Galerie d'art contemporaine parisienne. Murs blancs immenses. Une seule œuvre par mur. Silence. Lumière naturelle. Quand il y a du texte, il est GRAND et RARE.

### Typographie
- Titres de section : `font-cormorant italic` — JAMAIS font-inter pour un titre
- Taille titre hero desktop : `text-[96px]` ou `clamp(60px, 8vw, 96px)`
- Taille titres de section : `text-[64px]` minimum desktop
- Line-height des titres : `leading-[0.95]`
- Tracking des titres : `tracking-[-0.02em]`
- Corps : `font-inter text-[17px] leading-[1.7] text-pile-muted`
- Labels au-dessus des titres : `font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet`
- JAMAIS de texte centré sur plus de 2 lignes (sauf section manifeste/citation)

### Couleurs
- Fond principal : blanc `#ffffff`
- Sections alternées : fond `#aab8a5` avec texte blanc OU fond blanc
- Le violet `#5f3b61` : UNIQUEMENT underlines, labels, accents 1-2px. JAMAIS en fond. JAMAIS en texte corps.
- Boutons principaux : fond `#1a1a1a` texte blanc, hover fond `#5f3b61`, `rounded-[2px]`
- Boutons secondaires : transparent, `border border-pile-dark`, hover `border-pile-violet`
- JAMAIS de gradient. JAMAIS de box-shadow visible. JAMAIS de fond `#f5f5f5` ou `#f9f9f9`.

### Espacement
- Sections : `py-32` minimum desktop, `py-20` mobile
- Conteneur : `px-6 md:px-12 lg:px-20`, `max-w-6xl mx-auto`
- Gap grilles : `gap-12` ou `gap-16` minimum

### Layouts
- INTERDIT : grilles 3 colonnes symétriques de cards identiques
- Layout par défaut : `grid-cols-5` image + `grid-cols-7` texte (ou inversé) — jamais 50/50
- Images : `aspect-[3/4]` ou `aspect-[4/5]` portrait, `h-full` pleine hauteur
- Cards : hauteur fixe `h-[420px]` ou `aspect-[3/4]`, jamais height par le contenu
- Hover cards : `scale-[1.03]` sur l'image uniquement (transition 0.6s)
- Tarifs : liste structurée avec `border-b`, JAMAIS de cards

### Animations Framer Motion
- Durée max : `0.5s`, ease `easeOut`
- Pattern : `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`
- `whileInView` avec `viewport={{ once: true, margin: '-80px' }}`
- Stagger : `delay: index * 0.08`, max 0.4s total
- INTERDIT : rotate, x, spring, bounce, repeat, keyframes complexes

### Navbar
- `fixed top-0`, transparent → blanc + `backdrop-blur` au scroll
- Logo : Cormorant 20px, sans fond coloré permanent
- Liens : Inter uppercase 11px tracking-widest
- Actif : `border-b border-pile-violet`
- Mobile : overlay blanc plein écran, liens Cormorant 48px

### Patterns interdits
- Grid 3 colonnes symétriques
- Boutons border-radius > 4px
- Fond #f5f5f5, #f8f8f8, #fafafa
- Box-shadow visible
- Texte centré > 2 lignes (hors section manifeste)
- Images en cercles avec border-radius
- Nav avec fond coloré permanent
- Icônes Lucide décoratives sans raison
- Gradient background
- Sections au même layout que la précédente
- Font Inter pour titre principal

---

## 📞 Contact MELIOZ

**Maxime Lebas** — Développeur & référent projet
Email : Contact@agencemelioz.com · +33 6 33 56 99 62
RDV : cal.eu/agence-melioz

---

*© MELIOZ 2026 — Document confidentiel projet Atelier Pile-Attitude*