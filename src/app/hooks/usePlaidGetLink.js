import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../helpers/constants';

export function usePlaidGetLink(userId) {
  const [linkToken, setLinkToken] = useState('');

  useEffect(() => {
    axios
      .post(endpoints.plaidGetLinkUrl, { user_id: userId })
      .then((response) => {
        setLinkToken(response.data);
      });
  }, [userId]);

  return linkToken;
}
