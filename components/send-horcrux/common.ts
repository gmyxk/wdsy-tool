import { SendHorcruxItem } from '@/scheme';

export interface SendHorcruxCommonProps {
  mutationFn: (data: {
    horcruxs: SendHorcruxItem[];
  }) => Promise<API.ResponsTpl>;
  onSendSuccess?: () => void;
}
