import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "./store";

const PublicRoute: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn());

  if (isLoggedIn) {
    return <Navigate to={"/conversations"} />;
  }

  return children;
};

export default PublicRoute;
