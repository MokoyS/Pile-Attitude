import type { Creneau } from "@/types/sanity.types";

interface PlanningCardProps {
  creneau: Creneau;
  reservable: boolean;
}

export function PlanningCard({ creneau, reservable }: PlanningCardProps) {
  return (
    <div className="bg-white border border-pile-green/30 rounded-sm p-4">
      <div className="font-inter text-sm text-pile-muted">{creneau.typeCours}</div>
      <div className="font-cormorant italic text-xl text-pile-dark mt-1">
        {creneau.heure} {creneau.duree && `(${creneau.duree})`}
      </div>
      {creneau.professeure?.nom && (
        <div className="font-inter text-sm text-pile-dark mt-1">{creneau.professeure.nom}</div>
      )}
      {creneau.lieu && (
        <div className="font-inter text-xs text-pile-muted mt-1">{creneau.lieu}</div>
      )}
      {reservable && (
        <button
          disabled
          title="Bientôt disponible"
          className="mt-3 px-4 py-1.5 text-xs font-inter bg-pile-green text-white rounded-sm opacity-50 cursor-not-allowed"
        >
          Réserver
        </button>
      )}
    </div>
  );
}
