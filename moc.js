
(function (root) {
  "use strict";

  const templates = [
    "{a} vs {b} Live",
    "{b} vs {a} Live",
    "Live {a} vs {b}",
    "Live {b} vs {a}",
    "{a} Game Live",
    "Live {b} Game",
    "Watch {a} vs {b} Live",
    "{a} vs {b} Match Today",
    "{b} Game Live Today",
    "Watch {b} vs {a} Live",
    "Live Match: {a} vs {b}",
    "{a} Match Live Today",
    "Today's Live Game: {b}",
    "Watch {a} Game Today",
    "{b} vs {a} Match Today",
    "Live Now: {a} Game",
    "{a} vs {b} – Matchday Live",
    "Watch Live: {b} Game",
    "{b} Match Live Now",
    "Live Coverage: {a} vs {b}",
    "{a} Game Today",
    "{b} vs {a} – Live Match",
    "Follow {a} vs {b} Live",
    "Today's Match: {b} vs {a}",
    "Live Basketball: {a} vs {b}",
    "{a} vs {b} – Game Live",
    "Watch Today's {a} Match",
    "{b} Game Today Live",
    "Live Action: {a} vs {b}",
    "{a} vs {b} – Watch Live"
  ];

  function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function generateTitles(keywords, options = {}) {
    const count = Math.max(
      1,
      Math.min(Number(options.count) || 20, 500)
    );

    const input = Array.isArray(keywords)
      ? keywords
      : String(keywords).split(/\r?\n/);

    const matches = input
      .map(item => String(item).trim())
      .filter(Boolean);

    if (!matches.length) return [];

    const candidates = [];

    matches.forEach(match => {
      const parts = match.split(/\s+vs\.?\s+/i);

      const a = parts[0].trim();
      const b = (parts[1] || parts[0]).trim();

      templates.forEach(template => {
        candidates.push(
          template
            .replaceAll("{a}", a)
            .replaceAll("{b}", b)
        );
      });
    });

    const unique = [...new Set(candidates)];

    return shuffle(unique).slice(0, count);
  }

  function generateHTML(titles) {
    const safeTitles = titles.map(title =>
      String(title).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char])
    );

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Generated Titles</title>
</head>
<body>
<h2>Generated Titles</h2>
<ul>
${safeTitles.map(title => `<li>${title}</li>`).join("\n")}
</ul>
</body>
</html>`;
  }

  root.SocTitleGenerator = {
    generateTitles,
    generateHTML
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = root.SocTitleGenerator;
  }

})(typeof globalThis !== "undefined" ? globalThis : this);
