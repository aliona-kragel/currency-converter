import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Converter from "../pages/Converter";
import Currencies from "../pages/Currencies";

export const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Converter />} />
      <Route path="currencies" element={<Currencies />} />
    </Route>
  </>
))