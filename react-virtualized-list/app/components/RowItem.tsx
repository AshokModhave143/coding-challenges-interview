import styled from "@emotion/styled";
import React, { type FC, type PropsWithChildren } from "react";

const Wrapper = styled.li`
  height: 30px;
  border-bottom: 1px solid black;
  padding: 0 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
  font-family: monospace;
`;

export interface RowItemProps extends PropsWithChildren {}

export const RowItem: FC<RowItemProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
