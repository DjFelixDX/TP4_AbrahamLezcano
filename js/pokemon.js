// pokemon.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pokemon-form');
  const input = document.getElementById('pokemon-input');

  const resultado = document.getElementById('resultado-pokemon');
  const img = document.getElementById('pokemon-img');
  const nombreEl = document.getElementById('poke-nombre');
  const tiposEl = document.getElementById('poke-tipos');
  const pesoEl = document.getElementById('poke-peso');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    try {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q)}`);
      if (!resp.ok) throw new Error('Pokemon no encontrado');
      const data = await resp.json();
      img.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default || '';
      img.alt = data.name;
      nombreEl.textContent = capitalize(data.name);
      tiposEl.textContent = data.types.map(t => capitalize(t.type.name)).join(', ');
      pesoEl.textContent = `${data.weight} (hectogramos)`;
      resultado.classList.remove('hidden');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}