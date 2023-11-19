import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { sessionStatus } from '../helpers/constants';

export function useSessionAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === sessionStatus.loading) return;
    if (!session) router.replace('/login');
  }, [session, status, router]);

  return { session, status };
}
