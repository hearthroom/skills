// Two offset-preserving views: comments removed, and only executable tokens retained.
// Literal arguments remain in text so event names and save keys can still be checked.
export function scriptViews(source) {
  const text = source.split(''), code = source.split('');
  const blank = (start, end, comment = false) => {
    for (let p = start; p < end; p++) if (!/[\r\n\u2028\u2029]/.test(source[p])) {
      code[p] = ' ';
      if (comment) text[p] = ' ';
    }
  };
  const ident = c => c !== undefined && /[\w$\u0080-\uffff]/.test(c);
  const lineEnd = c => c === undefined || /[\r\n\u2028\u2029]/.test(c);
  function walk(i, interpolation = false) {
    let depth = 0, regexAllowed = true, word = '', property = false;
    const parens = [];
    while (i < source.length) {
      const start = i, c = source[i], next = source[i + 1];
      if (/\s/.test(c)) { i++; continue; }
      const legacyClose = source.startsWith('-->', i) && /^\s*$/.test(source.slice(source.lastIndexOf('\n', i - 1) + 1, i));
      if ((c === '/' && next === '/') || source.startsWith('<!--', i) || legacyClose) {
        while (!lineEnd(source[i])) i++;
        blank(start, i, true); continue;
      }
      if (c === '/' && next === '*') {
        const end = source.indexOf('*/', i + 2);
        i = end < 0 ? source.length : end + 2;
        blank(start, i, true); continue;
      }
      if (c === "'" || c === '"') {
        i++;
        while (i < source.length) {
          if (source[i] === '\\') { i = Math.min(i + 2, source.length); continue; }
          if (source[i++] === c) break;
        }
        blank(start, i); regexAllowed = false; word = ''; continue;
      }
      if (c === '`') {
        blank(i, i + 1); i++;
        while (i < source.length) {
          if (source[i] === '\\') { const end = Math.min(i + 2, source.length); blank(i, end); i = end; }
          else if (source[i] === '`') { blank(i, i + 1); i++; break; }
          else if (source[i] === '$' && source[i + 1] === '{') { blank(i, i + 2); i = walk(i + 2, true); }
          else { blank(i, i + 1); i++; }
        }
        regexAllowed = false; word = ''; continue;
      }
      if (c === '/' && regexAllowed) {
        let inClass = false;
        i++;
        while (i < source.length && !lineEnd(source[i])) {
          const r = source[i++];
          if (r === '\\') { i = Math.min(i + 1, source.length); continue; }
          if (r === '[') inClass = true;
          if (r === ']') inClass = false;
          if (r === '/' && !inClass) break;
        }
        while (ident(source[i])) i++;
        blank(start, i); regexAllowed = false; word = ''; continue;
      }
      if (ident(c)) {
        while (ident(source[i])) i++;
        word = property ? '' : source.slice(start, i);
        // Contextual words (await/yield/of) can also be ordinary identifiers.
        regexAllowed = /^(return|throw|case|delete|void|typeof|new|in|else|do|instanceof)$/.test(word);
        property = false;
        continue;
      }
      i++;
      if (c === '{') depth++;
      if (c === '}') {
        if (interpolation && depth === 0) { blank(start, i); return i; }
        depth--;
      }
      if (c === '(') parens.push(/^(if|while|for|with|switch|catch)$/.test(word));
      if (c === ')') regexAllowed = parens.pop() ?? false;
      else if ((c === '+' || c === '-') && next === c) { i++; regexAllowed = false; }
      else regexAllowed = !/[\]}.]/.test(c);
      property = c === '.' || (c === '#' && property);
      word = '';
    }
    return i;
  }
  walk(0);
  return { text: text.join(''), code: code.join('') };
}

// Comments outside script raw text must be removed before looking for script tags.
export function activeHTML(html) {
  return html.replace(/<!--[\s\S]*?(?:-->|$)|<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,
    part => part.startsWith('<!--') ? part.replace(/[^\r\n]/g, ' ') : part);
}

const entityChars = { quot: '"', apos: "'", amp: '&', lt: '<', gt: '>' };
function decodeAttribute(value) {
  return value.replace(/&(?:#(x[0-9a-f]+|[0-9]+)|(quot|apos|amp|lt|gt));/gi, (entity, numeric, named) => {
    if (named) return entityChars[named.toLowerCase()];
    const point = numeric[0].toLowerCase() === 'x' ? parseInt(numeric.slice(1), 16) : Number(numeric);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '\ufffd';
  });
}

// Keep HTML SDK uses, but give scripts and inline handlers their JS context.
export function htmlSDKUsage(markup) {
  return markup.replace(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi, (_, body) => scriptViews(body).code)
    .replace(/\bon[a-z]+\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
      (_, double, single, unquoted) => scriptViews(decodeAttribute(double ?? single ?? unquoted)).code);
}
