import { authAxios } from "@/axios";
import { useStore } from "@/store";
import { useMutation } from "react-query";

export const useSignOut = () => {
  const clearAuth = useStore((state) => state.clearAuth);

  const { mutate: logOut } = useMutation(
    async () => {
      const response = await authAxios.post("auth/logout");

      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        clearAuth();
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  return logOut;
};
