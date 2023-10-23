import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import store from "./store";
import styles from "./styles/styles.module.scss"

function App() {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
