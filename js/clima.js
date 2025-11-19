// clima.js
const API_KEY = 'b9a71670587dcbacc5b2a5ab28f4eb6d';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('clima-form');
  const ciudadInput = document.getElementById('ciudad');

  const resultado = document.getElementById('resultado-clima');
  const tempEl = document.getElementById('temp');
  const humedadEl = document.getElementById('humedad');
  const descEl = document.getElementById('descripcion');
  const iconEl = document.getElementById('icono-clima');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ciudad = ciudadInput.value.trim();
    if (!ciudad) return;

    try {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&units=metric&lang=es&appid=${API_KEY}`);
      if (!resp.ok) throw new Error('Ciudad no encontrada');
      const data = await resp.json();
      tempEl.textContent = data.main.temp;
      humedadEl.textContent = data.main.humidity;
      descEl.textContent = data.weather[0].description;
      const icon = data.weather[0].icon;
      iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      iconEl.classList.remove('hidden');
      resultado.classList.remove('hidden');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});