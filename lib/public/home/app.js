// Services
import { getPosts } from '../lib/services/posts-service.js';
import { getSession } from '../lib/services/auth-service.js';

// Components
import createPostList from '../lib/components/PostList.js';

// State
let session;
let posts;

async function handlePageLoad() {
  [session, posts] = await Promise.all([await getSession(), await getPosts()]);

  display();
}

const PostList = createPostList(document.querySelector('#post-list'));

function display() {
  PostList(!!session, posts);
}

handlePageLoad();
