import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import {
  StyledMainDiv,
  MainBody,
  MainContent,
  StyledContentWrapper,
} from "./Main.style";
import RelatedStockContent from "./RelatedStockContent";
import { useSelector } from "react-redux";
import SearchContent from "./SearchContent";
import RelatedSns from "./RelatedSns";
export default function MainPage() {
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <StyledMainDiv darkMode={darkMode}>
      <Sidebar />
      <MainContent>
        <MainBody>
          <Header />
          <RelatedStockContent keyword={keyword}></RelatedStockContent>
          <StyledContentWrapper>
            <SearchContent keyword={keyword}></SearchContent>
            <RelatedSns keyword={keyword}></RelatedSns>
          </StyledContentWrapper>
        </MainBody>
      </MainContent>
    </StyledMainDiv>
  );
}
