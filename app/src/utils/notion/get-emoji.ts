import {
  CustomGetDatabaseResponseDetailed,
  CustomGetPageResponseDetailed,
} from '../../lib/notion/types';

export const getEmoji = (
  pageOrDatabase:
    | CustomGetPageResponseDetailed
    | CustomGetDatabaseResponseDetailed
) => {
  const icon = pageOrDatabase.icon;

  if (!icon || icon.type !== 'emoji') return null;

  return icon?.emoji || null;
};