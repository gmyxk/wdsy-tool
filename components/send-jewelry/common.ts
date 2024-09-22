import { SendJewelryItem } from '@/scheme';

export interface SendJewelryCommonProps {
  mutationFn: (data: {
    jewelrys: SendJewelryItem[];
  }) => Promise<API.ResponsTpl>;
  onSendSuccess?: () => void;
}
