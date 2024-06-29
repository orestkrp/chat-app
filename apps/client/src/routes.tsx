import { AuthPage } from "@/components/pages/auth-page";
import { Conversations } from "@/components/pages/conversations";
import { Layout } from "@/components/pages/layout";
import { Users } from "@/components/pages/users";
import ProtectedRoute from "@/protected-route";
import PublicRoute from "@/public-route";

export const routes = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <AuthPage type="login" />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <AuthPage type="register" />
      </PublicRoute>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/conversations",
        element: (
          <ProtectedRoute>
            <Conversations />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
