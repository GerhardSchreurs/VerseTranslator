const API_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = '8f948d8fa23613a62dde602681a64a96';

export async function callApi(path, options = {}) {
  const {
    retries = 3,
    timeout = 5000,
  } = options;

  const controller = new AbortController();
  const signal = controller.signal;

  // Timeout logic
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'api-key': API_KEY },
      signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (retries > 0 && (error.name === 'AbortError' || error.message.includes('fetch'))) {
      console.warn(`Retrying ${path} (${retries} retries left)...`);
      return callApi(path, { retries: retries - 1, timeout });
    }

    console.error(`API call failed: ${error.message}`);
    throw error;
  }
}

export async function getBibleVersions() {
  const json = await callApi('/bibles');
  return json.data.map(({ name, id, abbreviation, description, language }) => ({
    name,
    id,
    abbreviation,
    description,
    language: language.name,
  }));
}

export async function searchBible(bibleId, query) {
  const json = await callApi(`/bibles/${bibleId}/search?query=${encodeURIComponent(query)}`);
  return json.data;
  return json.data.passages.map(passage => passage.content);

  
  // return json.data.passages.map(({ content }) => ({
  //   content
  // }));
}