import config from '../config';

export default async function getTunes({ searchTerms }) {
  try {
    const url = `${config.apiUrl}/tunes?search_terms=${searchTerms}`;
    console.log('URL', url);
    const method = 'GET';
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log('GET TUNES RESPONSE', parsedResponse);
    return parsedResponse;
  } catch (e) {
    console.error(e);
    return;
  }
}
