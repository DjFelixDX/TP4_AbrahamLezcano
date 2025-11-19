// rick.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rick-form');
  const idInput = document.getElementById('rick-id');

  const resultado = document.getElementById('resultado-rick');
  const img = document.getElementById('rick-img');
  const nombreEl = document.getElementById('rick-nombre');
  const estadoEl = document.getElementById('rick-estado');
  const especieEl = document.getElementById('rick-especie');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = idInput.value.trim();
    if (!id) return;
    try {
      const resp = await fetch(`https://rickandmortyapi.com/api/character/${encodeURIComponent(id)}`);
      if (!resp.ok) throw new Error('Personaje no encontrado');
      const data = await resp.json();
      img.src = data.image;
      img.alt = data.name;
      nombreEl.textContent = data.name;
      estadoEl.textContent = data.status;
      especieEl.textContent = data.species;
      resultado.classList.remove('hidden');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});