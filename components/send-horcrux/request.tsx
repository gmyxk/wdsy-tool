import { axiosPost } from '@/lib/axios';
import { SendHorcruxApiReq } from '@/scheme';

export const requestSendHorcruxApi = (data: SendHorcruxApiReq) => {
  SendHorcruxApiReq.parse(data);
  return axiosPost('/api/horcrux', data);
};
