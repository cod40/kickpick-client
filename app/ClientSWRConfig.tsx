"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";
import ky from "ky";
import { useAuthStore } from "./store/auth";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export class ApiError {
  status: number;
  message: string;

  constructor({ status, message }: { status: number; message: string }) {
    this.status = status;
    this.message = message || "An unexpected error occurred";
  }
}

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL + "/",
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Content-Type", "application/json");
        const token = useAuthStore.getState().token;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
          console.log("token", token);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const data = (await response.json()) as { message?: string };
          const { message = "An error occurred while fetching the data." } =
            data;
          throw new ApiError({ status: response.status, message });
        }
        return response;
      },
    ],
  },
});

export const swrFetcher = async <T = unknown,>(url: string): Promise<T> => {
  return api(url).json<T>();
};

export default function ClientSWRConfig({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnMount: true,
        fetcher: swrFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
