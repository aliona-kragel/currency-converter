import { useEffect } from "react";
import useConverterActions from "../../hooks/useConverterActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fake } from "../../fake";
import { ICurrenciesList } from "../../types/types";

const Converter = () => {
  const { setCurrenсiesList } = useConverterActions();
  const { currenciesList } = useTypedSelector(state => state.converter);

  useEffect(() => {
    setCurrenсiesList(fake)
  }, [])

  return (
    <>
      {currenciesList?.length && currenciesList.map((curr: ICurrenciesList) => <p key={curr.id}>{curr.curr_name}</p>)}
    </>
  )
}

export default Converter;