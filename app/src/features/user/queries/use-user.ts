import { useMeQuery } from './use-me-query';

export const useUser = () => {
  const { data: user } = useMeQuery();

  if (!user) {
    throw new Error('No user found!');
  }

  return user;
};
