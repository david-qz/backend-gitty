export default function createLogoutLink(root, { handleLogout }) {
  root.addEventListener('click', () => {
    handleLogout();
  });

  return (loggedIn) => {
    root.style.visibility = loggedIn ? 'visible' : 'hidden';
  };
}
