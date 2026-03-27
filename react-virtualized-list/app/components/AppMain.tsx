import { useDictionary } from "~/hooks/useDictionary";
import { VirtualizedList } from "~/components/VirtualizedList";
import styled from "@emotion/styled";

const ConntainerWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: #f1f1f0;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  padding: 0 16px;
  background-color: #f1f1f0;
`;

const ContentWrapper = styled.div`
  padding: 16px;
  height: calc(100vh - 140px);
  box-sizing: border-box;
`;

export function AppMain() {
  const dictionary = useDictionary();

  return (
    <ConntainerWrapper>
      <HeaderContainer>
        <Header>React Virtualized List</Header>
      </HeaderContainer>
      <ContentWrapper>
        <VirtualizedList words={dictionary} />
      </ContentWrapper>
    </ConntainerWrapper>
  );
}
