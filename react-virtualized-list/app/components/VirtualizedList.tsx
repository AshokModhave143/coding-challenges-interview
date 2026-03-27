import styled from "@emotion/styled";
import React, {
  type FC,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useVirtulList } from "../hooks/useVirtulList";
import { RowItem } from "./RowItem";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ITEM_HEIGHT = 30;
const DEBOUNCE_DELAY = 250;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const Search = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 18px;
  width: 300px;
  margin: 0 0 16px 0;
`;

const ScrollContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const InnerContainer = styled.div<{ height: number }>`
  position: relative;
  height: ${({ height }) => height}px;
`;

const ItemsWrapper = styled.div<{ offsetTop: number }>`
  position: absolute;
  top: ${({ offsetTop }) => offsetTop}px;
  left: 0;
  right: 0;
`;

export interface VirtualizedListProps {
  words: string[];
}

export const VirtualizedList: FC<VirtualizedListProps> = ({ words }) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const scrollTop = useScrollPosition(containerRef);
  const [viewportHeight, setViewportHeight] = useState(0);

  useLayoutEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const updateHeight = () => setViewportHeight(element.clientHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [debouncedQuery]);

  const filteredWords = useMemo(() => {
    if (!debouncedQuery) return words;

    const q = debouncedQuery.toLowerCase();

    return words.filter((word) => word.toLowerCase().startsWith(q));
  }, [words, debouncedQuery]);

  const { totalHeight, visibleItems, startIndex, offsetTop } = useVirtulList({
    items: filteredWords,
    itemHeight: ITEM_HEIGHT,
    viewportHeight,
    scrollTop,
    buffer: 20,
  });

  return (
    <Wrapper>
      <Search
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ScrollContainer ref={containerRef}>
        <InnerContainer height={totalHeight}>
          <ItemsWrapper offsetTop={offsetTop}>
            {/**
             * Note: `SafelyRenderChildren` should NOT be removed while solving
             * this interview. This prevents rendering too many list items and
             * potentially crashing the web page. This also enforces an artificial
             * limit (5,000) to the amount of children that can be rendered at one
             * time during virtualization.
             */}
            <SafelyRenderChildren>
              {visibleItems.map((word, index) => (
                <RowItem key={startIndex + index}>{word}</RowItem>
              ))}
            </SafelyRenderChildren>
          </ItemsWrapper>
        </InnerContainer>
      </ScrollContainer>
    </Wrapper>
  );
};
