export async function getSession() {
  const response = await fetch('/api/v1/github/session');
  return response.json();
}
