import axios from 'axios';

const axiosIns = axios.create();

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

export const axiosGet = async <Res = any, Req = any>(
  url: string,
  params?: Req
) => {
  const response = await axiosIns.get<API.ResponsTpl<Res>>(url, {
    params,
  });

  return response.data;
};

export const axiosPost = async <Res = any, Req = any>(
  url: string,
  params: Req
) => {
  const response = await axiosIns.post<API.ResponsTpl<Res>>(url, params);

  return response.data;
};

export const axiosDelete = async <Res = any, Req = any>(
  url: string,
  data?: Req
) => {
  const response = await axiosIns.delete<API.ResponsTpl<Res>>(url, {
    data,
  });

  return response.data;
};
