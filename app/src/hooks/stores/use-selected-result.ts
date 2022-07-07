import create from "zustand";
import {
  CustomGetDatabaseResponseDetailed,
  CustomGetPageResponseDetailed,
} from "../../notion-types";

type SelectedResult =
  | CustomGetPageResponseDetailed
  | CustomGetDatabaseResponseDetailed;

interface SelectedResultState {
  selectedResult?: SelectedResult;
  setSelectedResult: (selectedResult?: SelectedResult) => void;
}

export const useSelectedResult = create<SelectedResultState>((set) => ({
  setSelectedResult: (selected) =>
    set((state) => ({
      ...state,
      selectedResult: selected,
    })),
}));
