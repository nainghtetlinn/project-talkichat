import React, { Suspense } from "react";
import { LoadingLine } from "./LoadingLine";

type Props = {};

export const Loadable =
  (Component: React.ReactNode | JSX.Element | any) => (props: Props) => {
    return (
      <Suspense fallback={<LoadingLine />}>
        <Component {...props} />
      </Suspense>
    );
  };
