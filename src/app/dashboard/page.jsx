'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Card from '../../components/cards/account';
import ThePlaidLink from '../../components/links/plaid';
import LoadingSpinner from '../../components/loading/spinner';
import { endpoints, sessionStatus } from '../helpers/constants';
import { usePlaidGetLink } from '../hooks/usePlaidGetLink';
import { useSessionAuth } from '../hooks/useSessionAuth';
const Dashboard = () => {
  const sessionAuth = useSessionAuth();
  const { data: session } = useSession();
  const userId = sessionAuth.session?.user?._id;
  const linkToken = usePlaidGetLink(userId);
  const [accounts, setAccounts] = useState([]);
  const userName = sessionAuth.session?.user?.name || 'N/A';

  // move to separate file later
  useEffect(() => {
    const token = session?.user?.plaidAccessToken;
    const getAccounts = () => {
      axios
        .post(endpoints.plaidGetAccountsUrl, {
          access_token: token,
        })
        .then((response) => {
          // TODO: add error handling for code 400
          setAccounts(response.data.accounts);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    };
    if (sessionAuth.session?.user?.plaidAccessToken !== '') {
      getAccounts();
    }
  }, [session]);

  return sessionAuth.status === sessionStatus.loading ? (
    <div className='flex justify-center items-center h-screen'>
      <LoadingSpinner />
    </div>
  ) : (
    <div className='m-auto max-w-5xl bg-white-800'>
      <h1 className='pt-5 pb-3 text-4xl font-bold text-gray-300'>
        Welcome, {userName}
      </h1>
      {sessionAuth.session?.user?.plaidAccessToken === '' ? (
        <section>
          <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
            {!linkToken ? (
              <div className='flex justify-center items-center '>
                <LoadingSpinner />
              </div>
            ) : (
              <div className='flex justify-between w-full text-gray-300'>
                <ThePlaidLink linkToken={linkToken} userId={userId} />
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className='text-white'>
          <div>
            <h2 className='pt-3 pb-3 text-2xl font-bold text-gray-300'>
              Bank Accounts
            </h2>
            <ul className='flex gap-4'>
              {Array.isArray(accounts) &&
                accounts.map((account) => (
                  <li key={account.account_id} className='text-white'>
                    <Card
                      name={account.name}
                      subtype={account.subtype}
                      balance1={`Available: ${account.balances.available} ${account.balances.iso_currency_code}`}
                      balance2={`Current: ${account.balances.current} ${account.balances.iso_currency_code}`}
                    />
                    {/* Balances: Account balance available:{' '}
                    {account.balances.available}{' '}
                    {account.balances.iso_currency_code}
                    Account balance current: {account.balances.current}{' '}
                    {account.balances.iso_currency_code} */}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
