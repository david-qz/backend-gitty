export default function createPostList(root) {
  return (posts) => {
    root.innerHTML = '';

    for (const post of posts) {
      root.append(createPostView(post));
    }
  };
}

function createPostView(post) {
  const li = document.createElement('li');

  const avatarImg = document.createElement('img');
  avatarImg.src = post.author?.avatar || '../assets/missing.png';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = post.author?.username || 'deleted user';

  const contentP = document.createElement('p');
  contentP.textContent = post.content;

  li.append(avatarImg, nameSpan, contentP);
  return li;
}
