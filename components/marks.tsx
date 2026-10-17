import { Badge } from "@/components/ui/badge";
import { evidenceLabel, irritancyLabel, pregnancyLabel } from "@/lib/labels";
import type { Evidence, Pregnancy } from "@/lib/types";

export function EvidenceBadge({ evidence }: { evidence: Evidence }) {
  return (
    <Badge variant={evidence === "strong" ? "default" : "outline"}>
      {evidenceLabel[evidence]}
    </Badge>
  );
}

export function PregnancyBadge({ pregnancy }: { pregnancy: Pregnancy }) {
  return (
    <Badge variant={pregnancy === "avoid" ? "destructive" : "secondary"}>
      {pregnancyLabel[pregnancy]}
    </Badge>
  );
}

export function Irritancy({ level }: { level: 0 | 1 | 2 | 3 | 4 }) {
  return <span>刺激度 {irritancyLabel[level]}</span>;
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">
        {kicker}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{lede}</p>
    </header>
  );
}
