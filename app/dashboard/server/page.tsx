import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function ServerPage() {
  return (
    <div>
      <Button as={Link} href="/dashboard/server/global-mail">
        全服邮件
      </Button>
    </div>
  );
}
