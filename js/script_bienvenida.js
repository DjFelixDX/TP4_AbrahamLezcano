document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('welcome-modal');
  const form = document.getElementById('welcome-form');
  const first = document.getElementById('firstName');
  const last = document.getElementById('lastName');
  const userSpan = document.getElementById('user-name');

  if (!modal || !form || !first || !last || !userSpan) return;
  try {
    const stored = JSON.parse(localStorage.getItem('proyecto_apis_user') || 'null');
    if (stored && stored.first && stored.last) {
      userSpan.textContent = stored.first + ' ' + stored.last;
      modal.style.display = 'none';
      return;
    }
  } catch (e) {
  }

  modal.style.display = 'flex';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = first.value.trim();
    const l = last.value.trim();
    if (!f || !l) return;
    try {
      localStorage.setItem('proyecto_apis_user', JSON.stringify({ first: f, last: l }));
    } catch (err) {
    }
    userSpan.textContent = f + ' ' + l;
    modal.style.display = 'none';
  });
});