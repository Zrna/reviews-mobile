import axios, { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

export const ACCESS_TOKEN = "accessToken";

type AxiosFunction = <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
type AxiosDataFunction = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

// Callback for when token is refreshed (will be set by AuthContext)
let onTokenRefreshed: ((newToken: string | null) => void) | null = null;

export const setTokenRefreshCallback = (callback: (newToken: string | null) => void) => {
  onTokenRefreshed = callback;
};

function backendService() {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
  });

  instance.interceptors.response.use(
    async (response) => {
      // Check if backend sent a new token (sliding session)
      const newToken = response.headers["x-new-token"];

      if (newToken) {
        // Update stored token in SecureStore
        console.log("🔄 Token refreshed! New token received");
        await SecureStore.setItemAsync(ACCESS_TOKEN, newToken);

        // Update axios default header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // Notify AuthContext to update state
        if (onTokenRefreshed) {
          onTokenRefreshed(newToken);
        }
      }

      return response.data;
    },
    async (error) => {
      if (error?.response?.status === 401) {
        // Notify AuthContext to logout user (it will handle clearing storage)
        if (onTokenRefreshed) {
          onTokenRefreshed(null);
        }
      }

      return Promise.reject(error);
    },
  );

  return {
    get: instance.get as AxiosFunction,
    post: instance.post as AxiosDataFunction,
    delete: instance.delete as AxiosFunction,
    put: instance.put as AxiosDataFunction,
    patch: instance.patch as AxiosDataFunction,
  };
}

export const backend = backendService();
