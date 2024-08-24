import { pointsToYearsDaysPoints } from '@/lib/game-data';
import { Chip, User } from '@nextui-org/react';

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

export const RoleItem = ({ data }: { data: API.UserListItem }) => {
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
        <span className="text-xs leading-6 text-default-500">
          {/* {CLAZZ[data.clazz]}{GENDER[data.gender]} -  */}
          {pointsToYearsDaysPoints(data.ability)}
        </span>
        <div>
          <span className="text-xs text-default-500">Lv.{data.level}</span>
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
