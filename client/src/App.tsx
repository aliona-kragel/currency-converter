import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import styles from './styles/styles.module.scss';
import store from "./store";

function App() {
  return (
    <div className={styles}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
