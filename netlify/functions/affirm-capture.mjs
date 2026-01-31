export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // TODO: implement capture flow once authorize is wired
  return {
    statusCode: 501,
    body: JSON.stringify({ ok: false, error: "Not implemented yet (waiting for keys/config)" })
  };
};
