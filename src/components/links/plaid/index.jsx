import axios from 'axios';
import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { endpoints } from '../../../app/helpers/constants';

import PrimaryButton from '../../buttons/primary';
const ThePlaidLink = ({ linkToken, userId }) => {
  const onSuccess = React.useCallback(async (publicToken) => {
    try {
      const response = await axios.post(endpoints.plaidExchangePublicToken, {
        public_token: publicToken,
        user_id: userId,
      });
      if (response.status === 400) {
        console.log('Error 400: Bad Request');
      } else if (response.status === 200) {
        // const { plaidAccessToken } = response.data;
      }
    } catch (error) {
      console.error('Error during the API call:', error.message);
    }
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <PrimaryButton
      buttonText='Link Bank account with Plaid'
      onClick={() => open()}
      disabled={!ready}
    />
  );
};

export default ThePlaidLink;
