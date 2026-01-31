export const handler = async () => {
  try {
    const base = String(process.env.AFFIRM_BASE_URL || "https://api.affirm.com/api/v2")
      .trim()
      .replace(/\/+$/, "");

    const pub = process.env.AFFIRM_PUBLIC_KEY || process.env.AFFIRM_PUBLIC_API_KEY;
    const priv = process.env.AFFIRM_PRIVATE_KEY || process.env.AFFIRM_PRIVATE_API_KEY;

    if (!pub || !priv) {
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, error: "Missing AFFIRM keys env vars" })
      };
    }

    const auth = Buffer.from(`${pub}:${priv}`).toString("base64");

    const r = await fetch(`${base}/transactions`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      }
    });

    const text = await r.text();
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: r.ok,
        status: r.status,
        resp: text.slice(0, 800)
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(e?.message || e) })
    };
  }
};
