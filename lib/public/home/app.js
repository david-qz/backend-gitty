// Services
import { getPosts, makePost } from '../lib/services/posts-service.js';
import { getSession, logout } from '../lib/services/auth-service.js';

// Components
import createLogoutLink from '../lib/components/LogoutLink.js';
import createNewPostForm from '../lib/components/NewPostForm.js';
import createPostList from '../lib/components/PostList.js';

// State
let session;
let posts;

async function handlePageLoad() {
  session = await getSession();
  if (!session) {
    openModal();
    return;
  }

  posts = await getPosts();
  display();
}

async function handleLogout() {
  const success = await logout();
  if (success) window.location.reload();
}

async function handleMakePost(content) {
  const newPost = await makePost(content);
  posts.push(newPost);
  display();
}

const LogoutLink = createLogoutLink(document.querySelector('#logout-link'), {
  handleLogout
});
const NewPostForm = createNewPostForm(document.querySelector('#post-form'), {
  handleMakePost
});
const PostList = createPostList(document.querySelector('#post-list'));

function display() {
  LogoutLink(!!session);
  NewPostForm();
  PostList(posts);
}

function openModal() {
  const modal = document.querySelector('#login-modal');
  modal.classList.add('open');
}

handlePageLoad();
