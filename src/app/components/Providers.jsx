"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import CustomSkeletonTheme from "./CustomSkeletonTheme";
export function Providers({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <CustomSkeletonTheme>{children}</CustomSkeletonTheme>
    </NextThemesProvider>
  );
}
