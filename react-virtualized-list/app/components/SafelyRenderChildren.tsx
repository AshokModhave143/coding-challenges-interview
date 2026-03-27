import React, { Children, type FC, type PropsWithChildren } from "react";

export interface SafelyRenderChildrenProps extends PropsWithChildren {}

export const SafelyRenderChildren: FC<SafelyRenderChildrenProps> = ({
  children,
}) => {
  const count = Children.count(children);
  if (count > 5000) {
    return <span>You're attempting to render too many children</span>;
  }

  return <>{children}</>;
};
