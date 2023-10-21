export interface ICurrencies {
  Cur_ID: number,
  Date: string,
  Cur_Abbreviation: string,
  Cur_Scale: number,
  Cur_Name: string,
  Cur_OfficialRate: number
}

export interface IRecalculatedCurrencies {
  id: number,
  abbr: string,
  name: string,
  amount: number
}

export interface IShortedCurrencies {
  id: number,
  name: string,
  abbr: string,
}

export interface ICurrencyInputProps {
  name: string,
  label: string,
  amount: number
}