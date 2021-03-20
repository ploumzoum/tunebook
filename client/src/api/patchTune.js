import config from '../config';

export default async function patchTune({
  title,
  type,
  abc,
  key,
  composer,
  note,
  tuneId,
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
    const url = `${config.apiUrl}/tunes/${tuneId}`;
    const method = 'PATCH';
    const response = await fetch(url, {
      method,
      body,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log('PATCH TUNE RESPONSE', parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
}
