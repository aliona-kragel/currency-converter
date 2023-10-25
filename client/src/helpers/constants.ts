export const DEFAULT_CURRENCIES = ['USD', 'EUR', 'RUB', 'PLN'];
export const DEFAULT_AMOUNT = 1;
export const DEFAULT_ABBR = 'USD';

export const getApiUrl = () => {
  return process.env.API_URL || 'http://localhost:3001'
}

export const getClientDomain = () => {
  return process.env.CLIENT_DOMAIN || "http://localhost:3000/"
}