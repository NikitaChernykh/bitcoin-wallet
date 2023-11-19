'use client';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PrimaryButton from '../../components/buttons/primary';
import FormError from '../../components/errors/form-error';
import PasswordInput from '../../components/inputs/password';
import TextInput from '../../components/inputs/text';
import { isInvalidEmail, isInvalidPassword } from '../helpers/error-validation';

const Register = () => {
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const registrationApiUrl = `/api/register`;
    e.preventDefault();

    if (isInvalidEmail(formData.email)) {
      setFormError('Invalid email format');
      return;
    }

    if (isInvalidPassword(formData.password)) {
      setFormError('Password is too short');
      return;
    }

    setIsLoading(true);
    axios
      .post(registrationApiUrl, formData)
      .then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          setFormError('');
          // Performing a sign in
          signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
          }).then((res) => {
            if (res?.status == 200) {
              router.replace('/dashboard');
            }
            if (res?.error) {
              setFormError(`Error: ${res?.error}`);
            }
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setFormError('Server error');
        console.error(`Error creating user: ${error}`);
      });
  };

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <div className='bg-[#212121] p-8 rounded-lg'>
        <h1 className='text-left font-semibold mb-8 text-gray-300'>Register</h1>
        <form
          className='space-y-4'
          onSubmit={handleSubmit}
          noValidate='novalidate'
        >
          <TextInput
            labelText='Name'
            type='text'
            name='name'
            id='name'
            onChange={handleChange}
            required
          />
          <TextInput
            labelText='Email Address'
            type='email'
            name='email'
            id='email'
            onChange={handleChange}
            required
          />
          <PasswordInput
            labelText='Password'
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
            required
          />
          <PrimaryButton
            buttonText='Sign Up'
            type='submit'
            isLoading={isLoading}
          />
          <FormError errorText={formError} />
        </form>
        <div className='grid gap-2'>
          <Link className='text-sm mt-3 text-right text-gray-300' href='/login'>
            Already have an account? <span className='underline'>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
