import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  // Select, SelectItem
} from "@nextui-org/react";
import React from "react";

// const statusOptions = [
//   { label: "全部", key: "all" },
//   { label: "在线", key: "online" },
//   { label: "离线", key: "offline" },
// ];

interface UserTableSearchFormProps {
  onFinih?: (values: API.UserListQueryParams) => void;
}

export const UserTableSearchForm = (props: UserTableSearchFormProps) => {
  const { onFinih } = props;

  const [formValue, setFormValue] = React.useState<API.UserListQueryParams>({
    status: "all",
  });

  return (
    <div className="flex gap-4">
      <Input
        isClearable
        aria-label="Username"
        placeholder="输入角色名称查询"
        startContent={<Icon icon="ion:search-outline" width={18} />}
        value={formValue.roleName}
        onValueChange={(roleName) => {
          setFormValue({ ...formValue, roleName });
        }}
      />
      {/* <Select
        placeholder="全部状态"
        name="status"
        aria-label="status"
        value={formValue.status}
        onChange={(evt) => {
          setFormValue({ ...formValue, status: evt.target.value });
        }}
      >
        {statusOptions.map(({ key, label }) => (
          <SelectItem key={key}>{label}</SelectItem>
        ))}
      </Select> */}
      <Button
        color="primary"
        onClick={() => {
          onFinih?.(formValue);
        }}
      >
        筛选
      </Button>
    </div>
  );
};
