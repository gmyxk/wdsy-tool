'use client';
import { RoleContentEdit } from './content-edit';
import { InfoCrad } from './info-card';

export default function RoleInfoPage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div>
        <div className="mb-4 text-sm">
          友情提示: 在您对玩家数据进行操作之前，请确认该玩家已下线; 当您对 content
          不熟悉时，不要轻易通过编辑器对其进行修改，一旦格式错误将会导致角色无法正常读取;
          所以，慎重！慎重！慎重！
        </div>
        <InfoCrad gid={params.gid} />
      </div>
      <div className="xl:col-span-2">
        <RoleContentEdit gid={params.gid} />
      </div>
    </div>
  );
}
