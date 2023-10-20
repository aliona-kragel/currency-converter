import { useEffect } from "react";
import useConverterActions from "../../hooks/useConverterActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Converter = () => {
  const { setCurrenсiesList } = useConverterActions();
  const { currenciesList } = useTypedSelector(state => state.converter);

  useEffect(() => {
    fetch("http://localhost:3001/ShortedCurrenciesInfo")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrenсiesList(data)
      })
      .catch((error) => {
        console.error("Произошла ошибка при выполнении запроса:", error);
      });
  }, [])

  return (
    <>
      {currenciesList?.length && currenciesList.map((curr) => <p key={curr.id}>{`${curr.name} `}</p>)}
    </>
  )
}

export default Converter;