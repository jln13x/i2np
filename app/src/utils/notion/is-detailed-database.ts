import {
  CustomGetDatabaseResponseDetailed,
  GetDatabaseResponse,
} from "../../notion-types";

export const isDetailedDatabase = (
  database: GetDatabaseResponse
): database is CustomGetDatabaseResponseDetailed => {
  return Object.keys(database).length > 3;
};
