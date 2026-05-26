# Setup Production — GitHub + Vercel + Resend

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les problèmes de démarrage local, configurer Resend pour le formulaire de contact, pousser sur GitHub et déployer sur Vercel.

**Architecture:** Next.js 16 App Router avec Sanity Studio embarqué (pas de process séparé). Resend gère les emails via l'API route `/api/contact`. GitHub → Vercel déploiement continu.

**Tech Stack:** Next.js 16.2.4, Sanity v3 (next-sanity), Resend SDK, GitHub CLI (`gh`), Vercel CLI ou dashboard.

---

## Audit — Ce qui a été vérifié

| Point | Statut | Note |
|---|---|---|
| TypeScript | ✅ Aucune erreur | `tsc --noEmit` propre |
| Packages npm | ✅ À jour | `npm outdated` vide |
| Sanity schemas | ✅ OK | 8 types définis |
| SEO / metadata | ✅ OK | Chaque page a sa `generateMetadata` |
| robots.ts | ✅ OK | `/studio/` bloqué |
| sitemap.ts | ✅ OK | 5 URLs |
| Resend SDK | ✅ Installé | `resend@6.9.4` présent |
| RESEND_API_KEY | ❌ Manquant | Absent de `.env.local` |
| Email `to` | ⚠️ Test | `mateoservant@gmail.com` → à remplacer par l'email de Sophie |
| Email `from` | ⚠️ Test | `onboarding@resend.dev` → domaine vérifié en prod |
| GitHub remote | ❌ Absent | Aucun remote configuré |
| `.env.example` | ❌ Absent | À créer pour le dépôt |
| `vercel.json` | ❌ Absent | Pas obligatoire mais utile |
| Build lent | ℹ️ Normal | Sanity Studio embarqué = build Turbopack lourd (~3-5 min) |
| `.next/lock` fantôme | ⚠️ Bug connu | Reste si Next.js crash → bloque le prochain build |

---

## Ce que tu dois me fournir pour Resend

Avant d'exécuter la **Task 2**, je vais avoir besoin de :

1. **RESEND_API_KEY** → Créer un compte sur [resend.com](https://resend.com), aller dans *API Keys* → *Create API Key* → copier la clé (commence par `re_`)
2. **Email de destination** → L'adresse email où Sophie recevra les messages du formulaire de contact (ex : `contact@atelierpileattitude.fr` ou son Gmail)
3. **Domaine Resend (optionnel pour l'instant)** → Pour envoyer depuis `contact@atelierpileattitude.fr` au lieu de `onboarding@resend.dev`, il faut vérifier le domaine dans Resend. En V1 on peut garder `onboarding@resend.dev` si Resend envoie bien vers l'email de destination.

---

## Task 1: Corriger la fiabilité du démarrage local

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Ajouter les scripts manquants dans `package.json`**

Remplacer la section `scripts` par :

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "clean": "rm -rf .next && echo 'Cache nettoyé'"
}
```

Le script `clean` supprime le `.next` pour éviter le bug du fichier `lock` fantôme qui bloque le build.

- [ ] **Step 2: Vérifier que `next dev` démarre bien**

```bash
npm run dev
```

Expected: `▲ Next.js 16.2.4 (Turbopack)` → `Local: http://localhost:3000` en < 10 secondes.

Sanity Studio est accessible à `http://localhost:3000/studio` — pas besoin de process séparé.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add clean script to fix .next/lock phantom bug"
```

---

## Task 2: Configurer Resend pour le formulaire de contact

> ⚠️ **Prérequis** : avoir fourni `RESEND_API_KEY` et l'email de destination (voir section "Ce que tu dois me fournir").

**Files:**
- Modify: `.env.local`
- Modify: `src/app/api/contact/route.ts`

- [ ] **Step 1: Ajouter `RESEND_API_KEY` dans `.env.local`**

Ajouter à la fin de `.env.local` :
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=sophieleblan@gmail.com
```

(Remplacer les valeurs par celles fournies.)

- [ ] **Step 2: Mettre à jour l'API route `/api/contact`**

Modifier `src/app/api/contact/route.ts` :

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "sophieleblan@gmail.com";

export async function POST(req: NextRequest) {
  const { nom, email, telephone, message, website } = await req.json();

  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!nom || !email || !message) {
    return NextResponse.json(
      { error: "Champs requis manquants." },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: "Atelier Pile-Attitude <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `Nouveau message de ${nom}`,
    text: `Nom : ${nom}\nEmail : ${email}\nTéléphone : ${telephone || "Non renseigné"}\n\nMessage :\n${message}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1a1a1a;">
        <h2 style="font-size: 24px; font-weight: 400; font-style: italic; margin-bottom: 32px; color: #1a1a1a;">
          Nouveau message — Atelier Pile-Attitude
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e5e5e5;">
            <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #5f3b61; width: 120px;">Nom</td>
            <td style="padding: 12px 0; font-size: 15px;">${nom}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e5e5;">
            <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #5f3b61;">Email</td>
            <td style="padding: 12px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #1a1a1a;">${email}</a></td>
          </tr>
          ${telephone ? `<tr style="border-bottom: 1px solid #e5e5e5;">
            <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #5f3b61;">Téléphone</td>
            <td style="padding: 12px 0; font-size: 15px;">${telephone}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 16px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #5f3b61; vertical-align: top;">Message</td>
            <td style="padding: 16px 0; font-size: 15px; line-height: 1.7; white-space: pre-line;">${message}</td>
          </tr>
        </table>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Tester le formulaire en local**

Démarrer `npm run dev`, aller sur `http://localhost:3000/contact`, remplir et soumettre le formulaire.

Expected: message de succès dans l'UI + email reçu dans la boîte de Sophie.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: configure Resend contact email with env var for destination"
```

---

## Task 3: Créer `.env.example` pour le dépôt GitHub

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Créer `.env.example`**

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=

# Resend (formulaire de contact)
RESEND_API_KEY=
CONTACT_TO_EMAIL=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- [ ] **Step 2: Vérifier que `.env.local` est bien dans `.gitignore`**

```bash
grep ".env" /Users/maximelebas/Documents/MELIOZ/pilate/Pile-Attitude/.gitignore
```

Expected: `.env*` est listé → les clés ne seront jamais commitées.

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "chore: add .env.example with all required environment variables"
```

---

## Task 4: Push sur GitHub

**Prérequis:** avoir `gh` CLI installé (`brew install gh` si besoin) et être connecté (`gh auth login`).

- [ ] **Step 1: Créer le dépôt GitHub**

```bash
gh repo create pile-attitude --private --description "Site vitrine Atelier Pile-Attitude — Studio Pilates Chatou" --source=. --remote=origin --push
```

Expected: `✓ Created repository MokoyS/pile-attitude on GitHub` + premier push.

Si le dépôt existe déjà :
```bash
git remote add origin https://github.com/MokoyS/pile-attitude.git
git push -u origin main
```

- [ ] **Step 2: Vérifier sur GitHub**

```bash
gh repo view --web
```

Expected: navigateur ouvre `github.com/MokoyS/pile-attitude`, tous les fichiers présents sauf `.env.local` et `node_modules`.

---

## Task 5: Déployer sur Vercel

**Option A — Dashboard Vercel (recommandé, plus simple)**

- [ ] **Step 1:** Aller sur [vercel.com](https://vercel.com) → *New Project* → importer `pile-attitude` depuis GitHub
- [ ] **Step 2:** Framework auto-détecté → *Next.js* ✅
- [ ] **Step 3:** Ajouter les variables d'environnement dans Vercel (Settings → Environment Variables) :

```
NEXT_PUBLIC_SANITY_PROJECT_ID = 68i040r3
NEXT_PUBLIC_SANITY_DATASET    = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
SANITY_API_TOKEN              = [copier depuis .env.local]
SANITY_WEBHOOK_SECRET         = [générer un secret aléatoire]
RESEND_API_KEY                = [copier depuis .env.local]
CONTACT_TO_EMAIL              = [email de Sophie]
NEXT_PUBLIC_APP_URL           = https://atelierpileattitude.fr
```

- [ ] **Step 4:** Cliquer *Deploy* → attendre ~3-5 min (build Sanity Studio lourd)
- [ ] **Step 5:** Vérifier le site déployé sur l'URL Vercel fournie

**Option B — CLI Vercel**

```bash
npx vercel --prod
```

Expected: URL de déploiement affichée.

---

## Task 6: Configurer le webhook Sanity → revalidation

Ce webhook permet au site Vercel de se rafraîchir automatiquement quand Sophie modifie du contenu dans Sanity Studio.

- [ ] **Step 1: Générer un secret webhook**

```bash
openssl rand -hex 32
```

Copier la valeur → c'est ton `SANITY_WEBHOOK_SECRET`.

- [ ] **Step 2: Ajouter le secret dans Vercel**

Dans Vercel → Settings → Environment Variables → ajouter `SANITY_WEBHOOK_SECRET` = la valeur générée.

- [ ] **Step 3: Ajouter aussi dans `.env.local`**

```bash
SANITY_WEBHOOK_SECRET=<valeur générée>
```

- [ ] **Step 4: Créer le webhook dans Sanity**

Aller sur [sanity.io/manage](https://www.sanity.io/manage) → projet `68i040r3` → *API* → *Webhooks* → *Add webhook* :

```
Name   : Vercel Revalidation
URL    : https://votre-domaine.vercel.app/api/revalidate
Dataset: production
Trigger: Create, Update, Delete
Header : x-webhook-secret = <valeur générée>
```

- [ ] **Step 5: Tester**

Modifier un document dans Sanity Studio → vérifier que le site Vercel se rafraîchit dans les 10 secondes.

---

## Résumé des informations à me fournir

| Info | Pourquoi |
|---|---|
| **RESEND_API_KEY** | Clé API pour envoyer les emails du formulaire de contact |
| **Email de destination** | Où arrivent les messages de contact (Sophie) |
| **Confirmation domaine Resend** | Utilise-t-on `onboarding@resend.dev` (test) ou un domaine vérifié ? |

Le reste (GitHub, Vercel) est entièrement automatisable une fois que j'ai ces infos.
