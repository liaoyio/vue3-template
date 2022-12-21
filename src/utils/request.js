import axios from 'axios';

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// request interceptor
service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// response interceptor
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error.message); // for debug
    return Promise.reject(error);
  }
);


/**
 * @param url { string}
 * @param params { Object }
 * @param timeout { number}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const get = (url, params = undefined, timeout = undefined) => {
  const obj = { url, method: 'GET' };
  if (timeout) {
    obj.timeout = timeout;
  }
  if (params) {
    obj.params = params;
  }
  return service(obj);
};

/**
 * @param url { string}
 * @param data { Object }
 * @param timeout { number}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const post = (url, data = undefined, timeout = undefined) => {
  const obj = { url, method: 'POST' };
  if (timeout) {
    obj.timeout = timeout;
  }
  if (data) {
    obj.data = data;
  }
  return service(obj);
};

// 导出 axios 实例
export default service;
