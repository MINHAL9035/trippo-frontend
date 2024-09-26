import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
interface TableDropdownProps {
  onBlock: () => void;
  onUnblock: () => void;
}

const TableDropdown: React.FC<TableDropdownProps> = ({
  onBlock,
  onUnblock,
}) => {
  const items: MenuProps["items"] = [
    {
      label: "Block",
      key: "1",
      onClick: onBlock,
    },
    {
      label: "Unblock",
      key: "2",
      onClick: onUnblock,
    },
  ];

  return (
    <Space wrap>
      <Dropdown.Button menu={{ items }} onClick={onBlock}>
        Action
      </Dropdown.Button>
    </Space>
  );
};

export default TableDropdown;
