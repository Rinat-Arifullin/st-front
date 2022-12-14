/* eslint-disable no-throw-literal */

import Axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

const instance = Axios.create({
  baseURL: 'https://hackathon.lsp.team/hk',
});

export const makeRequest = ({
  url,
  method,
  headers,
  params,
  responseType,
  data,
}: AxiosRequestConfig): AxiosPromise<any> => {
  return instance
    .request({ url, method, headers, params, responseType, data })
    .then((response) => ({
      ...response,
    }))
    .catch(async ({ response }: AxiosError) => {
      if (response) {
        const { message, status } = JSON.parse(
          await (response.data as any).text(),
        );
        throw { message, status, data };
      }
      throw {
        message: 'Соединение с сервером отсутствует',
        status: 502,
      };
    });
};

export default instance;
