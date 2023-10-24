import axios from 'axios';
import { API_URL } from 'helpers/constants';

const currencyService = {
  async getCurrencies() {
    const { data } = await axios.get(`${API_URL}/Currencies`);
    return data
  },
  async getShortedCurrencies() {
    const { data } = await axios.get(`${API_URL}/ShortedCurrencies`);
    return data
  },
  async updateCurrencies(currData: { abbr: string, amount: number }) {
    const { data } = await axios.post(`${API_URL}/UpdateCurrencies`, currData);
    return data;
  }
}

export default currencyService;