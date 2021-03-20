import config from '../config';

export default async function getAllTunes() {
  try {
    const url = `${config.apiUrl}/tunes/all`;
    const method = 'GET';
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log('GET ALL TUNES RESPONSE', parsedResponse);
    return parsedResponse;
  } catch (e) {
    console.error(e);
    return;
  }
}
