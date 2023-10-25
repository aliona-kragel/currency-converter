import axios from 'axios';
import { getApiUrl } from 'helpers/constants';


const currencyService = {
  async getCurrencies() {
    const { data } = await axios.get(`${getApiUrl()}/Currencies`);
    return data
  },
  async getShortedCurrencies() {
    const { data } = await axios.get(`${getApiUrl()}/ShortedCurrencies`);
    return data
  },
  async updateCurrencies(currData: { abbr: string, amount: number }) {
    const { data } = await axios.post(`${getApiUrl()}/UpdateCurrencies`, currData);
    return data;
  }
}

export default currencyService;