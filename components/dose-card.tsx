import { doseGuide } from "@/lib/doses";
import { cn } from "cn";

export function DoseCard({ slug, className, compact = false }: { slug: string; className?: string; compact?: boolean }) {
  const dose = doseGuide[slug];
  if (!dose) return null;
  const rows: [string, string | undefined][] = [
    ["最少要有", dose.minimum],
    ["效果最好的範圍", dose.sweetSpot],
    ["再高也沒用或太刺", dose.tooMuch],
    ["多久看得到", dose.timeToSee],
  ];
  return (
    <section className={cn("border border-cinnabar/40 bg-cinnabar/5 p-4", className)}>
      <h3 className={cn("font-serif", compact ? "text-lg" : "text-2xl")}>一瓶要有多少才看得到效果？</h3>
      <dl className={cn("mt-3 grid gap-3 text-sm", compact ? "sm:grid-cols-2" : "sm:grid-cols-4")}>
        {rows
          .filter((row): row is [string, string] => Boolean(row[1]))
          .map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 leading-6">{value}</dd>
            </div>
          ))}
      </dl>
      {dose.note ? <p className="mt-3 text-sm leading-6">{dose.note}</p> : null}
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        多數品牌不寫濃度。沒寫時看成分表位置：排在前五項、或在防腐劑（苯氧乙醇）之前，通常才接近有效量；排在香料之後多半低於 1%。
      </p>
    </section>
  );
}
