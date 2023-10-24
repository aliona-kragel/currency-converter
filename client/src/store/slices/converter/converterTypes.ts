import { IRecalculatedCurrencies, IShortedCurrencies } from "types/types";

export interface IConverter {
  isLoading: boolean,
  error: any,
  recalculatedCurrancies: IRecalculatedCurrencies[] | [],
  formState: IRecalculatedCurrencies[] | [],
  shortedCurrencies: IShortedCurrencies[] | null,
  displayed: string[]
}

