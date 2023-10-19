
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import styles from './styles/styles.module.scss';

function App() {
  return (
    <div className={styles}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
