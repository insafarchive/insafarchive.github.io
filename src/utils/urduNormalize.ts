/**
 * Text normalization for bilingual legal search in Urdu and English.
 *
 * Handles:
 * - Urdu and Arabic character variant unification (Yeh, Kaf, Heh)
 * - Diacritic (Aarab / Harkat) stripping: Zer, Zabar, Pesh, Tashdeed, Tanween, Jazm
 * - Tatweel (Kashida) removal
 * - English lowercase and punctuation normalization
 *
 * NOTE ON LIMITATIONS:
 * This performs standard Unicode character-variant normalization and token matching.
 * It does NOT perform morphological stemming or inflected lemma analysis for Urdu verbs/plurals.
 */

// Regular expression to match Arabic/Urdu diacritical marks (Tashkeel / Harkat)
const URDU_DIACRITICS_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;

// Tatweel / Kashida (elongation character)
const TATWEEL_REGEX = /\u0640/g;

/**
 * Normalizes an Urdu or English string for index search matching.
 */
export function normalizeSearchText(text: string | null | undefined): string {
  if (!text) return '';

  let normalized = text
    .toLowerCase()
    .replace(TATWEEL_REGEX, '')
    .replace(URDU_DIACRITICS_REGEX, '');

  // Normalize character variants in Arabic/Urdu script
  normalized = normalized
    // Yeh variants: Arabic Yeh (ي), Alef Maksura (ى), Barree Yeh (ے) -> standard Urdu Chhoti Yeh (ی)
    .replace(/[\u064A\u0649\u06D2]/g, '\u06CC')
    // Kaf variants: Arabic Kaf (ك) -> Urdu Kaf (ک), Swash Kaf (ڪ) -> (ک)
    .replace(/[\u0643\u06AA]/g, '\u06A9')
    // Heh variants: Teh Marbuta (ة) -> Gol Heh (ہ), Arabic Ha (ه) -> Gol Heh (ہ), Ae (ە) -> (ہ)
    .replace(/[\u0629\u0647\u06D5]/g, '\u06C1')
    // Waw variants: Waw with hamza (ؤ) -> standard Waw (و)
    .replace(/[\u0624]/g, '\u0648')
    // Alef with madda (آ), hamza above (أ), hamza below (إ) -> standard Alef (ا)
    .replace(/[\u0622\u0623\u0625]/g, '\u0627')
    // Normalize zero-width non-joiner and spaces
    .replace(/[\u200C\u200D]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
}

/**
 * Tests if a search query matches a target text across normalized tokens.
 * All tokens in the query must match somewhere in the target string.
 */
export function matchesSearchQuery(targetText: string, query: string): boolean {
  if (!query.trim()) return true;
  if (!targetText) return false;

  const normalizedTarget = normalizeSearchText(targetText);
  const queryTokens = normalizeSearchText(query)
    .split(' ')
    .filter((token) => token.length > 0);

  return queryTokens.every((token) => normalizedTarget.includes(token));
}

/**
 * Extracts a contextual match snippet highlighting the search term
 */
export function extractMatchSnippet(
  text: string,
  query: string,
  maxSnippetLength = 120
): { snippet: string; hasMatch: boolean } {
  if (!text || !query.trim()) {
    return {
      snippet: text ? text.slice(0, maxSnippetLength) + (text.length > maxSnippetLength ? '...' : '') : '',
      hasMatch: false,
    };
  }

  const normalizedText = normalizeSearchText(text);
  const normalizedQuery = normalizeSearchText(query).split(' ')[0] || '';

  const matchIdx = normalizedText.indexOf(normalizedQuery);
  if (matchIdx === -1) {
    return {
      snippet: text.slice(0, maxSnippetLength) + (text.length > maxSnippetLength ? '...' : ''),
      hasMatch: false,
    };
  }

  const start = Math.max(0, matchIdx - 35);
  const end = Math.min(text.length, matchIdx + normalizedQuery.length + 65);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < text.length ? '...' : '';

  return {
    snippet: prefix + text.slice(start, end).trim() + suffix,
    hasMatch: true,
  };
}
