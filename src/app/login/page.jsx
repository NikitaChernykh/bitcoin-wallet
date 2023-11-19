'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PrimaryButton from '../../components/buttons/primary';
import FormError from '../../components/errors/form-error';
import PasswordInput from '../../components/inputs/password';
import TextInput from '../../components/inputs/text';
import LoadingSpinner from '../../components/loading/spinner';
import { sessionStatus } from '../helpers/constants';
import { isInvalidEmail, isInvalidPassword } from '../helpers/error-validation';
import { useSessionAuth } from '../hooks/useSessionAuth';
const Login = () => {
  const sessionAuth = useSessionAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (isInvalidEmail(email)) {
      setFormError('Invalid email format');
      return;
    }

    if (isInvalidPassword(password)) {
      setFormError('Password is too short');
      return;
    }
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setIsLoading(false);
      setFormError('Invalid email or password');
    } else {
      if (res?.url) {
        setIsLoading(false);
        setFormError('');
        router.replace('/dashboard');
      }
    }
  };

  return sessionAuth.status === sessionStatus.loading ? (
    <div className='flex justify-center items-center h-screen'>
      <LoadingSpinner />
    </div>
  ) : (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <div className='bg-[#212121] p-8 rounded-lg'>
        <h1 className='text-left font-semibold mb-8 text-gray-300'>Login</h1>
        <form
          className='space-y-6'
          onSubmit={handleSubmit}
          noValidate='novalidate'
        >
          <TextInput
            labelText='Email Address'
            type='text'
            name='email'
            id='email'
            required
          />
          <PasswordInput
            labelText='Password'
            type='password'
            name='password'
            id='password'
            required
          />
          <PrimaryButton
            buttonText='Sing In'
            type='submit'
            isLoading={isLoading}
          />
          <FormError errorText={formError} />
        </form>
        <div className='grid gap-2'>
          <Link
            className='text-sm mt-3 text-right text-gray-300'
            href='/register'
          >
            Create new account? <span className='underline'>Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
