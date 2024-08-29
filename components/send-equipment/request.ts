import { axiosPost } from '@/lib/axios';
import { SendEquipmentApiReq } from '@/scheme';

/**
 * 发送装备
 * @param data
 * @returns
 */
export const sendEquipRequest = (data: SendEquipmentApiReq) => {
  SendEquipmentApiReq.parse(data);

  return axiosPost('/api/equip', data);
};

export const ANIS = {
  1: '金',
  2: '木',
  3: '水',
  4: '火',
  5: '土',
};
