'use client';

import {
  coverUserContainerRequest,
  getContainerPetsRequest,
} from '@/api-request';
import {
  CodeEditor,
  CodeEditorAction,
  CodeEditorActionButton,
} from '@/components';
import { BaseContent } from '@/content';
import { Skeleton } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export const UserContainerDataContentEditor = ({ gid }: { gid: string }) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['container-pet-info', gid],
    queryFn: ({ queryKey }) => getContainerPetsRequest(queryKey[1]),
  });

  const contentActionRef = useRef<CodeEditorAction>();

  const { mutate, isPending: isSubmiting } = useMutation({
    mutationFn: coverUserContainerRequest,
    onSuccess: () => {
      refetch();
      toast.success('保存成功');
      contentActionRef.current?.exitFullscreen();
    },
    onError: (error) => {
      toast.error(error.message || '保存失败');
    },
  });

  useEffect(() => {
    if (data?.data) {
      contentActionRef.current?.setValue(
        BaseContent.deformat(data.data.content)
      );
    }
  }, [data?.data]);

  if (isPending || !data) {
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  return (
    <CodeEditor
      actionRef={contentActionRef}
      className="h-[calc(100vh-190px)]"
      title="Content 编辑"
      actionRender={(action) => {
        return [
          <CodeEditorActionButton
            tooltip="提交修改"
            icon="formkit:submit"
            key="submit"
            isLoading={isSubmiting}
            onClick={() => {
              const zipedContent = BaseContent.enformat(action.getValue());
              mutate({
                gid,
                content: zipedContent,
              });
            }}
          />,
          <CodeEditorActionButton
            tooltip="刷新"
            icon="material-symbols:refresh"
            key="refresh"
            isLoading={isPending}
            onClick={() => {
              refetch();
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
        ];
      }}
    />
  );
};