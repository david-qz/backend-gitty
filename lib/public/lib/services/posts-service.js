export async function getPosts() {
  const response = await fetch('/api/v1/posts');
  return await response.json();
}
