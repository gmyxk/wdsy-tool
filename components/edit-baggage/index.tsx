import { axiosGet } from '@/lib/axios';
import { useRoleStore } from '@/store';
import {
  Card,
  CardHeader,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

/**
 * 编辑包裹
 * @returns
 */
export const EditBaggage = () => {
  const gids = useRoleStore((state) => state.selectedRoles.map((i) => i.gid));

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['baggage', gids[0]],
    queryFn: () =>
      axiosGet<API.CarryItem[]>('/api/baggage', {
        gid: gids[0],
      }),
    enabled: !!gids[0],
  });

  const chunkList = React.useMemo(() => {
    return (data?.data || []).reduce<
      { chunkName: string; chunkContent: API.CarryItem[] }[]
    >((prev, cur) => {
      const configList: [string, (positionId: number) => boolean][] = [
        ['穿着物品', (positionId) => positionId > 0 && positionId <= 40],
        ['包裹1', (positionId) => positionId > 40 && positionId <= 65],
        ['包裹2', (positionId) => positionId > 65 && positionId <= 90],
        ['包裹3', (positionId) => positionId > 90 && positionId <= 115],
        ['包裹4', (positionId) => positionId > 115 && positionId <= 140],
        ['包裹5', (positionId) => positionId > 140 && positionId <= 165],
      ];

      const config = configList.find((i) => i[1](cur.positionId));

      if (!config) {
        return prev;
      }

      const tar = prev.find((i) => i.chunkName === config[0]);

      if (!tar) {
        prev.push({ chunkName: config[0], chunkContent: [cur] });
      } else {
        tar.chunkContent.push(cur);
      }

      return prev;
    }, []);
  }, [data?.data]);

  if (isFetching || isLoading) {
    return <Spinner size="lg" />;
  }

  if (!data) {
    return <div>请先查询</div>;
  }

  return (
    <div>
      <Tabs>
        {chunkList.map((item) => {
          return (
            <Tab key={item.chunkName} title={item.chunkName}>
              <div className="grid grid-cols-5 gap-2">
                {item.chunkContent.map((item) => {
                  return (
                    <Card key={item.positionId}>
                      <CardHeader>
                        <Tooltip
                          content={
                            <div className="max-w-80">
                              <h6>位置: {item.positionId}</h6>
                              <pre className="max-h-[48vh] overflow-y-auto">
                                {JSON.stringify(item.payload, null, 2)}
                              </pre>
                            </div>
                          }
                        >
                          <span className="cursor-pointer">{item.name}</span>
                        </Tooltip>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
