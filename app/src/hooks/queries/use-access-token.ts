import * as SecureStore from "expo-secure-store";
import { useQuery } from "react-query";

export const queryKey = "access_token";
export const ACCESS_TOKEN_KEY = "notion_access_token";

export const useAccessToken = () => {
  return useQuery(queryKey, {
    queryFn: () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
  });
};
