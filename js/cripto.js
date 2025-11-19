document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'https://api.coingecko.com/api/v3';

  const form = document.getElementById('cripto-form');
  const select = document.getElementById('cripto-select');

  const resultado = document.getElementById('resultado-cripto');
  const precioEl = document.getElementById('precio');
  const cambioEl = document.getElementById('cambio24');
  const marketcapEl = document.getElementById('marketcap');

  const CACHE_TTL = 60 * 1000;

  function getCacheKey(id) {
    return `cg_cache_${id}`;
  }

  function readCache(id) {
    try {
      const raw = localStorage.getItem(getCacheKey(id));
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj.timestamp || !obj.data) return null;
      if ((Date.now() - obj.timestamp) > CACHE_TTL) {
        localStorage.removeItem(getCacheKey(id));
        return null;
      }
      return obj.data;
    } catch (err) {
      console.warn('Error leyendo cache CoinGecko:', err);
      return null;
    }
  }

  function writeCache(id, data) {
    try {
      const payload = { timestamp: Date.now(), data };
      localStorage.setItem(getCacheKey(id), JSON.stringify(payload));
    } catch (err) {
      console.warn('No se pudo guardar cache CoinGecko:', err);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = select.value;
    if (!id) return;

    const cached = readCache(id);
    if (cached) {
      renderData(cached);
      return;
    }

    const url = `${baseUrl}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(id)}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;

    try {
      const resp = await fetch(url);
      if (resp.status === 429) {
        throw new Error('Limite de peticiones alcanzado (429). Intenta de nuevo en unos segundos.');
      }
      if (!resp.ok) {
        throw new Error(`Error al obtener datos (status ${resp.status}).`);
      }

      const arr = await resp.json();
      const data = Array.isArray(arr) ? arr[0] : arr;

      if (!data) {
        throw new Error('No se encontraron datos para la moneda seleccionada.');
      }

      writeCache(id, data);
      renderData(data);
    } catch (err) {
      alert('Error: ' + err.message);
      console.error(err);
    }
  });

  function renderData(data) {
    precioEl.textContent = data?.current_price?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) ?? '—';

    cambioEl.textContent = (typeof data?.price_change_percentage_24h === 'number')
      ? data.price_change_percentage_24h.toFixed(2)
      : '—';

    marketcapEl.textContent = data?.market_cap?.toLocaleString() ?? '—';

    resultado.classList.remove('hidden');
  }
});
