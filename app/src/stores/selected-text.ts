import create from 'zustand';

interface SelectedTextState {
  selectedText?: string;
  setSelectedText: (selectedText: string) => void;
  detectedText?: string;
  setDetectedText: (detectedText: string) => void;
  resetDetectedText: () => void;
  resetSelectedText: () => void;
  reset: () => void;
}

export const useSelectedText = create<SelectedTextState>((set) => ({
  setSelectedText: (selected) =>
    set((state) => ({
      ...state,
      selectedText: selected,
    })),
  setDetectedText: (selected) =>
    set((state) => ({
      ...state,
      detectedText: selected,
    })),
  resetDetectedText: () => {
    set((state) => ({
      ...state,
      detectedText: undefined,
    }));
  },
  resetSelectedText() {
    set((state) => ({
      ...state,
      selectedText: undefined,
    }));
  },
  reset: () => {
    set((state) => ({
      ...state,
      selectedText: undefined,
      detectedText: undefined,
    }));
  },
}));
