"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";

export default function AppProvider({ children }: any) {
  const { systemTheme } = useTheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme={"light"}>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
