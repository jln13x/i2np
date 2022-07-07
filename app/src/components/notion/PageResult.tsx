import { CustomGetPageResponseDetailed } from "../../notion-types";
import { getTitle } from "../../utils/notion/get-title";
import { SearchResult } from "./SearchResult";

interface PageResultProps {
  page: CustomGetPageResponseDetailed;
}

export const PageResult: React.FC<PageResultProps> = ({ page }) => {
  const title = getTitle(page);

  if (!title) return null;

  let emoji = page.icon?.type === "emoji" ? page.icon.emoji : undefined;

  return <SearchResult title={title} type="page" emoji={emoji} data={page} />;
};
