'use client';

import { redirect } from 'next/navigation';

export default function Home({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  return redirect(`/role/${params.gid}/baggage`);
}
