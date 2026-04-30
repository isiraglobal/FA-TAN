export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // The Notion API integration expects a NOTION_API_KEY and a NOTION_DATABASE_ID
  // These should be set in Vercel Environment Variables.
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.warn("Notion API keys missing. This is a mock success for development.");
    return res.status(200).json({ success: true, mock: true });
  }

  try {
    const data = req.body;
    
    // Convert generic form data into Notion properties format
    const properties = {};
    
    if (data.name) properties.Name = { title: [{ text: { content: data.name } }] };
    if (data.email) properties.Email = { email: data.email };
    if (data.businessName) properties.BusinessName = { rich_text: [{ text: { content: data.businessName } }] };
    if (data.instagram) properties.Instagram = { rich_text: [{ text: { content: data.instagram } }] };
    if (data.paymentMethod) properties.PaymentMethod = { select: { name: data.paymentMethod } };
    if (data.type) properties.Type = { select: { name: data.type } }; // E.g. Vendor, Promoter

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: properties
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error submitting to Notion');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Notion API Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
