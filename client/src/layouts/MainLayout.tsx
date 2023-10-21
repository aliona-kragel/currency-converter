import NavMenu from "components/NavMenu";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section>
      <NavMenu />
      <Outlet />
    </section>
  )
}

export default MainLayout;