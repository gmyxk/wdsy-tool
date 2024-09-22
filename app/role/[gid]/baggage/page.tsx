import { redirect } from 'next/navigation';

export default function CheckBaggage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  return redirect(`/role/${params.gid}/baggage/send-jewelry`);
}
