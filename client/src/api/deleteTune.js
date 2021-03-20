import config from '../config';

export default async function deleteTune(payload) {
  const { tuneId } = payload;
  try {
    const url = `${config.apiUrl}/tunes/${tuneId}`;
    const method = 'DELETE';
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log('DELETE TUNE RESPONSE', response);
    return response.status;
  } catch (e) {
    console.error(e);
    return;
  }
}
