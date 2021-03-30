import config from '../config';

export default async function postTune({
  title,
  type,
  abc,
  key,
  composer,
  note,
}) {
  const body = JSON.stringify({
    title,
    type,
    abc,
    key,
    composer,
    note,
  });
  try {
    const url = `${config.apiUrl}/tunes`;
    const method = 'POST';
    const response = await fetch(url, {
      method,
      body,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log('POST TUNE RESPONSE', parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
}
