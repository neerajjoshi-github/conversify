"use client";
import { store } from "@/lib/reduxStore/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function StateProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
