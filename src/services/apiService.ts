import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Ensure consistent base URL targeting the proxy setup or direct backend
const BASE_URL = '/api';

const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: add token and default query parameters (like lang)
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang') || 'en';

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.params = {
      ...config.params,
      lang,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: handle 401s globally
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login on unauthorized
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface BaseApiResponse<T = any> {
  success: boolean;
  statusCode?: number;
  data: T;
  message?: string;
  account_type?: string;
  token?: {
    access_token: string;
  };
}

const ApiService = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseApiResponse<T>> => {
    const response = await apiInstance.get<BaseApiResponse<T>>(url, config);
    return response.data;
  },

  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseApiResponse<T>> => {
    const response = await apiInstance.post<BaseApiResponse<T>>(url, data, config);
    return response.data;
  },

  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseApiResponse<T>> => {
    const response = await apiInstance.put<BaseApiResponse<T>>(url, data, config);
    return response.data;
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseApiResponse<T>> => {
    const response = await apiInstance.delete<BaseApiResponse<T>>(url, config);
    return response.data;
  },
};

export default ApiService;
