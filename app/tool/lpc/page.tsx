'use client';

import {
  CodeEditor,
  CodeEditorAction,
  CodeEditorActionButton,
} from '@/components';
import { BaseContent } from '@/content';
import { useRef } from 'react';
import { toast } from 'react-toastify';

/**
 * 格式化数据库中的大对象
 */
export default function FormatObjectStr() {
  const contentActionRef = useRef<CodeEditorAction>();
  const jsonActionRef = useRef<CodeEditorAction>();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <CodeEditor
        title="Content 编辑"
        className="h-[calc(100vh-154px)]"
        actionRef={contentActionRef}
        actionRender={(action) => [
          <CodeEditorActionButton
            tooltip="美化"
            icon="icon-park-outline:fireworks"
            key="pb"
            onClick={() => {
              const zipedContent = BaseContent.enformat(action.getValue());
              action.setValue(BaseContent.deformat(zipedContent));
            }}
          />,
          <CodeEditorActionButton
            tooltip="压缩"
            icon="ph:file-zip"
            key="zip"
            onClick={() => {
              const zipedContent = BaseContent.enformat(action.getValue());
              action.setValue(zipedContent);
            }}
          />,
          <CodeEditorActionButton
            tooltip="复制压缩后的报文"
            icon="ph:copy"
            key="copy"
            onClick={() => {
              const zipedContent = BaseContent.enformat(action.getValue());
              window.navigator.clipboard
                .writeText(zipedContent)
                .then(() => {
                  toast.success('复制成功');
                })
                .catch(() => {
                  toast.error('复制成功');
                });
            }}
          />,
          <CodeEditorActionButton
            tooltip="转换成 json"
            icon="tabler:json"
            key="json"
            onClick={() => {
              const zipedContent = BaseContent.enformat(action.getValue());
              const data = BaseContent.parse(zipedContent);
              jsonActionRef.current?.setValue(JSON.stringify(data, null, 2));
            }}
          />,
        ]}
      />

      <CodeEditor
        title="Json 编辑"
        className="h-[calc(100vh-154px)]"
        actionRef={jsonActionRef}
        editorProps={{ language: 'json' }}
        actionRender={(action) => [
          <CodeEditorActionButton
            tooltip="转换成 content"
            icon="tabler:transform"
            key="content"
            onClick={() => {
              try {
                const jsonValue = action.getValue();

                if (!jsonValue) {
                  return;
                }

                const data = JSON.parse(jsonValue);

                const zipedContent = BaseContent.stringify(data);
                contentActionRef.current?.setValue(
                  BaseContent.deformat(zipedContent)
                );
              } catch (error) {
                console.error(error);
                toast.error('对不起，转换遇到了问题, 如需解决请联系开发者');
              }
            }}
          />,
          <CodeEditorActionButton
            tooltip="复制压缩后的报文"
            icon="ph:copy"
            key="copy"
            onClick={() => {
              const jsonValue = action.getValue();

              if (!jsonValue) {
                return;
              }

              const data = JSON.parse(jsonValue);

              const zipedContent = BaseContent.stringify(data);
              window.navigator.clipboard
                .writeText(zipedContent)
                .then(() => {
                  toast.success('复制成功');
                })
                .catch(() => {
                  toast.error('复制成功');
                });
            }}
          />,
        ]}
      />
    </div>
  );
}
