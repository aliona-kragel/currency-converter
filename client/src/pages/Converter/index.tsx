import { useEffect } from "react";
import useConverterActions from "../../hooks/useConverterActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios from "axios";
import currencyService from "../../services";

const Converter = () => {
  const { setShortedCurrenсies } = useConverterActions();
  const { shortedCurrencies } = useTypedSelector(state => state.converter);

  useEffect(() => {
    currencyService.getShortedCurrencies()
      .then((data) => {
        console.log(data);
        setShortedCurrenсies(data)
      })
      .catch((error) => {
        console.error("Произошла ошибка при выполнении запроса:", error);
      });
  }, [])

  return (
    <>
      {shortedCurrencies?.length && shortedCurrencies.map((curr) => <p key={curr.id}>{`${curr.name} `}</p>)}
    </>
  )
}

export default Converter;