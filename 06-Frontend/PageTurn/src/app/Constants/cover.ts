/**
 * Fallback image shown when a book cover fails to load (missing or broken URL).
 * SVG data URI so it works offline and has no external dependency.
 */
export const COVER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Crect fill='%23e9e5cd' width='150' height='200'/%3E%3Ctext x='75' y='95' dominant-baseline='middle' text-anchor='middle' fill='%23726522' font-size='14' font-family='sans-serif'%3ENo Cover%3C/text%3E%3C/svg%3E";
