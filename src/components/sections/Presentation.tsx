import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Presentation() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <p className="font-inter uppercase tracking-[0.2em] text-[11px] text-pile-violet mb-8">
            Bienvenue
          </p>
          <h2
            className="font-cormorant italic leading-[1.05] tracking-[-0.02em] text-pile-dark mb-16"
            style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
          >
            L&apos;Atelier Pile-Attitude
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="space-y-7 font-inter text-[17px] leading-[1.8] text-pile-muted">
            <p>
              Bienvenue à l&apos;Atelier Pile-Attitude, un studio entièrement dédié à la pratique
              du Pilates, idéalement situé à seulement 5 minutes à pied de la gare du RER A de
              Chatou-Croissy.
            </p>
            <p>
              Nous avons imaginé un espace où la{" "}
              <em className="font-cormorant not-italic text-pile-dark font-medium" style={{ color: "#7c6a52" }}>Bienveillance</em>,
              le{" "}
              <em className="font-cormorant not-italic text-pile-dark font-medium" style={{ color: "#7c6a52" }}>Plaisir</em>{" "}
              et le{" "}
              <em className="font-cormorant not-italic text-pile-dark font-medium" style={{ color: "#7c6a52" }}>Progrès</em>{" "}
              sont au cœur de chaque séance. Ici, chacun avance à son rythme, dans une atmosphère
              conviviale et respectueuse, propice à l&apos;écoute de soi.
            </p>
            <p>
              Le Pilates est bien plus qu&apos;une simple méthode d&apos;entraînement : c&apos;est
              un véritable outil pour se sentir mieux au quotidien, mais aussi pour améliorer ses
              performances dans ses activités sportives ou artistiques.
            </p>
            <p>
              Grâce à une observation attentive et personnalisée de votre posture, nous identifions
              ensemble les déséquilibres pouvant être à l&apos;origine de tensions, de douleurs ou
              de blocages. À travers des exercices ciblés et adaptés, vous apprendrez à mieux
              comprendre votre corps et à retrouver un mouvement juste et efficace.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-12 w-12 h-px bg-pile-violet mx-auto" />
        </AnimatedSection>
      </div>
    </section>
  );
}
