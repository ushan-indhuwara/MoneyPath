import Link from 'next/link';
import React from 'react';

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      nodes.push(
        match[3].startsWith('/') ? (
          <Link key={key++} href={match[3]}>
            {match[2]}
          </Link>
        ) : (
          <a
            key={key++}
            href={match[3]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[2]}
          </a>
        )
      );
    } else if (match[4]) {
      nodes.push(<strong key={key++}>{match[4]}</strong>);
    } else if (match[5]) {
      nodes.push(<em key={key++}>{match[5]}</em>);
    } else if (match[6]) {
      nodes.push(<code key={key++}>{match[6]}</code>);
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function getTableCells(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

export function ArticleContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);
  const rendered: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index].trim();
    const lines = block.split('\n');

    if (lines.every((line) => line.trim().startsWith('|'))) {
      const headers = getTableCells(lines[0]);
      const rows = lines.slice(2).map(getTableCells);

      rendered.push(
        <div key={index} className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of the debt snowball and debt avalanche methods
            </caption>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="border border-slate-200 bg-slate-100 px-4 py-3 font-bold"
                  >
                    {renderInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    const Cell = cellIndex === 0 ? 'th' : 'td';
                    return (
                      <Cell
                        key={cellIndex}
                        scope={cellIndex === 0 ? 'row' : undefined}
                        className="border border-slate-200 px-4 py-3 align-top"
                      >
                        {renderInlineMarkdown(cell)}
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (lines.every((line) => /^\d+\.\s/.test(line.trim()))) {
      rendered.push(
        <ol key={index} className="list-decimal space-y-2 pl-6">
          {lines.map((line, itemIndex) => (
            <li key={itemIndex}>
              {renderInlineMarkdown(line.trim().replace(/^\d+\.\s/, ''))}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (lines.every((line) => /^\*\s/.test(line.trim()))) {
      rendered.push(
        <ul key={index} className="list-disc space-y-2 pl-6">
          {lines.map((line, itemIndex) => (
            <li key={itemIndex}>
              {renderInlineMarkdown(line.trim().replace(/^\*\s/, ''))}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (block.startsWith('### ')) {
      rendered.push(
        <h3 key={index} className="pt-3 text-xl font-bold text-slate-900">
          {renderInlineMarkdown(block.slice(4))}
        </h3>
      );
      continue;
    }

    if (block.startsWith('## ')) {
      rendered.push(
        <h2 key={index} className="pt-5 text-2xl font-bold text-slate-900">
          {renderInlineMarkdown(block.slice(3))}
        </h2>
      );
      continue;
    }

    rendered.push(
      <p key={index}>
        {renderInlineMarkdown(lines.map((line) => line.trim()).join(' '))}
      </p>
    );
  }

  return <>{rendered}</>;
}
