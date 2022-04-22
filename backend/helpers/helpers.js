const parseJsonSafe = (json) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('Something went wrong', e.message)
  }
}

const json = (body = {}, statusCode = 200, contentType = 'application/json') => ({
  statusCode,
  headers: {
    'content-type': contentType,
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});

module.exports = {parseJsonSafe, json}
