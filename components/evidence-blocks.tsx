import { efficacyCriteria, efficacyLabel, verdictClass, verdictLabel, verdictNote } from "@/lib/evidence";
import { pubmedUrl, references, studyKindLabel, studyKindRank } from "@/lib/references";
import type { ClaimCheck, ClaimVerdict } from "@/lib/types";
import { cn } from "cn";

export function EfficacyMeter({ value, showLabel = true, className }: { value: number; showLabel?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", className)} title={efficacyCriteria}>
      <span className="inline-flex gap-0.5" aria-label={`實際效果 ${value} / 5`}>
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={cn("h-2.5 w-1.5", step <= value ? (value >= 4 ? "bg-emerald-700" : value === 3 ? "bg-sky-700" : "bg-amber-600") : "bg-border")}
          />
        ))}
      </span>
      {showLabel ? <span className="text-muted-foreground">{efficacyLabel[value]}</span> : null}
    </span>
  );
}

export function VerdictBadge({ verdict, className }: { verdict: ClaimVerdict; className?: string }) {
  return (
    <span title={verdictNote[verdict]} className={cn("inline-block shrink-0 border px-1.5 py-0.5 text-xs whitespace-nowrap", verdictClass[verdict], className)}>
      {verdictLabel[verdict]}
    </span>
  );
}

function RefChip({ id }: { id: string }) {
  const reference = references[id];
  if (!reference) return null;
  return (
    <a
      href={pubmedUrl(reference)}
      target="_blank"
      rel="noopener noreferrer"
      title={`${reference.title}（${reference.journal} ${reference.year}）`}
      className="underline decoration-dotted underline-offset-2 hover:text-cinnabar"
    >
      {reference.authors.replace(/, et al\.$/, " 等")} {reference.year}
    </a>
  );
}

export function ClaimList({ claims }: { claims: ClaimCheck[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {claims.map((claim) => (
        <li key={claim.claim} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="min-w-0">
            <p className="text-sm font-medium leading-6">{claim.claim}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{claim.why}</p>
            {claim.refs?.length ? (
              <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                文獻：
                {claim.refs.map((id) => (
                  <RefChip key={id} id={id} />
                ))}
              </p>
            ) : null}
          </div>
          <VerdictBadge verdict={claim.verdict} className="justify-self-start sm:justify-self-end" />
        </li>
      ))}
    </ul>
  );
}

export function RefList({ ids, className }: { ids: string[]; className?: string }) {
  const items = [...new Set(ids)]
    .map((id) => references[id])
    .filter(Boolean)
    .sort((a, b) => studyKindRank[a.kind] - studyKindRank[b.kind] || b.year - a.year);
  if (!items.length) return null;
  return (
    <ol className={cn("space-y-3", className)}>
      {items.map((reference) => (
        <li key={reference.id} className="text-sm leading-6">
          <p>{reference.finding}</p>
          <p className="text-xs leading-5 text-muted-foreground">
            <span className="mr-1 border border-border px-1">{studyKindLabel[reference.kind]}</span>
            {reference.authors}（{reference.year}）
            <a href={pubmedUrl(reference)} target="_blank" rel="noopener noreferrer" className="ml-1 underline hover:text-cinnabar">
              {reference.title}. <i>{reference.journal}</i>. PMID {reference.pmid}
            </a>
            {reference.industry ? <span className="ml-1 text-amber-800">・{reference.industry}</span> : null}
          </p>
        </li>
      ))}
    </ol>
  );
}
