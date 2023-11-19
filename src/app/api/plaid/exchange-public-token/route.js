import { NextResponse } from 'next/server';
import plaidClient from '../../../../lib/plaid';
import { userRepository } from '../../../helpers/userRepository';

export async function POST(req) {
  const body = await req.json();
  const { public_token, user_id } = body;
  const publicToken = public_token;
  const userId = user_id;

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const plaidAccessToken = response.data.access_token;
    const plaidItemId = response.data.item_id;
    console.log(plaidAccessToken);
    console.log(plaidItemId);

    try {
      userRepository.update(userId, { plaidAccessToken, plaidItemId });

      return NextResponse.json({ plaidAccessToken, plaidItemId });
    } catch (error) {
      return NextResponse.json({ message: JSON.stringify(error) });
    }
  } catch (error) {
    return NextResponse.json({ message: JSON.stringify(error) });
  }
}
