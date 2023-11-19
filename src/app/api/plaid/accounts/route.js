import { NextResponse } from 'next/server';
import plaidClient from '../../../../lib/plaid';

export async function POST(req) {
  const body = await req.json();
  const { access_token } = body;
  const accessToken = access_token;

  try {
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    return NextResponse.json(accountsResponse.data);
  } catch (error) {
    return NextResponse.json({
      message: `all accounts API ${JSON.stringify(error)}`,
    });
  }
}
