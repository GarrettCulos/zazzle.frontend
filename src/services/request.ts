import { Observable } from 'rxjs';
// eslint-disable-next-line no-unused-vars
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface RequestLibConfig {
  baseUrl: string;
  headers?: Headers;
}

interface AppRequest {
  path?: string;
  url?: string;
  body?: any;
  headers?: Headers;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

class RequestLib {
  private _config: RequestLibConfig;
  constructor(config: RequestLibConfig) {
    this._config = config;
  }

  private joinHeaders(headers: Headers[]): Headers {
    const h = new Headers();
    headers.forEach(header => {
      header.forEach((value: string, key: string) => {
        if (h.has(key)) {
          h.append(key, value);
        } else {
          h.set(key, value);
        }
      });
    });
    return h;
  }

  request<T>(req: AppRequest): Promise<T> {
    const url = req.url || (req.path && `${this._config.baseUrl}${req.path}`);
    const method = req.method || 'GET';
    const headers = this.joinHeaders([
      new Headers(req.headers ? req.headers : []),
      this._config.headers || new Headers(),
    ]);
    return axios.request({
      ...req,
      url,
      method,
      headers,
      withCredentials: true,
    });
  }
}

export default new RequestLib({
  baseUrl: 'https://localhost:8000',
  headers: new Headers([
    // ['Access-Control-Allow-Origin', '*'],
    ['Content-Type', 'application/json'],
  ]),
});
