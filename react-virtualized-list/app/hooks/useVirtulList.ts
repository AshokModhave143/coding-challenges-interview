import { useMemo } from "react";

export type UseVirtulListParams<T> = {
  items: T[];
  itemHeight: number;
  viewportHeight: number;
  scrollTop: number;
  buffer?: number;
};

export type UseVirtulListReturn<T> = {
  visibleItems: T[];
  startIndex: number;
  endIndex: number;
  offsetTop: number;
  totalHeight: number;
};

export const useVirtulList = <T>({
  items,
  itemHeight,
  scrollTop,
  viewportHeight,
  buffer = 20,
}: UseVirtulListParams<T>): UseVirtulListReturn<T> => {
  return useMemo(() => {
    const totalHeight = items.length * itemHeight;
    const visibleCount = Math.ceil(viewportHeight / itemHeight);

    let startIndex = Math.floor(scrollTop / itemHeight) - buffer;
    startIndex = Math.max(0, startIndex);

    let endIndex = Math.min(
      items.length,
      startIndex + visibleCount + buffer * 2,
    );
    endIndex = Math.min(items.length, endIndex);

    if (endIndex - startIndex < visibleCount) {
      startIndex = Math.max(0, endIndex - visibleCount);
    }

    const visibleItems = items.slice(startIndex, endIndex);
    const offsetTop = startIndex * itemHeight;

    return {
      visibleItems,
      totalHeight,
      startIndex,
      endIndex,
      offsetTop,
    };
  }, [items, itemHeight, scrollTop, viewportHeight, buffer]);
};
