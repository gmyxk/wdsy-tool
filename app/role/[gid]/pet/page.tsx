'use client';

import { UserContainerDataContentEditor } from './pet-editor';
import { ContainerPetList } from './prt-list';

export default function CheckBaggage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  return (
    <div className="flex flex-col gap-4">
      <ContainerPetList gid={params.gid} />
      <UserContainerDataContentEditor gid={params.gid} />
    </div>
  );
}
