import create from 'zustand';

interface DetectedTextState {
  detectedText?: string;
  setDetectedText: (detectedText?: string) => void;
}

export const useDetectedText = create<DetectedTextState>((set) => ({
  setDetectedText: (selected) =>
    set((state) => ({
      ...state,
      detectedText: selected,
    })),
}));
