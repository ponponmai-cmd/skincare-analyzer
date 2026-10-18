"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { InciExplanation, LegalNote } from "@/lib/inci-explain";
import { cn } from "cn";

export interface ExplainRow extends InciExplanation {
  position: number;
  highlight?: boolean;
  tags?: string[];
  lineBefore?: boolean;
}

const shorten = (value: string, length = 110) => (value.length > length ? `${value.slice(0, length)}…` : value);

function LegalText({ note }: { note: LegalNote }) {
  const full = [note.scope && `適用：${note.scope}`, note.limit && `上限：${note.limit}`, note.rule && `限制：${note.rule}`, note.warning && `包裝須標示：${note.warning}`]
    .filter(Boolean)
    .join("；");
  return (
    <p className="text-xs leading-5" title={full}>
      <span className="mr-1 inline-block border border-sky-700/50 bg-sky-50 px-1 text-sky-900">台灣規定・{note.list}</span>
      {note.limit ? <>上限 {shorten(note.limit, 70)}</> : null}
      {note.rule ? <span className="block">{shorten(note.rule)}</span> : null}
      {note.warning ? <span className="block">包裝須標示：{shorten(note.warning)}</span> : null}
    </p>
  );
}

export function InciExplainTable({ rows, showFilter = true }: { rows: ExplainRow[]; showFilter?: boolean }) {
  const [onlyCautions, setOnlyCautions] = useState(false);
  const flagged = rows.filter((row) => row.cautions.length > 0 || row.legal.length > 0 || row.banned);
  const visible = onlyCautions ? flagged : rows;

  return (
    <div>
      {showFilter ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Button type="button" size="sm" variant={onlyCautions ? "outline" : "default"} className="h-8" onClick={() => setOnlyCautions(false)}>
            全部 {rows.length} 項
          </Button>
          <Button type="button" size="sm" variant={onlyCautions ? "default" : "outline"} className="h-8" onClick={() => setOnlyCautions(true)}>
            只看要注意的 {flagged.length} 項
          </Button>
        </div>
      ) : null}

      <div className="mt-3 hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs text-muted-foreground">
            <tr>
              <th className="w-10 py-2 pr-3 font-normal">#</th>
              <th className="w-[26%] py-2 pr-3 font-normal">成分</th>
              <th className="w-[30%] py-2 pr-3 font-normal">功效</th>
              <th className="py-2 font-normal">注意事項・台灣規定</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={`${row.position}-${row.raw}`}
                className={cn("border-b border-border align-top", row.lineBefore && "border-t-2 border-t-cinnabar")}
              >
                <td className="py-2 pr-3 text-muted-foreground">{row.position}</td>
                <td className="py-2 pr-3">
                  <Name row={row} />
                </td>
                <td className={cn("py-2 pr-3 leading-6", row.guessed && "text-muted-foreground")}>{row.purpose}</td>
                <td className="py-2">
                  <Cautions row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-3 divide-y divide-border border-y border-border md:hidden">
        {visible.map((row) => (
          <li key={`${row.position}-${row.raw}`} className={cn("py-3 text-sm", row.lineBefore && "border-t-2 border-t-cinnabar")}>
            <div className="flex gap-2">
              <span className="w-6 shrink-0 text-muted-foreground">{row.position}</span>
              <div className="min-w-0">
                <Name row={row} />
                <p className={cn("mt-1 leading-6", row.guessed && "text-muted-foreground")}>{row.purpose}</p>
                <div className="mt-1">
                  <Cautions row={row} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {onlyCautions && flagged.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">這張成分表沒有需要特別注意的成分。</p>
      ) : null}
    </div>
  );
}

function Name({ row }: { row: ExplainRow }) {
  return (
    <>
      {row.zh ? (
        row.ingredientSlug ? (
          <Link href={`/ingredients/${row.ingredientSlug}`} className={cn("hover:underline", row.highlight && "font-medium text-cinnabar")}>
            {row.zh}
          </Link>
        ) : (
          <span className={cn(row.highlight && "font-medium text-cinnabar")}>{row.zh}</span>
        )
      ) : null}
      <span className={cn("block break-words text-xs text-muted-foreground", !row.zh && "text-sm text-foreground")}>{row.raw}</span>
    </>
  );
}

function Cautions({ row }: { row: ExplainRow }) {
  const empty = row.cautions.length === 0 && row.legal.length === 0 && !row.tags?.length;
  return (
    <div className="space-y-1">
      {row.tags?.length ? (
        <div className="flex flex-wrap gap-1">
          {row.tags.map((tag) => (
            <span key={tag} className="border border-border px-1.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {row.cautions.map((caution) => (
        <p key={caution} className={cn("text-xs leading-5", row.banned ? "font-medium text-destructive" : "text-cinnabar")}>
          {caution}
        </p>
      ))}
      {row.legal.map((note, index) => (
        <LegalText key={index} note={note} />
      ))}
      {row.notes.map((note) => (
        <p key={note} className="text-xs leading-5 text-muted-foreground">
          {note}
        </p>
      ))}
      {empty && row.notes.length === 0 ? <span className="text-xs text-muted-foreground">一般用量沒有特別要注意的</span> : null}
    </div>
  );
}
