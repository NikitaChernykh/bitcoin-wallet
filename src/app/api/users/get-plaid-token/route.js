import { NextResponse } from 'next/server';
import { userRepository } from '../../../helpers/userRepository';

export const POST = async (req) => {
  const body = await req.json();
  const { user_id } = body;
  const userId = user_id;

  try {
    const token = await userRepository.getPlaidAccessTokenById(userId);
    return new NextResponse(token);
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
