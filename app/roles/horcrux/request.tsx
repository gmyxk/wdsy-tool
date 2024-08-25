import { axiosPost } from '@/lib/axios';
import { SendHorcruxApiReq } from '@/verification';

export const requestSendHorcruxApi = (data: SendHorcruxApiReq) => {
  SendHorcruxApiReq.parse(data);
  return axiosPost('/api/horcrux', data);
};
