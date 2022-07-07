import create from 'zustand';

interface SelectedTextState {
  selectedText?: string;
  setSelectedText: (selectedText?: string) => void;
}

export const useSelectedText = create<SelectedTextState>((set) => ({
  setSelectedText: (selected) =>
    set((state) => ({
      ...state,
      selectedText: selected,
    })),
}));
