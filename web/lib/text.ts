// The design splits hero H1s into two lines, with the second line in the
// accent color. The CMS stores the title as one plain string, so this
// approximates the split: prefer a comma (matches the homepage title
// verbatim), otherwise break after ~60% of the words.
export function splitHeroTitle(title: string): [string, string] {
  const commaIndex = title.indexOf(",");
  if (commaIndex > -1) {
    return [title.slice(0, commaIndex + 1), title.slice(commaIndex + 1).trim()];
  }
  const words = title.split(" ");
  if (words.length < 3) return [title, ""];
  const splitAt = Math.ceil(words.length * 0.6);
  return [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")];
}

// Case study titles are seeded as "[Client] — [short description]" — split
// on the em dash to recreate the design's two-tone heading.
export function splitCaseStudyTitle(title: string): [string, string] {
  const parts = title.split(" — ");
  if (parts.length === 2) return [parts[0] + " —", parts[1]];
  return [title, ""];
}
