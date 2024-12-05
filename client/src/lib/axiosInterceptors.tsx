import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { DEFAULT_TIMEOUT_AXIOS_INTERCEPTOR } from "../constants/defaultValues";

const requestHandler: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: DEFAULT_TIMEOUT_AXIOS_INTERCEPTOR,
  responseType: "json",
});

requestHandler.interceptors.request.use(
  async function (config: any) {
    const multipartFormData = config.headers.multipartFormData;

    config.headers["Content-Type"] = `${
      multipartFormData || "application/json"
    }`;

    return config;
  },

  async function (error: string) {
    return await Promise.reject(error);
  }
);

export const appendArgsToUrl = (url: string, queryParams: any) => {
  const queryString: any = [];
  Object.keys(queryParams).forEach(function (key) {
    if (queryParams[key] !== null) {
      queryString.push(`${key}=${encodeURIComponent(queryParams[key])}`);
    }
  });
  if (!queryString.length) {
    return url;
  }
  return `${url}?${queryString.join("&")}`;
};

export function post(
  url: string,
  data: {},
  config?: AxiosRequestConfig<{}> | undefined
) {
  return requestHandler.post(url, data, config);
}
export function get(
  url: string,
  parameter: {},
  config?: AxiosRequestConfig<{}> | undefined
) {
  const finalUrl = appendArgsToUrl(url, parameter);
  return requestHandler.get(finalUrl, config);
}

export function put(
  url: string,
  data: {},
  config?: AxiosRequestConfig<{}> | undefined
) {
  return requestHandler.put(url, data, config);
}

export function remove(url: string, config?: AxiosRequestConfig<{}> | any) {
  return requestHandler.delete(url, config);
}

export function patch(
  url: string,
  data: {},
  config?: AxiosRequestConfig<{}> | undefined
) {
  return requestHandler.patch(url, data, config);
}
