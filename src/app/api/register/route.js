import { NextResponse } from 'next/server';
import { userRepository } from '../../helpers/userRepository';

export const POST = async (request) => {
  const body = await request.json();
  try {
    await userRepository.create(body);
    return new NextResponse('Server: User is created', { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
