import { CustomGetDatabaseResponseDetailed } from '../../notion-types';
import { getTitle } from '../../utils/notion/get-title';
import { SearchResult } from './SearchResult';

interface DatabaseResultProps {
  database: CustomGetDatabaseResponseDetailed;
}

export const DatabaseResult: React.FC<DatabaseResultProps> = ({ database }) => {
  const title = getTitle(database);

  if (!title) return null;

  let emoji = database.icon?.type === 'emoji' ? database.icon.emoji : undefined;

  return (
    <SearchResult title={title} type="database" emoji={emoji} data={database} />
  );
};
