import { Context, useContext as useReactContext } from 'react';

export const useContext = <T>(context: Context<T | undefined>): T => {
  const ctx = useReactContext(context);

  if (!ctx) {
    throw new Error(`${context.displayName} - Not inside a provider!`);
  }

  return ctx;
};
