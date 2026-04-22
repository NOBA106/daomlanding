export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://api.daom88.com/api/v1/webhook/landing-page/615e4b58-0368-4113-b84a-8214e0dbceca',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Webhook proxy failed' });
  }
}
