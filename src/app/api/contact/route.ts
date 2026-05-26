import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "atelierpileattitude@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const FROM_NAME = "Atelier Pile-Attitude";

const ALLOWED_ORIGINS = [
  "https://www.atelier-pile-attitude.fr",
  "https://atelier-pile-attitude.fr",
  "http://localhost:3000",
];

const SPAM_KEYWORDS = [
  "seo", "backlink", "référencement", "crypto", "bitcoin", "investissement",
  "casino", "viagra", "loan", "forex", "marketing agency", "agence marketing",
  "we can help your business", "increase your traffic", "buy now", "click here",
  "make money", "earn money", "work from home", "prix spécial", "offre limitée",
];

// Rate limiting en mémoire (par IP, max 5 soumissions / 10 min)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (submissions.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_LIMIT) return true;
  submissions.set(ip, [...times, now]);
  return false;
}

function containsSpam(text: string): boolean {
  const lower = text.toLowerCase();
  return SPAM_KEYWORDS.some(kw => lower.includes(kw));
}

export async function POST(req: NextRequest) {
  // Vérification d'origine
  const origin = req.headers.get("origin") ?? "";
  const referer = req.headers.get("referer") ?? "";
  const originOk = ALLOWED_ORIGINS.some(o => origin.startsWith(o) || referer.startsWith(o));
  if (!originOk) {
    return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
  }

  // Rate limiting par IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }

  let body: { nom?: string; email?: string; telephone?: string; message?: string; website?: string; _t?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { nom, email, telephone, message, website, _t } = body;

  // Honeypot
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Timer anti-bot : formulaire soumis en moins de 3 secondes
  if (_t && Date.now() - _t < 3000) {
    return NextResponse.json({ success: true });
  }

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  // Validation email basique
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  // Filtre mots-clés spam
  if (containsSpam(nom) || containsSpam(message)) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set");
    return NextResponse.json({ error: "Service email non configuré." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  console.log("[contact] sending email via Resend...");
  const { data, error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
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
    console.error("[contact] Resend error — name:", error.name, "| message:", error.message, "| full:", JSON.stringify(error));
    return NextResponse.json({ error: error.message, resendError: error.name }, { status: 500 });
  }

  console.log("[contact] Resend success — id:", data?.id);
  return NextResponse.json({ success: true });
}
