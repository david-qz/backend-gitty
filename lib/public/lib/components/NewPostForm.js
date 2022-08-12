export default function createNewPostForm(form, { handleMakePost }) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    handleMakePost(formData.get('content'));
    form.reset();
  });

  return () => {};
}
