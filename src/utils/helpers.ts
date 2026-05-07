import DOMPurify from "dompurify";

export function sanitizeHtml(html?: string | null): string {
  if (!html) return "";

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "br", "a"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    // Force safe link behavior
    ADD_ATTR: ["target"],
  });
}
