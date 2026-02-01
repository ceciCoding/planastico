export function isValidUrl(str: string): boolean {
  if (!str || !str.trim()) return true;

  const urlToTest =
    str.startsWith('http://') || str.startsWith('https://') ? str : `https://${str}`;

  try {
    const url = new URL(urlToTest);
    return url.hostname.includes('.');
  } catch {
    return false;
  }
}

export function validateLink(link: string): string {
  if (!link || !link.trim()) {
    return '';
  }
  if (!isValidUrl(link)) {
    return 'El enlace no es válido';
  }
  return '';
}
