import katex from 'katex';

function unescapeLatexText(s) {
  return String(s)
    .replace(/\\_/g, '_')
    .replace(/\\{/g, '{')
    .replace(/\\}/g, '}')
    .replace(/\\\\/g, '\\');
}

function normalizeTextMacros(s) {
  // Convert "{...}" that looks like an escaped identifier into \texttt{...}.
  // IMPORTANT: apply ONLY to non-math text; math ($...$) segments may legitimately use braces.
  // We also require at least one "\_" to avoid touching things like "\mathbf{p}".
  // Example: "{cross\_warp\_with\_pose}" -> "\texttt{cross\_warp\_with\_pose}"
  return String(s).replace(/\{([A-Za-z0-9\\_]*\\_[A-Za-z0-9\\_]+)\}/g, '\\texttt{$1}');
}

function parseBracedContent(input, startIdx) {
  // input[startIdx] must be '{'
  let i = startIdx;
  if (input[i] !== '{') return null;
  i += 1;
  let depth = 1;
  let out = '';
  while (i < input.length) {
    const ch = input[i];
    if (ch === '{') {
      depth += 1;
      out += ch;
      i += 1;
      continue;
    }
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return { content: out, endIdx: i + 1 };
      out += ch;
      i += 1;
      continue;
    }
    out += ch;
    i += 1;
  }
  return null;
}

function renderTextWithMacros(text) {
  const nodes = [];
  let i = 0;
  let key = 0;

  const pushText = (s) => {
    if (!s) return;
    nodes.push(<span key={`t_${key++}`}>{unescapeLatexText(s)}</span>);
  };

  while (i < text.length) {
    const idxB = text.indexOf('\\textbf{', i);
    const idxT = text.indexOf('\\texttt{', i);
    const next = [idxB, idxT].filter((v) => v !== -1).sort((a, b) => a - b)[0];
    if (next === undefined) {
      pushText(text.slice(i));
      break;
    }

    pushText(text.slice(i, next));
    if (next === idxB) {
      const open = next + '\\textbf'.length;
      const parsed = parseBracedContent(text, open);
      if (!parsed) {
        pushText(text.slice(next, next + 7));
        i = next + 7;
        continue;
      }
      nodes.push(<strong key={`b_${key++}`}>{unescapeLatexText(parsed.content)}</strong>);
      i = parsed.endIdx;
      continue;
    }

    // \texttt
    const open = next + '\\texttt'.length;
    const parsed = parseBracedContent(text, open);
    if (!parsed) {
      pushText(text.slice(next, next + 7));
      i = next + 7;
      continue;
    }
    nodes.push(
      <code
        key={`c_${key++}`}
        className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-800"
      >
        {unescapeLatexText(parsed.content)}
      </code>,
    );
    i = parsed.endIdx;
  }

  return nodes;
}

function renderInlineLatex(paragraph) {
  const parts = paragraph.split(/(\$[^$]+\$)/g).filter(Boolean);
  let key = 0;
  return parts.map((part) => {
    if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
      const latex = part.slice(1, -1);
      const html = katex.renderToString(latex, {
        throwOnError: false,
        strict: 'ignore',
        displayMode: false,
        trust: false,
      });
      return (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
          key={`m_${key++}`}
          className="mx-0.5 align-middle"
        />
      );
    }
    const normalizedText = normalizeTextMacros(part);
    return <span key={`p_${key++}`}>{renderTextWithMacros(normalizedText)}</span>;
  });
}

export default function RichText({ text, className = '' }) {
  const normalized = (text ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();

  const paragraphs = normalized
    .split(/\n{2,}/g)
    .map((p) => p.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((p, idx) => (
        <p key={idx} className="text-sm leading-7 text-gray-700">
          {renderInlineLatex(p)}
        </p>
      ))}
    </div>
  );
}

