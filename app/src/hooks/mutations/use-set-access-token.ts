import { useMutation, useQueryClient } from 'react-query';
import * as SecureStore from 'expo-secure-store';
import {
  queryKey as accessTokenQueryKey,
  ACCESS_TOKEN_KEY,
} from '../queries/use-access-token';
import { useNavigation } from '@react-navigation/native';

export const useSetAccessToken = () => {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  return useMutation({
    mutationFn: (token: string) =>
      SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries(accessTokenQueryKey);
      navigate('Image');
    },
  });
};
