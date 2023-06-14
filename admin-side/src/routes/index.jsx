import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Root from "./root";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import RegisterPage from "../pages/RegisterPage";
import AddPostPage from "../pages/AddPostPage";
import EditPostPage from "../pages/EditPostPage";
import AddCategoryPage from "../pages/AddCategoryPage";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    loader: async () => {
      if (localStorage.getItem('access_token')) {
        throw redirect('/');
      }
      return null
    },
  },
  {
    path: '/',
    element: <Root />,
    loader: async () => {
      if (!localStorage.getItem('access_token')) {
        throw redirect('/login');
      }
      return null
    },
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "create",
        element: <AddPostPage />
      },
      {
        path: "edit/:id",
        element: <EditPostPage />
      },
      {
        path: "categories",
        element: <CategoryPage />
      },
      {
        path: "categories/create",
        element: <AddCategoryPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      }
    ],
  }
])

export default router;
