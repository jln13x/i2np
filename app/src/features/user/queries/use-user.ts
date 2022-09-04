import { useAccessToken } from '@/features/auth/queries/use-access-token';
import { isFullUser } from '@notionhq/client';
import { useMeQuery } from './use-me-query';

export const useUser = () => {
  const { data: token } = useAccessToken();
  const { data: user } = useMeQuery(token || null);

  if (!user) {
    throw new Error('No user found!');
  }

  if (user.type !== 'bot') {
    throw new Error('Invalid user type');
  }

  const owner = user.bot.owner;

  if (owner.type !== 'user') {
    throw new Error('Invalid owner type');
  }

  const fullUser = owner.user;

  if (!isFullUser(fullUser)) {
    throw new Error('Missing user information');
  }

  return fullUser;
};
