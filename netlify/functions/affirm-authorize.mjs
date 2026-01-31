export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // TODO: implement authorize flow once keys are provided
  return {
    statusCode: 501,
    body: JSON.stringify({ ok: false, error: "Not implemented yet (waiting for keys/config)" })
  };
};
