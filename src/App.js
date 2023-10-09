import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./utils/store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <Outlet></Outlet>
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
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default appRouter;
