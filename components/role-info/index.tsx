import { pointsToYearsDaysPoints } from '@/lib/game-data';
import { Chip, Skeleton, User } from '@nextui-org/react';

const AVATAR_ENUM: Record<string, string> = {
  '1_1': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/6001.jpg',
  '1_2': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/7001.jpg',
  '2_1': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/7002.jpg',
  '2_2': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/6002.jpg',
  '3_1': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/7003.jpg',
  '3_2': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/6003.jpg',
  '4_1': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/6004.jpg',
  '4_2': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/7004.jpg',
  '5_1': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/6005.jpg',
  '5_2': 'http://img.gyyxcdn.cn/qibao/Images/itemImages/7005.jpg',
};

// const CLAZZ = ["", "金", "木", "水", "火", "土"];

// const GENDER = ['', '男', '女']

export const RoleInfo = ({ data }: { data: API.RoleListItem }) => {
  return (
    <div className="flex w-full justify-between gap-2">
      <User
        avatarProps={{
          size: 'md',
          radius: 'sm',
          src: AVATAR_ENUM[`${data.clazz}_${data.gender}`],
        }}
        description={`@${data.account?.replace('110001', '')}`}
        name={data.roleName}
      />
      <div className="flex flex-col items-end">
        <span className="text-xs leading-4 text-default-500">
          {/* {CLAZZ[data.clazz]}{GENDER[data.gender]} -  */}
          {pointsToYearsDaysPoints(data.ability)}
        </span>
        <div>
          <span className="text-xs font-semibold text-default-500">
            Lv.{data.level}
          </span>
          <Chip
            color={data.status === 1 ? 'primary' : 'danger'}
            size="sm"
            variant="dot"
            className="h-4 border-none p-0"
          >
            {data.status === 1 ? '在线' : '离线'}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export const RoleInfoSkeleton = () => {
  return (
    <div className="flex w-full max-w-[300px] items-center gap-3">
      <div>
        <Skeleton className="flex h-10 w-12 rounded-lg" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
};
