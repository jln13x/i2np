import { useJwt } from '@/features/auth/queries/use-jwt';
import { MeResponse } from '@/generated/api/interfaces';
import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';
import { userKeys } from './query-key-factory';

export const useMeQuery = () => {
  const { data: jwt } = useJwt();

  return useQuery<MeResponse>({
    queryKey: userKeys.me,
    queryFn: async () => {
      const response = await axios.get('/notion/me');
      return response.data;
    },
    refetchInterval: 10000,
    retry: 0,
    enabled: !!jwt,
  });
};
