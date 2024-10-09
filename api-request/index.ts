import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/lib/axios';
import { Encrypt } from '@/lib/crypto';
import {
  EditPetInfoApiReq,
  EditRoleInfoApiReq,
  EditRoleInfoPayload,
  SendEquipmentApiReq,
  SendHorcruxApiReq,
  SendJewelryApiReq,
  SendMailApiReq,
  SendWuhunReq,
  UnifiedModifyDaoInfoApiReq,
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
  axiosGet<API.GetUserCarryDataRes>('/api/wd/baggage', {
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
 * 覆盖角色物品信息
 * @param data
 * @returns
 */
export const coverUserCarryRequest = (data: {
  gid: string;
  content: string;
}) => {
  return axiosPost('/api/wd/baggage', data);
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
 * 编辑角色信息
 * @param data
 * @returns
 */
export const editRoleDaoInfoRequest = (data: UnifiedModifyDaoInfoApiReq) => {
  UnifiedModifyDaoInfoApiReq.parse(data);
  return axiosPut(`/api/wd/role/${data.gid}/dao`, data);
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

/**
 * 获取全部 Gid
 * @param data
 * @returns
 */
export const queryGidsRequest = () => {
  return axiosGet<API.GidItem[]>('/api/wd/gids');
};

/**
 * 获取武魂信息
 * @param data 
 * @returns 
 */
export const queryWuhunStoreInfoRequest = (gid: string) => {
  return axiosGet<API.QueryWuhunStoreInfoRes>(`/api/wd/role/${gid}/wuhun`);
};

/**
 * 发送武魂
 * @param data 
 * @returns 
 */
export const sendWuhunRequest = (data: SendWuhunReq) => {
  SendWuhunReq.parse(data);

  return axiosPut(`/api/wd/role/${data.gid}/wuhun`, data);
};

/**
 * 覆盖武魂信息
 * @param data 
 * @returns 
 */
export const coverStoreDataContentWhjpRequest = (data: {
  gid: string;
  content: string;
}) => {
  return axiosPost(`/api/wd/role/${data.gid}/wuhun`, data);
};

/**
 * 获取宠物信息
 * @param gid
 * @returns
 */
export const getContainerPetsRequest = (gid: string) => {
  return axiosGet<API.GetPetListApiRes>(`/api/wd/role/${gid}/container-pet`);
};

/**
 * 校验是否有角色在线
 * @returns 
 */
export const verifyNolineRequest = () => {
  return axiosGet(`/api/wd/online`);
}

/**
 * 覆盖
 * @param data 
 * @returns 
 */
export const coverUserContainerRequest = (data: {
  gid: string;
  content: string;
}) => {
  return axiosPost(`/api/wd/role/${data.gid}/container-data`, data);
}

export const putContainerPetInfoRequest = (data: EditPetInfoApiReq) => {
  return axiosPut(`/api/wd/role/${data.gid}/container-pet`, data);
}

export const deleteContainerPetInfoRequest = (data: {
  gid: string;
  positionId: number;
}) => {
  return axiosDelete(`/api/wd/role/${data.gid}/container-pet`, data);
}