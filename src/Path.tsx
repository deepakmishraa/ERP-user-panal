import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Order } from "./pages/order";
import { Product } from "./pages/product";
import { Category } from "./pages/category";
const Dashbord = lazy(() => import("./pages/dashboard"));

const Path = () => {
  return (
    <Suspense fallback={<CircularProgress disableShrink />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<CircularProgress disableShrink />}>
                <Dashbord />
              </Suspense>
            }
          ></Route>

          <Route
            path="/order"
            element={
              <Suspense fallback={<CircularProgress disableShrink />}>
                <Order />
              </Suspense>
            }
          />
          <Route
            path="/product"
            element={
              <Suspense fallback={<CircularProgress disableShrink />}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="/category"
            element={
              <Suspense fallback={<CircularProgress disableShrink />}>
                <Category />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default Path;
