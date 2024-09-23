'use client';

import { coverRoleInfoRequest, getRoleInfoRequest } from '@/api-request';
import { BaseContent } from '@/content';
import { Icon } from '@iconify/react';
import Editor from '@monaco-editor/react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFullscreen } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const RoleContentEdit = ({ gid }: { gid: string }) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['roleInfo', gid],
    queryFn: ({ queryKey }) => getRoleInfoRequest(queryKey[1]),
  });

  const ref = useRef(null);

  const [isFullscreen, { toggleFullscreen, exitFullscreen }] =
    useFullscreen(ref);

  const { mutate, isPending: isSubmiting } = useMutation({
    mutationFn: coverRoleInfoRequest,
    onSuccess: () => {
      refetch();
      toast.success('保存成功');
      exitFullscreen();
    },
    onError: (error) => {
      toast.error(error.message || '保存失败');
    },
  });

  const [content, setContent] = useState('');

  useEffect(() => {
    if (data?.data) {
      setContent(BaseContent.deformat(data.data.userDataContent));
    }
  }, [data?.data]);

  const [isCopying, setIsCopying] = useState<'success' | 'filed'>();

  if (isPending || !data) {
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  return (
    <div ref={ref} className="h-[calc(100vh-190px)]">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex justify-between">
          <div>Content 编辑</div>
          <div
            className="px-2"
            onClick={() => {
              toggleFullscreen();
            }}
          >
            <Icon
              icon={
                isFullscreen
                  ? 'icon-park-outline:off-screen-one'
                  : 'icon-park-outline:full-screen-one'
              }
              width={20}
            />
          </div>
        </CardHeader>
        <CardBody className="flex-grow p-0">
          <Editor
            height="100%"
            language="txt"
            value={content}
            theme="vs-dark"
            onChange={(value) => {
              setContent(value || '');
            }}
          />
        </CardBody>
        <CardFooter className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            onClick={() => {
              navigator.clipboard
                .writeText(BaseContent.enformat(content))
                .then(() => {
                  setIsCopying('success');
                })
                .catch(() => {
                  setIsCopying('filed');
                })
                .finally(() => {
                  setTimeout(() => {
                    setIsCopying(undefined);
                  }, 1200);
                });
            }}
          >
            {isCopying === 'success' ? (
              <Icon icon="mdi:success-bold" width={20} />
            ) : isCopying === 'filed' ? (
              <Icon icon="material-symbols:error" width={20} />
            ) : null}
            复制
          </Button>
          <Button
            color="primary"
            className="col-span-2"
            size="sm"
            isLoading={isSubmiting}
            onClick={() => {
              mutate({
                gid,
                content: BaseContent.enformat(content),
              });
            }}
          >
            保存
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
