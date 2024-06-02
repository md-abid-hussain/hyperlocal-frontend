import { Outlet } from "react-router-dom";
import Header from "./Header";

const DashLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};


export default DashLayout;