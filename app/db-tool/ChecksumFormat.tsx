import { Tab, Tabs } from "@nextui-org/react";
import { UserCarryVerify } from "./user-carry-verify";
import { MailVerify } from "./mail-verify";
import { UserDataVerify } from "./user-data-verify";

/**
 * 生成 checksum
 */
export const FormatChecksum = () => {
  return (
    <Tabs>
      <Tab title="user_carry" key="user_carry">
        <UserCarryVerify />
      </Tab>

      <Tab title="user_data" key="user_data">
        <UserDataVerify />
      </Tab>

      <Tab title="mail" key="mail">
        <MailVerify />
      </Tab>
    </Tabs>
  );
};
