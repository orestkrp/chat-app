import { FC, PropsWithChildren } from "react";
import { useStore } from "./store";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
