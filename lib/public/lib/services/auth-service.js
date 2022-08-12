export async function getSession() {
  const response = await fetch('/api/v1/github/session');
  return response.json();
}

export async function logout() {
  const response = await fetch('/api/v1/github', {
    method: 'DELETE'
  });
  return response.status === 204;
}
