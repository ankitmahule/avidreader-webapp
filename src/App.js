import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(store);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header></Header>
        <Outlet></Outlet>
        {/* <Footer></Footer> */}
      </PersistGate>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default appRouter;
