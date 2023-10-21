import { ICurrencies, IShortedCurrencies } from "../../../types/types";

export interface IConverter {
  currenciesList: ICurrencies[] | null;
  shortedCurrencies: IShortedCurrencies[] | null
}

