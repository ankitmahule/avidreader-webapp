import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./utils/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Explore from "./components/Explore";
import Bookmark from "./components/Bookmark";
import Setting from "./components/Setting";
import Profile from "./components/Profile";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import RightSidebar from "./components/Right-Sidebar";

const persistor = persistStore(store);

function App() {
  const location = useLocation();
  const isLocationHome = location.pathname === "/";
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <section className={!isLocationHome ? "flex" : ""}>
          <Header />
          <Outlet />
          {!isLocationHome && <RightSidebar />}
        </section>
      </PersistGate>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/bookmarks",
            element: <Bookmark />,
          },
          {
            path: "/settings",
            element: <Setting />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default appRouter;
