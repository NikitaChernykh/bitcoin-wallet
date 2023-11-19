import React from 'react';

const PasswordInput = ({ labelText, id, ...inputProps }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-300'
      >
        {labelText}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 
          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
