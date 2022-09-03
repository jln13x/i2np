import { useSelectedResult } from '@/stores/selected-result';
import { useSelectedText } from '@/stores/selected-text';
import { useQueryClient } from 'react-query';

export const useReset = () => {
  const { reset: resetSelectedText } = useSelectedText();
  const { reset: resetSelectedResult } = useSelectedResult();
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.resetQueries([]);
    queryClient.clear();
    resetSelectedText();
    resetSelectedResult();
  };
};
