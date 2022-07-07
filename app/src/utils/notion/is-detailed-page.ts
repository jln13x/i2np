import {
  CustomGetPageResponseDetailed,
  GetPageResponse,
} from '../../lib/notion/types';

export const isDetailedPage = (
  page: GetPageResponse
): page is CustomGetPageResponseDetailed => {
  return Object.keys(page).length > 2;
};
