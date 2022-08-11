export default function createPostList(root) {
  return (loggedIn, posts) => {
    root.innerHTML = '';

    if (loggedIn) {
      for (const post of posts) {
        const author = post.author ? post.author.username : 'deleted user';

        const li = document.createElement('li');
        li.innerHTML = `<strong>${author}:</strong> ${post.content}`;
        //li.textContent = `${author}: ${post.content}`;
        root.append(li);
      }
    } else {
      const a = document.createElement('a');
      a.href = '/api/v1/github/login';
      a.textContent = 'Log in to continue.';

      const li = document.createElement('li');
      li.append(a);

      root.append(li);
    }
  };
}
