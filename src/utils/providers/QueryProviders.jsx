"use client"
import { useState, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

/**
 * 
 * @param { ReactNode } param0 
 * @return
 */
export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}