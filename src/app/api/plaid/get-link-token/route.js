import { NextResponse } from 'next/server';
import plaidClient from '../../../../lib/plaid';

export async function POST(req) {
  const body = await req.json();
  const { user_id } = body;
  const userId = user_id;

  try {
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: 'Bitcoin Wallet',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    const link_token = tokenResponse.data.link_token;
    return NextResponse.json(link_token);
  } catch (error) {
    return NextResponse.json({ message: JSON.stringify(error) });
  }
}
