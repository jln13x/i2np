import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQueryClient } from 'react-query';
import {
  ACCESS_TOKEN_KEY,
  queryKey as accessTokenQueryKey,
} from '../queries/use-access-token';

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
