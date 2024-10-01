import { clearBaggageRequest, getRoleBaggageRequest } from '@/api-request';
import { useClient } from '@/hook';
import {
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const EditBaggageSkeleton = () => {
  return (
    <div>
      <Skeleton className="flex h-9 rounded-lg" />

      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, index) => {
          return <Skeleton className="flex h-[52px] rounded-lg" key={index} />;
        })}
      </div>
    </div>
  );
};

const configList: [string, string, (positionId: number) => boolean][] = [
  ['PAK-00', '已装备', (positionId) => positionId > 0 && positionId <= 40],
  ['PAK-01', '包裹1', (positionId) => positionId > 40 && positionId <= 65],
  ['PAK-02', '包裹2', (positionId) => positionId > 65 && positionId <= 90],
  ['PAK-03', '包裹3', (positionId) => positionId > 90 && positionId <= 115],
  ['PAK-04', '包裹4', (positionId) => positionId > 115 && positionId <= 140],
  ['PAK-05', '包裹5', (positionId) => positionId > 140 && positionId <= 165],
  ['PAK-06', '武魂', (positionId) => positionId > 900 && positionId <= 905],
];

/**
 * 编辑包裹
 * @returns
 */
export const EditBaggage = ({ gid }: { gid: string }) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['baggageInfo', gid],
    staleTime: 5 * 60 * 1000,
    queryFn: ({ queryKey }) => getRoleBaggageRequest(queryKey[1]),
  });
  const [modalInfo, setModalInfo] = React.useState<{
    open: boolean;
    data?: API.CarryItem;
  }>({
    open: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: clearBaggageRequest,
    onSuccess: () => {
      toast.success('清理成功');
      setModalInfo({
        open: false,
      });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || '清理失败');
    },
  });

  const isClient = useClient();

  const chunkList = React.useMemo(() => {
    return (data?.data?.carryItems || []).reduce<
      { key: string; chunkName: string; chunkContent: API.CarryItem[] }[]
    >((prev, cur) => {
      const config = configList.find((i) => i[2](cur.positionId));

      if (!config) {
        return prev;
      }

      const tar = prev.find((i) => i.key === config[0]);

      if (!tar) {
        prev.push({
          key: config[0],
          chunkName: config[1],
          chunkContent: [cur],
        });
      } else {
        tar.chunkContent.push(cur);
      }

      return prev;
    }, []);
  }, [data?.data]);

  if (isFetching || isLoading || !isClient) {
    return <EditBaggageSkeleton />;
  }

  if (data?.data?.carryItems.length === 0) {
    return <Empty description="当前人物身上没有物品~" />;
  }

  return (
    <div>
      <Tabs size="sm">
        {chunkList.map((item) => {
          return (
            <Tab key={item.key} title={item.chunkName}>
              <div className="grid grid-cols-5 gap-2">
                {item.chunkContent.map((item) => {
                  return (
                    <Card key={item.positionId}>
                      <CardBody
                        className="cursor-pointer p-2"
                        onClick={() => {
                          setModalInfo({ open: true, data: item });
                        }}
                      >
                        <div className="flex min-h-9 items-center justify-center text-center text-tiny text-default-500">
                          {item.name}
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
              <Button
                className="mt-4 w-full"
                size="sm"
                color="danger"
                variant="bordered"
                isLoading={isPending}
                onClick={() => {
                  mutate({
                    gid,
                    target: [item.key],
                  });
                }}
              >
                清除当前页
              </Button>
            </Tab>
          );
        })}
      </Tabs>
      <Button
        className="w-full"
        size="sm"
        color="danger"
        isLoading={isPending}
        onClick={() => {
          mutate({
            gid,
            target: [
              'ALL'
            ],
          });
        }}
      >
        清空全部携带物品
      </Button>
      <Modal
        // size="sm"
        isOpen={modalInfo.open}
        onClose={() => {
          setModalInfo({ open: false });
        }}
      >
        <ModalContent>
          {modalInfo.data ? (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalInfo.data.name}
              </ModalHeader>
              <ModalBody>
                <pre className="max-h-[48vh] overflow-y-auto">
                  {JSON.stringify(modalInfo.data.payload, null, 2)}
                </pre>
              </ModalBody>
            </>
          ) : null}
          <Divider />
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                if (!modalInfo.data?.positionId) {
                  return;
                }
                mutate({
                  gid,
                  target: [modalInfo.data.positionId.toString()],
                });
              }}
            >
              删除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
