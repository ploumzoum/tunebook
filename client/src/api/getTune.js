import config from '../config';

export default async function getTune(payload) {
  const { tuneId } = payload;
  try {
    const url = `${config.apiUrl}/tunes/${tuneId}`;
    const method = 'GET';
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log('GET TUNE RESPONSE', parsedResponse);
    return parsedResponse;
  } catch (e) {
    console.error(e);
    return;
  }
}
