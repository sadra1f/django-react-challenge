import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import type { ReactNode } from "react";

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Navbar />

      <main>{children ?? <Outlet />}</main>
    </>
  );
}
