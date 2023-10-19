import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";

const MainLayout = () => {
  return (
    <section>
      <NavMenu />
      <Outlet />
    </section>
  )
}

export default MainLayout;