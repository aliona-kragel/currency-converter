import axios from 'axios';

const apiURL = 'http://localhost:3001';
const currencyService = {
  async getCurrencies() {
    const { data } = await axios.get(`${apiURL}/Currencies`);
    return data
  },
  async getShortedCurrencies() {
    const { data } = await axios.get(`${apiURL}/ShortedCurrencies`);
    return data
  },
}

export default currencyService;