import axios, { AxiosRequestConfig } from "axios";

type AxiosFunction = <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
type AxiosDataFunction = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

function backendService() {
  const baseURL = process.env.NODE_ENV === "production" ? "http://192.168.100.5:5001" : "http://192.168.100.5:5001";

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
      return response.data;
    },
    async (error) => {
      if (error?.response?.status === 401) {
        // TODO: improve this
        // window.location.href = "/login";
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
