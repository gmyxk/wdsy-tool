import { InData } from '@/hook/useTemplates';

export interface SendThingCommonProps<T = object> {
  /**
   * 接口请求
   * @param data
   * @returns
   */
  mutationFn: (data: { records: T[] }) => Promise<API.ResponsTpl>;
  /**
   * 发送成功回调
   * @returns
   */
  onSendSuccess?: () => void;
}

export type SendCustomCommonProps<T = object> = SendThingCommonProps<T> & {
  /**
   * 模板保存
   * @param data
   * @returns
   */
  onSaveTemplate?: (data: InData<T>) => void;
};

export type SendTemplateActionRef<T = object> = {
  saveToHistory: (data: InData<T>) => void;
};

export type SendTemplateCommonProps<T = object> = SendThingCommonProps<T> & {
  actionRef?: React.MutableRefObject<SendTemplateActionRef<T> | undefined>;
};
