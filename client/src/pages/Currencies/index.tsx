import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useTypedDispatch } from "hooks/useTypedDispatch";
import { getCurrencies } from "store/slices/currencies/currenciesSlice";
import Loader from "components/Loader";

const Currencies = () => {
  const { currenciesList, isLoading } = useTypedSelector(state => state.currencies);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);


  return (
    <section className={styles.currencies}>
      <div className={styles.currencies__table} >
        {isLoading ? <Loader /> :
          <TableContainer >
            <h2 className={styles.currencies__table_title}>Курс белорусского рубля по отношению к иностранным валютам</h2>
            <Table aria-label="simple table">
              <TableHead className={styles.currencies__table_head}>
                <TableRow>
                  <TableCell>Код</TableCell>
                  <TableCell align="center">Курс</TableCell>
                  <TableCell align="center">Количество единиц</TableCell>
                  <TableCell align="right">Наименование</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!currenciesList?.length && currenciesList.map((curr) => (
                  <TableRow
                    key={curr.Cur_ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {curr.Cur_Abbreviation}
                    </TableCell>
                    <TableCell align="center">{curr.Cur_OfficialRate}</TableCell>
                    <TableCell align="center">{curr.Cur_Scale}</TableCell>
                    <TableCell align="right">{curr.Cur_Name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
    </section>
  )
}

export default Currencies;