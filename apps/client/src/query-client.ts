import { QueryClient, QueryFunctionContext, QueryKey } from "react-query";
import { authAxios, guestAxios } from "./axios";
import { useStore } from "./store";
import { AxiosError } from "axios";

const fetchQuery = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  if (!Array.isArray(queryKey) || queryKey.length !== 2) {
    throw new Error("Invalid query key");
  }

  const [url, isAuthenticated] = queryKey as [string, boolean];
  const axiosInstance = isAuthenticated ? authAxios : guestAxios;
  const { data } = await axiosInstance.get(url);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetchQuery,
      onError: (error) => {
        if ((error as AxiosError).response?.status === 401) {
          const { clearToken, navigate } = useStore.getState();
          clearToken();
          if (navigate) navigate("/login");
        }
      },
    },
  },
});

export default queryClient;
