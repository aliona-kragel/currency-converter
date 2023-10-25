export const DEFAULT_CURRENCIES = ['USD', 'EUR', 'RUB', 'PLN'];
export const DEFAULT_AMOUNT = 1;
export const DEFAULT_ABBR = 'USD';

export const getApiUrl = () => {
  return process.env.REACT_APP_API_URL || 'https://localhost:3001'
}

export const getClientDomain = () => {
  return process.env.REACT_APP_CLIENT_DOMAIN || "https://localhost:3000/"
}