import type { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import create from 'zustand';

export type SelectedResult = PageObjectResponse | DatabaseObjectResponse

interface SelectedResultState {
  selectedResult?: SelectedResult;
  setSelectedResult: (selectedResult?: SelectedResult) => void;
  reset: () => void;
}

export const useSelectedResult = create<SelectedResultState>((set) => ({
  setSelectedResult: (selected) =>
    set((state) => ({
      ...state,
      selectedResult: selected,
    })),
  reset: () => set((state) => ({ ...state, selectedResult: undefined })),
}));
