import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Order } from "./pages/order";
import { Product } from "./pages/product";
import { Category } from "./pages/category";
import View from "./pages/shopmanger/View/View";
import {
  MShop,
  MProcurement,
  MAllocation,
  MPurchase,
} from "./components/RouteValidate";
import { BuyOrder } from "./pages/buyOrder";
import { Add } from "./pages/shopmanger/Add";
const Dashbord = lazy(() => import("./pages/dashboard"));

const Path = () => {
  return (
    <Suspense fallback={<CircularProgress disableShrink />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          {/* ------------- Common Route ----------------- */}

          {/* ------------- End Comon  Route ----------------- */}

          <Route
            path="/order"
            element={
              <Suspense fallback={<CircularProgress disableShrink />}>
                <Order />
              </Suspense>
            }
          />

          <Route element={<MShop />}>
            <Route
              path="/shopmanager/view"
              element={
                <Suspense fallback={<CircularProgress disableShrink />}>
                  <View />
                </Suspense>
              }
            />
            <Route
              path="/shopmanager/add"
              element={
                <Suspense fallback={<CircularProgress disableShrink />}>
                  <Add />
                </Suspense>
              }
            />
          </Route>

          <Route element={<MPurchase />}>
            <Route
              path="/buy-order"
              element={
                <Suspense fallback={<CircularProgress disableShrink />}>
                  <BuyOrder />
                </Suspense>
              }
            />
          </Route>

          <Route element={<MProcurement />}>
            <Route
              path="/check-order"
              element={
                <Suspense fallback={<CircularProgress disableShrink />}>
                  <>Check Order</>
                </Suspense>
              }
            />
          </Route>

          <Route element={<MAllocation />}>
            <Route
              path="/confirm-order"
              element={
                <Suspense fallback={<CircularProgress disableShrink />}>
                  <>confirm Order</>
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
export default Path;
