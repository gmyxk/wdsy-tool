"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { FormatObjectStr } from "./FormatObjectStr";
import { FormatChecksum } from "./ChecksumFormat";

export function DBToolCom() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
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
      </Tabs>
    </div>
  );
}
