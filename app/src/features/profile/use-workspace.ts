import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useAccessToken } from '../auth/queries/use-access-token';
import { workspaceQueryKeys } from './query-keys';

interface Response {
  workspaceName: string | null | undefined;
}

export const useWorkspace = () => {
  const { data: token } = useAccessToken();

  if (!token) {
    throw new Error('No access token');
  }

  return useQuery<Response>({
    retry: 0,
    queryKey: workspaceQueryKeys.all,
    queryFn: async () => {
      const response = await axios.get('/notion/workspace', {
        headers: {
          'X-Notion-Access-Token': token,
        },
      });

      console.log({ response });

      return response.data as Response;
    },
  });
};
