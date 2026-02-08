import { Outlet } from "react-router";

import { useTheme } from "../../utils/hooks/useTheme";
import Menu from "../menu";

export const Component = () => {
  useTheme("structures");
  return (
    <>
      <Menu />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
