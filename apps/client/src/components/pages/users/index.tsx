import { FC } from "react";
import { useQuery } from "react-query";

export const Users: FC = () => {
  const { data } = useQuery(["/users", true]);
  return <div>{JSON.stringify(data)}</div>;
};
