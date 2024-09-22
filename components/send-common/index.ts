import { InData } from '@/hook/useTemplates';

export interface SendThingCommonProps<T = any> {
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

export type SendCustomCommonProps<T = any> = SendThingCommonProps<T> & {
  /**
   * 模板保存
   * @param data
   * @returns
   */
  onSaveTemplate?: (data: InData<T>) => void;
};

export type SendTemplateActionRef<T = any> = {
  saveToHistory: (data: InData<T>) => void;
};

export type SendTemplateCommonProps<T = any> = SendThingCommonProps<T> & {
  actionRef?: React.MutableRefObject<SendTemplateActionRef<T> | undefined>;
};
