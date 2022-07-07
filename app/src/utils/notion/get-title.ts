import {
  CustomGetDatabaseResponseDetailed,
  CustomGetPageResponseDetailed,
} from "../../notion-types";
import { getEmoji } from "./get-emoji";

export const getTitle = (
  pageOrDatabase:
    | CustomGetPageResponseDetailed
    | CustomGetDatabaseResponseDetailed,
  withEmoji?: boolean
) => {
  if (pageOrDatabase.object === "database") {
    const database = pageOrDatabase;
    return database.title[0].plain_text;
  }

  const titleProperty = Object.values(pageOrDatabase.properties).find(
    (property) => property.type === "title"
  );

  if (!titleProperty || titleProperty.type !== "title") return null;

  const title = titleProperty?.title[0]?.plain_text || null;

  if (!title) return null;

  const emoji = withEmoji ? getEmoji(pageOrDatabase) : null;

  return `${emoji ? `${emoji} ` : ""}${title}`;
};
