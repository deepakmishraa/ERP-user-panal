import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Order } from "./pages/order";
import { Product } from "./pages/product";
import { Category } from "./pages/category";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import {
  MShop,
  MProcurement,
  MAllocation,
  MPurchase,
} from "./components/RouteValidate";
import { BuyOrder } from "./pages/buyOrder";
const Dashbord = lazy(() => import("./pages/dashboard"));

const Path = () => {
  return (
    <Suspense fallback={<CircularProgress disableShrink />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          {/* ------------- Common Route ----------------- */}
          <Route
            path="/"
            element={
              <Suspense fallback={<CircularProgress disableShrink />}>
                <Dashbord />
              </Suspense>
            }
          ></Route>
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
              path="/place-order"
              element={
                <Suspense fallback={<CircularProgress disableShrink />}>
                  <PlaceOrder />
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
