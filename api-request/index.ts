import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/lib/axios';
import { Encrypt } from '@/lib/crypto';
import {
  EditRoleInfoApiReq,
  EditRoleInfoPayload,
  SendEquipmentApiReq,
  SendHorcruxApiReq,
  SendJewelryApiReq,
  SendMailApiReq,
  WdCommonApiReq,
} from '@/scheme';

/**
 * 测试连通性
 */
export const testConnectRequest = (params: WdCommonApiReq) => {
  WdCommonApiReq.parse(params);

  return axiosGet<API.ZoneInfo[]>('/api/wd/connect-test', undefined, {
    headers: {
      Avid: Encrypt(JSON.stringify(params)),
    },
  });
};

/**
 * 获取角色列表
 */
export const getRolesRequest = () => {
  return axiosGet<API.RoleListItem[]>('/api/wd/roles');
};

/**
 * 获取角色信息
 * @param gid
 * @returns
 */
export const getRoleInfoRequest = (gid: string) => {
  return axiosGet<API.RoleInfo>(`/api/wd/role`, { gid });
};

/**
 * 获取角色包裹
 * @param gid
 * @returns
 */
export const getRoleBaggageRequest = (gid: string) =>
  axiosGet<API.CarryItem[]>('/api/wd/baggage', {
    gid,
  });

/**
 * 发送首饰
 * @param data
 * @returns
 */
export const sendJewelryRequest = (data: SendJewelryApiReq) => {
  SendJewelryApiReq.parse(data);
  return axiosPost('/api/wd/jewelry', data);
};

/**
 * 发送装备
 * @param data
 * @returns
 */
export const sendEquipmentRequest = (data: SendEquipmentApiReq) => {
  SendEquipmentApiReq.parse(data);
  return axiosPost('/api/wd/equipment', data);
};

/**
 * 发送魂器
 * @param data
 * @returns
 */
export const sendHorcruxRequest = (data: SendHorcruxApiReq) => {
  SendHorcruxApiReq.parse(data);
  return axiosPost('/api/wd/horcrux', data);
};

/**
 * 发送邮件
 * @param data
 * @returns
 */
export const sendMailRequest = (data: SendMailApiReq) => {
  SendMailApiReq.parse(data);
  return axiosPost('/api/wd/mail', data);
};

/**
 * 清理包裹
 * @param params
 * @returns
 */
export const clearBaggageRequest = (params: {
  gid: string;
  target: string[];
}) => axiosDelete('/api/wd/baggage', params);

/**
 * 编辑角色信息
 * @param data
 * @returns
 */
export const editRoleInfoRequest = (data: EditRoleInfoApiReq) => {
  EditRoleInfoPayload.parse(data);
  return axiosPut('/api/wd/role', data);
};

/**
 * 覆盖角色信息
 * @param data
 * @returns
 */
export const coverRoleInfoRequest = (data: {
  gid: string;
  content: string;
}) => {
  return axiosPost('/api/wd/role', data);
};
