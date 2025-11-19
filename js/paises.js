// paises.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('paises-form');
  const paisInput = document.getElementById('pais');

  const resultado = document.getElementById('resultado-pais');
  const nombreEl = document.getElementById('nombre');
  const capitalEl = document.getElementById('capital');
  const poblacionEl = document.getElementById('poblacion');
  const banderaEl = document.getElementById('bandera');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pais = paisInput.value.trim();
    if (!pais) return;
    try {
      const resp = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(pais)}?fullText=false`);
      if (!resp.ok) throw new Error('Pais no encontrado');
      const [data] = await resp.json();
      nombreEl.textContent = data.name.common || data.name.official;
      capitalEl.textContent = data.capital ? data.capital[0] : '—';
      poblacionEl.textContent = data.population.toLocaleString();
      banderaEl.src = data.flags && data.flags.png ? data.flags.png : '';
      banderaEl.alt = `Bandera de ${nombreEl.textContent}`;
      resultado.classList.remove('hidden');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});