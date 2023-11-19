export const sessionStatus = {
  unauthenticated: 'unauthenticated',
  authenticated: 'authenticated',
  loading: 'loading',
};

export const endpoints = {
  plaidGetLinkUrl: '/api/plaid/get-link-token',
  plaidExchangePublicToken: '/api/plaid/exchange-public-token',
  plaidGetAccessTokenUrl: '/api/users/get-plaid-token',
  plaidGetAccountsUrl: '/api/plaid/accounts',
};
