'use client';
import { signOut, useSession } from 'next-auth/react';
import PrimaryButton from '../buttons/primary';
import NavLink from '../links/nav';

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav data-testid='navigation' className='bg-gray-800'>
      <ul className='flex m-auto max-w-5xl h-16'>
        {!session ? (
          <div className='w-full flex space-x-4'>
            <NavLink linkText='Login' href='/login' />
            <NavLink linkText='Register' href='/register' />
          </div>
        ) : (
          <div className='flex justify-between w-full '>
            <NavLink linkText='Dashboard' href='/dashboard' />
            <li className='mt-4'>
              <PrimaryButton
                buttonText='Logout'
                onClick={() => {
                  signOut();
                }}
              />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
