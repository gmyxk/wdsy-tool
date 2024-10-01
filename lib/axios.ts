import { useGloblaConfigStore } from '@/store';
import axios, { type AxiosRequestConfig } from 'axios';
import { Encrypt } from './crypto';

const axiosIns = axios.create();

axiosIns.interceptors.request.use(
  (config) => {
    const headers = config.headers || {};

    if (config.url?.includes('/wd/') && !headers['Avid']) {
      const state = useGloblaConfigStore.getState();

      const { effectiveZone, databases, connect } = state.dbConfig;

      const tar = databases.find((i) => i.name === effectiveZone);

      if (!tar) {
        throw new Error('无效的区组');
      }

      headers['Avid'] = Encrypt(
        JSON.stringify({
          connect,
          database: tar,
          // 生成随机的六位小数
          rdm: Math.random().toFixed(6).toString(),
        })
      );
    }

    return config;
  },
  (error) => {
    return error;
  }
);

axiosIns.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status !== 200) {
      throw new Error('API error: ' + response.data.errorMessage);
    }

    if (response.status === 200 && response.data?.success === false) {
      throw new Error(response.data?.message || '请求出错了');
    }
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const axiosGet = async <Res = object, Req = object>(
  url: string,
  params?: Req,
  config?: AxiosRequestConfig
) => {
  const response = await axiosIns.get<API.ResponsTpl<Res>>(url, {
    params,
    ...config,
  });

  return response.data;
};

export const axiosPost = async <Res = object, Req = object>(
  url: string,
  params?: Req,
  config?: AxiosRequestConfig
) => {
  const response = await axiosIns.post<API.ResponsTpl<Res>>(
    url,
    params,
    config
  );

  return response.data;
};

export const axiosDelete = async <Res = object, Req = object>(
  url: string,
  data?: Req,
  config?: AxiosRequestConfig
) => {
  const response = await axiosIns.delete<API.ResponsTpl<Res>>(url, {
    data,
    ...config,
  });

  return response.data;
};

export const axiosPut = async <Res = object, Req = object>(
  url: string,
  data?: Req,
  config?: AxiosRequestConfig
) => {
  const response = await axiosIns.put<API.ResponsTpl<Res>>(url, data, config);

  return response.data;
};
