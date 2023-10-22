import { Dispatch, MouseEventHandler, SetStateAction } from "react"

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
  isDefault: boolean
}

export interface ICurrencyInputProps {
  name: string,
  label: string,
  amount: number
}

export interface IDialogWrapperProps {
  open: boolean,
  onClose: () => void,
}

export interface ICurrencySelectorProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

export interface IPopupButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>,
}

export interface ISelectItemProps {
  onClick: MouseEventHandler<HTMLButtonElement>,
  disabled: boolean
}