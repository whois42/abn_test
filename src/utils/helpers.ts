export function sanitizeHtml(html?: string | null): string {
  if (!html) {
    return "No content available.";
  }
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}
