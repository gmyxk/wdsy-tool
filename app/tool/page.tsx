'use client';

import { redirect } from 'next/navigation';

export default function DBToolPage() {
  return redirect('/tool/checksum');
  return (
    <div className="flex w-full flex-col">
      11
      {/* <Tabs aria-label="Options">
        <Tab key="formstr" title="LPC 对象格式化">
          <Card>
            <CardBody>
              <FormatObjectStr />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="checksum" title="checksum生成">
          <Card>
            <CardBody>
              <FormatChecksum />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="sdk" title="Sdk 加解密">
          <Card>
            <CardBody>
              <SdkEd />
            </CardBody>
          </Card>
        </Tab>
      </Tabs> */}
    </div>
  );
}
