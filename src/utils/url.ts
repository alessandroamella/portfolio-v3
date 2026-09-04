export function isInternalLink(href?: string): boolean {
  if (!href) return false;
  return href.startsWith('/') || href.startsWith('.');
}
