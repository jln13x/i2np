import { useJwt } from '@/features/auth/queries/use-jwt';
import { useMeQuery } from './use-me-query';

export const useUser = () => {
  const { data: jwt } = useJwt();
  const { data: user } = useMeQuery(jwt);

  if (!user){
    throw new Error('No user found!');
  }

  return user;
};
