"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";



const TanStackProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const queryClient = useMemo(() => new QueryClient(),[]);
    

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanStackProvider;
