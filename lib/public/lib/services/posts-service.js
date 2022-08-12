export async function getPosts() {
  const response = await fetch('/api/v1/posts');
  return await response.json();
}

export async function makePost(content) {
  const response = await fetch('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post: content })
  });

  return await response.json();
}
