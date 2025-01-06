import { Outlet, createBrowserRouter } from "react-router-dom";
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
          // <ProtectedRoute>
          <Dashboard />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/explore",
        element: (
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookmarks",
        element: (
          <ProtectedRoute>
            <Bookmark />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          //<ProtectedRoute>
          <Profile />
          // </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default appRouter;
