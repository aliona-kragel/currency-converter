import axios from 'axios';

export const currencyApi = {
  async getCurrenciesList() {
    const apiUrl = 'https://api.nbrb.by/exrates/rates?periodicity=0';
    const { data } = await axios.get(apiUrl);
    return data
  }
}