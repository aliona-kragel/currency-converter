import { ICurrencies, IRecalculatedCurrencies, IShortedCurrencies } from "types/types";

export interface IConverter {
  isLoading: boolean,
  error: any,
  recalculatedCurrancies: IRecalculatedCurrencies[] | [],
  formState: IRecalculatedCurrencies[] | [],
  currenciesList: ICurrencies[] | null,
  shortedCurrencies: IShortedCurrencies[] | null,
  displayed: string[]
}

