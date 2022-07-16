import { SearchResultResponse } from '@/generated/api/interfaces';
import create from 'zustand';

type SelectedResult = SearchResultResponse;

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
