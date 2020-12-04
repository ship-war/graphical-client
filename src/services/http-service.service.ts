import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { APIError } from '../models';
import { join } from 'path';

const BASE_URL: string = 'http://localhost:3002/';

class HttpService {
  private readonly config: AxiosRequestConfig = {
    timeout: 1000,
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  public async get<T>(path: string): Promise<T> {
    return Axios.get(path, this.config).then(
      (response: AxiosResponse<T>) => response.data,
      (error: AxiosError<APIError>) => {
        throw this.buildAxiosError(error);
      }
    );
  }

  public async post<T, U>(
    path: string,
    data?: U
  ): Promise<T> {
    return Axios.post(path, data, this.config).then(
      (response: AxiosResponse<T>) => response.data,
      (error: AxiosError<APIError>) => {
        throw this.buildAxiosError(error);
      }
    );
  }

  public async put<T, U>(
    path: string,
    data?: U
  ): Promise<T> {
    return Axios.put(path, data, this.config).then(
      (response: AxiosResponse<T>) => response.data,
      (error: AxiosError<APIError>) => {
        throw this.buildAxiosError(error);
      }
    );
  }

  public async delete(
    path: string,
    id: string
  ): Promise<boolean> {
    return Axios.delete(join(path, id), this.config).then(
      (response: AxiosResponse<{ affected: number }>) =>
        response.data.affected > 0,
      (error: AxiosError<APIError>) => {
        throw this.buildAxiosError(error);
      }
    );
  }

  private buildAxiosError(error: AxiosError<APIError>): APIError {
    if (error.response) {
      return {
        ...error.response.data,
        name: error.response.data.code,
      };
    }

    if (error.request) {
      return {
        statusCode: 0,
        path: error.request ? error.request.path : undefined,
        message: '',
        code: 'can_not_connect',
        name: 'can_not_connect',
      };
    }

    return {
      statusCode: 0,
      path: undefined,
      message: error.message,
      code: 'unknown',
      name: 'unknown',
    };
  }
}

export default new HttpService();
