import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BottomNavBar } from "./bottom-nav-bar";
import { useStore } from "@/store";

export const Layout: FC = () => {
  const setNavigate = useStore((state) => state.setNavigate);
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate, setNavigate]);

  return (
    <div>
      <Outlet />
      <BottomNavBar />
    </div>
  );
};
